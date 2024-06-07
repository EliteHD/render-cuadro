import { Space } from "antd";
import DeleteModal from "@components/Dashboard/DeleteModal";
import EditButton from "@components/Dashboard/EditButton";
import moment from "moment";
import CustomToggle from "@components/Dashboard/CustomToggle";

export const ColumnsTableUsers = (handleRefetch) => [
  {
    title: "Nombre",
    dataIndex: "name",
  },
  {
    title: "Apellido paterno",
    dataIndex: "lastName",
  },

  {
    title: "Correo electrónico",
    dataIndex: "email",
  },
  {
    title: "Número de teléfono",
    dataIndex: "phone",
  },

 
  {
    title: "Fecha de creación",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("DD/MM/YYYY"),
  },
  // {
  //   title: "Acciones",
  //   dataIndex: "",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <EditButton id={record?._id} />
  //       <DeleteModal
  //         name={record?.firstName}
  //         id={record?.id}
  //         refetch={handleRefetch}
  //       />
  //     </Space>
  //   ),
  // },
];
