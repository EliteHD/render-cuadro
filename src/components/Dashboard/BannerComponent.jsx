// BannerComponent.js
import React, { useEffect, useState } from 'react';
import bannerCbtis from "@assets/images/logos/bannercbtis.png";
import { Col } from 'antd';

// Supongamos que el mock data está en este archivo
const mockData = {
    bannerSrc: 'https://photos.fife.usercontent.google.com/pw/AP1GczNYnCS7o3tKcNhDcerJq2CjzknJrAPZVaSfpyO5j8R12ZNo5GUxfD7i2g=w682-h906-s-no-gm?authuser=0',
    text: `Subsecretaría de Educación Media Superior
        Dirección General de Educación Tecnológica Industrial y Servicios
        Oficina Estatal de la DGETI en Oaxaca
        Centro de Bachillerato Tecnológico industrial y de servicios No. 123
        “José María Morelos y Pavón”`
};

const BannerComponent = () => {
    const [data, setData] = useState({ bannerSrc: '', text: '' });

    useEffect(() => {
        setData(mockData);
    }, []);

    return (
        <Col className='flex flex-row p-5  bg-white items-center justify-between'>
            <img src={bannerCbtis} alt="banner" className="w-2/5" />
            <span className="text-xs text-cbtisCOLOR font-medium w-2/5">
                {data.text}
            </span>
        </Col>
    );
};

export default BannerComponent;
