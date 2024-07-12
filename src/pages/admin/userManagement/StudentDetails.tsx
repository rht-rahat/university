import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";
import { Spin, Tabs, TabsProps } from "antd";
import studentAvatar from "../../../assets/images/lll.png";
import femaleAvatar from "../../../assets/images/female.png";

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data: student, error, isLoading } = useGetStudentByIdQuery(studentId);
  console.log(student);
  if (error) {
    console.log(error);
  }

  if (isLoading) {
    <Spin size="large" />;
  }

  // console.log(student);

  const formatDate = (dateString: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options as any);
  };

  const calculateAge = (dateString: string | number | Date | undefined) => {
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

  const onChange = (key: string) => {
    console.log(key);
  };

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
                {student?.name?.firstName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Middle Name</div>
              <div className="px-4 py-2 font-normal">
                {student?.name?.middleName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Full Name</div>
              <div className="px-4 py-2 font-normal">{student?.fullName}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Gender</div>
              <div className="px-4 py-2 font-normal">{student?.gender}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Age</div>
              <div className="px-4 py-2 font-normal">
                {calculateAge(student?.dateOfBirth)} years
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Blood Group</div>
              <div className="px-4 py-2 font-normal">{student?.bloogGroup}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Present Address</div>
              <div className="px-4 py-2 font-normal">
                {student?.presentAddress}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email.</div>
              <div className="px-4 py-2 font-normal">
                <a className="text-blue-800" href={student?.email}>
                  {student?.email}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday</div>
              <div className="px-4 py-2 font-normal">
                {formatDate(student?.dateOfBirth)}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Roll No:</div>
              <div className="px-4 py-2 font-normal">{student?.id}</div>
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
                {student?.guardian?.fatherName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Father Occupation</div>
              <div className="px-4 py-2 font-normal">
                {student?.guardian?.fatherOccupation}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Father ContactNo</div>
              <div className="px-4 py-2 font-normal">
                {student?.guardian?.fatherContactNo}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mother Name</div>
              <div className="px-4 py-2 font-normal">
                {student?.guardian?.motherName} years
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mother Occupation</div>
              <div className="px-4 py-2 font-normal">
                {student?.guardian?.motherOccupation}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Mother ContactNo</div>
              <div className="px-4 py-2 font-normal">
                {student?.guardian?.motherContactNo}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Local Guardian Name</div>
              <div className="px-4 py-2 font-normal">
                {student?.localGuardian?.name}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Local Guardian Occupation
              </div>
              <div className="px-4 py-2 font-normal">
                {student?.localGuardian?.occupation}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Local Guardian ContactNo:
              </div>
              <div className="px-4 py-2 font-normal">
                {student?.localGuardian?.contactNo}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Local Guardian Address
              </div>
              <div className="px-4 py-2 font-normal">
                {formatDate(student?.localGuardian?.address)}
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
                {student?.admissionSemester?.name}{" "}
                {student?.admissionSemester?.year}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Academic Department Name
              </div>
              <div className="px-4 py-2 font-normal">
                {student?.academicDepartment?.name}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">
                Academic Faculty Name
              </div>
              <div className="px-4 py-2 font-normal">
                {student?.academicFaculty?.name}
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
              <div className="px-4 py-2 font-normal">{student?.email}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact Number</div>
              <div className="px-4 py-2 font-normal">{student?.contactNo}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Present Address</div>
              <div className="px-4 py-2 font-normal">
                {student?.presentAddress}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Permanent Address</div>
              <div className="px-4 py-2 font-normal">
                {student?.permanentAddress}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100">
      {student ? (
        <div className="container mx-auto my-5 p-5">
          <h1 className="text-xl">Student Details</h1>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  {student?.profileImg ? (
                    <img
                      className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto"
                      src={student?.profileImg}
                      alt=""
                      width="384"
                      height="512"
                    />
                  ) : (
                    <img
                      className="w-24 h-24 md:w-48 md:h-auto rounded-full mx-auto"
                      src={
                        student.gender === "female"
                          ? femaleAvatar
                          : studentAvatar
                      }
                      alt=""
                      width="384"
                      height="512"
                    />
                  )}
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {student?.fullName}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  Owner at Her Company Inc.
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
                        {student?.isDeleted === false && <span>Active</span>}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Birthday</span>
                    <span className="ml-auto">
                      {formatDate(student?.dateOfBirth)}
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

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Education</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">
                          {student?.admissionSemester.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          createdAt:{" "}
                          {formatDate(student?.admissionSemester.createdAt)}
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          {student?.academicDepartment?.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {formatDate(student?.academicDepartment?.createdAt)}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No student details available</p>
      )}
    </div>
  );
};

export default StudentDetails;
