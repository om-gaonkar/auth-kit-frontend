import { useAuth } from "../../../../app/providers/Auth/AuthContext";

export default function UserDetail() {
  const { user } = useAuth();

  return (
    <div>
      {/* User Details Card */}
      <section className="rounded-2xl bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold text-foreground">User Details</h1>

        <div className="mt-6 space-y-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <p className="w-32 shrink-0 text-sm text-muted">Email</p>

            <p className="text-sm font-medium text-foreground">{user?.email}</p>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <p className="w-32 shrink-0 text-sm text-muted">Role</p>

            <p className="text-sm font-medium text-foreground">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
