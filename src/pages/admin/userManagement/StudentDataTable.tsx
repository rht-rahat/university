import {
  Button,
  Col,
  Divider,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useMemo, useState } from "react";
import { TQueryParam } from "../../../types/global";
import {
  useGetAllStudentsQuery,
  useUpdateStudentByIdMutation,
  useDeleteStudentByIdMutation,
} from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types/userManagement.types";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { verifyToken } from "../../../utils/verifyToken";
import { currentToken } from "../../../redux/features/auth/authSlice";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import { bloodGroupOptions, gendersOptions } from "../../../constants/global";
import PHSelect from "../../../components/form/PHSelect";

export type TTableData = Pick<TStudent, any>;

const StudentDataTable = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<TTableData | null>(null);
  const [updateStudent] = useUpdateStudentByIdMutation();
  const [deleteStudent] = useDeleteStudentByIdMutation();

  const showModal = (item: TTableData) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const token = useAppSelector(currentToken);
  const user = token ? verifyToken(token) : null;
  const role = user?.role;
  const [params, setParams] = useState<TQueryParam[]>([]);

  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isFetching,
    refetch,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({
      _id,
      fullName,
      id,
      email,
      contactNo,
      name,
      presentAddress,
      permanentAddress,
      bloogGroup,
      emergencyContactNo,
      dateOfBirth,
      gender,
      guardian,
    }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      firstName: name?.firstName,
      middleName: name?.middleName,
      lastName: name?.lastName,
      presentAddress,
      permanentAddress,
      bloogGroup,
      emergencyContactNo,
      dateOfBirth,
      gender,
      fatherName: guardian.fatherName,
      fatherOccupation: guardian.fatherOccupation,
      fatherContactNo: guardian.fatherContactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Roll Number",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Link to={`/${role}/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button onClick={() => showModal(item)}>Update</Button>
            <Button onClick={() => confirmDelete(item)}>Delete</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  const studentValues = useMemo(
    () => ({
      name: {
        firstName: currentItem?.firstName,
        middleName: currentItem?.middleName,
        lastName: currentItem?.lastName,
      },
      contactNo: currentItem?.contactNo,
      presentAddress: currentItem?.presentAddress,
      permanentAddress: currentItem?.permanentAddress,
      gender: currentItem?.gender,
      emergencyContactNo: currentItem?.emergencyContactNo,
      bloogGroup: currentItem?.bloogGroup,
      email: currentItem?.email,
      guardian: {
        fatherName: currentItem?.fatherName,
        fatherOccupation: currentItem?.fatherOccupation,
        fatherContactNo: currentItem?.fatherContactNo,
      },
    }),
    [currentItem]
  );

  const onSubmit = async (data: any) => {
    if (!currentItem) return;

    setConfirmLoading(true);
    try {
      await updateStudent({
        studentId: currentItem?.key,
        student: {
          presentAddress: data.presentAddress,
          name: {
            firstName: data?.name.firstName,
            middleName: data?.name.middleName,
            lastName: data?.name.lastName,
          },
          contactNo: data?.contactNo,
          permanentAddress: data?.permanentAddress,
          gender: data?.gender,
          emergencyContactNo: data?.emergencyContactNo,
          bloogGroup: data?.bloogGroup,
          email: data?.email,
          guardian: {
            fatherName: data?.guardian?.fatherName,
            fatherOccupation: data?.guardian?.fatherOccupation,
            fatherContactNo: data?.guardian?.fatherContactNo,
          },
        },
      }).unwrap();
      toast.success("Update successful");
      await refetch();
    } catch (error: any) {
      toast.error("Update failed", error);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleOk = () => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (form) {
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const [modal, contextHolder] = Modal.useModal();

  const confirmDelete = (item: TTableData) => {
    modal.confirm({
      title: "Confirm",
      content: (
        <div className="text-sm" style={{ lineHeight: "1.5" }}>
          <span className="text-xs">
            Are you sure you want to delete student{" "}
          </span>
          <span style={{ fontWeight: "bold", color: "red" }}>
            {item.fullName}
          </span>
          <span>?</span>
        </div>
      ),
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteStudent({ studentId: item.key }).unwrap();
          toast.success("Delete successful");
          await refetch();
          console.log(`Deleted item ID: ${item.id}, Name: ${item.fullName}`);
        } catch (error: any) {
          toast.error("Delete failed", error);
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Update Academic Department"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={24}>
            <PHForm
              key={currentItem?.key}
              onSubmit={onSubmit}
              defaultValues={studentValues}
            >
              <Divider>Personal Info</Divider>
              <Row gutter={5}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="name.firstName"
                    label="First Name"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="name.middleName"
                    label="Middle Name"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput type="text" name="name.lastName" label="Last Name" />
                </Col>

                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHSelect
                    options={gendersOptions}
                    name="gender"
                    label="Gender"
                  />
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
                  <PHInput type="email" name="email" label="Email" />
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
              {/* Guardian */}
              <Row gutter={5}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.fatherName"
                    label="Father Name"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.fatherOccupation"
                    label="Father Occupation"
                  />
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="guardian.fatherContactNo"
                    label="Father ContactNo:"
                  />
                </Col>
              </Row>
              <Button htmlType="submit">Submit</Button>
            </PHForm>
          </Col>
        </Row>
      </Modal>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        defaultCurrent={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentDataTable;
