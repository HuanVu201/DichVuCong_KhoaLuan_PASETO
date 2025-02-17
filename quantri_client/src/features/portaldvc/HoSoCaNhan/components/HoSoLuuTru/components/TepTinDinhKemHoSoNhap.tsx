import { TRANGTHAISOHOA } from "@/features/hoso/data/formData"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Col, Form, FormInstance, Modal } from "antd"
import { useCallback, useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'
import { IThanhPhanThuTucWithSoHoa } from "@/features/hoso/components/ReadOnlyTepDinhKem"
import { IHoSo } from "@/features/hoso/models"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { IGetDuLieuThemHoSo } from "@/features/truonghopthutuc/models"
import { ToKhaiDienTu } from "@/features/hoso/components/ToKhaiDienTu"
import { ID_SEPARATE } from "@/data"
import { ThanhPhanChungThucHoSo } from "@/features/hoso/components/actions/themMoiHoSoChungThuc/ThanhPhanHoSo"
import { DangKyNhanKetQuaHoSoNhap } from "./DangKyNhanKetQuaHoSoNhap"
import { FormHeader } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader"
import { DanhSachGiayToSoHoaModal } from "@/features/portaldvc/NopHoSoTrucTuyen/components/DanhSachGiayToSoHoa"
import { useTepDinhKemColumn } from "@/features/portaldvc/NopHoSoTrucTuyen/hooks/useTepDinhKem"
import { DangKyNhanKetQuaTrucTuyenHoSoNhap } from "./DangKyNhanKetQuaTrucTuyenHoSoNhap"

export const TepTinDinhKemHoSoNhap = ({ form, stepRef }: { stepRef: React.MutableRefObject<HTMLDivElement[]>; form: FormInstance<IHoSo> }) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanThuTuc>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<IThanhPhanThuTucWithSoHoa[]>([])
    const columns = useTepDinhKemColumn({ dataSource, setDataSource, form })
    const { duLieuThemHoSo } = useAppSelector((state) => state.truonghopthutuc)
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const { data: hoSoNhapData } = useAppSelector(state => state.hosonhap)
    const anThongTinLienHeNopTrucTuyen = duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen

    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {

        if (hoSoNhapData?.thanhPhanHoSos) {
            setDataSource(hoSoNhapData.thanhPhanHoSos.map(x => ({ ...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"], maGiayToKhoQuocGia: undefined, disabled: true, maGiayTo: x.maGiayTo } as any)))

        }
        else if (duLieuThemHoSo?.thanhPhanThuTucs) {
            setDataSource(duLieuThemHoSo.thanhPhanThuTucs.map(x => ({ ...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"], maGiayToKhoQuocGia: undefined, disabled: true, maGiayTo: x.ma })))
        }
        return () => {
            setDataSource([])
        }
    }, [duLieuThemHoSo?.thanhPhanThuTucs, hoSoNhapData?.thanhPhanHoSos])

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
            title: <><span style={{ fontWeight: 700 }}>THÊM TỜ KHAI THÀNH CÔNG !</span></>
        })
    }, [])

    const onChangeToKhai = useCallback((formData: any, s: any) => {
   

        form.setFieldValue("eFormData", formData.data)
        form.setFieldValue("eFormDataValid", formData.isValid)

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

    }, [hoSoNhapData])


    return <>
        {duLieuThemHoSo?.truongHopthuTuc.eForm && hoSoNhapData !== undefined ? <Col data-icon={`SolutionOutlined`} data-description={"Biểu mẫu điện tử"} span={24} style={{ scrollMargin: 110 }} ref={(el) => el && stepRef.current[2] == null ? stepRef.current[2] = el : null}>
            <FormHeader>Tờ khai điện tử</FormHeader>
            <ToKhaiDienTu
                submission={hoSoNhapData?.eFormData ? { data: JSON.parse(hoSoNhapData.eFormData) } : undefined}
                antdForm={form}
                form={duLieuThemHoSo.truongHopthuTuc.eForm}
                onChange={onChangeToKhai}
                onSaved={onSaveFileToThanhPhanThuTuc}
                showDownloadBtn
                showPrintBtn
                showSaveBtn
                hideCollapse={duLieuThemHoSo.truongHopthuTuc.anThongTinLienHeNopTrucTuyen == true}
                // defaultOpen={}
                templateUrl={duLieuThemHoSo.truongHopthuTuc.eFormTemplate}
            />
        </Col> : null}

        <Col span={24} style={{ scrollMargin: 110 }} data-icon={`FileAddOutlined`} data-description={"Thành phần hồ sơ"} className="tepTinDinhKem" ref={(el) => el && stepRef.current[3] == null ? stepRef.current[3] = el : null}>
            <FormHeader style={{ marginTop: 16 }}>Thành phần hồ sơ</FormHeader>
            {duLieuThemHoSo?.laThuTucChungThuc ?
                <ThanhPhanChungThucHoSo form={form} useKySoNEAC={true} /> :
                <>
                    <span style={{ color: "red", fontSize: '18px' }}>
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
        <Col span={24} style={{ scrollMargin: 110 }} data-icon={`EnvironmentOutlined`} data-description={"Đăng ký nhận kết quả"} ref={(el) => el && stepRef.current[4] == null ? stepRef.current[4] = el : null}>
            <DangKyNhanKetQuaTrucTuyenHoSoNhap form={form} />
        </Col>

        {tiepNhanHoSoContext.danhSachGiayToSoHoaModalVisible ? <DanhSachGiayToSoHoaModal form={form} /> : null}
    </>

}