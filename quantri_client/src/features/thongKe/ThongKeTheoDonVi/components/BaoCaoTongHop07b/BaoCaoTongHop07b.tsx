import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  SearchOutlined,
  PrinterOutlined,
  DownOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Select,
  Dropdown,
  Space,
  Form,
  DatePicker,
  Col,
  Row,
  Spin,
} from "antd";
import type { MenuProps } from "antd";
import "../../../ThongKe.scss";
import dayjs from "dayjs";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdSelect } from "@/lib/antd/components";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { Value } from "sass";
import { toast } from "react-toastify";
import {
  IBaoCaoDonVi,
  IBaoCaoTongHop07b,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { BaoCaoTongHop07bAction } from "@/features/baocaotonghop/redux/action";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../context/BaoCaoTongHopContext";
import { SearchBaoCaoTongHop07b } from "./SearchBaoCaoTongHop07b";
import { XuatBaoCaoTongHop07bModal } from "../exportElements/XuatBaoCaoTongHop07b";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          downloadPhieuExcel(
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến theo thủ tục", "ContainerSwapper1"
          )
        }
      >
        <FileExcelOutlined style={{ color: "green" }} /> In file excel
      </button>
    ),
    key: "excel",
  },
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          export2Word(
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh",
            true,
            "ContainerSwapper1"
          )
        }
      >
        <FileWordOutlined style={{ color: "#36a3f7" }} /> In file word
      </button>
    ),
    key: "Word",
  },
];

const BaoCaoTongHop07b = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [tenDonViThongKe, setTenDonViThongKe] = useState<string>("");
  var [data, setData] = useState<IBaoCaoTongHop07b[]>([]);
  useEffect(() => {
    thongKeHoSoContext.setSearchBaoCaoThuTuc({
      ...thongKeHoSoContext.searchBaoCaoThuTuc,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");

  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  let userData: IParseUserToken;

  useEffect(() => {
    if (auth !== undefined) {
      userData = parseJwt(auth.token);
      if (userData.typeUser == "Admin") setDisplayDonVi("block");
      setMaDinhDanh(userData.maDinhDanh);
    }
  }, [auth]);

  useEffect(() => {
    (async () => {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",

          pageSize: 2000,
          pageNumber: 1,
        })
      );
    })();
  }, []);
  useEffect(() => {
    if (coCauToChucs && coCauToChucs.length > 0 && (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh || thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)) {
      if (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh) {
        var tmpGroups = coCauToChucs.find(item => item.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)
        setTenDonViThongKe(tmpGroups?.groupName ?? "")
      }
      if (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha) {
        var tmpGroups = coCauToChucs.find(item => item.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)
        setTenDonViThongKe(tmpGroups?.groupName ?? "")
      }
    }
  }, [coCauToChucs, thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh, thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha])
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
 
    if (value.tuNgay && value.denNgay)
      if (!value.maDinhDanh && !value.catalog) {
        toast.warning("Vui lòng chọn đơn vị");
      } else {
        var res = await dispatch(
          BaoCaoTongHop07bAction({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            maDinhDanh: value.maDinhDanh,
            maDinhDanhCha: value.maDinhDanhCha,
            catalog: value.catalog,
            coPhatSinhHoSo: value.coPhatSinhHoSo
          })
        ).unwrap();
        // setData(res?.data ?? []);
        if(res?.data){
          
          var total = res?.data.reduce((accumulator: any, currentValue:any)=>{
            return{
              tenThongKe: "Tổng số",
            
              soTTHCCapTinh: accumulator.soTTHCCapTinh + currentValue.soTTHCCapTinh,
              soTTHCCapHuyen: accumulator.soTTHCCapHuyen + currentValue.soTTHCCapHuyen,
              soTTHCCapXa: accumulator.soTTHCCapXa + currentValue.soTTHCCapXa,
              soTTHCTaiBPMCCapTinh: accumulator.soTTHCTaiBPMCCapTinh + currentValue.soTTHCTaiBPMCCapTinh,
              soTTHCTaiBPMCCapHuyen: accumulator.soTTHCTaiBPMCCapHuyen + currentValue.soTTHCTaiBPMCCapHuyen,
              soTTHCTaiBPMCCapXa: accumulator.soTTHCTaiBPMCCapXa + currentValue.soTTHCTaiBPMCCapXa,
              soQuyTrinhCapTinh: accumulator.soQuyTrinhCapTinh + currentValue.soQuyTrinhCapTinh,
              soQuyTrinhCapHuyen: accumulator.soQuyTrinhCapHuyen + currentValue.soQuyTrinhCapHuyen,
              soQuyTrinhCapXa: accumulator.soQuyTrinhCapXa + currentValue.soQuyTrinhCapXa,
              tongSoTTHC: accumulator.tongSoTTHC + currentValue.tongSoTTHC,
              tongSoQuyTrinh: accumulator.tongSoQuyTrinh + currentValue.tongSoQuyTrinh,
              tongSoTTHCTheoCCMC: accumulator.tongSoTTHCTheoCCMC + currentValue.tongSoTTHCTheoCCMC,
            
            } 
          } )
          total.tenThongKe= "Tổng số",
          setData([...res?.data ,total]?? []);
      }
    }
  };
  let dateToDate: string = "";
  if (form.getFieldValue("tuNgay") && form.getFieldValue("denNgay")) {
    dateToDate =
      "(Từ ngày " +
      dayjs(form.getFieldValue("tuNgay")).format("DD/MM/YYYY") +
      " đến ngày " +
      dayjs(form.getFieldValue("denNgay")).format("DD/MM/YYYY") +
      ")";
  }
  if (form.getFieldValue("tuNgay") && form.getFieldValue("denNgay") == null) {
    dateToDate =
      "(Từ ngày " +
      dayjs(form.getFieldValue("tuNgay")).format("DD/MM/YYYY") +
      ")";
  }
  if (form.getFieldValue("tuNgay") == null && form.getFieldValue("denNgay")) {
    dateToDate =
      "(Đến ngày " +
      dayjs(form.getFieldValue("denNgay")).format("DD/MM/YYYY") +
      ")";
  }

  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaTTHC: item.maThongKe,
      // MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
    });
  };
  const getElementThongKe = (item: any, index: number) => {
    return (
      <tr style={{ fontWeight: item.maThongKe ?  "" : "bold" }}>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",

            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {index}
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
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>TỔNG HỢP SỐ LƯỢNG THỦ TỤC HÀNH CHÍNH</div>
      <SearchBaoCaoTongHop07b
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
        setThongKeToanBo={setThongKeToanBo}
        loaiDonViThongKe="donvi"
        onFinish={onFinish}
        items={items}
      />
      <div className="table-responsive">
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <div id="ContainerSwapper" style={{ fontSize: "16px" }} className="table-responsive">
            <table
              id=""
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
                    colSpan={thongKeToanBo ? 15 : 14}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      fontSize: "19px",
                    }}
                  >
                    <strong>
                    TỔNG HỢP SỐ LƯỢNG THỦ TỤC HÀNH CHÍNH
                    </strong>
                  
                  </td>
                </tr>
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
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopWrapper />
      ) : null}
       <XuatBaoCaoTongHop07bModal data={data}
          tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
          denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
          tenDonVi={tenDonViThongKe}
        />
        
    </div>
  );
};
function BaoCaoTongHop07bSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHop07b />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHop07bSwapper;


