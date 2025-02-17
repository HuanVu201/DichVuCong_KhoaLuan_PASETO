import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdDivider, AntdModal } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "@/components/common/RenderTitle"
import { DanhSachQuyTrinh } from "./DanhSachQuyTrinh"
import { ChuyenBuocXuLyHoSo, GetHoSoParam } from "@/features/hoso/services"
import { ComponentProps, useEffect } from "react"
import { GetHoSo } from "@/features/hoso/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { FormInstance } from "antd/lib"
import { get } from "http"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"

type ChuyenBuocXuLyModalProps = { 
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    //start extend props
    handlerCloseModal?: () =>void;
    viewFileChungThuc?: (fileName: string) => React.ReactNode;
    chungThucElement?: (form: FormInstance<any>, thanhPhanHoSos: IThanhPhanHoSo[] | undefined) => React.ReactNode;
    modalTitle?: React.ReactNode;
    remove?: boolean;
    extraSearchHoSoParams?: Partial<GetHoSoParam>
    //end extend props
} & Pick<ComponentProps<typeof DanhSachQuyTrinh>, "submitHandler">

const ChuyenBuocXuLyModal = ({ extraSearchHoSoParams, setSearchHoSoParams, handlerCloseModal, remove, viewFileChungThuc, modalTitle, submitHandler, chungThucElement }: ChuyenBuocXuLyModalProps) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<ChuyenBuocXuLyHoSo>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const dinhKem = Form.useWatch("dinhKemKetQua", form)
    const dinhKemYKienNguoiChuyenXuLy = Form.useWatch("dinhKemYKienNguoiChuyenXuLy", form)
    
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        form.resetFields()
        buttonActionContext.setSelectedHoSos([])
        if(handlerCloseModal){
            handlerCloseModal()
        }
        buttonActionContext.setChuyenBuocXuLyModalVisible(false)
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view:"chuyenBuocXuLy", ...extraSearchHoSoParams}))
            // dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, returnNodeQuyTrinh: true}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue({...hoSo, yKienNguoiChuyenXuLy: undefined, dinhKemYKienNguoiChuyenXuLy: undefined})
        }
    }, [hoSo])


    return <AntdModal visible={true} title={modalTitle ?? "Chuyển bước xử lý hồ sơ"} fullsizeScrollable handlerCancel={handleCancel} footer={null}>
        <Form name="ChuyenBuocXuLyHoSo" form={form} layout="vertical">
            <Form.Item name="buocXuLyTiep" hidden><Input /></Form.Item>
            <Form.Item name="nguoiXuLyTiep" hidden><Input /></Form.Item>
            <Form.Item name="tenBuocHienTai" hidden><Input /></Form.Item>
            <Form.Item name="buocHienTai" hidden><Input /></Form.Item>
            <Form.Item name="trangThaiHoSoId" hidden><Input /></Form.Item>
            <Form.Item name="nodeQuyTrinh" hidden><Input /></Form.Item>
            <Form.Item name="thoiHanBuocXuLy" hidden><Input /></Form.Item>
            <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input /></Form.Item>
            <Row gutter={8}>
                {remove ? null : <Col span={24}>
                    <RenderTitle title="Kết quả xử lý hồ sơ" />
                    <Row gutter={[4, 8]}>
                        <Col span={16}>
                            <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                {hoSo?.maHoSo ?  <RegularUpload
                                    kySoToken={remove ? false : true}
                                    dinhKem={dinhKem}
                                    fieldName={"dinhKemKetQua"}
                                    folderName={hoSo.maHoSo}
                                    form={form}/>: null}
                            </Form.Item>
                        </Col>
                    </Row>
                    <AntdDivider/>
                </Col>}
                {chungThucElement && hoSo?.thanhPhanHoSos ? chungThucElement(form, hoSo?.thanhPhanHoSos) : null}
                {remove ? null : <Col span={24}>
                    <RenderTitle title="Chuyển xử lý hồ sơ"/>
                    <Row gutter={[4,8]}>
                        <Col span={16}>
                            <Form.Item name="yKienNguoiChuyenXuLy" label="Nội dung chuyển xử lý">
                                <Input.TextArea rows={3}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="dinhKemYKienNguoiChuyenXuLy" label="Đính kèm chuyển xử lý">
                                {hoSo?.maHoSo ? <RegularUpload
                                    dinhKem={dinhKemYKienNguoiChuyenXuLy}
                                    fieldName={"dinhKemYKienNguoiChuyenXuLy"}
                                    folderName={hoSo.maHoSo}
                                    form={form}/> : null}
                            </Form.Item>
                        </Col>
                    </Row>
                    <AntdDivider/>
                </Col>}
                
                <Col span={24}>
                    <RenderTitle title="Chuyển người xử lý tiếp"/>
                    <DanhSachQuyTrinh form={form} setSearchHoSoParams={setSearchHoSoParams} submitHandler={submitHandler}/>
                </Col>
                {viewFileChungThuc ? viewFileChungThuc(dinhKem) : null}
            </Row>
        </Form>
    </AntdModal>
}

export default ChuyenBuocXuLyModal
