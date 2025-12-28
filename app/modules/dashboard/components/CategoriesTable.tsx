"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, Tag, AlertTriangle } from "lucide-react";
import { CategoryModal } from "@/app/modules/dashboard/components/modals/CategoryModal";

interface Category {
  id?: number;
  name: string;
  slug: string;
  description: string;
  posts?: number;
  color: string;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Artificial Intelligence",
    slug: "ai",
    description: "AI and machine learning topics",
    posts: 45,
    color: "purple",
  },
  {
    id: 2,
    name: "Blockchain & Web3",
    slug: "web3",
    description: "Decentralized technologies",
    posts: 28,
    color: "cyan",
  },
  {
    id: 3,
    name: "Cloud Computing",
    slug: "cloud",
    description: "Cloud infrastructure and services",
    posts: 33,
    color: "blue",
  },
  {
    id: 4,
    name: "Web Development",
    slug: "webdev",
    description: "Frontend and backend development",
    posts: 52,
    color: "green",
  },
];

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  // Modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Delete confirmation state
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  // Handle create new category
  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowCategoryModal(true);
  };

  // Handle edit category
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  // Save category (create or update)
  const handleSaveCategory = async (categoryData: Category) => {
    try {
      if (categoryData.id) {
        // Update existing category
        setCategories(
          categories.map((c) => (c.id === categoryData.id ? categoryData : c))
        );
        console.log("Category updated:", categoryData);
      } else {
        // Create new category
        const newCategory = {
          ...categoryData,
          id: Math.max(...categories.map((c) => c.id || 0)) + 1,
          posts: 0,
        };
        setCategories([...categories, newCategory]);
        console.log("Category created:", newCategory);
      }

      setShowCategoryModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      throw error;
    }
  };

  // Show delete confirmation
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteAlert(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setShowDeleteAlert(false);
      setCategoryToDelete(null);
    }
  };

  // Color mapping for Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
      cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
      blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
      green: { bg: "bg-green-500/20", text: "text-green-400" },
      pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
      orange: { bg: "bg-orange-500/20", text: "text-orange-400" },
      red: { bg: "bg-red-500/20", text: "text-red-400" },
      yellow: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Categories</h3>
            <p className="text-sm text-gray-400 mt-1">
              Manage your blog categories and organize content
            </p>
          </div>
          <button
            onClick={handleCreateCategory}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-700/20 rounded-xl border border-gray-700/50">
            <p className="text-sm text-gray-400">Total Categories</p>
            <p className="text-2xl font-bold mt-1">{categories.length}</p>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-xl border border-gray-700/50">
            <p className="text-sm text-gray-400">Total Posts</p>
            <p className="text-2xl font-bold mt-1">
              {categories.reduce((sum, c) => sum + (c.posts || 0), 0)}
            </p>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-xl border border-gray-700/50">
            <p className="text-sm text-gray-400">Avg Posts/Category</p>
            <p className="text-2xl font-bold mt-1">
              {Math.round(
                categories.reduce((sum, c) => sum + (c.posts || 0), 0) /
                  categories.length
              )}
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <div
                key={category.id}
                className="p-5 bg-gray-700/20 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${colorClasses.bg}`}>
                      <Tag size={24} className={colorClasses.text} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-400">/{category.slug}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm font-semibold">
                    {category.posts || 0} posts
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  {category.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12 bg-gray-700/20 rounded-xl border border-gray-700/50">
            <Tag className="mx-auto mb-4 text-gray-500" size={48} />
            <p className="text-gray-400 text-lg font-semibold">
              No categories yet
            </p>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Create your first category to organize your content
            </p>
            <button
              onClick={handleCreateCategory}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        )}
      </div>

      {/* Category Create/Edit Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => {
          setShowCategoryModal(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Category?
                </h3>
                <p className="text-gray-300 mb-2">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {categoryToDelete.name}
                  </span>
                  ?
                </p>

                {/* Category Preview */}
                <div className="p-3 bg-gray-700/30 rounded-lg my-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        getColorClasses(categoryToDelete.color).bg
                      }`}
                    >
                      <Tag
                        size={16}
                        className={getColorClasses(categoryToDelete.color).text}
                      />
                    </div>
                    <span className="text-sm text-gray-400">
                      /{categoryToDelete.slug}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {categoryToDelete.description}
                  </p>
                </div>

                {/* Warning about posts */}
                {categoryToDelete.posts && categoryToDelete.posts > 0 ? (
                  <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg mb-3">
                    <p className="text-sm text-orange-300">
                      ⚠️ This category has{" "}
                      <span className="font-semibold">
                        {categoryToDelete.posts} blog post
                        {categoryToDelete.posts > 1 ? "s" : ""}
                      </span>
                      . They will be uncategorized.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mb-3">
                    This category has no posts.
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all font-semibold text-white"
              >
                Delete Category
              </button>
              <button
                onClick={() => {
                  setShowDeleteAlert(false);
                  setCategoryToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
