export const fetchDataFromApi = async (url: string, options: any = {}) => {
  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : null,
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }
  return await res.json();
};
