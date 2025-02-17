import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { IDataChartThongKeKhoTaiLieuDienTu } from "../../models";
import { thongKeKhoTaiLieuApi } from "../../services";
import { ThongKeKhoTaiLieuProvider } from "../../contexts";
import { ThongKeKhoTaiLieuFilter } from "./ThongKeKhoTaiLieuFilter";
import { ThongKeKhoTaiLieuFilterTable } from "./ThongKeKhoTaiLieuFilterTable";
import { KhoTaiLieuDienTuManagerProvider } from "../../contexts/KhoTaiLieuDienTuManagerContext";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const labels = ['Công dân', 'Tổ chức/Doanh nghiệp'];


const ThongKeKhoTaiLieuDienTu = () => {
    const [dataChart, setDataChart] = useState<IDataChartThongKeKhoTaiLieuDienTu>()
    const [arrSuDung, setArrSuDung] = useState<number[]>()
    const [arrKhongSuDung, setArrKhongSuDung] = useState<number[]>()
    const dispatch = useAppDispatch()
    useEffect(() => {
        (async () => {
            const res = await thongKeKhoTaiLieuApi.GetDataChartKhoTaiLieuDienTu({})
            const data = res.data
            if (data) {
                setDataChart(data as any)
                setArrSuDung([data.caNhanSuDung || 0, data.toChucSuDung || 0])
                setArrKhongSuDung([data.caNhanKhongSuDung || 0, data.toChucKhongSuDung || 0])
            }
        })()
    }, [])

    const data = {
        labels,
        datasets: [
            {
                label: 'Sử dụng',
                data: arrSuDung,
                backgroundColor: '#3b82f6',
            },
            {
                label: 'Không sử dụng',
                data: arrKhongSuDung,
                backgroundColor: '#e11d48',
            },
        ],
    };


    return (
        <div style={{ marginTop: 50 }}>
            <ThongKeKhoTaiLieuFilter />
            <div className="dataChartBlock" style={{ width: '40%', margin: '50px auto' }}>
                <Bar options={options} data={data} />
            </div>
            <ThongKeKhoTaiLieuFilterTable />
        </div>
    );
}

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Dữ liệu cập nhật đến thời điểm hiện tại',
        },
        legend: {
            position: 'bottom' as const,
        },
    },
    responsive: true,
};

const ThongKeKhoTaiLieuDienTuWrapper = () => (
    <ThongKeKhoTaiLieuProvider>
        <KhoTaiLieuDienTuManagerProvider>
            <ThongKeKhoTaiLieuDienTu />
        </KhoTaiLieuDienTuManagerProvider>
    </ThongKeKhoTaiLieuProvider>
)
export default ThongKeKhoTaiLieuDienTuWrapper