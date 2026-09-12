const API_URL = "https://e-commerce-app-v9zz.onrender.com";

const apiFetch = async (url, options = {}) => {
  let token = localStorage.getItem("token");

  let response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token
    },
    credentials: "include"
  });

  // Access token expired
  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${API_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    const refreshData = await refreshResponse.json();

    if (refreshResponse.ok) {
      token = refreshData.accessToken;

      localStorage.setItem("token", token);

      response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: token
        },
        credentials: "include"
      });
    }
  }

  return response;
};

export default apiFetch;