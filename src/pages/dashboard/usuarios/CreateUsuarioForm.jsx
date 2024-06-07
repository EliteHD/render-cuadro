import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import axios from 'axios';
import { SERVER_HOST } from '../../../../serverHost';
import { useParams, useNavigate } from 'react-router-dom';

const { Content, Header } = Layout;
const { Item } = Form;

function CreateUsuarioForm() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUsuario(id);
        }
    }, [id]);

    const fetchUsuario = async (userId) => {
        try {
            const response = await axios.get(`${SERVER_HOST}/api/auth/getUser/${userId}`);
            form.setFieldsValue(response.data);
        } catch (error) {
            console.error('Error al obtener el usuario:', error.message);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (id) {
                await axios.put(`${SERVER_HOST}/api/auth/editUser/${id}`, values);
                message.success('Usuario actualizado exitosamente');
            } else {
                await axios.post(`${SERVER_HOST}/api/auth/createUser`, values);
                message.success('Usuario creado exitosamente');
            }
            navigate('/Dashboard/usuarios');
        } catch (error) {
            console.error('Error al guardar el usuario:', error.message);
            message.error('Error al guardar el usuario');
        }
        setLoading(false);
    };

    return (
        <Layout className="flex-1 flex h-full bg-white">
            <div className="p-2.5 w-full bg-white"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Header className="w-full bg-cbtisbrow shadow-md rounded-2xl backdrop:blur-xl backdrop-filter bg-opacity-95">
                    <div>
                        <span className="text-white text-2xl font-bold">{id ? 'Editar Usuario' : 'Agregar Usuario'}</span>
                    </div>
                </Header>
            </div>

            <Content className='p-8'>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Item
                        label="Nombre de Usuario"
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}
                    >
                        <Input />
                    </Item>

                    <Item
                        label="Correo Electrónico"
                        name="email"
                        rules={[{ required: true, message: 'Por favor ingresa el correo electrónico' }]}
                    >
                        <Input type="email" />
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {id ? 'Actualizar Usuario' : 'Crear Usuario'}
                        </Button>
                    </Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default CreateUsuarioForm;
