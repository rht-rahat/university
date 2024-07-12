import { useParams } from "react-router-dom";
import { useGetAcademicDepartmentByIdQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table, TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types/academicManajment.types";
import { useEffect } from "react";

const AcademicDepartmentData = () => {
  const { departmentId } = useParams();
  //   console.log(departmentId);
  const {
    data: department,
    error,
    isLoading,
    refetch,
  } = useGetAcademicDepartmentByIdQuery(departmentId);

  useEffect(() => {
    refetch();
  }, [departmentId, refetch]);

  if (error) {
    console.log(error);
  }

  const columns: TableColumnsType<TAcademicDepartment> = [
    {
      title: "Academic Department",
      dataIndex: "name",
    },
    {
      title: "A. Department Updated At",
      dataIndex: "a_department_created_at",
    },
    {
      title: "A. Department Updated At",
      dataIndex: "a_department_updated_at",
    },
    {
      title: "Faculty Name",
      dataIndex: "faculty_name",
    },
    {
      title: "Faculty Created At",
      dataIndex: "faculty_at",
    },
    {
      title: "Faculty Updated At",
      dataIndex: "faculty_updated_at",
    },
  ];

  const data: any = [
    {
      key: "1",
      name: department?.name,
      a_department_created_at: department?.createdAt,
      a_department_updated_at: department?.updatedAt,
      faculty_name: department?.academicFaculty?.name,
      faculty_at: department?.academicFaculty?.createdAt,
      faculty_updated_at: department?.academicFaculty?.updatedAt,
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
      />
    </>
  );
};

export default AcademicDepartmentData;
