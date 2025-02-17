import { useEffect, useMemo, useState } from 'react';
import { useSoLieuBaoCaoContext } from '../../contexts';
import { Badge } from 'antd';
import { getCurrencyThongKe } from '@/utils';
import { Doughnut } from 'react-chartjs-2';

function TyLeCungCapDvcTrucTuyen() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [data, setData] = useState<any>();
    const [options, setOptions] = useState<any>();

    const [
        ttMotPhan, ttToanTrinh, ttConLai, tyLeMotPhan, tyLeToanTrinh, tyLeConlai
    ] = useMemo(() => {
        if (soLieuContext.soLieuHienTai) {
            let thuTucMotPhan = 0, thuTucToanTrinh = 0, thuTucConLai = 0, tyLeMotPhan = 0, tyLeToanTrinh, tyLeConlai = 0
            const data = soLieuContext.soLieuHienTai ? JSON.parse(soLieuContext.soLieuHienTai[0].soLieu) : undefined

            thuTucMotPhan = data.ThuTucMotPhan
            thuTucToanTrinh = data.ThuTucToanTrinh
            thuTucConLai = data.ThuTuc - thuTucMotPhan - thuTucToanTrinh

            tyLeMotPhan = (thuTucMotPhan) /
                (data.ThuTuc)
                ? Math.round(
                    ((thuTucMotPhan) / (data.ThuTuc)) * 100 * 100) / 100
                : 0
            tyLeToanTrinh = (thuTucToanTrinh) /
                (data.ThuTuc)
                ? Math.round(
                    ((thuTucToanTrinh) / (data.ThuTuc)) * 100 * 100) / 100
                : 0

            tyLeConlai = (thuTucConLai) /
                (data.ThuTuc)
                ? Math.round(
                    ((thuTucConLai) / (data.ThuTuc)) * 100 * 100) / 100
                : 0


            return [thuTucMotPhan, thuTucToanTrinh, thuTucConLai, tyLeMotPhan, tyLeToanTrinh, tyLeConlai];
        }
        return [null, null, null, null, null, null]



    }, [soLieuContext.soLieuHienTai]);

    useEffect(() => {

        if (soLieuContext.soLieuHienTai) {

            const ttMotPhan = JSON.parse(soLieuContext.soLieuHienTai[0].soLieu).ThuTucMotPhan ?? 0
            const ttToanTrinh = JSON.parse(soLieuContext.soLieuHienTai[0].soLieu).ThuTucToanTrinh ?? 0
            const ttConLai = (JSON.parse(soLieuContext.soLieuHienTai[0].soLieu).ThuTuc ?? 0) - ttMotPhan - ttToanTrinh

            setData({
                labels: ['TTHC cung cấp DVCTT một phần', 'TTHC cung cấp DVCTT toàn trình', 'Còn lại'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [ttMotPhan, ttToanTrinh, ttConLai],
                        backgroundColor: [
                            '#5e98d7',
                            '#f09844',
                            'rgba(174, 188, 195, 0.45)',
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
    }, [soLieuContext.soLieuHienTai]);
    return (<>

        <b style={{ textAlign: 'center', minHeight: 50 }}>TỶ LỆ TTHC CUNG CẤP DỊCH VU CÔNG TRỰC TUYẾN</b>
        {data
            ?
            <div style={{ display: 'flex', marginTop: 10 }}>
                <div>
                    <Doughnut key={JSON.stringify(data)} id="chart1" data={data} options={options} style={{ maxWidth: 300 }} />
                </div>
                <table style={{ width: '100%' }}>
                    <tr>
                        <td><Badge color="#5e98d7" text={`TTHC cung cấp DVCTT một phần`} /></td>
                        <td style={{ textAlign: 'left' }}>
                            <b>{getCurrencyThongKe(ttMotPhan ?? 0)} ({tyLeMotPhan}%)</b>
                        </td>
                    </tr>
                    <tr>
                        <td> <Badge color="#f09844" text={`TTHC cung cấp DVCTT toàn trình`} /> </td>
                        <td style={{ textAlign: 'left' }}>
                            <b>{getCurrencyThongKe(ttToanTrinh ?? 0)} ({tyLeToanTrinh}%)</b>
                        </td>
                    </tr>
                    <tr>
                        <td> <Badge color="rgba(174, 188, 195, 0.45)" text={`Còn lại`} /> </td>
                        <td style={{ textAlign: 'left' }}>
                            <b>{getCurrencyThongKe(ttConLai ?? 0)} ({tyLeConlai}%)</b>
                        </td>
                    </tr>
                </table>
            </div>
            : <></>
        }
    </>);
}

export default TyLeCungCapDvcTrucTuyen;
