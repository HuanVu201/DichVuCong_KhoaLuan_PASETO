import { FORMAT_DATE } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { LOAI_KET_QUA_OPTIONS, LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData"
import { resetData, resetDatas } from "@/features/hoso/redux/slice"
import { FormHeader } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader"
import { AntdAutoComplete, AntdModal, AntdSelect } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row } from "antd"
import { useEffect, useMemo } from "react"
import { AdminTepDinhKem } from "../adminCapNhatHoSo/AdminTepDinhKem"
import { TepDinhKem } from "../themMoiHoSo/TepDinhKem"
import { LuaChonThuTucThemMoiHoSoDienTuWrapper } from "./LuaChonThuTuc"
import { TepDinhKemThemMoiHoSoDienTu } from "./TepDinhKemThemMoiHoSoDienTu"
import { adminHoSoApi } from "@/features/adminHoSo/services"
import { hoSoApi } from "@/features/hoso/services"
import { toast } from "react-toastify"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

const ThemMoiHoSoDienTu = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<any>();
    const loaiKetQuas = [
        { label: 'Kết quả', value: 'Kết quả' },
        { label: 'Bổ sung', value: 'Bổ sung' },
        { label: 'Trả lại/Xin rút', value: 'Trả lại/Xin rút' },
    ]
    const { data: hoSo, loading } = useAppSelector((state) => state.adminHoSo);
    const { datas: groups } = useAppSelector((state) => state.cocautochuc);
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { datas: users, data: user } = useAppSelector((state) => state.user);
    const buttonActionContext = useButtonActionContext();
    const dinhKem = Form.useWatch("dinhKemKetQua", form);
    const { publicModule } = useAppSelector(state => state.config)

    const uploadFileConfig = useMemo(() => {
        return publicModule?.find(x => x.code == "post_create_hoso")?.content
    }, [publicModule])

    const handleCancel = () => {
        // buttonActionContext.setSelectedHoSos([]);
        buttonActionContext.setThemMoiHoSoDienTuModalVisible(false);
        dispatch(resetDatas())
        dispatch(resetData())
    };

    useEffect(() => {
        (async () => {
            await dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 5000, officeCode: user?.officeCode }));
        })();
    }, []);

    const onFinish = async () => {
        const formData = form.getFieldsValue()

        const res = await hoSoApi.ThemMoiHoSoDienTu({ ...formData })
        if (res.status == 201) {
            toast.success("Thêm mới hồ sơ thành công!")
            buttonActionContext.setThemMoiHoSoDienTuModalVisible(false);
            form.resetFields()
        }
        else
            toast.error("Thao tác thất bại!")

    }
    return (
        <AntdModal onOk={onFinish} fullsizeScrollable visible={true} title={"Thêm mới hồ sơ điện tử"} handlerCancel={handleCancel}>
            <Form form={form} layout="vertical" name="ThemMoiHoSoDienTu" initialValues={{ deletedThanhPhanIds: [] }}>
                <Form.Item name="deletedThanhPhanIds" hidden><Input /></Form.Item>
                <Form.Item name="thanhPhanHoSos" hidden><Input /></Form.Item>
                <Form.Item name="maTruongHop" hidden><Input /></Form.Item>
                <Form.Item name="currentSelectedMaKetQuaTPTT" hidden><Input /></Form.Item>
                <Form.Item name="tenTruongHop" hidden><Input /></Form.Item>
                <Form.Item name="maTTHC" hidden><Input /></Form.Item>
                <Form.Item name="tenTTHC" hidden><Input /></Form.Item>
                <Form.Item name="mucDo" hidden><Input /></Form.Item>
                <Form.Item name="maTrangThaiHoSo" hidden><Input /></Form.Item>
                <Form.Item name="linhVucId" hidden><Input /></Form.Item>
                <Form.Item name="hinhThucTra" hidden><Input /></Form.Item>
                <Form.Item name="nodeQuyTrinh" hidden><Input /></Form.Item>
                <Form.Item name="chiTietPhiLePhi" hidden><Input /></Form.Item>
                <Form.Item name="thoiHanBuocXuLy" hidden><InputNumber /></Form.Item>
                <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input /></Form.Item>
                <Form.Item name="buocXuLyTiep" hidden><Input /></Form.Item>
                <Form.Item name="nguoiXuLyTiep" hidden><Input /></Form.Item>
                <Form.Item name="tenBuocHienTai" hidden><Input /></Form.Item>
                <Form.Item name="buocHienTai" hidden><Input /></Form.Item>
                <Form.Item name="nguoiNhanHoSo" hidden><Input /></Form.Item>
                <Form.Item name="nguoiDaXuLy" hidden><Input /></Form.Item>
                <Form.Item name="dangKyNhanHoSoQuaBCCIData" hidden><Input /></Form.Item>
                <Form.Item name="daDinhDanh" hidden valuePropName="checked"><Checkbox /></Form.Item>
                <Form.Item name="bcci_tenTinhThanh" hidden><Input /></Form.Item>
                <Form.Item name="bcci_tenQuanHuyen" hidden><Input /></Form.Item>
                <Form.Item name="bcci_tenXaPhuong" hidden><Input /></Form.Item>
                <Form.Item name="nguoiGui" hidden><Input /></Form.Item>
                <Form.Item name="eFormData" hidden><Input /></Form.Item>
                <Form.Item name="eFormDataValid" hidden><Input /></Form.Item>
                <Form.Item name="removeFiles" hidden><Input /></Form.Item>
                <Form.Item name="soDinhDanh" hidden><Input /></Form.Item>

                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <FormHeader>Thông tin chủ hồ sơ</FormHeader>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="chuHoSo" label="Chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Form.Item name="ngaySinhChuHoSo" label="Năm sinh">
                        <Input placeholder="Nhập năm sinh VD:2000" />
                    </Form.Item>
                    <Col span={12}>
                        <Form.Item name="diaChiChuHoSo" label="Địa chỉ chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="soDienThoaiChuHoSo" label="Sđt chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="emailChuHoSo" label="Email chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="soGiayToChuHoSo" label="Giấy tờ chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="loaiGiayToChuHoSo" label="Loại giấy tờ chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="loaiDoiTuong" label="Loại đối tượng">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="maDoiTuong" label="Mã đối tượng">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="tinhThanhChuHoSo" label="Tỉnh thành chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="quanHuyenChuHoSo" label="Quận huyện chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="xaPhuongChuHoSo" label="Xã phường chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <FormHeader>Thông tin uỷ quyền</FormHeader>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="uyQuyen" label="Uỷ quyền" valuePropName="checked">
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="nguoiUyQuyen" label="Người uỷ quyền">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="soDienThoaiNguoiUyQuyen"
                            label="Số điện thoại người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="emailNguoiUyQuyen" label="Email người uỷ quyền">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="soGiayToNguoiUyQuyen"
                            label="Số giấy tờ người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="loaiGiayToNguoiUyQuyen"
                            label="Loại giấy tờ người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="ngaySinhNguoiUyQuyen"
                            label="Ngày sinh người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="diaChiNguoiUyQuyen" label="Địa chỉ người uỷ quyền">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tinhThanhNguoiUyQuyen"
                            label="Tỉnh thành người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="quanHuyenNguoiUyQuyen"
                            label="Quận huyện người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="xaPhuongNguoiUyQuyen"
                            label="Xã phường người uỷ quyền"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <FormHeader>Thông tin hồ sơ</FormHeader>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="maHoSo" label="Mã hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="donVi" label="Đơn vị">
                            <AntdSelect generateOptions={{ model: groups, value: 'maDinhDanh', label: 'groupName' }} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <LuaChonThuTucThemMoiHoSoDienTuWrapper form={form} />
                    </Col>

                    <Col span={24}>
                        <FormHeader>Tệp tin đính kèm</FormHeader>
                    </Col>
                    <Col span={24}>
                        <>
                            <TepDinhKemThemMoiHoSoDienTu form={form} />
                        </>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}

export default ThemMoiHoSoDienTu