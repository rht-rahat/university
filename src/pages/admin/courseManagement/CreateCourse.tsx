import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useEffect } from "react";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";

const CrateCourse = () => {
  const [addCourse] = useAddCourseMutation();

  const { data: semester, refetch } = useGetAllCoursesQuery(undefined);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const preRequisiteCoursesOptions = semester?.data?.map((item: any) => ({
    value: item._id,
    label: item?.title,
  }));
  // console.log(academicSemester);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    console.log(courseData);
    try {
      const res = (await addCourse(courseData)) as any;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course Create successfully", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" label="Title" name="title"></PHInput>
          <PHInput type="text" label="Prefix" name="prefix"></PHInput>
          <PHInput type="text" label="Code" name="code"></PHInput>
          <PHInput type="text" label="Credits" name="credits"></PHInput>
          <PHSelect
            mode="multiple"
            name="preRequisiteCourses"
            label="Prerequisite Courses"
            options={preRequisiteCoursesOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CrateCourse;
