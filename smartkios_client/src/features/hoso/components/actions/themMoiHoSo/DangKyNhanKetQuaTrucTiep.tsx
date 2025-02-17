import { RenderTitle } from "@/components/common"
import { IHoSo } from "@/features/hoso/models"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Form, FormInstance, Typography } from "antd"
import Switch, { SwitchChangeEventHandler } from "antd/es/switch"
import { DangKyNhanKetQua } from "./DangKyNhanKetQua"

export const DangKyNhanKetQuaTrucTiep = ({form}: {form: FormInstance<IHoSo>}) => {
    const hinhThucTra: string = Form.useWatch("hinhThucTra", form)
    const setHinhThucTra: SwitchChangeEventHandler = (value) => {
        form.setFieldValue("hinhThucTra", value ? "1" : "0")
    }
    return (
        <>
            <RenderTitle title={<div style={{ display: 'flex', alignItems: 'center' }}>Đăng ký nhận kết quả hồ sơ qua BCCI
                <Typography.Text type="danger" italic style={{ marginInline: 4 }}>(Nếu có tích vào ô bên cạnh, không tích là nhận kết quả trực tiếp)</Typography.Text> 
                 <Switch
                    checked={hinhThucTra === "1"}
                    style={{marginLeft:4}}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={setHinhThucTra}
                />
                </div>} />
                <DangKyNhanKetQua form={form} /> 
        </>
         
    )
}