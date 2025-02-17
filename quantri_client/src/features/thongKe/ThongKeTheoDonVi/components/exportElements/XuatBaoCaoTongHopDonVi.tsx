import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoTongHopDonViModal = ({
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

  const countSumary = () => {
    let tongTiepNhan: number = 0
    let tiepNhanKyTruoc: number = 0
    let tiepNhanTrongKy: number = 0
    let tiepNhanTrucTiep: number = 0
    let tiepNhanQuaMang: number = 0
    let tiepNhanQuaBCCI: number = 0
    let daXuLyTruocHan: number = 0
    let daXuLyDungHan: number = 0
    let daXuLyQuaHan: number = 0
    let dangXuLyTrongHan: number = 0
    let dangXuLyQuaHan: number = 0
    let boSung: number = 0
    let rutTraLai: number = 0

    data?.forEach(item => {
      tongTiepNhan += item.tongSo
      tiepNhanKyTruoc += item.tiepNhanKyTruoc
      tiepNhanTrongKy += item.tiepNhanTrongKy
      tiepNhanTrucTiep += item.tiepNhanTrucTiep
      tiepNhanQuaMang += item.tiepNhanQuaMang
      tiepNhanQuaBCCI += item.tiepNhanQuaBCCI
      daXuLyTruocHan += item.daXuLyTruocHan + item.traLaiTruocHan
      daXuLyDungHan += item.daXuLyDungHan + item.traLaiDungHan;
      daXuLyQuaHan += item.daXuLyQuaHan + item.traLaiQuaHan;
      dangXuLyTrongHan += item.dangXuLyTrongHan;
      dangXuLyQuaHan += item.dangXuLyQuaHan
      boSung += item.tongBoSung
      rutTraLai += item.tongTraLai
    })


    return (
      <tr>
        <td colSpan={2} style={{
          verticalAlign: "middle", textAlign: "center", padding: "5px",
          border: "1px solid #333", minWidth: "500px", fontWeight: 600
        }}
        >
          TỔNG SỐ
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(tongTiepNhan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(tiepNhanKyTruoc)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {!thongKeToanBo
            ?
            getCurrencyThongKe(tiepNhanTrongKy)
            :
            getCurrencyThongKe(tiepNhanTrucTiep)
          }
        </td>
        {thongKeToanBo ? (
          <td
            style={{
              verticalAlign: "middle", textAlign: "right", padding: "5px",
              border: "1px solid #333", fontWeight: 600
            }}
          >
            {getCurrencyThongKe(tiepNhanQuaMang)}
          </td>
        ) : null}
        {thongKeToanBo ? (
          <td
            style={{
              verticalAlign: "middle", textAlign: "right", padding: "5px",
              border: "1px solid #333", fontWeight: 600
            }}
          >
            {getCurrencyThongKe(tiepNhanQuaBCCI)}
          </td>
        ) : null}
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(daXuLyTruocHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(daXuLyDungHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(daXuLyQuaHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {(daXuLyDungHan + daXuLyTruocHan) /
            (daXuLyDungHan + daXuLyTruocHan + daXuLyQuaHan)
            ? Math.round(
              ((daXuLyDungHan + daXuLyTruocHan) /
                (daXuLyDungHan +
                  daXuLyTruocHan +
                  daXuLyQuaHan)) *
              100 *
              100
            ) /
            100 +
            "%"
            : "0"}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(dangXuLyTrongHan + boSung)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(dangXuLyQuaHan)}
        </td>

      </tr>
    );
  };
  return (
    <div id="ContainerSwapper1" style={{ display: "none" }} className="ContainerSwapper1">

      <table

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
              colSpan={thongKeToanBo ? 5 : 4}
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
              colSpan={thongKeToanBo ? 8 : 7}
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
              colSpan={thongKeToanBo ? 13 : 11}
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
          fontSize: "17px",
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
              <strong>Đơn vị</strong>
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
            {/* <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
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
                    textAlign: 'center'
                  }}
                >
                  <strong>Trả lại/ Rút HS</strong>
                </td> */}
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


                  }}
                >
                  {(

                    getCurrencyThongKe(item.daXuLyTruocHan + item.traLaiTruocHan)

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
                  {(

                    getCurrencyThongKe(item.daXuLyDungHan + (item.traLaiDungHan || 0))

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
                  {(

                    getCurrencyThongKe(item.daXuLyQuaHan + item.traLaiQuaHan)

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
                  {(item.daXuLyDungHan + (item.traLaiDungHan + item.traLaiTruocHan) + item.daXuLyTruocHan) /
                    (item.daXuLyDungHan + item.traLaiDungHan + item.traLaiTruocHan + item.traLaiQuaHan + item.daXuLyTruocHan + item.daXuLyQuaHan)
                    ? Math.round(
                      ((item.daXuLyDungHan + item.traLaiDungHan + item.traLaiTruocHan + item.daXuLyTruocHan) /
                        (item.daXuLyDungHan + item.traLaiDungHan + item.traLaiTruocHan +
                          item.daXuLyTruocHan +
                          item.daXuLyQuaHan + item.traLaiQuaHan)) *
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


                  }}
                >
                  {(

                    getCurrencyThongKe(item.dangXuLyTrongHan + (item.tongBoSung || 0))

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
                  {item.dangXuLyQuaHan ? (

                    getCurrencyThongKe(item.dangXuLyQuaHan)

                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            ))
            : null}
          {countSumary()}
        </tbody>
      </table>
    </div>
  );
};
