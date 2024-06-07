import React from "react";
import { selectRolesMockData } from "@mocks/mocksData";
import { Button, Form, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function UserFilter({handleSearchChange, handleCleanSearch}) {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleSearchChange(values)
  };

  const handleClean = () => {
    form.resetFields();
    handleCleanSearch();
  };

 
  return (
    <div className="w-full space-y-8">
      <span className="text-left text-[#F87315] text-4xl font-bold">
        Usuarios
      </span>
      
      <div>
        <Button
          onClick={() => navigate("/Dashboard/AddUser")}
          className="bg-[#F87315] w-[95%] md:w-auto"
          type="primary"
        >
          Agregar un nuevo usuario
        </Button>
      </div>
    </div>
  );
}
