import { useEffect, useMemo, useState } from 'react';
import { useSoLieuBaoCaoContext } from '../../contexts';
import { Badge } from 'antd';
import { getCurrencyThongKe } from '@/utils';
import { Doughnut } from 'react-chartjs-2';

function KetQuaXuLyHoSoTrucTuyen() {
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

            const tyLeDungHan = Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TrucTuyenDaXuLyDungVaTruocHanTyLe ?? 0) * 100) / 100
            const tyLeQuaHan = tyLeDungHan > 0 ? Math.round((100 - tyLeDungHan) * 100) / 100 : 0

            setCenterTextPlugin(createCenterTextPlugin('centerText1', `Đúng hạn: ${tyLeDungHan}%`));



            setData({
                labels: ['Hồ sơ xử lý đúng hạn', 'Hồ sơ xử lý quá hạn'],
                datasets: [
                    {
                        label: 'Tỷ lệ',
                        data: [tyLeDungHan, tyLeQuaHan],
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
                                    label += getCurrencyThongKe(context.parsed) + '%';
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

        <p style={{ textAlign: 'center', minHeight: 50 }}><b >KẾT QUẢ XỬ LÝ HỒ SƠ NỘP TRỰC TUYẾN VỚI HỒ SƠ ĐANG XỬ LÝ</b></p>
        {data
            ?
            <>
                <div>
                    <Doughnut key={JSON.stringify(data)} id="chart1" data={data} options={options} plugins={[centerTextPlugin]}/>
                </div>
                <table style={{ width: '100%', marginTop: 20 }}>
                    <tr>
                        <td><Badge color="#5e98d7" text={`Đã xử lý đúng hạn`} /></td>
                        <td style={{ textAlign: 'right' }}>
                            <b> {getCurrencyThongKe(soLieuContext.soLieuTheoKy ? (JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TrucTuyenDaXuLyTruocHan + JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TrucTuyenDaXuLyDungHan) : 0)}</b>
                        </td>
                    </tr>
                    <tr>
                        <td> <Badge color="#ED5050" text={`Đã xử lý quá hạn`} /> </td>
                        <td style={{ textAlign: 'right' }}>
                            <b> {getCurrencyThongKe(soLieuContext.soLieuTheoKy ? JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TrucTuyenDaXuLyQuaHan : 0)}</b>
                        </td>
                    </tr>
                </table>
            </>
            : <></>
        }
    </>);
}

export default KetQuaXuLyHoSoTrucTuyen;
