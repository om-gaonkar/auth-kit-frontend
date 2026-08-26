import { Outlet } from "react-router";
import { Navbar } from "../../components/common/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
