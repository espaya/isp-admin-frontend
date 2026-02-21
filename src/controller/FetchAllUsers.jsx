import Cookies from "js-cookie";

const fetchAllUsers = async (apiBase, setMockUsers, setErrors) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiBase}/api/get-users/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
