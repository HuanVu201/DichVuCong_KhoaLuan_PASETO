import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CountDataThongKe06a } from "../BaoCaoTongHop06a";
import { CountTiepNhanHoSoTheoDonVi } from "../TiepNhanHoSoTheoDonVi";

export const XuatTiepNhanHoSoTheoDonViModal = ({
  data,
  tuNgay,
  denNgay,
  groupName
}: {
  data: IBaoCaoDonVi[] | undefined;
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
              <strong>BẢNG THỐNG KÊ CHI TIẾT VIỆC TIẾP NHẬN VÀ TRẢ KẾT QUẢ</strong>
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
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "3%",
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
                minWidth: "20%",
                width: "20%",
                textAlign: 'center'
              }}
            >
              <strong>Đơn vị</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Hồ sơ đã xử lý</strong>
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
              <strong>Hồ sơ đang xử lý</strong>
            </td>
          </tr>
          <tr>


            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'

              }}
            >
              <strong>Trước hạn</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'
              }}
            >
              <strong>Đúng hạn</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'
              }}
            >
              <strong>Quá hạn</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'
              }}
            >
              <strong>Tỷ lệ trước hạn và đúng hạn</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'
              }}
            >
              <strong>Đúng hạn</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "11%",
                textAlign: 'center'
              }}
            >
              <strong>Quá hạn</strong>
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

                    fontFamily: "Times New Roman, Times, serif;",
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

                    fontFamily: "Times New Roman, Times, serif;",
                    minWidth: "350px",
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

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.tongSo ? (

                    getCurrencyThongKe(item.tongSo)

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

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.daXuLyTruocHan ? (

                    getCurrencyThongKe(item.daXuLyTruocHan)

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

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.daXuLyDungHanVaTraLai ? (
                    getCurrencyThongKe(item.daXuLyDungHanVaTraLai)
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

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.daXuLyQuaHan ? (

                    getCurrencyThongKe(item.daXuLyQuaHan)

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

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {(item.daXuLyDungHanVaTraLai + item.daXuLyTruocHan) /
                    (item.daXuLyDungHanVaTraLai + item.daXuLyTruocHan + item.daXuLyQuaHan)
                    ? (Math.round(
                      ((item.daXuLyDungHanVaTraLai + item.daXuLyTruocHan) /
                        (item.daXuLyDungHanVaTraLai +
                          item.daXuLyTruocHan +
                          item.daXuLyQuaHan)) *
                      100 *
                      100
                    ) /
                      100).toString().replace('.', ',') +
                    "%"
                    : "0"}
                </td>

                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.dangXuLyTrongHanVaBoSung ? (

                    getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)

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

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.dangXuLyQuaHan ? (

                    getCurrencyThongKe(item.dangXuLyQuaHan)

                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            ))
            : null}
          <CountTiepNhanHoSoTheoDonVi data={data} />
        </tbody>
      </table>
    </div>
  );
};
