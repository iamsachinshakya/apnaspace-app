"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Edit,
  Trash2,
  Search,
  Plus,
  Ban,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useDispatch } from "react-redux";

import { authService } from "@/app/modules/auth/services/authService";
import {
  IQueryParams,
  PaginatedData,
} from "@/app/modules/common/types/common.dto";
import { IAuthDashboard } from "@/app/modules/auth/types/auth.dto";
import { useDebounce } from "@/app/shared/hooks/useDebounce";
import { useResize } from "@/app/shared/hooks/useResize";
import { PAGINATION_PAGE_LIMIT } from "@/app/modules/common/constant/constant";
import { DialogType, Mode } from "@/app/modules/overlays/types/IOverlayTypes";
import { setBottomSheet } from "@/app/modules/overlays/redux/bottomSheetSlice";
import { setDialog } from "@/app/modules/overlays/redux/dialogSlice";
import { setOverlayState } from "@/app/shared/redux/globalSlice";
import { AuthStatus, UserRole } from "@/app/modules/auth/types/auth.entity";

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Defer search query to prevent blocking UI during typing
  const debounceQuery = useDebounce(searchQuery, 700);
  const [isPending, startTransition] = useTransition();

  const [usersData, setUsersData] = useState<PaginatedData<IAuthDashboard>>();
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isErrorUsers, setIsErrorUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState<Error | null>(null);

  // Missing state variables - FIXED
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IAuthDashboard | null>(null);

  const dispatch = useDispatch();
  const { isMobile } = useResize();

  const users = usersData?.data || [];
  const totalUsers = usersData?.pagination.total || 0;
  const totalPages = Math.ceil(totalUsers / PAGINATION_PAGE_LIMIT);

  // Check if search is actively being processed
  const isSearching = searchQuery !== debounceQuery || isPending;

  // Fetch user data - FIXED to accept parameters
  const fetchUserData = async (search: string, currentPage: number) => {
    try {
      setIsLoadingUsers(true);
      setIsErrorUsers(false);

      const query: IQueryParams = {
        search: search,
        page: currentPage,
        limit: PAGINATION_PAGE_LIMIT,
      };

      const response = await authService.getAllUsers(query);

      if (!response.success) {
        setIsErrorUsers(true);
        setErrorUsers(new Error("Failed to fetch users"));
        setUsersData(undefined);
      } else {
        setUsersData(response.data!);
        setIsErrorUsers(false);
        setErrorUsers(null);
      }
    } catch (error) {
      setIsErrorUsers(true);
      setErrorUsers(
        error instanceof Error ? error : new Error("Unknown error")
      );
      setUsersData(undefined);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // FIXED: useEffect with proper dependencies
  useEffect(() => {
    fetchUserData(debounceQuery, page);
  }, [debounceQuery, page]);

  const openAuthUI = (type: DialogType, mode: Mode) => {
    const payload = { show: true, type, mode: mode };

    if (isMobile) {
      dispatch(setBottomSheet(payload));
    } else {
      dispatch(setDialog(payload));
    }
  };

  const handleCreateUser = () => {
    openAuthUI(DialogType.ADD_USER, Mode.ADD);
  };

  const handleEditUser = (user: IAuthDashboard) => {
    dispatch(setOverlayState(user));
    openAuthUI(DialogType.ADD_USER, Mode.EDIT);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Wrap in transition to mark as non-urgent
    startTransition(() => {
      setSearchQuery(value);
      // Reset to page 1 when searching
      setPage(1);
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user: IAuthDashboard) => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteUserClick = (user: IAuthDashboard) => {
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        setIsDeleting(true);
        const result = await authService.deleteUser(userToDelete.id);

        if (result.success) {
          setShowDeleteAlert(false);
          setUserToDelete(null);
          // Refresh the user list
          fetchUserData(debounceQuery, page);
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedUsers.length} selected user${
          selectedUsers.length > 1 ? "s" : ""
        }?\n\nThis action cannot be undone.`
      )
    ) {
      try {
        setIsDeleting(true);
        const result = await authService.bulkDeleteUsers(selectedUsers);

        if (result.success) {
          setSelectedUsers([]);
          // Refresh the user list
          fetchUserData(debounceQuery, page);
        }
      } catch (error) {
        console.error("Failed to delete users:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoadingUsers && !isSearching) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isErrorUsers) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="text-red-400 mx-auto mb-4" size={48} />
          <p className="text-red-400 font-semibold mb-2">Error loading users</p>
          <p className="text-gray-400 text-sm">
            {errorUsers?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-white placeholder-gray-400"
              />
              {isSearching && (
                <Loader2
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 animate-spin"
                  size={20}
                />
              )}
            </div>
            {selectedUsers.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50"
              >
                <Trash2 size={18} />
                {isDeleting
                  ? "Deleting..."
                  : `Delete (${selectedUsers.length})`}
              </button>
            )}
          </div>
          <button
            onClick={handleCreateUser}
            disabled={isCreating}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
          >
            <Plus size={20} />
            {isCreating ? "Creating..." : "Add User"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === users.length && users.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 checked:bg-cyan-500"
                  />
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  User
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Role
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Joined
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ opacity: isSearching ? 0.5 : 1 }}>
              {users.length > 0 ? (
                users.map((user: IAuthDashboard) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 checked:bg-cyan-500"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-white">
                          {user.username}
                        </p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === UserRole.ADMIN
                            ? "bg-purple-500/20 text-purple-400"
                            : user.role === UserRole.USER
                            ? "bg-blue-500/20 text-blue-400"
                            : user.role === UserRole.AUTHOR
                            ? "bg-cyan-500/20 text-cyan-500"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {user.role.toLocaleUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === AuthStatus.ACTIVE
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.status === AuthStatus.ACTIVE ? (
                          <CheckCircle size={12} />
                        ) : (
                          <Ban size={12} />
                        )}
                        {user.status === AuthStatus.ACTIVE
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {new Date(user.createdAt || "").toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          disabled={isUpdating}
                          className="p-2 hover:bg-cyan-500/10 text-cyan-400 rounded-lg transition-all disabled:opacity-50"
                          title="Edit user"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUserClick(user)}
                          disabled={isDeleting}
                          className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-all disabled:opacity-50"
                          title="Delete user"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-gray-400">
                      {debounceQuery
                        ? `No users found for "${debounceQuery}"`
                        : "No users found"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Showing {users.length} of {totalUsers} users
              {debounceQuery && (
                <span className="ml-1">for &quot;{debounceQuery}&quot;</span>
              )}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from(
                { length: Math.min(totalPages, 5) },
                (_, i) => i + 1
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm ${
                    page === pageNum
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-700/50 hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete User?
                </h3>
                <p className="text-gray-300 mb-1">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {userToDelete.username}
                  </span>
                  ?
                </p>
                <p className="text-sm text-gray-400">
                  This will permanently delete the user and all associated data.
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmDeleteUser}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all font-semibold text-white disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </button>
              <button
                onClick={() => {
                  setShowDeleteAlert(false);
                  setUserToDelete(null);
                }}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl transition-all font-semibold disabled:opacity-50"
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
