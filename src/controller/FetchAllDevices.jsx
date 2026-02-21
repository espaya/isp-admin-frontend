const fetchAllDevices = async (setDevices, setLoading, setErrors, apiBase) => {
  setLoading(true);
  setErrors({});

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/all-devices`, {
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
    setDevices(data.data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchAllDevices;
