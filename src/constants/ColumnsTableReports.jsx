import moment from "moment";

import { Space } from "antd";
import EditButton from "@components/Dashboard/EditButton";

export const ColumnsTableReports = () => [
  {
    title: "Nombre",
    dataIndex: "incident_name",
  },
  {
    title: "Descripción",
    dataIndex: "incident_description",
  },
  {
    title: "Estado",
    dataIndex: "incident_status",
  },
  {
    title: "Ubicación",
    dataIndex: "incident_location",
    render: (location) => `${location.alt}, ${location.long}, ${location.municipality}`,
  },
  {
    title: "Usuario técnico",
    dataIndex: "technical_user",
    render: (user) => `${user.name} - ${user.email} - ${user.phone}`,
  },
  {
    title: "Usuario cliente",
    dataIndex: "client_user",
    render: (user) => `${user.name} - ${user.email} - ${user.phone}`,
  },
  {
    title: "Acciones",
    dataIndex: "",
    render: (_, record) => (
      <Space size="middle">
        <EditButton id={record?._id} />
        
      </Space>
    ),
  },
];
