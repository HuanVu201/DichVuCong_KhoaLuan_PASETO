import { IHoSo } from "@/features/hoso/models"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Form, Switch, Typography } from "antd"
import { SwitchChangeEventHandler } from "antd/es/switch"
import { FormInstance } from "antd/lib"
import { FormHeader } from "./FormHeader"
import { DangKyNhanKetQua } from "./DangKyNhanKetQua"
import { Link } from "react-router-dom"

export const DangKyNhanKetQuaTrucTuyen = ({form}: {form: FormInstance<IHoSo>}) => {
    const hinhThucTra: string = Form.useWatch("hinhThucTra", form)
    const setHinhThucTra: SwitchChangeEventHandler = (value) => {
        form.setFieldValue("hinhThucTra", value ? "1" : "0")
    }

    return (
        <>
        <FormHeader>
        <div style={{ display: 'flex', alignItems: 'center', marginTop:16 }}>Đăng ký nhận kết quả hồ sơ qua BCCI
            <Typography.Text type="danger" italic style={{ marginInline: 4 }}>
                (Nếu có tích vào ô bên cạnh)
                
            </Typography.Text> 
            <Switch
                checked={hinhThucTra === "1"}
                style={{marginLeft:4}}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={setHinhThucTra}
            />
            <Link to={`https://hcconline.vnpost.vn/PriceHCC/Muc_Cuoc_HCC.html`} target="_blank" style={{ marginLeft: 4 }}>
                <Typography.Text style={{ color:"#f0ad4e"}}>
                    Tham khảo giá cước vận chuyển
                </Typography.Text>
            </Link>
        </div>
        </FormHeader>
        {hinhThucTra === "1" ? <DangKyNhanKetQua form={form}/> : null }
        </>
    )
}