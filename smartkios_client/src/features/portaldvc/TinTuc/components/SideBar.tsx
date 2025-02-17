import React from 'react';
import { Button, Space, Layout, Menu, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './SideBar.scss'
import dotRed from '../../../../assets/images/dot-red.svg'

function Sidebar() {
    return ( 
        <div className='SidebarTinTuc_Container'>
            <div className='sidebarOption'>
                <div className='title-chart-year text-uppercase sidebarOption_title'>
                    Danh mục tin tức
                </div>
                <ul className='listOptions'>
                    <li className='listOptions_item'><a><span className='dotItem'></span>Giới thiệu</a></li>
                    <li className='listOptions_item'><a><span className='dotItem'></span>Tin hoạt động</a></li>
                    <li className='listOptions_item'><a><span className='dotItem'></span>Tin cải cách hành chính</a></li>
                    <li className='listOptions_item'><a><span className='dotItem'></span>Tin tuyên truyền, phổ biến, hướng dẫn</a></li>
                </ul>
            </div>
            <div className='expandImageLink'>
                {/* <a className='imageBlock  block' href='https://hcc.thanhhoa.gov.vn' title='Trung tâm Phục vụ hành chính công tỉnh Thanh Hoá' target='_blank'>
                    <img src='https://dichvucong.thanhhoa.gov.vn/portaldvc/LinkImage/o7FWcbSClUStWBIy8ae83a4b63b8a52dHCC.jpg' alt='Trung tâm Phục vụ hành chính công tỉnh Thanh Hoá'/>
                </a> */}
                <a className='imageBlock  block' href='https://dichvucong.gov.vn/p/home/dvc-trang-chu.html' title='Cổng Dịch vụ công Quốc gia' target='_blank'>
                    <img src='https://dichvucong.thanhhoa.gov.vn/portaldvc/LinkImage/sOa-KRJSZEG0vaNT111.jpg' alt='Cổng Dịch vụ công Quốc gia'/>
                </a>
                {/* <a className='imageBlock  block' href='http://tokhaiyte.vn/' title='Khai báo Y Tế' target='_blank'>
                    <img src='https://dichvucong.thanhhoa.gov.vn/portaldvc/LinkImage/fQjEXJXxukqHuqukyte11.png' alt='Khai báo Y Tế'/>
                </a> */}
                {/* <a className='imageBlock  block' href='http://tsdc.thanhhoa.edu.vn/' title='Đăng ký tuyển sinh đầu cấp' target='_blank'>
                    <img src='https://dichvucong.thanhhoa.gov.vn/portaldvc/LinkImage/ZTairInbZEeCZwEH123.jpg' alt='Đăng ký tuyển sinh đầu cấp'/>
                </a> */}

            </div>
        </div>
     );
}

export default Sidebar;