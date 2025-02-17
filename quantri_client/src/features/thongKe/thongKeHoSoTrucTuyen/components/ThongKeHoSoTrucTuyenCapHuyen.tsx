import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThongKeHoSoTrucTuyenCapHuyenParams } from "../models/TiepNhanHoSoTrucTuyenSearch";
import { SearchTkHoSoTrucTuyenCapHuyen } from "../redux/action";
import {
  useThongKeHoSoTrucTuyenCapHuyenContext,
  ThongKeHoSoTrucTuyenCapHuyenProvider,
} from "../context/ThongKeHoSoTrucTuyenContext";
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
  Radio,
} from "antd";
import type { MenuProps } from "antd";
import "../../ThongKe.scss";
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
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoTiepNhanHoSoTrucTuyenWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoTiepNhanHoSoTrucTuyen";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { ITiepNhanHoSoTrucTuyenResponse } from "../models/TiepNhanHoSoTrucTuyen";
import { LaDuLieuThongKeCacNamOptions } from "@/features/hoso/data/formData";

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
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến của UBND cấp huyện"
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
        onClick={() => {
          export2Word(
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến của UBND cấp huyện"
          );
        }}
        style={{ border: "none", background: "inherit" }}
      >
        <FileWordOutlined style={{ color: "#36a3f7" }} /> In file word
      </button>
    ),
    key: "word",
  },
];

