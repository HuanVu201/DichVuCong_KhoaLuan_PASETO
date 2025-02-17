import { useThongKe } from "../../hooks/useThongKe";
import "../ThongKe.scss";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { IThongKeHoSoTrangChu } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen";
ChartJS.register(ArcElement, Tooltip, Legend);
export const PieChartPortal = ({pieChartData,tongSoHoSoTrongNamChart}: 
    {pieChartData: Record<keyof IThongKeHoSoTrangChu, number> | undefined, tongSoHoSoTrongNamChart:any}) => {
    

    const [centerTextPlugin1, setCenterTextPlugin1] = useState<any>();
    const [centerTextPlugin2, setCenterTextPlugin2] = useState<any>();
    const [data1, setData1] = useState<any>();
    const [data2, setData2] = useState<any>();
    const [options, setOptions] = useState<any>();

    useEffect(() => {
        if (pieChartData) {
            const createCenterTextPlugin1 = (id: any, text: any) => ({
                id,
                afterDatasetsDraw: (chart: any) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = `600 0.72rem 'Roboto', Arial`;
                    ctx.textBaseline = 'middle';

                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                },
            });
            const createCenterTextPlugin2 = (id: any, text: any) => ({
                id,
                afterDatasetsDraw: (chart: any) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    ctx.font = `600 0.72rem 'Roboto', Arial`;
                    ctx.textBaseline = 'middle';

                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                },
            });

            setCenterTextPlugin1(createCenterTextPlugin1('centerText1', `Đúng hạn: ${tongSoHoSoTrongNamChart.tyLeDungHan}%`));
            setCenterTextPlugin2(createCenterTextPlugin2('centerText2', `Trực tuyến: ${tongSoHoSoTrongNamChart.tyLeTrucTuyen}%`));

            setData1({
                labels: ['Đã hoàn thành đúng hạn', 'Đã hoàn thành quá hạn'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [tongSoHoSoTrongNamChart.soLuongDungHan, tongSoHoSoTrongNamChart.soLuongQuaHan],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
                        ],
                        borderWidth: 0,
                    },
                ],
            });

            setData2({
                labels: ['Trực tuyến', 'Trực tiếp và BCCI'],
                datasets: [
                    {
                        label: 'Số lượng',
                        data: [tongSoHoSoTrongNamChart.soLuongTrucTuyen, tongSoHoSoTrongNamChart.soLuongKhacTrucTuyen],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
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
                            boxWidth: 20,
                            padding: 5,
                        },
                    },
                },
                maintainAspectRatio: false,
            });

  
        }
    }, [pieChartData]);

    return (
        data1 && data2 ? (
            <>
                {pieChartData?.daHoanThanhDungHan
                    ?
                    <div>
                        <Doughnut id="chart1" data={data1} options={options as any} style={{ flex: 1 }} width={150} plugins={[centerTextPlugin1]} />
                    </div>
                    : <></>
                }
                {pieChartData?.tiepNhanQuaMang
                    ?
                    <div>
                        <Doughnut id="chart2" data={data2} options={options as any} style={{ flex: 1 }} width={150} plugins={[centerTextPlugin2]} />
                    </div>
                    : <></>
                }

            </>
        ) : <>(Không có dữ liệu thống kê!)</>
    );
};
