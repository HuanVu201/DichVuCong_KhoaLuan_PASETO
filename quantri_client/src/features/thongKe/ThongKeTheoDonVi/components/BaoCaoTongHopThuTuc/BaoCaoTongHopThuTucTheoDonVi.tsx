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
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../../context/BaoCaoTongHopContext";
import {
  IBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { BaoCaoTongHopThuTucAction, BaoCaoTongHopThuTucTheoDonViAction } from "@/features/baocaotonghop/redux/action";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";

import { SearchBaoCaoTheoThuTucTheoDonVi } from "./SearchBaoCaoTheoThuTucTheoDonVi";
import { XuatBaoCaoTongHopThuTucTheoDonViModal } from "../exportElements/XuatBaoCaoTongHopThuTucTheoDonVi";
import { XuatBaoCaoHoSoDongBoDVCQGTheoThuTucModal } from "../exportElements/XuatBaoCaoHoSoDongBoDVCQGTheoThuTuc";

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
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          export2Word(
            "Số lượng hồ sơ đồng bộ DVCQG",
            true,
            "ContainerSwapper2"
          )
        }
      >
        <FileWordOutlined style={{ color: "#36a3f7" }} /> Số lượng hồ sơ đồng bộ DVCQG
      </button>
    ),
    key: "Word",
  },
];

const BaoCaoTongHopThuTuc2 = () => {
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
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  var [totalTk, setTotalTk] = useState<IBaoCaoDonVi | undefined>(undefined);
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
      if (!value.maDinhDanh && !value.catalog) {
        toast.warning("Vui lòng chọn đơn vị");
      } else {
        setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
        var res = await dispatch(
          BaoCaoTongHopThuTucTheoDonViAction({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            maDinhDanh: value.maDinhDanh,
            maDinhDanhCha: value.maDinhDanhCha,
            catalog: value.catalog,
            coPhatSinhHoSo: value.coPhatSinhHoSo,
            maTTHC: value.maTTHC,
            suDung: value.suDung,
            laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
          })
        ).unwrap();
        if (res.data) {
          // var dataTk: IBaoCaoDonVi[] = [];
          // res.data.map(item => {
          //   var check = false;
          //   if (dataTk.length > 0) {
          //     dataTk.map(itemTK => {
          //       if (itemTK.maDonVi == item.maDonVi)
          //     })
          //   }
          // })

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
          setData(Object.values(grouped) ?? []);

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
          setTotalTk(total)

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
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
      laDuLieuThongKeCacNam
    });
  };
  const getElementThongKe = (i: any, id: number) => {

    if (i.thanhPhan && i.thanhPhan.length > 0) {

      const grouped = i.thanhPhan.reduce((acc: any, item: any) => {
        const key = item?.maLinhVucChinh ?? undefined;
        if (key && !acc[key]) {
          acc[key] = {
            maLinhVucChinh: key,
            linhVucChinh: item.linhVucChinh,
            thanhPhan: [],
          };
        }
        if (key) acc[key].thanhPhan.push(item);
        return acc;
      }, {} as Record<string, IBaoCaoDonVi[]>);
      var thanhPhan = Object.values(grouped)



      return (
        <>
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif;",
              }}

            >
              {id}
            </td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif;",
              }}
              colSpan={thongKeToanBo ? 16 : 14}
            >
              {i.tenDonVi}
            </td>
          </tr>
          {thanhPhan ? thanhPhan.map((itemTp: any, indexTp: number) => {

            return <>
              <tr>
                <td
                  rowSpan={itemTp.thanhPhan.length + 1}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",
                  }}
                >
                  {indexTp + 1}
                </td>
                <td
                  rowSpan={itemTp.thanhPhan.length + 1}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",

                    fontFamily: "Times New Roman, Times, serif;",

                  }}
                >
                  {itemTp.linhVucChinh}
                </td>
              </tr>
              {
                itemTp.thanhPhan && itemTp.thanhPhan.length > 0 ? itemTp.thanhPhan.map((item: any, index: number) => {
                  return <tr>
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
                      {item.mucDo}
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
                    {
                      thongKeToanBo ? (
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
                      ) : null
                    }
                    {
                      thongKeToanBo ? (
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
                      ) : null
                    }



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
                  </tr >
                }) : null
              }

            </>
          }) : null
          }

        </>
      );
    }
  };

  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Tình hình tiếp nhận và giải quyết TTHC theo thủ tục</div>
      <SearchBaoCaoTheoThuTucTheoDonVi
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
                    colSpan={thongKeToanBo ? 16 : 15}
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
                    <strong>Lĩnh vực</strong>
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
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Mức độ</strong>
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
                    colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
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
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopWrapper />
      ) : null}
      <XuatBaoCaoTongHopThuTucTheoDonViModal data={data} thongKeToanBo={thongKeToanBo}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
        catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
          : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].catalog : undefined
        }
        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].groupName : undefined}
        totalTk={totalTk}
      />
      <XuatBaoCaoHoSoDongBoDVCQGTheoThuTucModal data={data} thongKeToanBo={thongKeToanBo}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
        catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
          : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].catalog : undefined
        }
        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].groupName : undefined}
        totalTk={totalTk}
      />
    </div>
  );
};
function BaoCaoTongHopThuTucSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHopThuTuc2 />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHopThuTucSwapper;


