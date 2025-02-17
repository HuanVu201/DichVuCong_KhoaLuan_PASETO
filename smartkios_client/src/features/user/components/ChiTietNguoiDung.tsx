import { RenderTitle } from "@/components/common"
import { AntdDivider } from "@/lib/antd/components"
import { Col, Input, Row, Form, Select } from "antd"
import { IUser, ThongTinCSDLDanCuSearchParams } from "../models"
import { FormInstance } from "antd/lib"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useMemo } from "react"
import { DefaultOptionType } from "antd/es/select"

export type ChiTietNguoiDung = {
    soDinhDanh: string;
    soCMND: string;
    firstName: string;
    lastName: string;
    fullName: string;
    tinhTrangHonNhan: string;
    nhomMau: string;
    tonGiao: string;
    quocTich: string;
    gioiTinh: string;
    danToc: string;
    namSinh: string;
    ngayThangNamSinh: string;

    ks_maTinhThanh: string;
    ks_maQuanHuyen: string;
    ks_maPhuongXa: string;
    ks_chiTiet: string;
    ks_quocGia: string;

    qq_maTinhThanh: string;
    qq_maQuanHuyen: string;
    qq_maPhuongXa: string;
    qq_chiTiet: string;
    qq_quocGia: string;

    tt_maTinhThanh: string;
    tt_maQuanHuyen: string;
    tt_maPhuongXa: string;
    tt_chiTiet: string;
    tt_quocGia: string;

    ht_maTinhThanh: string;
    ht_maQuanHuyen: string;
    ht_maPhuongXa: string;
    ht_chiTiet: string;
    ht_quocGia: string;

    c_hoVaTen: string;
    c_quocTich: string;
    c_soDinhDanh: string;
    c_soCMND : string;

    m_hoVaTen: string;
    m_quocTich: string;
    m_soDinhDanh: string;
    m_soCMND : string;

    vc_hoVaTen: string;
    vc_quocTich: string;
    vc_soDinhDanh: string;
    vc_soCMND : string;

    dd_hoVaTen: string;
    dd_quocTich: string;
    dd_soDinhDanh: string;
    dd_soCMND : string;

    ch_hoVaTen: string;
    ch_quanHe: string;
    ch_soDinhDanh: string;
    ch_soCMND : string;
    soSoHoKhau: string;
    diaChi: string;
}

