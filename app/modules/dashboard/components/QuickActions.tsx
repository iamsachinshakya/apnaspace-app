import { Plus, BarChart3, User } from "lucide-react";

interface QuickActionsProps {
  onViewAnalytics: () => void;
  onEditProfile: () => void;
}

export function QuickActions({
  onViewAnalytics,
  onEditProfile,
}: QuickActionsProps) {
  const onAddBlog = () => {};

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onAddBlog}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
        >
          <Plus size={20} />
          <span className="font-semibold">New Blog Post</span>
        </button>
        {/* Add other buttons similarly */}
      </div>
    </div>
  );
}
