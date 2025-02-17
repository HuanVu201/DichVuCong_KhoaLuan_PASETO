import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CountDataThongKe06CacCap } from "../BaoCaoTongHop06CacCap";
import { useMemo } from "react";

export const XuatBaoCaoTongHop06CacCapModal = ({
  data,
  tuNgay,
  denNgay,
  tenDonVi,
}: {
  data: IBaoCaoDonVi[] | undefined;
  tuNgay?: string;
  denNgay?: string; 
  tenDonVi?: string;
}) => {
 
  const [dataCapSo, dataCapHuyen, dataCapXa] = useMemo(() => {
    if (data && data.length > 0) {
      var tinh = data.filter(
        (x) => x.catalog == "so-ban-nganh" || x.catalog == "cnvpdk"
      );
      var huyen = data.filter((x) => x.catalog == "quan-huyen");
      var xa = data.filter((x) => x.catalog == "xa-phuong");
      return [tinh, huyen, xa];
    }
    return [[], [], []];
  }, [data]);
  var Template = (index: number, name: string) => {
    return (
      <tr>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "left",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "17px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
          colSpan={13}
        >
          <strong>{name}</strong>
        </td>
      </tr>
    );
  }
  const getElementThongKe = (item: any, index: number) => {
    return<tr>
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
      {item.tongSo ? getCurrencyThongKe(item.tongSo) : "0"}
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
      {item.tiepNhanQuaMang
        ? getCurrencyThongKe(item.tiepNhanQuaMang)
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
      {item.tiepNhanTrucTiepVaBCCI
        ? getCurrencyThongKe(item.tiepNhanTrucTiepVaBCCI)
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
      {item.tiepNhanKyTruoc
        ? getCurrencyThongKe(item.tiepNhanKyTruoc)
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
      {item.daXuLyVaTraLai
        ? getCurrencyThongKe(item.daXuLyVaTraLai)
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
      {item.daXuLyTruocHan
        ? getCurrencyThongKe(item.daXuLyTruocHan)
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
      {item.daXuLyDungHanVaTraLai
        ? getCurrencyThongKe(item.daXuLyDungHanVaTraLai)
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
      {item.daXuLyQuaHan ? getCurrencyThongKe(item.daXuLyQuaHan) : "0"}
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
      {item.dangXuLyVaBoSung
        ? getCurrencyThongKe(item.dangXuLyVaBoSung)
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
      {item.dangXuLyTrongHanVaBoSung
        ? getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)
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
      {item.dangXuLyQuaHan
        ? getCurrencyThongKe(item.dangXuLyQuaHan)
        : "0"}
    </td>
  </tr>
  }
  return (
    <div id="ContainerSwapper1" className="ContainerSwapper1" style={{ fontSize: "16px",display:'none'}}>
      
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
            colSpan={2}
            style={{
              verticalAlign: "middle",
              padding: "5px",
             
              width: "3%",
              textAlign: 'left',
            }}
          >
            <strong>Biểu số 06 /VPCP/KSTT</strong>
            <br/>
            <span>Ban hành theo Thông tư số</span>
            <br/>
            <span>01/2020/TT-VPCP ngày 21/10/2020</span>
          </td>
          <td
            colSpan={6}
            style={{
              verticalAlign: "middle",
              padding: "5px",
             
              width: "3%",
              textAlign: 'center',
            }}
          >
            <strong>
            TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT TTHC TẠI CƠ QUAN, ĐƠN VỊ TRỰC TIẾP GIẢI
            QUYẾT TTHC
          </strong>
        <br/>
        <span>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</span>
          </td>
          <td
            colSpan={5}
            style={{
              verticalAlign: "top",
              padding: "5px",
          
              width: "3%",
              textAlign: 'right',
            }}
          >
            <strong>{tenDonVi}</strong>
            
          </td>
          </tr>
          <tr>
          <td colSpan={13}
            style={{
              verticalAlign: "middle",
              padding: "5px",
              fontSize:"14px",
              width: "3%",
              textAlign: 'right',
            }}
          >
            Đơn vị tính: Số hồ sơ TTHC
          </td>
          </tr>
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
              rowSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                width: "3%",
                textAlign: 'center',
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
                width: "20%",
                textAlign: 'center',
              }}
            >
              <strong>Lĩnh vực, công việc giải quyết theo cấp</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
              }}
            >
              <strong>Số hồ sơ nhận giải quyết</strong>
            </td>
            <td
              colSpan={4}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
              }}
            >
              <strong>Số hồ sơ đã giải quyết</strong>
            </td>
            <td
              colSpan={3}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
              }}
            >
              <strong>Số lượng hồ sơ đang giải quyết</strong>
            </td>
          </tr>
          <tr>
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
              <strong>Tổng số</strong>
            </td>
            <td
              colSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
                 width: "7%",
              }}
            >
              <strong>Trong đó</strong>
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
              <strong>Từ kỳ trước</strong>
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
              <strong>Tổng số</strong>
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
              <strong>Trước hạn</strong>
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
              <strong>Đúng hạn</strong>
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
              <strong>Quá hạn</strong>
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
              <strong>Tổng số</strong>
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
              <strong>Trong hạn</strong>
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
              <strong>Quá hạn</strong>
            </td>
          </tr>
          <tr>
            {" "}
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center',
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
                textAlign: 'center',
                 width: "7%",
              }}
            >
              <strong>Trực tiếp, dịch vụ bưu chính</strong>
            </td>
          </tr>
        </thead>
        <tbody id="data">
        {dataCapSo && dataCapSo.length > 0 ? (
    <>
      {Template(0, "Sở ban ngành")}
      {dataCapSo.map((item, index) =>
        getElementThongKe(item, index + 1)
      )}
    </>
  ) : null}
    {dataCapHuyen && dataCapHuyen.length > 0 ? (
      <>
        {Template(0, "Huyện, thị xã, thành phố")}
        {dataCapHuyen.map((item, index) =>
          getElementThongKe(item, index + 1)
        )}
      </>
    ) : null}
    {dataCapXa && dataCapXa.length > 0 ? (
      <>
        {Template(0, "Xã, phường, thị trấn")}
        {dataCapXa.map((item, index) =>
          getElementThongKe(item, index + 1)
        )}
      </>
    ) : null}
            <CountDataThongKe06CacCap data={data} />
        </tbody>
      </table>
    </div>
  );
};
