import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, gendersOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { toast } from "sonner";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";

const CreateAdmin = () => {
  const [createAdmin] = useAddAdminMutation();

  // const adminValues = {
  //   designation: "Admin",
  //   name: {
  //     firstName: "Mamun",
  //     middleName: "Admin",
  //     lastName: "of English",
  //   },
  //   gender: "male",

  //   bloogGroup: "A+",
  //   email: "faculty@gmail.com",
  //   contactNo: "1235678",
  //   emergencyContactNo: "987-654-3210",
  //   presentAddress: "123 Main St, Cityville",
  //   permanentAddress: "456 Oak St, Townsville",
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const adminData = {
      password: "admin123",
      admin: data,
    };
    console.log(adminData);

    const formData = new FormData();

    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);

    const res: any = await createAdmin(formData);

    if (!!res.hasOwnProperty("error")) {
      toast.error(res?.error?.data.message);
    } else {
      toast.success(res?.data?.message);
    }
    // console.log(res);

    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={5}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={gendersOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
            </Col>
          </Row>

          {/* contact info */}

          <Divider>Contact Info</Divider>
          <Row gutter={5}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
