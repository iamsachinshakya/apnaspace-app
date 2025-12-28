import { apiClient } from "@/app/lib/api/client";
import { Blog, BlogFilters, BlogsResponse, CreateBlogData, UpdateBlogData } from "@/app/modules/blog/types/IBlog";


export const blogService = {
    // Get all blogs with filters
    getBlogs: async (filters?: BlogFilters): Promise<BlogsResponse> => {
        const { data } = await apiClient.get("/blogs", { params: filters });
        return data;
    },

    // Get single blog by ID
    getBlogById: async (id: string): Promise<Blog> => {
        const { data } = await apiClient.get(`/blogs/${id}`);
        return data;
    },

    // Create new blog
    createBlog: async (blogData: CreateBlogData): Promise<Blog> => {
        const { data } = await apiClient.post("/blogs", blogData);
        return data;
    },

    // Update existing blog
    updateBlog: async (id: string, blogData: UpdateBlogData): Promise<Blog> => {
        const { data } = await apiClient.patch(`/blogs/${id}`, blogData);
        return data;
    },

    // Delete blog
    deleteBlog: async (id: string): Promise<void> => {
        await apiClient.delete(`/blogs/${id}`);
    },

    // Toggle publish status
    togglePublish: async (id: string, published: boolean): Promise<Blog> => {
        const { data } = await apiClient.patch(`/blogs/${id}/publish`, {
            published,
        });
        return data;
    },
};
