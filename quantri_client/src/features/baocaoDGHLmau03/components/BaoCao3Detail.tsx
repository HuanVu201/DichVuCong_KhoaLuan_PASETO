import { Col, Divider, Form, Input, InputNumber, Radio, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { resetData } from "@/features/danhgiacoquan/redux/slice"
import tieuChiDanhGiaHaiLong from '../../hoso/components/actions/traKetQuaVaDanhGiaHaiLong/TieuChiDanhGiaHaiLong.json'
import { useDanhGiaCoQuanContext } from "@/features/danhgiacoquan/contexts/DanhGiaCoQuanContext"
import { GetDanhGiaCoQuan, SearchDanhGiaCoQuan, UpdateDanhGiaCoQuan } from "@/features/danhgiacoquan/redux/action"
import { IDanhGiaCoQuan } from "@/features/danhgiacoquan/models"



export const BaoCao3Detail = () => {
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const dispatch = useAppDispatch()
    const { data: user, } = useAppSelector(state => state.user)
    const { data: DanhGiaCoQuans } = useAppSelector(state => state.danhgiacoquan)
    const DanhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [form] = Form.useForm<IDanhGiaCoQuan>()
    const onFinish = async () => {
        const formData = await form.validateFields()
        const responseUpdate = await dispatch(UpdateDanhGiaCoQuan({ id: DanhGiaCoQuanContext.DanhGiaCoQuanId, data: formData })).unwrap()
        if (responseUpdate.succeeded)
            dispatch(SearchDanhGiaCoQuan({ pageNumber: 1, pageSize: 50, reFetch: true, donVi: user?.officeCode, quy: currentQuarter, nam: currentYear }))
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        DanhGiaCoQuanContext.setDanhGiaCoQuanId(undefined)
        DanhGiaCoQuanContext.setDanhGiaCoQuanModalVisible(false)
    };
    useEffect(() => {
        if (DanhGiaCoQuanContext.DanhGiaCoQuanId) {
            dispatch(GetDanhGiaCoQuan(DanhGiaCoQuanContext.DanhGiaCoQuanId))
        }

    }, [DanhGiaCoQuanContext.DanhGiaCoQuanId])

    useEffect(() => {
        if (DanhGiaCoQuans) {
            form.setFieldsValue(DanhGiaCoQuans)
        }
    }, [DanhGiaCoQuans])

    return (
        <AntdModal width={1280} visible={DanhGiaCoQuanContext.DanhGiaCoQuanModalVisible} title="Đánh giá đơn vị chỉ số 5,8,9" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='DanhGiaCoQuan' layout="vertical" form={form}>
                <div>
                    {tieuChiDanhGiaHaiLong.tieuChiDanhGiaHaiLong.map((item, index) => (
                        <div key={index}>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso5.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <Form.Item
                                    name="traLoi5"
                                >
                                    <Radio.Group name="traLoi5" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                        <p>{item.chiso5.tieuDe}</p>
                                        <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso5.cauTraLoi.a}</span></Radio>
                                        <Radio value="1" style={{ margin: '10px 0' }}><span style={{ fontSize: '15px', }}>{item.chiso5.cauTraLoi.b}</span></Radio>
                                        <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso5.cauTraLoi.c}</span></Radio>
                                    </Radio.Group>
                                </Form.Item>

                            </div>

                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso8.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <Form.Item
                                    name="traLoi8"
                                >
                                    <Radio.Group name="traLoi8" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                        <p>{item.chiso8.tieuDe}</p>
                                        <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso8.cauTraLoi.a}</span></Radio>
                                        <Radio value="1" style={{ margin: '10px 0' }}><span style={{ fontSize: '15px' }}>{item.chiso8.cauTraLoi.b}</span></Radio>
                                        <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso8.cauTraLoi.c}</span></Radio>
                                    </Radio.Group>
                                </Form.Item>

                            </div>
                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso9.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <Form.Item
                                    name="traLoi9"
                                >
                                    <Radio.Group name="traLoi9" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                        <p>{item.chiso9.tieuDe}</p>
                                        <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso9.cauTraLoi.a}</span></Radio>
                                        <Radio value="1" style={{ margin: '10px 0' }}><span style={{ fontSize: '15px' }}>{item.chiso9.cauTraLoi.b}</span></Radio>
                                        <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso9.cauTraLoi.c}</span></Radio>
                                    </Radio.Group>
                                </Form.Item>

                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </AntdModal>

    )
}