import { Table, TableColumnsType } from "antd";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement.api";
import { TTableData } from "./StudentDataTable";


const AllAdmins = () => {
    const {
        data: adminData,
        isFetching,
        // refetch,
    } = useGetAllAdminsQuery(undefined);

      console.log(adminData);

      const tableData = adminData?.data?.map(
        ({
          _id,
          fullName,
          id,
          email,
          contactNo,
          bloogGroup,
          gender,
        }) => ({
          key: _id,
          id,
          fullName,
          email,
          contactNo,
          bloogGroup,
          gender
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
          title: "Blood Group",
          dataIndex: "bloogGroup",
        },
        {
          title: "Gender",
          dataIndex: "gender",
        },
        {
          title: "Contact No",
          dataIndex: "contactNo",
        },
      ];
    return (
        <div>
          <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
        </div>
    );
};

export default AllAdmins;