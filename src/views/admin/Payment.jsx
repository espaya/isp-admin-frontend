import { useEffect, useState } from "react";
import { CreditCard, Download, Search, Eye, RefreshCw } from "lucide-react";
import fetchPayments from "../../controller/FetchPayments";
import { formatAmount, formatDate } from "../../utils/formatters";

export default function Payment() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [paymentsData, setPayments] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });

  const filtered = paymentsData.filter((p) => {
    const query = search.toLowerCase();

    return (
      p?.reference?.toLowerCase().includes(query) ||
      p?.status?.toLowerCase().includes(query) ||
      String(p?.user_id).includes(query)
    );
  });

  useEffect(() => {
    fetchPayments(
      setLoading,
      setErrors,
      apiBase,
      setPayments,
      1,
      setPagination,
    );
  }, []);

  const handleRefresh = () => {
    setErrors({});

    fetchPayments(
      setLoading,
      setErrors,
      apiBase,
      setPayments,
      pagination.currentPage, // keep current page
      setPagination,
    );
  };

  const statusBadge = (status) => {
    if (status === "success") return "bg-success-subtle text-success";
    if (status === "pending") return "bg-warning-subtle text-warning";
    if (status === "failed") return "bg-danger-subtle text-danger";
    return "bg-secondary";
  };

  return (
    <div
      className="container-fluid px-4 py-4"
      style={{ background: "#f8fafc" }}
    >
      {/* HEADER */}
      <div
        className="p-4 rounded-4 text-white shadow mb-5"
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1 d-flex align-items-center gap-2">
              <CreditCard /> Payments
            </h1>
            <p className="opacity-75 mb-0 text-white">
              Track revenue, transactions & payment performance
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light fw-semibold"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw
                size={16}
                className={`me-2 ${loading ? "spin" : ""}`}
              />
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button className="btn btn-dark fw-semibold">
              <Download size={16} className="me-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card border-0 shadow-lg mb-5">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Recent Transactions</h5>
            <div className="input-group w-25">
              <span className="input-group-text bg-light">
                <Search size={14} />
              </span>
              <input
                className="form-control"
                placeholder="Search payments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="bg-light">
                <tr>
                  <th>User</th>
                  <th>Package</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p?.id}>
                    <td>
                      <div className="fw-semibold">{p?.user?.name}</div>
                      <small className="text-muted">{p?.reference}</small>
                    </td>
                    <td>-</td>
                    <td className="fw-bold">{formatAmount(p?.amount)}</td>
                    <td>
                      <span className={`badge ${statusBadge(p?.status)} px-3`}>
                        {p?.status}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">
                        {formatDate(p?.created_at)}
                      </small>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-light">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              Showing page {pagination.currentPage} of {pagination.lastPage}
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary"
                disabled={pagination.currentPage === 1}
                onClick={() =>
                  fetchPayments(
                    setLoading,
                    setErrors,
                    apiBase,
                    setPayments,
                    pagination.currentPage - 1,
                    setPagination,
                  )
                }
              >
                Previous
              </button>

              {[...Array(pagination.lastPage)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    pagination.currentPage === i + 1
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() =>
                    fetchPayments(
                      setLoading,
                      setErrors,
                      apiBase,
                      setPayments,
                      i + 1,
                      setPagination,
                    )
                  }
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-sm btn-outline-primary"
                disabled={pagination.currentPage === pagination.lastPage}
                onClick={() =>
                  fetchPayments(
                    setLoading,
                    setErrors,
                    apiBase,
                    setPayments,
                    pagination.currentPage + 1,
                    setPagination,
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
