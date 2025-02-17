import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoHoSoDongBoDVCQGTheoThuTucModal = ({
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
  return (
    <div id="ContainerSwapper2" className="ContainerSwapper2" style={{ fontSize: "16px", display: "none" }}>

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
              colSpan={2}
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
              colSpan={2}
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
              colSpan={4}
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

              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "20%",
                textAlign: 'center'
              }}
            >
              <strong>Mã thủ tục</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "60%",
                textAlign: 'center'
              }}
            >
              <strong>Tên thủ tục</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",

                textAlign: 'center'
              }}
            >
              <strong>Số lượng đồng bộ lên cổng DVCQG</strong>
            </td>

          </tr>
        </thead>
        <tbody id="data">
          {data && data.length > 0
            ? data.map((i, id) => (
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
                    colSpan={3}
                  >
                    {i.tenDonVi}
                  </td>
                </tr>
                {i.thanhPhan ? i.thanhPhan.map((item: any, index: number) => {

                  return <tr>
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
                        minWidth: "350px",
                      }}
                    >
                      {item.maThongKe}
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
                      {getCurrencyThongKe(item.tiepNhanTrongKy)}
                    </td>

                  </tr>
                }) : null}

              </>
            ))
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
              colSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
                fontWeight: 600,

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
              {getCurrencyThongKe(totalTk.tiepNhanTrongKy)}
            </td>

          </tr> : null}
          {/* <CountDataBaoCaoTongHopThuTuc data={data } thongKeToanBo={thongKeToanBo} /> */}
        </tbody>
      </table>
    </div>
  );
};
