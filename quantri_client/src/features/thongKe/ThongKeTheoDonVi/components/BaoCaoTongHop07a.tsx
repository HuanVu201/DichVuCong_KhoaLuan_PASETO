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
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../context/BaoCaoTongHopContext";
import {
  IBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { BaoCaoTongHop07aAction } from "@/features/baocaotonghop/redux/action";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { Link } from "react-router-dom";
import { getCurrencyThongKe } from "@/utils";
import { XuatBaoCaoTongHop07aModal } from "./exportElements/XuatBaoCaoTongHop07a";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp 07a", "ContainerSwapper1")}
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
            "Thống kê báo cáo tổng hợp 07a",
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
const BaoCaoTongHop07a = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  const { data: auth } = useAppSelector((state) => state.auth);
  let userData: IParseUserToken;
  useEffect(() => {
    if (auth !== undefined) {
      userData = parseJwt(auth.token);

      if (userData.typeUser == "Admin") {
        thongKeHoSoContext.setSearchBaoCaoThuTuc({
          tuNgay: `${nam}-${thang}-01`,
          denNgay: `${nam}-${thang}-${ngay}`,
        });
      } else {
        thongKeHoSoContext.setSearchBaoCaoThuTuc({
          maDinhDanh: userData.maDinhDanh,
          tuNgay: `${nam}-${thang}-01`,
          denNgay: `${nam}-${thang}-${ngay}`,
        });
      }
    }
  }, []);

  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
    if (value.tuNgay && value.denNgay) {
      setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
      var res = await dispatch(
        BaoCaoTongHop07aAction({
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          maDinhDanh: value.maDinhDanh,
          maDinhDanhCha: value.maDinhDanhCha,
          catalog: value.catalog,
          laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
        })
      ).unwrap();
      setData(res?.data || []);
    }
  };



  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaLinhVucChinh: item.maThongKe,
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
      laDuLieuThongKeCacNam
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
          {item.tongTiepNhan ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhan")}>
              {getCurrencyThongKe(item.tongTiepNhan)}
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
          {item.tongDaXuLy ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLy")}>
              {getCurrencyThongKe(item.tongDaXuLy)}
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
          {item.daXuLyDungHanVaTruocHan ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "DaXuLyDungHanVaTruocHan")}
            >
              {getCurrencyThongKe(item.daXuLyDungHanVaTruocHan)}
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
          {item.tongDangXuLy ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "DangXuLy")}>
              {getCurrencyThongKe(item.tongDangXuLy)}
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

  return (
    <div className="thongKeSwapper">

      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        Tình hình, kết quả giải quyết TTHC tại cơ quan, đơn vị trực tiếp giải quyết TTHC
      </div>
      <SearchBaoCaoTongHop
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
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
              }}
            >
              {/* <thead> */}
              <tr>
                <td
                  colSpan={12}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                  }}
                >
                  <strong>
                    TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT TTHC TẠI CƠ QUAN, ĐƠN VỊ TRỰC
                    TIẾP GIẢI QUYẾT TTHC
                  </strong>
                  <br />
                  {/* <strong
                  className="filterDate"
                  dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
                /> */}
                </td>
              </tr>
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
                  <strong>STT</strong>
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
                  <strong>Lĩnh vực</strong>
                </td>
                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  <strong>Số hồ sơ nhận giải quyết</strong>
                </td>
                <td
                  colSpan={6}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Kết quả giải quyết</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Bổ sung</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Trả lại</strong>
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
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
                    width: "6%",
                  }}
                >
                  <strong>Trong đó</strong>
                </td>

                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
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
                    width: "6%",
                  }}
                >
                  <strong>Số hồ sơ đang giải quyết</strong>
                </td>
              </tr>
              <tr>
                {" "}
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Số kỳ trước chuyển qua</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Số mới tiếp nhận</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Tổng số</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Trả đúng thời hạn</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Trả quá hạn</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Tổng số</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Chưa đến hạn</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    width: "6%",
                  }}
                >
                  <strong>Quá hạn</strong>
                </td>
              </tr>

              {/* </thead> */}
              <tbody id="data">
                {data && data.length > 0
                  ? data.map((item, index) => getElementThongKe(item, index + 1))
                  : null}
                <CountDataThongKe07a data={data} />
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopWrapper />
      ) : null}
      <XuatBaoCaoTongHop07aModal data={data}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
        catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
          : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].catalog : undefined
        }
        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].groupName : undefined}
      />
    </div>
  );
};
function BaoCaoTongHop07aSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHop07a />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHop07aSwapper;


export const CountDataThongKe07a = ({
  data,
}: {
  data: IBaoCaoDonVi[] | undefined;
}) => {
  const [tongSoTotal, tiepNhanKyTruocTotal, tongTiepNhanTotal,
    tongDaXuLyTotal, daXuLyDungHanVaTruocHanTotal, daXuLyQuaHanTotal, tongDangXuLyTotal,
    dangXuLyTrongHanTotal, dangXuLyQuaHanTotal, tongBoSungTotal, tongTraLaiTotal
  ] = useMemo(() => {

    let tongSoTotal = 0, tiepNhanKyTruocTotal = 0, tongTiepNhanTotal = 0,
      tongDaXuLyTotal = 0, daXuLyDungHanVaTruocHanTotal = 0, daXuLyQuaHanTotal = 0, tongDangXuLyTotal = 0,
      dangXuLyTrongHanTotal = 0, dangXuLyQuaHanTotal = 0, tongBoSungTotal = 0, tongTraLaiTotal = 0

    data?.forEach((item: IBaoCaoDonVi) => {
      tongSoTotal += item.tongSo
      tiepNhanKyTruocTotal += item.tiepNhanKyTruoc
      tongTiepNhanTotal += item.tongTiepNhan
      tongDaXuLyTotal += item.tongDaXuLy
      daXuLyDungHanVaTruocHanTotal += item.daXuLyDungHanVaTruocHan
      daXuLyQuaHanTotal += item.daXuLyQuaHan
      tongDangXuLyTotal += item.tongDangXuLy
      dangXuLyTrongHanTotal += item.dangXuLyTrongHan
      dangXuLyQuaHanTotal += item.dangXuLyQuaHan
      tongBoSungTotal += item.tongBoSung
      tongTraLaiTotal += item.tongTraLai
    })



    return [tongSoTotal, tiepNhanKyTruocTotal, tongTiepNhanTotal,
      tongDaXuLyTotal, daXuLyDungHanVaTruocHanTotal, daXuLyQuaHanTotal, tongDangXuLyTotal,
      dangXuLyTrongHanTotal, dangXuLyQuaHanTotal, tongBoSungTotal, tongTraLaiTotal];
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
        {getCurrencyThongKe(tongSoTotal)}
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
        {getCurrencyThongKe(tiepNhanKyTruocTotal)}
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
        {getCurrencyThongKe(tongTiepNhanTotal)}
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
        {getCurrencyThongKe(tongDaXuLyTotal)}
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
        {getCurrencyThongKe(daXuLyDungHanVaTruocHanTotal)}
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
        {getCurrencyThongKe(daXuLyQuaHanTotal)}
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
        {getCurrencyThongKe(tongDangXuLyTotal)}
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
        {getCurrencyThongKe(dangXuLyTrongHanTotal)}
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
        {getCurrencyThongKe(dangXuLyQuaHanTotal)}
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
        {getCurrencyThongKe(tongBoSungTotal)}
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
        {getCurrencyThongKe(tongTraLaiTotal)}
      </td>
    </tr>
  )
}