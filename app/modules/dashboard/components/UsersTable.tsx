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
import DeleteAlert from "@/app/modules/dashboard/components/modals/DeleteAlertModal";
import Pagination from "@/app/modules/dashboard/components/pagination/Pagination";

type DeleteMode = "single" | "bulk";

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usersData, setUsersData] = useState<PaginatedData<IAuthDashboard>>();
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IAuthDashboard | null>(null);
  const [deleteMode, setDeleteMode] = useState<DeleteMode>("single");

  const debounceQuery = useDebounce(searchQuery, 700);
  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch();
  const { isMobile } = useResize();

  const users = usersData?.data || [];
  const totalUsers = usersData?.pagination.total || 0;
  const totalPages = Math.ceil(totalUsers / PAGINATION_PAGE_LIMIT);
  const isSearching = searchQuery !== debounceQuery || isPending;

  // Fetch user data
  const fetchUserData = async (search: string, currentPage: number) => {
    try {
      setIsLoadingUsers(true);
      setError(null);

      const query: IQueryParams = {
        search,
        page: currentPage,
        limit: PAGINATION_PAGE_LIMIT,
      };

      const response = await authService.getAllAuthUsers(query);

      if (!response.success) {
        setError(new Error("Failed to fetch users"));
        setUsersData(undefined);
      } else {
        setUsersData(response.data!);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setUsersData(undefined);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUserData(debounceQuery, page);
  }, [debounceQuery, page]);

  const openAuthUI = (type: DialogType, mode: Mode) => {
    const payload = { show: true, type, mode };

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
    startTransition(() => {
      setSearchQuery(value);
      setPage(1);
    });
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === users.length ? [] : users.map((user) => user.id)
    );
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteUserClick = (user: IAuthDashboard) => {
    setDeleteMode("single");
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);

      if (deleteMode === "single" && userToDelete) {
        const result = await authService.deleteUser(userToDelete.id);

        if (result.success) {
          setUserToDelete(null);
        }
      }

      if (deleteMode === "bulk") {
        const result = await authService.bulkDeleteUsers(selectedUsers);

        if (result.success) {
          setSelectedUsers([]);
        }
      }

      setShowDeleteAlert(false);
      fetchUserData(debounceQuery, page);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
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

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="text-red-400 mx-auto mb-4" size={48} />
          <p className="text-red-400 font-semibold mb-2">Error loading users</p>
          <p className="text-gray-400 text-sm">
            {error.message || "Something went wrong"}
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
                onClick={() => {
                  setDeleteMode("bulk");
                  setShowDeleteAlert(true);
                }}
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
          >
            <Plus size={20} />
            Add User
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
                          className="p-2 hover:bg-cyan-500/10 text-cyan-400 rounded-lg transition-all"
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
          <Pagination
            currentCount={users.length}
            totalCount={totalUsers}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            searchQuery={debounceQuery}
            entityLabel="users"
          />
        )}
      </div>

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && (
        <DeleteAlert
          isOpen={showDeleteAlert}
          item={deleteMode === "single" ? userToDelete : null}
          itemName={
            deleteMode === "single"
              ? userToDelete?.username!
              : `${selectedUsers.length} users`
          }
          entityLabel={deleteMode === "single" ? "User" : "Users"}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteAlert(false);
            setUserToDelete(null);
          }}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
