import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CountDataThongKe07a } from "../BaoCaoTongHop07a";
import { useMemo } from "react";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoTongHop07aModal = ({
  data,
  tuNgay,
  denNgay,
  catalog,
  groupName
}: {
  data: IBaoCaoDonVi[] | undefined;
  tuNgay?: string;
  denNgay?: string;
  catalog: CAP_THUC_HIEN | undefined,
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
              colSpan={5}
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
              colSpan={8}
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
              colSpan={13}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong>TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT TTHC TẠI CƠ QUAN, ĐƠN VỊ TRỰC TIẾP GIẢI QUYẾT TTHC</strong>
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
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "3%",
              }}
            >
              <strong>STT</strong>
            </td>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "20%",
              }}
            >
              <strong>Lĩnh vực, công việc giải quyết theo cấp</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
              }}
            >
              <strong>Số hồ sơ nhận giải quyết</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
              }}
            >
              <strong>Số hồ sơ đã giải quyết</strong>
            </td>
            <td
              colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
              }}
            >
              <strong>Số lượng hồ sơ đang giải quyết</strong>
            </td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              colSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Trong đó</strong>
            </td>

            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Từ kỳ trước</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Trước hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Đúng hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Quá hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Trong hạn</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Quá hạn</strong>
            </td>
          </tr>
          <tr>
            {" "}
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "7%",
              }}
            >
              <strong>Trực tuyến</strong>
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
              <strong>Trực tiếp, dịch vụ bưu chính</strong>
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
                    fontSize: "16px",
                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.tongSo ? getCurrencyThongKe(item.tongSo) : "0"}
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
                  {item.tiepNhanQuaMang
                    ? getCurrencyThongKe(item.tiepNhanQuaMang)
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
                  {item.tiepNhanTrucTiepVaBCCI
                    ? getCurrencyThongKe(item.tiepNhanTrucTiepVaBCCI)
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
                  {item.tiepNhanKyTruoc
                    ? getCurrencyThongKe(item.tiepNhanKyTruoc)
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
                  {item.daXuLyVaTraLai
                    ? getCurrencyThongKe(item.daXuLyVaTraLai)
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
                  {item.daXuLyTruocHan
                    ? getCurrencyThongKe(item.daXuLyTruocHan)
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
                  {item.daXuLyDungHanVaTraLai
                    ? getCurrencyThongKe(item.daXuLyDungHanVaTraLai)
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
                  {item.daXuLyQuaHan ? getCurrencyThongKe(item.daXuLyQuaHan) : "0"}
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
                  {item.dangXuLyVaBoSung
                    ? getCurrencyThongKe(item.dangXuLyVaBoSung)
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
                  {item.dangXuLyTrongHanVaBoSung
                    ? getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)
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
                  {item.dangXuLyQuaHan
                    ? getCurrencyThongKe(item.dangXuLyQuaHan)
                    : "0"}
                </td>
              </tr>
            ))
            : null}
          <CountDataThongKe07aExcel data={data} />
        </tbody>
      </table>
    </div>
  );
};

export const CountDataThongKe07aExcel = ({
  data,
}: {
  data: IBaoCaoDonVi[] | undefined;
}) => {
  const [tongSoTotal, tiepNhanQuaMangTotal, tiepNhanTrucTiepVaBCCITotal,
    tiepNhanKyTruocTotal, daXuLyVaTraLaiTotal, daXuLyTruocHanTotal, daXuLyDungHanVaTraLaiTotal,
    daXuLyQuaHanTotal, dangXuLyVaBoSungTotal, dangXuLyTrongHanVaBoSungTotal, dangXuLyQuaHanTotal
  ] = useMemo(() => {

    let tongSoTotal = 0, tiepNhanQuaMangTotal = 0, tiepNhanTrucTiepVaBCCITotal = 0,
      tiepNhanKyTruocTotal = 0, daXuLyVaTraLaiTotal = 0, daXuLyTruocHanTotal = 0, daXuLyDungHanVaTraLaiTotal = 0,
      daXuLyQuaHanTotal = 0, dangXuLyVaBoSungTotal = 0, dangXuLyTrongHanVaBoSungTotal = 0, dangXuLyQuaHanTotal = 0

    data?.forEach((item: IBaoCaoDonVi) => {
      tongSoTotal += item.tongSo
      tiepNhanQuaMangTotal += item.tiepNhanQuaMang
      tiepNhanTrucTiepVaBCCITotal += item.tiepNhanTrucTiepVaBCCI
      tiepNhanKyTruocTotal += item.tiepNhanKyTruoc
      daXuLyVaTraLaiTotal += item.daXuLyVaTraLai
      daXuLyTruocHanTotal += item.daXuLyTruocHan
      daXuLyDungHanVaTraLaiTotal += item.daXuLyDungHanVaTraLai
      daXuLyQuaHanTotal += item.daXuLyQuaHan
      dangXuLyVaBoSungTotal += item.dangXuLyVaBoSung
      dangXuLyTrongHanVaBoSungTotal += item.dangXuLyTrongHanVaBoSung
      dangXuLyQuaHanTotal += item.dangXuLyQuaHan
    })



    return [tongSoTotal, tiepNhanQuaMangTotal, tiepNhanTrucTiepVaBCCITotal,
      tiepNhanKyTruocTotal, daXuLyVaTraLaiTotal, daXuLyTruocHanTotal, daXuLyDungHanVaTraLaiTotal,
      daXuLyQuaHanTotal, dangXuLyVaBoSungTotal, dangXuLyTrongHanVaBoSungTotal, dangXuLyQuaHanTotal];
  }, [data]);


  return (
    <tr>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "left",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
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
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tongSoTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tiepNhanQuaMangTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tiepNhanTrucTiepVaBCCITotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tiepNhanKyTruocTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(daXuLyVaTraLaiTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(daXuLyTruocHanTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(daXuLyDungHanVaTraLaiTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(daXuLyQuaHanTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(dangXuLyVaBoSungTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(dangXuLyTrongHanVaBoSungTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(dangXuLyQuaHanTotal)}
      </td>
    </tr>
  )
}