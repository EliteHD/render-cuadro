import React from 'react'
import { Layout, Table, Pagination, Dropdown, Col, Row, Form, DatePicker } from "antd";
import bannerCbtis from "@assets/images/logos/bannercbtis.png";
import { Select, Space } from 'antd';
import FormItemLabel from 'antd/es/form/FormItemLabel';



function MainArticulos() {
    const { Content, Header } = Layout;


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
                    className=" w-full bg-cbtisbrow shadow-md rounded-2xl backdrop:blur-xl backdrop-filter bg-opacity-95"
                >
                    <div>
                        <span className="text-white text-2xl font-bold">articulos</span>
                    </div>
                </Header>
            </div>


            <Content className="bg-white h-full w-full flex flex-col items-center  px-8 py-4 space-y-8 overflow-auto">






                <Row className='w-full'>
                    <Col span={24}>
                        <label className="text-lg mb-6 font-bold">Cuadro de Necesidades</label>
                        {/* tabla de inventario de articulos Nombre, descripcion, precio unitario y unidad de medida*/}
                        <Table
                            columns={[
                                {
                                    title: 'Nombre',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: 'Descripcion',
                                    dataIndex: 'description',
                                    key: 'description',
                                },
                                {
                                    title: 'Precio unitario',
                                    dataIndex: 'unitPrice',
                                    key: 'unitPrice',
                                },
                                {
                                    title: 'Unidad de medida',
                                    dataIndex: 'unitMeasure',
                                    key: 'unitMeasure',
                                },
                                {
                                    tilte: 'Acciones',
                                    key: 'acciones',
                                    render: () => (
                                        <Space size="middle">
                                            <a href='#' className='bg-yellow-400 p-2 rounded-xl shadow-xl'>Editar</a>
                                            <a href='#' className='bg-red-400 text-white p-2 rounded-xl shadow-xl'>Eliminar</a>
                                        </Space>
                                    ),
                                }
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: 'Lapiz',
                                    description: 'Lapiz de grafito',
                                    unitPrice: 5,
                                    unitMeasure: 'pieza'
                                },
                                {
                                    key: '2',
                                    name: 'Borrador',
                                    description: 'Borrador de nata',
                                    unitPrice: 10,
                                    unitMeasure: 'pieza'
                                },
                                {
                                    key: '3',
                                    name: 'Cuaderno',
                                    description: 'Cuaderno de 100 hojas',
                                    unitPrice: 20,
                                    unitMeasure: 'pieza'
                                },
                                {
                                    key: '4',
                                    name: 'Plumon',
                                    description: 'Plumon de pizarron',
                                    unitPrice: 30,
                                    unitMeasure: 'pieza'
                                },
                            ]}

                        />





                    </Col>

                </Row>

            </Content >
        </Layout >
    )
}

export default MainArticulos