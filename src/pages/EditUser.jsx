import React from "react";
import { Layout, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserForm from "@components/Forms/UserForm";
import  ReportForm  from "@components/Forms/ReportForm";

export default function EditUser() {
  const { Content } = Layout;
  const breadCrumbItems = [
    {
      href: "/Dashboard/Reportes",
      title: (
        <>
          <UserOutlined />
          <span>Usuarios Tabla</span>
        </>
      ),
    },
    {
      title: "Actualizar Historial",
    },
  ];

  return (
    <Layout className="flex-1 flex h-full">
      <Content className="bg-slate-200 h-full flex flex-col items-start justify-center px-12  md:pl-12  md:pr-24 py-4 space-y-8 bg-red-5">
        <Breadcrumb items={breadCrumbItems} style={{marginBottom: 20}} />
        <ReportForm isEdit/>
      </Content>
    </Layout>
  );
}
