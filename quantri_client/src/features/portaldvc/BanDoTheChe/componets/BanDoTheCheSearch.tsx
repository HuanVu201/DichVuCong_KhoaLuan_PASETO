import { AntdSelect } from "@/lib/antd/components";
import { Select, Space, Input, Form, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSoLieuBaoCaoContext } from "../contexts";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";

const nhomChiTieus = [
    { label: <b>Tổng hợp</b>, value: 'tongHop' },
    { label: <b>Công khai, minh bạch</b>, value: 'congKhaiMinhBach' },
    { label: <b>Tiến độ giải quyết</b>, value: 'tienDoGiaiQuyet' },
    {
        label: <b>Dịch vụ trực tuyến</b>,
        options: [
            { label: <p>Dịch vụ công trực tuyến</p>, value: 'dvcTrucTuyen' },
            { label: <p>Thanh toán trực tuyến</p>, value: 'thanhToanTrucTuyen' },
        ],
    },
    // { label: <b>Mức độ hài lòng</b>, value: 'mucDoHaiLong' },
    { label: <b>Số hóa hồ sơ</b>, value: 'soHoaHoSo' },

]

const loaiThoiGians = [
    { label: <p>Tháng</p>, value: 'Tháng' },
    { label: <p>Quý</p>, value: 'Quý' },
    { label: <p>Năm</p>, value: 'Năm' },
]

function BanDoTheCheSearch() {
    let [form] = Form.useForm<any>();
    const soLieuContext = useSoLieuBaoCaoContext()
    const dispatch = useAppDispatch()
    const { datas: cocautochucs } = useAppSelector(state => state.cocautochuc)
    const [months, setMonths] = useState<{ label: string, value: number }[] | undefined>()
    const [quarters, setQuarters] = useState<{ label: string, value: number }[] | undefined>()
    const [years, setYears] = useState<{ label: string, value: number }[] | undefined>()
    const [currYearSelect, setCurrYearSelect] = useState<number>()
    const [loaiThoiGianSelect, setLoaiThoiGianSelect] = useState<string>()

    useEffect(() => {
        (async () => {
            form.setFieldValue('nhomChiTieu', nhomChiTieus[0].value)
            form.setFieldValue('loaiThoiGian', loaiThoiGians[loaiThoiGians.length - 1].value)
            form.setFieldValue('namInput', new Date().getFullYear())
            setCurrYearSelect(new Date().getFullYear())
            setLoaiThoiGianSelect(loaiThoiGians[loaiThoiGians.length - 1].value)
            soLieuContext.setSearchParams({
                ...soLieuContext.searchParams,
                loaiThoiGian: loaiThoiGians[loaiThoiGians.length - 1].value,
                nam: new Date().getFullYear(),
                ky: 0
            })
            soLieuContext.setNhomChiTieu(nhomChiTieus[0].value)


            const startYear = 2024;
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const yearsArr: any = []

            for (let year = currentYear - 3 >= startYear ? currentYear - 3 : startYear; year <= currentYear && yearsArr.length < 3; year++) {
                yearsArr.push({
                    label: <p>Năm {year}</p>,
                    value: year,
                });
            }
            if (yearsArr.length > 0) {
                setYears(yearsArr as any)
            } else toast.error("Lỗi lấy số liệu năm!")

            dispatch(
                SearchCoCauToChuc({
                    type: "don-vi",
                    pageNumber: 1,
                    pageSize: 10000,
                    orderBy: ["GroupOrder", "MaDinhDanh",],
                    hasMaDinhDanh: true
                })
            );
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (currYearSelect) {
                soLieuContext.setLoading(true)
                const startMonth = 7; // Tháng 7
                const startYear = 2024;
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1; // Lấy tháng hiện tại
                const currentYear = currentDate.getFullYear();

                const monthsArr = []
                const quartersArr = []

                if (currentYear >= startYear && form.getFieldValue('loaiThoiGian') == 'Tháng') {
                    let monthStart
                    let monthEnd

                    if (startYear === currYearSelect) {
                        monthStart = startMonth
                        monthEnd = currYearSelect == currentYear ? currentMonth : 12
                    } else if (startYear < currYearSelect) {
                        monthStart = 1
                        monthEnd = currentMonth
                    }

                    if (monthStart && monthEnd)
                        for (let month = monthStart; month < monthEnd; month++) {
                            monthsArr.push({
                                label: <p>Tháng {month}</p>,
                                value: month,
                            });
                        }

                    if (monthsArr.length > 0) {
                        setMonths(monthsArr as any)
                        toast.info("Chọn tháng tra cứu!")
                    } else
                        toast.warning(`Không có thông tin cụ thể của các tháng năm ${currYearSelect}`)
                }

                if (currentYear >= startYear && form.getFieldValue('loaiThoiGian') == 'Quý') {
                    let quarterStart
                    let quarterEnd

                    if (startYear === currYearSelect) {
                        quarterStart = 3
                        quarterEnd = 4
                    } else if (startYear < currYearSelect) {
                        quarterStart = 1
                        quarterEnd = 4
                    }

                    if (quarterStart && quarterEnd)
                        for (let quarter = quarterStart; quarter <= quarterEnd; quarter++) {
                            quartersArr.push({
                                label: <p>Quý {quarter}</p>,
                                value: `${quarter}`,
                            });
                        }

                    if (quartersArr.length > 0) {
                        setQuarters(quartersArr as any)
                        toast.info("Chọn quý tra cứu!")
                    } else
                        toast.warning(`Không có thông tin cụ thể của các quý năm ${currYearSelect}`)
                }

                soLieuContext.setLoading(false)
            }
        })()
    }, [currYearSelect, loaiThoiGianSelect])

    const onChangeLoaiThoiGian = (value: string) => {
        form.setFieldValue('thangInput', undefined)
        form.setFieldValue('quyInput', undefined)
        form.setFieldValue('namInput', new Date().getFullYear())
        setMonths(undefined)
        setQuarters(undefined)
        setCurrYearSelect(new Date().getFullYear())
        setLoaiThoiGianSelect(value)

        soLieuContext.setSearchParams({
            ...soLieuContext.searchParams,
            loaiThoiGian: value,
            ky: value == 'Năm' ? 0 : undefined,
            nam: currYearSelect
        })
    }
    const onChangeNam = (value: number) => {
        setMonths(undefined)
        setQuarters(undefined)
        form.setFieldValue('thangInput', undefined)
        form.setFieldValue('quyInput', undefined)

        if (loaiThoiGianSelect === 'Năm')
            soLieuContext.setSearchParams({
                ...soLieuContext.searchParams,
                nam: value, ky: 0
            })

        setCurrYearSelect(value)
    }
    const onChangeThang = (value: number) => {
        soLieuContext.setSearchParams({
            ...soLieuContext.searchParams,
            loaiThoiGian: form.getFieldValue('loaiThoiGian'),
            ky: value
        })
    }
    const onChangeQuy = (value: number) => {
        soLieuContext.setSearchParams({
            ...soLieuContext.searchParams,
            loaiThoiGian: form.getFieldValue('loaiThoiGian'),
            ky: value
        })
    }
    const onChangeDonVi = (value: string) => {
        soLieuContext.setSearchParams({
            ...soLieuContext.searchParams,
            loaiThoiGian: form.getFieldValue('loaiThoiGian'),
            maDinhDanh: value || undefined,
            catalog: cocautochucs ? cocautochucs.filter(x => x.maDinhDanh == value)[0].catalog : undefined,
        })
    }

    return (<>
        <div className="dashboardSearch ">
            <Form form={form} name="dashboardSearchBlock" layout="vertical">
                <div className="row">
                    <div className="col-md-2 col-6" >
                        <Form.Item name="nhomChiTieu" label="Nhóm chỉ tiêu">
                            <Select
                                options={nhomChiTieus}
                                allowClear={false}
                                showSearch={false}
                                placeholder="Chọn nhóm chỉ tiêu"
                                onChange={(value: string) => {
                                    soLieuContext.setNhomChiTieu(value)
                                }}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-md-2 col-6" >
                        <Form.Item name="loaiThoiGian" label="Loại thời gian">
                            <Select
                                options={loaiThoiGians}
                                allowClear={false}
                                showSearch={false}
                                placeholder="Chọn loại thời gian"
                                onChange={onChangeLoaiThoiGian}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-md-2 col-6" hidden={form.getFieldValue('loaiThoiGian') != 'Tháng'}>
                        <Form.Item name="thangInput" label="Tháng">
                            <Select
                                options={months}
                                allowClear={false}
                                showSearch={false}
                                placeholder="Chọn tháng"
                                onChange={onChangeThang}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-md-2 col-6" hidden={form.getFieldValue('loaiThoiGian') != 'Quý'}>
                        <Form.Item name="quyInput" label="Quý">
                            <Select
                                options={quarters}
                                allowClear={false}
                                showSearch={false}
                                placeholder="Chọn quý"
                                onChange={onChangeQuy}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-md-2 col-6" >
                        <Form.Item name="namInput" label="Năm">
                            <Select
                                options={years}
                                allowClear={false}
                                showSearch={false}
                                placeholder="Chọn năm"
                                onChange={onChangeNam}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-md-3 col-6" >
                        <Form.Item name="maDinhDanh" label="Đơn vị">
                            <AntdSelect
                                generateOptions={{
                                    model: cocautochucs,
                                    value: "maDinhDanh",
                                    label: "groupName",
                                }}
                                allowClear={true}
                                showSearch
                                placeholder="Tất cả"
                                onChange={onChangeDonVi}
                            />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    </>);
}

export default BanDoTheCheSearch;