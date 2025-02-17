import { useEffect, useState } from "react"
import { AntdTable, AntdSpace, AntdDivider } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { IConfigApiString, ILienThongQLVB, IQLVBSearchParams } from "../../models"
import { LienThongQLVBProvider, useLienThongQLVBContext } from "../../context"
import { useVanBanColumn } from "../../hooks/useVanBanColumn"
import axiosInstance from "@/lib/axios"
import axios from "axios"
import { CURRENTTIME, HOST_PATH } from "@/data"
import { VanBanDetail } from "./VanBanDetail"
import { VanBanLienThongQLVBSearch } from "./VanBanSearch"
import { getCurrencyThongKe } from "@/utils"

const VanBanTable = () => {
    const [vanBanData, setVanBanData] = useState<ILienThongQLVB[]>()
    const [thongKeData, setThongKeData] = useState<[
        {
            LoaiThongKe: string,
            SoLuong: number
        }
    ]>()

    const { publicModule: config } = useAppSelector(state => state.config)
    const qlvbContext = useLienThongQLVBContext()
    const { columns } = useVanBanColumn({ pageNumber: 1, pageSize: 50 })
    const [searchParams, setSearchParams] = useState<IQLVBSearchParams>({
        draw: 2,
        columns: [],
        order: [],
        start: 0,
        length: 1000000,
        search: {
            value: "",
            regex: false
        },
        TuNgay: '',
        DenNgay: '',
        XLTuNgay: '',
        XLDenNgay: '',
        TrangThai: null,
        LoaiGuiNhan: null,
        LoaiGoiTin: 'Văn bản',
        TrongNgay: ''
    })


    useEffect(() => {
        qlvbContext.setLoading(true)
        config?.map((item: any) => {
            if (item.code == 'config-lien-thong-qlvb') {
                qlvbContext.setConfigApiString(JSON.parse(item.content))
                qlvbContext.setLoading(false)
            }

        })
    }, [config])

    useEffect(() => {
        if (qlvbContext.configApiString) {
            searchGoiTin()
        }
    }, [searchParams])

    useEffect(() => {
        if (qlvbContext.reload) {
            searchGoiTin()
            qlvbContext.setReload(false)
        }
    }, [qlvbContext.reload])


    const searchGoiTin = async () => {
        qlvbContext.setLoading(true)
        const axiosCustomQlvb = axios.create({
            baseURL: HOST_PATH,
            headers: {
                'Authorization': `Bearer ${qlvbContext.configApiString?.token}`
            },
        })

        try {
            const response = await axiosCustomQlvb.post(`${qlvbContext.configApiString?.urlapi}/lienthonghsqlvb/DuLieus/search`, searchParams, {
                headers: {}
            });

            if (response.data) {
                setVanBanData(response.data.data)
            }

        } catch (error) {
            console.error('Error /lienthonghsqlvb/DuLieus/search:', error);
        }

        qlvbContext.setLoading(false)
    }

    useEffect(() => {
        (async () => {
            if (!thongKeData && qlvbContext.configApiString) {
                qlvbContext.setLoading(true)
                const axiosCustomQlvb = axios.create({
                    baseURL: HOST_PATH,
                    headers: {
                        'Authorization': `Bearer ${qlvbContext.configApiString?.token}`
                    },
                })
                try {
                    const response = await axiosCustomQlvb.get(`${qlvbContext.configApiString?.urlapi}/lienthonghsqlvb/ThongkeGoiTin?trongNgay=0`);

                    if (response.data) {
                        setThongKeData(response.data.data)
                    }

                } catch (error) {
                    console.error('Error /lienthonghsqlvb/ThongkeGoiTin?trongNgay=0:', error);
                }

                qlvbContext.setLoading(false)
            }
        })()
    }, [qlvbContext.configApiString])


    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={qlvbContext.loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <p><b>Hồ sơ chưa nhận về: {thongKeData ? getCurrencyThongKe(thongKeData?.filter(x => x.LoaiThongKe == 'HoSoKhoiTao')[0].SoLuong) : '...'} hồ sơ</b></p>
                    <p><b>Văn bản chưa nhận về: {thongKeData ? getCurrencyThongKe(thongKeData?.filter(x => x.LoaiThongKe == 'VanBanKhoiTao')[0].SoLuong) : '...'} văn bản</b></p>
                    <p><i>(Dữ liệu được tính đến thời điểm {CURRENTTIME})</i></p>
                    <AntdDivider />
                    <VanBanLienThongQLVBSearch setSearchParams={setSearchParams} />
                    {/* <VanBanSearch setSearchParams={setSearchParams} /> */}
                    <div style={{ marginBottom: 8 }}>

                        <p><b>Số lượng: {getCurrencyThongKe(vanBanData?.length || 0)} văn bản</b></p>

                    </div>
                    <AntdTable
                        columns={columns as any}
                        dataSource={vanBanData as any}
                        pagination={{
                            total: vanBanData?.length
                        }}
                        searchParams={searchParams as any}
                        setSearchParams={setSearchParams as any}
                        onSearch={() => { }}
                    />
                </Spin>
            </AntdSpace>
            <VanBanDetail />

        </>

    )
}
const VanBanLienThongQLVBTableWrapper = () => (<LienThongQLVBProvider>
    <VanBanTable />
</LienThongQLVBProvider>)
export default VanBanLienThongQLVBTableWrapper