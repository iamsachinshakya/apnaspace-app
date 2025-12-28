import { Twitter, Facebook, Linkedin } from "lucide-react";

export default function ShareMenu() {
  const shareButtons = [
    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500" },
  ];

  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl overflow-hidden">
      {shareButtons.map((button, index) => {
        const Icon = button.icon;
        return (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 ${button.color} hover:bg-gray-700/50 transition-all duration-200`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
}
