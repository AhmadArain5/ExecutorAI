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

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
                "HTTP-Referer": process.env.OPENROUTER_REFERER || "http://localhost:3000",
                "X-Title": "ExecutorAI",
            },
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

        const text = await response.text();

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
                (text && text.length < 500 ? text : null) ||
                `HTTP ${response.status}`;

            return NextResponse.json(
                { error: `Provider returned error: ${providerMessage}` },
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
