import { tokenManager } from "../auth/tokenManager";

let refreshPromise: Promise<string | null> | null = null;

interface AuthFetchOptions extends RequestInit {
  accessToken?: string | null;
}

export async function authFetch(
  input: RequestInfo | URL,
  options: AuthFetchOptions = {},
): Promise<Response> {
  const {
    accessToken: manualAccessToken,
    headers,
    ...fetchOptions
  } = options;

  const token =
    manualAccessToken ?? tokenManager.getToken();

  const requestHeaders = new Headers(headers);

  if (token) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const response = await fetch(input, {
    ...fetchOptions,
    headers: requestHeaders,
  });

  if (response.status !== 401) {
    return response;
  }

  if (!refreshPromise) {
    refreshPromise = tokenManager
      .refreshToken()
      .finally(() => {
        refreshPromise = null;
      });
  }

  const newToken = await refreshPromise;

  if (!newToken) {
    return response;
  }

  const retryHeaders = new Headers(headers);

  retryHeaders.set(
    "Authorization",
    `Bearer ${newToken}`,
  );

  return fetch(input, {
    ...fetchOptions,
    headers: retryHeaders,
  });
}