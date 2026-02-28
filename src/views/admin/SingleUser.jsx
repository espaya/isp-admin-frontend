import { useParams, Link } from "react-router-dom";
import {
  User,
  Wifi,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Clock,
  Router,
  RefreshCw,
  Plus,
  UserX,
  Pencil,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { capitalize, formatAmount, formatDate } from "../../utils/formatters";
import getUser from "../../controller/GetUser";
import Swal from "sweetalert2";

export default function SingleUser() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_URL;

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ password: "", password_confirmation: "" });

  const [errors, setErrors] = useState({});

  const loadUser = async () => {
    getUser(setLoading, apiBase, id, setUser, token);
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        status: user.status || "active",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        // ✅ ADD THESE
        password: "",
        password_confirmation: "",
      });
    }
  }, [user]);

  useEffect(() => {
    loadUser();
  }, []);

  if (loading || !user)
    return <div className="text-center py-5">Loading user...</div>;

  const subscription = user?.subscriptions?.[0];
  const avatar = user.profile?.avatar;

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
        return;
      }

      /*
    ==========================================
    ✅ AUTO APPLY BACKEND CHANGES
    ==========================================
    */

      setUser((prev) => ({
        ...prev,

        // update user fields
        ...data.changes?.user,

        // update profile safely
        profile: {
          ...prev.profile,
          ...data.changes?.profile,
        },
      }));

      /*
    ✅ Exit edit mode
    */
      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });

    //   window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const hasChanges =
    JSON.stringify(form) !==
    JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.profile?.phone || "",
      address: user.profile?.address || "",
    });

  return (
    <div className="container-fluid px-4 py-4 bg-light">
      {/* ================= HEADER ================= */}
      <div
        className="p-4 rounded-4 text-white shadow mb-4"
        style={{
          background: "linear-gradient(135deg,#4f46e5,#7c3aed,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          {/* LEFT SIDE */}
          <div className="d-flex align-items-center gap-3">
            {/* AVATAR */}
            <img
              src={
                avatar ? `${apiBase}/storage/${avatar}` : "/images/avatar.png"
              }
              alt="avatar"
              className="rounded-circle border border-3 border-white"
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
            />

            {/* NAME + EMAIL */}
            <div>
              <h3 className="fw-bold mb-0">{capitalize(user?.name)}</h3>
              <small className="opacity-75">{user?.email}</small>
              <br />
              <span className="badge bg-light text-dark mt-1">
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="d-flex gap-2 flex-wrap">
            {/* SUSPEND USER */}
            <button
              className="btn btn-warning fw-semibold d-flex align-items-center gap-2"
              disabled={loading}
            >
              <UserX size={16} />
              Suspend
            </button>

            {/* EDIT USER */}
            <button
              className={`btn fw-semibold d-flex align-items-center gap-2 ${
                editMode ? "btn-danger" : "btn-dark"
              }`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <X size={16} /> : <Pencil size={16} />}
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="row g-4 mb-4">
        {/* STATUS */}
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: 50,
                  height: 50,
                  background: "rgba(34,197,94,0.15)",
                }}
              >
                <Wifi size={24} className="text-success" />
              </div>

              <div>
                <small className="text-muted d-block">Internet</small>
                <span
                  className={`badge ${
                    subscription?.status === "active"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {subscription?.status ?? "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PACKAGE */}
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: 50,
                  height: 50,
                  background: "rgba(59,130,246,0.15)",
                }}
              >
                <Router size={24} className="text-primary" />
              </div>

              <div>
                <small className="text-muted d-block">Active Package</small>
                <strong>
                  {subscription
                    ? `Package #${subscription.package_id}`
                    : "No Package"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* EXPIRY */}
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: 50,
                  height: 50,
                  background: "rgba(245,158,11,0.15)",
                }}
              >
                <Clock size={24} className="text-warning" />
              </div>

              <div>
                <small className="text-muted d-block">Expiry Date</small>
                <strong>
                  {subscription?.expires_at
                    ? formatDate(subscription.expires_at)
                    : "N/A"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* ROLE */}
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: 50,
                  height: 50,
                  background: "rgba(6,182,212,0.15)",
                }}
              >
                <ShieldCheck size={24} className="text-info" />
              </div>

              <div>
                <small className="text-muted d-block">Account Role</small>
                <span className="badge bg-info text-uppercase">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= USER DETAILS ================= */}
      <div className="row g-4">
        {/* PROFILE */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100 rounded-4">
            <div className="card-body p-4">
              {/* HEADER */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: 45,
                    height: 45,
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "#fff",
                  }}
                >
                  <User size={20} />
                </div>

                <div>
                  <h5 className="fw-bold mb-0">Customer Info</h5>
                  <small className="text-muted">Personal account details</small>
                </div>
              </div>

              {/* INFO ITEMS */}
              <div className="d-flex flex-column gap-3">
                {/* PHONE */}
                <div className="d-flex align-items-center p-3 rounded-3 bg-light">
                  <div className="me-3 text-success">
                    <Phone size={18} />
                  </div>

                  <div>
                    <small className="text-muted d-block">Phone Number</small>
                    <span className="fw-semibold">
                      {user.profile?.phone || "N/A"}
                    </span>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="d-flex align-items-center p-3 rounded-3 bg-light">
                  <div className="me-3 text-primary">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <small className="text-muted d-block">Address</small>
                    <span className="fw-semibold">
                      {user.profile?.address || "N/A"}
                    </span>
                  </div>
                </div>

                {/* JOIN DATE */}
                <div className="d-flex align-items-center p-3 rounded-3 bg-light">
                  <div className="me-3 text-warning">
                    <Calendar size={18} />
                  </div>

                  <div>
                    <small className="text-muted d-block">Member Since</small>
                    <span className="fw-semibold">
                      {formatDate(user.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                {editMode ? "Edit User" : "Subscription History"}
              </h5>

              {!editMode ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Start</th>
                      <th>Expiry</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.subscriptions?.length > 0 ? (
                      user.subscriptions.map((sub) => (
                        <tr key={sub?.id}>
                          <td>#{sub?.id}</td>

                          <td>
                            <span
                              className={`badge ${
                                sub?.status === "active"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {sub?.status}
                            </span>
                          </td>

                          <td>{formatDate(sub?.starts_at)}</td>
                          <td>{formatDate(sub?.expires_at)}</td>
                          <td>{formatAmount(sub?.payment?.amount)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No subscriptions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <form onSubmit={handleUpdateUser}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Name</label>
                        <input
                          className="form-control"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                        />
                        {errors.name && (
                          <small className="text-danger">
                            {errors.name[0]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Email</label>
                        <input
                          className="form-control"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <small className="text-danger">
                            {errors.email[0]}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Password</label>
                        <input
                          className="form-control"
                          type="password"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                        />
                        {errors.password && (
                          <small className="text-danger">
                            {errors.password[0]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label>Repeat Password</label>
                        <input
                          className="form-control"
                          type="password"
                          value={form.password_confirmation}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              password_confirmation: e.target.value,
                            })
                          }
                        />
                        {errors.password_confirmation && (
                          <small className="text-danger">
                            {errors.password_confirmation[0]}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      className="form-control"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                    {errors.phone && (
                      <small className="text-danger">{errors.phone[0]}</small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Address</label>
                    <input
                      className="form-control"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                    {errors.address && (
                      <small className="text-danger">{errors.address[0]}</small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                    {errors.status && (
                      <small className="text-danger">{errors.status[0]}</small>
                    )}
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    disabled={updateLoading}
                  >
                    <RefreshCw
                      size={16}
                      className={
                        updateLoading || !hasChanges ? "spin me-2" : "me-2"
                      }
                    />
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
