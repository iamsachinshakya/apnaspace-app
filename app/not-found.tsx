export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white scrollbar-custom flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-extrabold tracking-widest">404</h1>
      <p className="mt-4 text-xl opacity-80">Page Not Found</p>

      <a
        href="/"
        className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md transition-all"
      >
        Go Home
      </a>
    </div>
  );
}
