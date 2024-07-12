import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/faculty.api";
import { Avatar, Button, Modal, Table, TableColumnsType } from "antd";
import studentAvatar from "../../assets/images/lll.png";
import femaleAvatar from "../../assets/images/female.png";
import { TOfferedCourse } from "../../types/studentsCourse.types";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { useState } from "react";
import { TResponse } from "../../types/global";
import { toast } from "sonner";

export type TTableData = Pick<TOfferedCourse, any>;

const MyStudent = () => {
  const { registerSemesterId, courseId } = useParams();

  const { data: facultyCoursesData, isFetching } = useGetAllFacultyCoursesQuery(
    [
      { name: "semesterRegistration", value: registerSemesterId },
      { name: "course", value: courseId },
    ]
  );

  console.log(facultyCoursesData);

  const calculateAge = (dateString: any) => {
    if (!dateString) return "";
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date has not occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  type facultyData = any

  const tableData = facultyCoursesData?.data?.map(
    ({
      _id,
      student,
      grade,
      gradePoints,
      semesterRegistration,
      offeredCourse,
    }: facultyData) => ({
      key: _id,
      fullName: student?.fullName,
      age: calculateAge(student?.dateOfBirth),
      id: student?.id,
      profileImg: student?.profileImg,
      grade,
      gradePoints,
      semesterRegistration: semesterRegistration._id,
      offeredCourse: offeredCourse._id,
      student: student._id,
    })
  );

  // console.log(tableData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Profile Image",
      render: (item: any) => {
        console.log(item);
        return (
          <div>
            {item?.profileImg ? (
              <Avatar size="large" src={item.profileImg} />
            ) : (
              <Avatar
                size="large"
                src={item.gender === "female" ? femaleAvatar : studentAvatar}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Roll Number",
      dataIndex: "id",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Grade",
      dataIndex: "grade",
    },
    {
      title: "Grade Points",
      dataIndex: "gradePoints",
    },
    {
      title: "Action",
      render: (item) => {
        console.log(item);
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

const AddMarksModal = ({ studentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();
  const handleSubmit = async (data: any) => {
    const studentData = {
      semesterRegistration: studentInfo?.semesterRegistration,
      offeredCourse: studentInfo?.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    console.log(studentData);
    const res = (await addMark(studentData)) as TResponse<any>;
    console.log(res);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Mid Term" />
          <PHInput type="text" name="finalTerm" label="Final Term" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudent;
