import React from 'react';
import { Button, Space, Layout, Menu, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss'
import SidebarHoiDap from './components/SidebarHoiDap';
import HoiDapContainer from './components/HoiDapContainer';

function HoiDapPage() {
    return (
        <div className='HoiDapPage_swapper row commonBackgroundTrongDong'>
            <div className='col-sm-4 col-md-3 sidebar'>
                <SidebarHoiDap />
            </div>
            <div className='col-sm-8 col-md-9 hoiDapContainer'>
                <HoiDapContainer />
            </div>
        </div>
    );
}

export default HoiDapPage;