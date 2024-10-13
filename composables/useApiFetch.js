export const useApiFetch = async (path = "/", options = {}) => {
  let headers = {
    "Content-Type": "application/json",
  };

  const token = useCookie("XSRF-TOKEN");

  if (token && token.value !== null) {
    headers["X-XSRF-Token"] = token.value;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie", "referer"]),
    };
  }

  const config = useRuntimeConfig();

  const urlBase = config.public.API_URL ?? "";

  if (config.public.APP_ENV === "production" && urlBase.startsWith("http://")) {
    urlBase.replace("http://", "https://");
  }

  const { data, error, status } = await useFetch(`${urlBase}${path}`, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  return {
    data: data.value,
    error: error.value,
    status: {
      ok: status.value === "success",
      ...status,
    },
  };
};
