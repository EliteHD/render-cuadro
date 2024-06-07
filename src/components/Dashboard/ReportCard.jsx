import { Card, } from 'antd';
import moment from "moment";

const ReportCard = ({ report, refetch }) => {
  const {
    _id,
    incident_name,
    incident_description,
    incident_status,
    incident_files,
    incident_images,
    incident_location: { alt, long, municipality },
    technical_user: { name: techName, email: techEmail, phone: techPhone, _id: techId },
    client_user: { name: clientName, email: clientEmail, phone: clientPhone, _id: clientId },
    createdAt
  } = report;

  return (
    <Card
      title={incident_name}
      className=''
    >
      <p><strong>Descripción:</strong> {incident_description}</p>
      <p><strong>Estado:</strong> {incident_status}</p>
      <p><strong>Fecha de creación:</strong> {moment(createdAt).format("DD/MM/YYYY")}</p>
      <p><strong>Ubicación:</strong> {`${alt}, ${long}, ${municipality}`}</p>
      <p><strong>Usuario técnico:</strong> {`${techName} - ${techEmail} - ${techPhone}`}</p>
      <p><strong>Usuario cliente:</strong> {`${clientName} - ${clientEmail} - ${clientPhone}`}</p>
    </Card>
  );
};

export default ReportCard;
