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
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";

import {
  IBaoCaoTongHopThanhToan,
  ISearchBaoCaoThuTuc,
  ISearchBaoCaoTongHopThanhToan,
} from "@/features/baocaotonghop/model";
import { TongHopThanhToanTheoDonViAction } from "@/features/baocaotonghop/redux/action";
import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../../context/BaoCaoTongHopContext";
import { SearchTongHopThanhToan } from "./SearchTongHopThanhToan";
import { getCurrency } from "@/utils";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Bảng thống kê thành phần nộp hồ sơ")}
      >
        <FileExcelOutlined style={{ color: "green" }} /> In file excel
      </button>
    ),
    key: "excel",
  },
];

const BaoCaoTongHopThanhToanTheoDonViTable = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoTongHopThanhToan>();
  const dispatch = useAppDispatch();
  const { tongHopThanhToans: tkDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  const [dataHtml, setDataHtml] = useState<string>("");
  const [thongKeDatas, setThongKeDatas] = useState<IBaoCaoTongHopThanhToan[]>(
    []
  );

  const [searchParams, setSearchParams] =
    useState<ISearchBaoCaoTongHopThanhToan>({});
  useEffect(() => {
    setSearchParams({
      ...searchParams,
      tiepNhanTuNgay: `${nam}-${thang}-01`,
      tiepNhanDenNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);

  const onFinish = async (value: ISearchBaoCaoTongHopThanhToan) => {
    var res = await dispatch(
      TongHopThanhToanTheoDonViAction({ ...searchParams, daThuPhi: true })
    ).unwrap();
    if (res?.data) setThongKeDatas(res.data);
  };

  let dataHtmlForExecl = "";

  useEffect(() => {
    let dataHtmlForPdf = "";
    var tongPhi = 0;
    var tongLePhi = 0;
    var tongTienMat = 0;
    var tongTrucTuyen = 0;
    var tongHinhThucThanhToanKhac = 0;
    var hoSoDaThuPhi = 0;

    thongKeDatas?.forEach((item: any, index) => {
      tongPhi += item.phi ? item.phi : 0;
      tongLePhi += item.lePhi ? item.lePhi : 0;
      tongTienMat += item.tongTienMat ? item.tongTienMat : 0;
      tongTrucTuyen += item.tongTrucTuyen ? item.tongTrucTuyen : 0;
      tongHinhThucThanhToanKhac += item.tongHinhThucThanhToanKhac
        ? item.tongHinhThucThanhToanKhac
        : 0;
      hoSoDaThuPhi += item.hoSoDaThuPhi ? item.hoSoDaThuPhi : 0;

      dataHtmlForPdf += `
          <tr>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
              ${index + 1}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;min-width:400px' >
              ${item.tenThongKe}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
              ${item.lePhi ? getCurrency(item.lePhi) : "0"}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.phi ? getCurrency(item.phi) : "0"}
            </td>
           
           <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
              ${item.tongTienMat ? getCurrency(item.tongTienMat) : "0"}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.tongTrucTuyen ? getCurrency(item.tongTrucTuyen) : "0"} 
           
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${
              item.tongHinhThucThanhToanKhac
                ? getCurrency(item.tongHinhThucThanhToanKhac)
                : "0"
            } 
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
          ${item.hoSoDaThuPhi ? getCurrency(item.hoSoDaThuPhi) : "0"} 
        
        </td>
          </tr>`;
    });
    if (thongKeDatas && thongKeDatas.length > 0)
      dataHtmlForPdf += `
          <tr>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
              ${thongKeDatas.length + 1}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;min-width:400px' >
              Tổng
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
              ${tongLePhi ? getCurrency(tongLePhi) : "0"}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${tongPhi ? getCurrency(tongPhi) : "0"}
            </td>
           
           <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
              ${tongTienMat ? getCurrency(tongTienMat) : "0"}
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${tongTrucTuyen ? getCurrency(tongTrucTuyen) : "0"} 
           
            </td>
            <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${
              tongHinhThucThanhToanKhac
                ? getCurrency(tongHinhThucThanhToanKhac)
                : "0"
            } 
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
          ${hoSoDaThuPhi ? getCurrency(hoSoDaThuPhi) : "0"} 
        
        </td>
          </tr>`;
    setDataHtml(dataHtmlForPdf);
  }, [thongKeDatas]);
  return (
    <div className="thongKeSwapper">
      <div className="headerThongKe">
        <div className="title">
          <h6></h6>
        </div>
        <div className="actionButtons">
          <button className="btnThongKe" onClick={() => onFinish(searchParams)}>
            <span className="icon">
              <SearchOutlined />
            </span>
            <span>Thống kê</span>
          </button>
          <div className="btnXuatBaoCao" style={{display: items.length > 0 ? '' : 'none'}}>
            <span className="icon">
              <PrinterOutlined />
            </span>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  In báo cáo
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <SearchTongHopThanhToan
        setSearchParams={setSearchParams}
        resetSearchParams={() => {}}
      />
      <div className="table-responsive">
      <Spin spinning={loading}>
        <div id="ContainerSwapper">
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
                  colSpan={9}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    fontSize: "19px",
                  }}
                >
                  <strong>THỐNG KÊ THU PHÍ, LỆ PHÍ THEO ĐƠN VỊ</strong>
                  <br />
                  {/* <strong
                className="filterDate"
                dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
              /> */}
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
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Lệ phí đã thu (VNĐ)</strong>
                </td>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Phí đã thu (VNĐ)</strong>
                </td>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Tiền mặt (VNĐ)</strong>
                </td>
                <td
                  colSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Chuyển khoản (VNĐ)</strong>
                </td>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Số lượt nộp hồ sơ đã thu phí, lệ phí</strong>
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
                  <strong>Qua cổng DVC quốc gia</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Chuyển khoản khác</strong>
                </td>
              </tr>
            </thead>
            <tbody
              id="data"
              dangerouslySetInnerHTML={{
                __html: dataHtml || "",
              }}
            />
          </table>
        </div>
      </Spin>
      </div>
    </div>
  );
};
function BaoCaoTongHopThanhToanTheoDonViSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <BaoCaoTongHopThanhToanTheoDonViTable />
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHopThanhToanTheoDonViSwapper;
