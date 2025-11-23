import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { prompt } = await request.json();

        if (!prompt || prompt.trim() === "") {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "OPENROUTER_API_KEY not configured" },
                { status: 500 }
            );
        }

        // Helper: fetch with retries for transient errors (network, 5xx, 429)
        const maxAttempts = 3;
        const url = "https://openrouter.ai/api/v1/chat/completions";
        let attempt = 0;
        let response: Response | null = null;
        let text = "";

        while (attempt < maxAttempts) {
            attempt += 1;
            try {
                const controller = new AbortController();
                const timeoutMs = 20000; // 20s
                const timeout = setTimeout(() => controller.abort(), timeoutMs);

                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                        "HTTP-Referer": process.env.OPENROUTER_REFERER || "http://localhost:3000",
                        "X-Title": "ExecutorAI",
                    },
                    signal: controller.signal,
                    body: JSON.stringify({
                        model: "google/gemini-2.0-flash-exp:free",
                        messages: [
                            {
                                role: "user",
                                content: prompt,
                            },
                        ],
                        temperature: 0.7,
                        max_tokens: 1024,
                    }),
                });

                clearTimeout(timeout);
            } catch (err: any) {
                // network error or timeout
                console.error(`OpenRouter fetch attempt ${attempt} failed:`, err?.message || err);
                if (attempt < maxAttempts) {
                    const backoff = 500 * attempt; // ms
                    await new Promise((r) => setTimeout(r, backoff));
                    continue;
                }
                return NextResponse.json({ error: `Provider failed after ${attempt} attempts: ${err?.message || err}` }, { status: 502 });
            }

            try {
                text = await response.text();
            } catch (err: any) {
                console.error(`Failed to read response text on attempt ${attempt}:`, err?.message || err);
                if (attempt < maxAttempts) {
                    const backoff = 500 * attempt;
                    await new Promise((r) => setTimeout(r, backoff));
                    continue;
                }
                return NextResponse.json({ error: `Provider returned unreadable response after ${attempt} attempts` }, { status: 502 });
            }

            // If transient server error or rate limit, retry
            if (!response.ok && (response.status === 429 || (response.status >= 500 && response.status < 600))) {
                console.error(`OpenRouter transient status ${response.status} on attempt ${attempt}. Body:`, text);
                if (attempt < maxAttempts) {
                    const backoff = 500 * attempt;
                    await new Promise((r) => setTimeout(r, backoff));
                    continue;
                }
            }

            // break out to normal handling
            break;
        }

        if (!response) {
            return NextResponse.json({ error: "No response from provider" }, { status: 502 });
        }

        if (!response.ok) {
            // Try to parse JSON body if possible, otherwise return raw text
            let parsed: any = null;
            try {
                parsed = JSON.parse(text);
            } catch (e) {
                // not JSON
            }

            // Log full response for debugging
            console.error(`OpenRouter error (status ${response.status}):`);
            console.error("Response body:", text);
            console.error("Parsed:", parsed);

            const providerMessage =
                parsed?.error?.message ||
                parsed?.message ||
                parsed?.detail ||
                parsed?.error?.type ||
                (text && text.length < 500 ? text : null) ||
                `HTTP ${response.status}`;

            const errorMsg = providerMessage && providerMessage.trim()
                ? providerMessage
                : `Server error (${response.status})`;

            return NextResponse.json(
                { error: errorMsg },
                { status: response.status }
            );
        }

        let data: any = null;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON from OpenRouter response:", text);
            return NextResponse.json({ error: "Invalid response from provider" }, { status: 502 });
        }

        const result = data.choices?.[0]?.message?.content || data.output || data.result || "";

        return NextResponse.json({ result });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
