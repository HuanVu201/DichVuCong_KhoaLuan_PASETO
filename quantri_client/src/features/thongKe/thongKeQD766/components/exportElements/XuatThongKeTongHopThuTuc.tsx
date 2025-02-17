import { getCurrencyThongKe } from "@/utils";
import { IThongKeQD766DonDocTTTTElement, IThongKeTienDoGiaiQuyetElement, IThongKeTienDoGiaiQuyetResponse } from "../../models/ThongKe766Response";
import { CountDataThongKeThanhToanTheoHinhThucThanhToan } from "../ThongKeThanhToanTheoHinhThucThanhToan";
import { CountDataTienDoGiaiQuyet2 } from "../TienDoGiaiQuyet2";
import { CountDataThongKeTongHopThuTuc, IThongKeTongHopThuTucElement } from "../ThongKeTongHopThuTuc";
import { IThongKe766TTHCElement } from "../../models/ThongKe766TTHCModels";
import { useEffect, useState } from "react";

export const XuatThongKeTongHopThuTuc = ({
  data,
  groupName
}: {
  data: IThongKe766TTHCElement[] | undefined;
  groupName: string | undefined
}) => {

  const [dataCapSo, setDataCapSo] = useState<IThongKeTongHopThuTucElement[]>(
    []
  );
  const [dataCapHuyen, setDataCapHuyen] = useState<
    IThongKeTongHopThuTucElement[]
  >([]);
  const [dataCapXa, setDataCapXa] = useState<IThongKeTongHopThuTucElement[]>(
    []
  );

  var Template = (index: number, name: string) => {
    return (
      <tr>
        <td colSpan={10}
          style={{
            verticalAlign: "middle",
            textAlign: "left",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "17px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          <strong>{name}</strong>
        </td>

      </tr>
    );
  };

  useEffect(() => {
    if (data) {
      var tmpDataCapSo = data.filter(
        (x) => x.catalog == "so-ban-nganh" || x.catalog == "cnvpdk"
      );
      var tmpDataQuanHuyen = data.filter(
        (x) => x.catalog == "quan-huyen"
      );
      var tmpDataXaPhuong = data.filter((x) => x.catalog == "xa-phuong");
      var soBanNganhs: IThongKeTongHopThuTucElement[] = [];
      var quanHuyens: IThongKeTongHopThuTucElement[] = [];
      var xaPhuongs: IThongKeTongHopThuTucElement[] = [];
      tmpDataCapSo.forEach((item: any) => {
        var checked = false;
        soBanNganhs.forEach((soBanNganh) => {
          if (soBanNganh.maDonVi == item.maDonVi) {
            checked = true;
            soBanNganh.children.push(item);
          }
        });
        if (!checked)
          soBanNganhs.push({
            maDonVi: item.maDonVi,
            tenDonVi: item.tenDonVi,
            children: [item],
          });
      });
      quanHuyens.push({
        maDonVi: "",
        tenDonVi: "",
        children: tmpDataQuanHuyen,
      });
      xaPhuongs.push({
        maDonVi: "",
        tenDonVi: "",
        children: tmpDataXaPhuong,
      });

      setDataCapSo(soBanNganhs);
      setDataCapHuyen(quanHuyens);
      setDataCapXa(xaPhuongs);
    }
  }, [data]);

  const getElementThongKe = (data: IThongKeTongHopThuTucElement[]) => {
    return (
      <>
        {data.map((item, index) => {
          return (
            <>
              <tr>
                <td
                  rowSpan={item.children.length + 1}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                    paddingLeft: "10px",
                  }}
                >
                  {item.tenDonVi}
                </td>
                <td
                colSpan={9}
                  
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                    paddingLeft: "10px",
                  }}
                >
                </td>
              </tr>

              {item.children.map((child: any) => {
                return (
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "20%",
                      }}
                    >
                      {child?.tenLinhVuc}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tongTTHC ? getCurrencyThongKe(child?.tongTTHC) : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcTrucTuyenToanTrinh ? getCurrencyThongKe(child?.tthcTrucTuyenToanTrinh) : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcTrucTuyenMotPhan ? getCurrencyThongKe(child?.tthcTrucTuyenMotPhan) : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcConLai ? child?.tthcConLai : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tongTTHCThuPhi ? getCurrencyThongKe(child?.tongTTHCThuPhi) : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcThuPhiTrucTuyenToanTrinh ? getCurrencyThongKe(child?.tthcThuPhiTrucTuyenToanTrinh) : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcThuPhiTrucTuyenMotPhan ? getCurrencyThongKe(child?.tthcThuPhiTrucTuyenMotPhan) : 0}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcThuPhiConLai ? getCurrencyThongKe(child?.tthcThuPhiConLai) : 0}
                    </td>
                  </tr>
                );
              })}

            </>
          );
        })}
      </>
    );
  };

  return (
    <div style={{ display: 'none' }}>
      <table
        id="tableToExcel2"
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
              colSpan={4}
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
              colSpan={6}
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
              colSpan={10}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                width: "3%",
                textAlign: 'center',
              }}
            >
              <strong>BẢNG THỐNG KÊ THỦ TỤC HÀNH CHÍNH</strong>
              <br />
              
            </td>
          </tr>

          <tr><p></p></tr>

          
          <tr>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "14px",

                width: "20%",
              }}
            >
              <strong>Đơn vị</strong>
            </td>
            <td
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

                width: "20%",
              }}
            >
              <strong>Lĩnh vực</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Thủ tục hành chính</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Thủ tục hành chính yêu cầu thu phí, lệ phí</strong>
            </td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              colSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Trực tuyến</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Còn lại</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Tổng số</strong>
            </td>
            <td
              colSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Trực tuyến</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Còn lại</strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Toàn trình</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Một phần</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Toàn trình</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "17px",

              }}
            >
              <strong>Một phần</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
          {dataCapSo &&
            dataCapSo.length > 0 &&
            dataCapSo[0].children.length > 0 ? (
            <>
              {Template(0, "Cấp tỉnh")}
              {getElementThongKe(dataCapSo)}
            </>
          ) : null}
          {dataCapHuyen &&
            dataCapHuyen.length > 0 &&
            dataCapHuyen[0].children.length > 0 ? (
            <>
              {Template(0, "Quận huyện")}
              {getElementThongKe(dataCapHuyen)}
            </>
          ) : null}
          {dataCapXa &&
            dataCapXa.length > 0 &&
            dataCapXa[0].children.length > 0 ? (
            <>
              {Template(0, "Xã phường")}
              {getElementThongKe(dataCapXa)}
            </>
          ) : null}
          <CountDataThongKeTongHopThuTuc data={data} />
        </tbody>
      </table>
    </div>
  );
};
