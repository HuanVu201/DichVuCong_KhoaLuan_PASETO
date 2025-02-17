import { SearchHoSo, SearchHoSoByNguoiGui } from "@/features/hoso/redux/action"
import { hoSoApi } from "@/features/hoso/services"
import { AntdAutoComplete, AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { PageSize } from "@formio/react"
import { Form, Input } from "antd"
import { toast } from "react-toastify"

const lyDoThuHoiOptions = [
    { value: 'Tôi không còn nhu cầu nộp hồ sơ', label: 'Tôi không còn nhu cầu nộp hồ sơ' },
    { value: 'Tôi cần bổ sung thành phần, thông tin hồ sơ', label: 'Tôi cần bổ sung thành phần, thông tin hồ sơ' },
];

export const ThuHoiHoSoCongDanModal = ({ closeModal, hoSoId }: { closeModal: () => void, hoSoId: string }) => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const handleCancel = () => {
        closeModal()
    }
    const onOK = async () => {
        try {
            if(form.getFieldValue("LyDoThuHoi"))
            {
                const res = await hoSoApi.UpdateTrangThaiHoSo({ id: hoSoId, trangThaiHoSoId: "3", lyDoThuHoi: form.getFieldValue("LyDoThuHoi") });
                toast.success("Thu hồi hồ sơ thành công")
                handleCancel()
                dispatch(SearchHoSoByNguoiGui({ pageNumber: 1, pageSize: 10, byNguoiGui: true, searchAllType: true }))  
            }
            else{
                toast.warn("Vui lòng nhập lý do thu hồi!")
            }
           
        } catch (error: any) {
            toast.warning(error.response.data);
        }
    }

    return (
        <AntdModal title="Lý do thu hồi hồ sơ" handlerCancel={handleCancel} visible={true} width={1000}
            footer={
                <AntdSpace>
                    <AntdButton onClick={handleCancel} key={"1"}>
                        Đóng
                    </AntdButton>
                    {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
                    <AntdButton onClick={onOK} key={"3"} type="primary">
                        Cập nhật
                    </AntdButton>
                </AntdSpace>
            }
        >
            <Form form={form} layout="vertical" name="CapNhatBoSoHoSoModal" >
                <Form.Item name="LyDoThuHoi" >
                    <AntdAutoComplete generateOptions={{ model: lyDoThuHoiOptions, value: 'value', label: 'label' }}>
                        <Input.TextArea placeholder="Nhập lý do thu hồi hồ sơ" />
                    </AntdAutoComplete>
                </Form.Item>

            </Form>
        </AntdModal>
    )
}