
export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    UNAUTHORIZED: '/unauthorized'
  },

  DASHBOARD: {
    ROOT: "/dashboard",
  },

  USERS: {
    ROOT: "/user",
    PROFILE: "profile",
    DETAILS: (id = ":id") => `/users/${id}`,
  },
} as const;

export const navbarRoutes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/user/profile",
  },
  {
    label: "Services",
    path: "/services",
  },

] as const;