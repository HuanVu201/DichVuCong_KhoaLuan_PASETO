import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { IPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo, IThongKeHSLT } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import { Underline } from "@ckeditor/ckeditor5-basic-styles";
import dayjs from "dayjs";
import { useMemo } from "react";



export const ExportExcelBaoCao01DGHL = ({
    data,
    quy,
    nam,
    donVi,
    groupName
}: {
    data: IPhieuKhaoSat[] | undefined;
    quy?: string;
    nam?: string;
    donVi?: string;
    groupName?: string;
}) => {
    const totalChiSo1 = data?.reduce((acc, item) => acc + Number(item.chiSo1), 0) || 0;
    const totalChiSo2 = data?.reduce((acc, item) => acc + Number(item.chiSo2), 0) || 0;
    const totalChiSo3 = data?.reduce((acc, item) => acc + Number(item.chiSo3), 0) || 0;
    const totalChiSo4 = data?.reduce((acc, item) => acc + Number(item.chiSo4), 0) || 0;
    const totalChiSo6 = data?.reduce((acc, item) => acc + Number(item.chiSo6), 0) || 0;
    const totalChiSo7 = data?.reduce((acc, item) => acc + Number(item.chiSo7), 0) || 0;
    const averages = useMemo(() => {
        if (data) {
            if (data?.length === 0) return {
                averageChiSo1: 0,
                averageChiSo2: 0,
                averageChiSo3: 0,
                averageChiSo4: 0,
                averageChiSo6: 0,
                averageChiSo7: 0
            };

            const totalItems = data.length;

            return {
                averageChiSo1: Math.floor((totalChiSo1 / totalItems) * 10) / 10,
                averageChiSo2: Math.floor((totalChiSo2 / totalItems) * 10) / 10,
                averageChiSo3: Math.floor((totalChiSo3 / totalItems) * 10) / 10,
                averageChiSo4: Math.floor((totalChiSo4 / totalItems) * 10) / 10,
                averageChiSo6: Math.floor((totalChiSo6 / totalItems) * 10) / 10,
                averageChiSo7: Math.floor((totalChiSo7 / totalItems) * 10) / 10
            };
        }

    }, [data]);
    const totalMucDoRHL = data?.reduce((acc, item) => acc + Number(item.mucDoRHL), 0) || 0;
    const totalMucDoHL = data?.reduce((acc, item) => acc + Number(item.mucDoHL), 0) || 0;
    const totalMucDoKHL = data?.reduce((acc, item) => acc + Number(item.mucDoKHL), 0) || 0;
    const totalPercentHaiLong = (diem: number) => {
        if (data && data.length > 0) {
            return parseFloat(((diem / data.length) * 100).toFixed(1));
        }
        return 0;
    }
    return (
        <div
            id="ExportExcelBaoCao01DGHL"
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
                            {groupName ? <strong>{groupName.toUpperCase()} </strong> : ''}
                        </td>
                        <td
                            colSpan={9}
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
                            colSpan={16}
                            style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            <strong>TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CÁC CHỈ SỐ THÀNH PHẦN; XẾP LOẠI CÁN BỘ, CÔNG CHỨC VÀ MỨC ĐỘ HÀI LÒNG THÔNG QUA PHIẾU ĐÁNH GIÁ</strong>
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
                            <strong>Cơ quan/đơn vị: {groupName}</strong>
                            <br />
                            <span>Thời điểm đánh giá: Quý {quy} Năm {nam}</span>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={16} style={{ height: '20px' }}></td>
                    </tr>

                    <tr>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>TT</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>Hồ sơ</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={6}>Điểm chỉ số thành phần</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={2}>Xếp loại CB,CC</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={3}>Mức độ hài lòng</th>
                    </tr>
                    <tr>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 1</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 2</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 3</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 4</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 6</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Chỉ số 7</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Tổng điểm đánh giá CBCC(cột 1+2+3+4+7)</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Xếp loại hoàn thành nhiệm vụ</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Không hài lòng</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Hài lòng</th>
                        <th style={{ border: '0.75px groove #4d4d4d', padding: '8px', backgroundColor: '#f2f2f2' }}>Rất hài lòng</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: IPhieuKhaoSat, index: any) => (
                        <tr key={index}>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.maHoSo}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.chiSo1}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.chiSo2}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.chiSo3}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.chiSo4}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.chiSo6}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.chiSo7}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{Number(item.chiSo1) + Number(item.chiSo2) + Number(item.chiSo3) + Number(item.chiSo4) + Number(item.chiSo7)}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>100%</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.mucDoKHL !== "0" ? item.mucDoKHL : ""}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.mucDoHL !== "0" ? item.mucDoHL : ""}</td>
                            <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{item.mucDoRHL !== "0" ? item.mucDoRHL : ""}</td>
                        </tr>
                    ))}

                    {/* Hàng tổng số */}
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}><strong>Tổng số</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalChiSo1}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalChiSo2}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalChiSo3}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalChiSo4}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalChiSo6}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalChiSo7}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalMucDoKHL}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalMucDoHL}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalMucDoRHL}</td>
                    </tr>

                    {/* Hàng Điểm bình quân chỉ số */}
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}><strong>Điểm bình quân chỉ số</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{averages?.averageChiSo1}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{averages?.averageChiSo2}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{averages?.averageChiSo3}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{averages?.averageChiSo4}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{averages?.averageChiSo6}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{averages?.averageChiSo7}</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                    </tr>
                    {/* Hàng Tỷ lệ % hài lòng */}
                    <tr>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }} colSpan={2}><strong>Tỷ lệ % hài lòng</strong></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}></td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalPercentHaiLong(totalMucDoKHL as any)}%</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalPercentHaiLong(totalMucDoHL as any)}%</td>
                        <td style={{ border: '0.75px groove #4d4d4d', padding: '8px', textAlign: 'center' }}>{totalPercentHaiLong(totalMucDoRHL as any)}%</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};
