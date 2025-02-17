import { getCurrency, getCurrencyThongKe } from "@/utils";
import { IThongKeQD766DonDocTTTTElement } from "../../models/ThongKe766Response";
import { CountDataDonDocThanhToanTrucTuyen } from "../DonDocThanhToanTrucTuyen";

export const XuatDonDocThanhToanTrucTuyenTable = ({
  data, tuNgay, denNgay, groupName
}: {
  data: IThongKeQD766DonDocTTTTElement[] | undefined;
  tuNgay?: string,
  denNgay?: string,
  groupName?: string
}) => {
  return (
    <div id="ContainerSwapper1" className="ContainerSwapper1" style={{ display: "none", }}>
      <table

        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
          fontSize: "16px",

        }}
      >
        <thead>
          <tr>
            <td
              colSpan={5}
              style={{
                verticalAlign: "top",
                padding: "5px",
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
                textAlign: 'center',
              }}
            >
              <strong>THEO DÕI THANH TOÁN TRỰC TUYẾN - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTg NGÀY 23/06/2022</strong>
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
          fontSize: "16px",

        }}
      >
        <thead>




          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>STT</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "30%",
              }}
            >
              <strong>Tên đơn vị</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Hồ sơ thu phí</strong>
            </td>
            <td
              colSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Thanh toán</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Tỷ lệ thanh toán trực tuyến</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Phí (VNĐ)</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Lệ phí (VNĐ)</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Tổng số (VNĐ)</strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Trực tiếp</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Trực tuyến</strong>
            </td>
          </tr>
        </thead>

        {/* </thead> */}
        <tbody id="data">
          {data?.map((item, index) => {
            return (
              <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",

                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
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
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.hoSoDaThuPhi ? (
                    <strong>{getCurrencyThongKe(item.hoSoDaThuPhi)}</strong>
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
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.hoSoDaThuPhiTrucTiep ? (
                    <div> {getCurrencyThongKe(item.hoSoDaThuPhiTrucTiep)}</div>
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
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.hoSoDaThuPhiTrucTuyen ? (
                    <div>{getCurrencyThongKe(item.hoSoDaThuPhiTrucTuyen)}</div>
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item?.hoSoDaThuPhiTrucTuyen /
                    (item?.hoSoDaThuPhiTrucTuyen + item?.hoSoDaThuPhiTrucTiep) >
                    0
                    ? Math.abs(
                      Math.round(
                        (item.hoSoDaThuPhiTrucTuyen /
                          (item?.hoSoDaThuPhiTrucTuyen +
                            item?.hoSoDaThuPhiTrucTiep)) *
                        100 *
                        100
                      ) / 100
                    ) + "%"
                    : "0"}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.tongPhi ? <div>{getCurrency(item.tongPhi)}</div> : "0"}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.tongLePhi ? (
                    <div>{getCurrency(item.tongLePhi)}</div>
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
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.tongSoTien ? (
                    <div>{getCurrency(item.tongSoTien)}</div>
                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            );
          })}
          <CountDataDonDocThanhToanTrucTuyen data={data} />
        </tbody>
      </table>
    </div>
  );
};
