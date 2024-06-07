import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useAddIncident } from "@hooks/Incidents/useAddIncident";
import { useEditUser } from "@hooks/Users/useEditUser";
import { useParams } from "react-router-dom";

import { useGetIncidentById } from "@hooks/Incidents/useGetIncidentById";
import Loader from "@components/General/Loader";
import moment from "moment";
import { useRegister } from "@hooks/Users/useRegister";

export default function ReportForm({ isAdd, isEdit }) {
  const navigate = useNavigate();

  const { addIncident } = useAddIncident();
  const { editUser } = useEditUser();
  const { register } = useRegister();

  const onFinish = async (values) => {
    const formData = new FormData();

    
    // Agregar valores al FormData
    formData.append("id_incident", values.id_incident);
    formData.append("incident_name", values.incident_name);
    formData.append("incident_status", values.incident_status);
    formData.append("user", values.user);
    formData.append("incident_description", values.incident_description);
    formData.append("incident_location", values.incident_location);
    

    // Agregar imágenes al FormData
    if (values.avatar && values.avatar.length > 0) {
      const avatarFile = values.avatar[0].originFileObj;
      formData.append("images", avatarFile);
    }

    addIncident(formData);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const { id } = useParams();

  const { data, isFetching } = useGetIncidentById(id);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ remember: true }}
      style={{ width: "100%", margin: "0 auto" }}
    >
      <Form.Item
        label="Id incidente"
        name="id_incident"
        initialValue={data?._id || ""}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nombre del incidente"
        name="incident_name"
        initialValue={""}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Incidente status"
        name="incident_status"
        initialValue={""}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Usuario" name="user" initialValue={""}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripción del incidente"
        name="incident_description"
        initialValue={""}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Localización del incidente"
        name="incident_location"
        initialValue={""}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Evidencia del incidente"
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        initialValue={
          data?.avatar
            ? [{ uid: "-1", name: "avatar", status: "done", url: data.avatar }]
            : []
        }
      >
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }}
          beforeUpload={() => false}
          maxCount={1}
          accept="image/*"
          onChange={(info) => {
            const { status } = info.file;
            if (status === "done") {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Subir foto</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          style={{ backgroundColor: "#008FD1" }}
          type="primary"
          htmlType="submit"
          className="w-full my-4"
        >
          {isEdit || isAdd ? "Guardar" : "Registrarse"}
        </Button>
      </Form.Item>
    </Form>
  );
}
