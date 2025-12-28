"use client";

import { Eye, Heart, Calendar, Edit, Trash2 } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  views: number;
  likes: number;
  status: string;
  date: string;
  onEditBlog: (id: string) => void;
  onDeleteBlog: (id: string) => void;
}

export function BlogCard({
  id,
  title,
  views,
  likes,
  status,
  date,
  onEditBlog,
  onDeleteBlog,
}: BlogCardProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {views.toLocaleString()} views
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} /> {likes} likes
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {date}
            </span>
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm ${
            status === "Published"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onDeleteBlog(id)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all"
        >
          <Edit size={16} />
          Edit
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all">
          <Eye size={16} />
          View
        </button>
        <button
          onClick={() => onEditBlog(id)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
