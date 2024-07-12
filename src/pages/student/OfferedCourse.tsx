import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursedQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const navigate = useNavigate();
  const [enroll] = useEnrollCourseMutation();
  const { data: offeredCoursedData } = useGetAllOfferedCoursedQuery(undefined);

  const singleObject = offeredCoursedData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});
  console.log(modifiedData);

  const handleNavigate = () => {
    navigate("/student/dashboard");
  };

  const handleEnroll = async (id: any) => {
    const enrollData = {
      offeredCourse: id,
    };
    const res = await enroll(enrollData);
    // console.log(res);

    if ( 'data' in res && res?.data?.success === true) {
      toast.success(res?.data?.message);
    } else {
      toast.error("something went wrong");
    }
  };

  if (!modifiedData.length) {
    return (
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  No Available Offered Coursed
                </h1>
                <p className="my-2 text-gray-800">
                  Sorry about that! No Data Found you need to go.
                </p>
                <button
                  onClick={() => handleNavigate()}
                  className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                >
                  Take me there!
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    );
  }
  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: any) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>section: {section?.section}</Col>
                    <Col span={5} key={section?._id}>
                      days:{" "}
                      {section.days.map((day: any) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section?.startTime}</Col>
                    <Col span={5}>End Time: {section?.endTime}</Col>

                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
