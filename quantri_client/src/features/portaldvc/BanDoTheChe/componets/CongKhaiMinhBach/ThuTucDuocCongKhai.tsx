import { useEffect, useMemo, useState } from 'react';
import { useSoLieuBaoCaoContext } from '../../contexts';
import { Badge } from 'antd';
import { getCurrencyThongKe } from '@/utils';
import { Doughnut } from 'react-chartjs-2';

function ThuTucDuocCongKhai() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [thuTuc, setThuTuc] = useState<any>(0);
    const [data, setData] = useState<any>();
    const [options, setOptions] = useState<any>();
    const [centerTextPlugin, setCenterTextPlugin] = useState<any>();

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const data = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).ThuTuc ?? 0
            setThuTuc(data)
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

            setCenterTextPlugin(createCenterTextPlugin('centerText1', `Đạt: 100%`));



            setData({
                labels: ['TTHC công khai đầy đủ', 'Còn lại'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [data, 0],
                        backgroundColor: [
                            '#ed994d',
                            '#d8dde0',
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
                                    label += getCurrencyThongKe(context.parsed) + ' thủ tục';
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

        <p style={{ minHeight: 50 }}><b >SỐ TTHC ĐƯỢC CÔNG KHAI ĐẦY ĐỦ CÁC NỘI DUNG QUY ĐỊNH VỀ CÁC BỘ PHẬN CẤU THÀNH</b></p>
        {data
            ?
            <>
                <div>
                    <Doughnut key={JSON.stringify(data)} id="chart1" data={data} options={options} plugins={[centerTextPlugin]} />
                </div>
                <div style={{ maxWidth: '70%', textAlign: 'center', margin: '15px auto 0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 10 }}>TTHC công khai đầy đủ</div>
                    <span className='number'>{getCurrencyThongKe(thuTuc)} thủ tục (100%)</span>
                </div>
                <div style={{ maxWidth: '70%', textAlign: 'center', margin: '15px auto 0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 10 }}>Tổng số TTHC</div>
                    <span className='number'>{getCurrencyThongKe(thuTuc)} thủ tục</span>
                </div>
            </>
            : <></>
        }
    </>);
}

export default ThuTucDuocCongKhai;
