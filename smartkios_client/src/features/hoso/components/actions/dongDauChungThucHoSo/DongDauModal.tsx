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
import { ThanhPhanChungThuc } from "./ThanhPhanChungThuc"
import { btnSignClick } from "@/utils/common"
import { addPagePDF } from "@/utils"
import { resetData } from "@/features/hoso/redux/slice"
import { ISoChungThuc } from "@/features/sochungthuc/models"
import { SoChungThucApi } from "@/features/sochungthuc/services"

type DongDauModalProps = {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}

const DongDauModal = ({ setSearchHoSoParams }: DongDauModalProps) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<ChuyenBuocXuLyHoSo>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const [soChungThucs, setSoChungThucs] = useState<ISoChungThuc[]>()
    
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        form.resetFields()
        buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
        buttonActionContext.setDongDauModalVisible(false)
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "kySoChungThuc" }))
            // dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, returnNodeQuyTrinh: true}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        (async () => {
            if(hoSo && hoSo.donViId && soChungThucs == undefined) {
                const res = await SoChungThucApi.Search({donVi: hoSo.donViId, pageNumber: 1, pageSize:100})
                if(res.data.data){
                    setSoChungThucs(res.data.data)
                }
            }
        })()
    }, [hoSo, soChungThucs])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue({ ...hoSo, yKienNguoiChuyenXuLy: undefined, dinhKemYKienNguoiChuyenXuLy: undefined })
        }
    }, [hoSo])

    const submitHandler = async (formData: any): Promise<boolean> => {
        try{
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


    return <AntdModal visible={true} title={"ĐÓNG DẤU"} fullsizeScrollable handlerCancel={handleCancel} footer={null}>
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
