import {
  Avatar,
  Button,
  Modal,
  Table,
  TableColumnsType,
  Tabs,
  TabsProps,
} from "antd";
import { useGetAllEnrolledCoursedQuery } from "../../redux/features/student/studentCourseManagement.api";
import { TOfferedCourse } from "../../types/studentsCourse.types";
import { useState } from "react";
import studentAvatar from "../../assets/images/lll.png";
import femaleAvatar from "../../assets/images/female.png";

export type TTableData = Pick<TOfferedCourse, any>;
const MySchedule = () => {
  const [open, setOpen] = useState(false);
  const { data: offerCoursedData, isFetching } =
    useGetAllEnrolledCoursedQuery(undefined);
  const [selectedRow, setSelectedRow] = useState<TTableData | null>(null);

  const formatDate = (dateString: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options as any);
  };

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

  console.log(offerCoursedData);
  const tableData = offerCoursedData?.data?.map(
    ({
      _id,
      offeredCourse,
      student,
      grade,
      gradePoints,
      academicSemester,
      faculty,
      course,
      academicFaculty,
      academicDepartment,
      courseMarks,
    }) => ({
      key: _id,
      fullName: student?.fullName,
      middleName: student?.name?.middleName,
      firstName: student?.name?.firstName,
      gender: student?.gender,
      age: student?.dateOfBirth,
      sEmail: student?.email,
      contactNo: student?.contactNo,
      bloodGroup: student?.bloogGroup,
      presentAddress: student?.presentAddress,
      permanentAddress: student?.permanentAddress,
      id: student?.id,
      profileImg: student?.profileImg,
      grade,
      days: offeredCourse?.days.join(", "),
      fullNameFaculty: faculty?.fullName,
      facultyImage: faculty?.profileImg,
      title: course?.title,
      gradePoints,
      fatherName: student?.guardian?.fatherName,
      motherName: student?.guardian?.motherName,
      fatherOccupation: student?.guardian?.fatherOccupation,
      motherOccupation: student?.guardian?.motherOccupation,
      fatherNumber: student?.guardian?.fatherContactNo,
      motherNumber: student?.guardian?.motherContactNo,
      localGuardianName: student?.localGuardian?.name,
      localGuardianAddress: student?.localGuardian?.address,
      localGuardianContactNo: student?.localGuardian?.contactNo,
      localGuardianOccupation: student?.localGuardian?.occupation,
      academicSemester: academicSemester?.name,
      academicSemesterCode: academicSemester?.code,
      facultyName: academicFaculty?.name,
      academicDepartment: academicDepartment?.name,
      classTest1: courseMarks?.classTest1,
      classTest2: courseMarks?.classTest2,
      midTerm: courseMarks?.midTerm,
      finalTerm: courseMarks?.finalTerm,
      isDeleted: student?.isDeleted,
    })
  );

  const onChange = (key: string) => {
    console.log(key);
  };
  console.log(tableData);
  console.log(selectedRow);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      // dataIndex: "fullName",
      render: (item) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setSelectedRow(item);
              setOpen(true);
            }}
          >
            {item?.fullName}
          </Button>
        );
      },
    },
    {
      title: "Roll Number",
      dataIndex: "id",
    },
    {
      title: "Profile Image",
      render: (item) => {
        console.log(item);
        return (
          <div>
            {item.profileImg ? (
              <Avatar size="large" src={item.profileImg} />
            ) : (
              <Avatar
                size="large"
                src={item.gender === "male" ? studentAvatar : femaleAvatar}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Grade",
      dataIndex: "grade",
    },
    {
      title: "Day",
      dataIndex: "days",
    },
    {
      title: "Faculty Name",
      dataIndex: "fullNameFaculty",
    },
    {
      title: "Faculty Image",
      render: (item) => {
        console.log(item);
        return (
          <div>
            <Avatar size="large" src={item.facultyImage} />
          </div>
        );
      },
    },
    {
      title: "Course",
      dataIndex: "title",
    },
    {
      title: "Grade Points",
      dataIndex: "gradePoints",
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "About",
      children: (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">First Name</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.firstName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Middle Name</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.middleName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Full Name</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.fullName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Gender</div>
              <div className="px-4 py-2 font-normal">{selectedRow?.gender}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Age</div>
              <div className="px-4 py-2 font-normal">
                {calculateAge(selectedRow?.age)} years
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Blood Group</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.bloodGroup}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Present Address</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.presentAddress}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email.</div>
              <div className="px-4 py-2 font-normal">
                <a className="text-blue-800" href={selectedRow?.sEmail}>
                  {selectedRow?.sEmail}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday</div>
              <div className="px-4 py-2 font-normal">
                {formatDate(selectedRow?.age)}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Roll No:</div>
              <div className="px-4 py-2 font-normal">{selectedRow?.id}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Personal Info",
      children: (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Father Name</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.fatherName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Father Occupation</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.fatherOccupation}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Father ContactNo</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.fatherNumber}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mother Name</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.motherName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mother Occupation</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.motherOccupation}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mother ContactNo</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.motherNumber}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Local Guardian Name</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.localGuardianName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Local Guardian Occupation
              </div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.localGuardianOccupation}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Local Guardian ContactNo:
              </div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.localGuardianContactNo}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Local Guardian Address
              </div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.localGuardianAddress}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Academic Info",
      children: (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Admission Semester Name
              </div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.academicSemester}{" "}
                {selectedRow?.academicSemesterCode}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Academic Department Name
              </div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.academicDepartment}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Academic Faculty Name
              </div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.facultyName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Grade</div>
              <div className="px-4 py-2 font-normal">{selectedRow?.grade}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Grade Point</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.gradePoints}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Class Test 1</div>

              <div
                className={`px-4 py-2 font-normal ${
                  selectedRow?.classTest1 === 0 ? "text-red-500" : "text-black"
                }`}
              >
                {selectedRow?.classTest1}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Class Test 2</div>
              <div
                className={`px-4 py-2 font-normal ${
                  selectedRow?.classTest2 === 0 ? "text-red-500" : "text-black"
                }`}
              >
                {selectedRow?.classTest2}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mid Term</div>
              <div
                className={`px-4 py-2 font-normal ${
                  selectedRow?.midTerm === 0 ? "text-red-500" : "text-black"
                }`}
              >
                {selectedRow?.midTerm}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Final Term</div>
              <div
                className={`px-4 py-2 font-normal ${
                  selectedRow?.midTerm === 0 ? "text-red-500" : "text-black"
                }`}
              >
                {selectedRow?.finalTerm}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Contact",
      children: (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2 font-normal">{selectedRow?.sEmail}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact Number</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.contactNo}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Present Address</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.presentAddress}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Permanent Address</div>
              <div className="px-4 py-2 font-normal">
                {selectedRow?.permanentAddress}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />

      <Modal
        title="Information"
        footer={null}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width="auto"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <div className="container mx-auto my-5 p-5 h-auto">
          <h1 className="text-xl">{selectedRow?.fullName} Details</h1>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  {selectedRow?.profileImg ? (
                    <img
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto"
                      src={selectedRow?.profileImg}
                      alt=""
                      width="384"
                      height="512"
                    />
                  ) : (
                    <img
                      className="w-24 h-24 md:w-48 md:h-auto rounded-full mx-auto"
                      src={
                        selectedRow?.gender === "female"
                          ? femaleAvatar
                          : studentAvatar
                      }
                      alt=""
                      width="384"
                      height="512"
                    />
                  )}
                </div>
                <h3 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {selectedRow?.fullName}
                </h3>
                {/* <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p> */}
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        {selectedRow?.isDeleted === false && (
                          <span>Active</span>
                        )}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Birthday</span>
                    <span className="ml-auto">
                      {formatDate(selectedRow?.age)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="my-4"></div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  {/* <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span> */}
                  <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                    className="w-full"
                    animated={true}
                    tabBarStyle={{ width: "100%" }}
                  />
                </div>

                {/* <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                  Show Full Information
                </button> */}
              </div>

              <div className="my-4"></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MySchedule;
