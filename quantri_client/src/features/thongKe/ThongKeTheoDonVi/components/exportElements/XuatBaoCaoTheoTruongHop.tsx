import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CAP_THUC_HIEN, CAP_THUC_HIEN_CONSTANTS } from "../ThongKeConstants";

export const XuatBaoCaoTongHopTheoTruongHopModal = ({
  data,
  totalTK,
  tuNgay,
  denNgay,
  catalog,
  groupName
}: {
  data: IBaoCaoDonVi[][] | undefined;
  totalTK: IBaoCaoDonVi | undefined,
  tuNgay?: string;
  denNgay?: string;
  catalog: CAP_THUC_HIEN | undefined,
  groupName: string | undefined
}) => {
  const getElementThongKe = (itemGroup: IBaoCaoDonVi[], indexGroup: number) => {

    if (itemGroup && itemGroup.length > 0)
      return (

        <>

          <tr>
            <td
              colSpan={1}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >


            </td>
            <td
              colSpan={5}
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>
                {itemGroup[0].tenDonVi}
              </strong>

            </td>
          </tr>
          {itemGroup.map((item: any, index: any) => {
            var tongSo: any = {
              maDonVi: "total",
              tenDonVi: "Tổng số",
              tiepNhanTrongKy: 0,
              tiepNhanQuaMang: 0,
              tiepNhanTrucTiep: 0,
              tiepNhanQuaBCCI: 0,

            }
            if (item.thanhPhan && item.thanhPhan.length > 0) {
              item.thanhPhan.map((itemTp: any) => {

                tongSo.tiepNhanTrongKy += itemTp.tiepNhanTrongKy;
                tongSo.tiepNhanQuaMang += itemTp.tiepNhanQuaMang;
                tongSo.tiepNhanTrucTiep += itemTp.tiepNhanTrucTiep;
                tongSo.tiepNhanQuaBCCI += itemTp.tiepNhanQuaBCCI;
              })
            }
            return <>
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
                  }}
                >
                  {item.tenTTHC}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",


                  }}
                >
                  {tongSo.tiepNhanTrongKy ? (
                    getCurrencyThongKe(tongSo.tiepNhanTrongKy)

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
                  {tongSo.tiepNhanQuaMang ? (

                    getCurrencyThongKe(tongSo.tiepNhanQuaMang)

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

                  {tongSo.tiepNhanTrucTiep ? (
                    getCurrencyThongKe(tongSo.tiepNhanTrucTiep)

                  ) : (
                    "0"
                  )
                  }
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  {tongSo.tiepNhanQuaBCCI ? (
                    getCurrencyThongKe(tongSo.tiepNhanQuaBCCI)

                  ) : (
                    "0"
                  )}
                </td>
              </tr>
              {item.thanhPhan && item.thanhPhan.length > 0 ? item.thanhPhan.map((itemTp: any) => {
                return <tr>

                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",


                    }}
                  >

                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "left",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {itemTp.tenThongKe}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",


                    }}
                  >
                    {itemTp.tiepNhanTrongKy ? (
                      getCurrencyThongKe(itemTp.tiepNhanTrongKy)

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
                    {itemTp.tiepNhanQuaMang ? (
                      getCurrencyThongKe(itemTp.tiepNhanQuaMang)

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

                    {itemTp.tiepNhanTrucTiep ? (
                      getCurrencyThongKe(itemTp.tiepNhanTrucTiep)

                    ) : (
                      "0"
                    )
                    }
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",

                    }}
                  >
                    {itemTp.tiepNhanQuaBCCI ? (

                      getCurrencyThongKe(itemTp.tiepNhanQuaBCCI)

                    ) : (
                      "0"
                    )}
                  </td>
                </tr>
              }) : null}
            </>
          })}

        </>

      );
    return null;
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
              colSpan={4}
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
              colSpan={6}
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
        id=""
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
                width: "1%",
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
                width: "50%",
                textAlign: 'center'
              }}
            >
              <strong>Tên trường hợp</strong>
            </td>
            <td
              rowSpan={2}
              // colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                width: "10%",
              }}
            >
              <strong>Tiếp nhận</strong>
            </td>
            <td
              colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
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
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Trực tuyến</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Trực tiếp</strong>
            </td>


            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "10%",
                textAlign: 'center'
              }}
            >
              <strong>Qua BCCI</strong>
            </td>




          </tr>
        </thead>
        <tbody id="data">
          {data && data.length > 0
            ? data.map((item: any, index: number) =>
              getElementThongKe(item, index + 1)
            )
            : null}
          {
            totalTK && totalTK.maDonVi ?
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
                  {getCurrencyThongKe(totalTK.tiepNhanTrongKy)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle", textAlign: "right", padding: "5px",
                    border: "1px solid #333", fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTK.tiepNhanQuaMang)}
                </td>

                <td
                  style={{
                    verticalAlign: "middle", textAlign: "right", padding: "5px",
                    border: "1px solid #333", fontWeight: 600
                  }}
                >
                  {
                    getCurrencyThongKe(totalTK.tiepNhanTrucTiep)
                  }
                </td>



                <td
                  style={{
                    verticalAlign: "middle", textAlign: "right", padding: "5px",
                    border: "1px solid #333", fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTK.tiepNhanQuaBCCI)}
                </td>


              </tr> : null
          }
        </tbody>
      </table>
    </div>
  );
};
