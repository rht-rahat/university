import { Button, Card, Col, Flex, Pagination, Row, Space, } from "antd";
import { useState } from "react";

import { TStudent } from "../../../types/userManagement.types";
import { Link } from "react-router-dom";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";

export type TTableData = Pick<TStudent, "name">;

const AcademicFaculty = () => {
  const token = useAppSelector(currentToken);
  const user = token ? verifyToken(token) : null;
  const role = user?.role;
  // const [params, setParams] = useState<TQueryParam[]>([]);

  const [page, setPage] = useState(1);
  const { data: facultyData, isFetching } = useGetAllFacultyQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    // ...params,
  ]);
  // console.log(facultyData);

  const metaData = facultyData?.meta;

  const formatDate = (dateString: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options as any);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {facultyData?.data?.map((item) => (
          <Col sm={1} md={6} lg={8} className="w-full" key={item._id}>
            <Card loading={isFetching} title={item?.name} bordered={false}>
              <Flex justify="space-between">
                <span>
                  <strong>CreateAt: </strong>
                  {formatDate(item?.createdAt)}
                </span>
                <span>
                  <strong>updatedAt: </strong>
                  {formatDate(item?.updatedAt)}
                </span>
              </Flex>{" "}
              <br />
              <Space className="mt-5">
                <Link to={`/${role}/faculty-data/${item._id}`}>
                  <Button>Details</Button>
                </Link>
                <Button>Update</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        className="mt-5"
        onChange={(value) => setPage(value)}
        defaultCurrent={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default AcademicFaculty;
