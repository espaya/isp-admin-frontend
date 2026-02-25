import { useEffect, useState } from "react";
import { UserPlus, MoreVertical } from "lucide-react";

export default function LatestUsers() {
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  const getLatestUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/latest-users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
        return;
      }

      setLatestUsers(data);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatestUsers();
  }, []);

  return (
    <>
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3">Latest Users</h5>
            {latestUsers.length === 0 && (
              <p className="alert alert-info">No Latest Users</p>
            )}
            {latestUsers.map((u) => (
              <div key={u.id} className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: 38,
                    height: 38,
                    background: "linear-gradient(135deg,#6366f1,#ec4899)",
                  }}
                >
                  <UserPlus size={16} />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{u.name}</div>
                  <small className="text-muted">{u.email}</small>
                </div>
                <MoreVertical size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
