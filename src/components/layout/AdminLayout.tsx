import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <h1>This a Admin Navbar</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
