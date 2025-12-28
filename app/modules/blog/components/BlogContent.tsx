import { BlogContentProps } from "@/app/modules/blog/types/IBlog";

export default function BlogContent({ content, tags }: BlogContentProps) {
  return (
    <article className="relative z-10 px-4 sm:px-6 lg:px-8 mb-20">
      <div className="max-w-6xl mx-auto">
        <div
          className="article-content prose-custom"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-16 pt-8 border-t border-gray-800/50">
          <span className="text-gray-400 font-semibold">Tags:</span>
          {tags.map((tag) => (
            <a
              href="#"
              key={tag}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-sm text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
