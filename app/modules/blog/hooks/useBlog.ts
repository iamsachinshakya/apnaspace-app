// src/features/blog/hooks/useBlog.ts
import { blogService } from "@/app/modules/blog/services/blogService";
import { Blog, BlogFilters, BlogsResponse, CreateBlogData, UpdateBlogData } from "@/app/modules/blog/types/IBlog";
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Query keys factory
export const blogKeys = {
    all: ["blogs"] as const,
    lists: () => [...blogKeys.all, "list"] as const,
    list: (filters?: BlogFilters) => [...blogKeys.lists(), filters] as const,
    details: () => [...blogKeys.all, "detail"] as const,
    detail: (id: string) => [...blogKeys.details(), id] as const,
};

// Get all blogs with filters
export function useBlogs(filters?: BlogFilters) {
    return useQuery<BlogsResponse>({
        queryKey: blogKeys.list(filters),
        queryFn: () => blogService.getBlogs(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Get single blog
export function useBlog(id: string) {
    return useQuery<Blog>({
        queryKey: blogKeys.detail(id),
        queryFn: () => blogService.getBlogById(id),
        enabled: !!id,
    });
}

// Create blog mutation
export function useCreateBlog() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBlogData) => blogService.createBlog(data),
        onSuccess: (newBlog) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });

            toast.success("Blog created successfully!");
            router.push(`/blogs/${newBlog.id}`);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create blog");
        },
    });
}

// Update blog mutation
export function useUpdateBlog() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBlogData }) =>
            blogService.updateBlog(id, data),
        onMutate: async ({ id, data }) => {
            // Cancel outgoing queries
            await queryClient.cancelQueries({ queryKey: blogKeys.detail(id) });

            // Snapshot previous value
            const previousBlog = queryClient.getQueryData<Blog>(blogKeys.detail(id));

            // Optimistically update cache
            queryClient.setQueryData<Blog>(blogKeys.detail(id), (old) => ({
                ...old!,
                ...data,
            }));

            return { previousBlog };
        },
        onError: (error, { id }, context) => {
            // Rollback on error
            if (context?.previousBlog) {
                queryClient.setQueryData(blogKeys.detail(id), context.previousBlog);
            }
            toast.error("Failed to update blog");
        },
        onSuccess: (updatedBlog) => {
            // Update cache
            queryClient.setQueryData(blogKeys.detail(updatedBlog.id), updatedBlog);
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });

            toast.success("Blog updated successfully!");
            router.push(`/blogs/${updatedBlog.id}`);
        },
    });
}

// Delete blog mutation
export function useDeleteBlog() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => blogService.deleteBlog(id),
        onMutate: async (deletedId) => {
            // Cancel queries
            await queryClient.cancelQueries({ queryKey: blogKeys.detail(deletedId) });

            // Snapshot
            const previousBlog = queryClient.getQueryData<Blog>(
                blogKeys.detail(deletedId)
            );

            return { previousBlog, deletedId };
        },
        onSuccess: (_, deletedId) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: blogKeys.detail(deletedId) });
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });

            toast.success("Blog deleted successfully!");
            router.push("/blogs");
        },
        onError: (error, _, context) => {
            // Restore on error
            if (context?.previousBlog) {
                queryClient.setQueryData(
                    blogKeys.detail(context.deletedId),
                    context.previousBlog
                );
            }
            toast.error("Failed to delete blog");
        },
    });
}

// Toggle publish mutation
export function useTogglePublish() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, published }: { id: string; published: boolean }) =>
            blogService.togglePublish(id, published),
        onMutate: async ({ id, published }) => {
            await queryClient.cancelQueries({ queryKey: blogKeys.detail(id) });

            const previousBlog = queryClient.getQueryData<Blog>(blogKeys.detail(id));

            queryClient.setQueryData<Blog>(blogKeys.detail(id), (old) => ({
                ...old!,
                published,
            }));

            return { previousBlog };
        },
        onError: (error, { id }, context) => {
            if (context?.previousBlog) {
                queryClient.setQueryData(blogKeys.detail(id), context.previousBlog);
            }
            toast.error("Failed to update publish status");
        },
        onSuccess: (updatedBlog) => {
            queryClient.setQueryData(blogKeys.detail(updatedBlog.id), updatedBlog);
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });

            toast.success(
                `Blog ${updatedBlog.published ? "published" : "unpublished"} successfully!`
            );
        },
    });
}
