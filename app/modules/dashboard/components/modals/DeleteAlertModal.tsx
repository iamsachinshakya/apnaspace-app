import { IAuthDashboard } from "@/app/modules/auth/types/auth.dto";
import { AlertTriangle } from "lucide-react";
import React from "react";

type DeleteAlertProps<T> = {
  /** Controls modal visibility */
  isOpen: boolean;

  /** Item being deleted (user, post, comment, category, etc.) */
  item: T | null;

  /** Display name shown in the UI (username, title, name, etc.) */
  itemName: string;

  /** Entity label used in text: User, Post, Comment, Category */
  entityLabel: string;

  /** Called when delete is confirmed */
  onConfirm: () => void | Promise<void>;

  /** Called when modal is cancelled */
  onCancel: () => void;

  /** Loading state */
  isDeleting?: boolean;
};

function DeleteAlert({
  isOpen,
  item,
  itemName,
  entityLabel,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteAlertProps<IAuthDashboard>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-red-500/20 rounded-full">
            <AlertTriangle className="text-red-400" size={24} />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Delete {entityLabel}?
            </h3>

            <p className="text-gray-300 mb-1">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">{itemName}</span>?
            </p>

            <p className="text-sm text-gray-400">
              This will permanently delete the {entityLabel.toLowerCase()} and
              all associated data. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all font-semibold text-white disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : `Delete ${entityLabel}`}
          </button>

          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl transition-all font-semibold text-white disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAlert;
