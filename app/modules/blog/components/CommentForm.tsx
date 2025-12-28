"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
      >
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="Your avatar"
            className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
          />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={!text.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={18} />
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
