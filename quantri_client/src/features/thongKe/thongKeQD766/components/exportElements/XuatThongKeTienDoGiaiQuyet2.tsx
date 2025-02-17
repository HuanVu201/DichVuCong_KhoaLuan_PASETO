import { getCurrencyThongKe } from "@/utils";
import { IThongKeQD766DonDocTTTTElement, IThongKeTienDoGiaiQuyetElement, IThongKeTienDoGiaiQuyetResponse } from "../../models/ThongKe766Response";
import { CountDataThongKeThanhToanTheoHinhThucThanhToan } from "../ThongKeThanhToanTheoHinhThucThanhToan";
import { CountDataTienDoGiaiQuyet2 } from "../TienDoGiaiQuyet2";

export const XuatThongKeTienDoGiaiQuyet2 = ({
  data, tuNgay, denNgay, groupName
}: {
  data: IThongKeTienDoGiaiQuyetElement[] | undefined;
  tuNgay?: string,
  denNgay?: string,
  groupName?: string
}) => {



  return (
    <div style={{ display: 'none' }} className="ContainerSwapper1" id="ContainerSwapper1">

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
              colSpan={7}
              style={{
                verticalAlign: "top",
                padding: "5px",
                textAlign: 'center',
              }}
            >
              {groupName ? <strong>{groupName.toUpperCase()} </strong> : ''}
            </td>
            <td
              colSpan={8}
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
              colSpan={15}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                textAlign: 'center',
              }}
            >
              <strong>THEO DÕI TIẾN ĐỘ GIẢI QUYẾT - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022</strong>
              <br />
              <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i>
            </td>
          </tr>

          <tr><p></p></tr>
        </thead>
      </table>
      <table
        id="tableToExcel2"
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
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>STT</strong>
            </td>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "20%"
              }}
            >
              <strong>Đơn vị</strong>
            </td>
            <td
              colSpan={6}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Tiếp nhận</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              {/*  (Đã xử lý xong + Đã trả kết quả + Rút) */}
              <strong>Đã xử lý</strong>
            </td>
            <td
              colSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Đang xử lý</strong>
            </td>
            {/* <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
             
              <strong>
                Tạm dừng xử lý <br />
              </strong>
            </td> */}
          </tr>
          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Kỳ trước chuyển sang</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Trong kỳ</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Trước hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Trong hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Quá hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Trong hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Quá hạn</strong>
            </td>

          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Trực tuyến</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>Trực tiếp</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                width: "6%"
              }}
            >
              <strong>BCCI</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
          {data?.filter((x) => x.catalog)
            .map((item, index) => {
              return (
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      verticalAlign: "left",
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
                    {getCurrencyThongKe(item.tongSo)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tiepNhanKyTruoc)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tongTiepNhan)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tiepNhanQuaMang)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tiepNhanTrucTiep)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tiepNhanBCCI)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tongDaXuLy)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.daXuLyTruocHan)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.daXuLyDungHan)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.daXuLyQuaHan)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.dangXuLyVaBoSung)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.dangXuLyQuaHan)}
                  </td>
                  {/* <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {getCurrencyThongKe(item.tongTamDungXuLy)}
                  </td> */}
                </tr>
              );
            })}
          <CountDataTienDoGiaiQuyet2 data={data} />
        </tbody>
      </table>
    </div>
  );
};
