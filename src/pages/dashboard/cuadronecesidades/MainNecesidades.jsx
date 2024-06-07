import React, { useState, useEffect } from 'react';
import { Layout, Table, Col, Row } from 'antd';
import axios from 'axios';
import { SERVER_HOST } from '../../../../serverHost';

function MainNecesidades() {
    const { Content, Header } = Layout;
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        obtenerPedidos();
    }, []);

    const obtenerPedidos = async () => {
        try {
            const response = await axios.get(`${SERVER_HOST}/api/pedidos/pedidos`);
            if (response.data) {
                setPedidos(response.data);
            }
        } catch (error) {
            console.error('Error al obtener los pedidos:', error.message);
        }
    };

    return (
        <Layout className="flex-1 flex h-full bg-white">
            <div
                className="p-2.5  w-full bg-white"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Header className=" w-full bg-cbtisbrow shadow-md rounded-2xl backdrop:blur-xl backdrop-filter bg-opacity-95">
                    <div>
                        <span className="text-white text-2xl font-bold">Proyección semestral de necesidades</span>
                    </div>
                </Header>
            </div>

            <Content className="bg-white h-full w-full flex flex-col items-center  px-8 py-4 space-y-8 overflow-auto">
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
                        <label className="text-lg mb-6 font-bold">Pedidos y Artículos</label>
                        <Table
                            columns={[
                                {
                                    title: 'Nombre',
                                    dataIndex: 'nombre',
                                    key: 'nombre',
                                },
                                {
                                    title: 'Correo',
                                    dataIndex: 'correo',
                                    key: 'correo',
                                },
                                {
                                    title: 'Artículos',
                                    dataIndex: 'articulos',
                                    key: 'articulos',
                                    render: articulos => (
                                        <ul>
                                            {articulos.map(articulo => (
                                                <li key={articulo._id}>
                                                    {articulo.nombre_articulo} - {articulo.descripcion_articulo}
                                                </li>
                                            ))}
                                        </ul>
                                    ),
                                },
                            ]}
                            dataSource={pedidos}
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default MainNecesidades;
