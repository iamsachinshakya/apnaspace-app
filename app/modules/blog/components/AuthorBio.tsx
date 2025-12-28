import { AuthorBioProps } from "@/app/modules/blog/types/IBlog";

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-purple-900/20 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 rounded-2xl border-4 border-cyan-500/30 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {author.name}
                  </h3>
                  <p className="text-sm text-cyan-400 font-medium">
                    Senior Tech Writer
                  </p>
                </div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-sm hover:scale-[1.02] transition-transform shadow-lg">
                  Follow
                </button>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{author.bio}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="font-bold text-white">{author.posts}</span>
                  <span className="text-gray-400 ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-bold text-white">
                    {author.followers}
                  </span>
                  <span className="text-gray-400 ml-1">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
