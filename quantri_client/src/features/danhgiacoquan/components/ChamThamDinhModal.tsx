import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useDanhGiaCoQuanContext } from "../contexts/DanhGiaCoQuanContext"
import { GetDanhGiaCoQuan, UpdateDanhGiaCoQuan } from "../redux/action"
import { resetData } from "@/features/danhgiacoquan/redux/slice"
import { IDanhGiaCoQuan } from "../models"
import { Col, Divider, Form, Input, InputNumber, Radio, Row, SelectProps, Space } from "antd"
import { useCallback, useEffect } from "react"
import { AntdModal, AntdSelect } from "@/lib/antd/components"
import tieuChiDanhGiaHaiLong from '../../hoso/components/actions/traKetQuaVaDanhGiaHaiLong/TieuChiDanhGiaHaiLong.json'
import { filterOptions } from "@/utils"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

export const ChamThamDinhModal = () => {
    const dispatch = useAppDispatch()
    const { data: DanhGiaCoQuans } = useAppSelector(state => state.danhgiacoquan)
    const { datas: donvis } = useAppSelector((state) => state.cocautochuc);

    const numberToString = useCallback((value: IDanhGiaCoQuan) => {
        return value.toString();
    }, []);

    const DanhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [form] = Form.useForm<IDanhGiaCoQuan>()
    const onFinish = async () => {
        const formData = await form.validateFields()
        const thamDinhTraLoi1 = form.getFieldValue("thamDinhTraLoi1")
        const thamDinhTraLoi2 = form.getFieldValue("thamDinhTraLoi2")
        const thamDinhTraLoi3 = form.getFieldValue("thamDinhTraLoi3")
        const thamDinhTraLoi4 = form.getFieldValue("thamDinhTraLoi4")
        const thamDinhTraLoi5 = form.getFieldValue("thamDinhTraLoi5")
        const thamDinhTraLoi6 = form.getFieldValue("thamDinhTraLoi6")
        const thamDinhTraLoi7 = form.getFieldValue("thamDinhTraLoi7")
        const thamDinhTraLoi8 = form.getFieldValue("thamDinhTraLoi8")
        const thamDinhTraLoi9 = form.getFieldValue("thamDinhTraLoi9")
        const thamDinhTraLoi10 = form.getFieldValue("thamDinhTraLoi10")
        const thamDinhTraLoi11 = form.getFieldValue("thamDinhTraLoi11")

        dispatch(UpdateDanhGiaCoQuan(
            {
                id: DanhGiaCoQuanContext.DanhGiaCoQuanId,
                data:
                {
                    ...formData,
                    thamDinhTraLoi1: numberToString(thamDinhTraLoi1),
                    thamDinhTraLoi2: numberToString(thamDinhTraLoi2),
                    thamDinhTraLoi3: numberToString(thamDinhTraLoi3),
                    thamDinhTraLoi4: numberToString(thamDinhTraLoi4),
                    thamDinhTraLoi5: numberToString(thamDinhTraLoi5),
                    thamDinhTraLoi6: numberToString(thamDinhTraLoi6),
                    thamDinhTraLoi7: numberToString(thamDinhTraLoi7),
                    thamDinhTraLoi8: numberToString(thamDinhTraLoi8),
                    thamDinhTraLoi9: numberToString(thamDinhTraLoi9),
                    thamDinhTraLoi10: numberToString(thamDinhTraLoi10),
                    thamDinhTraLoi11: numberToString(thamDinhTraLoi11),
                }
            }))

        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        DanhGiaCoQuanContext.setDanhGiaCoQuanId(undefined)
        DanhGiaCoQuanContext.setChamThamDinhModalVisible(false)
    };
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ getAllChildren: true, pageSize: 1500 }))
    }, [])
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
        <AntdModal width={1280} visible={DanhGiaCoQuanContext.ChamThamDinhModalVisible} title="Chấm thẩm định" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='DanhGiaCoQuan' layout="vertical" form={form}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
                    <Row style={{ alignItems: 'inherit', }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Đơn vị </span>
                        <Form.Item
                            name="donVi"
                        >
                            <AntdSelect
                                generateOptions={{ model: donvis, label: "groupName", value: "groupCode" }}
                                showSearch
                                allowClear
                                filterOption={filterOptions}
                                disabled
                            />
                        </Form.Item>
                    </Row>
                    <Row style={{ alignItems: 'inherit', }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Quý </span>
                        <Form.Item
                            name="quy"
                        >
                            <Input disabled></Input>

                        </Form.Item>
                    </Row>

                    <Row style={{ alignItems: 'inherit', }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Năm </span>
                        <Form.Item
                            name="nam"
                        >
                            <Input disabled></Input>

                        </Form.Item>
                    </Row>
                </div>
                <div>
                    {tieuChiDanhGiaHaiLong.tieuChiDanhGiaHaiLong.map((item, index) => (
                        <div key={index}>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso1.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 1</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi1"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>

                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso2.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 2</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi2"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>

                            </div>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso3.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 3</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi3"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>

                            </div>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso4.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 4</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi4"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>

                            </div>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso5.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 5</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi5"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso6.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 6</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi6"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso7.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 7</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi7"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>

                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso8.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 8</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi8"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso9.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 9</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi9"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso10.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 10</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi10"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso11.tieuDe}</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: '700', marginRight: '20px', marginTop: '4px' }}>Chỉ số 11</span>
                                    <div>
                                        <Form.Item
                                            name="thamDinhTraLoi11"
                                        >
                                            <InputNumber step={0.1} precision={1} min={0} max={2} style={{ width: '200px' }}></InputNumber>


                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '35px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>Lý do trừ điểm</span>
                                <Divider style={{ margin: '10px 0' }} ></Divider>
                                <div style={{ display: 'flex', marginLeft: '100px', position: 'relative', top: '20px' }}>
                                    <div>
                                        <Form.Item
                                            name="lyDoTruDiem"
                                        >
                                            <Input.TextArea style={{ width: "500px", height: '200px' }}></Input.TextArea>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </Form>
        </AntdModal >

    )
}