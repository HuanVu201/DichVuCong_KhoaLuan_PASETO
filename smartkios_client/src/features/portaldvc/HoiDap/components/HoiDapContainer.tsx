import React, { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Col, Form, Input, Pagination, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './HoiDapContainer.scss'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { SearchHoiDap } from '../redux/action';
import { IHoiDap, ISearchHoiDap } from '../models';
import { AntdButton, AntdSelect, AntdTab } from '@/lib/antd/components';
import { HoiDapList } from './HoiDapList';
import { useDispatch } from 'react-redux';


function HoiDapContainer() {
    const dispatch = useAppDispatch()
    const [type, setType] = useState('')

    const [form] = Form.useForm()
    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
   
    const handleChangeTab = (key: string) => {
        setType(key)
    }
    const onFinish = (values: ISearchHoiDap) => {
        dispatch(SearchHoiDap({ ...values, reFetch: true, pageSize: 5,congKhai : 'co', trangThai : type}))
    }
    return (
        <div className='hoiDap_block'>

            {/* Search */}

            <Form name='ThuTucSearch' layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="maDonVi"
                        >
                            <AntdSelect generateOptions={{ model: coCauToChucs, label: 'groupName', value: 'id' }} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Nội Dung"
                            name="noiDung"
                        >
                            <Input placeholder='Nhập nội dung cần tìm kiếm' />
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <AntdButton style={{ backgroundColor: '#ce7a58', display: 'flex', justifyContent: 'center' }} htmlType="submit" >
                            Tìm kiếm
                        </AntdButton>
                    </Col>
                </Row>

            </Form>

            {/* Navbar */}
            <div className='TD-danhSachHoiDap'>
                <div className='nav nav-tabs'>
                    <AntdTab type="card" onChange={handleChangeTab} defaultActiveKey="da-giai-dap">
                        <AntdTab.TabPane tab='Danh sách hỏi đáp' key='da-giai-dap'>
                            <HoiDapList type={type} ></HoiDapList>
                        </AntdTab.TabPane>
                        <AntdTab.TabPane tab='Câu hỏi chưa được giải đáp' key='chua-giai-dap'>
                            <HoiDapList type={type}></HoiDapList>
                        </AntdTab.TabPane>

                    </AntdTab>
                </div>
            </div>
        </div>
    );
}

export default HoiDapContainer;