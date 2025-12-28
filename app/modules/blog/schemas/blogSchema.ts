// // src/features/blog/schemas/blog.schema.ts
// import { z } from "zod";

// export const blogSchema = z.object({
//     title: z
//         .string()
//         .min(3, "Title must be at least 3 characters")
//         .max(200, "Title must not exceed 200 characters"),
//     content: z
//         .string()
//         .min(50, "Content must be at least 50 characters")
//         .max(50000, "Content must not exceed 50,000 characters"),
//     excerpt: z
//         .string()
//         .max(300, "Excerpt must not exceed 300 characters")
//         .optional()
//         .or(z.literal("")),
//     author: z.string().min(2, "Author name is required"),
//     category: z.string().min(1, "Category is required"),
//     tags: z.array(z.string()).min(1, "At least one tag is required"),
//     coverImage: z
//         .string()
//         .url("Must be a valid URL")
//         .optional()
//         .or(z.literal("")),
//     published: z.boolean().default(false),
// });

// export type BlogFormData = z.infer<typeof blogSchema>;
