const fetchPayments = async (
  setLoading,
  setErrors,
  apiBase,
  setPayments,
  page = 1,
  setPagination,
) => {
  setLoading(true);
  setErrors({});

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/all-payments?page=${page}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setPayments(data.data);

    setPagination({
      currentPage: data.current_page,
      lastPage: data.last_page,
      total: data.total,
    });
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchPayments;
