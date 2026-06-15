import Cookies from "js-cookie";

const fetchSinglePackage = async (
  setErrors,
  setLoading,
  apiBase,
  id,
  setFormData,
  formData,
) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/single-package/${id}`, {
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

    setFormData({
      name: data?.name || "",
      speed: data?.speed || "",
      price: data?.price || "",
      validity: data?.validity || "",
      dataLimit: data?.dataLimit || "",
      isActive: Boolean(data?.isActive),
      description: data?.description || "",
      devices: data?.devices || "",
      type: data?.type || "",
      mikrotik_profile: data?.mikrotik_profile || ""
    });
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchSinglePackage;
