import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IYeuCauThanhToan } from "@/pages/dvc/thuphilephi/models/YeuCauThanhToan";

import { getCurrency } from "@/utils";
import dayjs from "dayjs";
export const XuatDanhSachHoSoTTTTModal = ({
  data, title, donViThongKe, tuNgay, denNgay
}: {
  data: IYeuCauThanhToan[] | undefined;
  title?: string,
  donViThongKe?: string;
  tuNgay?: string,
  denNgay?: string
}) => {
  var tongPhi = 0;
  var tongLePhi = 0;
  var tongSo = 0;
  return (
    <div id="ContainerSwapper">
      <table
        id="danhSachHoSoTable"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
          fontSize: "16px",
          display: "none"
        }}
      >
        <thead>
          <tr></tr>
          <tr>
            <td
              colSpan={12}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                fontSize: "15px",
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              {title}
            </td>
          </tr>
          <tr>
            <td
              colSpan={12}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                fontSize: "15px",
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              (Từ ngày {tuNgay || '...'} đến ngày {denNgay || '...'})
            </td>
          </tr>
          <tr>
            <td
              colSpan={12}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                fontSize: "15px",
                textAlign: 'left',
                fontWeight: 600
              }}
            >
              Đơn vị thống kê: {donViThongKe}
            </td>
          </tr>
          <tr>
            <td colSpan={8} style={{ verticalAlign: "middle", padding: "5px" }}>
              <strong></strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>STT</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Mã hồ sơ</strong>
            </td>
            {/* <td
            style={{
              verticalAlign: "middle",
              padding: "5px",
              border: "1px solid #333",
            }}
          >
            <strong>Người tiếp nhận</strong>
          </td> */}

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Loại tiếp nhận</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Tên người nộp</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Số biên lai</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Mẫu số</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Ký hiệu</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Ngày tiếp nhận</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Ngày thu</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Phí (VNĐ)</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Lệ phí (VNĐ)</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
            >
              <strong>Tổng (VNĐ)</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
          {data?.map((item, index) => {
            tongPhi += item?.phi ? parseInt(item?.phi) : 0;
            tongLePhi += item?.lePhi ? parseInt(item?.lePhi) : 0;

            return (
              <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item?.maHoSo}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item?.kenhThucHien == "1" ||
                    item?.kenhThucHien == "2" ||
                    item?.kenhThucHien == "3" ? (
                    <>
                      <div >
                        {KENH_THUC_HIEN[item.kenhThucHien]}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item?.nguoiNopTienBienLai
                    ? item?.nguoiNopTienBienLai
                    : item?.chuHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item.soBienLai}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item.mauSoBienLai}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item.kyHieuBienLai}
                </td>

                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item?.ngayTiepNhan
                    ? dayjs(item.ngayTiepNhan).format(FORMAT_DATE)
                    : ""}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {item?.ngayThuPhi
                    ? dayjs(item.ngayThuPhi).format(FORMAT_DATE)
                    : ""}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: "right",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {getCurrency(item.phi ?? "0")}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: "right",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {getCurrency(item.lePhi ?? "0")}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: "right",
                    color: item?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""
                  }}
                >
                  {getCurrency(item.soTien ?? "0")}
                </td>
              </tr>
            );
          })}
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
              }}
              colSpan={9}
            >

              <strong>
                Tổng số
              </strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "right",
              }}
            >
              <strong>{getCurrency(tongPhi)}</strong>

            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "right",
              }}
            >   <strong> {getCurrency(tongLePhi)}</strong>

            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "right",
              }}
            >
              <strong> {getCurrency(tongPhi + tongLePhi)}</strong>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
