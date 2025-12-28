"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Save, Tag, Hash, FileText } from "lucide-react";

interface Category {
  id?: number;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSave?: (category: Category) => Promise<void>;
}

const colorOptions = [
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "pink", label: "Pink", class: "bg-pink-500" },
  { value: "orange", label: "Orange", class: "bg-orange-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
];

export function CategoryModal({
  isOpen,
  onClose,
  category,
  onSave,
}: CategoryModalProps) {
  const [formData, setFormData] = useState<Category>({
    name: "",
    slug: "",
    description: "",
    color: "purple",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const isEditMode = !!category?.id;

  // Client-side only mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        color: "purple",
      });
    }
  }, [category]);

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push("Category name is required");
    }

    if (!formData.slug.trim()) {
      newErrors.push("Slug is required");
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.push(
        "Slug can only contain lowercase letters, numbers, and hyphens"
      );
    }

    if (!formData.description.trim()) {
      newErrors.push("Description is required");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave?.(formData);
      setErrors([]);
      onClose();
    } catch (error: any) {
      setErrors([error.message || "Failed to save category"]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="relative w-full max-w-xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-transparent blur-3xl pointer-events-none"></div>

          <div className="relative z-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {isEditMode ? "Edit Category" : "Create New Category"}
              </h2>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="p-2 rounded-full hover:bg-gray-700/50 transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <ul className="text-sm text-red-300 space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    Category Name *
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Artificial Intelligence"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Hash size={16} />
                    Slug (URL-friendly) *
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="e.g., artificial-intelligence"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Preview: /category/{formData.slug || "slug"}
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    Description *
                  </div>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Brief description of this category..."
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 resize-none"
                ></textarea>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Category Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, color: color.value })
                      }
                      disabled={isLoading}
                      className={`relative p-4 rounded-xl ${
                        color.class
                      } hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        formData.color === color.value
                          ? "ring-4 ring-white/50"
                          : ""
                      }`}
                    >
                      {formData.color === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Selected:{" "}
                  <span className="font-semibold capitalize">
                    {formData.color}
                  </span>
                </p>
              </div>

              {/* Preview */}
              <div className="p-4 bg-gray-700/20 rounded-xl border border-gray-700/50">
                <p className="text-xs font-semibold text-gray-400 mb-2">
                  Preview
                </p>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${formData.color}-500/20`}>
                    <Tag size={20} className={`text-${formData.color}-400`} />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {formData.name || "Category Name"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formData.description || "Category description"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-purple-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {isEditMode ? "Update Category" : "Create Category"}
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render portal to document.body
  return createPortal(modalContent, document.body);
}
