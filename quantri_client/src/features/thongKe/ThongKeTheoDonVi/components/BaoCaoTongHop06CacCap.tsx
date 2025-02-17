import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
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
  MenuProps,
} from "antd";

import "../../ThongKe.scss";
// import "../../../../features/thongKe/thongKeQD766/components/ThongKe.scss"

import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../context/BaoCaoTongHopContext";
import {
  IBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { BaoCaoTongHop06aCacCapAction } from "@/features/baocaotonghop/redux/action";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { Link } from "react-router-dom";
import { getCurrencyThongKe } from "@/utils";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { SearchBaoCaoTongHop06CacCap } from "./SearchBaoCaoTongHop06CacCap";
import { XuatBaoCaoTongHop06CacCapModal } from "./exportElements/XuatBaoCaoTongHop06CacCap";
const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp 06 các cấp", "ContainerSwapper1")}
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
            "Thống kê báo cáo tổng hợp 06",
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
const BaoCaoTongHop06aCacCap = () => {
  var ngayHienTai = new Date();
  var Template = (index: number, name: string) => {
    return (
      <tr>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "left",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "17px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
          colSpan={13}
        >
          <strong>{name}</strong>
        </td>
      </tr>
    );
  };
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  var [tenDonViThongKe, setTenDonViThongKe] = useState<string>("");
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {

    if (value.tuNgay && value.denNgay) {
      var res = await dispatch(
        BaoCaoTongHop06aCacCapAction({
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          maDinhDanh: value.maDinhDanh,
          maDinhDanhCha: value.maDinhDanhCha,
          chiBaoGomDonViCon: value.chiBaoGomDonViCon,
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
      // MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      MaDinhDanhCha: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
      Catalog: item.catalog
    });
  };
  const [dataCapSo, dataCapHuyen, dataCapXa] = useMemo(() => {
    if (data && data.length > 0) {
      var tinh = data.filter(
        (x) => x.catalog == "so-ban-nganh" || x.catalog == "cnvpdk"
      );

      var huyen = data.filter((x) => x.catalog == "quan-huyen");
      var xa = data.filter((x) => x.catalog == "xa-phuong");
      return [tinh, huyen, xa];
    }
    return [[], [], []];
  }, [data]);


  // const getElementThongKe = (item: any, index: number) => {
  //   return (
  //     <tr>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "center",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {index}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "left",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //           minWidth: "250px",
  //         }}
  //       >
  //         {item.tenThongKe}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.tongSo ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "")}>
  //             {getCurrencyThongKe(item.tongSo)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.tiepNhanQuaMang ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanQuaMang")}>
  //             {getCurrencyThongKe(item.tiepNhanQuaMang)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.tiepNhanTrucTiepVaBCCI ? (
  //           <Link
  //             to=""
  //             onClick={() => handleLoadHoSo(item, "TiepNhanTrucTiepVaBCCI")}
  //           >
  //             {getCurrencyThongKe(item.tiepNhanTrucTiepVaBCCI)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.tiepNhanKyTruoc ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanKyTruoc")}>
  //             {getCurrencyThongKe(item.tiepNhanKyTruoc)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.daXuLyVaTraLai ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyVaTraLai")}>
  //             {getCurrencyThongKe(item.daXuLyVaTraLai)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.daXuLyTruocHan ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyTruocHan")}>
  //             {getCurrencyThongKe(item.daXuLyTruocHan)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.daXuLyDungHanVaTraLai ? (
  //           <Link
  //             to=""
  //             onClick={() => handleLoadHoSo(item, "DaXuLyDungHanVaTraLai")}
  //           >
  //             {getCurrencyThongKe(item.daXuLyDungHanVaTraLai)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.daXuLyQuaHan ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyQuaHan")}>
  //             {getCurrencyThongKe(item.daXuLyQuaHan)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.dangXuLyVaBoSung ? (
  //           <Link
  //             to=""
  //             onClick={() => handleLoadHoSo(item, "DangXuLyVaBoSung")}
  //           >
  //             {getCurrencyThongKe(item.dangXuLyVaBoSung)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.dangXuLyTrongHanVaBoSung ? (
  //           <Link
  //             to=""
  //             onClick={() => handleLoadHoSo(item, "DangXuLyTrongHanVaBoSung")}
  //           >
  //             {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //       <td
  //         style={{
  //           verticalAlign: "middle",
  //           textAlign: "right",
  //           padding: "5px",
  //           border: "1px solid #333",

  //           fontFamily: "Times New Roman, Times, serif;",
  //         }}
  //       >
  //         {item.dangXuLyQuaHan ? (
  //           <Link to="" onClick={() => handleLoadHoSo(item, "DangXuLyQuaHan")}>
  //             {getCurrencyThongKe(item.dangXuLyQuaHan)}
  //           </Link>
  //         ) : (
  //           "0"
  //         )}
  //       </td>
  //     </tr>
  //   );
  // };
  const getElementThongKe = (item: any, index: number) => {
    return <tr>
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
        {item.tongSo ? getCurrencyThongKe(item.tongSo) : "0"}
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
        {item.tiepNhanQuaMang
          ? getCurrencyThongKe(item.tiepNhanQuaMang)
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
        {item.tiepNhanTrucTiepVaBCCI
          ? getCurrencyThongKe(item.tiepNhanTrucTiepVaBCCI)
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
        {item.tiepNhanKyTruoc
          ? getCurrencyThongKe(item.tiepNhanKyTruoc)
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
        {item.daXuLyVaTraLai
          ? getCurrencyThongKe(item.daXuLyVaTraLai)
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
        {item.daXuLyTruocHan
          ? getCurrencyThongKe(item.daXuLyTruocHan)
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
        {item.daXuLyDungHanVaTraLai
          ? getCurrencyThongKe(item.daXuLyDungHanVaTraLai)
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
        {item.daXuLyQuaHan ? getCurrencyThongKe(item.daXuLyQuaHan) : "0"}
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
        {item.dangXuLyVaBoSung
          ? getCurrencyThongKe(item.dangXuLyVaBoSung)
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
        {item.dangXuLyTrongHanVaBoSung
          ? getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)
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
        {item.dangXuLyQuaHan
          ? getCurrencyThongKe(item.dangXuLyQuaHan)
          : "0"}
      </td>
    </tr>
  }
  useEffect(() => {
    if (coCauToChucs && coCauToChucs.length > 0 && (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh || thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)) {
      if (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh) {
        var tmpGroups = coCauToChucs.find(item => item.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)
        setTenDonViThongKe(tmpGroups?.groupName ?? "")
      }
      if (thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha) {
        var tmpGroups = coCauToChucs.find(item => item.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)
        setTenDonViThongKe(tmpGroups?.groupName ?? "")
      }
    }
  }, [coCauToChucs, thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh, thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha])

  return (
    <>
      <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
          TỔNG HỢP TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH CỦA CÁC ĐƠN VỊ
        </div>
        <SearchBaoCaoTongHop06CacCap
          setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
          resetSearchParams={() => { }}
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
                className="scrollTable"
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
                      }}
                    >
                      <strong>
                        TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT TTHC TẠI CƠ QUAN, ĐƠN VỊ
                        TRỰC TIẾP GIẢI QUYẾT TTHC
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
                        minWidth: "10%",
                        width: "10%",
                      }}
                    >
                      <strong>Lĩnh vực giải quyết</strong>
                    </td>
                    <td
                      colSpan={4}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "20%",
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
                        width: "30%",
                      }}
                    >
                      <strong>Đã xử lý</strong>
                    </td>
                    <td
                      colSpan={3}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "30%",
                      }}
                    >
                      <strong>Đang xử lý</strong>
                    </td>
                  </tr>
                  <tr>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
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
                        width: "7%",
                      }}
                    >
                      <strong>Trong kỳ</strong>
                    </td>

                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Kỳ trước</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Tổng số</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Trước hạn</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Đúng hạn (Bao gồm cả hồ sơ trả lại/xin rút)</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Quá hạn</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Tổng số</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Đúng hạn (Bao gồm cả hồ sơ chờ BS)</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Quá hạn</strong>
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Trực tuyến</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "7%",
                      }}
                    >
                      <strong>Trực tiếp, dịch vụ bưu chính</strong>
                    </td>
                  </tr>
                </thead>
                <tbody id="data">
                  {dataCapSo && dataCapSo.length > 0 ? (
                    <>
                      {Template(0, "Sở ban ngành")}
                      {dataCapSo.map((item, index) =>
                        getElementThongKe(item, index + 1)
                      )}
                    </>
                  ) : null}
                  {dataCapHuyen && dataCapHuyen.length > 0 ? (
                    <>
                      {Template(0, "Huyện, thị xã, thành phố")}
                      {dataCapHuyen.map((item, index) =>
                        getElementThongKe(item, index + 1)
                      )}
                    </>
                  ) : null}
                  {dataCapXa && dataCapXa.length > 0 ? (
                    <>
                      {Template(0, "Xã, phường, thị trấn")}
                      {dataCapXa.map((item, index) =>
                        getElementThongKe(item, index + 1)
                      )}
                    </>
                  ) : null}
                  <CountDataThongKe06CacCap data={data} />
                </tbody>
              </table>
            </div>
          </Spin>
        </div>
        {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
          <HoSoTheoBaoCaoTongHopWrapper />
        ) : null}
        <XuatBaoCaoTongHop06CacCapModal data={data}
          tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
          denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
          tenDonVi={tenDonViThongKe}
        />
      </div>
    </>
  );
};
function BaoCaoTongHop06aCacCapSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHop06aCacCap />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHop06aCacCapSwapper;


