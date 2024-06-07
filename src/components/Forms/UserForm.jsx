import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { selectFormRolesMockData } from "@mocks/mocksData";
import { useAddUser } from "@hooks/Users/useAddUser";
import { useEditUser } from "@hooks/Users/useEditUser";
import { useParams } from "react-router-dom";
import { useGetUserById } from "@hooks/Users/useGetUserById";
import Loader from "@components/General/Loader";
import moment from "moment";
import { useRegister } from "@hooks/Users/useRegister";

export default function UserForm({ isAdd, isEdit }) {
  const navigate = useNavigate();

  const { addUser } = useAddUser();
  const { editUser } = useEditUser();
  const { register } = useRegister();

  const onFinish = async (values) => {


    const formData = new FormData();

    // Agregar campos de texto al FormData
    formData.append("name", values.name);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);


    formData.append("phone", values.phone);

    // Agregar imágenes al FormData
    if (values.avatar && values.avatar.length > 0) {
      const avatarFile = values.avatar[0].originFileObj;
      formData.append("images", avatarFile);
    }

    // if (!isEdit && !isAdd) {
    //   register(values);
    // } else if (isEdit) {
    //   await editUser(values);
    // } else {
    //   await addUser(formData);
    // }

    addUser(formData)

    // if (!isEdit && !isAdd) {
    //   navigate("/Pending");
    // } else {
    //   navigate("/Dashboard/Users");
    // }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const { id } = useParams();

  const { data, isFetching } = useGetUserById(id);

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
      {!isEdit && !isAdd && (
        <Form.Item className="flex flex-row">
          <div className="flex flex-row  space-x-2 items-center justify-center">
            <Button
              type="primary"
              className="bg-KarimNot md:hidden flex"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/")}
            />
            <span className="opacity-100 text-center text-[10px] md:text-lg text-KarimNot font-bold ">
              Solicita al administrador activar tu cuenta.
            </span>
          </div>
        </Form.Item>
      )}

      {isEdit && (
        <Form.Item
          hidden={isEdit ? true : false}
          label="Id"
          name="id"
          initialValue={data?.id || ""}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label="Nombre"
        name="name"
        initialValue={data?.firstName || ""}
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu nombre.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Apellido Paterno"
        name="lastName"
        initialValue={data?.lastName || ""}
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu apellido paterno.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Correo electrónico"
        name="email"
        initialValue={data?.email || ""}
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu correo electrónico.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        initialValue={data?.password || ""}
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu contraseña.",
          },
        ]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        label="Número de teléfono"
        name="phone"
        initialValue={data?.number || ""}
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu número de teléfono.",
          },
          {
            pattern: /^[\d+-]+$/,
            message: "Por favor ingresa solo números, + y -.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Foto de perfil"
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
