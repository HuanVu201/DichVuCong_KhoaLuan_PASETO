import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IQuanLyDinhDanhCongDanContext, QuanLyDinhDanhCongDanProvider } from "../../context/quanLyDinhDanhCongDanContext";
import { toast } from "react-toastify";
import { GetDataChartDinhDanhCongDan } from "../../redux/action";
import { IQuanLyTaiKhoanDinhDanh } from "../../models/QuanLyTaiKhoanModel";
import { TaiKhoanFilter } from "./taiKhoanFilter";
import { FilterThongKeModal } from "./filterThongKeModalTable";
import { KhoTaiLieuDienTuManagerProvider } from "@/features/portaldvc_admin/ThongKeKhoTaiLieuDienTu/contexts/KhoTaiLieuDienTuManagerContext";
import { getCurrencyThongKe } from "@/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const labels = ['Dưới 18 tuổi', 'Tuổi 18 - 30', 'Tuổi 31 - 40', 'Tuổi 41 - 50', 'Trên 50 tuổi'];


const ThongKeTaiKhoanCongDan = () => {
    const [dataChart, setDataChart] = useState<IQuanLyTaiKhoanDinhDanh>()
    const dispatch = useAppDispatch()
    useEffect(() => {
        (async () => {
            const res = await dispatch(GetDataChartDinhDanhCongDan({})) //Lấy theo tuổi bắt đầu của mỗi mốc
            const data = res.payload
            if (data)
                setDataChart(data as any)
        })()
    }, [])

    const data = {
        labels,
        datasets: [
            {
                label: 'Nam đã định danh',
                data: dataChart?.namDaDinhDanh?.split('##'),
                backgroundColor: 'rgba(53, 162, 235, 1)',
                stack: 'namDinhDanh',
            },
            {
                label: 'Nam chưa định danh',
                data: dataChart?.namChuaDinhDanh?.split('##'),
                backgroundColor: 'rgba(53, 162, 235, 0.6)',
                stack: 'namDinhDanh',
            },
            {
                label: 'Nữ đã định danh',
                data: dataChart?.nuDaDinhDanh?.split('##'),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                stack: 'nuDinhDanh',
            },
            {
                label: 'Nữ chưa định danh',
                data: dataChart?.nuChuaDinhDanh?.split('##'),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                stack: 'nuDinhDanh',
            },
        ],
    };


    return (
        <div style={{ marginTop: 50 }}>
            <TaiKhoanFilter />
            <div className="dataChartBlock" style={{ width: '60%', margin: '50px auto' }}>
                <Bar options={options} data={data} />
            </div>
            <FilterThongKeModal />
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
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += getCurrencyThongKe(context.parsed.y) + ' người';
                    }
                    return label;
                }
            }
        }
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const ThongKeTaiKhoanCongDanWrapper = () => (
    <QuanLyDinhDanhCongDanProvider>
        <KhoTaiLieuDienTuManagerProvider>
            <ThongKeTaiKhoanCongDan />
        </KhoTaiLieuDienTuManagerProvider>
    </QuanLyDinhDanhCongDanProvider>
)
export default ThongKeTaiKhoanCongDanWrapper