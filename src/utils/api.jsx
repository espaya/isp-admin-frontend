
export const apiRequest = async (URL, options = {}, logout, navigate) => {
  const token = localStorage.getItem("token");

  const response = await fetch(URL, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  //   Global 401 handler
  if (response.status === 401) {
    localStorage.removeItem("tken");
    if (logout) logout();
    if (navigate) navigate("/login", { replace: true });
    return null;
  }

  return response;
};
