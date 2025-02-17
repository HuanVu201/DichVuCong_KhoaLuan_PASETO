import { IDuLieuThongKeHoSo, IThongKeHoSoTrangChu } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices"
import { Form } from "antd"
import { CarouselRef } from "antd/es/carousel"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getTitle } from "../../home/components/ThongKeTrangThaiHoSo"
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME, YEAR } from "@/data"

export const useThongKe = () => {
    const [duLieuThongKes, setDuLieuThongKes] = useState<IDuLieuThongKeHoSo[][]>()
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
        ;(async () => {

            const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoTheoKy({tuNgay: dayjs(new Date(YEAR, 0, 1)).format("YYYY-MM-DD"), denNgay: dayjs(new Date(YEAR, 11, 31)).format("YYYY-MM-DD")})
            const chunkedData: IDuLieuThongKeHoSo[][] = []
            const chunkSize = 3;
            const calculateTotal = res.data.data.map((item) => ({...item, tongSoHoSo : item.hoSoTuKyTruoc + item.hoSoMoiTiepNhan}))
            for (let i = 0; i < calculateTotal.length; i += chunkSize) {
                chunkedData.push(calculateTotal.slice(i, i + chunkSize));
            }
            setDuLieuThongKes(chunkedData)
        })()
        
    }, [])

    useEffect(() => {
        ;(async () => {
            const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoTrangChu({tuNgay: dayjs(new Date(YEAR, 0, 1)).format("YYYY-MM-DD"), denNgay: dayjs(new Date(YEAR, 11, 31)).format("YYYY-MM-DD")})
            setPieChartData(res.data.data)
        })()
    }, [])

    useEffect(() => {
        const month = searchParams.get("thang") || undefined
        const year = searchParams.get("nam") || undefined
        if(month && year){
            setShowSearch(true)
            form.setFieldsValue({thang: month, nam: year})
        } else {
            setShowSearch(false)
        }
    }, [searchParams])

    const onFinish = (formData: any) => {
        console.log(formData);
        
        setSearchParams((curr) => {
            const urlQuery: Record<string, string> = {}
            curr.forEach((value, key) => {
            if(value !== undefined){
                urlQuery[key] = value
            }
            });
    
            Object.keys(formData).map((key) => {
            if(formData[key]){
                if(["maTinh", "maHuyen", "maXa"].includes(key)){
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

    const tongSoHoSoTrongNamChart = useMemo(() : any => {
        if(pieChartData){
            const dungHan = ((pieChartData.daHoanThanhDungHan || 0) / (pieChartData.daHoanThanhQuaHan + pieChartData.daHoanThanhDungHan) || 1) * 100
            const quaHan = 100 - dungHan
            return {
                title: {
                    text:""
                },
                subtitle: {
                    useHTML: true,
                    text: "Đúng hạn " + dungHan.toFixed(2) + "%",
                    floating: true,
                    style:{"fontWeight":"800"},
                    verticalAlign: 'middle',
                    y: 30
                },
            
                legend: {
                    enabled: false
                },
            
                tooltip: {
                    valueSuffix: ' %'
                },
                chart: {
                    width:225,
                    height:200,
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        colorByPoint: true,
                        type: 'pie',
                        size: '100%',
                        innerSize: '80%',
                        dataLabels: undefined,
                        name: "Tổng"
                        // dataLabels: {
                        //     enabled: true,
                        //     crop: false,
                        //     distance: '-10%',
                        //     style: {
                        //         fontWeight: 'bold',
                        //         fontSize: '16px'
                        //     },
                        //     connectorWidth: 0,
                        // },
                    }
                },
                colors: ['#4caf50', '#F8C4B4'],
                series: [
                    {
                        type: 'pie',
                        data: pieChartData ? [
                            {
                                name:"Đã hoàn thành đúng hạn",
                                y:+dungHan.toFixed(2)
                            },
                            {
                                name:"Đã hoàn thành quá hạn",
                                y:+quaHan.toFixed(2) 
                            }
                        ] : []
                    }
                ]
            }
        }
    }, [pieChartData])

    return {duLieuThongKes, carouselRef, onClickNext, onClickPrev, showSearch, form, onFinish, searchParams, onGoBack, tongSoHoSoTrongNamChart, pieChartData}
}