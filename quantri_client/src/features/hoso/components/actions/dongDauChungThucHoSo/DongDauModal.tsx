import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdDivider, AntdModal } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "@/components/common/RenderTitle"
import { ChuyenBuocXuLyHoSo, GetHoSoParam } from "@/features/hoso/services"
import { ComponentProps, useEffect, useState } from "react"
import { CapSoVaDongDauHoSoChungThuc, GetHoSo } from "@/features/hoso/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { FormInstance } from "antd/lib"
import { get } from "http"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { DanhSachQuyTrinh } from "../chuyenBuocXuLy/DanhSachQuyTrinh"
import { IframeBlobFromPdfViewer } from "@/components/common/IframeBlobFromPdfViewer"
import { IThanhPhanHoSoWithDongDau, ThanhPhanChungThuc } from "./ThanhPhanChungThuc"
import { btnSignClick } from "@/utils/common"
import { resetData } from "@/features/hoso/redux/slice"
import { ISoChungThuc } from "@/features/sochungthuc/models"
import { SoChungThucApi } from "@/features/sochungthuc/services"
import { toast } from "react-toastify"

type DongDauModalProps = {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}

const DongDauModal = ({ setSearchHoSoParams }: DongDauModalProps) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<ChuyenBuocXuLyHoSo>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const {data: user} = useAppSelector(state => state.user)
    const [soChungThucs, setSoChungThucs] = useState<ISoChungThuc[]>()
    
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        form.resetFields()
        // buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
        buttonActionContext.setDongDauModalVisible(false)
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "kySoChungThuc" }))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        (async () => {
            if(user && user.officeCode && soChungThucs == undefined) {
                const res = await SoChungThucApi.Search({donVi: user.officeCode, pageNumber: 1, pageSize:100, trangThai: true, removed: false})
                if(res.data.data){
                    setSoChungThucs(res.data.data)
                }
            }
        })()
    }, [user, soChungThucs])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue({ ...hoSo, yKienNguoiChuyenXuLy: undefined, dinhKemYKienNguoiChuyenXuLy: undefined })
        }
    }, [hoSo])

    const submitHandler = async (formData: any): Promise<boolean> => {
        try{
            if("thanhPhanHoSos" in formData.data){
                if((formData.data?.thanhPhanHoSos as IThanhPhanHoSoWithDongDau[]).findIndex(x => x.daDongDau == false ) != -1){
                    toast.warn("Có thành phần hồ sơ chưa được đóng dấu.")
                    return false;
                }
            }
            if(!soChungThucs?.length){
                toast.warn("Sổ chứng thực chưa tạo hoặc đang đóng.")
                return false;
            }
            const res = await dispatch(CapSoVaDongDauHoSoChungThuc({
                id: formData.id,
                data: {...formData.data}
            })).unwrap()
            if(res.succeeded){
                handleCancel()
            }
            return res.succeeded
        } catch(error){
            console.error(error)
            return false
        }
    }


    return <AntdModal visible={true} title={"ĐÓNG DẤU" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} fullsizeScrollable handlerCancel={handleCancel} footer={null}>
        <Form name="ChuyenBuocXuLyHoSo" form={form} layout="vertical">
            <Form.Item name="buocXuLyTiep" hidden><Input /></Form.Item>
            <Form.Item name="nguoiXuLyTiep" hidden><Input /></Form.Item>
            <Form.Item name="tenBuocHienTai" hidden><Input /></Form.Item>
            <Form.Item name="buocHienTai" hidden><Input /></Form.Item>
            <Form.Item name="trangThaiHoSoId" hidden><Input /></Form.Item>
            <Form.Item name="nodeQuyTrinh" hidden><Input /></Form.Item>
            <Form.Item name="thoiHanBuocXuLy" hidden><Input /></Form.Item>
            <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input /></Form.Item>
            <Form.Item name="thanhPhanHoSos" hidden><Input /></Form.Item>
            <Row gutter={8}>
                {soChungThucs?.length ?  <ThanhPhanChungThuc soChungThucs={soChungThucs} form={form} thanhPhanHoSos={hoSo?.thanhPhanHoSos}/> : null}
                <Col span={24}>
                    <RenderTitle title="Chuyển người xử lý tiếp" />
                    <DanhSachQuyTrinh form={form} setSearchHoSoParams={setSearchHoSoParams} submitHandler={submitHandler} />
                </Col>
            </Row>
        </Form>
    </AntdModal>
}

export default DongDauModal
