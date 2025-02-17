import { useEffect, useMemo, useState } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function ThuTucTrucTuyenPhatSinhHoSo() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [data, setData] = useState<any>();
    const [options, setOptions] = useState<any>();

    const [
        phatSinh1, phatSinh2, phatSinh3, phatSinh4, phatSinh5, phatSinh6,
        phatSinh7, phatSinh8, phatSinh9, phatSinh10, phatSinh11, phatSinh12
    ] = useMemo(() => {
        if (soLieuContext.soLieu12Thang) {
            const dataHandler = soLieuContext.soLieu12Thang

            let phatSinh1 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 1).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 1)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh2 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 2).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 2)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh3 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 3).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 3)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh4 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 4).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 4)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh5 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 5).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 5)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh6 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 6).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 6)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh7 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 7).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 7)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh8 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 8).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 8)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh9 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 9).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 9)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh10 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 10).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 10)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh11 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 11).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 11)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0
            let phatSinh12 = dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 12).length > 0 ? Math.round((JSON.parse(dataHandler.filter(x => x.loaiThongKe == (soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh') && x.ky == 12)[0].soLieu).ThuTucTrucTuyenPhatSinhHoSoTyLe) * 100) / 100 : 0


            return [phatSinh1, phatSinh2, phatSinh3, phatSinh4, phatSinh5, phatSinh6,
                phatSinh7, phatSinh8, phatSinh9, phatSinh10, phatSinh11, phatSinh12];
        }
        return [null, null, null, null, null, null, null, null, null, null, null, null]

    }, [soLieuContext.soLieu12Thang]);

    useEffect(() => {
        if (soLieuContext.soLieu12Thang) {
            const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

            const dataBarChart = {
                labels,
                datasets: [
                    {
                        label: 'Tỷ lệ TTHC có DVC TT phát sinh',
                        data: [phatSinh1, phatSinh2, phatSinh3, phatSinh4, phatSinh5, phatSinh6, phatSinh7, phatSinh8, phatSinh9, phatSinh10, phatSinh11, phatSinh12],
                        backgroundColor: '#5899da',
                        stack: 'dungVaTrongHan',
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
                        display: false,
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
            <p><b>TỶ LỆ TTHC CÓ DVC TRỰC TUYẾN CÓ PHÁT SINH HỒ SƠ TRÊN CỔNG DVCQG</b></p>
        </div>
        {data ?
            <Bar key={JSON.stringify(data)} options={options} data={data} />
            : null
        }
    </>);
}

export default ThuTucTrucTuyenPhatSinhHoSo;