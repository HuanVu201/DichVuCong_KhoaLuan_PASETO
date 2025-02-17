import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { ITiepNhanHoSoTrucTuyenElm } from "../../models/TiepNhanHoSoTrucTuyen";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
export const XuatThongKeHoSoTrucTuyenModal = ({
  data,
  tuNgay,
  denNgay,
  tenDonVi,

}: {
  data: ITiepNhanHoSoTrucTuyenElm[] | undefined;
  tuNgay?: string;
  denNgay?: string;
  tenDonVi?: string;

}) => {
  const getElementThongKe = (item: any, index: number) => {
    return (
      <>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            <strong>{index}</strong>
          </td>
          <td
            style={{
              verticalAlign: "middle",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
              textAlign: "left",
              minWidth: "350px",
              fontWeight: "bold"
            }}
          >
            {item.tenThongKe}
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

          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen) > 0 ? (
              <strong>
                {Math.round((item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen)) * 100 * 100) /
                  100}
                %
              </strong>
            ) : (
              "0"
            )}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tthcDatChiTieu ? item.tthcDatChiTieu : "0"}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tthcKhongDatChiTieu ? item.tthcKhongDatChiTieu : "0"}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tthcKhongPhatSinhHoSo ? item.tthcKhongPhatSinhHoSo : "0"}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >

          </td>
        </tr>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "left",
              minWidth: "350px",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            DVC trực tuyến một phần
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
            {item.tongMotPhan ? (
              getCurrencyThongKe(item.tongMotPhan)
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
            {item.tongMotPhanTrucTuyen ? (
              getCurrencyThongKe(item.tongMotPhanTrucTuyen)
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
            {item.tongMotPhanTrucTiep ? (
              getCurrencyThongKe(item.tongMotPhanTrucTiep)
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
            {item.tongMotPhanBCCI ? (

              getCurrencyThongKe(item.tongMotPhanBCCI)
            ) : (
              "0"
            )}
          </td>
        </tr>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
          <td
            style={{
              verticalAlign: "middle",

              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
              textAlign: "left",
              minWidth: "350px",
            }}
          >
            DVC trực tuyến toàn trình
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
            {item.tongToanTrinh ? (
              getCurrencyThongKe(item.tongToanTrinh)
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
            {item.tongToanTrinhTrucTuyen ? (
              getCurrencyThongKe(item.tongToanTrinhTrucTuyen)
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
            {item.tongToanTrinhTrucTiep ? (
              getCurrencyThongKe(item.tongToanTrinhTrucTiep)
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
            {item.tongToanTrinhBCCI ? (
              getCurrencyThongKe(item.tongToanTrinhBCCI)
            ) : (
              "0"
            )}
          </td>
        </tr>
      </>
    );
  };
  return (
    <div id="ContainerSwapper1" style={{ fontSize: "16px", display: "none" }} className="ContainerSwapper1">
      <tr style={{ width: "100%", }}>
        <td
          colSpan={11}
          style={{
            verticalAlign: "middle",
            padding: "5px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          <strong>
            BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN
          </strong>
          <br />
          <i style={{ fontSize: "16px", }}>(Từ ngày {tuNgay ? dayjs(tuNgay).format(FORMAT_DATE_WITHOUT_TIME) + " " : "... "}
            đến ngày {denNgay ? dayjs(denNgay).format(FORMAT_DATE_WITHOUT_TIME) : "..."})</i>
        </td>
      </tr>
      <table
        id="table"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
          fontSize: "17px",
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
                width: "3%",
              }}
            >
              <strong>TT</strong>
            </td>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "25%",
              }}
            >
              <strong>Tên đơn vị</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Số lượng hồ sơ tiếp nhận và giải quyết</strong>
            </td>
            <td
              rowSpan={2}
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>
                Đánh giá theo Quyết định số 01/QĐ-UBND ngày 01/01/2025 của UBND tỉnh
              </strong>
              <br />

            </td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Tổng số hồ sơ</strong>
            </td>
            <td
              colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Trong đó</strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Trực tuyến</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Trực tiếp</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>BCCI</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Tỷ lệ hồ sơ nộp trực tuyến</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Đánh giá</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Tỷ lệ hồ sơ nộp trực tuyến toàn trình</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "9%",
              }}
            >
              <strong>Đánh giá</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
          {data && data.length > 0
            ? data.map((item, index) =>
              getElementThongKe(item, index + 1)
            )
            : null}
        </tbody>

      </table>
    </div>
  );
};
