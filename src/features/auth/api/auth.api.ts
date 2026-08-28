import { authFetch } from "../../../lib/api/authFetch";
import type { LoginUser, RegisterUser } from "../types/auth.types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function registerApi(data: RegisterUser) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "unable to register");
  }

  return result;
}

export async function loginApi(data: LoginUser) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "unable to login");
  }
  return result;
}

export async function refresh() {
  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "unable to refresh");
  }
  return result;
}

export async function meApi(accessToken: string | null) {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "unable to refresh");
  }
  return result;
}

export async function logoutCurrentuserApi() {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("unable to logout");
  }
  return res;
}

export async function getUserSessionsApi() {
  const res = await authFetch(`${BASE_URL}/api/auth/sessions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "unable to fetch devices");
  }
  return result;
}

export async function logoutSpecificSessionApi(accessToken: string | null, familyId: string) {
  const res = await fetch(`${BASE_URL}/api/auth/sessions/${familyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "unable to logout this device");
  }
  return result;
}

export async function logoutAllDevicesApi(accessToken: string | null) {
  const res = await fetch(`${BASE_URL}/api/auth/logout-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "unable to refresh");
  }
  return result;
}