import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { useAppSelector } from "@/lib/redux/Hooks";
import { getCurrencyThongKe } from "@/utils";
import { useEffect, useState } from "react";
import { CountDataBaoCaoTongHopLinhVuc } from "../BaoCaoTongHopLinhVuc";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoTongHopLinhVuc2Modal = ({
  data,
  thongKeToanBo,
  tuNgay,
  denNgay,
  catalog,
  groupName
}: {
  data: IBaoCaoDonVi[] | undefined;
  thongKeToanBo: boolean,
  tuNgay?: string;
  denNgay?: string;
  catalog: CAP_THUC_HIEN | undefined,
  groupName: string | undefined
}) => {
  const { publicModule: config } = useAppSelector((state) => state.config);
  const [tenDonVi, setTenDonVi] = useState<string>("");
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == "ten-don-vi") setTenDonVi(item.content);
    });
  }, [config]);
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
              colSpan={thongKeToanBo ? 6 : 5}
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
              colSpan={thongKeToanBo ? 9 : 8}
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
              colSpan={thongKeToanBo ? 15 : 13}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong>TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH THEO LĨNH VỰC</strong>
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
                width: "20%",
                textAlign: 'center'
              }}
            >
              <strong>Lĩnh vực</strong>
            </td>
            <td
              colSpan={thongKeToanBo ? 5 : 3}
              // colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",

                textAlign: 'center'

              }}
            >
              <strong>Tiếp nhận</strong>
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
              <strong>Đã xử lý</strong>
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
              <strong>Đang xử lý</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Bổ sung</strong>
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
              <strong>Dừng xử lý</strong>
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
              <strong>Yêu cầu thực hiện nghĩa vụ tài chính</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Trả lại/ Rút HS</strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Tổng số</strong>
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
              <strong>Kỳ trước</strong>
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
              <strong>Trong kỳ</strong>
            </td>
            {thongKeToanBo ? (
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "7%",
                  textAlign: 'center'
                }}
              >
                <strong>Qua mạng</strong>
              </td>)

              : null}
            {thongKeToanBo ? (
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "7%",
                  textAlign: 'center'
                }}
              >
                <strong>Qua BCCI</strong>
              </td>
            ) : null}


            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "7%",
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
                width: "7%",
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
                width: "7%",
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
                width: "7%",
                textAlign: 'center'
              }}
            >
              <strong>Tỷ lệ trước hạn, đúng hạn</strong>
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
              <strong>Trong hạn</strong>
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
                  {index + 1}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    minWidth: "500px",
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
                  {item.tiepNhanKyTruoc ? (

                    getCurrencyThongKe(item.tiepNhanKyTruoc)

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
                  {!thongKeToanBo
                    ?
                    item.tiepNhanTrongKy ? (

                      getCurrencyThongKe(item.tiepNhanTrongKy)

                    ) : (
                      "0"
                    )
                    :
                    item.tiepNhanTrucTiep ? (

                      getCurrencyThongKe(item.tiepNhanTrucTiep)

                    ) : (
                      "0"
                    )
                  }
                </td>
                {thongKeToanBo ? (
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                      fontFamily: "Times New Roman, Times, serif;",
                    }}
                  >
                    {item.tiepNhanQuaMang ? (

                      getCurrencyThongKe(item.tiepNhanQuaMang)

                    ) : (
                      "0"
                    )}
                  </td>
                ) : null}
                {thongKeToanBo ? (
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                      fontFamily: "Times New Roman, Times, serif;",
                    }}
                  >
                    {item.tiepNhanQuaBCCI ? (

                      getCurrencyThongKe(item.tiepNhanQuaBCCI)

                    ) : (
                      "0"
                    )}
                  </td>
                ) : null}



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
                  {item.daXuLyDungHan ? (

                    getCurrencyThongKe(item.daXuLyDungHan)

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
                    textAlign: "right",
                    padding: "5px",

                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                    (item.daXuLyDungHan + item.daXuLyTruocHan + item.daXuLyQuaHan)
                    ? Math.round(
                      ((item.daXuLyDungHan + item.daXuLyTruocHan) /
                        (item.daXuLyDungHan +
                          item.daXuLyTruocHan +
                          item.daXuLyQuaHan)) *
                      100 *
                      100
                    ) /
                    100 +
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
                  {item.dangXuLyTrongHan ? (

                    getCurrencyThongKe(item.dangXuLyTrongHan)

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
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {item.trangThaiBoSung ? (

                    getCurrencyThongKe(item.trangThaiBoSung)

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
                  {item.trangThaiDungXuLy ? (

                    getCurrencyThongKe(item.trangThaiDungXuLy)

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
                  {item.trangThaiYeuCauThucHienNVTC ? (

                    getCurrencyThongKe(item.trangThaiYeuCauThucHienNVTC)

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
                  {item.tongTraLai ? (

                    getCurrencyThongKe(item.tongTraLai)

                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            ))
            : null}
          <CountDataBaoCaoTongHopLinhVuc data={data} thongKeToanBo={thongKeToanBo} />
        </tbody>
      </table>
    </div>
  );
};
