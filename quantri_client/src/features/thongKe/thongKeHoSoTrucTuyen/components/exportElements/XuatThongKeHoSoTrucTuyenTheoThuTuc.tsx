import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { ITiepNhanHoSoTrucTuyenElm } from "../../models/TiepNhanHoSoTrucTuyen";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
export const XuatThongKeHoSoTrucTuyenTheoThuTucModal = ({
  data,
  tuNgay,
  denNgay,
  tenDonVi,
  tyLeTrucTuyen,
  tyLeToanTrinhTrucTuyen,
  maTinh
}: {
  data: ITiepNhanHoSoTrucTuyenElm[] | undefined;
  tuNgay?: string;
  denNgay?: string;
  tenDonVi?: string;
  tyLeTrucTuyen: number,
  tyLeToanTrinhTrucTuyen: number,
  maTinh?: string
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
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
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
                BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN THEO TTHC{" "}
              </strong>
              <br />
              <i style={{ fontSize: "16px", }}>(Từ ngày {tuNgay ? dayjs(tuNgay).format(FORMAT_DATE_WITHOUT_TIME) + " " : "... "}
                đến ngày {denNgay ? dayjs(denNgay).format(FORMAT_DATE_WITHOUT_TIME) : "..."})</i>
            </td>
          </tr>
          <tr>
            <td
              colSpan={11}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                textAlign: "left",
                fontSize: "16px",

              }}
            >

              <span>Đơn vị giải quyết: {tenDonVi}</span>
            </td>
          </tr>
          <tr></tr>
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
          fontSize: "14px",
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
                textAlign: "center",
                fontSize: "16px",
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
                textAlign: "center",
                fontSize: "16px",
                width: "25%"
              }}
            >
              <strong>Tên thủ tục</strong>
            </td>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "3%"
              }}
            >
              <strong>Mức độ</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
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
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>
                {maTinh == "38" ? "Đánh giá theo Quyết định số 01/QĐ-UBND ngày 01/01/2025 của UBND tỉnh" : "Đánh giá"}
              </strong>
              <br />
              <span>
                (Tỷ lệ nộp hồ sơ trực tuyến: 90%; Tỷ lệ nộp hồ sơ trực tuyến
                toàn trình: 85%)
              </span>
            </td>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>Ghi chú</strong>
            </td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
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
                textAlign: "center",
                fontSize: "16px",
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
                textAlign: "center",
                fontSize: "16px",
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
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
              }}
            >
              <strong>Trực tiếp</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
              }}
            >
              <strong>BCCI</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
              }}
            >
              <strong>Tỷ lệ hồ sơ nộp trực tuyến</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
              }}
            >
              <strong>Đánh giá</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
              }}
            >
              <strong>Tỷ lệ hồ sơ nộp trực tuyến toàn trình</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
                width: "7%",
              }}
            >
              <strong>Đánh giá</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            <>
              {data.map((item, index) => {
                var tmpTyLeTrucTuyen = item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen) >= 0
                  ? Math.round((item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen)) * 100 * 100) /
                  100
                  : undefined
                var tmpTyLeTrucTuyenToanTrinh = item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep) >= 0
                  ? Math.round((item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep)) * 100 * 100) /
                  100
                  : undefined
                return (<>
                  <tr style={{
                    fontWeight: item.maThongKe ? "" : "bold"
                  }}>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        fontSize: "16px",
                        fontFamily: "Times New Roman, Times, serif;",
                      }}
                    >
                      <strong>{index + 1}</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        fontSize: "16px",
                        fontFamily: "Times New Roman, Times, serif;",
                        textAlign: "left",
                        minWidth: "350px",
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
                        fontSize: "16px",
                        fontFamily: "Times New Roman, Times, serif;",
                      }}
                    >
                      {item.mucDo}
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
                        fontSize: "16px",
                        fontFamily: "Times New Roman, Times, serif;",
                      }}
                    >
                      {item.tongTrucTuyen ? (
                        getCurrencyThongKe(item.tongTrucTuyen)
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
                      {item.tongTrucTiep ? (
                        getCurrencyThongKe(item.tongTrucTiep)
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
                      {item.tongBCCI ? (
                        getCurrencyThongKe(item.tongBCCI)
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

                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                        fontSize: "16px",
                        fontFamily: "Times New Roman, Times, serif;",
                      }}
                    >
                      {tmpTyLeTrucTuyen != undefined ?
                        tmpTyLeTrucTuyen > tyLeTrucTuyen ?
                          "Vượt chỉ tiêu"
                          : tmpTyLeTrucTuyen == tyLeTrucTuyen
                            ? "Đạt chỉ tiêu" : "Không đạt"
                        : ""}
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
                      {item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep) > 0 ? (
                        <strong>
                          {Math.round(
                            (item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep)) * 100 * 100
                          ) / 100}
                          %
                        </strong>
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
                      {tmpTyLeTrucTuyenToanTrinh != undefined ?
                        tmpTyLeTrucTuyenToanTrinh > tyLeToanTrinhTrucTuyen ?
                          "Vượt chỉ tiêu"
                          : tmpTyLeTrucTuyenToanTrinh == tyLeToanTrinhTrucTuyen
                            ? "Đạt chỉ tiêu"
                            : "Không đạt"
                        : ""}
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
                    ></td>
                  </tr>

                </>)
              }

              )}
            </>
          ) : null}
        </tbody>
        {/* <CountDataThongKeHoSoTrucTuyenTheoThuTuc data={thongKeDatas} thongKeToanBo={true} /> */}
      </table>
    </div>
  );
};
