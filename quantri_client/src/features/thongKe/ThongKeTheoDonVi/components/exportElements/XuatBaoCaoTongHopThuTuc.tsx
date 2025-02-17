import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoTongHopThuTucModal = ({
  data,
  thongKeToanBo,
  tuNgay,
  denNgay,
  catalog,
  groupName,
}: {
  data: IBaoCaoDonVi[] | undefined;
  thongKeToanBo: boolean,
  tuNgay?: string;
  denNgay?: string;
  catalog: CAP_THUC_HIEN | undefined,
  groupName: string | undefined,

}) => {
  return (
    <div id="ContainerSwapper1" style={{ fontSize: "16px", display:'none' }} className="ContainerSwapper1">
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
            <th
              colSpan={thongKeToanBo ? 7 : 6}
              style={{
                verticalAlign: "top",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              {groupName ? <strong>{groupName.toUpperCase()} </strong> : ''}
            </th>
            <th
              colSpan={thongKeToanBo ? 9 : 8}
              style={{
                verticalAlign: "top",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br /><u>Độc lập - Tự do - Hạnh phúc</u></strong>
            </th>

          </tr>

          <tr>
            <th
              colSpan={thongKeToanBo ? 16 : 14}
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
            </th>
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
            ? data.map((item:any, index: number) => (
              <>
            
             <tr style={{fontWeight: item.maThongKe =='total' ? "bold": ""}}>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
          
                      fontFamily: "Times New Roman, Times, serif;",
                    }}
                  >
                    {index+1}
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
                      textAlign: "center",
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
                </tr>
              
            </>
            ))
            : null}
          {/* <CountDataBaoCaoTongHopThuTuc data={data } thongKeToanBo={thongKeToanBo} /> */}
        </tbody>
      </table>
    </div>
  );
};
