import { useEffect, useState } from "react";
import {
  Wifi,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Download,
  CheckCircle,
  Power,
  Slash,
  LoaderCircleIcon,
  PowerOff,
  Laptop,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import fetchAllPackages from "../../controller/FetchAllPackages";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toggleLoadingIds, setToggleLoadingIds] = useState([]);

  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPackages(setLoading, apiBase, setErrors, setPackages);
  }, []);

  /* ================= STATS ================= */
  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.isActive).length;
  const inactivePackages = totalPackages - activePackages;

  /* ================= FILTER ================= */
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* ================= ACTIONS ================= */
  const toggleStatus = async (pkg) => {
    setErrors({});
    setToggleLoadingIds((prev) => [...prev, pkg.id]);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

      const response = await fetch(`${apiBase}/api/packages/${pkg.id}/toggle`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify({ isActive: !pkg.isActive }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        setTimeout(() => setErrors({}), 3000);
        return;
      }

      // Update package state after toggle
      setPackages((prev) =>
        prev.map((p) =>
          p.id === pkg.id ? { ...p, isActive: !p.isActive } : p,
        ),
      );

      Swal.fire({
        title: "Success",
        icon: "success",
        text: data.message,
        showCloseButton: true,
      });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setToggleLoadingIds((prev) => prev.filter((id) => id !== pkg.id));
    }
  };

  const deletePkg = async (id) => {
    try {
      let deletePackge = await Swal.fire({
        title: "Are you sure",
        text: "Do you want to permanently delete this package? <br>This action cannot be undone",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Proceed",
        icon: "warning",
        iconColor: "red",
      });

      if (deletePackge.isConfirmed) {
        const response = await fetch(`${apiBase}/api/delete-package/${id}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message });
          return;
        }

        fetchAllPackages(setLoading, apiBase, setErrors, setPackages);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          showCloseButton: true,
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => {
        setErrors({});
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container-fluid px-4 py-4 bg-light">
      {/* HEADER */}
      <div
        className="p-4 rounded-4 text-white shadow mb-5"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold d-flex align-items-center gap-2">
              <Wifi /> Internet Packages
            </h1>
            <p className="opacity-75 mb-0">
              Manage pricing, validity & availability
            </p>
          </div>
          <Link to="/admin/dashboard/packages/add">
            <button className="btn btn-dark fw-semibold">
              <Plus size={16} className="me-2" />
              Add Package
            </button>
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-4 mb-4">
        {[
          {
            label: "Total Packages",
            value: totalPackages,
            gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
            icon: <Wifi size={24} />,
          },
          {
            label: "Active Packages",
            value: activePackages,
            gradient: "linear-gradient(135deg,#10b981,#22c55e)",
            icon: <CheckCircle size={24} />,
          },
          {
            label: "Inactive Packages",
            value: inactivePackages,
            gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
            icon: <Power size={24} />,
          },
        ].map((s, i) => (
          <div key={i} className="col-md-4">
            <div
              className="card border-0 shadow-lg text-white"
              style={{ background: s.gradient }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="opacity-75">{s.label}</small>
                  <h2 className="fw-bold mt-1">{s.value}</h2>
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  {s.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <input
            className="form-control"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ERRORS */}
      {errors.general && (
        <div className="alert alert-danger">{errors.general}</div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5 text-muted">Loading packages…</div>
      )}

      {/* PACKAGES GRID */}
      <div className="row g-4">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm h-100 package-card">
              <div className="card-body p-4 d-flex flex-column">
                {/* Header */}
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="fw-bold">{pkg.name}</h5>
                  <span
                    className={`${
                      pkg.isActive ? "blinking text-success" : "text-secondary"
                    }`}
                    style={{ fontSize: "1.2rem" }}
                    title={pkg.isActive ? "Active" : "Inactive"}
                  >
                    {pkg.isActive ? <Wifi /> : <Slash />}
                  </span>
                </div>

                <p className="text-muted small flex-grow-1">
                  {pkg.description}
                </p>

                <h3 className="fw-bold mb-3">
                  GHS {pkg.price}
                  <small className="text-muted fs-6"> / plan</small>
                </h3>

                <ul className="list-unstyled small mb-4">
                  <li>
                    <Clock size={17} className="me-2" /> {pkg.validity} day(s)
                  </li>
                  <li>
                    <Download size={17} className="me-2" /> {pkg.dataLimit} GB
                  </li>
                  <li>
                    <CheckCircle size={17} className="me-2" /> {pkg.speed} Mbps
                  </li>
                  <li>
                    <Laptop size={17} className="me-2" /> {pkg.devices}{" "}
                    Device(s)
                  </li>
                </ul>

                {/* ACTIONS */}
                <div className="d-flex gap-2 mt-auto">
                  <button
                    className="btn btn-outline-primary flex-fill"
                    onClick={() =>
                      navigate(`/admin/dashboard/packages/edit/${pkg.id}`)
                    }
                  >
                    <Edit2 size={16} className="me-2" />
                    Edit
                  </button>

                  <button
                    className={`btn ${
                      pkg.isActive
                        ? "btn-outline-warning"
                        : "btn-outline-success"
                    }`}
                    onClick={() => toggleStatus(pkg)}
                    title="Toggle Status"
                    disabled={toggleLoadingIds.includes(pkg.id)}
                  >
                    {toggleLoadingIds.includes(pkg.id) ? (
                      <LoaderCircleIcon size={16} />
                    ) : pkg.isActive ? (
                      <PowerOff size={16} />
                    ) : (
                      <Power size={16} />
                    )}
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deletePkg(pkg.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredPackages.length === 0 && (
          <div className="text-center text-muted py-5">No packages found</div>
        )}
      </div>
    </div>
  );
}