const ThongKeHoSoTrucTuyenCapHuyen = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useThongKeHoSoTrucTuyenCapHuyenContext();
  let [form] = Form.useForm<IThongKeHoSoTrucTuyenCapHuyenParams>();
  const dispatch = useAppDispatch();
  // const { datas: thongKeDatas, loading } = useAppSelector(
  //   (state) => state.thongKeTiepNhanHoSoTrucTuyen
  // );
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");
  const [displayTQN, setDisplayTQN] = useState<string>("none");
  const [displayThang, setDisplayThang] = useState<string>("none");
  const [displayQuy, setDisplayQuy] = useState<string>("none");
  const [displayNam, setDisplayNam] = useState<string>("none");
  const [displayDate, setDisplayDate] = useState<string>("");
  const [loaiThoiGianTk, setLoaiThoiGianTk] = useState<string>("batky");
  const [mdThoiGianThongKe, setMdThoiGianThongKe] = useState(24);
  const [cacDonVi, setCacDonVi] = useState<ICoCauToChuc[]>([])
  const [thongKeDatas, setThongKeDatas] = useState<ITiepNhanHoSoTrucTuyenResponse[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
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
    form.setFieldValue("laDuLieuThongKeCacNam", true)
  }, [])
  const onChangeLoai = (value: string) => {
    setLoaiThoiGianTk(value)
    if (value == undefined) {
      setDisplayTQN('none')
      setDisplayThang('none')
      setDisplayQuy('none')
      setDisplayNam('none')
      setDisplayDate('none')
      setMdThoiGianThongKe(24)
      form.setFieldValue('thoigianthongketheo', undefined)
      form.setFieldValue('thang', undefined)
      form.setFieldValue('quy', undefined)
      form.setFieldValue('nam', undefined)
    }
    if (value == 'codinh') {
      setDisplayTQN('block')
      setDisplayThang('none')
      setDisplayQuy('none')
      setDisplayNam('none')
      setDisplayDate('none')
      setMdThoiGianThongKe(9)
    }
    if (value == 'batky') {
      setDisplayTQN('none')
      setDisplayThang('none')
      setDisplayQuy('none')
      setDisplayNam('none')
      setMdThoiGianThongKe(24)
      setDisplayDate('block')
      form.setFieldValue('thoigianthongketheo', undefined)
      form.setFieldValue('thang', undefined)
      form.setFieldValue('quy', undefined)
      form.setFieldValue('nam', undefined)
    }
  }

  const onChangeTQN = (value: string) => {
    if (value == 'thang') {
      setDisplayThang('block')
      setDisplayQuy('none')
      setDisplayNam('block')
      setMdThoiGianThongKe(9)
      form.setFieldValue('quy', undefined)
      form.setFieldValue('nam', undefined)
    }
    if (value == 'quy') {
      setDisplayThang('none')
      setDisplayQuy('block')
      setDisplayNam('block')
      setMdThoiGianThongKe(9)
      form.setFieldValue('thang', undefined)
      form.setFieldValue('nam', undefined)
    }
    if (value == 'nam') {
      setDisplayThang('none')
      setDisplayQuy('none')
      setDisplayNam('block')
      setMdThoiGianThongKe(14)
      form.setFieldValue('thang', undefined)
      form.setFieldValue('quy', undefined)

    }
    if (value == undefined) {
      setDisplayThang('none')
      setDisplayQuy('none')
      setDisplayNam('none')
      setMdThoiGianThongKe(9)
      form.setFieldValue('thang', undefined)
      form.setFieldValue('quy', undefined)
      form.setFieldValue('nam', undefined)
    }
  }

  function getFirstDayOfMonth(year: any, month: any) {
    const firstDay: string = new Date(year, month - 1, 2)
      .toISOString()
      .split("T")[0]
      .toString();
    return firstDay;
  }
  function getLastDayOfMonth(year: any, month: any) {
    const lastDay: string = new Date(year, month, 1)
      .toISOString()
      .split("T")[0]
      .toString();
    return lastDay;
  }

  function getFirstAndLastDayOfQuarter(year: any, quarter: any) {
    const firstMonth = (quarter - 1) * 3 + 1;
    const firstDay = new Date(year, firstMonth - 1, 2)
      .toISOString()
      .split("T")[0]
      .toString();
    const lastDay = new Date(year, firstMonth + 2, 1)
      .toISOString()
      .split("T")[0]
      .toString();
    return { firstDay, lastDay };
  }

  useEffect(() => {
    const now = new Date();
    var tuNgay = `01/01/${now.getFullYear()}`;
    var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    form.setFieldValue("tuNgay", tuNgay ? dayjs(tuNgay) : null);
    form.setFieldValue("denNgay", denNgay ? dayjs(denNgay) : null);
  }, [])

  const setSearchValue = () => {
    const donViData: any = form.getFieldValue('donvi') || maDinhDanh;
    let tuNgayData: string = '';
    let denNgayData: string = '';

    if (loaiThoiGianTk == 'codinh') {
      if (!form.getFieldValue('thoigianthongketheo')) {
        toast.warning("Chưa chọn thời gian thống kê!")
        return
      } else {
        if (form.getFieldValue('thoigianthongketheo') == 'thang') {
          if (!form.getFieldValue('thang') || !form.getFieldValue('nam')) {
            toast.warning('Chọn đầy đủ thời gian thống kê!')
            return
          }

          if (form.getFieldValue('thang') && form.getFieldValue('nam')?.$y) {
            const thang: string = form.getFieldValue('thang')
            tuNgayData = getFirstDayOfMonth(form.getFieldValue('nam')?.$y, thang.replace('thang', ''))
            denNgayData = getLastDayOfMonth(form.getFieldValue('nam')?.$y, thang.replace('thang', ''))
          }

        }
        if (form.getFieldValue('thoigianthongketheo') == 'quy') {
          if (!form.getFieldValue('quy') || !form.getFieldValue('nam')) {
            toast.warning('Chọn đầy đủ thời gian thống kê!')
            return
          }

          if (form.getFieldValue('quy') && form.getFieldValue('nam')?.$y) {
            const quy: string = form.getFieldValue('quy')
            tuNgayData = getFirstAndLastDayOfQuarter(form.getFieldValue('nam')?.$y, quy.replace('quy', '')).firstDay
            denNgayData = getFirstAndLastDayOfQuarter(form.getFieldValue('nam')?.$y, quy.replace('quy', '')).lastDay
          }

        }
        if (form.getFieldValue('thoigianthongketheo') == 'nam') {
          if (!form.getFieldValue('nam')) {
            toast.warning('Chọn đầy đủ thời gian thống kê!')
            return
          }
          else {
            tuNgayData = getFirstDayOfMonth(form.getFieldValue('nam')?.$y, 1)
            tuNgayData = getFirstDayOfMonth(form.getFieldValue('nam')?.$y, 12)
          }
        }
      }
    } else {

      if (loaiThoiGianTk == 'batky') {
        if (!form.getFieldValue('tuNgay') || !form.getFieldValue('denNgay')) {
          toast.warning('Chọn đầy đủ thời gian thống kê!')
          return
        }
        else {
          tuNgayData = dayjs(form.getFieldValue("tuNgay")).format("YYYY-MM-DD")
          denNgayData = dayjs(form.getFieldValue("denNgay")).format("YYYY-MM-DD")

          if (tuNgayData > denNgayData || tuNgayData > `${nam}-${thang}-${ngay}`) {
            toast.warning('Ngày bắt đầu/kết thúc không hợp lệ!')
            return
          }
        }
      } else {
        toast.warning('Chưa chọn loại thời gian')
        return
      }
    }
    thongKeHoSoContext.setSearch({
      ...thongKeHoSoContext.search,
      maDinhDanhCha: donViData,
      tuNgay: tuNgayData,
      denNgay: denNgayData,
      laDuLieuThongKeCacNam: form.getFieldValue("laDuLieuThongKeCacNam")
    });
  }

  useEffect(() => {
    if (thongKeHoSoContext.search.tuNgay && thongKeHoSoContext.search.denNgay) {
      (async () => {
        setLoading(true)
        const res = await dispatch(SearchTkHoSoTrucTuyenCapHuyen({
          ...thongKeHoSoContext.search,
          catalog: 'quan-huyen'
        })).unwrap();
        if (res) {
          setThongKeDatas(res.data as any)
        } else {
          toast.error('Lỗi lấy thông tin thống kê!')
        }
        setLoading(false)
      })();
    }
  }, [thongKeHoSoContext.search]);

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

  let dataHtmlForPdf = "";
  let dataHtmlForExcel = "";
  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaDonVi: item.maDonVi,
      Catalog: "quan-huyen",
      // MaDinhDanh: thongKeHoSoContext.search.maDinhDanhCha,
      TuNgay: thongKeHoSoContext.search.tuNgay,
      DenNgay: thongKeHoSoContext.search.denNgay,
      tieuChi: tieuChi,
    });
  };
  const getElementThongKe = (item: any, index: number) => {
    return (
      <>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            <strong>{index}</strong>
          </td>
          <td
            style={{
              verticalAlign: "middle",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
              textAlign: "left",
              minWidth: "350px",
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
            {item.tongTrucTuyen ? (
              <Link to="" onClick={() => handleLoadHoSo(item, "tongTrucTuyen")}>
                {getCurrencyThongKe(item.tongTrucTuyen)}
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
            {item.tongTrucTiep ? (
              <Link to="" onClick={() => handleLoadHoSo(item, "tongTrucTiep")}>
                {getCurrencyThongKe(item.tongTrucTiep)}
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
            {item.tongBCCI ? (
              <Link to="" onClick={() => handleLoadHoSo(item, "tongBCCI")}>
                {getCurrencyThongKe(item.tongBCCI)}
              </Link>
            ) : (
              "0"
            )}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen) > 0 ? (
              <strong>
                {Math.round((item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen)) * 100 * 100) /
                  100}
                %
              </strong>
            ) : (
              "0"
            )}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep) > 0 ? (
              <strong>
                {Math.round(
                  (item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep)) * 100 * 100
                ) / 100}
                %
              </strong>
            ) : (
              "0"
            )}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
        </tr>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "left",
              minWidth: "350px",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            DVC trực tuyến một phần
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
            {item.tongMotPhan ? (
              <Link to="" onClick={() => handleLoadHoSo(item, "tongMotPhan")}>
                {getCurrencyThongKe(item.tongMotPhan)}
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
            {item.tongMotPhanTrucTuyen ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongMotPhanTrucTuyen")}
              >
                {getCurrencyThongKe(item.tongMotPhanTrucTuyen)}
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
            {item.tongMotPhanTrucTiep ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongMotPhanTrucTiep")}
              >
                {getCurrencyThongKe(item.tongMotPhanTrucTiep)}
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
            {item.tongMotPhanBCCI ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongMotPhanBCCI")}
              >
                {getCurrencyThongKe(item.tongMotPhanBCCI)}
              </Link>
            ) : (
              "0"
            )}
          </td>
        </tr>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
          <td
            style={{
              verticalAlign: "middle",

              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
              textAlign: "left",
              minWidth: "350px",
            }}
          >
            DVC trực tuyến toàn trình
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
            {item.tongToanTrinh ? (
              <Link to="" onClick={() => handleLoadHoSo(item, "tongToanTrinh")}>
                {getCurrencyThongKe(item.tongToanTrinh)}
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
            {item.tongToanTrinhTrucTuyen ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongToanTrinhTrucTuyen")}
              >
                {getCurrencyThongKe(item.tongToanTrinhTrucTuyen)}
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
            {item.tongToanTrinhTrucTiep ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongToanTrinhTrucTiep")}
              >
                {getCurrencyThongKe(item.tongToanTrinhTrucTiep)}
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
            {item.tongToanTrinhBCCI ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongToanTrinhBCCI")}
              >
                {getCurrencyThongKe(item.tongToanTrinhBCCI)}
              </Link>
            ) : (
              "0"
            )}
          </td>
        </tr>
      </>
    );
  };
  thongKeDatas?.forEach((item: any, index) => {
    dataHtmlForPdf +=
      "<tr>" +
      "<td style=' vertical-align: middle; padding: 5px; border: 1px solid #333'>" +
      "<strong>" +
      Math.abs(index + 1) +
      "</strong>" +
      "</td >" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left' >" +
      "<strong>" +
      item.tenDonVi +
      "</strong>" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +

      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +

      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +

      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +

      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
      (item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen) > 0
        ? "<strong>" +
        Math.round((item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen)) * 100 * 100) / 100 +
        "%</strong>"
        : "<strong></strong>") +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
      "<strong></strong>" +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
      (item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep) > 0
        ? "<strong>" +
        Math.round(
          (item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep)) * 100 * 100
        ) /
        100 +
        "%</strong>"
        : "<strong></strong>") +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333' >" +
      "<strong></strong>" +
      "</td>" +
      "</tr >" +
      "<tr>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' ></td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left' >" +
      "DVC trực tuyến một phần" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongMotPhan +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongMotPhanTrucTuyen +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongMotPhanTrucTiep +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongMotPhanBCCI +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333' ></td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left' >" +
      "DVC trực tuyến toàn trình" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongToanTrinh +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongToanTrinhTrucTuyen +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongToanTrinhTrucTiep +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right;' >" +
      item.tongToanTrinhBCCI +
      "</td>" +
      "</tr>";

    //////////////////////////////////////////////////////////////////////////////////////////

    dataHtmlForExcel +=
      "<tr>" +
      "<td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>" +
      "<strong>" +
      Math.abs(index + 1) +
      "</strong>" +
      "</td >" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong>" +
      item.tenDonVi +
      "</strong>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; ' >" +
      getCurrencyThongKe(item.tongSo) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; ' >" +
      getCurrencyThongKe(item.tongTrucTuyen) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; ' >" +
      getCurrencyThongKe(item.tongTrucTiep) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; ' >" +
      getCurrencyThongKe(item.tongBCCI) +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      (item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen) > 0
        ? "<strong>" +
        Math.round((item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen)) * 100 * 100) / 100 +
        "%</strong>"
        : "<strong></strong>") +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong></strong>" +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      (item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep) > 0
        ? "<strong>" +
        Math.round(
          (item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep)) * 100 * 100
        ) /
        100 +
        "%</strong>"
        : "<strong></strong>") +
      "</td>" +
      "<td rowspan='3' style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "<strong></strong>" +
      "</td>" +
      "</tr >" +
      "<tr>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' ></td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "DVC trực tuyến một phần" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongMotPhan) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongMotPhanTrucTuyen) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongMotPhanTrucTiep) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongMotPhanBCCI) +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' ></td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      "DVC trực tuyến toàn trình" +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongToanTrinh) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongToanTrinhTrucTuyen) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongToanTrinhTrucTiep) +
      "</td>" +
      "<td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >" +
      getCurrencyThongKe(item.tongToanTrinhBCCI) +
      "</td>" +
      "</tr>";
  });

  return (
    <div className="thongKeSwapper table-responsive">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        Bảng thống kê tiếp nhận hồ sơ trực tuyến của UBND cấp huyện
      </div>

      <div className="searchBlock">

        <Form layout="horizontal" form={form}>
          <Row gutter={[8, 8]}>
            {maTinh == "38" ? <Col md={12} span={12} >
              <Form.Item
                label="Loại dữ liệu thống kê"
                name="laDuLieuThongKeCacNam"

              >
                <Radio.Group
                  options={LaDuLieuThongKeCacNamOptions}
                  defaultValue={true}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Col> : null}
          </Row>
          <Row gutter={[8, 8]}>
            <Col md={5}>
              <Form.Item label="Loại thời gian" name="loaithoigianthongke">
                <Radio.Group
                  options={loaiThoiGianThongKe}
                  onChange={(value) => onChangeLoai(value.target.value)}
                  defaultValue={loaiThoiGianTk}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Col>
            <Col md={5} style={{ display: displayDonVi }}>
              <Form.Item label="Đơn vị" name="donvi">
                <AntdSelect
                  generateOptions={{
                    model: cacDonVi ?? [],
                    value: "maDinhDanh",
                    label: "groupName",
                  }}
                  showSearch
                  allowClear
                  placeholder="Chọn đơn vị thống kê"
                  onClick={() => {
                    if (cacDonVi.length == 0) {
                      (async () => {
                        setLoading(true)
                        const res = await dispatch(SearchCoCauToChuc({
                          type: "don-vi",
                          cataLog: "quan-huyen",
                          pageSize: 1000,
                          pageNumber: 1,
                        })).unwrap();

                        if (res) {
                          setCacDonVi(res.data.filter((coCau) => coCau.maDinhDanh !== null))
                        } else {
                          toast.error("Lỗi lấy thông tin cơ cấu!")
                        }
                        setLoading(false)
                      })()
                    }
                  }}
                />
              </Form.Item>
            </Col>

            <Col md={4} style={{ display: displayTQN }}>
              <Form.Item name="thoigianthongketheo" label="Thống kê theo" >
                <AntdSelect
                  onChange={onChangeTQN}
                  generateOptions={{
                    model: thoiGianThongKe,
                    value: "value",
                    label: "label",
                  }}
                  allowClear={false}
                  placeholder="Tháng/Quý/Năm"
                />
              </Form.Item>
            </Col>
            <Col md={5} style={{ display: displayThang }}>
              <Form.Item name="thang" label="Chọn tháng">
                <AntdSelect
                  generateOptions={{
                    model: thangs,
                    value: "value",
                    label: "label",
                  }}
                  allowClear={false}
                  placeholder="Chọn tháng"
                />
              </Form.Item>
            </Col>
            <Col md={5} style={{ display: displayQuy }}>
              <Form.Item name="quy" label="Chọn quý">
                <AntdSelect
                  generateOptions={{
                    model: quys,
                    value: "value",
                    label: "label",
                  }}
                  allowClear={false}
                  placeholder="Chọn quý"
                />
              </Form.Item>
            </Col>
            <Col md={5} style={{ display: displayNam }}>
              <Form.Item name="nam" label="Chọn năm">
                <DatePicker picker="year" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col md={2} style={{ display: displayDate }} />
            <Col md={5} style={{ display: displayDate }}>
              <Form.Item label="Từ ngày" name="tuNgay">
                <DatePicker
                  allowClear={false}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col md={2} style={{ display: displayDate }} />
            <Col md={5} style={{ display: displayDate }}>
              <Form.Item label="Đến ngày" name="denNgay">
                <DatePicker
                  allowClear={false}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="headerThongKe">
            <div className="title">

            </div>
            <div className="actionButtons">
              <button className="btnThongKe" onClick={setSearchValue}>
                <span className="icon">
                  <SearchOutlined />
                </span>
                <span>Thống kê</span>
              </button>
              <div className="btnXuatBaoCao" style={{ display: items.length > 0 ? '' : 'none' }}>
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
        </Form>

      </div>
      <div className="table-responsive">
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
          }
        >

          <div id="ContainerSwapper" className="ContainerSwapper">

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
                    colSpan={10}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      fontSize: "19px",
                    }}
                  >
                    <strong>PHỤ LỤC 3</strong>
                    <br />
                    <strong>
                      BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN CỦA UBND CẤP HUYỆN
                    </strong>
                    <br />
                    <strong
                      className="filterDate"
                      dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
                    />
                  </td>
                </tr>
                <tr></tr>
              </thead>
            </table>
            <table
              id="table"
              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                fontSize: "17px",
              }}
            >
              {/* <thead> */}

              <tr>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "3%",
                  }}
                >
                  <strong>TT</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "25%",
                  }}
                >
                  <strong>Tên đơn vị</strong>
                </td>
                <td
                  colSpan={4}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Số lượng hồ sơ tiếp nhận và giải quyết</strong>
                </td>
                <td
                  rowSpan={2}
                  colSpan={4}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>
                    {maTinh == "38" ? "Đánh giá theo Quyết định số 01/QĐ-UBND ngày 01/01/2025 của UBND tỉnh" : "Đánh giá"}
                  </strong>
                  <br />
                  <span>
                    (Tỷ lệ nộp hồ sơ trực tuyến: 90%; Tỷ lệ nộp hồ sơ trực tuyến
                    toàn trình: 85%)
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>Tổng số hồ sơ</strong>
                </td>
                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
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
                    width: "9%",
                  }}
                >
                  <strong>Trực tuyến</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>Trực tiếp</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>BCCI</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>Tỷ lệ hồ sơ nộp trực tuyến</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>Đánh giá</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>Tỷ lệ hồ sơ nộp trực tuyến toàn trình</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "9%",
                  }}
                >
                  <strong>Đánh giá</strong>
                </td>
              </tr>
              {/* </thead> */}
              <tbody id="data">
                {thongKeDatas && thongKeDatas.length > 0
                  ? thongKeDatas.map((item, index) =>
                    getElementThongKe(item, index + 1)
                  )
                  : null}
              </tbody>
              <CountDataThongKeHoSoTrucTuyenCapHuyen data={thongKeDatas} />
            </table>
          </div>
        </Spin>
        <table
          id="tableToExcel"
          style={{
            display: "none",
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
                colSpan={5}
                style={{
                  verticalAlign: "top",
                  padding: "5px",
                  textAlign: 'center',
                }}
              >
                {/* {groupName ? <strong>{groupName.toUpperCase()} </strong> : ''} */}
              </td>
              <td
                colSpan={5}
                style={{
                  verticalAlign: "top",
                  padding: "5px",
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
                  textAlign: "center",
                }}
              >
                <strong>PHỤ LỤC 3</strong>
                <br />
                <strong>
                  BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN CỦA UBND CẤP HUYỆN
                </strong>
                <br />
                <i
                  className="filterDate"
                  dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
                />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td
                rowSpan={3}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>TT</strong>
              </td>
              <td
                rowSpan={3}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Tên đơn vị</strong>
              </td>
              <td
                colSpan={4}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Số lượng hồ sơ tiếp nhận và giải quyết</strong>
              </td>
              <td
                rowSpan={2}
                colSpan={4}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>
                  {maTinh == "38" ? "Đánh giá theo Quyết định số 01/QĐ-UBND ngày 01/01/2025 của UBND tỉnh" : "Đánh giá"}
                </strong>
                <br />
                <span>
                  (Tỷ lệ nộp hồ sơ trực tuyến: 90%; Tỷ lệ nộp hồ sơ trực tuyến
                  toàn trình: 85%)
                </span>
              </td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Tổng số hồ sơ</strong>
              </td>
              <td
                colSpan={3}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
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
                  textAlign: "center",
                }}
              >
                <strong>Trực tuyến</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Trực tiếp</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>BCCI</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Tỷ lệ hồ sơ nộp trực tuyến</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Đánh giá</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Tỷ lệ hồ sơ nộp trực tuyến toàn trình</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                }}
              >
                <strong>Đánh giá</strong>
              </td>
            </tr>
          </thead>
          <tbody
            id="data"
            dangerouslySetInnerHTML={{
              __html: dataHtmlForExcel || "Không có dữ liệu!",
            }}
          />
          <CountDataThongKeHoSoTrucTuyenCapHuyen data={thongKeDatas} />
        </table>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoTiepNhanHoSoTrucTuyenWrapper />
      ) : null}
    </div>
  );
};
function ThongKeHoSoTrucTuyenCapHuyenSwapper() {
  return (
    <ThongKeHoSoTrucTuyenCapHuyenProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ButtonActionProvider>
          <ThongKeHoSoTrucTuyenCapHuyen />
        </ButtonActionProvider>
      </HoSoTheoBaoCaoTongHopProvider>
    </ThongKeHoSoTrucTuyenCapHuyenProvider>
  );
}
export default ThongKeHoSoTrucTuyenCapHuyenSwapper;


