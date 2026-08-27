import { tokenManager } from "../auth/tokenManager";

let refreshPromise: Promise<string | null> | null = null;

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const token = tokenManager.getToken();

  const headers = new Headers(init.headers);

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  let response = await fetch(input, {
    ...init,
    headers,
  });

  // Request succeeded
  if (response.status !== 401) {
    return response;
  }

  // Don't create multiple refresh requests
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

  // Retry original request with new token
  const retryHeaders = new Headers(init.headers);

  retryHeaders.set(
    "Authorization",
    `Bearer ${newToken}`,
  );

  response = await fetch(input, {
    ...init,
    headers: retryHeaders,
  });

  return response;
}