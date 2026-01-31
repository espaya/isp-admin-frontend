import Cookies from "js-cookie";

const fetchAllUsers = async (apiBase, setMockUsers, setErrors) => {
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(`${apiBase}/api/get-users/`, {
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
      setErrors({ general: data.messane });
      return;
    }

    setMockUsers(data.data);
  } catch (err) {}
};

export default fetchAllUsers;
