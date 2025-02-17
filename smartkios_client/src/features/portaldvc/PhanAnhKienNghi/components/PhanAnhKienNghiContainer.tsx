import React, { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Button, Col, Form, Input, Pagination, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { AntdButton, AntdSelect } from '@/lib/antd/components';
import { useDispatch } from 'react-redux';
import { SearchPhanAnhKienNghi } from '../redux/action';
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from '@/data';
import { PhanAnhKienNghiDetail } from './PhanAnhKienNghiDetail';

const PossitionPage = ({ count }: { count: any }) => {
    const [current, setCurrent] = useState(1);
    const dispatch = useDispatch()
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        dispatch(SearchPhanAnhKienNghi({ pageSize: 5, pageNumber: page }) as any)
    };

    return <Pagination defaultPageSize={5} current={current} onChange={onChange} total={count} style={{ float: 'right' }} />;
};

function PhanAnhKienNghiConatainer() {
    const dispatch = useAppDispatch()
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [paknDetail, setPaknDetail] = useState<any>(false)

    const viewDetail = (item: any) => {
        setShowDetailModal(true)
        setPaknDetail(item)
    }
    const setStateModal = (newState: boolean) => {
        setShowDetailModal(newState);
    };

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        dispatch(SearchPhanAnhKienNghi({ noiDung: values.tuKhoa, tieuDe: values.tuKhoa, reFetch: true, pageSize: 5, congKhai : '1', trangThai : '1'}))
    }

    const { count, datas: phanAnhKienNghis } = useAppSelector(state => state.phanAnhKienNghi)
    useEffect(() => {
        dispatch(SearchPhanAnhKienNghi({ pageSize: 5, pageNumber: 1, congKhai: '1', trangThai: '1' }))
    }, [])

    return (
        <>
            <div className='PhanAnhKienNghiContainer'>
                <Form className='PhanAnhKienNghiSearch' name='PhanAnhKienNghiSearch' layout="horizontal" form={form} onFinish={onFinish}>
                    <Row gutter={[8, 8]}>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Từ khóa:"
                                name="tuKhoa"
                            >
                                <Input placeholder='Nhập từ khóa cần tìm kiếm' />
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button className="buttonSearchPortal" htmlType="submit">
                                Tìm kiếm
                            </Button>
                        </Col>
                    </Row>

                </Form>

                <div className="PhanAnhKienNghiList">
                    {phanAnhKienNghis?.map((item, index) => (
                        <div className="paknItem row" key={index}>
                            <div className="logoItem col-1">
                                <img src="/src/assets/images/user-avatar.png" alt="" />
                            </div>
                            <div className="rightItem col-11">
                                <p className='titleItem' onClick={() => viewDetail(item)}>
                                    {item.tieuDe}
                                </p>
                                <i className='fromItem'>
                                    Người gửi: {item.hoTen} - {item.ngayGui ? dayjs(item.ngayGui).format(FORMAT_DATE_WITHOUT_TIME) : ''}
                                </i>
                                <p className='shortContent'>
                                    {item.noiDung}
                                </p>
                                <Button className="buttonSearchPortal_Detail" htmlType="submit" onClick={() => viewDetail(item)}>
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    ))}
                    {phanAnhKienNghis ? <PossitionPage count={count} /> : <></>}

                </div>
                <PhanAnhKienNghiDetail showDetailModal={showDetailModal} setStateModal={setStateModal} paknDetail={paknDetail} />
            </div>
        </>
    );
}

export default PhanAnhKienNghiConatainer;