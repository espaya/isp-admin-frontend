import { useState } from "react";

export default function Avatar() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [preview, setPreview] = useState("/images/avatar.png");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    // Instant preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Auto upload
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      const response = await fetch(`${apiBase}/api/upload-avatar`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setPreview(data.avatar_url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`rounded-circle border border-3 ${
        dragging ? "border-success" : "border-primary"
      } d-flex align-items-center justify-content-center position-relative mx-auto`}
      style={{
        width: 90,
        height: 90,
        cursor: "pointer",
        overflow: "hidden",
        transition: "0.3s",
      }}
    >
      <img
        src={preview}
        alt="Avatar"
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
        }}
      />

      {loading && (
        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white">
          Uploading...
        </div>
      )}
    </div>
  );
}
