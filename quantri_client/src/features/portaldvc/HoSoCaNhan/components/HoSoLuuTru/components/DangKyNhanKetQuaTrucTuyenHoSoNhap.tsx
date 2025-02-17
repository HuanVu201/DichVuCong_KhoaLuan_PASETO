import { IHoSo } from "@/features/hoso/models"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Col, Form, Radio, RadioChangeEvent, Switch, Typography } from "antd"
import { SwitchChangeEventHandler } from "antd/es/switch"
import { FormInstance } from "antd/lib"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/lib/redux/Hooks"
import { FormHeader } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader"
import { DangKyNhanKetQuaHoSoNhap } from "./DangKyNhanKetQuaHoSoNhap"

export const DangKyNhanKetQuaTrucTuyenHoSoNhap = ({form}: {form: FormInstance<IHoSo>}) => {
    const hinhThucTra: string = Form.useWatch("hinhThucTra", form)
    const { data: hoSoNhapData } = useAppSelector(state => state.hosonhap)
    const { duLieuThemHoSo } = useAppSelector((state) => state.truonghopthutuc)
    const onChange = (e: RadioChangeEvent) => {
        form.setFieldValue("hinhThucTra", e.target.value.toString())
    };

    return (
        <>
            <Col span={24} style={{ scrollMargin: 110 }}>
                <FormHeader>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
                        Thông tin nhận kết quả
                    </div>
                </FormHeader>

            </Col>
            <Col span={24} style={{ scrollMargin: 110, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '20px 0' }}>
                <Radio.Group onChange={onChange} value={hinhThucTra}>
                    <Radio value={'0'} defaultChecked>Nhận kết quả trực tiếp</Radio>
                    <Radio value={'1'}>Nhận kết quả qua BCCI
                        {/* <Link to={`https://hcconline.vnpost.vn/PriceHCC/Muc_Cuoc_HCC.html`} target="_blank" style={{ marginLeft: 4 }}>
                            <Typography.Text style={{ color: "#935600" }}>
                                (Tham khảo giá cước vận chuyển)
                            </Typography.Text>
                        </Link> */}
                    </Radio>

                </Radio.Group>
            </Col>
            <Col span={24} style={{ scrollMargin: 110 }}>
                {hinhThucTra !== "1" ? <div dangerouslySetInnerHTML={{ __html: duLieuThemHoSo?.diaChiNhanKetQuaTrucTiep || "" }} /> : null}
            </Col>

            {hinhThucTra === "1" ? <DangKyNhanKetQuaHoSoNhap form={form} /> : null}


        </>
    )
}