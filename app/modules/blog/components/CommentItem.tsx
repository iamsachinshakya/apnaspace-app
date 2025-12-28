"use client";

import { ThumbsUp, CornerDownRight, MessageCircle } from "lucide-react";
import ReplyForm from "./ReplyForm";
import { CommentItemProps } from "@/app/modules/blog/types/IComment";

export default function CommentItem({
  comment,
  onLike,
  onReply,
  onToggleReplies,
  replyingTo,
  setReplyingTo,
}: CommentItemProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-start gap-4">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="w-12 h-12 rounded-full border-2 border-cyan-500/30"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-white">{comment.user.name}</h4>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">{comment.text}</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                comment.liked
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <ThumbsUp
                size={16}
                fill={comment.liked ? "currentColor" : "none"}
              />
              <span>{comment.likes}</span>
            </button>

            <button
              onClick={() =>
                setReplyingTo(replyingTo === comment.id ? null : comment.id)
              }
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gray-700 text-sm transition-all"
            >
              <CornerDownRight size={16} />
              Reply
            </button>

            {comment.replies.length > 0 && (
              <button
                onClick={() => onToggleReplies(comment.id)}
                className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <MessageCircle size={16} />
                {comment.showReplies ? "Hide" : "View"} {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4">
              <ReplyForm
                onSubmit={(text) => {
                  onReply(comment.id, text);
                  setReplyingTo(null);
                }}
                onCancel={() => setReplyingTo(null)}
              />
            </div>
          )}

          {/* Replies */}
          {comment.showReplies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-4 pl-4 border-l-2 border-gray-700/50">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-3">
                  <img
                    src={reply.user.avatar}
                    alt={reply.user.name}
                    className="w-10 h-10 rounded-full border-2 border-purple-500/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-white text-sm">
                        {reply.user.name}
                      </h5>
                      <span className="text-xs text-gray-500">
                        {reply.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {reply.text}
                    </p>
                    <button
                      onClick={() => onLike(comment.id, reply.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                        reply.liked
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      <ThumbsUp
                        size={14}
                        fill={reply.liked ? "currentColor" : "none"}
                      />
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
