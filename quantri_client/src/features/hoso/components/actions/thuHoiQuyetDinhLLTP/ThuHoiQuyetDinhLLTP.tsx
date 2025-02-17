import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdAutoComplete, AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Row, Form, Input, DatePicker } from "antd"
import { resetData } from "@/features/hoso/redux/slice"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { useState } from "react"
import { formatISOtoDate } from "@/utils"
import { CapNhatKetQuaHoSo } from "@/features/hoso/redux/action"
import { hoSoApi, ThuHoiQuyetDinhLLTPParams } from "@/features/hoso/services"
import { toast } from "react-toastify"

const ThuHoiQuyetDinhLLTP = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm<ThuHoiQuyetDinhLLTPParams>()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const buttonActionContext = useButtonActionContext()
    const dinhKem: string | undefined = Form.useWatch("fileQuyetDinh", form)
    const handleCancel = () => {
        buttonActionContext.setThuHoiQuyetDinhLLTPModalVisible(false)
        form.resetFields()
    }
    const [buttonLoading, setButtonLoading] = useState(false)

    const onOk = async () => {
        try {
            const hoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
            if(hoSo == null){
                toast.info("Không tìm thấy hồ sơ");
                return
            }
            const formData = await form.validateFields()
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.ThuHoiQuyetDinhLLTP({
                    ...formData,
                    maHoSo: hoSo?.maHoSo,
                })
                if (res.data.succeeded) {
                    setSearchParams((curr) => ({ ...curr }))
                    handleCancel()
                }
            }
            setButtonLoading(false)
        } catch (error) {
            console.log(error);
            setButtonLoading(false)
        }
    }

    return (
        <AntdModal title={"Thu hồi quyết định phiếu lltp"} confirmLoading={buttonLoading} visible={true} handlerCancel={handleCancel} width={1500} onOk={onOk}
            >
            <Form form={form} layout="vertical" name="CapNhatKetQuaHoSoModal" spellCheck>
                {/* <Form.Item name="eFormKetQuaData" hidden><Input/></Form.Item>
            <Form.Item name="eFormKetQua" hidden><Input/></Form.Item> */}
                <Row gutter={8}>
                    <Col span={24}>
                        <Row gutter={[4, 8]}>
                        <Col span={24} md={24}>
                            <Form.Item name="lyDoThuHoi" label="Lý do thu hồi">
                                <Input.TextArea maxLength={2000} showCount />
                            </Form.Item>
                        </Col> 
                        <Col span={24} md={12}>
                            <Form.Item name="soQuyetDinh" label="Số quyết định" >
                                <Input maxLength={100} showCount />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item name="ngayQuyetDinh" label="Ngày quyết định">
                                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={24}>
                            <Form.Item name="trichYeuQuyetDinh" label="Trích yếu quyết định">
                                <Input.TextArea maxLength={2000} showCount />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item name="fileQuyetDinh" label="File quyết định" rules={[{required: true, message:"vui lòng đính kèm quyết định"}]}>
                                <RegularUpload
                                    kySoToken
                                    dinhKem={dinhKem}
                                    fieldName={"fileQuyetDinh"}
                                    folderName={"PhieuLLTP"}
                                    form={form} />
                            </Form.Item>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}

export default ThuHoiQuyetDinhLLTP;
