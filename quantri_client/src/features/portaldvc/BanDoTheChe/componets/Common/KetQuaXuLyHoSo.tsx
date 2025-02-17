import { useEffect, useMemo, useState } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function KetQuaXuLyHoSo() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [data, setData] = useState<any>();
    const [options, setOptions] = useState<any>();

    const [
        dungHan1, quaHan1, dungHan2, quaHan2, dungHan3, quaHan3, dungHan4, quaHan4, dungHan5, quaHan5, dungHan6, quaHan6,
        dungHan7, quaHan7, dungHan8, quaHan8, dungHan9, quaHan9, dungHan10, quaHan10, dungHan11, quaHan11, dungHan12, quaHan12
    ] = useMemo(() => {
        if (soLieuContext.soLieu12Thang) {
            const dataHandler = soLieuContext.soLieu12Thang

            let dungHan1 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 1).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 1)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan1 = dungHan1 > 0 ? Math.round((100 - dungHan1) * 100) / 100 : 0
            let dungHan2 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 2).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 2)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan2 = dungHan2 > 0 ? Math.round((100 - dungHan2) * 100) / 100 : 0
            let dungHan3 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 3).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 3)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan3 = dungHan3 > 0 ? Math.round((100 - dungHan3) * 100) / 100 : 0
            let dungHan4 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 4).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 4)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan4 = dungHan4 > 0 ? Math.round((100 - dungHan4) * 100) / 100 : 0
            let dungHan5 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 5).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 5)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan5 = dungHan5 > 0 ? Math.round((100 - dungHan5) * 100) / 100 : 0
            let dungHan6 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 6).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 6)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan6 = dungHan6 > 0 ? Math.round((100 - dungHan6) * 100) / 100 : 0
            let dungHan7 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 7).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 7)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan7 = dungHan7 > 0 ? Math.round((100 - dungHan7) * 100) / 100 : 0
            let dungHan8 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 8).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 8)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan8 = dungHan8 > 0 ? Math.round((100 - dungHan8) * 100) / 100 : 0
            let dungHan9 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 9).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 9)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan9 = dungHan9 > 0 ? Math.round((100 - dungHan9) * 100) / 100 : 0
            let dungHan10 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 10).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 10)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan10 = dungHan10 > 0 ? Math.round((100 - dungHan10) * 100) / 100 : 0
            let dungHan11 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 11).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 11)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan11 = dungHan11 > 0 ? Math.round((100 - dungHan11) * 100) / 100 : 0
            let dungHan12 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 12).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 12)[0].soLieu).DaXuLyDungVaTruocHanTyLe) * 100) / 100 : 0
            let quaHan12 = dungHan12 > 0 ? Math.round((100 - dungHan12) * 100) / 100 : 0


            return [dungHan1, quaHan1, dungHan2, quaHan2, dungHan3, quaHan3, dungHan4, quaHan4, dungHan5, quaHan5, dungHan6, quaHan6,
                dungHan7, quaHan7, dungHan8, quaHan8, dungHan9, quaHan9, dungHan10, quaHan10, dungHan11, quaHan11, dungHan12, quaHan12];
        }
        return [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]



    }, [soLieuContext.soLieu12Thang]);

    useEffect(() => {
        if (soLieuContext.soLieu12Thang) {
            const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

            const dataBarChart = {
                labels,
                datasets: [
                    {
                        label: 'Tỷ lệ hồ sơ xử lý đúng hạn/trong hạn',
                        data: [dungHan1, dungHan2, dungHan3, dungHan4, dungHan5, dungHan6, dungHan7, dungHan8, dungHan9, dungHan10, dungHan11, dungHan12],
                        backgroundColor: '#5899da',
                        stack: 'dungVaTrongHan',
                    },
                    {
                        label: 'Tỷ lệ hồ sơ xử lý quá hạn',
                        data: [quaHan1, quaHan2, quaHan3, quaHan4, quaHan5, quaHan6, quaHan7, quaHan8, quaHan9, quaHan10, quaHan11, quaHan12],
                        backgroundColor: '#f09844',
                        stack: 'quaHan',
                    },

                ],
            };
            setData(dataBarChart)

            setOptions({
                plugins: {
                    title: {
                        display: false,
                        text: 'Dữ liệu cập nhật đến thời điểm hiện tại',
                    },
                    legend: {
                        position: 'bottom' as const,
                    },
                    tooltip: {
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
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    },
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true, // Bắt đầu từ 0
                        max: 100, // Giá trị tối đa là 100
                        ticks: {
                            stepSize: 10, // Khoảng cách giữa các mốc là 10
                            callback: function (value: any) {
                                return value + '%'; // Thêm ký hiệu % vào mốc
                            },
                        },
                    },
                },
            })
        }

    }, [soLieuContext.soLieu12Thang])
    return (<>
        <div className="col-12">
            <p><b>KẾT QUẢ XỬ LÝ HỒ SƠ</b></p>
        </div>
        {data ?
            <Bar key={JSON.stringify(data)} options={options} data={data} />
            : null
        }
    </>);
}

export default KetQuaXuLyHoSo;