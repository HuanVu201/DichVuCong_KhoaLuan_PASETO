import { AntdButton, AntdDivider, AntdModal, AntdSpace } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo } from "@/features/hoso/redux/action"
import { ElementRef, Ref, useEffect, useRef, useState } from "react"
import { RegularUpload, RegularUploadRef, TrichXuatOCRMode } from "@/lib/antd/components/upload/RegularUpload"
import { KetQuaLienQuanWrapper } from "@/features/ketqualienquan/components/KetQuaLienQuan"
import { ChonTepThanhPhanHoSo } from "../../ChonTepThanhPhanHoSo"
import { useUploadTable } from "@/lib/antd/components/upload/hooks/useUploadTable"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { ID_SEPARATE } from "@/data"
import { SelectOutlined } from "@ant-design/icons"

const CapNhatKetQuaXuLyHoSoModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm()
    const buttonActionContext = useButtonActionContext()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const dinhKem: string = Form.useWatch("dinhKemKetQua", form)
    const dispatch = useAppDispatch()
    const ref = useRef<ElementRef<typeof RegularUpload>>(null)


    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "capNhatKetQuaXuLyHoSo"}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if (hoSo !== undefined) {
            form.setFieldsValue(hoSo)
        }
    }, [hoSo])

    const handleCancel = () => {
        buttonActionContext.setCapNhatKetQuaXuLyHoSoModalVisible(false)
        form.resetFields()
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields() as Pick<IHoSo, "trichYeuKetQua" | "dinhKemKetQua" | "eFormKetQuaData">
        if (buttonActionContext.selectedHoSos.length) {
            const res = await dispatch(CapNhatKetQuaHoSo({ ...formData, id: buttonActionContext.selectedHoSos[0] as string })).unwrap()
            if (res.succeeded) {
                // form.setFieldValue("dinhKemKetQua", undefined) // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined 
                setSearchParams((curr) => ({ ...curr }))
                handleCancel()
            }
        }
    }
    const onSubmitDinhKemThanhPhanHoSo = (value: string) => {
        const newDinhKems = dinhKem ? dinhKem + ID_SEPARATE + value : value
        form.setFieldValue("dinhKemKetQua", newDinhKems)
    }

    return <>
    <AntdModal title={"Cập nhật kết quả xử lý hồ sơ"} visible={true} handlerCancel={handleCancel} width={1500}
        footer={<AntdSpace>
            <AntdButton onClick={handleCancel} key={"1"}>Đóng</AntdButton>
            {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
            <AntdButton onClick={onOk} key={"3"} type="primary">Cập nhật</AntdButton>
        </AntdSpace>}>
        <Form form={form} layout="vertical" name="CapNhatKetQuaHoSoModal">
            {/* <Form.Item name="eFormKetQuaData" hidden><Input/></Form.Item>
            <Form.Item name="eFormKetQua" hidden><Input/></Form.Item> */}
            <Row gutter={8}>
                <Col span={24}>
                    <RenderTitle title="Kết quả xử lý hồ sơ" />
                    <Row gutter={[4, 8]}>
                        <Col span={16}>
                            <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                {hoSo?.maHoSo ? <RegularUpload 
                                    ref={ref}
                                    kySoToken
                                    useSoHoa
                                    dinhKemSoHoa={hoSo?.dinhKemSoHoa}
                                    dinhKem={dinhKem}
                                    maTTHC={hoSo?.maTTHC} //để tạm
                                    fieldName={"dinhKemKetQua"} 
                                    folderName={hoSo.maHoSo} 
                                    extraElement={(hoSo as any)?.choPhepLayFileTuTHPS ? <AntdButton icon={<SelectOutlined />} onClick={() => buttonActionContext.setChonTepTuThanhPhanHoSoVisible(true)}>Chọn từ thành phần hồ sơ</AntdButton> : null}
                                    form={form}/> : null}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <RenderTitle title="Kết quả liên quan" />
                            {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo}/>: null}
                        </Col>
                    </Row>
                    <AntdDivider />
                </Col>
            </Row>
        </Form>
    </AntdModal>
    {buttonActionContext.chonTepTuThanhPhanHoSoVisible && hoSo?.maHoSo ? <ChonTepThanhPhanHoSo maHoSo={hoSo.maHoSo} onSubmit={onSubmitDinhKemThanhPhanHoSo}/> : null}
    </>
}

export default CapNhatKetQuaXuLyHoSoModal