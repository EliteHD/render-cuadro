import React, { useState, useEffect } from 'react';
import { Layout, Table, Row, Col, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from '../../../../serverHost';

const { Content, Header } = Layout;

function MainUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get(`${SERVER_HOST}/api/auth/getAllUsers`);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error.message);
        }
    };

    const handleEliminarUsuario = async (id) => {
        try {
            await axios.delete(`${SERVER_HOST}/api/auth/deleteUser/${id}`);
            message.success('Usuario eliminado exitosamente');
            obtenerUsuarios();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error.message);
            message.error('Error al eliminar el usuario');
        }
    };

    const handleEditarUsuario = (id) => {
        navigate(`/Dashboard/editUsuario/${id}`);
    };

    const columns = [
        {
            title: 'Nombre de Usuario',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEditarUsuario(record._id)} className='bg-yellow-400 p-2 rounded-xl shadow-xl'>Editar</a>
                    <a onClick={() => handleEliminarUsuario(record._id)} className='bg-red-400 text-white p-2 rounded-xl shadow-xl'>Eliminar</a>
                </Space>
            ),
        },
    ];

    return (
        <Layout className="flex-1 flex h-full bg-white">
            <div className="p-2.5  w-full bg-white"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Header
                    className=" w-full bg-cbtisbrow shadow-md rounded-2xl backdrop:blur-xl backdrop-filter bg-opacity-95">
                    <div>
                        <span className="text-white text-2xl font-bold">Usuarios registrados</span>
                    </div>
                </Header>
            </div>

            <Content className="bg-white h-full w-full flex flex-col items-center px-8 py-4 space-y-8 overflow-auto">
                <Row
                    gutter={[16, 16]}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                    className="w-full"
                ></Row>

                <Row className="w-full">
                    <Col span={24}>
                        <div className="flex justify-end w-full p-4">
                            <Link to='/Dashboard/addUsuario' className="bg-cbtisbrow text-white px-4 py-2 rounded-md">
                                Agregar Usuario
                            </Link>
                        </div>

                        <Table columns={columns} dataSource={usuarios} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default MainUsuarios;
