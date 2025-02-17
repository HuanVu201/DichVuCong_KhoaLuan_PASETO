import { khoTaiLieuCongDanApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services";
import { useAppSelector } from "@/lib/redux/Hooks"
import { Suspense, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { FilterDungLuongSuDung } from "./FilterDungLuongSuDung";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ChiTietNguoiSuDungModal from "../DanhSachSuDung/ChiTietNguoiSuDungModal";

interface IThongKeDungLuongSuDung {
    congDanTaiLen: number,
    thanhPhanHoSo: number,
    ketQuaGiaiQuyet: number,
    dichVuCongQG: number,
}

export interface IThongKeDungLuongFilter {
    soDinhDanh?: string
    fullName?: string
    tuNgay?: string
    denNgay?: string
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['Công dân tải lên', 'Thành phần hồ sơ', 'Kết quả giải quyết hồ sơ', 'Dịch vụ công quốc gia'];
const ThongKeDungLuongSuDungSwapper = () => {
    const [data, setData] = useState<IThongKeDungLuongSuDung>();
    // const [dataChart, setDataChart] = useState<any>()
    const [searchParams, setSearchParams] = useState<IThongKeDungLuongFilter>()
    const [loading, setLoading] = useState<boolean>(false)
    const [detailModalVisible, setDetailModalVisible] = useState(false)
    const [nguon, setNguon] = useState<string>()

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await khoTaiLieuCongDanApi.DungLuongTheoNguonTaiLen(searchParams ?? {})
            if (res.data.succeeded) {
                setData(res.data.data)
            } else {
                toast.error("Xảy ra lỗi thống kê!")
            }
            setLoading(false)

        })()
    }, [searchParams])

    const onCloseDetailModal = () => {
        setDetailModalVisible(false)
    }

    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Dung lượng',
                data: [
                    (Math.floor((data?.congDanTaiLen ?? 0) * 100) / 100),
                    (Math.floor((data?.thanhPhanHoSo ?? 0) * 100) / 100),
                    (Math.floor((data?.ketQuaGiaiQuyet ?? 0) * 100) / 100),
                    (Math.floor((data?.dichVuCongQG ?? 0) * 100) / 100),
                ],
                backgroundColor: 'rgba(53, 162, 235, 1)',
                stack: 'dungLuong',
            },
        ],
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Dữ liệu cập nhật đến thời điểm hiện tại',
            },
            legend: {
                position: 'bottom' as const,
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' MB';
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
        onClick: (event: any, elements: any) => {
            const elementIndex = elements[0].index;
            const label = labels[elementIndex];
            setDetailModalVisible(true)
            setNguon(label)

        },
    };

    return (
        <>
            <div className="dataChartBlock" style={{ width: '50vw', margin: '50px auto' }}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <FilterDungLuongSuDung setSearchParams={setSearchParams} />
                    <Bar options={options} data={dataChart} />
                </Spin>
                {detailModalVisible ?
                    <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                        <ChiTietNguoiSuDungModal khoLuuTruId={undefined} onClose={onCloseDetailModal} nguon={nguon} />
                    </Suspense> : null}
            </div>
        </>
    );

}




export default ThongKeDungLuongSuDungSwapper