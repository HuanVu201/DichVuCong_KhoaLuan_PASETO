import { AntdDivider, AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo, KetThucHoSo, TraKetQuaHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

const KetThucModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm()
    const buttonActionContext = useButtonActionContext()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKemKetQua", form)
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if(hoSo != undefined){
            form.setFieldsValue(hoSo)
        }
    }, [hoSo])

    const handleCancel = () => {
        form.resetFields()
        buttonActionContext.setKetThucModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields() as Pick<IHoSo, "trichYeuKetQua" | "dinhKemKetQua">
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(KetThucHoSo({...formData, id: buttonActionContext.selectedHoSos[0] as string})).unwrap()
            if(res.succeeded){
                // form.setFieldValue("dinhKemKetQua", undefined) // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined 
                setSearchParams((curr) => ({...curr}))
                handleCancel()
            }
        }
    }
    return <AntdModal title="KẾT THÚC XỬ LÝ HỒ SƠ" visible={true} handlerCancel={handleCancel} width={1280}
        onOk={onOk} okText="Xác nhận">
        <Form form={form} layout="vertical" name="KetThucXuLyHoSo">
            <Row gutter={8}>
                <Col span={24}>
                    <Row gutter={[4, 8]}>
                        <Col span={16}>
                            <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                {hoSo?.maHoSo ? <RegularUpload
                                    dinhKem={dinhKem}
                                    fieldName={"dinhKemKetQua"}
                                    folderName={hoSo.maHoSo}
                                    form={form}/> : null}
                                {/* <AntdUpLoad editing = {buttonActionContext.ketThucModalVisible !== undefined} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
                            </Form.Item>
                        </Col>
                    </Row>
                    <AntdDivider />
                </Col>
            </Row>
        </Form>
    </AntdModal>
}

export default KetThucModal