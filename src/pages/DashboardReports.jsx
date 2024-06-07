import { useState } from "react";
import { Layout, Table, Pagination } from "antd";
import Loader from "@components/General/Loader";
import { useGetIncidents } from "@hooks/Incidents/useGetIncidents";
import MobileViewReports from "@components/Dashboard/MobileViewReports";
import { ColumnsTableReports } from "@constants/ColumnsTableReports";

export default function DashboardReports() {
  const { Content } = Layout;

  const [filter, setFilter] = useState({ search: "", page: 1, roleId: "" });

  const { data, isFetching, refetch } = useGetIncidents(filter);
  console.log(data)

  const handlePageChange = (newPage) => {
    if (newPage != filter.page) {
      setFilter({ ...filter, page: newPage });
    }
  };

  const handleRefetch = () => {
    refetch()
  }

  return (
    <Layout className="flex-1 flex h-full">
      <Content className="bg-transparent h-full flex flex-col items-start justify-center px-8 py-4 space-y-8 overflow-auto">

        {isFetching ? (
          <Loader />
        ) : (
          <>
            <Table
              pagination={false}
              className="w-100 hidden lg:flex"
              columns={ColumnsTableReports(handleRefetch)}
              dataSource={data}
              rowKey={(record) => record?.id}
            />
            <MobileViewReports data={data} isFetching={isFetching} refetch={refetch} />
            <div className="flex  w-full justify-center items-center">
              <Pagination
                pageSize={10}
                total={data?.totalUsers}
                defaultCurrent={filter.page}
                onChange={(page) => {
                  handlePageChange(page);
                }}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
}
