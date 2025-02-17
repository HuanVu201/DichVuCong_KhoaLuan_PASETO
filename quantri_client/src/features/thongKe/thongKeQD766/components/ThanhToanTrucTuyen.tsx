import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThanhToanTrucTuyenParams } from "../models/ThongKeQD766Search";
import { SearchThanhToanTrucTuyen } from "../redux/action";
import {
  useThanhToanTrucTuyenContext,
  ThanhToanTrucTuyenContextProvider,
} from "../context/ThongKeQD766Context";
import {
  SearchOutlined,
  PrinterOutlined,
  DownOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Select, Dropdown, Space, Form, DatePicker, Col, Row, Spin } from "antd";
import type { MenuProps, SelectProps } from "antd";
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
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { SearchBaoCaoTongHop } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTongHop";
import { IThongKe766TTHCResponse } from "../models/ThongKe766TTHCModels";
import { IThongKeQD766 } from "../models/ThongKeQD766";
import { SearchBaoCaoThanhToanTrucTuyen } from "../../ThongKeTheoDonVi/components/SearchBaoCaoThanhToanTrucTuyen";
import { TTHCCTH_GROUPCODE } from "@/data";
const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
];
const CATALOGTH_OPTIONS: SelectProps["options"] = [
  { label: "Tất cả", value: "" },
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
  { label: "Chi nhánh văn phòng đăng ký đất đai", value: "cnvpdk" },
  { label: "Trung tâm Phục vụ hành chính công", value: TTHCCTH_GROUPCODE }

];
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
  // {
  //   label: (
  //     <button
  //       style={{ border: "none", background: "inherit" }}
  //       onClick={() =>
  //         downloadPhieuExcel(
  //           "Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh"
  //         )
  //       }
  //     >
  //       <FileExcelOutlined style={{ color: "green" }} /> In file excel
  //     </button>
  //   ),
  //   key: "excel",
  // },
];
const ThanhToanTrucTuyen = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useThanhToanTrucTuyenContext();
  const thongKeContext = useBaoCaoTongHopContext();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  let [form] = Form.useForm<IThanhToanTrucTuyenParams>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.ThongKeQD766
  );
  var [data, setData] = useState<IThongKeQD766[]>([]);
  useEffect(() => {
    thongKeHoSoContext.setSearch({
      ...thongKeHoSoContext.search,
      pageNumber: 1,
      pageSize: 10000,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
      type: "don-vi",
    });
  }, []);

  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");
  const [displayTQN, setDisplayTQN] = useState<string>("none");
  const [displayThang, setDisplayThang] = useState<string>("none");
  const [displayQuy, setDisplayQuy] = useState<string>("none");
  const [displayNam, setDisplayNam] = useState<string>("none");
  const [displayDate, setDisplayDate] = useState<string>("none");
  const [mdThoiGianThongKe, setMdThoiGianThongKe] = useState(24);
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
          cataLog: "so-ban-nganh",
          pageSize: 200,
          pageNumber: 1,
        })
      );
    })();
  }, []);

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

  const [dataSo, dataHuyen, dataXa] = useMemo(() => {
    var so = data?.filter((x) => x.catalog == "so-ban-nganh" && x.maThongKe);
    var huyen = data?.filter((x) => x.catalog == "quan-huyen" && x.maThongKe);
    var xa = data?.filter((x) => x.catalog == "xa-phuong" && x.maThongKe);
    return [so, huyen, xa];
  }, [data]);
  const onFinish = async (value: IThanhToanTrucTuyenParams) => {
    if (value.tuNgay && value.denNgay) {
      var res = await dispatch(SearchThanhToanTrucTuyen(value)).unwrap();
      setData(res?.data ?? []);
    }
  };
  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaDonVi: item.maThongKe,
      MaDinhDanh: thongKeHoSoContext.search.maDinhDanhCha,
      TuNgay: thongKeHoSoContext.search.tuNgay,
      DenNgay: thongKeHoSoContext.search.denNgay,
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
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {index}
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
          {item.maDinhDanh}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "left",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
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
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongCoNghiaVuTaiChinh ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "CoNghiaVuTaiChinh")}
            >
              {getCurrencyThongKe(item.tongCoNghiaVuTaiChinh)}
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
          {item.daTTTTQuaDvcqg ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "DaTTTTQuaDvcqg")}>
              {getCurrencyThongKe(item.daTTTTQuaDvcqg)}
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
          {item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh > 0
            ? (Math.round(
              (item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh) * 100 * 100
            ) /
              100) +
            "%"
            : "0"}
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
          {item?.daTTTTQuaDvcqg / item?.tongCoNghiaVuTaiChinh > 0
            ?
            (100 -
              Math.round(
                (item.daTTTTQuaDvcqg / item.tongCoNghiaVuTaiChinh) *
                100 *
                100
              ) /
              100).toFixed(2).replace(/\.00$/, '')
            + "%"
            : "0"}
        </td>
      </tr>
    );
  };

  return (
    <Spin spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
    >
      <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Theo dõi chỉ tiêu thanh toán trực tuyến</div>
        <SearchBaoCaoThanhToanTrucTuyen
          setSearchParams={thongKeHoSoContext.setSearch}
          resetSearchParams={() => { }}
          onFinish={onFinish}
          items={items}
        />
        <div
          id="ContainerSwapper table-responsive"
          style={{
            fontSize: "16px",
          }}
        >
          <table
            id="table"
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
                  colSpan={7}
                  style={{ verticalAlign: "middle", padding: "5px" }}
                >
                  <strong>
                    THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN - THEO
                    QUYẾT ĐỊNH SỐ 766/QĐ-TTG
                    <br /> NGÀY 23/06/2022
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
                  }}
                >
                  <strong>Mã định danh</strong>
                </td>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Tên đơn vị</strong>
                </td>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Tổng HS có nghĩa vụ tài chính</strong>
                </td>
                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Thanh toán trực tuyến trên Cổng DVC Quốc gia</strong>
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
                  <strong>Số HS đã TTTT cổng DVC QG</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Tỷ lệ TTTT cổng DVC QG (%)</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Tỷ lệ TT trực tiếp (%)</strong>
                </td>
              </tr>
            </thead>
            <tbody id="data">
              {dataSo && dataSo.length > 0 ? (
                <>
                  <tr>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>I</strong>
                    </td>
                    <td
                      colSpan={6}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "left",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Sở ban ngành</strong>
                    </td>
                  </tr>
                  {dataSo.map((item, index) => getElementThongKe(item, index + 1))

                  }
                </>
              ) : null}
              {dataHuyen && dataHuyen.length > 0 ? (
                <>
                  <tr>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>II</strong>
                    </td>
                    <td
                      colSpan={6}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "left",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Huyện, thành phố, thị xã</strong>
                    </td>
                  </tr>
                  {dataHuyen.map((item, index) =>
                    getElementThongKe(item, index + 1)
                  )}
                </>
              ) : null}
              {dataXa && dataXa.length > 0 ? (
                <>
                  <tr>
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>III</strong>
                    </td>
                    <td
                      colSpan={6}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "left",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Xã, phường, thị trấn</strong>
                    </td>
                  </tr>
                  {dataXa.map((item, index) =>
                    getElementThongKe(item, index + 1)
                  )}
                </>
              ) : null}
              <CountDataThanhToanTrucTuyen data={data} />
            </tbody>
          </table>
        </div>
        {/* ///////////////////////////////////////// */}

        <table
          id="tableToExcel"
          style={{
            display: "none",
            verticalAlign: "middle",
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "center",
            margin: "10px 0",
            fontSize: "16px",
          }}
        >
          {/* <thead> */}
          <tr>
            <td
              colSpan={7}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                textAlign: "center",
                fontSize: "24px",
              }}
            >
              <strong>
                THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN - THEO QUYẾT
                ĐỊNH SỐ 766/QĐ-TTG
                <br /> NGÀY 23/06/2022
              </strong>
            </td>
          </tr>

          <tr>
            <td colSpan={7} style={{ verticalAlign: "middle", padding: "5px" }}>
              <strong></strong>
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
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>Mã định danh</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>Tên đơn vị</strong>
            </td>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>Tổng HS có nghĩa vụ tài chính</strong>
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
              <strong>Thanh toán trực tuyến trên Cổng DVC Quốc gia</strong>
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
              }}
            >
              <strong>Số HS đã TTTT cổng DVC QG</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>Tỷ lệ TTTT cổng DVC QG (%)</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <strong>Tỷ lệ TT trực tiếp (%)</strong>
            </td>
          </tr>

          {/* </thead> */}
          {/* <tbody id="data">
          {thongKeDatas && thongKeDatas.length > 0
            ? thongKeDatas.map((item, index) =>
                getElementThongKe(item, index + 1)
              )
            : null}
        </tbody> */}
        </table>
        {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
          <HoSoTheoBaoCaoTongHopWrapper />
        ) : null}
      </div>
    </Spin>
  );
};

