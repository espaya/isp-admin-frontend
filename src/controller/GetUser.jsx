const getUser = async (setLoading, apiBase, id, setUser, token) => {
  setLoading(true);

  try {
    const res = await fetch(`${apiBase}/api/single-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) setUser(data);
  } finally {
    setLoading(false);
  }
};

export default getUser;
