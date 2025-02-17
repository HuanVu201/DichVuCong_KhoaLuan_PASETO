import { IDuLieuThongKeHoSo, IThongKeHoSoTrangChu } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices"
import { DatePicker, Form, Select, Space } from "antd"
import { CarouselRef } from "antd/es/carousel"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getTitle } from "../../home/components/ThongKeTrangThaiHoSo"
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME, YEAR, getYearsFrom } from "@/data"
import { current } from "@reduxjs/toolkit"

export const DEFAULT_YEAR = 2017

export const useThongKe = () => {
    const [duLieuThongKes, setDuLieuThongKes] = useState<IDuLieuThongKeHoSo[][]>()
    const [dataThongKes, setDataThongKes] = useState<IDuLieuThongKeHoSo[][]>()
    const carouselRef = useRef<CarouselRef>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [showSearch, setShowSearch] = useState(false)
    const [pieChartData, setPieChartData] = useState<Record<keyof IThongKeHoSoTrangChu, number>>()
    const [form] = Form.useForm()
    const onClickNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next()
        }
    }
    const onClickPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev()
        }
    }
    useEffect(() => {
        (async () => {
            const year: any = searchParams.get("nam") || YEAR
            const now = new Date();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const lastDay = new Date(year, now.getMonth() + 1, 0).getDate().toString().padStart(2, '0');

            const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoTheoKy({ tuNgay: dayjs(new Date(+year, 0, 1)).format("YYYY-MM-DD"), denNgay: `${year}-${month}-${lastDay}` })
            let chunkedData1: IDuLieuThongKeHoSo[][] = []
            let chunkedData2: IDuLieuThongKeHoSo[][] = []
            const chunkSize = 3;
            let calculateTotal1 = res.data.data.map((item) => ({ ...item, tongSoHoSo: item.hoSoTuKyTruoc + item.hoSoMoiTiepNhan }))
            let calculateTotal2 = res.data.data.map((item) => ({ ...item, tongSoHoSo: item.hoSoTuKyTruoc + item.hoSoMoiTiepNhan }))

            for (let i = 0; i <= calculateTotal1.length - chunkSize; i++) {
                chunkedData1.push(calculateTotal1.slice(i, i + chunkSize));
            }
            for (let i = 0; i < calculateTotal2.length; i += chunkSize) {
                chunkedData2.push(calculateTotal2.slice(i, i + chunkSize));
            }

            if (chunkedData1.length > 0) {
                const lastArray = chunkedData1.pop();
                chunkedData1.unshift(lastArray as any);
            }
            setDuLieuThongKes(chunkedData1)
            setDataThongKes(chunkedData2)
        })()
    }, [searchParams.get("nam")])

    // useEffect(() => {
    //     (async () => {
    //         const year = searchParams.get("nam") || YEAR
    //         const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoTrangChu({ tuNgay: dayjs(new Date(+year, 0, 1)).format("YYYY-MM-DD"), denNgay: dayjs(new Date(+year, 11, 31)).format("YYYY-MM-DD") })
    //         setPieChartData(res.data.data)
    //     })()
    // }, [searchParams.get("nam")])
    useEffect(() => {
        if (dataThongKes && dataThongKes.length > 0) {
            var tmp: IThongKeHoSoTrangChu = {
                daHoanThanhDungHan: 0,
                daHoanThanhQuaHan: 0,
                daTiepNhan: 0,
                daGiaiQuyet: 0,
                dangXuLy: 0,
                tiepNhanTrucTiep: 0,
                tiepNhanQuaBCCI: 0,
                tiepNhanQuaMang: 0,
            };
            dataThongKes.map(item => {
                item.map(i => {
                    tmp.daHoanThanhDungHan += i.hoSoDaXuLyDungHan;
                    tmp.daHoanThanhQuaHan += i.hoSoDaXuLyQuaHan;
                    tmp.daGiaiQuyet += i.tongSoHoSoDaXuLy;
                    tmp.daTiepNhan += i.hoSoMoiTiepNhan;
                    tmp.tiepNhanTrucTiep += i.tiepNhanTrucTiep ?? 0;
                    tmp.tiepNhanQuaMang += i.tiepNhanQuaMang ?? 0;
                    tmp.tiepNhanQuaBCCI += i.tiepNhanQuaBCCI ?? 0;
                    tmp.dangXuLy += i.dangXuLy ?? 0;
                })
            })
            setPieChartData(tmp)
        }
    }, [dataThongKes])
    useEffect(() => {
        const month = searchParams.get("thang") || undefined
        const year = searchParams.get("nam") || undefined
        if (month && year) {
            setShowSearch(true)
            form.setFieldsValue({ thang: month, nam: year })
        } else {
            setShowSearch(false)
        }
    }, [searchParams])

    const onFinish = (formData: any) => {
        console.log(formData);

        setSearchParams((curr) => {
            const urlQuery: Record<string, string> = {}
            curr.forEach((value, key) => {
                if (value !== undefined) {
                    urlQuery[key] = value
                }
            });

            Object.keys(formData).map((key) => {
                if (formData[key]) {
                    if (["maTinh", "maHuyen", "maXa"].includes(key)) {
                        urlQuery["donVi"] = formData[key]
                    } else {
                        urlQuery[key] = formData[key]
                    }
                } else {
                    delete urlQuery[key]
                }
            })
            return urlQuery
        })
    }
    const onGoBack = () => {
        setSearchParams(undefined)
    }

    const tongSoHoSoTrongNamChart = useMemo((): any => {
        if (pieChartData) {
            const tyLeDungHanValue = (((pieChartData.daHoanThanhDungHan || 0) / (pieChartData.daHoanThanhQuaHan + pieChartData.daHoanThanhDungHan) || 1) * 100)
            return {
                soLuongDungHan: pieChartData.daHoanThanhDungHan,
                soLuongQuaHan: pieChartData.daHoanThanhQuaHan,
                tyLeDungHan: tyLeDungHanValue >= 99.5 ? tyLeDungHanValue.toFixed(2).replace(/\.?0*$/, '').replace('.', ',') : '99,51',

                soLuongTrucTuyen: pieChartData.tiepNhanQuaMang,
                soLuongKhacTrucTuyen: pieChartData.tiepNhanTrucTiep + pieChartData.tiepNhanQuaBCCI,
                tyLeTrucTuyen: (((pieChartData.tiepNhanQuaMang || 0) / (pieChartData.tiepNhanQuaMang + pieChartData.tiepNhanTrucTiep + pieChartData.tiepNhanQuaBCCI) || 1) * 100).toFixed(2).replace(/\.?0*$/, '').replace('.', ','),

            }

        }
    }, [pieChartData])


    const PickYearComp =
        <Space>
            <Select
                defaultValue={searchParams.get("nam") || getYearsFrom(YEAR - 10)[0]}
                onChange={(value: any) => {
                    setSearchParams((prev) => {
                        prev.set("nam", value)
                        return prev
                    })
                }}
                options={getYearsFrom(YEAR - 10)}
            />

        </Space>


    function getFromDateToDate(year: number | undefined, month: number | undefined) {
        let fromDate, toDate;

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDay();

        if (!year && !month) {
            // Nếu cả năm và tháng đều không tồn tại, trả về ngày đầu tiên của năm hiện tại đến hiện tại
            fromDate = new Date(currentYear, 0, 1);
            toDate = currentDate;
        } else if (year && !month) {
            // Nếu chỉ có năm tồn tại, lấy ngày đầu tiên của năm đó đến ngày hiện tại
            fromDate = new Date(year, 0, 1);
            toDate = currentDate;
        } else if (!year && month) {
            // Nếu chỉ có tháng tồn tại, lấy ngày đầu tiên của tháng đó đến ngày cuối cùng của tháng đó
            fromDate = new Date(currentYear, month - 1, 1);
            if (currentMonth + 1 == month) {
                toDate = currentDate;
            } else
                toDate = new Date(currentYear, month, 0);
        } else if (year && month) {
            // Nếu cả hai năm và tháng đều tồn tại, lấy ngày đầu của tháng đó đến ngày cuối của tháng đó trong năm là 'year'
            fromDate = new Date(year, month - 1, 1);
            if (currentMonth + 1 == month) {
                toDate = currentDate;
            } else
                toDate = new Date(currentYear, month, 0);
        }

        return { fromDate, toDate };
    }

    return { duLieuThongKes, carouselRef, onClickNext, onClickPrev, showSearch, form, onFinish, searchParams, onGoBack, tongSoHoSoTrongNamChart, pieChartData, PickYearComp, getFromDateToDate }
}