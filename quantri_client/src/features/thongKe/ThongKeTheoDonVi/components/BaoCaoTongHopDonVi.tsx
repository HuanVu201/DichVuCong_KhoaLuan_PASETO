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
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../context/BaoCaoTongHopContext";
import {
  IBaoCaoDonVi,
  ISearchBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { BaoCaoTongHopDonViAction } from "@/features/baocaotonghop/redux/action";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import { XuatBaoCaoTongHopDonViModal } from "./exportElements/XuatBaoCaoTongHopDonVi";
import { SearchBaoCaoTongHopDonVi } from "./SearchBaoCaoTongHopDonVi";
import { toast } from "react-toastify";
import { XuatBaoCaoHoSoQuaHanTable } from "../../thongKeQD766/components/exportElements/XuatBaoCaoHoSoQuaHan";
import { SearchHoSoQuaHanAction } from "@/features/hoso/redux/action";
import { IHoSoTheoTrangThaiXuLy } from "@/features/hoso/models/searchHoSoTheoTrangThaiXuLy";
import { XuatBaoCaoHoSoDangXuLyQuaHanTable } from "../../thongKeQD766/components/exportElements/XuatBaoCaoHoSoDangXuLyQuaHan";
import HoSoTheoBaoCaoTongHopDonViWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopDonVi";
import HoSoTheoBaoCaoTongHopDonVi2Wrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopDonVi2";


const BaoCaoTongHopDonVi = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp đơn vị", "ContainerSwapper1")}
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
            handleLoadHoSoQuaHan()
          }
        >
          <FileWordOutlined style={{ color: "#36a3f7" }} /> In danh sách đã xử lý quá hạn
        </button >
      ),
      key: "Word",
    },
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() =>
            handleLoadHoSoDangXuLyQuaHan()
          }
        >
          <FileWordOutlined style={{ color: "#36a3f7" }} /> In danh sách đang xử lý quá hạn
        </button >
      ),
      key: "Word",
    },
  ];
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const [thongKeHoSoDangXuLyQuaHan, setThongKeHoSoDangXuL] = useState<boolean>(false);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  var [dataHoSoQuaHan, setDataHoSoQuaHan] = useState<IHoSoTheoTrangThaiXuLy[]>([]);
  var [dataHoSoDangXuLyQuaHan, setDataHoSoDangXuLyQuaHan] = useState<IHoSoTheoTrangThaiXuLy[]>([]);
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
      setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)

      var res = await dispatch(
        BaoCaoTongHopDonViAction({
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          maDinhDanhCha: value.maDinhDanhCha,
          maDinhDanh: value.maDinhDanh,
          catalog: value.catalog,
          chiBaoGomDonViCon: value.chiBaoGomDonViCon,
          kenhThucHien: value.kenhThucHien,
          mucDo: value.mucDo,
          loaiDoiTuong: value.loaiDoiTuong,
          cache: false,
          laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
        })
      ).unwrap();
      setData(res?.data ?? []);
    }
  };
  const handleLoadHoSoQuaHan = async () => {
    var res = await dispatch(SearchHoSoQuaHanAction({
      TrangThaiXuLy: "daxulyquahan",
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      maDinhDanhCha: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha,
      maDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      catalog: thongKeHoSoContext.searchBaoCaoThuTuc.catalog,
      chiBaoGomDonViCon: thongKeHoSoContext.searchBaoCaoThuTuc.chiBaoGomDonViCon,
    })).unwrap();
    if (res.data && res.data.length > 0) {
      setDataHoSoQuaHan(res.data);
    } else {
      setDataHoSoQuaHan([])
      toast.warning("Không có dữ liệu hồ sơ quá hạn")
    }
  }
  const handleLoadHoSoDangXuLyQuaHan = async () => {
    var res = await dispatch(SearchHoSoQuaHanAction({
      TrangThaiXuLy: "dangxulyquahan",
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      maDinhDanhCha: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha,
      maDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      catalog: thongKeHoSoContext.searchBaoCaoThuTuc.catalog,
      chiBaoGomDonViCon: thongKeHoSoContext.searchBaoCaoThuTuc.chiBaoGomDonViCon,
    })).unwrap();
    if (res.data && res.data.length > 0) {
      setDataHoSoDangXuLyQuaHan(res.data);
    } else {
      setDataHoSoDangXuLyQuaHan([])
      toast.warning("Không có dữ liệu hồ sơ quá hạn")
    }
  }
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
      laDuLieuThongKeCacNam: laDuLieuThongKeCacNam
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


  const countSumary = () => {
    let tongTiepNhan: number = 0
    let tiepNhanKyTruoc: number = 0
    let tiepNhanTrongKy: number = 0
    let tiepNhanTrucTiep: number = 0
    let tiepNhanQuaMang: number = 0
    let tiepNhanQuaBCCI: number = 0
    let daXuLyTruocHan: number = 0
    let daXuLyDungHan: number = 0
    let daXuLyQuaHan: number = 0
    let dangXuLyTrongHan: number = 0
    let dangXuLyQuaHan: number = 0
    let boSung: number = 0
    let rutTraLai: number = 0

    data.forEach(item => {
      tongTiepNhan += item.tongSo
      tiepNhanKyTruoc += item.tiepNhanKyTruoc
      tiepNhanTrongKy += item.tiepNhanTrongKy
      tiepNhanTrucTiep += item.tiepNhanTrucTiep
      tiepNhanQuaMang += item.tiepNhanQuaMang
      tiepNhanQuaBCCI += item.tiepNhanQuaBCCI
      daXuLyTruocHan += item.daXuLyTruocHan
      daXuLyDungHan += item.daXuLyDungHan
      daXuLyQuaHan += item.daXuLyQuaHan
      dangXuLyTrongHan += item.dangXuLyTrongHan
      dangXuLyQuaHan += item.dangXuLyQuaHan
      boSung += item.tongBoSung
      rutTraLai += item.tongTraLai
    })


    return (
      <tr>
        <td colSpan={2} style={{
          verticalAlign: "middle", textAlign: "center", padding: "5px",
          border: "1px solid #333", minWidth: "500px", fontWeight: 600
        }}
        >
          TỔNG SỐ
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(tongTiepNhan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(tiepNhanKyTruoc)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {!thongKeToanBo
            ?
            getCurrencyThongKe(tiepNhanTrongKy)
            :
            getCurrencyThongKe(tiepNhanTrucTiep)
          }
        </td>
        {thongKeToanBo ? (
          <td
            style={{
              verticalAlign: "middle", textAlign: "right", padding: "5px",
              border: "1px solid #333", fontWeight: 600
            }}
          >
            {getCurrencyThongKe(tiepNhanQuaMang)}
          </td>
        ) : null}
        {thongKeToanBo ? (
          <td
            style={{
              verticalAlign: "middle", textAlign: "right", padding: "5px",
              border: "1px solid #333", fontWeight: 600
            }}
          >
            {getCurrencyThongKe(tiepNhanQuaBCCI)}
          </td>
        ) : null}
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(daXuLyTruocHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(daXuLyDungHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(daXuLyQuaHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {(daXuLyDungHan + daXuLyTruocHan) /
            (daXuLyDungHan + daXuLyTruocHan + daXuLyQuaHan)
            ? Math.round(
              ((daXuLyDungHan + daXuLyTruocHan) /
                (daXuLyDungHan +
                  daXuLyTruocHan +
                  daXuLyQuaHan)) *
              100 *
              100
            ) /
            100 +
            "%"
            : "0"}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(dangXuLyTrongHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(dangXuLyQuaHan)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(boSung)}
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontWeight: 600
          }}
        >
          {getCurrencyThongKe(rutTraLai)}
        </td>
      </tr>
    );
  };

  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Báo cáo tổng hợp đơn vị</div>
      <SearchBaoCaoTongHopDonVi
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
        setThongKeToanBo={setThongKeToanBo}
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
                      textAlign: 'center'
                    }}
                  >
                    <strong>
                      TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT TTHC TẠI CƠ QUAN, ĐƠN VỊ TRỰC
                      TIẾP GIẢI QUYẾT TTHC
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
                      width: "1%",
                      textAlign: 'center'
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
                      width: "15%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Đơn vị</strong>
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
                      textAlign: 'center',
                      width: "7%",
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
                  ? data.map((item: any, index: number) =>
                    getElementThongKe(item, index + 1)
                  )
                  : null}
                {
                  countSumary()
                }
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopDonVi2Wrapper />
      ) : null}
      <XuatBaoCaoTongHopDonViModal data={data} thongKeToanBo={thongKeToanBo}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
        catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
          : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].catalog : undefined
        }
        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].groupName : undefined}
      />
      {
        dataHoSoQuaHan && dataHoSoQuaHan.length > 0 ?
          <XuatBaoCaoHoSoQuaHanTable
            hoSos={dataHoSoQuaHan}
            tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
            denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
            groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].groupName : undefined} />
          : null

      }
      {
        dataHoSoDangXuLyQuaHan && dataHoSoDangXuLyQuaHan.length > 0 ?
          <XuatBaoCaoHoSoDangXuLyQuaHanTable
            hoSos={dataHoSoDangXuLyQuaHan}
            tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
            denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
            groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].groupName : undefined} />
          : null
      }
    </div>
  );
};
function BaoCaoTongHopDonViSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHopDonVi />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHopDonViSwapper;
