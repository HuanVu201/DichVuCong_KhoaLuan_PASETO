import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { IDonVi } from "@/features/donvi/models";
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
import { useMemo } from "react";
export const XuatDanhSachDonViThuTucModal = ({
  data,
}: {
  data: IDonVi[] | undefined;
}) => {
  var dataThongKe = useMemo(() => {
    if (data && data.length > 0) {
      const grouped = data.reduce((acc: any, item: any) => {
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
      return Object.values(grouped) ?? []
    }
  }, [data])
  return (
    <div id="ContainerSwapper">
      <table
        id="danhSachHoSoTable"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
          fontSize: "17px",
          display: "none"

        }}
      >
        <thead>
          <tr>
            <td
              colSpan={9}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                fontSize: "19px",
              }}
            >
              {/* <strong>THỐNG KÊ HỒ SƠ TIẾP NHẬN QUÁ HẠN</strong> */}
              <br />
              {/* <strong
                className="filterDate"
                dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
              /> */}
            </td>
          </tr>
          <tr>
            <td colSpan={8} style={{ verticalAlign: "middle", padding: "5px" }}>
              <strong></strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>STT</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>TÊN THỦ TỤC HÀNH CHÍNH</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>MỨC ĐỘ DVC</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
          {dataThongKe?.map((itemTk: any, indexTk: number) => {
            return (
              <>
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >

                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "left"
                    }}
                  >
                    <strong>{itemTk.linhVucChinh}</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >

                  </td>
                </tr>
                {itemTk.thanhPhan && itemTk.thanhPhan.length > 0 ? itemTk.thanhPhan.map((item: any, index: number) => {
                  return <tr>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        textAlign: "center"
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        textAlign: "left",
                        width: "75%"
                      }}
                    >
                      {item.tenTTHC}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        textAlign: "center"
                      }}
                    >
                      {item.mucDo == "2" ? "Dịch vụ cung cấp thông tin trực tuyến"
                        : item.mucDo == "3" ? "Một phần" : item.mucDo == "4" ? "Toàn trình" : item.mucDo
                      }
                    </td>
                  </tr>
                }) : null}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