export const CountDataThongKeHoSoTrucTuyenCapHuyen = ({
  data,
}: {
  data: ITiepNhanHoSoTrucTuyenResponse[] | undefined;
}) => {
  const [tongTrucTuyenTotal, tongTrucTiepTotal,
    tongMotPhanTotal, tongMotPhanTrucTuyenTotal, tongMotPhanTrucTiepTotal, tongMotPhanBCCITotal,
    tongToanTrinhTotal, tongToanTrinhTrucTuyenTotal, tongToanTrinhTrucTiepTotal, tongToanTrinhBCCITotal
  ] = useMemo(() => {

    let tongTrucTuyenTotal = 0, tongTrucTiepTotal = 0,
      tongMotPhanTotal = 0, tongMotPhanTrucTuyenTotal = 0, tongMotPhanTrucTiepTotal = 0, tongMotPhanBCCITotal = 0,
      tongToanTrinhTotal = 0, tongToanTrinhTrucTuyenTotal = 0, tongToanTrinhTrucTiepTotal = 0, tongToanTrinhBCCITotal = 0

    data?.forEach((item: any) => {
      tongTrucTuyenTotal += item.tongTrucTuyen
      tongTrucTiepTotal += item.tongTrucTiep
      tongMotPhanTotal += item.tongMotPhan
      tongMotPhanTrucTuyenTotal += item.tongMotPhanTrucTuyen
      tongMotPhanTrucTiepTotal += item.tongMotPhanTrucTiep
      tongMotPhanBCCITotal += item.tongMotPhanBCCI
      tongToanTrinhTotal += item.tongToanTrinh
      tongToanTrinhTrucTuyenTotal += item.tongToanTrinhTrucTuyen
      tongToanTrinhTrucTiepTotal += item.tongToanTrinhTrucTiep
      tongToanTrinhBCCITotal += item.tongToanTrinhBCCI
    })



    return [tongTrucTuyenTotal, tongTrucTiepTotal,
      tongMotPhanTotal, tongMotPhanTrucTuyenTotal, tongMotPhanTrucTiepTotal, tongMotPhanBCCITotal,
      tongToanTrinhTotal, tongToanTrinhTrucTuyenTotal, tongToanTrinhTrucTiepTotal, tongToanTrinhBCCITotal];
  }, [data]);


  return (
    <tr>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "center",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "left",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        <strong>Tổng số</strong>
      </td>

      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tongMotPhanTotal + tongToanTrinhTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tongMotPhanTrucTuyenTotal + tongToanTrinhTrucTuyenTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tongMotPhanTrucTiepTotal + tongToanTrinhTrucTiepTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tongMotPhanBCCITotal + tongToanTrinhBCCITotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "center",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {tongTrucTuyenTotal / (tongTrucTiepTotal + tongTrucTuyenTotal) > 0 ? (
          <strong>
            {Math.round((tongTrucTuyenTotal / (tongTrucTiepTotal + tongTrucTuyenTotal)) * 100 * 100) /
              100}
            %
          </strong>
        ) : (
          "0"
        )}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "center",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >

      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "center",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {tongToanTrinhTrucTuyenTotal / (tongToanTrinhTrucTuyenTotal + tongToanTrinhTrucTiepTotal) > 0 ? (
          <strong>
            {Math.round(
              (tongToanTrinhTrucTuyenTotal / (tongToanTrinhTrucTuyenTotal + tongToanTrinhTrucTiepTotal)) * 100 * 100
            ) / 100}
            %
          </strong>
        ) : (
          "0"
        )}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "center",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >

      </td>


    </tr>
  )
}