"use client";

import { useState } from "react";
import {
  Edit,
  Trash2,
  Search,
  Flag,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { CommentEditModal } from "@/app/modules/dashboard/components/modals/CommentEditModal";

interface Comment {
  id: number;
  user: string;
  content: string;
  post: string;
  date: string;
  status: "Approved" | "Pending" | "Spam";
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: "John Doe",
    content: "Great article! Very informative.",
    post: "The Rise of Quantum Computing",
    date: "2025-11-15",
    status: "Approved",
  },
  {
    id: 2,
    user: "Jane Smith",
    content: "Thanks for sharing this!",
    post: "Web3 Infrastructure",
    date: "2025-11-16",
    status: "Approved",
  },
  {
    id: 3,
    user: "Bob Wilson",
    content: "Could you explain more about...",
    post: "AI Ethics in 2025",
    date: "2025-11-17",
    status: "Pending",
  },
  {
    id: 4,
    user: "Spam Bot",
    content: "Check out my website for...",
    post: "Quantum Computing",
    date: "2025-11-18",
    status: "Spam",
  },
];

export function CommentsTable() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "Approved" | "Pending" | "Spam"
  >("all");

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  // Delete confirmation state
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || comment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle edit comment
  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setShowEditModal(true);
  };

  // Save edited comment
  const handleSaveComment = async (updatedComment: Comment) => {
    try {
      setComments(
        comments.map((c) => (c.id === updatedComment.id ? updatedComment : c))
      );
      console.log("Comment updated:", updatedComment);
      setShowEditModal(false);
      setEditingComment(null);
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  };

  // Show delete confirmation
  const handleDeleteClick = (comment: Comment) => {
    setCommentToDelete(comment);
    setShowDeleteAlert(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (commentToDelete) {
      setComments(comments.filter((c) => c.id !== commentToDelete.id));
      setShowDeleteAlert(false);
      setCommentToDelete(null);
    }
  };

  // Quick status updates
  const handleApprove = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, status: "Approved" as const } : c
      )
    );
  };

  const handleMarkAsSpam = (id: number) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: "Spam" as const } : c))
    );
  };

  const handleMarkAsPending = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, status: "Pending" as const } : c
      )
    );
  };

  // Get status counts
  const statusCounts = {
    all: comments.length,
    Approved: comments.filter((c) => c.status === "Approved").length,
    Pending: comments.filter((c) => c.status === "Pending").length,
    Spam: comments.filter((c) => c.status === "Spam").length,
  };

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search comments..."
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-white placeholder-gray-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-white"
          >
            <option value="all">All Status ({statusCounts.all})</option>
            <option value="Approved">Approved ({statusCounts.Approved})</option>
            <option value="Pending">Pending ({statusCounts.Pending})</option>
            <option value="Spam">Spam ({statusCounts.Spam})</option>
          </select>
        </div>

        {/* Comments List */}
        <div className="space-y-3">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-700/20 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-white">{comment.user}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        comment.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : comment.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {comment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    on <span className="text-cyan-400">{comment.post}</span>
                  </p>
                  <p className="text-gray-300">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{comment.date}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-700/50 flex-wrap">
                {/* Quick Approve (only for Pending/Spam) */}
                {comment.status !== "Approved" && (
                  <button
                    onClick={() => handleApprove(comment.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all text-sm"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                )}

                {/* Mark as Pending (only for Approved/Spam) */}
                {comment.status !== "Pending" && (
                  <button
                    onClick={() => handleMarkAsPending(comment.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-all text-sm"
                  >
                    <AlertTriangle size={16} />
                    Pending
                  </button>
                )}

                {/* Edit Comment */}
                <button
                  onClick={() => handleEditComment(comment)}
                  className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all text-sm"
                >
                  <Edit size={16} />
                  Edit
                </button>

                {/* Mark as Spam (only for non-Spam) */}
                {comment.status !== "Spam" && (
                  <button
                    onClick={() => handleMarkAsSpam(comment.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-all text-sm"
                  >
                    <Flag size={16} />
                    Spam
                  </button>
                )}

                {/* Delete */}
                <button
                  onClick={() => handleDeleteClick(comment)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredComments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No comments found</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>

      {/* Edit Comment Modal */}
      <CommentEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingComment(null);
        }}
        comment={editingComment}
        onSave={handleSaveComment}
      />

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Comment?
                </h3>
                <p className="text-gray-300 mb-2">
                  Are you sure you want to delete this comment from{" "}
                  <span className="font-semibold text-white">
                    {commentToDelete.user}
                  </span>
                  ?
                </p>
                <div className="p-3 bg-gray-700/30 rounded-lg mt-3">
                  <p className="text-sm text-gray-300 italic">
                    "{commentToDelete.content}"
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all font-semibold text-white"
              >
                Delete Comment
              </button>
              <button
                onClick={() => {
                  setShowDeleteAlert(false);
                  setCommentToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
