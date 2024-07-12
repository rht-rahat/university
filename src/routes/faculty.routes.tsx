import { ReactNode } from "react";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import FacultyCourses from "../pages/faculty/FacultyCourses";
import MyStudent from "../pages/faculty/MyStudent";

type TFacultyPaths = {
  name?: string;
  path: string;
  element: ReactNode;
};

const facultyPaths: TFacultyPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <FacultyCourses />,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyStudent />,
  },
];

export default facultyPaths;
