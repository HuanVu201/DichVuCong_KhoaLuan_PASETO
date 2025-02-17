
import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { useSoLieuBaoCaoContext } from '../../contexts';
import { getCurrencyThongKe } from '@/utils';
import { Badge } from 'antd';
ChartJS.register(ArcElement, Tooltip, Legend);

function TyLeNopHoSoTrucTuyen({ color1, color2 }: { color1: string, color2: string }) {
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

            const tiepNhanTrucTuyen = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrucTuyen ?? 0
            const tiepNhanTrongKy = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrongKy ?? 0

            setCenterTextPlugin(createCenterTextPlugin('centerText1', `Trực tuyến: ${(tiepNhanTrucTuyen) /
                (tiepNhanTrongKy)
                ? Math.round(
                    ((tiepNhanTrucTuyen) / (tiepNhanTrongKy)) * 100 * 100) / 100 + "%"
                : "0%"}`));

            setData({
                labels: ['Nộp trực tuyến', 'Nộp trực tiếp và BCCI'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [tiepNhanTrucTuyen, tiepNhanTrongKy - tiepNhanTrucTuyen ?? 0],
                        backgroundColor: [
                            color1,
                            color2,
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
        <p style={{ textAlign: 'center', minHeight: 50 }}><b >TỶ LỆ NỘP HỒ SƠ TRỰC TUYẾN</b></p>
        {data
            ?
            <>
                <div>
                    <Doughnut key={JSON.stringify(data)} id="chart1" data={data} options={options} plugins={[centerTextPlugin]} />
                </div>
                <table style={{ width: '100%', marginTop: 20 }}>
                    <tr>
                        <td><Badge color={color1} text={`Nộp trực tuyến `} /></td>
                        <td style={{ textAlign: 'right' }}>
                            <b> {getCurrencyThongKe(soLieuContext.soLieuTheoKy ? JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrucTuyen : 0)}</b>
                        </td>
                    </tr>
                    <tr>
                        <td> <Badge color={color2} text={`Nộp trực tiếp và BCCI`} /> </td>
                        <td style={{ textAlign: 'right' }}>
                            <b> {getCurrencyThongKe(soLieuContext.soLieuTheoKy ? (JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrongKy - JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrucTuyen) : 0)}</b>
                        </td>
                    </tr>
                </table>
            </>
            : <></>
        }

    </>);
}

export default TyLeNopHoSoTrucTuyen;