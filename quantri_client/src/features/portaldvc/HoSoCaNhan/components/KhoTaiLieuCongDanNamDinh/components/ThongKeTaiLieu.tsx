import { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IThongKeTaiLieuGiayToCongDan } from "../models";
import { Flex, Radio } from 'antd';
import { TaiLieuGiayToCaNhanApi } from "../services/TaiLieuGiayToCaNhanService";
import { toast } from "react-toastify";
import { getCurrencyThongKe } from "@/utils";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const optionThongkes = [
    { label: 'Theo loại giấy tờ', value: 'loại giấy tờ' },
    { label: 'Theo nhóm giấy tờ', value: 'nhóm giấy tờ' },
];


const labels = ['Dưới 18 tuổi', 'Tuổi 18 - 30', 'Tuổi 31 - 40', 'Tuổi 41 - 50', 'Trên 50 tuổi'];


const ThongKeTaiLieuCongDan = () => {
    const [dataRes, setDataRes] = useState<IThongKeTaiLieuGiayToCongDan[]>()
    const [dataChart, setDataChart] = useState<any>()
    const [type, setType] = useState<string>('loại giấy tờ')
    const [options, setOptions] = useState<any>();

    useEffect(() => {
        (async () => {
            if (!type)
                return
            const res = await TaiLieuGiayToCaNhanApi.GetDataChartTaiLieuCaNhan({ type: type })
            if (res.data.succeeded) {
                setDataRes(JSON.parse(res.data.data))
            } else {
                toast.error(res.data.message || "Lỗi thực hiện thống kê!")
            }

        })()
    }, [type])

    useEffect(() => {
        if (dataRes) {
            const labels: string[] = []
            const soLuongs: number[] = []
            console.log(dataRes)
            dataRes.forEach(item => {
                if (item.TenLoaiNhom && item.SoLuong) {
                    console.log(item)
                    labels.push(item.TenLoaiNhom)
                    soLuongs.push(item.SoLuong)
                }
            })

            console.log(labels)
            console.log(soLuongs)

            const dataBarChart = {
                labels,
                datasets: [
                    {
                        label: 'Số lượng tài liệu sử dụng',
                        data: soLuongs,
                        backgroundColor: '#5899da',
                        stack: 'dungVaTrongHan',
                    },
                ],
            };
            setDataChart(dataBarChart)

            setOptions({
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
                                    label += getCurrencyThongKe(context.parsed.y) + ' tài liệu';
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
            })
        }

    }, [dataRes])


    return (
        <div style={{ marginTop: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Radio.Group
                    options={optionThongkes}
                    defaultValue="loại giấy tờ"
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(e) => {
                        console.log(e.target.value)
                        setType(e.target.value)
                    }}
                />
            </div>
            <div style={{ width: '60%', margin: '50px auto' }}>
                {dataChart ?
                    <Bar key={JSON.stringify(dataChart)} options={options} data={dataChart} />
                    : null
                }
            </div>
        </div>
    );
}

export default ThongKeTaiLieuCongDan