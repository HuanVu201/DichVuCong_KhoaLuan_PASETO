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
import "../../ThongKe.scss";
import dayjs from "dayjs";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdSelect } from "@/lib/antd/components";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { Value } from "sass";
import { toast } from "react-toastify";
import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../context/BaoCaoTongHopContext";
import { ISearchBaoCaoThuTuc } from "@/features/baocaotonghop/model";
import { BaoCaoTongHopThuTucAction } from "@/features/baocaotonghop/redux/action";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { SearchThongKeTheoKhungTg } from "../../thongKeQD766/components/SearchThongKeTheoKhungTg";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import { XuatBaoCaoTongHopThuTucModal } from "./exportElements/XuatBaoCaoTongHopThuTuc";

const loaiThoiGianThongKe = [
  { label: "Cố định", value: "codinh" },
  { label: "Bất kỳ", value: "batky" },
];
const thoiGianThongKe = [
  { label: "Theo tháng", value: "thang" },
  { label: "Theo quý", value: "quy" },
  { label: "Theo năm", value: "nam" },
];
const thangs = [
  { label: "Tháng 1", value: "thang1" },
  { label: "Tháng 2", value: "thang2" },
  { label: "Tháng 3", value: "thang3" },
  { label: "Tháng 4", value: "thang4" },
  { label: "Tháng 5", value: "thang5" },
  { label: "Tháng 6", value: "thang6" },
  { label: "Tháng 7", value: "thang7" },
  { label: "Tháng 8", value: "thang8" },
  { label: "Tháng 9", value: "thang9" },
  { label: "Tháng 10", value: "thang10" },
  { label: "Tháng 11", value: "thang11" },
  { label: "Tháng 12", value: "thang12" },
];

