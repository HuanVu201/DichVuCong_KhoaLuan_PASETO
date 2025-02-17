import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThanhToanTrucTuyenParams } from "../models/ThongKeQD766Search";
import {
  SearchDonDocThanhToanTrucTuyen,
  SearchThanhToanTrucTuyen,
} from "../redux/action";
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
import { getCurrency, getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext";

import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { SearchThongKeTheoKhungTg } from "./SearchThongKeTheoKhungTg";
import { IThongKeQD766DonDocTTTTElement } from "../models/ThongKe766Response";
import {
  YeuCauThanhToanProvider,
  useYeuCauThanhToanContext,
} from "@/features/yeucauthanhtoan/contexts/useYeuCauThanhToansContext";
import { TRANGTHAITHANHTOAN } from "@/features/hoso/data/formData";
import { TRANGTHAITHUPHI } from "@/features/hoso/models";
import DanhSachYeuCauThanhToansTheoBaoCaoWrapper from "./DanhSachYeuCauThanhToansTheoBaoCao";
import { XuatDonDocThanhToanTrucTuyenTable } from "./exportElements/XuatDonDocThanhToanTrucTuyen";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê thanh toán trực tuyến", "ContainerSwapper1")}
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
            "Thống kê thanh toán trực tuyến",
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
const DonDocThanhToanTrucTuyen = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useThanhToanTrucTuyenContext();
  const thongKeContext = useBaoCaoTongHopContext();
  const yeuCauThanhToanContext = useYeuCauThanhToanContext();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);

  const dispatch = useAppDispatch();
  const { DonDocThanhToanTrucTuyens: thongKeDatas, loading } = useAppSelector(
    (state) => state.ThongKeQD766
  );

  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");

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

  const onFinish = (value: any) => {
    dispatch(SearchDonDocThanhToanTrucTuyen({ ...value, mucDos: ['3', '4'] }));
  };

  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    yeuCauThanhToanContext.setYeuCauThanhToanModalVisible(true);
    yeuCauThanhToanContext.setSearchParams({
      pageNumber: 1,
      pageSize: 100,
      donVi: item.maThongKe,
      trangThai: TRANGTHAITHANHTOAN["Đã thanh toán"],
      thanhToanTuNgay: thongKeHoSoContext.search.tuNgay,
      thanhToanDenNgay: thongKeHoSoContext.search.denNgay,
      tieuChi: tieuChi,
      mucDos: ['3', '4'],

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
          {index + 1}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "left",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
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
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.hoSoDaThuPhi ? (
            <strong>{getCurrencyThongKe(item.hoSoDaThuPhi)}</strong>
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
          {item.hoSoDaThuPhiTrucTiep ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "HoSoDaThuPhiTrucTiep")}
            >
              {getCurrencyThongKe(item.hoSoDaThuPhiTrucTiep)}
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
          {item.hoSoDaThuPhiTrucTuyen ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "HoSoDaThuPhiTrucTuyen")}
            >
              {getCurrencyThongKe(item.hoSoDaThuPhiTrucTuyen)}
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
          {item?.hoSoDaThuPhiTrucTuyen /
            (item?.hoSoDaThuPhiTrucTuyen + item?.hoSoDaThuPhiTrucTiep) >
            0
            ? Math.abs(
              Math.round(
                (item.hoSoDaThuPhiTrucTuyen /
                  (item?.hoSoDaThuPhiTrucTuyen +
                    item?.hoSoDaThuPhiTrucTiep)) *
                100 *
                100
              ) / 100
            ) + "%"
            : "0"}
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
          {item.tongPhi ? <div>{getCurrency(item.tongPhi)}</div> : "0"}
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
          {item.tongLePhi ? <div>{getCurrency(item.tongLePhi)}</div> : "0"}
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
          {item.tongSoTien ? <div>{getCurrency(item.tongSoTien)}</div> : "0"}
        </td>
      </tr>
    );
  };

  return (
    <Spin spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
    >
      <div className="thongKeSwapper">


        <SearchThongKeTheoKhungTg
          setSearchParams={thongKeHoSoContext.setSearch}
          resetSearchParams={() => { }}
          onFinish={onFinish}
          items={items}
        />

        <div
          id="ContainerSwapper"
          className="table-responsive"
          style={{
            paddingTop: "10px",
            fontSize: "16px",
          }}
        >
          <Spin spinning={loading}>
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
                    colSpan={12}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                    }}
                  >
                    <strong>
                      THEO DÕI THANH TOÁN TRỰC TUYẾN - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTg ngày 23/06/2022
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

                      width: "30%",
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
                      width: "10%",
                    }}
                  >
                    <strong>Hồ sơ thu phí</strong>
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",

                    }}
                  >
                    <strong>Thanh toán</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",

                      width: "10%",
                    }}
                  >
                    <strong>Tỷ lệ thanh toán trực tuyến</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                    }}
                  >
                    <strong>Phí (VNĐ)</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                    }}
                  >
                    <strong>Lệ phí (VNĐ)</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                    }}
                  >
                    <strong>Tổng số tiền (VNĐ)</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                    }}
                  >
                    <strong>Trực tiếp</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                    }}
                  >
                    <strong>Trực tuyến</strong>
                  </td>
                </tr>
              </thead>
              <tbody id="data">
                {thongKeDatas?.map(
                  (item: IThongKeQD766DonDocTTTTElement, index: number) => {
                    return getElementThongKe(item, index);
                  }
                )}
                <CountDataDonDocThanhToanTrucTuyen data={thongKeDatas} />
              </tbody>
            </table>
          </Spin>
        </div>

        {yeuCauThanhToanContext.yeuCauThanhToanModalVisible ? (
          <DanhSachYeuCauThanhToansTheoBaoCaoWrapper
            title={"THEO DÕI THANH TOÁN TRỰC TUYẾN - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTg ngày 23/06/2022"}
            donViThongKe={coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.search?.maDinhDanhCha)[0].groupName}
            tuNgay={dayjs(thongKeHoSoContext.search.tuNgay).format('DD/MM/YYYY')}
            denNgay={dayjs(thongKeHoSoContext.search.denNgay).format('DD/MM/YYYY')} />
        ) : null}
        <XuatDonDocThanhToanTrucTuyenTable data={thongKeDatas}
          tuNgay={dayjs(thongKeHoSoContext.search.tuNgay).format('DD/MM/YYYY')}
          denNgay={dayjs(thongKeHoSoContext.search.denNgay).format('DD/MM/YYYY')}
          groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.search?.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.search?.maDinhDanhCha)[0].groupName : undefined}
        />
      </div>
    </Spin>

  );
};

