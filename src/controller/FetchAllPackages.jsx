import Cookies from "js-cookie";

const fetchAllPackages = async (
  setLoading,
  apiBase,
  setErrors,
  setPackages,
) => {
  try {

    const token = localStorage.getItem("token")

    const response = await fetch(`${apiBase}/api/all-packages`, {
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

    setPackages(data.data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchAllPackages;
