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
import { BaoCaoDonViLinhVucAction } from "@/features/baocaotonghop/redux/action";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { XuatBaoCaoDonViLinhVucModal } from "./exportElements/XuatBaoCaoDonViLinhVuc";
import { SearchBaoCaoTongHopDonVi } from "./SearchBaoCaoTongHopDonVi";
import { SearchBaoCaoTongHopLinhVuc } from "./SearchBaoCaoTongHopLinhVuc";
import HoSoTheoBaoCaoTongHopDonViWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopDonVi";
const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp lĩnh vực", "ContainerSwapper1")}
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
const BaoCaoDonViLinhVuc = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  // const { datas: thongKeDatas, loading } = useAppSelector(
  //   (state) => state.BaoCaoTongHop
  // );
  const [loading, setLoading] = useState<boolean>(false);
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const { data: auth } = useAppSelector((state) => state.auth);
  let userData: IParseUserToken;
  var [totalTk, setTotalTk] = useState<IBaoCaoDonVi | undefined>(undefined);
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
    setLoading(true)
    if (value.tuNgay && value.denNgay) {
      if (!value.maDinhDanh && !value.catalog && !value.maDinhDanhCha) {
        toast.warning("Vui lòng chọn đơn vị");
      } else {
        setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
        var res = await dispatch(
          BaoCaoDonViLinhVucAction({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            catalog: thongKeHoSoContext.searchBaoCaoThuTuc.catalog,
            maDinhDanh: value.maDinhDanh,
            maDinhDanhCha: value.maDinhDanhCha,
            laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
          })
        ).unwrap();
        if (res?.data && res?.data.length > 0) {
          const grouped = res.data.reduce((acc: any, item: any) => {
            const key = item?.maDonVi ?? undefined;
            if (key && !acc[key]) {
              acc[key] = {
                maDonVi: key,
                tenDonVi: item.tenDonVi,
                thanhPhan: [],
              };
            }
            if (key) acc[key].thanhPhan.push(item);
            return acc;
          }, {} as Record<string, IBaoCaoDonVi[]>);
          var total = res?.data.reduce((accumulator: any, currentValue: any): any => {
            return {
              tenThongKe: "Tổng số",
              maThongKe: "total",
              tongSo: accumulator.tongSo + currentValue.tongSo,
              tiepNhanKyTruoc: accumulator.tiepNhanKyTruoc + currentValue.tiepNhanKyTruoc,
              tiepNhanTrongKy: accumulator.tiepNhanTrongKy + currentValue.tiepNhanTrongKy,
              tiepNhanTrucTiep: accumulator.tiepNhanTrucTiep + currentValue.tiepNhanTrucTiep,
              tiepNhanQuaMang: accumulator.tiepNhanQuaMang + currentValue.tiepNhanQuaMang,
              tiepNhanQuaBCCI: accumulator.tiepNhanQuaBCCI + currentValue.tiepNhanQuaBCCI,
              daXuLyTruocHan: accumulator.daXuLyTruocHan + currentValue.daXuLyTruocHan,
              daXuLyDungHan: accumulator.daXuLyDungHan + currentValue.daXuLyDungHan,
              daXuLyQuaHan: accumulator.daXuLyQuaHan + currentValue.daXuLyQuaHan,
              dangXuLyTrongHan: accumulator.dangXuLyTrongHan + currentValue.dangXuLyTrongHan,
              dangXuLyQuaHan: accumulator.dangXuLyQuaHan + currentValue.dangXuLyQuaHan,
              tongBoSung: accumulator.tongBoSung + currentValue.tongBoSung,
              tongTraLai: accumulator.tongTraLai + currentValue.tongTraLai,
              tongTiepNhan: accumulator.tongTiepNhan + currentValue.tongTiepNhan,
              tongDaXuLy: accumulator.tongDaXuLy + currentValue.tongDaXuLy,
              tongDangXuLy: accumulator.tongDangXuLy + currentValue.tongDangXuLy,
              tiepNhanTrucTiepVaBCCI: accumulator.tiepNhanTrucTiepVaBCCI + currentValue.tiepNhanTrucTiepVaBCCI,
              daXuLyDungHanVaTraLai: accumulator.daXuLyDungHanVaTraLai + currentValue.daXuLyDungHanVaTraLai,
              dangXuLyTrongHanVaBoSung: accumulator.dangXuLyTrongHanVaBoSung + currentValue.dangXuLyTrongHanVaBoSung,
              daXuLyVaTraLai: accumulator.daXuLyVaTraLai + currentValue.daXuLyVaTraLai,
              dangXuLyVaBoSung: accumulator.dangXuLyVaBoSung + currentValue.dangXuLyVaBoSung,
              daXuLyDungHanVaTruocHan: accumulator.daXuLyDungHanVaTruocHan + currentValue.daXuLyDungHanVaTruocHan,
            }
          })
          total.maThongKe = 'total';
          total.tenThongKe = 'Tổng số'
          setTotalTk(total)
          setData(Object.values(grouped) ?? []);
        }
      }
    }
    setLoading(false)
  };

  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaLinhVucChinh: item.maThongKe,
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      MaDonVi: item.maDonVi,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      Catalog: thongKeHoSoContext.searchBaoCaoThuTuc.catalog,
      tieuChi: tieuChi,
      laDuLieuThongKeCacNam
    });
  };
  const getElementThongKe = (itemTk: any, indexTk: number) => {
    if (itemTk.thanhPhan && itemTk.thanhPhan.length > 0) {
      return <>
        <tr>
          <td
            style={{
              verticalAlign: "middle",
              textAlign: "left",
              padding: "5px",
              border: "1px solid #333",

              fontFamily: "Times New Roman, Times, serif;",
            }}
            colSpan={thongKeToanBo ? 15 : 13}
          >
            <strong>{itemTk.tenDonVi}</strong>
          </td>
        </tr>
        {

          itemTk.thanhPhan.map((item: any, index: number) => {
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
                  {index + 1}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    minWidth: "500px",
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
                  {!thongKeToanBo
                    ?
                    item.tiepNhanTrongKy ? (
                      <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanTrongKy")}>
                        {getCurrencyThongKe(item.tiepNhanTrongKy)}
                      </Link>
                    ) : (
                      "0"
                    )
                    :
                    item.tiepNhanTrucTiep ? (
                      <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanTrucTiep")}>
                        {getCurrencyThongKe(item.tiepNhanTrucTiep)}
                      </Link>
                    ) : (
                      "0"
                    )
                  }
                </td>
                {thongKeToanBo ? (
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                      fontFamily: "Times New Roman, Times, serif;",
                    }}
                  >
                    {item.tiepNhanQuaMang ? (
                      <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanQuaMang")}>
                        {getCurrencyThongKe(item.tiepNhanQuaMang)}
                      </Link>
                    ) : (
                      "0"
                    )}
                  </td>
                ) : null}
                {thongKeToanBo ? (
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                      fontFamily: "Times New Roman, Times, serif;",
                    }}
                  >
                    {item.tiepNhanQuaBCCI ? (
                      <Link to="" onClick={() => handleLoadHoSo(item, "tiepNhanQuaBCCI")}>
                        {getCurrencyThongKe(item.tiepNhanQuaBCCI)}
                      </Link>
                    ) : (
                      "0"
                    )}
                  </td>
                ) : null}



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
                  {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                    (item.daXuLyDungHan + item.daXuLyTruocHan + item.daXuLyQuaHan)
                    ? Math.round(
                      ((item.daXuLyDungHan + item.daXuLyTruocHan) /
                        (item.daXuLyDungHan +
                          item.daXuLyTruocHan +
                          item.daXuLyQuaHan)) *
                      100 *
                      100
                    ) /
                    100 +
                    "%"
                    : "0"}
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
          })
        }
      </>
    }

  };

  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        Tình hình, kết quả giải quyết TTHC theo lĩnh vực
      </div>

      <SearchBaoCaoTongHopLinhVuc
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
                    colSpan={thongKeToanBo ? 15 : 13}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      fontSize: "19px",
                    }}
                  >
                    <strong>
                      TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH THEO LĨNH
                      VỰC
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
                      width: "20%",
                    }}
                  >
                    <strong>Lĩnh vực</strong>
                  </td>
                  <td
                    colSpan={thongKeToanBo ? 5 : 3}
                    // colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Tiếp nhận</strong>
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
                    <strong>Đã xử lý</strong>
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
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
                      width: "7%",

                      textAlign: 'center'
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
                      width: "7%",

                      textAlign: 'center'
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
                      width: "7%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Tổng số</strong>
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
                    <strong>Kỳ trước</strong>
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
                    <strong>Trong kỳ</strong>
                  </td>
                  {thongKeToanBo ? (
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                        textAlign: 'center'
                      }}
                    >
                      <strong>Qua mạng</strong>
                    </td>)

                    : null}
                  {thongKeToanBo ? (
                    <td
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                        textAlign: 'center'
                      }}
                    >
                      <strong>Qua BCCI</strong>
                    </td>
                  ) : null}


                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "7%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Trước hạn</strong>
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
                    <strong>Đúng hạn</strong>
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
                    <strong>Quá hạn</strong>
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
                    <strong>Tỷ lệ trước hạn, đúng hạn</strong>
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
                    <strong>Trong hạn</strong>
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
                    <strong>Quá hạn</strong>
                  </td>
                </tr>
              </thead>
              <tbody id="data">
                {data && data.length > 0
                  ? data.map((item, index) => getElementThongKe(item, index + 1))
                  : null}
              </tbody>
              {totalTk ? <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",

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

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600,
                    minWidth: "350px",
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

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.tongSo)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.tiepNhanKyTruoc)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {!thongKeToanBo
                    ?
                    getCurrencyThongKe(totalTk.tiepNhanTrongKy)
                    :
                    getCurrencyThongKe(totalTk.tiepNhanTrucTiep)
                  }
                </td>
                {thongKeToanBo ? (
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                      fontFamily: "Times New Roman, Times, serif;",
                      fontWeight: 600
                    }}
                  >
                    {getCurrencyThongKe(totalTk.tiepNhanQuaMang)}
                  </td>
                ) : null}
                {thongKeToanBo ? (
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",
                      fontFamily: "Times New Roman, Times, serif;",
                      fontWeight: 600
                    }}
                  >
                    {totalTk.tiepNhanQuaBCCI}
                  </td>
                ) : null}



                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.daXuLyTruocHan)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.daXuLyDungHan)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.daXuLyQuaHan)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",

                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {totalTk.daXuLyDungHan + totalTk.daXuLyTruocHan /
                    (totalTk.daXuLyDungHan + totalTk.daXuLyTruocHan + totalTk.daXuLyQuaHan)
                    ? Math.round(
                      ((totalTk.daXuLyDungHan + totalTk.daXuLyTruocHan) /
                        (totalTk.daXuLyDungHan +
                          totalTk.daXuLyTruocHan +
                          totalTk.daXuLyQuaHan)) *
                      100 *
                      100
                    ) /
                    100 +
                    "%"
                    : "0"}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.dangXuLyTrongHan)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.dangXuLyQuaHan)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.tongBoSung)}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                    fontWeight: 600
                  }}
                >
                  {getCurrencyThongKe(totalTk.tongTraLai)}
                </td>
              </tr> : null}
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopDonViWrapper />
      ) : null}
      <XuatBaoCaoDonViLinhVucModal data={data} thongKeToanBo={thongKeToanBo}
        totalTk={totalTk}
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
function BaoCaoDonViLinhVucSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoDonViLinhVuc />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoDonViLinhVucSwapper;
