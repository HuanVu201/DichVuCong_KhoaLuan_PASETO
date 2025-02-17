import { Col, Form, Input, Row, Switch, Typography } from "antd"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSelect } from "@/lib/antd/components"
import { filterOptions } from "@/utils"
import { useEffect, useState } from "react"
import { FormInstance } from "antd/lib"
import { IHoSo } from "@/features/hoso/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { DefaultOptionType } from "antd/es/select"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { SwitchChangeEventHandler } from "antd/es/switch"
import { Link } from "react-router-dom"

export const DangKyNhanKetQua = ({ form }: { form: FormInstance<IHoSo> }) => {
    const { maHuyen, maTinh, maXa } = useAppSelector(state => state.danhmucdiaban)
    const uyQuyenHoSo = Form.useWatch("uyQuyen", form)
    const hinhThucTra = Form.useWatch("hinhThucTra", form)
    const dispatch = useAppDispatch()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [sdtBuuDien, setSdtBuuDien] = useState<string>();
    useEffect(() => {
        console.log(config)
        config?.map((item: any) => {
            if (item.code == 'lien-he-buu-dien') {
                setSdtBuuDien(item.content)
            }
        })
    }, [config])



    useEffect(() => {
        if (hinhThucTra != "1") {
            form.setFieldValue("bcci_hoVaTen", undefined)
            form.setFieldValue("bcci_soDienThoai", undefined)
            form.setFieldValue("bcci_email", undefined)
            form.setFieldValue("bcci_tinhThanh", undefined)
            form.setFieldValue("bcci_quanHuyen", undefined)
            form.setFieldValue("bcci_xaPhuong", undefined)
            form.setFieldValue("bcci_tenTinhThanh", undefined)
            form.setFieldValue("bcci_tenQuanHuyen", undefined)
            form.setFieldValue("bcci_tenXaPhuong", undefined)
        } else {
            if (!uyQuyenHoSo) {
                const tenTinh = maTinh?.find(x => x.maDiaBan == form.getFieldValue("tinhThanhNguoiUyQuyen"))
                const tenQuan = maHuyen?.find(x => x.maDiaBan == form.getFieldValue("quanHuyenNguoiUyQuyen"))
                const tenXa = maXa?.find(x => x.maDiaBan == form.getFieldValue("xaPhuongNguoiUyQuyen"))
                form.setFieldValue("bcci_hoVaTen", form.getFieldValue("nguoiUyQuyen"))
                form.setFieldValue("bcci_soDienThoai", form.getFieldValue("soDienThoaiNguoiUyQuyen"))
                form.setFieldValue("bcci_email", form.getFieldValue("emailNguoiUyQuyen"))
                form.setFieldValue("bcci_tinhThanh", form.getFieldValue("tinhThanhNguoiUyQuyen"))
                form.setFieldValue("bcci_quanHuyen", form.getFieldValue("quanHuyenNguoiUyQuyen"))
                form.setFieldValue("bcci_xaPhuong", form.getFieldValue("xaPhuongNguoiUyQuyen"))
                form.setFieldValue("bcci_tenTinhThanh", tenTinh?.tenDiaBan)
                form.setFieldValue("bcci_tenQuanHuyen", tenQuan?.tenDiaBan)
                form.setFieldValue("bcci_tenXaPhuong", tenXa?.tenDiaBan)
            } else {
                const tenTinh = maTinh?.find(x => x.maDiaBan == form.getFieldValue("tinhThanhChuHoSo"))
                const tenQuan = maHuyen?.find(x => x.maDiaBan == form.getFieldValue("quanHuyenChuHoSo"))
                const tenXa = maXa?.find(x => x.maDiaBan == form.getFieldValue("xaPhuongChuHoSo"))
                form.setFieldValue("bcci_hoVaTen", form.getFieldValue("chuHoSo"))
                form.setFieldValue("bcci_soDienThoai", form.getFieldValue("soDienThoaiChuHoSo"))
                form.setFieldValue("bcci_email", form.getFieldValue("emailChuHoSo"))
                form.setFieldValue("bcci_tinhThanh", form.getFieldValue("tinhThanhChuHoSo"))
                form.setFieldValue("bcci_quanHuyen", form.getFieldValue("quanHuyenChuHoSo"))
                form.setFieldValue("bcci_xaPhuong", form.getFieldValue("xaPhuongChuHoSo"))
                form.setFieldValue("bcci_tenTinhThanh", tenTinh?.tenDiaBan)
                form.setFieldValue("bcci_tenQuanHuyen", tenQuan?.tenDiaBan)
                form.setFieldValue("bcci_tenXaPhuong", tenXa?.tenDiaBan)
            }

            const ttChiTiet = window.objDataCSDLDanCu?.ThuongTru?.ChiTiet ?? ""
            const ttTenPhuongXa = window.objDataCSDLDanCu?.ThuongTru?.TenPhuongXa ?? ""
            const ttTenQuanHuyen = window.objDataCSDLDanCu?.ThuongTru?.TenQuanHuyen ?? ""
            const ttTenTinhThanh = window.objDataCSDLDanCu?.ThuongTru?.TenTinhThanh ?? ""
            const diaChiChiTiet = [ttChiTiet, ttTenPhuongXa, ttTenQuanHuyen, ttTenTinhThanh].filter(x => x).join(", ")

            // form.setFieldValue("bcci_diaChi", diaChiChiTiet.trimStart().startsWith("?") ? diaChiChiTiet.substring(1) : diaChiChiTiet)
        }
    }, [hinhThucTra, uyQuyenHoSo])

    useEffect(() => {
        if (hinhThucTra === "1") {
            if (!maTinh?.length && (maTinh === undefined || maTinh === null)) {// 
                dispatch(SearchDanhMucDiaBan({ Loai: "Tinh" }))
            }
        }
    }, [maTinh, hinhThucTra])

    const onChangeMaDonVi = (data: DefaultOptionType, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"]) => {
        if (data?.value) {
            if (currentSelect != "Xa") {
                dispatch(SearchDanhMucDiaBan({ Loai: Loai, maDiaBan: data.value as string }),)
            }
            if (currentSelect == "Tinh") {
                form.setFieldValue("bcci_tenTinhThanh", data.label)
                form.setFieldValue("bcci_tinhThanh", data.value as string)
                form.resetFields(["bcci_quanHuyen", "bcci_xaPhuong", "bcci_tenQuanHuyen", "bcci_tenXaPhuong"])
            }
            if (currentSelect == "Huyen") {
                form.setFieldValue("bcci_quanHuyen", data.value as string)
                form.setFieldValue("bcci_tenQuanHuyen", data.label)
                form.resetFields(["bcci_xaPhuong", "bcci_tenXaPhuong"])
            }
            if (currentSelect == 'Xa') {
                form.setFieldValue("bcci_xaPhuong", data.value as string)
                form.setFieldValue("bcci_tenXaPhuong", data.label)
            }
        }

    }


    return <>
        {<Row gutter={[8, 0]} hidden={hinhThucTra !== "1"}>
            <Col span={8}>
                <Form.Item rules={[{ required: true }]} name="bcci_hoVaTen" label="Họ và tên:">
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item rules={[{ required: true }]} name="bcci_soDienThoai" label="Số điện thoại:">
                    <Input placeholder="Nhập số điện thoại" maxLength={13} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item rules={[{ required: true }]} name="bcci_email" label="Email:">
                    <Input placeholder="Nhập email" />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item rules={[{ required: true }]} name="bcci_tinhThanh" label="Tỉnh/thành:">
                    <AntdSelect labelInValue onChange={(value) => onChangeMaDonVi(value, "Huyen", "Tinh")} showSearch allowClear filterOption={filterOptions} generateOptions={{ model: maTinh, label: "tenDiaBan", value: "maDiaBan" }} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item rules={[{ required: true }]} name="bcci_quanHuyen" label="Quận/huyện:">
                    <AntdSelect labelInValue onChange={(value) => onChangeMaDonVi(value, "Xa", "Huyen")} showSearch allowClear filterOption={filterOptions} generateOptions={{ model: maHuyen, label: "tenDiaBan", value: "maDiaBan" }} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item rules={[{ required: true }]} name="bcci_xaPhuong" label="Xã/phường:">
                    <AntdSelect labelInValue onChange={(value) => onChangeMaDonVi(value, "Xa", "Xa")} showSearch allowClear filterOption={filterOptions} generateOptions={{ model: maXa, label: "tenDiaBan", value: "maDiaBan" }} />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item rules={[{ required: true }]} name="bcci_diaChi" label="Địa chỉ chi tiết:">
                    <Input.TextArea rows={1} autoSize />
                </Form.Item>
            </Col>
            <Col span={24}>
                <div className="form-group">
                    <div className="input-group row">
                        <div className="col-2 titleContent">
                            <p>Hình thức chuyển trả:</p>
                        </div>
                        <div className="col-10" style={{ fontWeight: 500 }}>
                            <p>Thông thường</p>
                        </div>
                    </div>
                    <div className="input-group row">
                        <div className="col-2 titleContent">
                            <p>Thời gian chuyển phát:</p>
                        </div>
                        <div className="col-10" style={{ fontWeight: 500 }}>
                            <p>Thời gian chuyển phát kể từ ngày bưu điện nhận được kết quả.</p>
                            <i>(Ngày nhận kết quả được tính từ ngày làm việc tiếp theo kể từ ngày cơ quan giải quyết xử lý thông báo đã có kết quả)</i>
                        </div>
                    </div>
                    <div className="input-group row">
                        <div className="col-2 titleContent">
                            <p>Giá cước:</p>
                        </div>
                        <div className="col-10" style={{ fontWeight: 500 }}>
                            <p>Cước phí chuyển phát theo quy định của Tổng công ty bưu điện Việt Nam VNPOST.
                                <Link to={`https://hcconline.vnpost.vn/PriceHCC/Muc_Cuoc_HCC.html`} target="_blank" style={{ marginLeft: 4 }}>
                                    <Typography.Text style={{ color: "#935600" }}>
                                        (Tham khảo giá cước vận chuyển)
                                    </Typography.Text>
                                </Link></p>
                        </div>
                    </div>
                    <div className="input-group row" hidden={sdtBuuDien ? false : true}>
                        <div className="col-2 titleContent">
                            <p>Thông tin liên hệ:</p>
                        </div>
                        <div className="col-10" style={{ fontWeight: 500 }}>
                            <p>{sdtBuuDien}</p>
                        </div>
                    </div>
                    <div className="input-group row">
                        <div className="col-2 titleContent">
                            <p>Lưu ý:</p>
                        </div>
                        <div className="col-10" style={{ fontWeight: 500 }}>
                            <p>Nhận kết quả theo thông tin đã đăng ký.<br />
                                <i>Vui lòng thanh toán cước phí vận chuyển khi nhận kết quả.</i></p>
                        </div>
                    </div>
                </div>
            </Col>


        </Row>}
        <AntdDivider />
    </>
}