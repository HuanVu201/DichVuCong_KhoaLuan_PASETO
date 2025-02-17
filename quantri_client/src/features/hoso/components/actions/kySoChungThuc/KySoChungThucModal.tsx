import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdDivider, AntdModal } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "@/components/common/RenderTitle"
import { ChuyenBuocXuLyHoSo, GetHoSoParam, hoSoApi } from "@/features/hoso/services"
import { ComponentProps, useEffect } from "react"
import { KySoHoSoChungThuc, GetHoSo } from "@/features/hoso/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { FormInstance } from "antd/lib"
import { get } from "http"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { DanhSachQuyTrinh } from "../chuyenBuocXuLy/DanhSachQuyTrinh"
import { IframeBlobFromPdfViewer } from "@/components/common/IframeBlobFromPdfViewer"
import { ThanhPhanChungThuc } from "./ThanhPhanChungThuc"
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"
import { toast } from "react-toastify"
import { resetData } from "@/features/hoso/redux/slice"

type ChuyenBuocXuLyModalProps = { 
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}

const KySoChungThucModal = ({ setSearchHoSoParams }: ChuyenBuocXuLyModalProps) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<ChuyenBuocXuLyHoSo>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        form.resetFields()
        // buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
        buttonActionContext.setKySoChungThucModalVisible(false)
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view:"kySoChungThuc"}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue({...hoSo, yKienNguoiChuyenXuLy: undefined, dinhKemYKienNguoiChuyenXuLy: undefined})
        }
    }, [hoSo])

    const submitHandler = async (formData: {id: string; data: ChuyenBuocXuLyHoSo}): Promise<boolean> => {
        try {
            const chuyenBuocRes = await dispatch(KySoHoSoChungThuc({
                id: formData.id,
                data: {...formData.data}
            })).unwrap()
            if (chuyenBuocRes.succeeded) {
                handleCancel();
            }
            return chuyenBuocRes.succeeded
            
        } catch (err) {
            console.error(err)
            return false;
        }
    }

    const okOk = async () => {
        const thanhPhanHoSos = form.getFieldValue("thanhPhanHoSos")
        try {
            const res = await thanhPhanHoSoApi.CapNhatTrangThaiKySoChungThuc({thanhPhanHoSos});
            if(res.data.succeeded){
                toast.success("Cập nhật thành phần hồ sơ thành công")
                return
            }
            toast.warn("Vui lòng kiểm tra lại đính kèm, trạng thái của các thành phần hồ sơ")  
        } catch (error) {
            toast.warn("Vui lòng kiểm tra lại đính kèm, trạng thái của các thành phần hồ sơ")  
        }
          
    }

    return <AntdModal visible={true} keyboard={false} title={"Ký số chứng thực"  + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} fullsizeScrollable handlerCancel={handleCancel} footer={null}>
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
                <ThanhPhanChungThuc form={form} thanhPhanHoSos={hoSo?.thanhPhanHoSos}/>
                <Col span={24}>
                    <RenderTitle title="Chuyển người xử lý tiếp"/>
                    <DanhSachQuyTrinh form={form} setSearchHoSoParams={setSearchHoSoParams} submitHandler={submitHandler}/>
                </Col>
                {/* <IframeBlobFromPdfViewer fileName={dinhKem} /> */}
            </Row>
        </Form>
    </AntdModal>
}

export default KySoChungThucModal
