"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Save, Upload } from "lucide-react";
import { TiptapEditor } from "@/app/modules/dashboard/editors/TiptapEditor";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { title: string; content: string; category: string }) => void;
}

export function AddBlogModal({ isOpen, onClose, onSave }: AddBlogModalProps) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    onSave?.({
      title: blogTitle,
      content: blogContent,
      category: blogCategory,
    });
    // Reset form
    setBlogTitle("");
    setBlogContent("");
    setBlogCategory("");
    setFeaturedImage(null);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="relative w-full max-w-4xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl pointer-events-none"></div>

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Create New Blog Post
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Blog Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Enter your blog title..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                >
                  <option value="">Select a category</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="web3">Blockchain & Web3</option>
                  <option value="cloud">Cloud Computing</option>
                  <option value="webdev">Web Development</option>
                </select>
              </div>

              {/* Content with Tiptap Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Content *
                </label>
                <TiptapEditor
                  content={blogContent}
                  onChange={setBlogContent}
                  placeholder="Start writing your amazing blog post..."
                />
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Featured Image
                </label>
                {featuredImage ? (
                  <div className="relative">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setFeaturedImage(null)}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-700/50 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all cursor-pointer block">
                    <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                    <p className="text-gray-400 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={!blogTitle || !blogContent || !blogCategory}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  Publish Blog
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
