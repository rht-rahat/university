import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { zodResolver } from "@hookform/resolvers/zod";
import { createAcademicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicDepartment = () => {
  const [createAcademicDepartmentApi] = useAddAcademicDepartmentMutation();

  const { data: sData, isLoading: sIsloading } =
    useGetAllFacultyQuery(undefined);

  const facultyData = sData?.data?.map((item: any) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  //   console.log(facultyData);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    const departmentData = {
      name: data?.name,
      academicFaculty: data?.academicFaculty,
    };
    try {
      console.log(departmentData);
      const res = (await createAcademicDepartmentApi(departmentData)) as any;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Department Create successfully", {
          id: toastId,
        });
      }
      //   console.log(res);
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHInput label="Department name" name="name" type="text" />
          <PHSelect
            label="Select Faculty"
            name="academicFaculty"
            options={facultyData}
            disabled={sIsloading}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
