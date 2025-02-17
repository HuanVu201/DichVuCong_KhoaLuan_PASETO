import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSoLieuBaoCaoContext } from '../../contexts';
import { useEffect, useMemo, useState } from 'react';
import { getCurrencyThongKe } from '@/utils';
import { Doughnut } from 'react-chartjs-2';
import { Divider } from 'antd';


ChartJS.register(ArcElement, Tooltip, Legend);

function TyLeGiaoDichThanhToanTrucTuyen() {
  const soLieuContext = useSoLieuBaoCaoContext()
  const [data1, setData1] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [options, setOptions] = useState<any>();

  const [
    thuTucCoTTTT, thuTucConLai, tyLeThuTucCoTTTT, tyLeThuTucConLai
  ] = useMemo(() => {
    if (soLieuContext.soLieuTheoKy) {

      const data = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu)
      const thuTucCoTTTT = data.ThuTucCoPhatSinhThanhToanTrucTuyen ?? 0
      const thuTucConLai = data.ThuTucCoThuPhi - data.ThuTucCoPhatSinhThanhToanTrucTuyen
      const tyLeThuTucCoTTTT = data.ThuTucCoPhatSinhThanhToanTrucTuyenTyLe
        ? Math.round(data.ThuTucCoPhatSinhThanhToanTrucTuyenTyLe * 100) / 100 : 0
      const tyLeThuTucConLai = tyLeThuTucCoTTTT > 0 ? Math.round((100 - tyLeThuTucCoTTTT) * 100) / 100 : 0

      return [thuTucCoTTTT, thuTucConLai, tyLeThuTucCoTTTT, tyLeThuTucConLai];
    }
    return [null, null, null, null]
  }, [soLieuContext.soLieuTheoKy]);

  useEffect(() => {
    if (soLieuContext.soLieuTheoKy) {
      setData1({
        labels: ['', ''],
        datasets: [
          {
            label: 'Tỷ lệ',
            data: [tyLeThuTucCoTTTT, tyLeThuTucConLai],
            backgroundColor: [
              'rgb(88, 153, 218)',
              'rgba(88, 153, 218, 0.2)',
            ],
            borderWidth: 0,
            circumference: 180,
            rotation: 270
          },
        ],
      });
      setData2({
        labels: ['', ''],
        datasets: [
          {
            label: 'Tỷ lệ',
            data: [tyLeThuTucConLai, tyLeThuTucCoTTTT],
            backgroundColor: [
              'rgb(237, 80, 80)',
              'rgb(237, 80, 80, 0.2)',
            ],
            borderWidth: 0,
            circumference: 180,
            rotation: 270
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
                  label += Math.round(context.parsed * 100) / 100 + '%';
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
    <b style={{ textAlign: 'center', minHeight: 50 }}>TỶ LỆ TTHC CÓ GIAO DỊCH THANH TOÁN TRỰC TUYẾN</b>
    {data1
      ? <div>
        <div style={{ margin: '25px 0' }}><Doughnut key={JSON.stringify(data1)} id="chart1" data={data1} options={options} style={{ width: '50%' }} /></div>
        <p style={{ textAlign: 'center' }}>Thanh toán trực tuyến</p>
        <p className='number'>{getCurrencyThongKe(thuTucCoTTTT)} thủ tục ({tyLeThuTucCoTTTT}%)</p>
      </div>
      : null
    }

    <Divider className="divider" />

    {data2
      ? <div>
        <div style={{ margin: '25px 0' }}><Doughnut key={JSON.stringify(data2)} id="chart1" data={data2} options={options} style={{ width: '50%' }} /></div>
        <p style={{ textAlign: 'center' }}>Thanh toán trực tiếp và hình thức khác</p>
        <p className='number'>{getCurrencyThongKe(thuTucConLai ?? 0)} thủ tục ({tyLeThuTucConLai}%)</p>
      </div>
      : null
    }
  </>);
}

export default TyLeGiaoDichThanhToanTrucTuyen;