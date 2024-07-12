import { Button, Col, Flex } from "antd";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/faculty.api";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";

const FacultyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  console.log(facultyCoursesData);
  const navigate = useNavigate();

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item?.academicSemester.name} ${item?.academicSemester.year}`,
    value: item?.semesterRegistration?._id,
  }));
  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item?.course?.title,
    value: item?.course?._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Semester"
            name="semesterRegistration"
            options={semesterOptions}
          />
          <PHSelect label="Courses" name="course" options={courseOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default FacultyCourses;
