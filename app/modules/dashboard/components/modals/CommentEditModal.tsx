"use client";

import { useState, useEffect } from "react";
import { X, Save, MessageSquare, User, FileText } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  content: string;
  post: string;
  date: string;
  status: "Approved" | "Pending" | "Spam";
}

interface CommentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment | null;
  onSave?: (comment: Comment) => Promise<void>;
}

export function CommentEditModal({
  isOpen,
  onClose,
  comment,
  onSave,
}: CommentEditModalProps) {
  const [formData, setFormData] = useState<Comment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (comment) {
      setFormData({ ...comment });
    }
  }, [comment]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData?.content.trim()) {
      newErrors.push("Comment content is required");
    }

    if (formData?.content && formData.content.length < 10) {
      newErrors.push("Comment must be at least 10 characters long");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!formData || !validateForm()) return;

    setIsLoading(true);
    try {
      await onSave?.(formData);
      onClose();
    } catch (error: any) {
      setErrors([error.message || "Failed to update comment"]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-transparent blur-3xl"></div>

        <div className="relative z-10 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Edit Comment
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <ul className="text-sm text-red-300 space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-5">
            {/* Comment Info (Read-only) */}
            <div className="p-4 bg-gray-700/20 rounded-xl border border-gray-700/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                    <User size={14} />
                    Author
                  </label>
                  <p className="text-white font-semibold">{formData.user}</p>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                    <FileText size={14} />
                    Post
                  </label>
                  <p className="text-white font-semibold truncate">
                    {formData.post}
                  </p>
                </div>
              </div>
            </div>

            {/* Comment Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  Comment Content
                </div>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={8}
                placeholder="Edit comment content..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500 resize-none"
              ></textarea>
              <p className="text-xs text-gray-400 mt-1">
                {formData.content.length} characters
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Status
              </label>
              <div className="flex gap-3">
                {(["Approved", "Pending", "Spam"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                      formData.status === status
                        ? status === "Approved"
                          ? "bg-green-500/20 text-green-400 ring-2 ring-green-500/50"
                          : status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400 ring-2 ring-yellow-500/50"
                          : "bg-red-500/20 text-red-400 ring-2 ring-red-500/50"
                        : "bg-gray-700/20 text-gray-400 hover:bg-gray-700/30"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Posted on:</span>
                <span className="text-blue-300 font-semibold">
                  {formData.date}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-blue-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Comment
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
