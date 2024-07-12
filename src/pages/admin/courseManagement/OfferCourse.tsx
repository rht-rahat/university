import { Button, Col, Flex, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import PHTimePicker from "../../../components/form/PHTimePicker";
import {
  useAddOfferCourseMutation,
  useGetAllCourseQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { weekDaysOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { offeredCourseSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  // console.log("active id>>>>>>", courseId);

  const [createOfferCourse] = useAddOfferCourseMutation();
  const { data: semesterData } = useGetAllSemesterRegistrationsQuery(undefined);
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: courseDataAction } = useGetAllCourseQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });
  // console.log(courseData);

  const semesterRegistrationOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));

  const facultyDataOptions = facultyData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const courseActionOptions = courseDataAction?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const offerCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      // startTime: moment(new Date(data.startTime)).format("HH:MM"),
      // endTime: moment(new Date(data.endTime)).format("HH:MM"),
    };

    // console.log(offerCourseData);

    const res = await createOfferCourse(offerCourseData);

    if (!!res.hasOwnProperty("error")) {
      toast.error(res?.error?.data.message);
    } else {
      toast.success(res?.data?.message);
    }

    console.log(res);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(offeredCourseSchema)}>
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                name="semesterRegistration"
                label="Semester Registration"
                options={semesterRegistrationOptions}
              ></PHSelect>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                name="academicFaculty"
                label="Academic Faculty"
                options={facultyDataOptions}
              ></PHSelect>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={academicDepartmentOptions}
              ></PHSelect>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHSelectWithWatch
                onValueChange={setCourseId}
                name="course"
                label="Course"
                options={courseActionOptions}
              ></PHSelectWithWatch>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                name="faculty"
                label="Faculty"
                disabled={!courseId || fetchingFaculties}
                options={facultiesOptions}
              ></PHSelect>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHInput type="number" name="section" label="Section"></PHInput>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="number"
                name="maxCapacity"
                label="Max Capacity"
              ></PHInput>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                mode="multiple"
                name="days"
                label="Days"
                options={weekDaysOptions}
              ></PHSelect>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHTimePicker name="startTime" label="Start Time"></PHTimePicker>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <PHTimePicker name="endTime" label="End Time"></PHTimePicker>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
