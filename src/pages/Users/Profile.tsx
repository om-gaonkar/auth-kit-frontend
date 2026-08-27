import DeviceDetails from "../../features/users/components/ui/DeviceDetails";
import UserDetail from "../../features/users/components/ui/UserDetail";

export default function Profile() {
  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <UserDetail />
        <DeviceDetails />
      </div>
    </main>
  );
}
