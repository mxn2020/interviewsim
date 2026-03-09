import { action } from "./_generated/server";
import { v } from "convex/values";
export const generateInterview = action({
    args: { company: v.string(), role: v.string(), difficulty: v.optional(v.string()) },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const diff = args.difficulty || "medium";
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are InterviewSim, an expert interview coach. Generate realistic interview questions for the given company and role at ${diff} difficulty. Output JSON:
{"company":"<company>","role":"<role>","difficulty":"${diff}","questions":[{"question":"<q>","idealAnswer":"<ideal answer>","tips":"<tips>"}]}
Generate 5-8 questions covering behavioral, technical, and situational categories.` },
                    { role: "user", content: `Company: ${args.company}\nRole: ${args.role}` },
                ], temperature: 0.6, max_tokens: 3000, response_format: { type: "json_object" }
            }),
        });
        if (!response.ok) throw new Error(`API error: ${await response.text()}`);
        return JSON.parse((await response.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
