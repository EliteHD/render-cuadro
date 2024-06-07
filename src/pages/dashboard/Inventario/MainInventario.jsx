import React, { useState, useEffect } from 'react';
import { Layout, Table, Row, Col, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from '../../../../serverHost';

function MainInventario() {
    const { Content, Header } = Layout;
    const [articulos, setArticulos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerArticulos();
        console.log('Articulos:', articulos);
    }, []);

    const obtenerArticulos = async () => {
        try {
            const response = await axios.get(`${SERVER_HOST}/api/articulos/articulos`);
            if (response.data) {
                const articulosConKey = response.data.map(articulo => ({
                    ...articulo,
                    key: articulo.id, // Usa el id del artículo como la clave
                }));
                console.log('Articulos con key:', articulosConKey);
                setArticulos(articulosConKey);
            }
        } catch (error) {
            console.error('Error al obtener los artículos:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${SERVER_HOST}/api/articulos/articulos/${id}`);
            message.success('Artículo eliminado exitosamente');
            obtenerArticulos();
        } catch (error) {
            console.error('Error al eliminar el artículo:', error.message);
            message.error('Error al eliminar el artículo');
        }
    };

    const handleEdit = (id) => {
        navigate(`/Dashboard/editArticulo/${id}`);
    };


    return (
        <Layout className="flex-1 flex h-full bg-white">
            <div
                className="p-2.5 w-full bg-white"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Header className="w-full bg-cbtisbrow shadow-md rounded-2xl backdrop:blur-xl backdrop-filter bg-opacity-95">
                    <div>
                        <span className="text-white text-2xl font-bold">Proyección semestral de necesidades</span>
                    </div>
                </Header>
            </div>
            <div className="flex justify-end w-full p-4">
                <Link to='/Dashboard/addArticulo' className="bg-cbtisbrow text-white px-4 py-2 rounded-md">
                    Agregar Articulo
                </Link>
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
                        <label className="text-lg mb-6 font-bold">Cuadro de Necesidades</label>
                        <Table
                            columns={[
                                {
                                    title: 'Nombre',
                                    dataIndex: 'nombre_articulo',
                                    key: 'nombre_articulo',
                                },
                                {
                                    title: 'Articulo',
                                    dataIndex: 'descripcion_articulo',
                                    key: 'descripcion_articulo',
                                },
                                {
                                    title: 'Acciones',
                                    key: 'acciones',
                                    render: (text, record) => (
                                        <Space size="middle">
                                            <a onClick={() => handleEdit(record._id)} className='bg-yellow-400 p-2 rounded-xl shadow-xl'>Editar</a>
                                            <a onClick={() => handleDelete(record._id)} className='bg-red-400 text-white p-2 rounded-xl shadow-xl'>Eliminar</a>
                                        </Space>
                                    ),
                                },
                            ]}
                            dataSource={articulos.map(articulo => ({
                                ...articulo,
                                key: articulo._id, // Utiliza el _id como la key de cada artículo
                            }))}
                        />

                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default MainInventario;
