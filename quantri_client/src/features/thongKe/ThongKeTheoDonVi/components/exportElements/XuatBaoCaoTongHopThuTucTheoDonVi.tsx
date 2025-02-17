import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoTongHopThuTucTheoDonViModal = ({
  data,
  thongKeToanBo,
  tuNgay,
  denNgay,
  catalog,
  groupName,
  totalTk
}: {
  data: IBaoCaoDonVi[] | undefined;
  thongKeToanBo: boolean,
  tuNgay?: string;
  denNgay?: string;
  catalog: CAP_THUC_HIEN | undefined,
  groupName: string | undefined,
  totalTk: IBaoCaoDonVi | undefined;
}) => {
  const getElementThongKe = (i: any, id: number) => {

    if (i.thanhPhan && i.thanhPhan.length > 0) {

      const grouped = i.thanhPhan.reduce((acc: any, item: any) => {
        const key = item?.maLinhVucChinh ?? undefined;
        if (key && !acc[key]) {
          acc[key] = {
            maLinhVucChinh: key,
            linhVucChinh: item.linhVucChinh,
            thanhPhan: [],
          };
        }
        if (key) acc[key].thanhPhan.push(item);
        return acc;
      }, {} as Record<string, IBaoCaoDonVi[]>);
      var thanhPhan = Object.values(grouped)
      return (
        <>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif;",
              }}

            >
              {id}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif;",
              }}
              colSpan={thongKeToanBo ? 16 : 14}
            >
              {i.tenDonVi}
            </td>
          </tr>
          {thanhPhan ? thanhPhan.map((itemTp: any, indexTp: number) => {

            return <>
              <tr>
                <td
                  rowSpan={itemTp.thanhPhan.length + 1}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {indexTp + 1}
                </td>
                <td
                  rowSpan={itemTp.thanhPhan.length + 1}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",

                  }}
                >
                  {itemTp.linhVucChinh}
                </td>
              </tr>
              {
                itemTp.thanhPhan && itemTp.thanhPhan.length > 0 ? itemTp.thanhPhan.map((item: any, index: number) => {
                  return <tr>
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
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",

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
                      {item.tongBoSung ? getCurrencyThongKe(item.tongBoSung)
                        : (
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
                      {item.tongTraLai ?
                        getCurrencyThongKe(item.tongTraLai)
                        : (
                          "0"
                        )}
                    </td>
                  </tr >
                }) : null
              }

            </>
          }) : null
          }

        </>
      );
    }
  };
  return (
    <div id="ContainerSwapper1" className="ContainerSwapper1" style={{ fontSize: "16px", display: "none" }}>

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
              colSpan={thongKeToanBo ? 8 : 7}
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
              colSpan={thongKeToanBo ? 17 : 15}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong>TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT TTHC</strong>
              <br />
              <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i>
            </td>
          </tr>

          <tr><p></p></tr>
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
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "20%",
                textAlign: 'center'
              }}
            >
              <strong>Thủ tục</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",

                textAlign: 'center'
              }}
            >
              <strong>Mức độ</strong>
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
            ? data.map((item, index) => getElementThongKe(item, index + 1))
            : null}
          {totalTk ? <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
            </td>
            <td
              colSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600,
                minWidth: "350px",
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

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.tongSo)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.tiepNhanKyTruoc)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {!thongKeToanBo
                ?
                totalTk.tiepNhanTrongKy
                :
                totalTk.tiepNhanTrucTiep
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
                  fontWeight: 600
                }}
              >
                {totalTk.tiepNhanQuaMang}
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
                  fontWeight: 600
                }}
              >
                {totalTk.tiepNhanQuaBCCI}
              </td>
            ) : null}



            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.daXuLyTruocHan)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.daXuLyDungHan)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.daXuLyQuaHan)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",

                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {totalTk.daXuLyDungHan + totalTk.daXuLyTruocHan /
                (totalTk.daXuLyDungHan + totalTk.daXuLyTruocHan + totalTk.daXuLyQuaHan)
                ? Math.round(
                  ((totalTk.daXuLyDungHan + totalTk.daXuLyTruocHan) /
                    (totalTk.daXuLyDungHan +
                      totalTk.daXuLyTruocHan +
                      totalTk.daXuLyQuaHan)) *
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
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.dangXuLyTrongHan)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.dangXuLyQuaHan)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.tongBoSung)}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600
              }}
            >
              {getCurrencyThongKe(totalTk.tongTraLai)}
            </td>
          </tr> : null}

        </tbody>
      </table>
    </div>
  );
};
