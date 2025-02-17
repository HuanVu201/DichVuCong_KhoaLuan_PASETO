
import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { useSoLieuBaoCaoContext } from '../../contexts';
import { getCurrencyThongKe } from '@/utils';
import { Badge } from 'antd';
ChartJS.register(ArcElement, Tooltip, Legend);

function TyLeSoHoaHoSoKetQua() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [centerTextPlugin, setCenterTextPlugin] = useState<any>();
    const [data, setData] = useState<any>();
    const [options, setOptions] = useState<any>();

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const createCenterTextPlugin = (id: any, text: any) => ({
                id,
                afterDatasetsDraw: (chart: any) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = `600 0.72rem 'Roboto', Arial`;
                    ctx.textBaseline = 'middle';

                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;

                    ctx.fillText(text, textX, textY + 5);
                    ctx.save();
                },
            });

            const hoSoCoThanhPhanHoacKetQuaSoHoa = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).HoSoCoThanhPhanHoacKetQuaSoHoa ?? 0
            const hoSoDaXuLyXong = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).HoSoDaXuLyXong ?? 0

            setCenterTextPlugin(createCenterTextPlugin('centerText1', `Đạt: ${(hoSoCoThanhPhanHoacKetQuaSoHoa) /
                (hoSoDaXuLyXong)
                ? Math.round(
                    ((hoSoCoThanhPhanHoacKetQuaSoHoa) / (hoSoDaXuLyXong)) * 100 * 100) / 100 + "%"
                : "0%"}`));

            setData({
                labels: ['Hồ sơ TTHC số hóa hồ sơ, kết quả giải quyết TTHC', 'Còn lại'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [hoSoCoThanhPhanHoacKetQuaSoHoa, hoSoDaXuLyXong - hoSoCoThanhPhanHoacKetQuaSoHoa ?? 0],
                        backgroundColor: [
                            '#2c9c9d',
                            '#aebcc3',
                        ],
                        borderWidth: 0,
                    },
                ],
            });

            setOptions({
                plugins: {
                    legend: {
                        display: false,
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
                                    label += getCurrencyThongKe(context.parsed) + ' hồ sơ';
                                }
                                return label;
                            }
                        }
                    }
                },
                maintainAspectRatio: false,
                cutout: '65%',
            });
        }

    }, [soLieuContext.soLieuTheoKy]);
    return (<>
        <p style={{ minHeight: 50 }}><b >TỶ LỆ HỒ SƠ TTHC SỐ HÓA HỒ SƠ, KẾT QUẢ GIẢI QUYẾT TTHC</b></p>
        {data
            ?
            <>
                <div>
                    <Doughnut key={JSON.stringify(data)} id="chart1" data={data} options={options} plugins={[centerTextPlugin]} />
                </div>
            </>
            : <></>
        }

    </>);
}

export default TyLeSoHoaHoSoKetQua;