export const CountDataThongKe06CacCap = ({
  data,
}: {
  data: IBaoCaoDonVi[] | undefined;
}) => {
  const [tongSoTotal, tiepNhanQuaMangTotal, tiepNhanTrucTiepVaBCCITotal, tiepNhanKyTruocTotal,
    daXuLyVaTraLaiTotal, daXuLyTruocHanTotal, daXuLyDungHanVaTraLaiTotal, daXuLyQuaHanTotal,
    dangXuLyVaBoSungTotal, dangXuLyTrongHanVaBoSungTotal, dangXuLyQuaHanTotal
  ] = useMemo(() => {

    let tongSoTotal = 0, tiepNhanQuaMangTotal = 0, tiepNhanTrucTiepVaBCCITotal = 0, tiepNhanKyTruocTotal = 0,
      daXuLyVaTraLaiTotal = 0, daXuLyTruocHanTotal = 0, daXuLyDungHanVaTraLaiTotal = 0, daXuLyQuaHanTotal = 0,
      dangXuLyVaBoSungTotal = 0, dangXuLyTrongHanVaBoSungTotal = 0, dangXuLyQuaHanTotal = 0

    data?.forEach((item: IBaoCaoDonVi) => {
      tongSoTotal += item.tongSo
      tiepNhanQuaMangTotal += item.tiepNhanQuaMang
      tiepNhanTrucTiepVaBCCITotal += item.tiepNhanTrucTiepVaBCCI
      tiepNhanKyTruocTotal += item.tiepNhanKyTruoc
      daXuLyVaTraLaiTotal += item.daXuLyVaTraLai
      daXuLyTruocHanTotal += item.daXuLyTruocHan
      daXuLyDungHanVaTraLaiTotal += item.daXuLyDungHanVaTraLai
      daXuLyQuaHanTotal += item.daXuLyQuaHan
      dangXuLyVaBoSungTotal += item.dangXuLyVaBoSung
      dangXuLyTrongHanVaBoSungTotal += item.dangXuLyTrongHanVaBoSung
      dangXuLyQuaHanTotal += item.dangXuLyQuaHan
    })



    return [tongSoTotal, tiepNhanQuaMangTotal, tiepNhanTrucTiepVaBCCITotal, tiepNhanKyTruocTotal,
      daXuLyVaTraLaiTotal, daXuLyTruocHanTotal, daXuLyDungHanVaTraLaiTotal, daXuLyQuaHanTotal,
      dangXuLyVaBoSungTotal, dangXuLyTrongHanVaBoSungTotal, dangXuLyQuaHanTotal];
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
        {getCurrencyThongKe(tiepNhanQuaMangTotal)}
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
        {getCurrencyThongKe(tiepNhanTrucTiepVaBCCITotal)}
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
        {getCurrencyThongKe(daXuLyVaTraLaiTotal)}
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
        {getCurrencyThongKe(daXuLyTruocHanTotal)}
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
        {getCurrencyThongKe(daXuLyDungHanVaTraLaiTotal)}
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
        {getCurrencyThongKe(dangXuLyVaBoSungTotal)}
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
        {getCurrencyThongKe(dangXuLyTrongHanVaBoSungTotal)}
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
    </tr>
  )
}