export const ChiTietNguoiDung = ({form}: {form: FormInstance<ChiTietNguoiDung>}) => {
    const {userCDSLDanCu} = useAppSelector(state => state.user)
    
    const {tt_tinh, tt_huyen, tt_xa, qq_tinh, qq_huyen, qq_xa, ks_tinh, ks_huyen, ks_xa, ht_tinh, ht_huyen, ht_xa} = useMemo(() => {
        const tt_tinh: DefaultOptionType[] = [{value: userCDSLDanCu?.thuongTru.maTinhThanh, label: userCDSLDanCu?.thuongTru.tenTinhThanh}]
        const tt_huyen: DefaultOptionType[] = [{value: userCDSLDanCu?.thuongTru.maQuanHuyen, label: userCDSLDanCu?.thuongTru.tenQuanHuyen}]
        const tt_xa: DefaultOptionType[] = [{value: userCDSLDanCu?.thuongTru.maPhuongXa, label: userCDSLDanCu?.thuongTru.tenPhuongXa}]
        const qq_tinh: DefaultOptionType[] = [{value: userCDSLDanCu?.queQuan.maTinhThanh, label: userCDSLDanCu?.queQuan.tenTinhThanh}]
        const qq_huyen: DefaultOptionType[] = [{value: userCDSLDanCu?.queQuan.maQuanHuyen, label: userCDSLDanCu?.queQuan.tenQuanHuyen}]
        const qq_xa: DefaultOptionType[] = [{value: userCDSLDanCu?.queQuan.maPhuongXa, label: userCDSLDanCu?.queQuan.tenPhuongXa}]
        const ks_tinh: DefaultOptionType[] = [{value: userCDSLDanCu?.noiDangKyKhaiSinh.maTinhThanh, label: userCDSLDanCu?.noiDangKyKhaiSinh.tenTinhThanh}]
        const ks_huyen: DefaultOptionType[] = [{value: userCDSLDanCu?.noiDangKyKhaiSinh.maQuanHuyen, label: userCDSLDanCu?.noiDangKyKhaiSinh.tenQuanHuyen}]
        const ks_xa: DefaultOptionType[] = [{value: userCDSLDanCu?.noiDangKyKhaiSinh.maPhuongXa, label: userCDSLDanCu?.noiDangKyKhaiSinh.tenPhuongXa}]
        const ht_tinh: DefaultOptionType[] = [{value: userCDSLDanCu?.noiOHienTai.maTinhThanh, label: userCDSLDanCu?.noiOHienTai.tenTinhThanh}]
        const ht_huyen: DefaultOptionType[] = [{value: userCDSLDanCu?.noiOHienTai.maQuanHuyen, label: userCDSLDanCu?.noiOHienTai.tenQuanHuyen}]
        const ht_xa: DefaultOptionType[] = [{value: userCDSLDanCu?.noiOHienTai.maPhuongXa, label: userCDSLDanCu?.noiOHienTai.tenPhuongXa}]
        return {tt_tinh, tt_huyen, tt_xa, qq_tinh, qq_huyen, qq_xa, ks_tinh, ks_huyen, ks_xa, ht_tinh, ht_huyen, ht_xa,}
    }, [userCDSLDanCu])
    

    return <Form form={form} name="ThongTinCSDLDanCuData" layout="vertical" disabled>
    <Row gutter={[24,8]} >
        <Col span={24}>
            <RenderTitle title="THÔNG TIN CHÍNH"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="soDinhDanh" label="Số định danh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="soCMND" label="Số CMND">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="firstName" label="Họ">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="lastName" label="Tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="fullName" label="Họ và tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tinhTrangHonNhan" label="Tình trạng hôn nhân">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="nhomMau" label="Nhóm máu">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tonGiao" label="Tôn giáo">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="quocTich" label="Quốc tịch">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="gioiTinh" label="Giới tính">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="danToc" label="Dân tộc">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="namSinh" label="Năm sinh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ngayThangNamSinh" label="Ngày tháng năm sinh">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="NƠI ĐĂNG KÝ KHAI SINH"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ks_maTinhThanh" label="Tỉnh thành">
                <Select options={ks_tinh}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ks_maQuanHuyen" label="Huyện, thị xã">
                <Select options={ks_huyen}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ks_maPhuongXa" label="Xã phường">
                <Select options={ks_xa}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ks_chiTiet" label="Chi tiết">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ks_quocGia" label="Quốc gia">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="QUÊ QUÁN"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="qq_maTinhThanh" label="Tỉnh thành">
                <Select options={qq_tinh}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="qq_maQuanHuyen" label="Huyện, thị xã">
                <Select options={qq_huyen}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="qq_maPhuongXa" label="Xã phường">
                <Select options={qq_xa}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="qq_chiTiet" label="Chi tiết">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="qq_quocGia" label="Quốc gia">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="THƯỜNG TRÚ"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tt_maTinhThanh" label="Tỉnh thành">
                <Select options={tt_tinh}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tt_maQuanHuyen" label="Huyện, thị xã">
                <Select options={tt_huyen}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tt_maPhuongXa" label="Xã phường">
                <Select options={tt_xa}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tt_chiTiet" label="Chi tiết">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="tt_quocGia" label="Quốc gia">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="NƠI Ở HIỆN TẠI"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ht_maTinhThanh" label="Tỉnh thành">
                <Select options={ht_tinh}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ht_maQuanHuyen" label="Huyện, thị xã">
                <Select options={ht_huyen}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ht_maPhuongXa" label="Xã phường">
                <Select options={ht_xa}/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ht_chiTiet" label="Chi tiết">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ht_quocGia" label="Quốc gia">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="THÔNG TIN CHA"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="c_hoVaTen" label="Họ và tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="c_quocTich" label="Quốc tịch">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="c_soDinhDanh" label="Số định danh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="c_soCMND" label="Số CMND">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="THÔNG TIN MẸ"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="m_hoVaTen" label="Họ và tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="m_quocTich" label="Quốc tịch">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="m_soDinhDanh" label="Số định danh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="m_soCMND" label="Số CMND">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="THÔNG TIN VỢ/CHỒNG"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="vc_hoVaTen" label="Họ và tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="vc_quocTich" label="Quốc tịch">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="vc_soDinhDanh" label="Số định danh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="vc_soCMND" label="Số CMND">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="NGƯỜI ĐẠI DIỆN"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="dd_hoVaTen" label="Họ và tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="dd_quocTich" label="Quốc tịch">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="dd_soDinhDanh" label="Số định danh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="dd_soCMND" label="Số CMND">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="CHỦ HỘ"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ch_hoVaTen" label="Họ và tên">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ch_quanHe" label="Quan hệ">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ch_soDinhDanh" label="Số định danh">
                <Input/>
            </Form.Item>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="ch_soCMND" label="Số CMND">
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <RenderTitle title="SỔ HỘ KHẨU"/>
            <AntdDivider/>
        </Col>
        <Col md={12} span={24}>
            <Form.Item name="soSoHoKhau" label="Số">
                <Input/>
            </Form.Item>
        </Col>
    </Row>
</Form>
}
