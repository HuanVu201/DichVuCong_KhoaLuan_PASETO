import { useEffect, useMemo, useState } from 'react';
import { useSoLieuBaoCaoContext } from '../../contexts';
import { Badge } from 'antd';
import { getCurrencyThongKe } from '@/utils';
import { Doughnut } from 'react-chartjs-2';

function HoSoDaDongBoLenDVCQG() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [data, setData] = useState<any>();
    const [options, setOptions] = useState<any>();
    const [centerTextPlugin, setCenterTextPlugin] = useState<any>();

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

            const tiepNhanTrongKy = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrongKy

            setCenterTextPlugin(createCenterTextPlugin('centerText1', `Đạt: 100%`));



            setData({
                labels: ['Hồ sơ đã đồng bộ', 'Hồ sơ chưa đồng bộ'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [tiepNhanTrongKy, 0],
                        backgroundColor: [
                            '#5e98d7',
                            '#ED5050',
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

        <p style={{ textAlign: 'center', minHeight: 50 }}><b>TỶ LỆ HỒ SƠ ĐỒNG BỘ LÊN CỔNG DVCQG</b></p>
        {data
            ?
            <>
                <div>
                    <Doughnut key={JSON.stringify(data)} id="chart1" data={data} options={options} plugins={[centerTextPlugin]} />
                </div>
                <table style={{ width: '100%' }}>
                    <tr>
                        <td><Badge color="#5e98d7" text={`Hồ sơ đã đồng bộ`} /></td>
                        <td style={{ textAlign: 'right', color: '#5e98d7', fontSize: '1rem' }}>
                            <b>{getCurrencyThongKe(soLieuContext.soLieuTheoKy ? (JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TiepNhanTrongKy) : 0)}</b>
                        </td>
                    </tr>
                    <tr>
                        <td> <Badge color="#ED5050" text={`Hồ sơ chưa đồng bộ`} /> </td>
                        <td style={{ textAlign: 'right', color: '#ED5050', fontSize: '1rem' }}>
                            <b>0</b>
                        </td>
                    </tr>
                </table>
            </>
            : <></>
        }
    </>);
}

export default HoSoDaDongBoLenDVCQG;
