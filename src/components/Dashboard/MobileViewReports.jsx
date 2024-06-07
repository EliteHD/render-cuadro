import React from "react";
import UserCard from "@components/Dashboard/UserCard";
import { Col, Row } from "antd";
import SkeletonUsers from "./Skeleton";
import ReportCard from "./ReportCard";

export default function MobileViewReports({ data, isFetching, refetch }) {
  const skeletons = Array.from({ length: 6 }, (_, index) => (
    <Col key={index} xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
      <SkeletonUsers />
    </Col>
  ));
  return (
    <div className="space-y-2">
      <Row gutter={[16, 16]} className="flex lg:hidden">
        {data.map((report, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
            <ReportCard report={report} refetch={refetch} />
          </Col>
        ))}
      </Row>
     
      <Row gutter={[16, 16]} className="flex lg:hidden">
      {isFetching && skeletons}
      </Row>
    </div>
  );
}
