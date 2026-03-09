import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  interviews: defineTable({
    company: v.string(), role: v.string(), difficulty: v.string(),
    questions: v.array(v.object({ question: v.string(), idealAnswer: v.string(), tips: v.string() })),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
