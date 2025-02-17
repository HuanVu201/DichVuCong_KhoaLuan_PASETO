import { khoTaiLieuCongDanApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services";
import { useAppSelector } from "@/lib/redux/Hooks"
import { getCurrencyThongKe } from "@/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";



ChartJS.register(ArcElement, Tooltip, Legend);

interface IThongKeSuDungKhoTaiLieu {
    soLuongSuDung: number,
    soLuongChuaSuDung: number,
    soLuongTaiSuDung: number,
    soLuongChuaTaiSuDung: number,

}

const ThongKeSuDungKhoTaiLieuSwapper = () => {
    const { data: user } = useAppSelector(state => state.user)
    const [data, setData] = useState<IThongKeSuDungKhoTaiLieu>();
    const [suDungData, setSuDungData] = useState<any>();
    const [taiSuDungData, setTaiSuDungData] = useState<any>();
    const [options1, setOptions1] = useState<any>();
    const [options2, setOptions2] = useState<any>();
    const [centerTextPlugin1, setCenterTextPlugin1] = useState<any>();
    const [centerTextPlugin2, setCenterTextPlugin2] = useState<any>();

    useEffect(() => {
        (async () => {
            if (!data) {
                const res = await khoTaiLieuCongDanApi.TinhHinhSuDungTaiLieuCaNhan()
                if (res.data.succeeded) {
                    setData(res.data.data)
                } else {
                    toast.error("Xảy ra lỗi thống kê!")
                }
            }
        })()
    }, [])

    useEffect(() => {
        if (data) {

            const createCenterTextPlugin1 = (id: any, text: any) => ({
                id,
                afterDatasetsDraw: (chart: any) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = `600 16px 'Roboto', Arial`;
                    ctx.textBaseline = 'middle';

                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                },
            });
            const createCenterTextPlugin2 = (id: any, text: any) => ({
                id,
                afterDatasetsDraw: (chart: any) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = `600 16px 'Roboto', Arial`;
                    ctx.textBaseline = 'middle';

                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                },
            });


            setCenterTextPlugin1(createCenterTextPlugin1('centerText1', `Sử dụng: ${(data.soLuongSuDung) /
                (data.soLuongSuDung + data.soLuongChuaSuDung)
                ? Math.round(
                    ((data.soLuongSuDung) / (data.soLuongSuDung + data.soLuongChuaSuDung)) * 100 * 100) / 100 + "%"
                : "0%"}`));
            setCenterTextPlugin2(createCenterTextPlugin2('centerText2', `Tái sử dụng: ${(data.soLuongTaiSuDung) /
                (data.soLuongTaiSuDung + data.soLuongChuaTaiSuDung)
                ? Math.round(
                    ((data.soLuongTaiSuDung) / (data.soLuongTaiSuDung + data.soLuongChuaTaiSuDung)) * 100 * 100) / 100 + "%"
                : "0%"}`));


            setSuDungData({
                labels: ['Đã sử dụng', 'Chưa sử dụng'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [data.soLuongSuDung, data.soLuongChuaSuDung],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
                        ],
                        borderWidth: 0,
                    },
                ],
            });

            setTaiSuDungData({
                labels: ['Tái sử dụng', 'Chưa tái sử dụng'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [data.soLuongTaiSuDung, data.soLuongChuaTaiSuDung],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
                        ],
                        borderWidth: 0,
                    },
                ],
            });

            setOptions1({
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            boxWidth: 25,
                            padding: 5,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context: any) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += getCurrencyThongKe(context.parsed) + ' người';
                                }
                                return label;
                            }
                        }
                    }
                },
                maintainAspectRatio: false,
            });
            setOptions2({
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            boxWidth: 25,
                            padding: 5,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context: any) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += getCurrencyThongKe(context.parsed) + ' tài liệu';
                                }
                                return label;
                            }
                        }
                    }
                },
                maintainAspectRatio: false,
            });
        }
    }, [data])

    return (
        <>
            {suDungData && taiSuDungData ? (
                <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10vh', maxWidth: 1024, margin: 'auto' }}>
                    {suDungData
                        ?
                        <div style={{ flex: 1 }}  >
                            <Doughnut id="chart1" data={suDungData} options={options1 as any} height={300} plugins={[centerTextPlugin1]} />
                        </div>
                        : <></>
                    }
                    {taiSuDungData
                        ?
                        <div style={{ flex: 1 }}  >
                            <Doughnut id="chart2" data={taiSuDungData} options={options2 as any} height={300} plugins={[centerTextPlugin2]} />
                        </div>
                        : <></>
                    }

                </div>
            ) : <>(Không có dữ liệu thống kê!)</>}
        </>
    );
}

export default ThongKeSuDungKhoTaiLieuSwapper