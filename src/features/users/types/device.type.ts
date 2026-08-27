export interface UserSession {
  _id: string;
  userId: string;
  familyId: string;

  status: "active" | "used" | "revoked";

  usedAt: string | null;
  expiresAt: string;
  revokedAt: string | null;

  device: {
    userAgent: string | null;
    browser: string | null;
    os: string | null;
    deviceType: "mobile" | "tablet" | "desktop" | "unknown";
    ipAddress: string | null;
  };

  createdAt: string;
  updatedAt: string;

  isCurrent: boolean;
}