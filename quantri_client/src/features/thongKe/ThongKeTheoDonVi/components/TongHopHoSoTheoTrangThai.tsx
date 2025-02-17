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
import { BaoCaoTheoTrangThaiHoSoAction, BaoCaoTongHopDonViAction } from "@/features/baocaotonghop/redux/action";
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
import { TongHopHoSoTheoTrangThaiResponse } from "../models/TongHopHoSoTheoTrangThaiResponse";
import { XuatTiepNhanHoSoTheoDonViModal } from "./exportElements/XuatTiepNhanHoSoTheoDonVi";
import { XuatBaoCaoHoSoLLTPVNeID } from "./exportElements/XuatBaoCaoHoSoLLTPVNeId";


const TongHopHoSoTheoTrangThai = () => {
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

  ];
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<TongHopHoSoTheoTrangThaiResponse[]>([]);
  var [totalTk, setTotalTk] = useState<TongHopHoSoTheoTrangThaiResponse>({
    moiDangKy: 0,
    duocTiepNhan: 0,
    tuChoiTiepNhan: 0,
    dangXuLy: 0,
    boSungHoSo: 0,
    daXuLyXong: 0,
    daTraKetQua: 0,
    tongTheoLoaiDuLieuKetNoi: 0,
    tongSo: 0
  })
  useEffect(() => {
    thongKeHoSoContext.setSearchBaoCaoDonVi({
      ...thongKeHoSoContext.searchBaoCaoThuTuc,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {

    if (value.tuNgay && value.denNgay) {
      var res = await dispatch(
        BaoCaoTheoTrangThaiHoSoAction({
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
          loaiDuLieuKetNois: ["LLTPVneid", "LLTPVneiduyquyen"]
        })
      ).unwrap();
      if (res?.data && res?.data.length >= 0) {
        var tmpThongKe = res?.data.reduce((acc: TongHopHoSoTheoTrangThaiResponse, cur: TongHopHoSoTheoTrangThaiResponse) => {
          return {
            tenThongKe: "Tổng số",
            moiDangKy: acc?.moiDangKy + cur?.moiDangKy,
            duocTiepNhan: acc?.duocTiepNhan + cur?.duocTiepNhan,
            tuChoiTiepNhan: acc?.tuChoiTiepNhan + cur?.tuChoiTiepNhan,
            dangXuLy: acc?.dangXuLy + cur?.dangXuLy,
            boSungHoSo: acc?.boSungHoSo + cur?.boSungHoSo,
            daXuLyXong: acc?.daXuLyXong + cur?.daXuLyXong,
            daTraKetQua: acc?.daTraKetQua + cur?.daTraKetQua,
            tongTheoLoaiDuLieuKetNoi: acc?.tongTheoLoaiDuLieuKetNoi + cur?.tongTheoLoaiDuLieuKetNoi,
            tongSo: acc?.tongSo + cur?.tongSo

          }
        })
        setTotalTk(tmpThongKe)
      }
      setData(res?.data ?? []);
    }
  };

  const handleLoadHoSo = (item: any, tieuChi?: string[]) => {
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
      trangThaiHoSoIds: tieuChi,
      loaiDuLieuKetNois: ["LLTPVneid", "LLTPVneiduyquyen"]
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
          {item.moiDangKy ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["1"])}>
              {getCurrencyThongKe(item.moiDangKy)}
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
          {item.duocTiepNhan ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["2"])}>
              {getCurrencyThongKe(item.duocTiepNhan)}
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
          {item.tuChoiTiepNhan ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["3"])}>
              {getCurrencyThongKe(item.tuChoiTiepNhan)}
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
          {item.dangXuLy ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["4"])}>
              {getCurrencyThongKe(item.dangXuLy)}
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
          {item.boSungHoSo ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["5", "6"])}>
              {getCurrencyThongKe(item.boSungHoSo)}
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
          {item.daXuLyXong ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["9"])}>
              {getCurrencyThongKe(item.daXuLyXong)}
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
          {item.daTraKetQua ? (
            <Link to="" onClick={() => handleLoadHoSo(item, ["10"])}>
              {getCurrencyThongKe(item.daTraKetQua)}
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
          {item.tongSo ? (
            `${getCurrencyThongKe(item.tongTheoLoaiDuLieuKetNoi)} / ${getCurrencyThongKe(item.tongSo)}`
          ) : (
            "0"
          )}
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
                    colSpan={10}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      fontSize: "19px",
                      textAlign: 'center'
                    }}
                  >
                    <strong>
                      TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC CẤP PHIẾU LLTP QUA VNEID
                    </strong>
                    <br />
                  </td>
                </tr>
                <tr>
                  <td
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
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "20%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Đơn vị</strong>
                  </td>
                  <td

                    // colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "7%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Mới đăng ký</strong>
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
                    <strong>Được tiếp nhận</strong>
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
                    <strong>Không được tiếp nhận</strong>
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
                    <strong>Đang xử lý</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',
                      width: "7%",
                    }}
                  >
                    <strong>Bổ sung giấy tờ</strong>
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
                    <strong>Đã xử lý xong</strong>
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
                    <strong>Đã trả kết quả</strong>
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
                    <strong>Hồ sơ VNeID/ tổng hồ sơ</strong>
                  </td>
                </tr>

              </thead>
              <tbody id="data">
                {data && data.length > 0
                  ? data.map((item: any, index: number) =>
                    getElementThongKe(item, index + 1)
                  )
                  : null}
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",


                    }}
                  >

                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "left",
                      padding: "5px",
                      border: "1px solid #333",
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
                    }}
                  >
                    {totalTk.moiDangKy ? (

                      getCurrencyThongKe(totalTk.moiDangKy)

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
                    {totalTk.duocTiepNhan ? (
                      getCurrencyThongKe(totalTk.duocTiepNhan)
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
                    {totalTk.tuChoiTiepNhan ? (
                      getCurrencyThongKe(totalTk.tuChoiTiepNhan)
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
                    {totalTk.dangXuLy ? (
                      getCurrencyThongKe(totalTk.dangXuLy)
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
                    {totalTk.boSungHoSo ? (
                      getCurrencyThongKe(totalTk.boSungHoSo)
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
                    {totalTk.daXuLyXong ? (
                      getCurrencyThongKe(totalTk.daXuLyXong)
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
                    {totalTk.daTraKetQua ? (
                      getCurrencyThongKe(totalTk.daTraKetQua)
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
                    {totalTk.tongSo ? (
                      `${getCurrencyThongKe(totalTk.tongTheoLoaiDuLieuKetNoi)} / ${getCurrencyThongKe(totalTk.tongSo)}`
                    ) : (
                      "0"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopDonViWrapper />
      ) : null}
      <XuatBaoCaoHoSoLLTPVNeID data={data}
        totalTk={totalTk}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}

        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].groupName : undefined}
      />
    </div>
  );
};
function TongHopHoSoTheoTrangThaiSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <TongHopHoSoTheoTrangThai />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default TongHopHoSoTheoTrangThaiSwapper;
