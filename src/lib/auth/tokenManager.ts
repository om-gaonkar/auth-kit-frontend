let accessToken: string | null = null;

let refreshHandler:
  | (() => Promise<string | null>)
  | null = null;

export const tokenManager = {
  getToken() {
    return accessToken;
  },

  setToken(token: string | null) {
    accessToken = token;
  },

  setRefreshHandler(
    handler: () => Promise<string | null>,
  ) {
    refreshHandler = handler;
  },

  async refreshToken() {
    if (!refreshHandler) {
      return null;
    }

    return refreshHandler();
  },
};