function ThanhToanTrucTuyenSwapper() {
  return (
    <ThanhToanTrucTuyenContextProvider>
      <BaoCaoTongHopProvider>
        <HoSoTheoBaoCaoTongHopProvider>
          <ThanhToanTrucTuyen />
        </HoSoTheoBaoCaoTongHopProvider>
      </BaoCaoTongHopProvider>
    </ThanhToanTrucTuyenContextProvider>
  );
}
export default ThanhToanTrucTuyenSwapper;


export const CountDataThanhToanTrucTuyen = ({
  data,
}: {
  data: IThongKeQD766[] | undefined;
}) => {
  const [tongCoNghiaVuTaiChinhTotal, daTTTTQuaDvcqgTotal] = useMemo(() => {

    let tongCoNghiaVuTaiChinhTotal = 0, daTTTTQuaDvcqgTotal = 0

    data?.forEach((item: IThongKeQD766) => {
      tongCoNghiaVuTaiChinhTotal += item.tongCoNghiaVuTaiChinh || 0
      daTTTTQuaDvcqgTotal += item.daTTTTQuaDvcqg || 0

    })



    return [tongCoNghiaVuTaiChinhTotal, daTTTTQuaDvcqgTotal];
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
          fontWeight: 600,
        }}
        colSpan={2}
      >
        Tổng số
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
        {getCurrencyThongKe(tongCoNghiaVuTaiChinhTotal)}
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
        {getCurrencyThongKe(daTTTTQuaDvcqgTotal)}
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
        {daTTTTQuaDvcqgTotal / tongCoNghiaVuTaiChinhTotal > 0
          ? Math.round(
            (daTTTTQuaDvcqgTotal / tongCoNghiaVuTaiChinhTotal) * 100 * 100
          ) /
          100 +
          "%"
          : "0"}
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
        {daTTTTQuaDvcqgTotal / tongCoNghiaVuTaiChinhTotal > 0
          ? Math.abs(
            100 -
            Math.round(
              (daTTTTQuaDvcqgTotal / tongCoNghiaVuTaiChinhTotal) *
              100 *
              100
            ) /
            100
          ) + "%"
          : "0"}
      </td>
    </tr>
  )
}