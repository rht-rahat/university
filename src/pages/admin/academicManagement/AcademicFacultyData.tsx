import { useParams } from "react-router-dom";
import { useGetFacultyByIdQuery } from "../../../redux/features/admin/academicManagement.api";
import { Spin } from "antd";

const AcademicFacultyData = () => {
  const { facultyId } = useParams();

  const { data: faculty, error, isLoading } = useGetFacultyByIdQuery(facultyId);
  console.log(faculty);
  if (error) {
    console.log(error);
  }

  if (isLoading) {
    <Spin size="large" />;
  }
  return (
    <div>
      <h1>This is a faculty data {facultyId}</h1>
    </div>
  );
};

export default AcademicFacultyData;
