import { Button, Modal, Table } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const Courses = () => {
  const { data: course, isFetching } = useGetAllCourseQuery(undefined);
  console.log(course);

  const tableData = course?.data?.map(({ _id, title, prefix, code }: any) => ({
    key: _id,
    title,
    prefix,
    code: `${prefix} ${code}`,
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];
  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
  const [addFaculties] = useAddFacultiesMutation();
  const { data: faculties } = useGetAllFacultiesQuery(undefined);

  const facultiesOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    const res = (await addFaculties(facultyData)) as TResponse<any>;
    // console.log(res.data.success);
    if (res?.data?.success === true) {
      toast.success(res?.data?.message);
    } else {
      const errorMessage = res?.data?.message || "Please Select one";
      toast.error(errorMessage);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            options={facultiesOptions}
            name="faculties"
            label="Add Faculty"
            mode="multiple"
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
