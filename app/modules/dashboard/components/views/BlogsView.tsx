"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { SearchBar } from "@/app/modules/category/components/SearchBar";
import { BlogCard } from "@/app/modules/dashboard/components/blog/BlogCard";
import { useDispatch } from "react-redux";
import { useResize } from "@/app/shared/hooks/useResize";
import { setBottomSheet } from "@/app/modules/overlays/redux/bottomSheetSlice";
import { DialogType } from "@/app/modules/overlays/types/IOverlayTypes";
import { setDialog } from "@/app/modules/overlays/redux/dialogSlice";

const blogs = [
  {
    id: "1",
    title: "The Rise of Quantum Computing",
    views: 12400,
    likes: 856,
    status: "Published",
    date: "Nov 8, 2025",
  },
  {
    id: "2",
    title: "Web3 Infrastructure Deep Dive",
    views: 9800,
    likes: 623,
    status: "Published",
    date: "Nov 7, 2025",
  },
  {
    id: "3",
    title: "AI Ethics in 2025",
    views: 8200,
    likes: 512,
    status: "Draft",
    date: "Nov 6, 2025",
  },
  {
    id: "4",
    title: "Serverless Edge Computing",
    views: 15600,
    likes: 1024,
    status: "Published",
    date: "Nov 5, 2025",
  },
];

interface BlogsViewProps {}

export function BlogsView({}: BlogsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { isMobile } = useResize();

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;

    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const onAddBlog = () => {
    if (isMobile) {
      dispatch(
        setBottomSheet({
          show: true,
          type: DialogType.ADD_BLOG,
          mode: null,
        })
      );
    } else {
      dispatch(
        setDialog({
          show: true,
          type: DialogType.ADD_BLOG,
          mode: null,
        })
      );
    }
  };

  const onEditBlog = (id: string) => {
    if (isMobile) {
      dispatch(
        setBottomSheet({
          show: true,
          type: DialogType.ADD_BLOG,
          mode: null,
        })
      );
    } else {
      dispatch(
        setDialog({
          show: true,
          type: DialogType.ADD_BLOG,
          mode: null,
        })
      );
    }
  };

  const onDeleteBlog = (id: string) => {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search blogs..."
        />
        <button
          onClick={onAddBlog}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 whitespace-nowrap"
        >
          <Plus size={20} />
          New Blog
        </button>
      </div>

      {/* Display filtered results count */}
      {searchQuery && (
        <div className="text-sm text-gray-400">
          Found {filteredBlogs.length} blog
          {filteredBlogs.length !== 1 ? "s" : ""} matching "{searchQuery}"
        </div>
      )}

      {/* Blog list */}
      <div className="grid gap-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              onDeleteBlog={(id) => onDeleteBlog(id)}
              onEditBlog={(id) => onEditBlog(id)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
            <p className="text-gray-400 text-lg">
              No blogs found matching your search.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
