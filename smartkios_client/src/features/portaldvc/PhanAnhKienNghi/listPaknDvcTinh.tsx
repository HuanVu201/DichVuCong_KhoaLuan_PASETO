import React from 'react';
import { Button, Space, Layout, Menu, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './listPaknDvcTinh.scss'
import PhanAnhKienNghiContainer from './components/PhanAnhKienNghiContainer';

function PhanAnhKienNghiPage() {
    return (
        <div className='PhanAnhKienNghiPageSwapper' style={{margin : '50px 0'}}>
            <div className='PhanAnhKienNghiBlock'>
                <PhanAnhKienNghiContainer />
            </div>
        </div>
    );
}

export default PhanAnhKienNghiPage;