import Cookies from "js-cookie";

const fetchSinglePackage = async (
  setErrors,
  setLoading,
  apiBase,
  id,
  setFormData,
  formData
) => {
  setLoading(true);
  try {

    const token = localStorage.getItem("token")

    const response = await fetch(`${apiBase}/api/single-package/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setFormData({
      name: data.name || "",
      speed: data.speed?.toString() || "",
      price: data.price?.toString() || "",
      validity: data.validity?.toString() || "",
      dataLimit: data.dataLimit?.toString() || "",
      isActive: Boolean(data.isActive),
      description: data.description || "",
      devices: data.devices?.toString() || "",
    });

  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchSinglePackage;