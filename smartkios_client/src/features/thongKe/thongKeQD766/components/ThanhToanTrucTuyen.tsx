import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThanhToanTrucTuyenParams } from "../models/ThongKeQD766Search";
import { SearchThanhToanTrucTuyen } from "../redux/action";
import { useThanhToanTrucTuyenContext, ThanhToanTrucTuyenContextProvider } from "../context/ThongKeQD766Context";
import {
    SearchOutlined,
    PrinterOutlined,
    DownOutlined,
    FileWordOutlined,
    FilePdfOutlined,
    FileExcelOutlined
} from "@ant-design/icons";
import { Select, Dropdown, Space, Form, DatePicker, Col, Row } from "antd";
import type { MenuProps } from 'antd';
import "../../ThongKe.scss"
import dayjs from 'dayjs'
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdSelect } from "@/lib/antd/components";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { Value } from "sass";
import { toast } from "react-toastify";


const loaiThoiGianThongKe = [
    { label: 'Cố định', value: "codinh" },
    { label: 'Bất kỳ', value: "batky" },
]
const thoiGianThongKe = [
    { label: 'Theo tháng', value: "thang" },
    { label: 'Theo quý', value: "quy" },
    { label: 'Theo năm', value: "nam" },
]
const thangs = [
    { label: 'Tháng 1', value: "thang1" },
    { label: 'Tháng 2', value: "thang2" },
    { label: 'Tháng 3', value: "thang3" },
    { label: 'Tháng 4', value: "thang4" },
    { label: 'Tháng 5', value: "thang5" },
    { label: 'Tháng 6', value: "thang6" },
    { label: 'Tháng 7', value: "thang7" },
    { label: 'Tháng 8', value: "thang8" },
    { label: 'Tháng 9', value: "thang9" },
    { label: 'Tháng 10', value: "thang10" },
    { label: 'Tháng 11', value: "thang11" },
    { label: 'Tháng 12', value: "thang12" },

]

const quys = [
    { label: 'Quý 1', value: 'quy1' },
    { label: 'Quý 2', value: 'quy2' },
    { label: 'Quý 3', value: 'quy3' },
    { label: 'Quý 4', value: 'quy4' },
]


const items: MenuProps['items'] = [
    // {
    //     label: <button onClick={() => { downloadPhieuWord('Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh') }} style={{ border: 'none', background: 'inherit' }}>
    //         <FileWordOutlined style={{ color: '#36a3f7' }} /> In file word</button>,
    //     key: 'word',
    // },
    // {
    //     type: 'divider',
    // },
    // {
    //     label: <button onClick={() => downloadPhieuPdf('Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh')} style={{ border: 'none', background: 'inherit' }}>
    //         <FilePdfOutlined style={{ color: 'red' }} /> In file pdf</button>,
    //     key: 'pdf',
    // },
    // {
    //     type: 'divider',
    // },
    {
        label: <button style={{ border: 'none', background: 'inherit' }}
            onClick={() => downloadPhieuExcel('Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh')}>
            <FileExcelOutlined style={{ color: 'green' }} /> In file excel</button>,
        key: 'excel',
    },
];
const ThanhToanTrucTuyen = () => {
    var ngayHienTai = new Date();
    var ngay = String(ngayHienTai.getDate()).padStart(2, '0');
    var thang = String(ngayHienTai.getMonth() + 1).padStart(2, '0');
    var nam = ngayHienTai.getFullYear();

    const thongKeHoSoContext = useThanhToanTrucTuyenContext();
    let [form] = Form.useForm<IThanhToanTrucTuyenParams>();
    const dispatch = useAppDispatch();
    const { datas: thongKeDatas, loading } = useAppSelector(
        (state) => state.ThongKeQD766
    );

    useEffect(() => {
        thongKeHoSoContext.setSearch({
            ...thongKeHoSoContext.search,
            pageNumber: 1,
            pageSize: 100,
            tuNgay: `${nam}-${thang}-01`,
            denNgay: `${nam}-${thang}-${ngay}`,
            type: "don-vi",
        });
    }, []);

    const [maDinhDanh, setMaDinhDanh] = useState<string>()
    const [displayDonVi, setDisplayDonVi] = useState<string>('none')
    const [displayTQN, setDisplayTQN] = useState<string>('none')
    const [displayThang, setDisplayThang] = useState<string>('none')
    const [displayQuy, setDisplayQuy] = useState<string>('none')
    const [displayNam, setDisplayNam] = useState<string>('none')
    const [displayDate, setDisplayDate] = useState<string>('none')
    const [mdThoiGianThongKe, setMdThoiGianThongKe] = useState(24)

    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    const { data: auth } = useAppSelector((state) => state.auth);
    let userData: IParseUserToken

    useEffect(() => {
        if (auth !== undefined) {
            userData = parseJwt(auth.token)
            if (userData.typeUser == "Admin")
                setDisplayDonVi('block')
            setMaDinhDanh(userData.maDinhDanh)
        }

    }, [auth])

    const onChangeLoai = (value: string) => {
        if (value == undefined) {
            setDisplayTQN('none')
            setDisplayThang('none')
            setDisplayQuy('none')
            setDisplayNam('none')
            setDisplayDate('none')
            setMdThoiGianThongKe(24)
            form.setFieldValue('thoigianthongketheo', undefined)
            form.setFieldValue('thang', undefined)
            form.setFieldValue('quy', undefined)
            form.setFieldValue('nam', undefined)
        }
        if (value == 'codinh') {
            setDisplayTQN('block')
            setDisplayThang('none')
            setDisplayQuy('none')
            setDisplayNam('none')
            setDisplayDate('none')
            setMdThoiGianThongKe(9)
        }
        if (value == 'batky') {
            setDisplayTQN('none')
            setDisplayThang('none')
            setDisplayQuy('none')
            setDisplayNam('none')
            setMdThoiGianThongKe(24)
            setDisplayDate('block')
            form.setFieldValue('thoigianthongketheo', undefined)
            form.setFieldValue('thang', undefined)
            form.setFieldValue('quy', undefined)
            form.setFieldValue('nam', undefined)
        }
    }

    const onChangeTQN = (value: string) => {
        if (value == 'thang') {
            setDisplayThang('block')
            setDisplayQuy('none')
            setDisplayNam('block')
            setMdThoiGianThongKe(9)
            form.setFieldValue('quy', undefined)
            form.setFieldValue('nam', undefined)
        }
        if (value == 'quy') {
            setDisplayThang('none')
            setDisplayQuy('block')
            setDisplayNam('block')
            setMdThoiGianThongKe(9)
            form.setFieldValue('thang', undefined)
            form.setFieldValue('nam', undefined)
        }
        if (value == 'nam') {
            setDisplayThang('none')
            setDisplayQuy('none')
            setDisplayNam('block')
            setMdThoiGianThongKe(14)
            form.setFieldValue('thang', undefined)
            form.setFieldValue('quy', undefined)

        }
        if (value == undefined) {
            setDisplayThang('none')
            setDisplayQuy('none')
            setDisplayNam('none')
            setMdThoiGianThongKe(9)
            form.setFieldValue('thang', undefined)
            form.setFieldValue('quy', undefined)
            form.setFieldValue('nam', undefined)
        }

    }


    useEffect(() => {
        (async () => {
            dispatch(SearchCoCauToChuc({ type: 'don-vi', cataLog: 'so-ban-nganh', pageSize: 200, pageNumber: 1 }));
        })();
    }, []);

    const cacDonVi = useMemo(() => {
        return coCauToChucs?.filter((coCau) => coCau.maDinhDanh !== null)
    }, [coCauToChucs])

    function getFirstDayOfMonth(year: any, month: any) {
        const firstDay: string = new Date(year, month - 1, 2).toISOString().split('T')[0].toString();
        return firstDay;
    }
    function getLastDayOfMonth(year: any, month: any) {
        const lastDay: string = new Date(year, month, 1).toISOString().split('T')[0].toString();
        return lastDay;
    }

    function getFirstAndLastDayOfQuarter(year: any, quarter: any) {
        const firstMonth = (quarter - 1) * 3 + 1;
        const firstDay = new Date(year, firstMonth - 1, 2).toISOString().split('T')[0].toString();
        const lastDay = new Date(year, firstMonth + 2, 1).toISOString().split('T')[0].toString();
        return { firstDay, lastDay };
    }

    const setSearchValue = () => {
        const donViData: any = form.getFieldValue('donvi') || maDinhDanh;
        let tuNgayData: string = '';
        let denNgayData: string = '';
        if (form.getFieldValue('loaithoigianthongke') == 'codinh') {
            if (form.getFieldValue('thoigianthongketheo') == 'thang') {
                if (form.getFieldValue('thang') && form.getFieldValue('nam')?.$y) {
                    const thang: string = form.getFieldValue('thang')
                    tuNgayData = getFirstDayOfMonth(form.getFieldValue('nam')?.$y, thang.replace('thang', ''))
                    denNgayData = getLastDayOfMonth(form.getFieldValue('nam')?.$y, thang.replace('thang', ''))
                }
                else {
                    if (!form.getFieldValue('thang')) {
                        toast.warning('Chưa chọn tháng!')
                    }
                    if (!form.getFieldValue('nam')) {
                        toast.warning('Chưa chọn năm!')
                    }

                }
            }
            if (form.getFieldValue('thoigianthongketheo') == 'quy') {
                if (form.getFieldValue('quy') && form.getFieldValue('nam')?.$y) {
                    const quy: string = form.getFieldValue('quy')
                    tuNgayData = getFirstAndLastDayOfQuarter(form.getFieldValue('nam')?.$y, quy.replace('quy', '')).firstDay
                    denNgayData = getFirstAndLastDayOfQuarter(form.getFieldValue('nam')?.$y, quy.replace('quy', '')).lastDay
                }
                else {
                    if (!form.getFieldValue('quy')) {
                        toast.warning('Chưa chọn quý!')
                    }
                    if (!form.getFieldValue('nam')) {
                        toast.warning('Chưa chọn năm!')
                    }

                }
            }
            if (form.getFieldValue('thoigianthongketheo') == 'nam') {
                if (!form.getFieldValue('nam')) {
                    toast.warning('Chưa chọn năm!')
                }
                else {
                    tuNgayData = getFirstDayOfMonth(form.getFieldValue('nam')?.$y, 1)
                    tuNgayData = getFirstDayOfMonth(form.getFieldValue('nam')?.$y, 12)
                }
            }
        } else {
            if (form.getFieldValue('loaithoigianthongke') == 'batky') {
                if (!form.getFieldValue('tuNgay') && !form.getFieldValue('denNgay')) {
                    toast.warning('Chưa chọn mốc thống kê!')
                }
                else {
                    if (form.getFieldValue('tuNgay') && !form.getFieldValue('denNgay')) {
                        const namData = dayjs(form.getFieldValue("tuNgay")).format("YYYY")
                        const thangData = dayjs(form.getFieldValue("tuNgay")).format("MM")
                        tuNgayData = dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
                        denNgayData = `${namData}-${thangData}-${ngay}`
                    }

                    if (!form.getFieldValue('tuNgay') && form.getFieldValue('denNgay')) {
                        const namData = dayjs(form.getFieldValue("denNgay")).format("YYYY")
                        const thangData = dayjs(form.getFieldValue("denNgay")).format("MM")
                        tuNgayData = `${namData}-${thangData}-01`
                        denNgayData = dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")
                    }
                }
            }
            else {
                tuNgayData = `${nam}-${thang}-01`
                denNgayData = `${nam}-${thang}-${ngay}`
            }
        }
        if (tuNgayData > denNgayData) {
            toast.warning('Ngày bắt đầu không hợp lệ!')
        }
        if (denNgayData > `${nam}-${thang}-${ngay}`) {
            toast.warning('Ngày kết thúc không hợp lệ!')
        }

        if (tuNgayData == '' && denNgayData == '') {
            toast.warning('Chưa chọn mốc thống kê!')
        }
        else {
            thongKeHoSoContext.setSearch({
                ...thongKeHoSoContext.search,
                maDinhDanhCha: donViData,
                tuNgay: tuNgayData,
                denNgay: denNgayData,
            });
        }
    };
    useEffect(() => {

        (async () => {
            if (thongKeHoSoContext.search.pageSize) {
                dispatch(SearchThanhToanTrucTuyen(thongKeHoSoContext.search));

            }
        })();
    }, [thongKeHoSoContext.search]);

    let dataHtmlForPdf = ''
    let dataHtmlForExcel = ''


    dataHtmlForPdf += "<tr>" +
        "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
        "<strong>I</strong>" +
        "</td>" +
        "<td colspan='6' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left'>" +
        "<strong>Sở, ban, ngành</strong>" +
        "</td>" +
        "</tr>"

    let demCapSoPdf = 0;
    let demCapHuyenPdf = 0;
    thongKeDatas?.forEach((item: any, index) => {
        if (item.catalog === 'so-ban-nganh') {
            demCapSoPdf += 1;
            dataHtmlForPdf += "<tr>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                demCapSoPdf +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                item.maDinhDanh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left' >" +
                item.tenThongKe +
                "</td>" +

                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                item.tongCoNghiaVuTaiChinh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; ' >" +
                item.daTTTTQuaDvcqg +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100 + "%"
                    : ""
                ) +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.abs(100 - Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100) + "%"
                    : ""
                ) +
                "</td>" +
                "</tr>"

        }
    })

    dataHtmlForPdf += "<tr>" +
        "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
        "<strong>II</strong>" +
        "</td>" +
        "<td colspan='6' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left'>" +
        "<strong>Cấp huyện (bao gồm các huyện, thị xã, thành phố và xã, phường, thị trấn)</strong>" +
        "</td>" +
        "</tr>"

    thongKeDatas?.forEach((item: any, index) => {
        if (item.catalog === 'quan-huyen') {
            demCapHuyenPdf += 1;
            dataHtmlForPdf += "<tr>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                demCapHuyenPdf +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                item.maDinhDanh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left' >" +
                item.tenThongKe +
                "</td>" +

                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                item.tongCoNghiaVuTaiChinh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; ' >" +
                item.daTTTTQuaDvcqg +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100 + "%"
                    : ""
                ) +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.abs(100 - Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100) + "%"
                    : ""
                ) +
                "</td>" +
                "</tr>"

        }
    })
    thongKeDatas?.forEach((item: any, index) => {
        if (item.catalog === 'xa-phuong') {
            demCapHuyenPdf += 1;
            dataHtmlForPdf += "<tr>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                demCapHuyenPdf +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                item.maDinhDanh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left' >" +
                item.tenThongKe +
                "</td>" +

                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                item.tongCoNghiaVuTaiChinh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; ' >" +
                item.daTTTTQuaDvcqg +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100 + "%"
                    : ""
                ) +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.abs(100 - Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100) + "%"
                    : ""
                ) +
                "</td>" +
                "</tr>"

        }
    })









    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    dataHtmlForExcel += "<tr>" +
        "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
        "<strong>I</strong>" +
        "</td>" +
        "<td colspan='6' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;'>" +
        "<strong>Sở, ban, ngành</strong>" +
        "</td>" +
        "</tr>"

    let demCapSoExcel = 0;
    let demCapHuyenExcel = 0;
    thongKeDatas?.forEach((item: any, index) => {
        if (item.catalog === 'so-ban-nganh') {
            demCapSoExcel += 1;
            dataHtmlForExcel += "<tr>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                demCapSoExcel +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.maDinhDanh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.tenThongKe +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.tongCoNghiaVuTaiChinh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; ; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.daTTTTQuaDvcqg +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100 + "%"
                    : ""
                ) +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.abs(100 - Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100) + "%"
                    : ""
                ) +
                "</td>" +
                "</tr>"

        }
    })

    dataHtmlForExcel += "<tr>" +
        "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
        "<strong>II</strong>" +
        "</td>" +
        "<td colspan='6' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;'>" +
        "<strong>Cấp huyện (bao gồm các huyện, thị xã, thành phố và xã, phường, thị trấn)</strong>" +
        "</td>" +
        "</tr>"

    thongKeDatas?.forEach((item: any, index) => {
        if (item.catalog === 'quan-huyen') {
            demCapHuyenExcel += 1;
            dataHtmlForExcel += "<tr>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                demCapHuyenExcel +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.maDinhDanh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.tenThongKe +
                "</td>" +

                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.tongCoNghiaVuTaiChinh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; ; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.daTTTTQuaDvcqg +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100 + "%"
                    : ""
                ) +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.abs(100 - Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100) + "%"
                    : ""
                ) +
                "</td>" +
                "</tr>"

        }
    })
    thongKeDatas?.forEach((item: any, index) => {
        if (item.catalog === 'xa-phuong') {
            demCapHuyenExcel += 1;
            dataHtmlForExcel += "<tr>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                demCapHuyenExcel +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.maDinhDanh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.tenThongKe +
                "</td>" +

                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.tongCoNghiaVuTaiChinh +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; ; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                item.daTTTTQuaDvcqg +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100 + "%"
                    : ""
                ) +
                "</td>" +
                "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 22px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
                ((item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh) > 0
                    ? Math.abs(100 - Math.round((item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh * 100) * 100) / 100) + "%"
                    : ""
                ) +
                "</td>" +
                "</tr>"

        }
    })


    return (<div className="thongKeSwapper">
        <div className="headerThongKe">
            <div className="title">
                <h6>BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN TRÊN ĐỊA BÀN TỈNH</h6>
            </div>
            <div className="actionButtons">
                <button className="btnThongKe"
                    onClick={setSearchValue}
                >
                    <span className="icon">
                        <SearchOutlined />
                    </span>
                    <span>Thống kê</span>
                </button>
                <div className="btnXuatBaoCao">
                    <span className="icon" >
                        <PrinterOutlined />
                    </span>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                In báo cáo
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div className="searchBlock">
            <Form
                layout="horizontal"
                form={form}
            >
                <Row gutter={[8, 8]}>
                    <Col md={24} style={{ display: displayDonVi }}>
                        <Form.Item
                            label="Đơn vị"
                            name="donvi"
                        >
                            <AntdSelect generateOptions={{ model: cacDonVi, value: "maDinhDanh", label: "groupName" }} showSearch allowClear placeholder='Chọn đơn vị thống kê' />
                        </Form.Item>
                    </Col>
                    <Col md={mdThoiGianThongKe} >
                        <Form.Item
                            label="Thời gian thống kê"
                            name="loaithoigianthongke"
                        >
                            <AntdSelect onChange={onChangeLoai} generateOptions={{ model: loaiThoiGianThongKe, value: "value", label: "label" }} allowClear placeholder="Loại thời gian" />
                        </Form.Item>
                    </Col>
                    <Col md={5} style={{ display: displayTQN }}>
                        <Form.Item
                            name="thoigianthongketheo"
                        >
                            <AntdSelect onChange={onChangeTQN} generateOptions={{ model: thoiGianThongKe, value: "value", label: "label" }} allowClear placeholder='Tháng/Quý/Năm' />
                        </Form.Item>
                    </Col>
                    <Col md={5} style={{ display: displayThang }}>
                        <Form.Item
                            name="thang"
                        >
                            <AntdSelect generateOptions={{ model: thangs, value: "value", label: "label" }} allowClear placeholder='Chọn tháng' />
                        </Form.Item>
                    </Col>
                    <Col md={5} style={{ display: displayQuy }}>
                        <Form.Item
                            name="quy"
                        >
                            <AntdSelect generateOptions={{ model: quys, value: "value", label: "label" }} allowClear placeholder='Chọn quý' />
                        </Form.Item>
                    </Col>
                    <Col md={5} style={{ display: displayNam }}>
                        <Form.Item
                            name="nam"
                        >
                            <DatePicker picker="year" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col md={24} style={{ display: displayDate }}>
                        <Form form={form} layout="horizontal" className='formSearch'>
                            <Form.Item label="Từ ngày" name="tuNgay">
                                <DatePicker placeholder="Chọn ngày" format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item label="Đến ngày" name="denNgay">
                                <DatePicker placeholder="Chọn ngày" format={'DD/MM/YYYY'} />
                            </Form.Item>
                        </Form>

                    </Col>
                </Row>
            </Form>
        </div>
        <div id="ContainerSwapper" style={{ fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
            <table id="table" style={{ verticalAlign: 'middle', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
                {/* <thead> */}
                <tr>
                    <td colSpan={7} style={{ verticalAlign: 'middle', padding: '5px' }}>
                        <strong>THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG<br /> NGÀY 23/06/2022</strong>
                    </td>
                </tr>
                <tr>
                    <td colSpan={7} style={{ verticalAlign: 'middle', padding: '5px' }}>
                        <strong>(Thống kê hàng tháng, quý, 6 tháng, 9 tháng, năm, hàng năm)</strong>
                    </td>
                </tr>
                <tr>
                    <td colSpan={7} style={{ verticalAlign: 'middle', padding: '5px' }}>
                        <strong></strong>
                    </td>
                </tr>
                <tr>
                    <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>STT</strong>
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Mã định danh</strong>
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Tên đơn vị</strong>
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Tổng HS có nghĩa vụ tài chính</strong>
                    </td>
                    <td colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Thanh toán trực tuyến trên Cổng DVC Quốc gia</strong>
                    </td>
                </tr>
                <tr>
                    <td style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Số HS đã TTTT cổng DVC QG</strong>
                    </td>
                    <td style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Tỷ lệ TTTT cổng DVC QG (%)</strong>
                    </td>
                    <td style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333' }}>
                        <strong>Tỷ lệ TT trực tiếp (%)</strong>
                    </td>
                </tr>

                {/* </thead> */}
                <tbody id="data" dangerouslySetInnerHTML={{ __html: dataHtmlForPdf || "Không có dữ liệu!" }} />

            </table>

        </div>
        {/* ///////////////////////////////////////// */}

        <table id="tableToExcel" style={{ display: 'none', verticalAlign: 'middle', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
            {/* <thead> */}
            <tr>
                <td colSpan={7} style={{ verticalAlign: 'middle', padding: '5px', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '24px' }}>
                    <strong>THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG<br /> NGÀY 23/06/2022</strong>
                </td>
            </tr>
            <tr>
                <td colSpan={7} style={{ verticalAlign: 'middle', padding: '5px', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>(Thống kê hàng tháng, quý, 6 tháng, 9 tháng, năm, hàng năm)</strong>
                </td>
            </tr>
            <tr>
                <td colSpan={7} style={{ verticalAlign: 'middle', padding: '5px' }}>
                    <strong></strong>
                </td>
            </tr>
            <tr>
                <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>STT</strong>
                </td>
                <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Mã định danh</strong>
                </td>
                <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Tên đơn vị</strong>
                </td>
                <td rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Tổng HS có nghĩa vụ tài chính</strong>
                </td>
                <td colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Thanh toán trực tuyến trên Cổng DVC Quốc gia</strong>
                </td>
            </tr>
            <tr>
                <td style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Số HS đã TTTT cổng DVC QG</strong>
                </td>
                <td style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Tỷ lệ TTTT cổng DVC QG (%)</strong>
                </td>
                <td style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #333', textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", fontSize: '22px' }}>
                    <strong>Tỷ lệ TT trực tiếp (%)</strong>
                </td>
            </tr>

            {/* </thead> */}
            <tbody id="data" dangerouslySetInnerHTML={{ __html: dataHtmlForExcel || "Không có dữ liệu!" }} />
        </table>

    </div >
    );
}



function ThanhToanTrucTuyenSwapper() {
    return (
        <ThanhToanTrucTuyenContextProvider>
            <ThanhToanTrucTuyen />
        </ThanhToanTrucTuyenContextProvider>
    );
}
export default ThanhToanTrucTuyenSwapper