import { CURRENTTIME, FORMAT_DATE_WITHOUT_TIME, YEAR } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs"
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices";
import { IThongKeHoSoTrangChu } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { toast } from "react-toastify";

const ChiSoTienDoGiaiQuyetWrapper = () => {
    const now = new Date()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [tenTinh, setTenTinh] = useState<string>();
    const [data, setData] = useState<{
        tyLeXuLyDungHan: string,
        tenDonVi: string
    }>()
    const [locationOrigin, setLocationOrigin] = useState<string>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const maDinhDanh = searchParams.get('MaDinhDanh');
    const type: number = Number(searchParams.get('Type'));

    useEffect(() => {
        if (!config)
            dispatch(SearchPublicConfig())
    }, [])

    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'ten-don-vi-lowercase') {
                setTenTinh(item.content)
            }
            if (item.code == 'ten-mien-dvc') {
                setLocationOrigin(item.content)
            }
        })

    }, [config])

    useEffect(() => {
        const eleEMC: any = document.querySelector('#yhy-append')
        if (eleEMC) {
            eleEMC.style.display = 'none'
        }
    }, [])

    useEffect(() => {
        (async () => {
            const res = await tiepNhanHoSoTrucTuyenApi.ThongKeTyLeXuLyDungHan({
                maDinhDanh: maDinhDanh || undefined,
                type: type || 0,
                tuNgay: dayjs(new Date(YEAR, 0, 1)).format("YYYY-MM-DD"),
                denNgay: dayjs(new Date(YEAR, now.getMonth(), now.getDate())).format("YYYY-MM-DD")
            })
            if (res.data.succeeded) {
                setData(res.data.data)
            } else {
                toast.error(res.data.message)
            }
        })()
    }, [])

    return (
        <div className="containerChiSoTienDoGiaiQuyet " style={{ textAlign: 'center', overflow: 'hidden' }}>
            <p style={{ color: 'black', fontWeight: 'bold' }}>Đến tháng {now.getMonth() + 1} {data?.tenDonVi || `tỉnh ${tenTinh}`} đã giải quyết</p>
            <a href={`${locationOrigin}/portaldvc/thong-ke`} target="_blank">
                <p style={{ color: '#C00000', fontWeight: 'bold', fontSize: 40, cursor: 'pointer' }} >
                    {data?.tyLeXuLyDungHan}%
                </p>
            </a>
            <p style={{ color: '#1F497D', fontWeight: 'bold', fontSize: 14 }}>hồ sơ đúng hạn</p>
            <p><i style={{ color: '#1F497D', fontWeight: 'bold', fontSize: 11 }}>
                (Tự động cập nhật vào lúc 00:00 ngày {dayjs().format(FORMAT_DATE_WITHOUT_TIME)})
            </i></p>
        </div>
    )
}


export default ChiSoTienDoGiaiQuyetWrapper