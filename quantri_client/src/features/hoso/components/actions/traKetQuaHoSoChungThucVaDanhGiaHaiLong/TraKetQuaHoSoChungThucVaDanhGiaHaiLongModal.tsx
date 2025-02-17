import { AntdButton, AntdDivider, AntdModal, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { Col, DatePicker, Divider, Form, Input, Radio, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo, SearchHoSo, TraKetQuaChungThuc, TraKetQuaHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { useCallback, useEffect, useRef, useState } from "react"
import { resetData } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice"
import { resetDatas } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice"
import { resetDatas as resetDatasHoSo } from "@/features/hoso/redux/slice"
import { resetData as resetDataHoSo } from "@/features/hoso/redux/slice"
import { RegularUpload, RegularUploadRef, TrichXuatOCRMode } from "@/lib/antd/components/upload/RegularUpload"
import dayjs from "dayjs"
import { hoSoApi } from "@/features/hoso/services"
import { IPhieuKhaoSat } from "../traKetQuaVaDanhGiaHaiLong/models"
import { AddPhieuKhaoSat } from "../traKetQuaVaDanhGiaHaiLong/redux/action"
import tieuChiDanhGiaHaiLong from '../traKetQuaVaDanhGiaHaiLong/TieuChiDanhGiaHaiLong.json'


const TraKetQuaHoSoChungThucVaDanhGiaHaiLongModal = ({ maHoSoNguoiDungNhap, donViId }: { maHoSoNguoiDungNhap: string, donViId: string }) => {
    const [form] = Form.useForm<IPhieuKhaoSat>()
    const buttonActionContext = useButtonActionContext()
    const { data: user } = useAppSelector(state => state.user)
    const dinhKem = Form.useWatch("dinhKemKetQua", form)
    const ngayHenTraStr = form.getFieldValue("ngayHenTra")
    const ngayTraStr = form.getFieldValue("ngayTra")
    const ngayTra = new Date(ngayTraStr);
    const ngayHenTra = new Date(ngayHenTraStr);
    const [btnLoading, setBtnLoading] = useState(false)
    const dispatch = useAppDispatch()
    const [hoSo, setHoSo] = useState<IHoSo>()
    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.GetPrintData(buttonActionContext.selectedHoSos[0] as string)
                const hoSo = res.data.data
                setHoSo(hoSo)
            }
        })()
    }, [buttonActionContext])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue(hoSo)
        }
    }, [hoSo])


    const getDefaultRadioValue = useCallback(
        (ngayTra: any, ngayHenTra: any) => {
            if (ngayTra > ngayHenTra) {
                return '0';
            } else if (ngayTra.getTime() === ngayHenTra.getTime()) {
                return '1';
            } else {
                return '2';
            }
        },
        [ngayTra, ngayHenTra]
    );
    const defaultValue1 = getDefaultRadioValue(ngayTra, ngayHenTra);

    const handleCancel = async () => {
        form.resetFields();

        dispatch(resetData())
        dispatch(resetDatas())
        dispatch(resetDataHoSo())
        // dispatch(resetDatasHoSo())
        buttonActionContext.setTraKetQuaChungThucVaDanhGiaHaiLongModalVisible(false)
        // buttonActionContext.setSelectedHoSos([])

    }



    const onOk = async () => {
        const formData = form.getFieldsValue()
        if (buttonActionContext.selectedHoSos.length) {
            try {
                setBtnLoading(true)
                const resTraKetQuaChungThuc = await dispatch(TraKetQuaChungThuc({ ...formData, id: buttonActionContext.selectedHoSos[0] as string })).unwrap()
                if (resTraKetQuaChungThuc.succeeded) {
                    const resAddPhieuKhaoSat = await dispatch(AddPhieuKhaoSat({
                        ...formData,
                        donVi: hoSo?.donViId as any || donViId,
                        maHoSo: hoSo?.maHoSo as any || maHoSoNguoiDungNhap,
                        phongBan: user?.groupCode as any,
                        nguoiNhapDanhGia: user?.typeUser as any,
                        nguoiNhapDanhGiaText: user?.fullName as any,
                        hoanThanhDanhGia: false,
                        ngayTao: form.getFieldValue("ngayTao") || dayjs(),
                        traLoi1: form.getFieldValue("traLoi1") || '2',
                        traLoi2: form.getFieldValue("traLoi2") || '2',
                        traLoi3: form.getFieldValue("traLoi3") || '2',
                        traLoi4: form.getFieldValue("traLoi4") || '2',
                        // traLoi5: form.getFieldValue("traLoi5") || '2',
                        traLoi6: form.getFieldValue("traLoi6") || '2',
                        traLoi7: form.getFieldValue("traLoi7") || '2',
                        traLoi10: form.getFieldValue("traLoi10") || '2',
                        traLoi11: form.getFieldValue("traLoi11") || '2',
                        // traLoi8: form.getFieldValue("traLoi8") || '2',
                        // traLoi9: form.getFieldValue("traLoi9") || '2',
                    })).unwrap()
                    if (resAddPhieuKhaoSat.succeeded) {
                        handleCancel()
                        dispatch(SearchHoSo({ pageNumber: 1, pageSize: 10, reFetch: true, maTrangThai: '9', donViTraKq: hoSo?.donViId, nhanKetQuaBCCI: false, trangThaiTraKq: '3', laHoSoChungThuc: true }))
                    }
                }
                setBtnLoading(false)
            } catch (error) {
                console.log(error);
                setBtnLoading(false)
            }
        }
    }

    return <AntdModal title={"Đánh giá hài lòng"} visible={buttonActionContext.traKetQuaChungThucVaDanhGiaHaiLongModalVisible} handlerCancel={handleCancel} width={1280}
        footer={<AntdSpace>
            <AntdButton onClick={handleCancel} key={"1"}>Đóng</AntdButton>
            <AntdButton loading={btnLoading} onClick={onOk} key={"3"} type="primary">Đánh giá</AntdButton>
        </AntdSpace>}>

        <Form form={form} layout="horizontal" name="TraKetQuaHoSoVaDanhGiaHaiLongModal">
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Col>
                    <Form.Item
                        label="Mã hồ sơ"
                        name="maHoSo"
                    >
                        <Input defaultValue={maHoSoNguoiDungNhap} disabled />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Ngày tạo"
                        name="ngayTao"
                    >
                        <DatePicker format="DD/MM/YYYY" disabled defaultValue={dayjs() as any} />
                    </Form.Item>
                </Col>
            </div>
            <div>
                {tieuChiDanhGiaHaiLong.tieuChiDanhGiaHaiLong.map((item, index) => (
                    <div key={index}>
                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso1.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                valuePropName="checked"
                                name="traLoi1"
                            >
                                <Radio.Group name="traLoi1" style={{ display: 'flex', flexDirection: 'column' }} defaultValue={defaultValue1} disabled>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso1.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso1.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso1.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>

                        </div>
                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso2.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi2"
                            >
                                <Radio.Group name="traLoi2" style={{ display: 'flex', flexDirection: 'column' }} defaultValue={defaultValue1} disabled>
                                    <p>{item.chiso2.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso2.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso2.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso2.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>

                        </div>
                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso3.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi3"
                            >
                                <Radio.Group name="traLoi3" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                    <p>{item.chiso3.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso3.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso3.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso3.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>

                        </div>

                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso4.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi4"
                            >
                                <Radio.Group name="traLoi4" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                    <p>{item.chiso4.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso4.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso4.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso4.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>

                        </div>

                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso6.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi6"
                            >
                                <Radio.Group name="traLoi6" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                    <p>{item.chiso6.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso6.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso6.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso6.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>

                        </div>
                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso7.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi7"
                            >
                                <Radio.Group name="traLoi7" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                    <p>{item.chiso7.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso7.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso7.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso7.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso10.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi10"
                            >
                                <Radio.Group name="traLoi10" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                    <p>{item.chiso10.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso10.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso10.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso10.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div style={{ marginBottom: '35px', textAlign: 'justify' }}>
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#2C62B9' }}>{item.chiso11.tieuDe}</span>
                            <Divider style={{ margin: '10px 0' }} ></Divider>
                            <Form.Item
                                name="traLoi11"
                            >
                                <Radio.Group name="traLoi11" style={{ display: 'flex', flexDirection: 'column' }} defaultValue="2">
                                    <p>{item.chiso11.tieuDe}</p>
                                    <Radio value="2"><span style={{ fontSize: '15px' }}>{item.chiso11.cauTraLoi.a}</span></Radio>
                                    <Radio value="1"><span style={{ fontSize: '15px', margin: '10px 0' }}>{item.chiso11.cauTraLoi.b}</span></Radio>
                                    <Radio value="0"><span style={{ fontSize: '15px' }}>{item.chiso11.cauTraLoi.c}</span></Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>
                ))}
            </div>
        </Form>

    </AntdModal>
}

export default TraKetQuaHoSoChungThucVaDanhGiaHaiLongModal