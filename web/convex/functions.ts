import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveInterview = mutation({
  args: { company: v.string(), role: v.string(), difficulty: v.string(), questions: v.array(v.object({ question: v.string(), idealAnswer: v.string(), tips: v.string() })) },
  handler: async (ctx, args) => await ctx.db.insert("interviews", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("interviews").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
