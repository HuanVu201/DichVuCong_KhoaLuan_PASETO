import { getCurrencyThongKe } from "@/utils";
import { CountTiepNhanHoSoTheoDonVi } from "../TiepNhanHoSoTheoDonVi";
import { TongHopHoSoTheoTrangThaiResponse } from "../../models/TongHopHoSoTheoTrangThaiResponse";

export const XuatBaoCaoHoSoLLTPVNeID = ({
  data,
  totalTk,
  tuNgay,
  denNgay,
  groupName
}: {
  data: TongHopHoSoTheoTrangThaiResponse[] | undefined;
  totalTk: TongHopHoSoTheoTrangThaiResponse;
  tuNgay?: string;
  denNgay?: string;
  groupName: string | undefined
}) => {
  return (
    <div id="ContainerSwapper1" className="ContainerSwapper1" style={{ fontSize: "16px", display: "none" }}>
      <table

        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",

        }}
      >
        <thead>

          <tr>
            <td
              colSpan={4}
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
              colSpan={5}
              style={{
                verticalAlign: "top",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br /><u>Độc lập - Tự do - Hạnh phúc</u></strong>
            </td>

          </tr>

          <tr>
            <td
              colSpan={9}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong> TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC CẤP PHIẾU LLTP QUA VNEID</strong>
              <br />
              <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i>
            </td>
          </tr>

          <tr><p></p></tr>
        </thead>
      </table>
      <table
        id="tableToExcel"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",

        }}
      >
        <thead>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "1%",
                textAlign: 'center'
              }}
            >
              <strong>STT</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "20%",
                textAlign: 'center'
              }}
            >
              <strong>Đơn vị</strong>
            </td>
            <td

              // colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Mới đăng ký</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Được tiếp nhận</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Không được tiếp nhận</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'

              }}
            >
              <strong>Đang xử lý</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Bổ sung giấy tờ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Đã xử lý xong</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Đã trả kết quả</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Hồ sơ VNeID/ tổng hồ sơ</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
          {data && data.length > 0
            ? data.map((item, index) => (
              <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",


                  }}
                >
                  {index}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.tenThongKe}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.moiDangKy ? (
                    getCurrencyThongKe(item.moiDangKy)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.duocTiepNhan ? (
                    getCurrencyThongKe(item.duocTiepNhan)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.tuChoiTiepNhan ? (
                    getCurrencyThongKe(item.tuChoiTiepNhan)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.dangXuLy ? (
                    getCurrencyThongKe(item.dangXuLy)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.boSungHoSo ? (
                    getCurrencyThongKe(item.boSungHoSo)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.daXuLyXong ? (
                    getCurrencyThongKe(item.daXuLyXong)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.daTraKetQua ? (
                    getCurrencyThongKe(item.daTraKetQua)
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.tongSo ? (
                    `${getCurrencyThongKe(item.tongTheoLoaiDuLieuKetNoi)} / ${getCurrencyThongKe(item.tongSo)}`
                  ) : (
                    "0"
                  )}
                </td>

              </tr>

            ))
            : null}
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",


              }}
            >

            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              Tổng số
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.moiDangKy ? (

                getCurrencyThongKe(totalTk.moiDangKy)

              ) : (
                "0"
              )}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.duocTiepNhan ? (
                getCurrencyThongKe(totalTk.duocTiepNhan)
              ) : (
                "0"
              )}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.tuChoiTiepNhan ? (
                getCurrencyThongKe(totalTk.tuChoiTiepNhan)
              ) : (
                "0"
              )}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.dangXuLy ? (
                getCurrencyThongKe(totalTk.dangXuLy)
              ) : (
                "0"
              )}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.boSungHoSo ? (
                getCurrencyThongKe(totalTk.boSungHoSo)
              ) : (
                "0"
              )}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.daXuLyXong ? (
                getCurrencyThongKe(totalTk.daXuLyXong)
              ) : (
                "0"
              )}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.daTraKetQua ? (
                getCurrencyThongKe(totalTk.daTraKetQua)
              ) : (
                "0"
              )}
            </td>

            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {totalTk.tongSo ? (
                `${getCurrencyThongKe(totalTk.tongTheoLoaiDuLieuKetNoi)} / ${getCurrencyThongKe(totalTk.tongSo)}`
              ) : (
                "0"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
