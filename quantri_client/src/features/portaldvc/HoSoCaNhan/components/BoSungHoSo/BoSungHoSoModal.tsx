import { RenderTitle } from "@/components/common"
import { DinhKemBoSungHoSo } from "@/features/hoso/components/DinhKemBoSungHoSo"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { CongDanCapNhatBoSung, CongDanGuiBoSung, MotCuaGuiBoSung } from "@/features/hoso/redux/action"
import { DinhKemHoSoBoSung, hoSoApi } from "@/features/hoso/services"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import { AntdButton, AntdModal } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, DatePicker, Divider, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import { FORMAT_DATE } from "@/data"
import { toast } from "react-toastify"

export const BoSungHoSoModal = ({ maHoSo, hoSoId, closeModal, setSearchHoSoParams }: { hoSoId: string; maHoSo: string; closeModal: () => void; setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [hoSo, setHoSo] = useState<(IHoSo & {hanBoSung?: string})>()
    const [loading, setLoading] = useState<boolean>(false)
    const [form] = Form.useForm<DinhKemHoSoBoSung>()
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKemBoSung", form)

    useEffect(() => {
        (async () => {
            if(maHoSo ){
                const res = await hoSoApi.GetHoSoYeuCauBoSung(hoSoId)
                const data = res.data.data
                if(data){
                    setHoSo(data)
                    form.setFieldsValue({...data , hanBoSung: data.hanBoSung ? dayjs(data.hanBoSung) : undefined} as any)
                }
            }
        })()
    }, [maHoSo])
    const onSave = async () => {
        const formData = await form.validateFields()
        setLoading(true)
        const thanhPhanBoSung = formData.danhSachGiayToBoSung.filter(x => !x.laThanhPhanMoi);
        const thanhPhanHoSo = formData.danhSachGiayToBoSung.filter(x => x.laThanhPhanMoi)
        const res = await dispatch(CongDanCapNhatBoSung({ id: hoSoId, data: {...formData, danhSachGiayToBoSung: thanhPhanBoSung, danhSachGiayToBoSungMoi: thanhPhanHoSo} })).unwrap()
        if (res.succeeded) {
            setSearchHoSoParams((curr) => ({ ...curr }))
            toast.success("Lưu thành công")
            handleCancel()
        }
        setLoading(false)
    }
    const onSaveAndForward = async () => {
        const formData = await form.validateFields()
        try {
            setLoading(true)
            const thanhPhanBoSung = formData.danhSachGiayToBoSung.filter(x => !x.laThanhPhanMoi);
            const thanhPhanHoSo = formData.danhSachGiayToBoSung.filter(x => x.laThanhPhanMoi)
            const res = await dispatch(CongDanGuiBoSung({ id: hoSoId, data: {...formData, danhSachGiayToBoSung: thanhPhanBoSung, danhSachGiayToBoSungMoi: thanhPhanHoSo} })).unwrap()
            if (res.succeeded) {
                setSearchHoSoParams((curr) => ({ ...curr }))
                toast.success("Gửi bổ sung thành công")
                handleCancel()
            }
        } catch (error) {
            setLoading(false)
        }
    }
    const handleCancel = () => {
        dispatch(resetDatas())
        closeModal()
    }
    return (
        <AntdModal title="THÔNG TIN BỔ SUNG HỒ SƠ" handlerCancel={handleCancel} visible={true} width={1000} footer={<>
            <AntdButton key="1" onClick={handleCancel}>Đóng</AntdButton>
            <AntdButton key="2" loading={loading} onClick={onSave}>Lưu lại</AntdButton>
            <AntdButton key="3" loading={loading} onClick={onSaveAndForward}>Gửi bổ sung</AntdButton>
        </>}>
            <Form form={form} layout="vertical" name="CapNhatBoSoHoSoModal" >
                <Form.Item name="danhSachGiayToBoSung" hidden><Input></Input></Form.Item>
                <Form.Item name="danhSachGiayToBoSungMoi" hidden><Input></Input></Form.Item>
                <Row gutter={[16, 8]}>
                    <Col span={24}>
                        <Form.Item name="thongTinTiepNhanBoSung" label="Thông tin bổ sung" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                            <Input.TextArea rows={4} maxLength={500} showCount />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Divider orientation="left">Thông tin yêu cầu bổ sung</Divider>
                    <Col span={12}>
                        <Form.Item name="lyDoBoSung" label="Lý do bổ sung">
                            <Input.TextArea rows={4} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="dinhKemBoSung" label="Đính kèm bổ sung" >
                            {/* <AntdUpLoad maxCount={10} formInstance={form} fieldName="dinhKemBoSung" folderName="YeuCauBoSung" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
                            {maHoSo ? <RegularUpload
                                hideUpload
                                dinhKem={dinhKem}
                                fieldName={"dinhKemBoSung"}
                                folderName={maHoSo}
                                form={form} />: null}
                            
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="hanBoSung" label="Hạn bổ sung hồ sơ" >
                            <DatePicker disabled format={FORMAT_DATE}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <RenderTitle title={"Tệp đính kèm"} />
                        <DinhKemBoSungHoSo form={form} thanhPhanHoSos={hoSo?.thanhPhanHoSos} maHoSo={maHoSo}/>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}