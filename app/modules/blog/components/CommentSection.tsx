"use client";

import CommentForm from "@/app/modules/blog/components/CommentForm";
import CommentItem from "@/app/modules/blog/components/CommentItem";
import { Comment } from "@/app/modules/blog/types/IComment";
import { useState } from "react";

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      text: "This is an excellent deep dive into AI-powered development! I've been using GitHub Copilot for the past 6 months and the productivity gains are real.",
      likes: 24,
      replies: [
        {
          id: 11,
          user: {
            name: "Sarah Mitchell",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          },
          text: "Thanks John! Glad you found it helpful. The productivity gains are definitely significant when used correctly.",
          likes: 8,
          timestamp: "2 days ago",
          liked: false,
        },
      ],
      timestamp: "3 days ago",
      liked: false,
      showReplies: false,
      replyText: "",
    },
    {
      id: 2,
      user: {
        name: "Emily Chen",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      text: "Great article! One thing I'd add is the importance of code review even with AI assistance. We've caught several subtle bugs that AI tools missed.",
      likes: 18,
      replies: [],
      timestamp: "2 days ago",
      liked: false,
      showReplies: false,
      replyText: "",
    },
    {
      id: 3,
      user: {
        name: "Michael Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      text: "I'm curious about the IP concerns you mentioned. Has anyone here dealt with legal questions around AI-generated code in their organization?",
      likes: 31,
      replies: [
        {
          id: 31,
          user: {
            name: "Alex Thompson",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
          },
          text: "We had to establish clear policies. Our legal team requires all AI-generated code to be reviewed and approved before merging.",
          likes: 12,
          timestamp: "1 day ago",
          liked: false,
        },
        {
          id: 32,
          user: {
            name: "Lisa Park",
            avatar:
              "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
          },
          text: "Same here. We also document which parts were AI-assisted for compliance purposes.",
          likes: 7,
          timestamp: "1 day ago",
          liked: false,
        },
      ],
      timestamp: "2 days ago",
      liked: false,
      showReplies: true,
      replyText: "",
    },
  ]);

  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = (text: string) => {
    const comment: Comment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      },
      text,
      likes: 0,
      replies: [],
      timestamp: "Just now",
      liked: false,
      showReplies: false,
      replyText: "",
    };
    setComments([comment, ...comments]);
  };

  const handleLike = (commentId: number, replyId?: number) => {
    setComments((comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      liked: !reply.liked,
                      likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                    }
                  : reply
              ),
            };
          }
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  const handleAddReply = (commentId: number, replyText: string) => {
    if (replyText.trim()) {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  user: {
                    name: "You",
                    avatar:
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
                  },
                  text: replyText,
                  likes: 0,
                  timestamp: "Just now",
                  liked: false,
                },
              ],
              showReplies: true,
              replyText: "",
            };
          }
          return comment;
        })
      );
      setReplyingTo(null);
    }
  };

  const toggleReplies = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplies: !comment.showReplies }
          : comment
      )
    );
  };

  return (
    <div className="relative z-10 px-4 sm:px-6 lg:px-8 mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Comments
            </span>
          </h2>
          <p className="text-gray-400">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>

        <CommentForm onSubmit={handleAddComment} />

        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={handleLike}
              onReply={handleAddReply}
              onToggleReplies={toggleReplies}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
