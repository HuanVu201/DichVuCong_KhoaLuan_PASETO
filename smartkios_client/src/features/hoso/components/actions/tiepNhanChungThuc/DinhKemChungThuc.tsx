import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { AntdButton } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppSelector } from "@/lib/redux/Hooks";
import { SelectOutlined } from "@ant-design/icons";
import { Form, FormInstance, Modal } from "antd";
import { ChonTepThanhPhanHoSo } from "../../ChonTepThanhPhanHoSo";
import { ID_SEPARATE } from "@/data";
import { getFileName } from "@/utils";
import { toast } from "react-toastify";

export const DinhKemChungThuc = ({ form }: { form: FormInstance<any> }) => {
    const {data: hoSo} = useAppSelector(state => state.hoso) 
    const dinhKem = Form.useWatch("dinhKemKetQua", form)
    const buttonActionContext = useButtonActionContext()

    const onSubmitDinhKemThanhPhanHoSo = (value: string) => {
        form.setFieldValue("dinhKemKetQua", value)
        toast.success(`thay đổi tệp ${getFileName(dinhKem)} thành ${getFileName(value)} thành công`)
        // Modal.confirm({
        //     maskClosable: false,
        //     title:<>
        //         <span> Xác nhận thay đổi tệp {getFileName(dinhKem)} thành {getFileName(value)}</span>
        //     </>,
        //     onOk: () => {
        //     },
        // })
    }

    return <>
        <Form.Item name="dinhKemKetQua" label="Tệp đính kèm" rules={[{message: "Vui lòng đính kèm chứng thực", required: true}]}>
            {hoSo?.maHoSo ? <RegularUpload
                // ref={ref}
                accept="application/pdf"
                kySoToken
                maxCount={1}
                dinhKem={dinhKem}
                fieldName={"dinhKemKetQua"}
                folderName={hoSo.maHoSo}
                form={form}
                extraElement={<AntdButton icon={<SelectOutlined />} onClick={() => buttonActionContext.setChonTepTuThanhPhanHoSoVisible(true)}>Chọn từ thành phần hồ sơ</AntdButton>} 
                /> : null
            }
        </Form.Item>
        {buttonActionContext.chonTepTuThanhPhanHoSoVisible && hoSo?.maHoSo ? <ChonTepThanhPhanHoSo selectType="radio" maHoSo={hoSo.maHoSo} onSubmit={onSubmitDinhKemThanhPhanHoSo}/> : null}
    </>
}