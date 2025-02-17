import { TRANGTHAISOHOA } from "@/features/hoso/data/formData"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Col, Form, FormInstance, Modal, Typography } from "antd"
import { useCallback, useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'
import { useTepDinhKemColumn } from "../hooks/useTepDinhKem"
import { IThanhPhanThuTucWithSoHoa } from "@/features/hoso/components/ReadOnlyTepDinhKem"
import { IHoSo } from "@/features/hoso/models"
import { DanhSachGiayToSoHoaModal } from "./DanhSachGiayToSoHoa"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { IGetDuLieuThemHoSo } from "@/features/truonghopthutuc/models"
import { ToKhaiDienTu } from "@/features/hoso/components/ToKhaiDienTu"
import { ID_SEPARATE } from "@/data"
import { FormHeader } from "./FormHeader"
import { DangKyNhanKetQuaTrucTuyen } from "./DangKyNhanKetQuaTrucTuyen"
import { ThanhPhanChungThucHoSo } from "@/features/hoso/components/actions/themMoiHoSoChungThuc/ThanhPhanHoSo"

export const TepTinDinhKem = ({ form, stepRef }: { stepRef: React.MutableRefObject<HTMLDivElement[]>; form: FormInstance<IHoSo> }) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanThuTuc>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<IThanhPhanThuTucWithSoHoa[]>([])
    const columns = useTepDinhKemColumn({ dataSource, setDataSource, form })
    const { duLieuThemHoSo } = useAppSelector((state) => state.truonghopthutuc)
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const [showEform, setShowEform] = useState(true)
    const anThongTinLienHeNopTrucTuyen = duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen

    useEffect(() => {
        if (!duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen && duLieuThemHoSo?.truongHopthuTuc.eForm && window.objDataCSDLDanCu !== undefined) {
            setShowEform(false)
        }
    }, [duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen, duLieuThemHoSo?.truongHopthuTuc.eForm, window.objDataCSDLDanCu])

    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        if (duLieuThemHoSo?.thanhPhanThuTucs) {
            setDataSource(duLieuThemHoSo.thanhPhanThuTucs.map(x => ({ ...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"], maGiayToKhoQuocGia: undefined, disabled: true, maGiayTo: x.ma })))
        }
        return () => {
            setDataSource([])
        }
    }, [duLieuThemHoSo?.thanhPhanThuTucs])

    const onAddRow = () => {
        const id = uuid()
        const newRow: any = {
            key: id,
            id: id,
            batBuoc: false,
            ten: "",
            soBanChinh: 0,
            soBanSao: 0,
            nhanBanGiay: false,
            trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"],
            dinhKem: "",
            disabled: false,
        }
        setDataSource([...dataSource, newRow])
    }

    const onSaveFileToThanhPhanThuTuc = useCallback((uploadedFileName: string) => {
        setDataSource((curr) => {
            const hasConfigChoPhepThemToKhai = curr.findIndex(x => x.choPhepThemToKhai == true)
            return curr.map((thanhPhan, index) => {
                if (hasConfigChoPhepThemToKhai == -1) {// không có cấu hình => thêm vào phần tử đầu tiên
                    if (index == 0) {
                        return { ...thanhPhan, dinhKem: thanhPhan.dinhKem ? thanhPhan.dinhKem + ID_SEPARATE + uploadedFileName : uploadedFileName }
                    }
                } else {
                    if (thanhPhan.choPhepThemToKhai == true) {
                        return { ...thanhPhan, dinhKem: thanhPhan.dinhKem ? thanhPhan.dinhKem + ID_SEPARATE + uploadedFileName : uploadedFileName }
                    }
                }
                return thanhPhan
            })
        })
        Modal.info({
            closable: true,
            maskClosable: true,
            title: <>Thêm <span style={{ fontWeight: 700 }}>THÀNH CÔNG</span> tờ khai điện tử. Công dân <span style={{ fontWeight: 700 }}>KHÔNG CẦN</span> đính kèm thêm
                tờ khai giấy, không cần ký số vào tờ khai điện tử này.
            </>
        })
    }, [])

    const onChangeToKhai = useCallback((formData: any, s: any) => {
        form.setFieldValue("eFormData", formData.data)
        form.setFieldValue("eFormDataValid", formData.isValid)
        
        if ("LoaiToKhai" in formData.data) {
            form.setFieldValue("uyQuyen", formData.data.LoaiToKhai == "UyQuyen" ? false : true) // có người ủy quyền, reset hết dữ liệu chủ hồ sơ hiện tại
        }

        if (formData.changed) {
            const key = formData.changed.component.key
            const value = formData.changed.value

            if (key == "SoDienThoai") {
                form.setFieldValue("soDienThoaiChuHoSo", value)
            }
            else if (key == "Email") {
                form.setFieldValue("emailChuHoSo", value)
            }
            else if (key == "nycSoDienThoai") {
                form.setFieldValue("soDienThoaiNguoiUyQuyen", value)
            }
            else if (key == "nycEmail") {
                form.setFieldValue("emailNguoiUyQuyen", value)
            }
            else if (key == "LoaiToKhai") {
                form.setFieldValue("uyQuyen", value == "UyQuyen" ? false : true) // có người ủy quyền, reset hết dữ liệu chủ hồ sơ hiện tại
            }
            else if (key == "nycHoVaTen") {
                form.setFieldValue("nguoiUyQuyen", value)
            }
            else if (key == "HoVaTen" && !form.getFieldValue("uyQuyen")) {
                form.setFieldValue("chuHoSo", value)
            }
            else if (key == "SoGiayTo" && !form.getFieldValue("uyQuyen")) {
                form.setFieldValue("soGiayToChuHoSo", value)
            }
            else if (key == "NoiOHienTai" && !form.getFieldValue("uyQuyen")) {
                form.setFieldValue("diaChiChuHoSo", value)
            }
            else if (key == "NgaySinh" && !form.getFieldValue("uyQuyen")) {
                form.setFieldValue("ngaySinhChuHoSo", value)
            }
            // else if(key == "nycNoiOHienTai"){
            //     form.setFieldValue("diaChiChuHoSo", value)
            // }
        }

    }, [window.objDataCSDLDanCu])

    return <>
        {duLieuThemHoSo?.truongHopthuTuc.eForm && window.objDataCSDLDanCu !== undefined ? <Col data-icon={`SolutionOutlined`} data-description={"Biểu mẫu điện tử"} span={24} style={{ scrollMargin: 110 }} ref={(el) => el && stepRef.current[2] == null ? stepRef.current[2] = el : null}>
            <FormHeader>Tờ khai điện tử</FormHeader>
            <ToKhaiDienTu
                antdForm={form}
                form={duLieuThemHoSo.truongHopthuTuc.eForm}
                onChange={onChangeToKhai}
                onSaved={onSaveFileToThanhPhanThuTuc}
                showDownloadBtn
                showPrintBtn
                showSaveBtn
                hideCollapse={showEform}
                // defaultOpen={}
                templateUrl={duLieuThemHoSo.truongHopthuTuc.eFormTemplate}
            />
        </Col> : null}

        <Col span={24} style={{ scrollMargin: 110 }} data-icon={`FileAddOutlined`} data-description={"Thành phần hồ sơ"} className="tepTinDinhKem" ref={(el) => el && stepRef.current[3] == null ? stepRef.current[3] = el : null}>
            <FormHeader style={{ marginTop: 16 }}>Thành phần hồ sơ</FormHeader>
            {duLieuThemHoSo?.laThuTucChungThuc ?
                <ThanhPhanChungThucHoSo form={form} useKySoNEAC={true} /> :
                <>
                    <span style={{ color: "#0a4e78" }}>
                        Quý khách cung cấp các giấy tờ theo yêu cầu của Thành phần hồ sơ bên dưới, Nhấn vào chọn tệp, hoặc chọn từ kho số hóa
                        để thực hiện cung cấp các giấy tờ theo yêu cầu. Sau khi thực hiện xong, quý khách vui lòng kiểm tra lại toàn bộ thông tin
                        hồ sơ trước khi ấn nút Gửi hồ sơ
                    </span>
                    <AntdTable
                        rowKey={"id"}
                        columns={columns}
                        dataSource={dataSource}
                        footer={() => <AntdButton icon={<PlusCircleOutlined />} onClick={onAddRow}>Thêm thành phần</AntdButton>}
                        pagination={false}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={() => { }} />
                </>
            }

        </Col>

        {duLieuThemHoSo?.laThuTucChungThuc ? null : <Col span={24} style={{ scrollMargin: 110 }} data-icon={`EnvironmentOutlined`} data-description={"Đăng ký nhận kết quả"} ref={(el) => el && stepRef.current[4] == null ? stepRef.current[4] = el : null}>
            <DangKyNhanKetQuaTrucTuyen form={form} />
        </Col>}

        {tiepNhanHoSoContext.danhSachGiayToSoHoaModalVisible ? <DanhSachGiayToSoHoaModal form={form} /> : null}
    </>

}