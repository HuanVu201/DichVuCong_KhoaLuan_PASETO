import { AntdButton, AntdDivider, AntdModal, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { Col, DatePicker, Divider, Form, Input, Radio, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo, TraKetQuaHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { resetData } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice"
import { resetDatas } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice"
import { resetDatas as resetDatasHoSo } from "@/features/hoso/redux/slice"
import { resetData as resetDataHoSo } from "@/features/hoso/redux/slice"
import { RegularUpload, RegularUploadRef, TrichXuatOCRMode } from "@/lib/antd/components/upload/RegularUpload"
import tieuChiDanhGiaHaiLong from './TieuChiDanhGiaHaiLong.json'
import { IPhieuKhaoSat } from "./models"
import { AddPhieuKhaoSat, GetByMHS, UpdatePhieuKhaoSat } from "./redux/action"
import dayjs from "dayjs"
import { hoSoApi } from "@/features/hoso/services"
import { AddLogThongKeDGHLCongDan } from "@/features/logthongkedghlcongdan/redux/action"
import { LogThongKeDGHLCongDanApi } from "@/features/logthongkedghlcongdan/services"


const DanhGiaHaiLongPortalModal = ({ maHoSoNguoiDungNhap, donViId, id, closeModal, setDanhGiaHaiLongModalVisible }: { maHoSoNguoiDungNhap: string, donViId: string, id: string, closeModal: () => void, setDanhGiaHaiLongModalVisible: React.Dispatch<SetStateAction<boolean>> }) => {
    const [form] = Form.useForm()
    const { data: user } = useAppSelector(state => state.user)
    const { data: phieuKhaoSat } = useAppSelector(state => state.phieukhaosat)

    const ngayHenTraStr = form.getFieldValue("ngayHenTra")
    const ngayTraStr = form.getFieldValue("ngayTra")
    const ngayTra = new Date(ngayTraStr);
    const ngayHenTra = new Date(ngayHenTraStr);
    const dispatch = useAppDispatch()
    const [hoSo, setHoSo] = useState<IHoSo>()

    useEffect(() => {
        (async () => {
            if (maHoSoNguoiDungNhap) {
                const res = await hoSoApi.GetPrintData(id)
                const hoSo = res.data.data
                setHoSo(hoSo)
            }
        })()
    }, [])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue(hoSo)
            dispatch(GetByMHS(hoSo.maHoSo))

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
        closeModal()
        setDanhGiaHaiLongModalVisible(false)
    }

    const onOk = async () => {

        try {
            const formData = await form.getFieldsValue();
            const res = await LogThongKeDGHLCongDanApi.Create({
                ...formData,
                maHoSo: hoSo?.maHoSo as any || maHoSoNguoiDungNhap,
                donVi: hoSo?.donViId as any || donViId,
                nguoiDanhGia: user?.officeName,
                ngayTao: form.getFieldValue("ngayTao") || dayjs(),
                traLoi1: form.getFieldValue("traLoi1") || '2',
                traLoi2: form.getFieldValue("traLoi2") || '2',
                traLoi3: form.getFieldValue("traLoi3") || '2',
                traLoi4: form.getFieldValue("traLoi4") || '2',
                traLoi6: form.getFieldValue("traLoi6") || '2',
                traLoi7: form.getFieldValue("traLoi7") || '2',
                traLoi10: form.getFieldValue("traLoi10") || '2',
                traLoi11: form.getFieldValue("traLoi11") || '2',
                hoanThanhDanhGia: true
            });

            if (res.status === 201) {
                toast.success('Đánh giá thành công !');
                handleCancel()
            } else if (res.status === 500) {
                toast.error('Mã hồ sơ đã được đánh giá, không thể đánh giá lại!');
            } else {
                toast.error('Lỗi không xác định!');
            }
        } catch (error) {
            toast.error('Mã hồ sơ đã được đánh giá, không thể đánh giá lại!');
        }





    }

    return <AntdModal title={"Đánh giá hài lòng"} visible={true} handlerCancel={handleCancel} width={1280}
        footer={
            <AntdSpace>
                <AntdButton onClick={handleCancel} key={"1"}>Đóng</AntdButton>
                <AntdButton onClick={onOk} key={"3"} type="primary">Đánh giá</AntdButton>
            </AntdSpace>}>

        <Form form={form} layout="horizontal" name="TraKetQuaHoSoVaDanhGiaHaiLongModal" className="commonBackgroundTrongDong">
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
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
            <div >
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

export default DanhGiaHaiLongPortalModal