import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request: NextRequest) {
    let language = "python";

    try {
        const body = await request.json();
        const code = body.code;
        language = body.language || "python";

        if (!code || code.trim() === "") {
            return NextResponse.json({ error: "Code is required" }, { status: 400 });
        }

        let dockerImage = "python:3.11-slim";
        let cmd: string[] = ["python", "-"];
        let envArgs: string[] = ["-e", "PYTHONDONTWRITEBYTECODE=1", "-e", "PYTHONUNBUFFERED=1"];

        switch (language) {
            case "python":
                dockerImage = "python:3.11-slim";
                cmd = ["python", "-"]; // '-' means read from stdin
                break;
            case "javascript":
                dockerImage = "node:20-alpine";
                cmd = ["node", "-"]; // Node accepts stdin by default
                envArgs = [];
                break;
            case "bash":
                dockerImage = "alpine:3.18";
                cmd = ["sh"]; // sh accepts stdin by default
                envArgs = [];
                break;
            default:
                return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
        }

        const containerName = `executor-${Date.now()}`;

        // Construct Docker arguments
        // No volumes needed - we pass code via STDIN
        const args = [
            "run",
            "--rm",
            "--name", containerName,
            "-i",             // CRITICAL: Interactive mode (allows input)
            "--network", "none",
            "--cpus", "1",
            "--memory", "256m",
            ...envArgs,
            dockerImage,
            ...cmd
        ];

        console.log(`[Executor] Spawning: docker ${args.join(" ")}`);

        // Use spawn instead of exec to handle data streams
        return new Promise<Response>((resolve) => {
            const child = spawn("docker", args);

            let stdout = "";
            let stderr = "";
            let killed = false;

            // Timeout Logic: 30 seconds
            const timer = setTimeout(() => {
                killed = true;
                child.kill(); // Kill the spawned docker process
                // Also try to kill the container specifically (in case docker CLI dies but container lives)
                spawn("docker", ["kill", containerName]);
            }, 30000); // 30s timeout

            // Feed the code into the container via STDIN
            child.stdin.write(code);
            child.stdin.end();

            // Collect Output
            child.stdout.on("data", (data) => {
                stdout += data.toString();
            });

            child.stderr.on("data", (data) => {
                stderr += data.toString();
            });

            // Handle process close
            child.on("close", (exitCode) => {
                clearTimeout(timer);

                if (killed) {
                    resolve(
                        NextResponse.json({
                            output: stdout.trim(),
                            error: "Code execution timed out (30s limit exceeded)",
                            exitCode: 124,
                            language
                        })
                    );
                } else {
                    resolve(
                        NextResponse.json({
                            output: stdout.trim(),
                            error: stderr.trim() || undefined,
                            exitCode: exitCode || 0,
                            language
                        })
                    );
                }
            });

            // Handle spawn errors (e.g., docker not found)
            child.on("error", (err) => {
                clearTimeout(timer);
                console.error("[Executor] Spawn error:", err);
                resolve(
                    NextResponse.json(
                        {
                            error: "Failed to spawn Docker process: " + err.message,
                            exitCode: 1
                        },
                        { status: 500 }
                    )
                );
            });
        });
    } catch (error: any) {
        console.error("[Executor] API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}