import React from 'react';
import { Button, Space, Layout, Menu, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './listPaknDvcTinh.scss'
import PhanAnhKienNghiContainer from './components/PhanAnhKienNghiContainer';

function PhanAnhKienNghiPage() {
    return (
        <div className='PhanAnhKienNghiPageSwapper commonBackgroundTrongDong'>
            <div className='PhanAnhKienNghiBlock'>
                <PhanAnhKienNghiContainer />
            </div>
        </div>
    );
}

export default PhanAnhKienNghiPage;