function DonDocThanhToanTrucTuyenSwapper() {
  return (
    <ThanhToanTrucTuyenContextProvider>
      <BaoCaoTongHopProvider>
        <YeuCauThanhToanProvider>
          <DonDocThanhToanTrucTuyen />
        </YeuCauThanhToanProvider>
      </BaoCaoTongHopProvider>
    </ThanhToanTrucTuyenContextProvider>
  );
}
export default DonDocThanhToanTrucTuyenSwapper;


export const CountDataDonDocThanhToanTrucTuyen = ({
  data,
}: {
  data: IThongKeQD766DonDocTTTTElement[] | undefined;
}) => {
  const [hoSoDaThuPhiTotal, hoSoDaThuPhiTrucTiepTotal, hoSoDaThuPhiTrucTuyenTotal, tongPhiTotal,
    tongLePhiTotal, tongSoTienTotal
  ] = useMemo(() => {

    let hoSoDaThuPhiTotal = 0, hoSoDaThuPhiTrucTiepTotal = 0, hoSoDaThuPhiTrucTuyenTotal = 0, tongPhiTotal = 0,
      tongLePhiTotal = 0, tongSoTienTotal = 0, tongDaXuLyTotal = 0, daXuLyTruocHanTotal = 0,
      daXuLyDungHanTotal = 0, daXuLyQuaHanTotal = 0, tongDangXuLyTotal = 0, dangXuLyTrongHanTotal = 0,
      dangXuLyQuaHanTotal = 0, tongTamDungXuLyTotal = 0

    data?.forEach((item: IThongKeQD766DonDocTTTTElement) => {
      hoSoDaThuPhiTotal += item.hoSoDaThuPhi
      hoSoDaThuPhiTrucTiepTotal += item.hoSoDaThuPhiTrucTiep
      hoSoDaThuPhiTrucTuyenTotal += item.hoSoDaThuPhiTrucTuyen
      tongPhiTotal += item.tongPhi
      tongLePhiTotal += item.tongLePhi
      tongSoTienTotal += item.tongSoTien

    })

    return [hoSoDaThuPhiTotal, hoSoDaThuPhiTrucTiepTotal, hoSoDaThuPhiTrucTuyenTotal, tongPhiTotal,
      tongLePhiTotal, tongSoTienTotal];
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
        {getCurrencyThongKe(hoSoDaThuPhiTotal)}
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
        {getCurrencyThongKe(hoSoDaThuPhiTrucTiepTotal)}

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
        {getCurrencyThongKe(hoSoDaThuPhiTrucTuyenTotal)}
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
        {hoSoDaThuPhiTrucTuyenTotal /
          (hoSoDaThuPhiTrucTuyenTotal + hoSoDaThuPhiTrucTiepTotal) >
          0
          ? Math.abs(
            Math.round(
              (hoSoDaThuPhiTrucTuyenTotal /
                (hoSoDaThuPhiTrucTuyenTotal +
                  hoSoDaThuPhiTrucTiepTotal)) *
              100 *
              100
            ) / 100
          ) + "%"
          : "0"}
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
        {tongPhiTotal ? <div>{getCurrency(tongPhiTotal)}</div> : "0"}
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
        {getCurrency(tongLePhiTotal)}
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
        {getCurrency(tongSoTienTotal)}
      </td>
    </tr>
  );
}