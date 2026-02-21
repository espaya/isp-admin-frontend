import { useEffect, useState } from "react";
import { Link, RefreshCw } from "lucide-react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  UserPlus,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Tag,
  Circle,
  Check,
  X,
  SlidersHorizontal,
  Brush,
  Plus,
} from "lucide-react";
import fetchAllUsers from "../../controller/FetchAllUsers";
import gravatarUrl from "../../utils/gravatarHelper";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mockUsers, setMockUsers] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers(apiBase, setMockUsers, setErrors, setLoading);
  }, []);

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "inactive":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Moderator":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const handleRefresh = async () => {
    setErrors({});
    setLoading(true);

    try {
      await fetchAllUsers(apiBase, setMockUsers, setErrors, setLoading);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="bg-white rounded-lg shadow-sm border p-3 mb-4">
          <div
            className="p-4 rounded-4 text-white shadow mb-5"
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="fw-bold d-flex align-items-center gap-2">
                  <Users /> Users
                </h1>
                <p className="opacity-75 mb- text-white">
                  Manage users, create, read, update & delete
                </p>
              </div>

              <div className="d-flex gap-2 align-items-center">
                {/* Refresh */}
                <button
                  className="btn btn-light fw-semibold d-flex align-items-center"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw
                    size={16}
                    className={`me-2 ${loading ? "spin" : ""}`}
                  />
                  {loading ? "Refreshing..." : "Refresh"}
                </button>

                

                {/* Add User */}
                <a
                  href="/admin/dashboard/users/add"
                  className="btn btn-dark fw-semibold d-flex align-items-center"
                >
                  <UserPlus size={16} className="me-2" />
                  Add User
                </a>
              </div>
            </div>
          </div>

          {/* Filters and Search - Compact Horizontal */}
          <div className="d-flex flex-wrap align-items-center gap-3">
            {/* Search with colorful icon */}
            <div className="flex-grow-1" style={{ minWidth: "200px" }}>
              <div className="input-group input-group-sm">
                <span
                  className="input-group-text bg-gradient d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderColor: "#667eea",
                    width: "40px",
                  }}
                >
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={() => setSearchTerm("")}
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Role filter with colorful icon */}
            <div style={{ minWidth: "150px" }}>
              <div className="input-group input-group-sm">
                <span
                  className="input-group-text bg-gradient d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #4fd1c7 0%, #319795 100%)",
                    color: "white",
                    borderColor: "#4fd1c7",
                    width: "40px",
                  }}
                >
                  <Tag size={16} />
                </span>
                <select
                  className="form-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>

            {/* Status filter with colorful icon */}
            <div style={{ minWidth: "150px" }}>
              <div className="input-group input-group-sm">
                <span
                  className="input-group-text bg-gradient d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #f6e05e 0%, #d69e2e 100%)",
                    color: "white",
                    borderColor: "#f6e05e",
                    width: "40px",
                  }}
                >
                  <Circle size={16} fill="currentColor" />
                </span>
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Action buttons */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
                onClick={() => {
                  setSelectedRole("all");
                  setSelectedStatus("all");
                  setSearchTerm("");
                }}
                title="Clear all filters"
              >
                <Brush size={16} className="text-warning" />
              </button>
              <button
                className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
                title="Apply filters"
              >
                <Check size={16} />
              </button>
            </div>
          </div>

          {/* Active filters indicator */}
          {(selectedRole !== "all" ||
            selectedStatus !== "all" ||
            searchTerm) && (
            <div className="mt-2 pt-2 border-top">
              <div className="d-flex align-items-center">
                <small className="text-muted me-2 d-flex align-items-center">
                  <SlidersHorizontal size={14} className="me-1" />
                  Filters active:
                </small>
                <div className="d-flex flex-wrap gap-1">
                  {searchTerm && (
                    <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1 d-flex align-items-center">
                      <Search size={12} className="me-1" />
                      {searchTerm}
                      <button
                        className="btn btn-sm p-0 ms-2"
                        onClick={() => setSearchTerm("")}
                        style={{ fontSize: "0.6rem" }}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  {selectedRole !== "all" && (
                    <span className="badge rounded-pill bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-1 d-flex align-items-center">
                      <Tag size={12} className="me-1" />
                      {selectedRole}
                      <button
                        className="btn btn-sm p-0 ms-2"
                        onClick={() => setSelectedRole("all")}
                        style={{ fontSize: "0.6rem" }}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  {selectedStatus !== "all" && (
                    <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1 d-flex align-items-center">
                      <Circle size={12} className="me-1" fill="currentColor" />
                      {selectedStatus}
                      <button
                        className="btn btn-sm p-0 ms-2"
                        onClick={() => setSelectedStatus("all")}
                        style={{ fontSize: "0.6rem" }}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          width={50}
                          src={
                            user.email
                              ? gravatarUrl(user.email, 50)
                              : "https://www.gravatar.com/avatar/?d=mp&s=50"
                          }
                          alt={user.name}
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />

                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.status,
                        )}`}
                      >
                        {user.status === "active" && (
                          <CheckCircle className="w-3 h-3 mr-1 text-success" />
                        )}
                        {user.status === "inactive" && (
                          <XCircle className="w-3 h-3 mr-1 text-danger" />
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {user.lastLogin}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedUsers.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}

          {/* Table Footer */}

          <div className="px-4 py-3 border-top bg-light">
            <div className="row align-items-center g-3">
              {/* Results Info */}
              <div className="col-md-4">
                <div className="text-muted small">
                  <span className="fw-medium text-primary">
                    {Math.min(startIndex + 1, filteredUsers.length)}
                  </span>
                  -
                  <span className="fw-medium text-primary">
                    {Math.min(startIndex + rowsPerPage, filteredUsers.length)}
                  </span>
                  {" of "}
                  <span className="fw-bold text-info">
                    {filteredUsers.length}
                  </span>
                  {" users"}
                </div>
              </div>

              {/* Rows Per Page */}
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span className="text-muted small">Show</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-outline-primary dropdown-toggle d-flex align-items-center gap-1"
                      type="button"
                      id="rowsPerPageDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="badge bg-primary">{rowsPerPage}</span>
                      <span className="small">rows</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="rowsPerPageDropdown"
                    >
                      {[5, 10, 25, 50].map((size) => (
                        <li key={size}>
                          <button
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                              setRowsPerPage(size);
                              setCurrentPage(1);
                            }}
                          >
                            {size}
                            {rowsPerPage === size && (
                              <span className="badge bg-primary rounded-pill">
                                ✓
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-muted small">per page</span>
                </div>
              </div>

              {/* Pagination */}
              <div className="col-md-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  {/* Previous Button */}
                  <button
                    className={`btn btn-sm ${
                      currentPage === 1
                        ? "btn-outline-secondary"
                        : "btn-outline-primary"
                    } d-flex align-items-center justify-content-center`}
                    style={{ width: "36px", height: "36px" }}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page Numbers */}
                  <div className="d-flex align-items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          className={`btn btn-sm ${
                            currentPage === pageNum
                              ? "btn-primary"
                              : "btn-outline-primary"
                          } rounded-circle d-flex align-items-center justify-content-center`}
                          style={{ width: "36px", height: "36px" }}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Ellipsis for more pages */}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="mx-1 text-muted">...</span>
                    )}

                    {/* Last page button if not in view */}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <button
                        className={`btn btn-sm ${
                          currentPage === totalPages
                            ? "btn-primary"
                            : "btn-outline-primary"
                        } rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: "36px", height: "36px" }}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    className={`btn btn-sm ${
                      currentPage === totalPages
                        ? "btn-outline-secondary"
                        : "btn-outline-primary"
                    } d-flex align-items-center justify-content-center`}
                    style={{ width: "36px", height: "36px" }}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Page Input (Alternative) */}
            {totalPages > 1 && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <span className="text-muted small">Go to page:</span>
                    <div
                      className="input-group input-group-sm"
                      style={{ width: "120px" }}
                    >
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        className="form-control form-control-sm text-center"
                        value={currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (page >= 1 && page <= totalPages) {
                            setCurrentPage(page);
                          }
                        }}
                      />
                      <span className="input-group-text bg-light text-muted">
                        / {totalPages}
                      </span>
                    </div>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        if (currentPage >= 1 && currentPage <= totalPages) {
                          setCurrentPage(currentPage);
                        }
                      }}
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
