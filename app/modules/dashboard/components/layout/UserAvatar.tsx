interface UserAvatarProps {
  name: string;
  role: string;
  avatar: null | string;
  initials?: string;
}

export function UserAvatar({ name, role, avatar, initials }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const hasValidAvatar = avatar && avatar.trim() !== "";

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-700/30">
      {hasValidAvatar ? (
        <img
          src={avatar}
          alt="Avatar preview"
          className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30"
          onError={(e) => {
            // Fallback if image fails to load
            console.error("Failed to load avatar image");
          }}
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
          {initials || getInitials(name)}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-400 capitalize">{role}</p>
      </div>
    </div>
  );
}
