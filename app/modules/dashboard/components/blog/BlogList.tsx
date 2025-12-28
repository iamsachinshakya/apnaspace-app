import { BlogCard } from "./BlogCard";

interface BlogListProps {
  blogs: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
    status: string;
    date: string;
    onEditBlog: (id: string) => void;
    onDeleteBlog: (id: string) => void;
  }>;
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
}
