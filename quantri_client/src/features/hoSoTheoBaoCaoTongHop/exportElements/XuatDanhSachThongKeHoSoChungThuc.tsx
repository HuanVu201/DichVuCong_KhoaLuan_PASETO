import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo, IThongKeHSLT } from "@/features/hoso/models";
import { IThongKeHoSoChungThuc } from "@/features/sochungthuc/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
export const XuatDanhSachHoSoChungThuc = ({
    data,
    tuNgay,
    denNgay
}: {
    data: IThongKeHoSoChungThuc[] | undefined;
    tuNgay?: string;
    denNgay?: string;
}) => {
    return (
        <div
            id="DanhSachHoSoChungThuc"
            style={{ fontSize: "16px", display: 'none' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <td
                            colSpan={5}
                            style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                width: "3%",
                                textAlign: 'center',
                            }}
                        >
                            <strong>THỐNG KÊ SỐ LƯỢNG HỒ SƠ CHỨNG THỰC BẢN GIẤY VÀ ĐIỆN TỬ</strong>
                            <br />
                            <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i>
                        </td>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >STT</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} >Tên đơn vị xử lý</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} >Tổng số bản chứng thực</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} >Tổng số bản giấy</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} >Tổng số bản điện tử</th>
                    </tr>

                </thead>
                <tbody>
                    {data?.map((item: IThongKeHoSoChungThuc, index: any) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.tenDonVi}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.tongSoHoSo}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.banGiay}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.banDienTu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
