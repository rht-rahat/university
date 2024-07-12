import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import facultyPaths from "../../routes/faculty.routes";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
import { superAdminPaths } from "../../routes/superAdmin.routes";
import { studentPaths } from "../../routes/student.routes";

const { Sider } = Layout;

const userRole = {
  SUPERADMIN: "superAdmin",
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const SidebarLayout = () => {
  const user = useAppSelector(currentUser);
  // console.log(currentUser);
  // const role = "student";
  // console.log(userRole);
  let sidebarItems: any;

  switch (user!.role) {
    case userRole.SUPERADMIN:
      sidebarItems = sidebarItemsGenerator(
        superAdminPaths,
        userRole.SUPERADMIN
      );
      break;
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        overflow: "hidden",
        scrollBehavior: "unset",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "3.6rem",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        PH UNI
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SidebarLayout;
