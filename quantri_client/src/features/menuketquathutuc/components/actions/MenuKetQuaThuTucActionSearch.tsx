import { Form, Input, Space, Row, Col, Select, DatePicker, Checkbox } from "antd"
import { useCallback, useEffect, useMemo } from "react"
import { ISearchThuTuc, IThuTuc } from "@/features/thutuc/models"
import { useMenuKetQuaThuTucContext } from "../../contexts/MenuKetQuaThuTucContext"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useSearchParams } from "react-router-dom"
import { ExportExcel } from "@/lib/xlsx/ExportExcel"
import { useAppSelector } from "@/lib/redux/Hooks"
import { GIAYTOSOHOA_LOAISOHOA } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { filterOptions } from "@/utils"

export const MenuKetQuaThuTucActionSearch = ({ setSearchParams, resetSearch, giayToSoHoas, hideXuatDanhSach }: { hideXuatDanhSach: boolean; giayToSoHoas: IGiayToSoHoa[] | undefined; resetSearch: () => void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>> }) => {
    const [form] = Form.useForm()
    const { datas: menuKetQuaThuTucs } = useAppSelector(state => state.menuketquathutuc)
    const [urlSearchParams] = useSearchParams()

    useEffect(() => {
        const maKetQuaTTHC = urlSearchParams.get("MaKetQuaTTHC")
        if (maKetQuaTTHC) {
            resetSearchParams()
        }

    }, [urlSearchParams])

    const onFinish = (values: ISearchGiayToSoHoa) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        resetSearch()
        form.resetFields()
    }, [urlSearchParams])

    const formatedExcelData = useMemo(() => {
        return giayToSoHoas?.map(({ ten, thoiGianSoHoa, thoiHanHieuLuc, fullName, ...rest }) => {
            return {
                ten,
                thoiGianSoHoa: thoiGianSoHoa ? dayjs(thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : "",
                thoiHanHieuLuc: thoiHanHieuLuc ? dayjs(thoiHanHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : "",
                fullName,
                tenDonVi: (rest as any)["groupName"],
                loaiSoHoa: (GIAYTOSOHOA_LOAISOHOA as any)[rest.loaiSoHoa],
            }
        })
    }, [giayToSoHoas])

    const title = useMemo(() => {
        const maDonVi = urlSearchParams.get("MaDonVi")
        const tenDonVi = menuKetQuaThuTucs?.find((menu) => menu.maDonVi == maDonVi)?.tenDonVi
        return tenDonVi ? "Danh sách giấy tờ " + tenDonVi : "Danh sách giấy tờ"
    }, [urlSearchParams])
    return (
        <CollapseContent
            defaultVisible
            extraButtons={hideXuatDanhSach ? undefined : [
                <ExportExcel
                    data={formatedExcelData}
                    fileName="DanhSachGiayTo"
                    sheetName="Danh sách giấy tờ"
                    title={title}
                    header={["STT", "Tên giấy tờ", "Thời gian số hóa", "Thời hạn hiệu lực", "Người số hóa", "Tên đơn vị", "Loại số hóa"]}
                // mergeData={["STT", "Tên giấy tờ", "Thời gian số hóa", "Thời hạn hiệu lực", "Người số hóa", "Tên đơn vị", "Loại số hóa"]}
                // mergeOpts={[]}
                />
                //   <AntdButton onClick={() => {menuKetQuaThuTucContext.setGiayToSoHoaModalVisible(true)}}>Thêm mới</AntdButton>
            ]}
        >
            <Form className='search-form' name='GiayToSoHoaActionSearch' layout="vertical" onFinish={onFinish} form={form} initialValues={{ daHetHan: undefined }}>
                <div className="search-form-content">
                    <Row gutter={[16, 5]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Từ khóa"
                                name="searchKeys"
                            >
                                <Input placeholder="Nhập mã hồ sơ hoặc tên chủ hồ sơ" />
                            </Form.Item>
                        </Col>
                        <Col md={8} span={24}>
                            <Form.Item
                                label="Thời hạn giấy tờ"
                                name="daHetHan"
                            >
                                <Select options={[{ value: true, label: "Đã hết hạn" }, { value: false, label: "Còn hạn" }] as any} showSearch allowClear filterOption={filterOptions} />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Số định danh"
                                name="maDinhDanh"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mã giấy tờ"
                                name="ma"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Từ ngày"
                                name="tuNgay"
                            >
                                <DatePicker style={{ width: '300px' }} format={FORMAT_DATE_WITHOUT_TIME} ></DatePicker>
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Đến ngày"
                                name="denNgay"
                            >
                                <DatePicker style={{ width: '300px' }} format={FORMAT_DATE_WITHOUT_TIME}  ></DatePicker>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item>
                        <Row justify="space-around">
                            <Space size="large">
                                <AntdButton type="primary" htmlType="submit" >
                                    Xác nhận
                                </AntdButton>
                                <AntdButton type="default" onClick={resetSearchParams}>
                                    Tải lại
                                </AntdButton>
                            </Space>
                        </Row>
                    </Form.Item>
                </div>

            </Form>
        </CollapseContent>
    )
}