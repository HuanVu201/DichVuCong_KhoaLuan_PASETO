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
import { XuatThongKeHoSoTrucTuyenTheoMucDo34Modal } from "./exportElements/XuatThongkeHoSoTrucTuyenTheoMucDo34";
import { SearchBaoCaoTheoThuTuc } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTheoThuTuc";
import { SearchTkHoSoTrucTuyenTheoMucDo34, SearchTkHoSoTrucTuyenTheoThuTuc } from "../redux/action";
import { ITiepNhanHoSoTrucTuyenElm } from "../models/TiepNhanHoSoTrucTuyen";
import HoSoTheoTiepNhanHoSoTrucTuyenWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoTiepNhanHoSoTrucTuyen";
import { SearchHoSoTrucTuyenTheoThuTucModal } from "./SearchHoSoTrucTuyenTheoThuTucModal";
import { SearchBaoCaoTongHop } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTongHop";

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

const ThongKeHoSoTrucTuyenTheoMucDo34 = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.thongKeTiepNhanHoSoTrucTuyen
  );
  var [data, setData] = useState<ITiepNhanHoSoTrucTuyenElm[]>([]);
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
      if (!value.maDinhDanh && !value.catalog && !value.maDinhDanhCha) {
        toast.warning("Vui lòng chọn đơn vị");
      } else {
        setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
        var res = await dispatch(
          SearchTkHoSoTrucTuyenTheoMucDo34({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            maDinhDanh: value.maDinhDanh,
            maDinhDanhCha: value.maDinhDanhCha,
            catalog: value.catalog,
            coPhatSinhHoSo: value.coPhatSinhHoSo,
            laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam

          })
        ).unwrap();
        if (res?.data) {

          var total = res?.data.reduce((accumulator: any, currentValue: any) => {
            return {
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
              tthcDatChiTieu: accumulator.tthcDatChiTieu + currentValue.tthcDatChiTieu,
              tthcKhongDatChiTieu: accumulator.tthcKhongDatChiTieu + currentValue.tthcKhongDatChiTieu,
              tthcKhongPhatSinhHoSo: accumulator.tthcKhongPhatSinhHoSo + currentValue.tthcKhongPhatSinhHoSo,
              tenThongKe: "Tổng số",
            }
          })
          total = {
            ...total,
            tenThongKe: "Tổng số",
          }
          setData([...res?.data, total]);
        }

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
      MaDonVi: item.maThongKe,
      //   MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
      laDuLieuThongKeCacNam
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
              fontWeight: "bold"
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
              textAlign: "center",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >

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
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tthcDatChiTieu ? getCurrencyThongKe(item.tthcDatChiTieu) : "0"}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tthcKhongDatChiTieu ? getCurrencyThongKe(item.tthcKhongDatChiTieu) : "0"}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >
            {item.tthcKhongPhatSinhHoSo ? getCurrencyThongKe(item.tthcKhongPhatSinhHoSo) : "0"}
          </td>
          <td
            rowSpan={3}
            style={{
              verticalAlign: "middle",
              textAlign: "right",
              padding: "5px",
              border: "1px solid #333",
              fontFamily: "Times New Roman, Times, serif;",
            }}
          >

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
  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>TÌNH HÌNH TIẾP NHẬN HỒ SƠ TRỰC TUYẾN MỨC TOÀN TRÌNH, MỘT PHẦN
      </div>
      <SearchBaoCaoTongHop
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}

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
                      TÌNH HÌNH TIẾP NHẬN HỒ SƠ TRỰC TUYẾN MỨC TOÀN TRÌNH, MỘT PHẦN
                    </strong>
                    <br />
                    <strong
                      className="filterDate"
                      dangerouslySetInnerHTML={{ __html: dateToDate || " " }}
                    />
                  </td>
                </tr>
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
                    <strong>Tên Đơn vị</strong>
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
                    rowSpan={3}

                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
                      width: "8%"
                    }}
                  >
                    <strong> Tỷ lệ Hồ sơ trực tuyến/hồ sơ (Trực tuyến + Trực tiếp) của TTHC đăng ký trực tuyến
                    </strong>

                  </td>
                  <td
                    rowSpan={2}
                    colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
                      width: "25%"
                    }}
                  >
                    <strong> Đánh giá

                    </strong>
                    <br />
                    <i>
                      {maTinh == "38" ? "(Theo đánh giá theo Quyết định số 01/QĐ-UBND ngày 01/01/2025 của UBND tỉnh)" : "Đánh giá"}
                    </i>
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
                      fontSize: "16px",
                      width: "8%"
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
                      width: "8%"
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
                      width: "8%"
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
                      width: "8%"
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
                      width: "8%"
                    }}
                  >
                    <strong>Số TTHC đạt chỉ tiêu</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
                      width: "8%"
                    }}
                  >
                    <strong>Số TTHC không đạt chỉ tiêu</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: "center",
                      fontSize: "16px",
                      width: "8%"
                    }}
                  >
                    <strong>Số TTHC không xuất hiện hồ sơ</strong>
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
              {/* <CountDataThongKeHoSoTrucTuyenTheoMucDo34 data={thongKeDatas} thongKeToanBo={true} /> */}
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoTiepNhanHoSoTrucTuyenWrapper />
      ) : null}
      <XuatThongKeHoSoTrucTuyenTheoMucDo34Modal data={data}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay}
        tenDonVi={tenDonviTk}
        maTinh={maTinh}
      />

    </div>

  );
};
function ThongKeHoSoTrucTuyenTheoMucDo34Swapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThongKeHoSoTrucTuyenTheoMucDo34 />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default ThongKeHoSoTrucTuyenTheoMucDo34Swapper;


