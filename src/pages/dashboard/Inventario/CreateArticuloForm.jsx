import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import axios from 'axios';
import { SERVER_HOST } from '../../../../serverHost';
import { useParams, useNavigate } from 'react-router-dom';

function CreateArticuloForm() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    // Obtener datos del artículo si estamos en modo edición
    useEffect(() => {
        if (id) {
            fetchArticulo(id);
        }
    }, [id]);

    // Función para obtener el artículo y prellenar el formulario
    const fetchArticulo = async (id) => {
        console.log('##################### ID', id);
        try {
            const response = await axios.get(`${SERVER_HOST}/api/articulos/articulos/${id}`);
            form.setFieldsValue(response.data); // Prellenar el formulario con los datos del artículo
        } catch (error) {
            console.error('Error al obtener el artículo:', error.message);
        }
    };

    // Función para manejar el submit del formulario
    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (id) {
                // Actualizar artículo existente
                await axios.put(`${SERVER_HOST}/api/articulos/articulos/${id}`, values);
                message.success('Artículo actualizado exitosamente');
            } else {
                // Crear nuevo artículo
                await axios.post(`${SERVER_HOST}/api/articulos/articulos`, values);
                message.success('Artículo creado exitosamente');
            }
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error al guardar el artículo:', error.message);
            message.error('Error al guardar el artículo');
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const { Content, Header } = Layout;

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
                        <span className="text-white text-2xl font-bold">{id ? 'Editar artículo' : 'Agregar un artículo al inventario'}</span>
                    </div>
                </Header>
            </div>

            <div className='p-8'>
                <Form
                    form={form}
                    name="createArticuloForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        label="Nombre del artículo"
                        name="nombre_articulo"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del artículo' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descripción del artículo"
                        name="descripcion_articulo"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción del artículo' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Precio Unitario"
                        name="precioUnitario"
                        rules={[{ required: true, message: 'Por favor ingresa el precio unitario del artículo' }]}
                    >
                        <Input type="number" step="0.01" />
                    </Form.Item>

                    <Form.Item
                        label="Unidad de medida"
                        name="unidadMedida"
                        rules={[{ required: true, message: 'Por favor ingresa la unidad de medida del artículo' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {id ? 'Actualizar Artículo' : 'Crear Artículo'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
}

export default CreateArticuloForm;
