import Cookies from "js-cookie";

const fetchAllPackages = async (
  setLoading,
  apiBase,
  setErrors,
  setPackages,
) => {
  try {
    const response = await fetch(`${apiBase}/api/all-packages`, {
      credentials: "include",
      method: "GET",
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

    setPackages(data.data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchAllPackages;
