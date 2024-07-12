import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/global";
import { Link } from "react-router-dom";
import { TAcademicDepartment } from "../../../types/academicManajment.types";
import {
  useGetAllAcademicDepartmentQuery,
  useUpdateAcademicDepartmentByIdMutation,
} from "../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAcademicFacultySchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";

export type TTableData = Pick<
  TAcademicDepartment,
  "name" | "createdAt" | "updatedAt"
>;

const AcademicDepartment = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<TTableData | null>(null);

  const [updateAcademicDepartment] = useUpdateAcademicDepartmentByIdMutation();

  const showModal = (item: TTableData) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const formatDate = (dateString: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options as any);
  };

  const [params, setParams] = useState<TQueryParam[]>([]);

  const [page, setPage] = useState(1);
  const {
    data: academicDepartmentData,
    isFetching,
    refetch,
  } = useGetAllAcademicDepartmentQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = academicDepartmentData?.meta;
  const tableData = academicDepartmentData?.data?.map(
    ({ _id, name, createdAt, updatedAt }) => ({
      key: _id,
      name,
      createdAt,
      updatedAt,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (dateString) => formatDate(dateString),
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Link to={`/superAdmin/academic-department-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button type="primary" onClick={() => showModal(item)}>
              Update
            </Button>
            <Button>Block</Button>
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
      setParams(queryParams);
    }
  };

  const onSubmit = async (data: any) => {
    if (!currentItem) return;

    setConfirmLoading(true);
    try {
      await updateAcademicDepartment({
        departmentId: currentItem?.key,
        ...data,
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

  return (
    <>
      <Modal
        title="Update Academic Department"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicFacultySchema)}
          defaultValues={{ name: currentItem?.name || "" }}
        >
          <PHInput type="text" label="Academic Department Name" name="name" />
          <Button className="hidden" htmlType="submit">
            Submit
          </Button>
        </PHForm>
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

export default AcademicDepartment;