const quys = [
  { label: "Quý 1", value: "quy1" },
  { label: "Quý 2", value: "quy2" },
  { label: "Quý 3", value: "quy3" },
  { label: "Quý 4", value: "quy4" },
];

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          downloadPhieuExcel(
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh"
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
          downloadPhieuWord(
            "Bảng thống kê thu phí lệ phí theo thủ tục",
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

const ThongKeThuPhiLePhiTheoThuTucTable = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );

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

  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
    if (value.tuNgay && value.denNgay)
      if (value.maDinhDanh) {
        await dispatch(
          BaoCaoTongHopThuTucAction({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            maDinhDanh: value.maDinhDanh,
            maDinhDanhCha: value.maDinhDanhCha,
          })
        );
      } else {
        toast.warning("Vui lòng chọn đơn vị");
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

  const thamChieuLaMa = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];
  let dataHtmlForPdf = "";
  let dataHtmlForExecl = "";
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
            textAlign: "right",
            padding: "5px",
            border: "1px solid #333",

            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongSo ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "")}>
              {getCurrencyThongKe(item.tongSo)}
            </Link>
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
            <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanKyTruoc")}>
              {getCurrencyThongKe(item.tiepNhanKyTruoc)}
            </Link>
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
          {item.tiepNhanTrongKy ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanTrongKy")}>
              {getCurrencyThongKe(item.tiepNhanTrongKy)}
            </Link>
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
          {item.daXuLyTruocHan ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyTruocHan")}>
              {getCurrencyThongKe(item.daXuLyTruocHan)}
            </Link>
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
            <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyDungHan")}>
              {getCurrencyThongKe(item.daXuLyDungHan)}
            </Link>
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
            <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyQuaHan")}>
              {getCurrencyThongKe(item.daXuLyQuaHan)}
            </Link>
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
          {item.dangXuLyTrongHan ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "DangXuLyTrongHan")}
            >
              {getCurrencyThongKe(item.dangXuLyTrongHan)}
            </Link>
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
            <Link to="" onClick={() => handleLoadHoSo(item, "DangXuLyQuaHan")}>
              {getCurrencyThongKe(item.dangXuLyQuaHan)}
            </Link>
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
          {item.tongBoSung ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "BoSung")}>
              {getCurrencyThongKe(item.tongBoSung)}
            </Link>
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
          {item.tongTraLai ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "TraLai")}>
              {getCurrencyThongKe(item.tongTraLai)}
            </Link>
          ) : (
            "0"
          )}
        </td>
      </tr>
    );
  };
  thongKeDatas?.forEach((item: any, index) => {
    dataHtmlForPdf += `
        <tr>
        <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${index + 1}
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.tenThongKe}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.mucDo ? item.mucDo : ""}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${item.daXuLyDungHan}
          </td>
         
        </tr>`;

    //////////////////////////////////////////////////
    dataHtmlForExecl +=
      "<tr>" +
      "<td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>" +
      "<strong>" +
      thamChieuLaMa[index] +
      "</strong>" +
      "</td >" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; min-width: 500px' >" +
      "<strong>" +
      item.tenDonVi +
      "</strong>" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong>" +
      item.tongSo +
      "</strong>" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong>" +
      item.tongTrucTuyen +
      "</strong>" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong>" +
      item.tongTrucTiep +
      "</strong>" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong>" +
      item.tongBCCI +
      "</strong>" +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      (item.tongTrucTuyen / item.tongSo > 0
        ? "<strong>" +
        Math.round((item.tongTrucTuyen / item.tongSo) * 100 * 100) / 100 +
        "%</strong>"
        : "<strong></strong>") +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      (item.tongToanTrinhTrucTuyen / item.tongToanTrinh > 0
        ? "<strong>" +
        Math.round(
          (item.tongToanTrinhTrucTuyen / item.tongToanTrinh) * 100 * 100
        ) /
        100 +
        "%</strong>"
        : "<strong></strong>") +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong></strong>" +
      "</td>" +
      "</tr >" +
      "<tr>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >1</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "DVC trực tuyến một phần" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongMotPhan +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongMotPhanTrucTuyen +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongMotPhanTrucTiep +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongMotPhanBCCI +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >2</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "DVC trực tuyến toàn trình" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongToanTrinh +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongToanTrinhTrucTuyen +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongToanTrinhTrucTiep +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      item.tongToanTrinhBCCI +
      "</td>" +
      "</tr>";
  });

  return (
    <div className="thongKeSwapper">

      <SearchBaoCaoTongHop
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
        loaiDonViThongKe="donvi"
        onFinish={onFinish}
        items={items}
      />
      <div id="ContainerSwapper" style={{ fontSize: "16px" }}>
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
                colSpan={12}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  fontSize: "19px",
                }}
              >
                <strong>
                  TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH
                </strong>
                <br />
                <strong
                  className="filterDate"
                  dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
                />
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
                <strong>Thủ tục</strong>
              </td>

              <td
                colSpan={3}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
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
                  width: "8%",
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
                  width: "8%",
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
                  width: "8%",
                }}
              >
                <strong>Tổng số</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Kỳ trước</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Trong kỳ</strong>
              </td>

              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Trước hạn</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Đúng hạn</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Quá hạn</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Trong hạn</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  width: "8%",
                }}
              >
                <strong>Quá hạn</strong>
              </td>
            </tr>
          </thead>
          <tbody id="data">
            {thongKeDatas && thongKeDatas.length > 0
              ? thongKeDatas.map((item, index) =>
                getElementThongKe(item, index + 1)
              )
              : null}
          </tbody>
        </table>
      </div>

      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopWrapper />
      ) : null}
      {/* <XuatBaoCaoTongHopThuTucModal data={thongKeDatas} thongKeToanBo={false}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
        catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
          : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].catalog : undefined
        }
        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].groupName : undefined}
      /> */}
    </div>
  );
};
function BaoCaoTongHopThuTucSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThongKeThuPhiLePhiTheoThuTucTable />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHopThuTucSwapper;
