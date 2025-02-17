import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo, IThongKeHSLT } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
export const XuatDanhSachHoSoLienThong = ({
    data,
    tuNgay,
    denNgay
}: {
    data: IThongKeHSLT[] | undefined;
    tuNgay ?: string;
    denNgay ?: string;
}) => {
    return (
        <div
            id="DanhSachHSLT"
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
                            <strong>TÌNH HÌNH TIẾP NHẬN 02 NHÓM THỦ TỤC LIÊN THÔNG (ĐĂNG KÝ KHAI SINH - ĐĂNG KÝ KHAI TỬ)</strong>
                            <br />
                            <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i>
                        </td>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>STT</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }} rowSpan={2}>Tên đơn vị xử lý</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }} colSpan={3}>Thủ tục hành chính công liên thông</th>
                    </tr>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Tổng số</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Liên thông Đăng ký khai sinh - đăng ký thường trú - cấp thẻ bảo hiểm y tế cho trẻ dưới 6 tuổi</th>
                        <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Liên thông Đăng ký khai tử - xóa đăng ký thường trú - trợ cấp mai táng phí</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: IThongKeHSLT, index: any) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.groupName}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.tongSoLuongHoSo}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.soLuongHoSoKS}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.soLuongHoSoKT}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
