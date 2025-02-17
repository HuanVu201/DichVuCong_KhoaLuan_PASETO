import { getCurrencyThongKe } from "@/utils";
import { IThongKeQD766DonDocTTTTElement, IThongKeTienDoGiaiQuyetElement, IThongKeTienDoGiaiQuyetResponse } from "../../models/ThongKe766Response";
import { CountDataThongKeThanhToanTheoHinhThucThanhToan } from "../ThongKeThanhToanTheoHinhThucThanhToan";
import { CountDataTienDoGiaiQuyet2 } from "../TienDoGiaiQuyet2";
import { CountDataThongKeTongHopThuTuc, IThongKeTongHopThuTucElement } from "../ThongKeTongHopThuTuc";
import { IThongKe766TTHCElement } from "../../models/ThongKe766TTHCModels";
import { useEffect, useState } from "react";
import Item from "antd/es/list/Item";

export const XuatDanhSachDonViThuTucTheoMucDoTable = ({
  data,
  groupName
}: {
  data: IThongKe766TTHCElement[] | undefined;
  groupName: string | undefined
}) => {

  const [dataCapSo, setDataCapSo] = useState<IThongKe766TTHCElement[]>(
    []
  );
  const [dataCapHuyen, setDataCapHuyen] = useState<
    IThongKe766TTHCElement
  >({
    maDonVi: "",
    tenDonVi: "",
    catalog: "",
    malinhVuc: "",
    tenLinhVuc: "",
    tongTTHC: 0,
    tthcTrucTuyenToanTrinh: 0,
    tthcTrucTuyenMotPhan: 0,
    tthcConLai: 0,
    tongTTHCThuPhi: 0,
    tthcThuPhiTrucTuyenToanTrinh: 0,
    tthcThuPhiTrucTuyenMotPhan: 0,
    tthcThuPhiConLai: 0,

  });
  const [dataCapXa, setDataCapXa] = useState<IThongKe766TTHCElement>({
    maDonVi: "",
    tenDonVi: "",
    catalog: "",
    malinhVuc: "",
    tenLinhVuc: "",
    tongTTHC: 0,
    tthcTrucTuyenToanTrinh: 0,
    tthcTrucTuyenMotPhan: 0,
    tthcConLai: 0,
    tongTTHCThuPhi: 0,
    tthcThuPhiTrucTuyenToanTrinh: 0,
    tthcThuPhiTrucTuyenMotPhan: 0,
    tthcThuPhiConLai: 0,

  }
  );
  const [total, setTotal] = useState<IThongKe766TTHCElement>({
    maDonVi: "",
    tenDonVi: "",
    catalog: "",
    malinhVuc: "",
    tenLinhVuc: "",
    tongTTHC: 0,
    tthcTrucTuyenToanTrinh: 0,
    tthcTrucTuyenMotPhan: 0,
    tthcConLai: 0,
    tongTTHCThuPhi: 0,
    tthcThuPhiTrucTuyenToanTrinh: 0,
    tthcThuPhiTrucTuyenMotPhan: 0,
    tthcThuPhiConLai: 0,

  }
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
    var tmpTotal = {
      maDonVi: "",
      tenDonVi: "",
      catalog: "",
      malinhVuc: "",
      tenLinhVuc: "",
      tongTTHC: 0,
      tthcTrucTuyenToanTrinh: 0,
      tthcTrucTuyenMotPhan: 0,
      tthcConLai: 0,
      tongTTHCThuPhi: 0,
      tthcThuPhiTrucTuyenToanTrinh: 0,
      tthcThuPhiTrucTuyenMotPhan: 0,
      tthcThuPhiConLai: 0,

    }
    if (data) {
      var tmpDataCapSo = data.filter(
        (x) => x.catalog == "so-ban-nganh"
      );
      var tmpDataQuanHuyen = data.filter(
        (x) => x.catalog == "quan-huyen"
      );
      var tmpDataXaPhuong = data.filter((x) => x.catalog == "xa-phuong");
      var soBanNganhs: IThongKe766TTHCElement[] = [];

      tmpDataCapSo.forEach((item: any) => {

        var checked = false;
        soBanNganhs.forEach((soBanNganh) => {
          if (soBanNganh.maDonVi == item.maDonVi) {
            checked = true;
          }
        });
        if (!checked) {
          var tmp = {
            maDonVi: item.maDonVi,
            tenDonVi: item.tenDonVi,
            catalog: "",
            malinhVuc: "",
            tenLinhVuc: "",
            tongTTHC: 0,
            tthcTrucTuyenToanTrinh: 0,
            tthcTrucTuyenMotPhan: 0,
            tthcConLai: 0,
            tongTTHCThuPhi: 0,
            tthcThuPhiTrucTuyenToanTrinh: 0,
            tthcThuPhiTrucTuyenMotPhan: 0,
            tthcThuPhiConLai: 0,
          }
          tmpDataCapSo.forEach((soBanNganh) => {
            if (soBanNganh.maDonVi == item.maDonVi) {
              tmp.tongTTHC += soBanNganh.tongTTHC ? soBanNganh.tongTTHC : 0;
              tmp.tthcTrucTuyenMotPhan += soBanNganh.tthcTrucTuyenMotPhan ? soBanNganh.tthcTrucTuyenMotPhan : 0;
              tmp.tthcTrucTuyenToanTrinh += soBanNganh.tthcTrucTuyenToanTrinh ? soBanNganh.tthcTrucTuyenToanTrinh : 0;
              tmp.tthcConLai += soBanNganh.tthcConLai ? soBanNganh.tthcConLai : 0;
            }
          })
          tmpTotal.tongTTHC += tmp.tongTTHC ? tmp.tongTTHC : 0;
          tmpTotal.tthcTrucTuyenMotPhan += tmp.tthcTrucTuyenMotPhan ? tmp.tthcTrucTuyenMotPhan : 0;
          tmpTotal.tthcTrucTuyenToanTrinh += tmp.tthcTrucTuyenToanTrinh ? tmp.tthcTrucTuyenToanTrinh : 0;
          tmpTotal.tthcConLai += tmp.tthcConLai ? tmp.tthcConLai : 0;
          soBanNganhs.push(tmp);
        }
      });
      if (tmpDataQuanHuyen && tmpDataQuanHuyen.length > 0) {
        var quanHuyen = tmpDataQuanHuyen.reduce((acc: any, curr: any) => {
          return {
            maDonVi: "",
            tenDonVi: "",
            catalog: "",
            malinhVuc: "",
            tenLinhVuc: "",
            tongTTHC: acc.tongTTHC + curr.tongTTHC,
            tthcTrucTuyenToanTrinh: acc.tthcTrucTuyenToanTrinh + curr.tthcTrucTuyenToanTrinh,
            tthcTrucTuyenMotPhan: acc.tthcTrucTuyenMotPhan + curr.tthcTrucTuyenMotPhan,
            tthcConLai: acc.tthcConLai + curr.tthcConLai,
            tongTTHCThuPhi: acc.tongTTHCThuPhi + curr.tongTTHCThuPhi,
            tthcThuPhiTrucTuyenToanTrinh: acc.tthcThuPhiTrucTuyenToanTrinh + curr.tthcThuPhiTrucTuyenToanTrinh,
            tthcThuPhiTrucTuyenMotPhan: acc.tthcThuPhiTrucTuyenMotPhan + curr.tthcThuPhiTrucTuyenMotPhan,
            tthcThuPhiConLai: acc.tthcThuPhiConLai + curr.tthcThuPhiConLai,
          }
        })
        setDataCapHuyen(quanHuyen)
        tmpTotal.tongTTHC += quanHuyen.tongTTHC ? quanHuyen.tongTTHC : 0;
        tmpTotal.tthcTrucTuyenMotPhan += quanHuyen.tthcTrucTuyenMotPhan ? quanHuyen.tthcTrucTuyenMotPhan : 0;
        tmpTotal.tthcTrucTuyenToanTrinh += quanHuyen.tthcTrucTuyenToanTrinh ? quanHuyen.tthcTrucTuyenToanTrinh : 0;
        tmpTotal.tthcConLai += quanHuyen.tthcConLai ? quanHuyen.tthcConLai : 0;
      }
      if (tmpDataXaPhuong && tmpDataXaPhuong.length > 0) {
        var xaPhuong = tmpDataXaPhuong.reduce((acc: any, curr: any) => {
          return {
            maDonVi: "",
            tenDonVi: "",
            catalog: "",
            malinhVuc: "",
            tenLinhVuc: "",
            tongTTHC: acc.tongTTHC + curr.tongTTHC,
            tthcTrucTuyenToanTrinh: acc.tthcTrucTuyenToanTrinh + curr.tthcTrucTuyenToanTrinh,
            tthcTrucTuyenMotPhan: acc.tthcTrucTuyenMotPhan + curr.tthcTrucTuyenMotPhan,
            tthcConLai: acc.tthcConLai + curr.tthcConLai,
            tongTTHCThuPhi: acc.tongTTHCThuPhi + curr.tongTTHCThuPhi,
            tthcThuPhiTrucTuyenToanTrinh: acc.tthcThuPhiTrucTuyenToanTrinh + curr.tthcThuPhiTrucTuyenToanTrinh,
            tthcThuPhiTrucTuyenMotPhan: acc.tthcThuPhiTrucTuyenMotPhan + curr.tthcThuPhiTrucTuyenMotPhan,
            tthcThuPhiConLai: acc.tthcThuPhiConLai + curr.tthcThuPhiConLai,
          }
        })
        setDataCapXa(xaPhuong)
        tmpTotal.tongTTHC += xaPhuong.tongTTHC ? xaPhuong.tongTTHC : 0;
        tmpTotal.tthcTrucTuyenMotPhan += xaPhuong.tthcTrucTuyenMotPhan ? xaPhuong.tthcTrucTuyenMotPhan : 0;
        tmpTotal.tthcTrucTuyenToanTrinh += xaPhuong.tthcTrucTuyenToanTrinh ? xaPhuong.tthcTrucTuyenToanTrinh : 0;
        tmpTotal.tthcConLai += xaPhuong.tthcConLai ? xaPhuong.tthcConLai : 0;
      }
      setTotal(tmpTotal)
      setDataCapSo(soBanNganhs);
    }
  }, [data]);


  return (
    <div style={{ display: "none" }} className="ContainerSwapper2" id="ContainerSwapper2">
      <table
        id="tableToExcel2"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
        }}
      >
        <thead>

          {/* <tr>
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

          </tr> */}

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
              <strong>TỔNG HỢP SỐ LƯỢNG DỊCH VỤ CÔNG  TRỰC TUYẾN</strong>
              <br />

            </td>
          </tr>

          <tr><p></p></tr>


          <tr>
            <td

              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "14px",

                width: "3%",
              }}
            >
              <strong>STT</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "14px",

                width: "30%",
              }}
            >
              <strong>Tên đơn vị</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontSize: "14px",
                width: "15%",
              }}
            >
              <strong>Tổng DVC</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "14px",
                width: "15%",

              }}
            >
              <strong>DVC toàn trình</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "14px",
                width: "15%",

              }}
            >
              <strong>DVC một phần</strong>
            </td>
            <td

              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontSize: "14px",
                width: "15%",

              }}
            >
              <strong>Dịch vụ cung cấp thông tin trực tuyến</strong>
            </td>
          </tr>

        </thead>
        <tbody id="data">
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
              <strong>I</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong>Sở ban ngành cấp tỉnh</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",

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

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >

            </td>
          </tr>
          {dataCapSo &&
            dataCapSo.length > 0
            ? (
              <>
                {dataCapSo.map((item, index) => {
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
                      }}
                    >
                      {item.tenDonVi}
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
                      {getCurrencyThongKe(item.tongTTHC ?? 0)}
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
                      {getCurrencyThongKe(item.tthcTrucTuyenToanTrinh ?? 0)}
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
                      {getCurrencyThongKe(item.tthcTrucTuyenMotPhan ?? 0)}
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
                      {getCurrencyThongKe(item.tthcConLai ?? 0)}
                    </td>
                  </tr>
                })}
              </>
            ) : null}
          {dataCapHuyen.tongTTHC ? <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong>II</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong>UBND cấp huyện</strong>
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
              {getCurrencyThongKe(dataCapHuyen.tongTTHC ?? 0)}
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
              {getCurrencyThongKe(dataCapHuyen.tthcTrucTuyenToanTrinh ?? 0)}
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
              {getCurrencyThongKe(dataCapHuyen.tthcTrucTuyenMotPhan ?? 0)}
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
              {getCurrencyThongKe(dataCapHuyen.tthcConLai ?? 0)}
            </td>
          </tr> : null}
          {dataCapXa.tongTTHC ? <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong>III</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong>UBND cấp xã</strong>
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
              {getCurrencyThongKe(dataCapXa.tongTTHC ?? 0)}
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
              {getCurrencyThongKe(dataCapXa.tthcTrucTuyenToanTrinh ?? 0)}
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
              {getCurrencyThongKe(dataCapXa.tthcTrucTuyenMotPhan ?? 0)}
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
              {getCurrencyThongKe(dataCapXa.tthcConLai ?? 0)}
            </td>
          </tr> : null}
          {total.tongTTHC ? <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong></strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",

                fontFamily: "Times New Roman, Times, serif;",
              }}
            >
              <strong>Tổng</strong>
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
              <strong>{getCurrencyThongKe(total.tongTTHC ?? 0)}</strong>
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
              <strong> {getCurrencyThongKe(total.tthcTrucTuyenToanTrinh ?? 0)}</strong>
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
              <strong>{getCurrencyThongKe(total.tthcTrucTuyenMotPhan ?? 0)}</strong>
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
              <strong>{getCurrencyThongKe(total.tthcConLai ?? 0)}</strong>
            </td>
          </tr> : null}
          {/* {dataCapSo &&
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
          <CountDataThongKeTongHopThuTuc data={data} /> */}
        </tbody>
      </table>
    </div>
  );
};
