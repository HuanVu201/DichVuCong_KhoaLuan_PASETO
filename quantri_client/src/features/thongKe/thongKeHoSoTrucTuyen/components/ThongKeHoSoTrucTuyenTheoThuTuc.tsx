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
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { BaoCaoTongHopThuTucAction } from "@/features/baocaotonghop/redux/action";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";

import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import { XuatThongKeHoSoTrucTuyenTheoThuTucModal } from "./exportElements/XuatThongKeHoSoTrucTuyenTheoThuTuc";
import { SearchBaoCaoTheoThuTuc } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTheoThuTuc";
import { SearchTkHoSoTrucTuyenTheoThuTuc } from "../redux/action";
import { ITiepNhanHoSoTrucTuyenElm } from "../models/TiepNhanHoSoTrucTuyen";
import HoSoTheoTiepNhanHoSoTrucTuyenWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoTiepNhanHoSoTrucTuyen";
import { SearchHoSoTrucTuyenTheoThuTucModal } from "./SearchHoSoTrucTuyenTheoThuTucModal";
import { TTHCCTH_GROUPCODE } from "@/data";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          downloadPhieuExcel(
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến theo TTHC", "ContainerSwapper1"
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
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến theo TTHC",
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

const ThongKeHoSoTrucTuyenTheoThuTuc = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();

  var [data, setData] = useState<ITiepNhanHoSoTrucTuyenElm[]>([]);
  var [loading, setLoading] = useState<boolean>(false);
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
  const [tenDonviTk, setTenDonViTk] = useState<string>();
  const [capThucHienTk, setCapThucHienThongKeTk] = useState<string>("");
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: auth } = useAppSelector((state) => state.auth);
  let userData: IParseUserToken;
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
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
    // console.log('====================================');
    // console.log(value);
    // console.log('====================================');
    if (value.tuNgay && value.denNgay)
      if (!value.maDinhDanh && !value.catalog) {
        toast.warning("Vui lòng chọn đơn vị");
      } else {
        setLoading(true);
        setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
        var res = await dispatch(
          SearchTkHoSoTrucTuyenTheoThuTuc({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            maDinhDanh: value.maDinhDanh,
            maDinhDanhCha: value.maDinhDanhCha,
            catalog: value.catalog,
            coPhatSinhHoSo: value.coPhatSinhHoSo,
            linhVucId: value.linhVucId,
            laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
          })
        ).unwrap();
        if (res?.data) {

          var total = res?.data.reduce((accumulator: any, currentValue: any) => {
            return {
              tenThongKe: "Tổng số",
              tongSo: accumulator.tongSo + currentValue.tongSo,
              tongToanTrinh: accumulator.tongToanTrinh + currentValue.tongToanTrinh,
              tongTrucTuyen: accumulator.tongTrucTuyen + currentValue.tongTrucTuyen,
              tongTrucTiep: accumulator.tongTrucTiep + currentValue.tongTrucTiep,
              tongBCCI: accumulator.tongBCCI + currentValue.tongBCCI,
              tongToanTrinhTrucTuyen: accumulator.tongToanTrinhTrucTuyen + currentValue.tongToanTrinhTrucTuyen,
              tongToanTrinhTrucTiep: accumulator.tongToanTrinhTrucTiep + currentValue.tongToanTrinhTrucTiep,
              tongToanTrinhBCCI: accumulator.tongToanTrinhBCCI + currentValue.tongToanTrinhBCCI,
              tongMotPhan: accumulator.tongMotPhan + currentValue.tongMotPhan,
              tongMotPhanTrucTuyen: accumulator.tongMotPhanTrucTuyen + currentValue.tongMotPhanTrucTuyen,
              tongMotPhanTrucTiep: accumulator.tongMotPhanTrucTiep + currentValue.tongMotPhanTrucTiep,
              tongMotPhanBCCI: accumulator.tongMotPhanBCCI + currentValue.tongMotPhanBCCI,
            }
          })
          total = {
            ...total,
            tenThongKe: "Tổng số",
          }
          setData([...res?.data, total]);
        }
        setLoading(false);
      }
  };
  useEffect(() => {

    if (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh) {
      var tmp = coCauToChucs?.find(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)
      if (tmp) {
        setTenDonViTk(tmp.groupName);
        if (tmp.catalog)
          setCapThucHienThongKeTk(tmp.catalog)
      }
    } else {
      setTenDonViTk("");
      if (thongKeHoSoContext.searchBaoCaoThuTuc.catalog)
        setCapThucHienThongKeTk(thongKeHoSoContext.searchBaoCaoThuTuc.catalog);
    }

  }, [thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
  thongKeHoSoContext.searchBaoCaoThuTuc.catalog])
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
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
      laDuLieuThongKeCacNam
    });
  };
  const getElementThongKe = (item: any, index: number) => {
    var tmpTyLeTrucTuyen = item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen) >= 0
      ? Math.round((item.tongTrucTuyen / (item.tongTrucTiep + item.tongTrucTuyen)) * 100 * 100) /
      100
      : undefined
    var tmpTyLeTrucTuyenToanTrinh = item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep) >= 0
      ? Math.round((item.tongToanTrinhTrucTuyen / (item.tongToanTrinhTrucTuyen + item.tongToanTrinhTrucTiep)) * 100 * 100) /
      100
      : undefined
    return (
      <>
        <tr style={{
          fontWeight: item.maThongKe ? "" : "bold"
        }}>
          <td
            style={{
              verticalAlign: "middle",
              padding: "5px",
              border: "1px solid #333",
              fontSize: "16px",
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
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
              textAlign: "left",
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
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.mucDo}
          </td>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongSo ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongSo")}
              >
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
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongTrucTuyen ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongTrucTuyen")}
              >
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
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongTrucTiep ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongTrucTiep")}
              >
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
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tongBCCI ? (
              <Link
                to=""
                onClick={() => handleLoadHoSo(item, "tongBCCI")}
              >
                {getCurrencyThongKe(item.tongBCCI)}
              </Link>
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

            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {tmpTyLeTrucTuyen != undefined ?
              tmpTyLeTrucTuyen > tyLeTrucTuyen ?
                "Vượt chỉ tiêu"
                : tmpTyLeTrucTuyen == tyLeTrucTuyen
                  ? "Đạt chỉ tiêu" : "Không đạt"
              : ""}
          </td>
          <td

            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontSize: "16px",
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

            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {tmpTyLeTrucTuyenToanTrinh != undefined ?
              tmpTyLeTrucTuyenToanTrinh > tyLeToanTrinhTrucTuyen ?
                "Vượt chỉ tiêu"
                : tmpTyLeTrucTuyenToanTrinh == tyLeToanTrinhTrucTuyen
                  ? "Đạt chỉ tiêu"
                  : "Không đạt"
              : ""}
          </td>
          <td

            style={{
              verticalAlign: "middle",
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontSize: "16px",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          ></td>
        </tr>

      </>
    );
  };
  var [tyLeTrucTuyen, tyLeToanTrinhTrucTuyen] = useMemo(() => {
    if (capThucHienTk == "so-ban-nganh" || capThucHienTk == "cnvpdk" || capThucHienTk == TTHCCTH_GROUPCODE)
      return [90, 90]
    if (capThucHienTk == "quan-huyen")
      return [90, 85]
    if (capThucHienTk == "xa-phuong")
      return [70, 70]
    return [0, 0]
  }, [capThucHienTk])
  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Tình hình tiếp nhận và giải quyết TTHC theo thủ tục</div>
      <SearchHoSoTrucTuyenTheoThuTucModal
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
          <div id="ContainerSwapper12" style={{ fontSize: "16px" }}>
            <table
              id="tableToExcel12"
              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <td
                    colSpan={11}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "18px",
                    }}
                  >

                    <strong>
                      BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN THEO TTHC{" "}
                    </strong>
                    <br />
                    <strong
                      className="filterDate"
                      dangerouslySetInnerHTML={{ __html: dateToDate || " " }}
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
                      fontSize: "16px",
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
                      textAlign: "center",
                      fontSize: "16px",
                      width: "25%"
                    }}
                  >
                    <strong>Tên thủ tục</strong>
                  </td>
                  <td
                    rowSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
                      width: "3%"
                    }}
                  >
                    <strong>Mức độ</strong>
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
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
                      fontSize: "16px",
                    }}
                  >
                    <strong>
                      {maTinh == "38" ? "Đánh giá theo Quyết định số 01/QĐ-UBND ngày 01/01/2025 của UBND tỉnh" : "Đánh giá"}
                    </strong>
                    <br />
                    <span>
                      (Tỷ lệ nộp hồ sơ trực tuyến: {tyLeTrucTuyen ? `${tyLeTrucTuyen}%` : "..."}; Tỷ lệ nộp hồ sơ trực tuyến
                      toàn trình: {tyLeToanTrinhTrucTuyen ? `${tyLeToanTrinhTrucTuyen}%` : "..."})
                    </span>
                  </td>
                  <td
                    rowSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  >
                    <strong>Ghi chú</strong>
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
                      width: "7%",
                      fontSize: "16px",

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

                      fontSize: "16px",
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
                      fontSize: "16px",
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
                      textAlign: "center",
                      fontSize: "16px",
                      width: "7%",
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
                      fontSize: "16px",
                      width: "7%",
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
                      fontSize: "16px",
                      width: "7%",
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
                      fontSize: "16px",
                      width: "7%",
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
                      fontSize: "16px",
                      width: "7%",
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
                      fontSize: "16px",
                      width: "7%",
                    }}
                  >
                    <strong>Đánh giá</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  <>
                    {data.map((item, index) =>
                      getElementThongKe(item, index + 1)
                    )}
                  </>
                ) : null}
              </tbody>
              {/* <CountDataThongKeHoSoTrucTuyenTheoThuTuc data={thongKeDatas} thongKeToanBo={true} /> */}
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoTiepNhanHoSoTrucTuyenWrapper />
      ) : null}
      <XuatThongKeHoSoTrucTuyenTheoThuTucModal data={data} tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay}
        tenDonVi={tenDonviTk}
        tyLeTrucTuyen={tyLeTrucTuyen}
        tyLeToanTrinhTrucTuyen={tyLeToanTrinhTrucTuyen}
        maTinh={maTinh}
      />

    </div>

  );
};
function ThongKeHoSoTrucTuyenTheoThuTucSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThongKeHoSoTrucTuyenTheoThuTuc />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default ThongKeHoSoTrucTuyenTheoThuTucSwapper;


