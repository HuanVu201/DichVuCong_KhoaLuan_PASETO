import { AntdSpace } from "@/lib/antd/components"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { Checkbox,Form } from "antd"

export const PhuongThucNhanThongBao = () => {
    return <>
    <RenderTitle title="Phương thức nhận thông báo" />
    <AntdSpace>
        <Form.Item name="thongBaoEmail" label="Qua email" valuePropName="checked">
            <Checkbox />
        </Form.Item>
        <Form.Item name="thongBaoSMS" label="Qua SMS" valuePropName="checked">
            <Checkbox />
        </Form.Item>
        <Form.Item name="thongBaoZalo" label="Qua Zalo" valuePropName="checked">
            <Checkbox />
        </Form.Item>
    </AntdSpace>
</>
}