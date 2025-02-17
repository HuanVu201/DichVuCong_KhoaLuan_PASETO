

import { useEffect, useState } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LineElement, PointElement, LinearScale, Title, RadialLinearScale } from 'chart.js';
import { Doughnut, Line, Radar } from "react-chartjs-2";
import { Divider } from "antd";
import { ISoLieuBaoCao } from "../../models";
import { SoLieuBaoCaoApi } from "../../service";
import { toast } from "react-toastify";
import { getCurrencyThongKe } from "@/utils";
ChartJS.register(ArcElement, CategoryScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, RadialLinearScale);

function ThongKeTongHop766() {
    const soLieuContext = useSoLieuBaoCaoContext()

    const [dataPieChart, setDataPieChart] = useState<any>();
    const [centerTextPluginPieChart, setCenterTextPluginPieChart] = useState<any>();
    const [optionsPieChart, setOptionsPieChart] = useState<any>();


    const [dataLineChart, setDataLineChart] = useState<any>();
    const [optionsLineChart, setOptionsLineChart] = useState<any>();

    const [dataRadarChart, setDataRadarChart] = useState<any>();
    const [optionsRadarChart, setOptionsRadarChart] = useState<any>();

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            let dataHandler: any
            if (soLieuContext.soLieuTheoKy.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh'))[0].soLieu) {
                dataHandler = JSON.parse(soLieuContext.soLieuTheoKy.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh'))[0].soLieu)
            }
            setDataPieChart({
                labels: ['Điểm trung bình', 'Còn lại'],
                datasets: [
                    {
                        label: '',
                        data: [(Math.round((dataHandler.TongDiem766 ?? 0) * 100) / 100), 100 - (Math.round((dataHandler.TongDiem766 ?? 0) * 100) / 100)],
                        backgroundColor: [
                            '#f09844',
                            'rgba(174, 188, 195, 0.45)',
                        ],
                        borderWidth: 0,
                    },
                ],
            });

            const createCenterTextPlugin = (id: any, text: any) => ({
                id,
                afterDatasetsDraw: (chart: any) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = `600 0.8rem 'Roboto', Arial`;
                    ctx.textBaseline = 'middle';

                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2 + 5;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                },
            });
            setCenterTextPluginPieChart(createCenterTextPlugin('centerText1', `${(Math.floor((dataHandler.TongDiem766 ?? 0) * 100) / 100).toString()}/100`));

            setOptionsPieChart({
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                        align: 'center',
                        labels: {
                            boxWidth: 1,
                            padding: 1,
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
                                    label += getCurrencyThongKe(context.parsed);
                                }
                                return label;
                            }
                        }
                    },
                },
                maintainAspectRatio: false,
                cutout: '65%',
            });
        }
    }, [soLieuContext.soLieuTheoKy])

    useEffect(() => {
        if (soLieuContext.soLieu12Thang) {
            const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            const data12Thang = soLieuContext.soLieu12Thang
            const data = {
                labels,
                datasets: [
                    {
                        label: 'Điểm số',
                        data: [
                            data12Thang.filter(x => x.ky == 1).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 1)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 2).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 2)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 3).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 3)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 4).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 4)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 5).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 5)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 6).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 6)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 7).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 7)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 8).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 8)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 9).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 9)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 10).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 10)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 11).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 11)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                            data12Thang.filter(x => x.ky == 12).length > 0 ? Math.round((JSON.parse(data12Thang.filter(x => x.ky == 12)[0].soLieu).TongDiem766 ?? 0) * 100) / 100 : 0,
                        ],
                        borderColor: '#f09844',
                        backgroundColor: '#efd7ce',
                    },

                ],
            };

            setDataLineChart(data)

            setOptionsLineChart({
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: 'XU HƯỚNG ĐIỂM',
                        // align: 'start'
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function (tooltipItems: any) {
                                const month = tooltipItems[0].label;
                                return `Tháng ${parseInt(month, 10)}`;
                            },
                            label: function (context: any) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.raw !== null) {
                                    label += context.raw;
                                }
                                return label;
                            }
                        }
                    }
                },

            })

        }

    }, [soLieuContext.soLieu12Thang])

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const value = 5.096774193548387;
            const data = {
                labels: ['Công khai, minh bạch', 'Tiến độ giải quyết', 'Cung cấp DVC trực tuyến', 'Thanh toán trực tuyến', 'Số hóa hồ sơ'],
                datasets: [
                    {
                        label: 'Điểm trung bình',
                        data: [
                            soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemCongKhaiMinhBach ?? 0) * 100) / 100 : 0,
                            soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemTienDoGiaiQuyet ?? 0) * 100) / 100 : 0,
                            soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemCungCapDVCTT ?? 0) * 100) / 100 : 0,
                            soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemThanhToanTrucTuyen ?? 0) * 100) / 100 : 0,
                            soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemSoHoa ?? 0) * 100) / 100 : 0,
                        ],
                        borderColor: '#f09844',
                        backgroundColor: '#efd7ce',
                        borderWidth: 1.5,
                        fill: true,
                    },
                ],
            }
            setDataRadarChart(data)

            setOptionsRadarChart({
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (context: any) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.raw !== null) {
                                    label += context.raw;
                                }
                                return label;
                            },
                        },
                    },
                },
            });
        }
    }, [soLieuContext.soLieuTheoKy])

    return (<>
        <div className="thongKeTongHop766Block" style={{ justifyContent: 'space-between' }}>
            <div className="col-12">
                <p><b>TỔNG HỢP</b></p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>

                {dataPieChart
                    ?
                    <div className=" itemChart col-lg-4 col-12" >
                        <Doughnut key={JSON.stringify(dataPieChart)} id="chart1" data={dataPieChart} options={optionsPieChart as any} plugins={[centerTextPluginPieChart]} />
                    </div>
                    : <></>
                }
                {dataLineChart
                    ?
                    <div className="itemChart col-lg-8 col-12" >
                        <Line key={JSON.stringify(dataLineChart)} data={dataLineChart} options={optionsLineChart} />
                    </div>
                    : null
                }
            </div>
            <Divider className="divider" />
            {dataRadarChart
                ?
                <div className=" col-12" style={{ maxWidth: 400, margin: '0 auto' }} >
                    <Radar key={JSON.stringify(dataRadarChart)} data={dataRadarChart} options={optionsRadarChart} />
                </div>
                : null
            }
        </div>

    </>);
}

export default ThongKeTongHop766;