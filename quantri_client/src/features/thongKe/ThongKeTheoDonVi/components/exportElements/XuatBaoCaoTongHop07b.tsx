import { IBaoCaoTongHop07b } from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { CountDataThongKe06CacCap } from "../BaoCaoTongHop06CacCap";
import { useMemo } from "react";

export const XuatBaoCaoTongHop07bModal = ({
  data,
  tuNgay,
  denNgay,
  tenDonVi,
}: {
  data: IBaoCaoTongHop07b[] | undefined;
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
    return (
      <tr   style={{ fontWeight: item.maThongKe ?  "" : "bold" }}>
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
          {item.tongSoTTHCTheoCCMC ? (
            
              getCurrencyThongKe(item.tongSoTTHCTheoCCMC)
          ) : (
            ""
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
           {item.soTTHCTaiBPMCCapTinh ? (
            
            getCurrencyThongKe(item.soTTHCTaiBPMCCapTinh)
        ) : (
          ""
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
           {item.soTTHCTaiBPMCCapHuyen ? (
            
            getCurrencyThongKe(item.soTTHCTaiBPMCCapHuyen)
        ) : (
          ""
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
           {item.soTTHCTaiBPMCCapXa ? (
            
            getCurrencyThongKe(item.soTTHCTaiBPMCCapXa)
        ) : (
          ""
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
          {item.tongSoQuyTrinh ? (
            
            getCurrencyThongKe(item.tongSoQuyTrinh)
        ) : (
          ""
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
          {item.soQuyTrinhCapTinh ? (
            
            getCurrencyThongKe(item.soQuyTrinhCapTinh)
        ) : (
          ""
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
          {item.soQuyTrinhCapHuyen ? (
            
            getCurrencyThongKe(item.soQuyTrinhCapHuyen)
        ) : (
          ""
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
            {item.soQuyTrinhCapXa ? (
            
            getCurrencyThongKe(item.soQuyTrinhCapXa)
        ) : (
          ""
        )}
        </td>
        
      </tr>
    );
  };
  return (
    <div id="ContainerSwapper1" className="ContainerSwapper1" style={{ fontSize: "16px",display:'none'}}>
       <table
          
            style={{
              verticalAlign: "middle",
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
              margin: "10px 0",
              overflow: "auto",
            }}
          >
            <thead
              style={{
                position: "-webkit-sticky",
                top: 15,
                background: "#fff",
                zIndex: 1,
              }}
            >
            <tr>
                <td
                    colSpan={2}
                    style={{
                    verticalAlign: "top",
                    padding: "5px",
                    
                    width: "3%",
                    textAlign: 'left',
                    }}
                >
                    <strong>Biểu số II.07b/VPCP/KSTT</strong>
                </td>
                <td
                colSpan={7}
                style={{
                verticalAlign: "middle",
                padding: "5px",
                
                width: "3%",
                textAlign: 'center',
                }}
            >
                <strong>
                TỔNG HỢP SỐ LƯỢNG THỦ TỤC HÀNH CHÍNH
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
              overflow: "auto",
            }}
          >
            <thead
              style={{
                position: "-webkit-sticky",
                top: 15,
                background: "#fff",
                zIndex: 1,
              }}
            >
           
              
              <tr>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "3%",
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
                  }}
                >
                  <strong>Đơn vị</strong>
                </td>
                

                <td
                  colSpan={4}
                  // colSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center'
                  }}
                >
                  <strong>Tổng số TTHC thuộc thẩm quyền giải quyết của địa phương</strong>
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
                  <strong>TTHC được thực hiện theo CCMC, MCLT</strong>
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
                  <strong>Quy trình nội bộ giải quyết TTHC theo CCMC, MCLT được ban hành</strong>
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
                  <strong>Tổng số TTHC</strong>
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
                  <strong>Cấp tỉnh</strong>
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
                  <strong>Cấp huyện</strong>
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
                  <strong>Cấp xã</strong>
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
                  <strong>Tổng số TTHC</strong>
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
                  <strong>Tại BPMC cấp tỉnh</strong>
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
                  <strong>Tại BPMC cấp huyện</strong>
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
                  <strong>Tại BPMC cấp xã</strong>
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
                  <strong>Tổng số quy trình</strong>
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
                  <strong>Cấp tỉnh</strong>
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
                  <strong>Cấp huyện</strong>
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
                  <strong>Cấp xã</strong>
                </td>
              </tr>
            </thead>
            <tbody id="data">
              {data && data.length > 0
                ? data.map((item, index) => getElementThongKe(item, index + 1))
                : null}
            </tbody>
          </table>
    </div>
  );
};
