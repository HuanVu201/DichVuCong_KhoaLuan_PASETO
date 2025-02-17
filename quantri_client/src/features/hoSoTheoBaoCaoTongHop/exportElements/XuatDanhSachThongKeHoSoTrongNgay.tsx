import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo, IThongKeHoSoTrongNgay, IThongKeHSLT } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
export const XuatDanhSachHoSoTrongNgay = ({
    data,
    tuNgay,
    denNgay
}: {
    data: IThongKeHoSoTrongNgay[] | undefined;
    tuNgay?: string;
    denNgay?: string;
}) => {
    const currentDate = dayjs();
    
    return (
        <div
            id="DanhSachThongKeHSTrongNgay"
            style={{ fontSize: "16px", display: 'none' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <td
                            colSpan={8}
                            style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                textAlign: 'center',
                            }}
                        >
                            <strong>THỐNG KÊ SỐ LƯỢNG HỒ SƠ TRONG NGÀY ({currentDate.format("DD/MM/YYYY")})</strong>
                            <br />
                            {/* <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i> */}
                        </td>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >STT</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Tên đơn vị xử lý</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Tiếp nhận trong ngày</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Có kết quả trong ngày</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Đã trả công dân trong ngày</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Thu phí, lệ phí trong ngày</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Yêu cầu bổ sung trong ngày</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Yêu cầu trả lại, xin rút trong ngày</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: IThongKeHoSoTrongNgay, index: any) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.groupName}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.tiepNhanTrongNgay}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.coKetQuaTrongNgay}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.daTraCongDanTrongNgay}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.thuPhiLePhiTrongNgay}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.yeuCauBoSungTrongNgay}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.yeuCauTraLaiXinRutTrongNgay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
