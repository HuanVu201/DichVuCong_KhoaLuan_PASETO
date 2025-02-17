import { IDanhGiaCoQuan } from "@/features/danhgiacoquan/models";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "@/lib/redux/Hooks";

export const ExportExcelBaoCao02DGHL = ({
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
    const { data: user } = useAppSelector(state => state.user)
    const [xepLoai, setXepLoai] = useState('Yếu')
    const currentDay = dayjs().date();
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();
    const totalDiemTuCham = parseFloat(data?.traLoi1) + parseFloat(data?.traLoi2) + parseFloat(data?.traLoi3) + parseFloat(data?.traLoi4) + parseFloat(data?.traLoi5) + parseFloat(data?.traLoi6) + parseFloat(data?.traLoi7) + parseFloat(data?.traLoi8) + parseFloat(data?.traLoi9)
    const totalDiemThamDinh = parseFloat(data?.thamDinhTraLoi1) + parseFloat(data?.thamDinhTraLoi2) + parseFloat(data?.thamDinhTraLoi3) + parseFloat(data?.thamDinhTraLoi4) + parseFloat(data?.thamDinhTraLoi5) + parseFloat(data?.thamDinhTraLoi6) + parseFloat(data?.thamDinhTraLoi7) + parseFloat(data?.thamDinhTraLoi8) + parseFloat(data?.thamDinhTraLoi9)
    useEffect(() => {
        if (totalDiemThamDinh > 15)
            setXepLoai("Xuất sắc")
        else if (totalDiemThamDinh >= 12 && totalDiemThamDinh < 15)
            setXepLoai("Tốt")
        else if (totalDiemThamDinh >= 9 && totalDiemThamDinh < 12)
            setXepLoai("Khá")
        else if (totalDiemThamDinh >= 6 && totalDiemThamDinh < 9)
            setXepLoai("Trung bình")
        else if (totalDiemThamDinh < 6)
            setXepLoai("Yếu")

    }, [totalDiemThamDinh])
    const totalPercentHaiLong = (diem: string) => {
        const diemNumber = parseFloat(diem);
        const soPhieuNumber = parseFloat(data?.soPhieu);
        if (data) {
            return parseFloat(((diemNumber / soPhieuNumber) * 100).toFixed(1));
        }
        return 0;
    }


    return (
        <div
            id="ExportExcelBaoCao02DGHL"
            style={{ fontSize: "16px", display: 'none' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: "17px", }}>
                <thead>
                    <tr>
                        <td
                            colSpan={3}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            {groupName ? <strong>{groupName.toUpperCase()} </strong> : ''}
                        </td>
                        <td
                            colSpan={4}
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
                        <td colSpan={16} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <td
                            colSpan={7}
                            style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            <strong>BẢNG ĐÁNH GIÁ VIỆC GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH</strong>
                            <br />
                            <i>(Ban hành kèm theo....)</i>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={16} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <td
                            colSpan={7}
                            style={{
                                verticalAlign: "left",
                                padding: "5px",
                                width: "3%",
                                // textAlign: 'center',
                            }}
                        >
                            <strong>Cơ quan/đơn vị: {groupName?.toUpperCase()}</strong>
                            <br />
                            <span>Thời điểm đánh giá: Quý {quy} Năm {nam}</span>
                            <br />
                            <span>Số phiếu đánh giá: {data?.soPhieu}</span>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={7} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <td
                            colSpan={7}
                            style={{
                                verticalAlign: "left",
                                padding: "5px",
                                width: "3%",
                                // textAlign: 'center',
                            }}
                        >
                            <strong>I. Đánh giá việc giải quyết thủ tục hành chính</strong>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={7} style={{ height: '20px' }}></td>
                    </tr>

                    <tr >
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} >Chỉ số</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} >Tên chỉ số</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} >Điểm chuẩn</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} >Điểm tự chấm</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} >Điểm thẩm định</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={2} >Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>1</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Tổng thời gian giải quyết thủ tục hành chính so với quy định của pháp luật</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi1}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi1}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Thời gan thực hiện của từng cơ quan, đơn vị tham gia giải quyết (kể cả đơn vị phối hợp)</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi2}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi2}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>3</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Số lần phải liên hệ với nơi tiếp nhận hồ sơ để hoàn thiện hồ sơ thủ tục hành chính (kể cả liên hệ theo hình thức trực tuyến)</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi3}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi3}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>4</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Số lượng cơ quan, đơn vị, tổ chức phải liên hệ để hoàn thiện hồ sơ thủ tục hành chính (kể cả liên hệ theo hình thức trực tuyến)</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi4}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi4}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>5</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Thực hiện tổ chức tiếp nhận hồ sơ, giải quyết, trả kết quả tại Bộ phận Một cửa</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi5}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi5}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr style={{ height: '50px' }} >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}  >6</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Công khai các thủ tục hành chính</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} >2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} >{data?.traLoi6}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} >{data?.thamDinhTraLoi6}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>7</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Thái độ của cán bộ, công chức, viên chức khi hướng dẫn lập hồ sơ, tiếp nhận hồ sơ và giải quyết thủ tục hành chính</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi7}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi7}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr >
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>8</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Tiếp thu, giải trình đối với các ý kiến phản ánh, kiến nghị của tổ chức, cá nhân</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi8}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi8}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>9</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>Tiến độ và chất lượng cung cấp dịch vụ công trực tuyến của cơ quan có thẩm quyền</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>2</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.traLoi9}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{data?.thamDinhTraLoi9}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}><strong>Tổng cộng</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}><strong>18</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}><strong>{totalDiemTuCham ? totalDiemTuCham : "0"}</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}><strong>{totalDiemThamDinh ? totalDiemThamDinh : "0"}</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}><strong>Xếp loại: {xepLoai}</strong></td>
                    </tr>

                </tbody>

                <tr>
                    <td colSpan={7} style={{ height: '20px' }}></td>
                </tr>

                <tr>
                    <td
                        colSpan={7}
                        style={{
                            verticalAlign: "left",
                            padding: "5px",
                            width: "3%",
                            // textAlign: 'center',
                        }}
                    >
                        <strong>II. Đánh giá mức độ hài lòng</strong>
                    </td>
                </tr>

                <tr>
                    <td colSpan={7} style={{ height: '20px' }}></td>
                </tr>

                <thead>
                    <tr>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }} colSpan={3} >Tỷ lệ % mức độ hài lòng trong việc giải quyết thủ tục hành chính</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left', height: '50px' }}  >Không hài lòng</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left', height: '50px' }}  >Hài lòng</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left', height: '50px' }}  >Rất hài lòng</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>{totalPercentHaiLong(data?.mucDoKHL as any) ? totalPercentHaiLong(data?.mucDoKHL as any) : "0"}%</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>{totalPercentHaiLong(data?.mucDoHL as any) ? totalPercentHaiLong(data?.mucDoHL as any) : "0"}%</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'left' }}>{totalPercentHaiLong(data?.mucDoRHL as any) ? totalPercentHaiLong(data?.mucDoRHL as any) : "0"}%</td>
                    </tr>
                    <tr>
                        <td colSpan={7} style={{ height: '20px' }}></td>
                    </tr>
                    <tr>
                        <td
                            colSpan={5}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >

                        </td>
                        <td
                            colSpan={2}
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
                            colSpan={5}
                            style={{
                                verticalAlign: "top",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >

                        </td>
                        <td
                            colSpan={2}
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
