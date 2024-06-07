import React, { useContext, useState } from "react";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "@context/AuthContext";
import cbtisLOGO from "@assets/images/logos/cbtisLOGO.png";
import cbtisplaza from "@assets/images/libreria.jpg";
import { auth } from "../../firebase.config";
import axios from "axios"; // Importar axios
import { SERVER_HOST } from "../../serverHost";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getUserData(email, password); // Pasar email y password a getUserData
        setAuth(user);
        navigate("/Dashboard/Inventario");
      })
      .catch((error) => {
        console.error('Error:', error);
        notification.error({
          message: "Error al iniciar sesión",
          description: `Ha ocurrido un error al iniciar sesión: ${error.message}`,
          placement: "topRight",
        });
      });
  };

  const getUserData = (email, password) => {
    const emailTrimmed = email.toLowerCase().trim();
    console.log(emailTrimmed, password);

    signInWithEmailAndPassword(auth, emailTrimmed, password)
      .then(() => {
        console.log('Usuario ha iniciado sesión con Firebase');
        axios.post(`${SERVER_HOST}/api/auth/loginFirebase`, {
          email: emailTrimmed,
        })
          .then(response => {
            console.log('Usuario registrado en MongoDB:', response.data);
            AsyncStorage.setItem('user', JSON.stringify(response.data));
            dispatch(setUser(response.data));
          })
          .catch(error => {
            console.error('Error al iniciar sesión en MongoDB:', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de Firebase:', errorCode, errorMessage);
      });
  };

  return (
    <div className="flex h-screen">
      <Row className="w-full h-full">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          className="flex items-center justify-center p-4 md:p-16"
        >
          <Form
            name="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            style={{ width: "100%", margin: "0 auto" }}
          >
            <Col className="items-center justify-center text-center mb-9">
              <img src={cbtisLOGO} alt="logo" className="w-1/4 h-1/4 mx-auto" />
              <span className="text-xl font-bold text-cbtisCOLOR">
                Departamento de Planeación y Evaluación
              </span>
            </Col>
            <Form.Item
              label="Correo Electrónico"
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su correo electrónico",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su contraseña",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full my-4 rounded-lg linear text-base font-medium text-white transition duration-200 bg-cbtisCOLOR hover:bg-blue-900"
              >
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <img src={cbtisplaza} className="h-screen brightness-75 object-cover w-full" alt="Plaza" />
        </Col>
      </Row>
    </div>
  );
}
