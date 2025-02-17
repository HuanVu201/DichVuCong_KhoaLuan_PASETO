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
import {
  IBaoCaoDonVi,
  ISearchBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";

import { toast } from "react-toastify";
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import { SearchThongKeHoSoTrucTuyen } from "./SearchThongKeHoSoTrucTuyen";
import { SearchTkHoSoTrucTuyenCapHuyen } from "../redux/action";
import { ITiepNhanHoSoTrucTuyenResponse } from "../models/TiepNhanHoSoTrucTuyen";
const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp đơn vị", "tableToExcel")}
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

const ThongKeHoSoTrucTuyen = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
  var [data, setData] = useState<ITiepNhanHoSoTrucTuyenResponse[]>([]);
  useEffect(() => {
    thongKeHoSoContext.setSearchBaoCaoDonVi({
      ...thongKeHoSoContext.searchBaoCaoThuTuc,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
    // toast('zpp')
    // console.log(value.tuNgay, value.denNgay)
    if (value.tuNgay && value.denNgay) {
      var res = await dispatch(
        SearchTkHoSoTrucTuyenCapHuyen({
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          maDinhDanhCha: value.maDinhDanhCha,
          maDinhDanh: value.maDinhDanh,
          catalog: value.catalog,
          chiBaoGomDonViCon: value.chiBaoGomDonViCon,


        })
      ).unwrap();
      setData(res?.data as any);
    }
  };
  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaDonVi: item.maThongKe,
      // MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      kenhThucHien: thongKeHoSoContext.searchBaoCaoThuTuc.kenhThucHien,
      mucDo: thongKeHoSoContext.searchBaoCaoThuTuc.mucDo,
      loaiDoiTuong: thongKeHoSoContext.searchBaoCaoThuTuc.loaiDoiTuong,
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



  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Báo cáo tổng hợp đơn vị</div>
      <SearchThongKeHoSoTrucTuyen
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
        setThongKeToanBo={setThongKeToanBo}
        onFinish={onFinish}
        items={items}
      />
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

                    <strong>
                      BẢNG THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN
                    </strong>


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
                {data && data.length > 0
                  ? data.map((item, index) =>
                    getElementThongKe(item, index + 1)
                  )
                  : null}
              </tbody>

            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopWrapper />
      ) : null}

    </div>
  );
};
function ThongKeHoSoTrucTuyenSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThongKeHoSoTrucTuyen />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default ThongKeHoSoTrucTuyenSwapper;
