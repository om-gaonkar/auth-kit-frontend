import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserSessionsApi,
  logoutAllDevicesApi,
  logoutSpecificSessionApi,
} from "../../../auth/api/auth.api";
import { useAuth } from "../../../../app/providers/Auth/AuthContext";
import { Button } from "../../../../components/ui/Button/Button";
import { LogOut } from "lucide-react";
import type { UserSession } from "../../types/device.type";
import { useNavigate } from "react-router";
import { appToast } from "../../../../components/common/Toaster/Toast";

export default function DeviceDetails() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["userSessions"],
    queryFn: () => getUserSessionsApi(),
    enabled: !!accessToken,
  });

  const logoutSpecificMutation = useMutation({
    mutationFn: (familyId: string) =>
      logoutSpecificSessionApi(accessToken, familyId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSessions"],
      });
      appToast.success("user logged out successfully");
    },
  });

  const logoutAllMutation = useMutation({
    mutationFn: () => logoutAllDevicesApi(accessToken),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSessions"],
      });
      navigate("/");
      appToast.success("All user logged out successfully");
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const sessions = data?.data || [];

  const logoutSpecificSession = (familyId: string) => {
    logoutSpecificMutation.mutate(familyId);
  };

  const logoutAllSession = () => {
    logoutAllMutation.mutate();
  };
  console.log("Session:", sessions);

  console.log("createdAt:", sessions[0]?.createdAt);

  console.log("parsed:", new Date(sessions[0]?.createdAt || ""));

  return (
    <div>
      {/* Logged In Devices Card */}
      <section className="rounded-2xl bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Logged In Devices
            </h2>

            <p className="mt-1 text-sm text-muted">
              Manage devices currently signed in to your account.
            </p>
          </div>

          <Button
            onClick={logoutAllSession}
            disabled={logoutAllMutation.isPending}
            className="w-full sm:w-auto"
          >
            {logoutAllMutation.isPending
              ? "Logging out..."
              : "Logout all devices"}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {/* Render devices here */}

          {sessions.length === 0 ? (
            <p className="text-sm text-muted">No active devices found.</p>
          ) : (
            sessions.map((session: UserSession) => (
              <div
                key={session._id}
                className="flex items-center justify-between rounded-xl border border-primary-200 p-4 "
              >
                <div className="">
                  <h3 className="font-medium">
                    {session.device?.browser || "Unknown Browser"}{" "}
                    {session.isCurrent && (
                      <span className="ml-2 rounded-full bg-primary-200 px-2 text-[12px] text-primary-400">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted">
                    {session.device?.os || "Unknown OS"} •{" "}
                    {session.device?.deviceType || "Unknown Device"}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Signed in:{" "}
                    {new Date(session.sessionCreatedAt).toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Last seen: {new Date(session.createdAt).toLocaleString()}
                  </p>
                </div>
                {!session.isCurrent && (
                  <button
                    onClick={() => logoutSpecificSession(session.familyId)}
                    type="button"
                    disabled={logoutSpecificMutation.isPending}
                    className="pr-6 disabled:opacity-50"
                  >
                    <LogOut
                      size={20}
                      className="text-primary-600 hover:text-primary-800"
                    />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
