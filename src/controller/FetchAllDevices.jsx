import Cookies from "js-cookie";

const fetchAllDevices = async (setDevices, setLoading, setErrors, apiBase) => {
  setLoading(true);
  setErrors({});

  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, {
      credentials: "include",
      method: "GET",
    });

    const response = await fetch(`${apiBase}/api/all-devices`, {
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
    setDevices(data.data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchAllDevices;
