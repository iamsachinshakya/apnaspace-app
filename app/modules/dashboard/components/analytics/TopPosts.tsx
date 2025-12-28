import { TrendingUp } from "lucide-react";

interface Post {
  id: number;
  title: string;
  views: number;
}

interface TopPostsProps {
  posts: Post[];
}

export function TopPosts({ posts }: TopPostsProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-bold mb-4">Top Performing Posts</h3>
      <div className="space-y-3">
        {posts.map((post, idx) => (
          <div
            key={post.id}
            className="flex items-center gap-4 p-4 bg-gray-700/20 rounded-xl"
          >
            <span className="text-2xl font-bold text-gray-500">#{idx + 1}</span>
            <div className="flex-1">
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-sm text-gray-400">
                {post.views.toLocaleString()} views
              </p>
            </div>
            <div className="text-right">
              <TrendingUp className="text-green-400 mb-1" size={20} />
              <p className="text-sm text-green-400">
                +{Math.floor(Math.random() * 20)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
