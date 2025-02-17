
import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { useSoLieuBaoCaoContext } from '../../contexts';
import { getCurrencyThongKe } from '@/utils';
import { Badge } from 'antd';
ChartJS.register(ArcElement, Tooltip, Legend);

function TyLeHoSoCapKetQuaDienTu() {
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

            const hoSoDaXuLyXongCoKetQuaDienTu = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).HoSoDaXuLyXongCoKetQuaDienTu ?? 0
            const hoSoDaXuLyXong = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).HoSoDaXuLyXong ?? 0

            setCenterTextPlugin(createCenterTextPlugin('centerText1', `Đạt: ${(hoSoDaXuLyXongCoKetQuaDienTu) /
                (hoSoDaXuLyXong)
                ? Math.round(
                    ((hoSoDaXuLyXongCoKetQuaDienTu) / (hoSoDaXuLyXong)) * 100 * 100) / 100 + "%"
                : "0%"}`));

            setData({
                labels: ['Hồ sơ cấp kết quả điện tử', 'Còn lại'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [hoSoDaXuLyXongCoKetQuaDienTu, hoSoDaXuLyXong - hoSoDaXuLyXongCoKetQuaDienTu ?? 0],
                        backgroundColor: [
                            '#4980b9',
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
        <p style={{ minHeight: 50 }}><b >TỶ LỆ HỒ SƠ CẤP KẾT QUẢ ĐIỆN TỬ</b></p>
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

export default TyLeHoSoCapKetQuaDienTu;