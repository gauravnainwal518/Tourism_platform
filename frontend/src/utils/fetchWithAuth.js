export const fetchWithAuth = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Clear auth
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userData");

      // Redirect
      if (role === "admin") {
        window.location.href = "/admin/login";
      } else {
        window.location.href = "/login";
      }

      return { ok: false, status: 401, data: null };
    }

    // Always attempt JSON parse
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      console.warn("Response is not JSON", e);
    }

    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("fetchWithAuth error:", error);
    return { ok: false, status: 500, data: null, error };
  }
};
