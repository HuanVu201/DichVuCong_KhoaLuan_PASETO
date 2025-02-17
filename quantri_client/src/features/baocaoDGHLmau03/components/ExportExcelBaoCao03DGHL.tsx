import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { IDanhGiaCoQuan } from "@/features/danhgiacoquan/models";
import { IPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo, IThongKeHSLT } from "@/features/hoso/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { getCurrency } from "@/utils";
import { Underline } from "@ckeditor/ckeditor5-basic-styles";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

export const QUYSOLAMA: Record<string, string> = {
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
}

const xepLoai = (tongDiem: number) => {
    var loai = 'Yếu'
    if (tongDiem > 15)
        loai = 'Xuất sắc'
    else if (tongDiem >= 12 && tongDiem < 15)
        loai = 'Tốt'
    else if (tongDiem >= 9 && tongDiem < 12)
        loai = 'Khá'
    else if (tongDiem >= 6 && tongDiem < 9)
        loai = 'Trung bình'
    else if (tongDiem < 6)
        loai = 'Yếu'
    return loai;
}

export const ExportExcelBaoCao03DGHL = ({
    data,
    quy,
    nam,
    donVi,
    groupName
}: {
    data: any | undefined;
    quy?: string;
    nam?: string;
    donVi?: string;
    groupName?: string;
}) => {

    const totaltraLoi1 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi1), 0) || 0;
    const totaltraLoi2 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi2), 0) || 0;
    const totaltraLoi3 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi3), 0) || 0;
    const totaltraLoi4 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi4), 0) || 0;
    const totaltraLoi5 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi5), 0) || 0;
    const totaltraLoi6 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi6), 0) || 0;
    const totaltraLoi7 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi7), 0) || 0;
    const totaltraLoi8 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi8), 0) || 0;
    const totaltraLoi9 = data?.reduce((acc: any, item: any) => acc + Number(item.traLoi9), 0) || 0;
    const totalSoPhieu = data?.reduce((acc: any, item: any) => acc + Number(item.soPhieu), 0) || 0;
    const total = totaltraLoi1 + totaltraLoi2 + totaltraLoi3 + totaltraLoi4 + totaltraLoi5 + totaltraLoi6 + totaltraLoi7 + totaltraLoi8 + totaltraLoi9

    const averages = useMemo(() => {
        if (data) {
            if (data?.length === 0) return {
                averagetraLoi1: 0,
                averagetraLoi2: 0,
                averagetraLoi3: 0,
                averagetraLoi4: 0,
                averagetraLoi5: 0,
                averagetraLoi6: 0,
                averagetraLoi7: 0,
                averagetraLoi8: 0,
                averagetraLoi9: 0,
            };

            const totalItems = data.length;

            return {
                averagetraLoi1: Math.floor((totaltraLoi1 / totalItems) * 10) / 10,
                averagetraLoi2: Math.floor((totaltraLoi2 / totalItems) * 10) / 10,
                averagetraLoi3: Math.floor((totaltraLoi3 / totalItems) * 10) / 10,
                averagetraLoi4: Math.floor((totaltraLoi4 / totalItems) * 10) / 10,
                averagetraLoi5: Math.floor((totaltraLoi5 / totalItems) * 10) / 10,
                averagetraLoi6: Math.floor((totaltraLoi6 / totalItems) * 10) / 10,
                averagetraLoi7: Math.floor((totaltraLoi7 / totalItems) * 10) / 10,
                averagetraLoi8: Math.floor((totaltraLoi8 / totalItems) * 10) / 10,
                averagetraLoi9: Math.floor((totaltraLoi9 / totalItems) * 10) / 10,
            };
        }

    }, [data]);

    const { data: user } = useAppSelector(state => state.user)
    const currentDay = dayjs().date();
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();
    const [rankData, setRankData] = useState([])
    var tongDiem = averages ? (averages?.averagetraLoi1 + averages?.averagetraLoi2 + averages?.averagetraLoi3 + averages?.averagetraLoi4 + averages?.averagetraLoi5 + averages?.averagetraLoi6 + averages?.averagetraLoi7 + averages?.averagetraLoi8 + averages?.averagetraLoi9) : 0
    var xepLoaiTong = xepLoai(tongDiem)
    const totalPercentHaiLong = (diem: string, soPhieu: string) => {
        const diemNumber = parseFloat(diem);
        const soPhieuNumber = parseFloat(soPhieu);
        if (data) {
            return parseFloat(((diemNumber / soPhieuNumber) * 100).toFixed(1));
        }
        return 0;
    }
    const tinhXepHang = (tongDiem: number, data: any) => {
        if (!data || data.length === 0) return 0;

        const sortedScores = [...data]
            .map(item => Number(item.traLoi1) + Number(item.traLoi2) + Number(item.traLoi3) + Number(item.traLoi4) + Number(item.traLoi5) + Number(item.traLoi6) + Number(item.traLoi7) + Number(item.traLoi8) + Number(item.traLoi9))
            .sort((a, b) => b - a);

        // Tìm thứ hạng dựa trên điểm số
        return sortedScores.indexOf(tongDiem) + 1;
    };
    useEffect(() => {
        if (data) {
            const rankedData = data.map((item: any) => ({
                ...item,
                tongDiem: Number(item.traLoi1) + Number(item.traLoi2) + Number(item.traLoi3) + Number(item.traLoi4) + Number(item.traLoi5) + Number(item.traLoi6) + Number(item.traLoi7) + Number(item.traLoi8) + Number(item.traLoi9)
            })).sort((a: any, b: any) => b.tongDiem - a.tongDiem)
                .map((item: any, index: any) => ({
                    ...item,
                    xepHang: index + 1
                }));
            setRankData(rankedData)
        }

    }, [data]
    )


    return (
        <div
            id="ExportExcelBaoCao03DGHL"
            style={{ fontSize: "16px", display: 'none' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: "17px", }}>
                <thead>
                    <tr>
                        <td
                            colSpan={7}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            {groupName == "Cục Thuế tỉnh" ?
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: '500' }}>VĂN PHÒNG UBND TỈNH THANH HÓA</div>
                                    <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong>
                                </div>
                                :
                                <strong>{groupName?.toUpperCase()} </strong>}
                        </td>
                        <td
                            colSpan={10}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br /><span style={{ borderBottom: '5px solid black', paddingBottom: '2px', display: 'inline-block' }}>Độc lập - Tự do - Hạnh phúc</span></strong>
                        </td>

                    </tr>

                    <tr>
                        <td colSpan={17} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <td
                            colSpan={17}
                            style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                                fontSize: '17px'
                            }}
                        >
                            <strong>BẢNG TỔNG HỢP CHỈ SỐ THÀNH PHẦN, MỨC ĐỘ HÀI LÒNG, XẾP LOẠI QUÝ {quy ? QUYSOLAMA[quy] : null} / {nam}</strong>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={17} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <td colSpan={17} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>TT</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>Tên cơ quan</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>Số phiếu</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={9}>Điểm chỉ số thành phần</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} rowSpan={2}>Tổng điểm</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} rowSpan={2}>Xếp loại</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} rowSpan={2}>Xếp hạng</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={3}>Mức độ hài lòng (%)</th>

                    </tr>
                    <tr>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 1</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 2</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 3</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 4</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 5</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 6</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 7</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 8</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 9</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Không hài lòng</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Hài lòng</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Rất hài lòng</th>
                    </tr>
                </thead>
                <tbody>
                    {rankData?.map((item: IDanhGiaCoQuan, index: any) => {
                        const tongDiem = Number(item.traLoi1) + Number(item.traLoi2) + Number(item.traLoi3) + Number(item.traLoi4) + Number(item.traLoi5) + Number(item.traLoi6) + Number(item.traLoi7) + Number(item.traLoi8) + Number(item.traLoi9)
                        const xepHang = tinhXepHang(tongDiem, data);
                        console.log(xepHang);

                        const a = xepLoai(tongDiem)
                        return (
                            <tr key={index}>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>{item.groupName}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.soPhieu ? item.soPhieu : "0"}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi1}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi2}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi3}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi4}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi5}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi6}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi7}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi8}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.traLoi9}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{tongDiem}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{a}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{xepHang}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalPercentHaiLong(item.mucDoKHL, item.soPhieu) ? totalPercentHaiLong(item.mucDoKHL, item.soPhieu) : "0"}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalPercentHaiLong(item.mucDoHL, item.soPhieu) ? totalPercentHaiLong(item.mucDoHL, item.soPhieu) : "0"}</td>
                                <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalPercentHaiLong(item.mucDoRHL, item.soPhieu) ? totalPercentHaiLong(item.mucDoRHL, item.soPhieu) : "0"}</td>

                            </tr>
                        )
                    }
                    )}
                    {/* Hàng tổng */}
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>Tổng</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalSoPhieu}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                    </tr>

                    {/* Các hàng trống ngăn cách */}
                    <tr>
                        <td colSpan={7} style={{ height: '20px' }}></td>
                    </tr>
                    <tr>
                        <td colSpan={7} style={{ height: '20px' }}></td>
                    </tr>
                    <tr>
                        <td colSpan={7} style={{ height: '20px' }}></td>
                    </tr>
                    {/*  */}

                    <tr>
                        <td
                            colSpan={7}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >

                        </td>
                        <td
                            colSpan={10}
                            style={{
                                verticalAlign: "right",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            <i>Thanh Hóa, ngày {currentDay} tháng {currentMonth + 1} năm {currentYear}</i>
                            <br />
                            <strong style={{ fontSize: '17px', textAlign: 'center' }}>NGƯỜI TỔNG HỢP</strong>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ height: '20px' }}></td>
                    </tr>
                    <tr>
                        <td
                            colSpan={7}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >

                        </td>
                        <td
                            colSpan={10}
                            style={{
                                verticalAlign: "right",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            <span>{user?.fullName}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
