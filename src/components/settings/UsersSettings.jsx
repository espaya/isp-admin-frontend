import { useState } from "react";
import { Users, User } from "lucide-react";

export default function UsersSettings() {
  return (
    <>
      <div className="card border-0 shadow-lg mb-4">
        <div className="card-header bg-transparent border-0 py-4">
          <h5 className="card-title mb-0 fw-bold text-dark">
            <Users size={20} className="me-2" />
            User Management
          </h5>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold text-dark mb-0">Team Members</h6>
                <button className="btn btn-primary btn-sm">
                  <User size={14} className="me-1" />
                  Invite User
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        name: "John Doe",
                        email: "john@isp.com",
                        role: "Administrator",
                        status: "Active",
                        lastActive: "2 hours ago",
                        avatarColor: "bg-primary",
                      },
                      {
                        id: 2,
                        name: "Jane Smith",
                        email: "jane@isp.com",
                        role: "Network Engineer",
                        status: "Active",
                        lastActive: "1 day ago",
                        avatarColor: "bg-success",
                      },
                      {
                        id: 3,
                        name: "Bob Wilson",
                        email: "bob@isp.com",
                        role: "Support Agent",
                        status: "Active",
                        lastActive: "Just now",
                        avatarColor: "bg-warning",
                      },
                      {
                        id: 4,
                        name: "Alice Brown",
                        email: "alice@isp.com",
                        role: "Read Only",
                        status: "Inactive",
                        lastActive: "1 week ago",
                        avatarColor: "bg-info",
                      },
                      {
                        id: 5,
                        name: "Mike Davis",
                        email: "mike@isp.com",
                        role: "Billing Manager",
                        status: "Active",
                        lastActive: "3 hours ago",
                        avatarColor: "bg-purple",
                      },
                    ].map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className={`rounded-circle ${user.avatarColor} text-white d-flex align-items-center justify-content-center me-3`}
                              style={{ width: "36px", height: "36px" }}
                            >
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-semibold">{user.name}</div>
                              <div className="text-muted small">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${user.status === "Active" ? "bg-success" : "bg-secondary"}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="text-muted">{user.lastActive}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h6 className="fw-semibold text-dark mb-3">
                    Role Permissions
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {[
                      {
                        role: "Administrator",
                        desc: "Full system access",
                        users: 1,
                      },
                      {
                        role: "Network Engineer",
                        desc: "Device and network management",
                        users: 3,
                      },
                      {
                        role: "Support Agent",
                        desc: "Customer support access",
                        users: 5,
                      },
                      {
                        role: "Billing Manager",
                        desc: "Financial and billing access",
                        users: 2,
                      },
                      {
                        role: "Read Only",
                        desc: "View-only access",
                        users: 2,
                      },
                    ].map((role, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center py-2 border-bottom"
                      >
                        <div>
                          <div className="fw-semibold">{role.role}</div>
                          <div className="text-muted small">{role.desc}</div>
                        </div>
                        <span className="badge bg-light text-dark">
                          {role.users} users
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="fw-semibold text-dark mb-3">
                    Invite New User
                  </h6>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select">
                      <option>Network Engineer</option>
                      <option>Support Agent</option>
                      <option>Billing Manager</option>
                      <option>Read Only</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Permissions</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="perm1"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="perm1">
                        Device Management
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="perm2"
                      />
                      <label className="form-check-label" htmlFor="perm2">
                        Customer Management
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="perm3"
                      />
                      <label className="form-check-label" htmlFor="perm3">
                        Billing Access
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="perm4"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="perm4">
                        Reports Access
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100">
                    Send Invitation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
