import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
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
import dayjs from 'dayjs'
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
import { BaoCaoTongHop06aAction } from "@/features/baocaotonghop/redux/action";
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
import { XuatBaoCaoTongHop06aModal } from "./exportElements/XuatBaoCaoTongHop06a";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê thanh báo cáo 06a", "ContainerSwapper1")}
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
            "Thống kê báo cáo tổng hợp 06a",
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
const BaoCaoTongHop06a = () => {
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

  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {

    if (value.tuNgay && value.denNgay) {
      setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
      var res = await dispatch(
        BaoCaoTongHop06aAction({
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
      MaDonVi: item.maThongKe,
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: tieuChi,
      laDuLieuThongKeCacNam
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
          {item.tiepNhanQuaMang ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanQuaMang")}>
              {getCurrencyThongKe(item.tiepNhanQuaMang)}
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
          {item.tiepNhanTrucTiepVaBCCI ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "TiepNhanTrucTiepVaBCCI")}
            >
              {getCurrencyThongKe(item.tiepNhanTrucTiepVaBCCI)}
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
          {item.daXuLyVaTraLai ? (
            <Link to="" onClick={() => handleLoadHoSo(item, "DaXuLyVaTraLai")}>
              {getCurrencyThongKe(item.daXuLyVaTraLai)}
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
          {item.daXuLyDungHanVaTraLai ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "DaXuLyDungHanVaTraLai")}
            >
              {getCurrencyThongKe(item.daXuLyDungHanVaTraLai)}
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
          {item.dangXuLyVaBoSung ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "DangXuLyVaBoSung")}
            >
              {getCurrencyThongKe(item.dangXuLyVaBoSung)}
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
          {item.dangXuLyTrongHanVaBoSung ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "DangXuLyTrongHanVaBoSung")}
            >
              {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
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
      </tr>
    );
  };

  return (
    <>
      <div className="thongKeSwapper table-responsive">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
          Tình hình, kết quả giải quyết TTHC tại cơ quan, đơn vị trực tiếp giải quyết TTHC
        </div>
        <SearchBaoCaoTongHop
          setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
          resetSearchParams={() => { }}
          onFinish={onFinish}
          items={items}
        />
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <div id="ContainerSwapper" style={{ fontSize: "16px" }}>
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
                      minWidth: "20%",
                      width: "20%",
                    }}
                  >
                    <strong>Đơn vị</strong>
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "27%",
                    }}
                  >
                    <strong>Số hồ sơ nhận giải quyết</strong>
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
                    <strong>Số lượng hồ sơ đã giải quyết</strong>
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
                    <strong>Số lượng hồ sơ đang giải quyết</strong>
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
                      width: "8%",
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
                      width: "8%",
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
                    {Template(0, "Huyện, thành phố, thị xã")}
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
                <CountDataThongKe06a data={data} />
              </tbody>
            </table>
          </div>
        </Spin>

        {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
          <HoSoTheoBaoCaoTongHopWrapper />
        ) : null}
        <XuatBaoCaoTongHop06aModal data={data}
          tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
          denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
          catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
            : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].catalog : undefined
          }
          groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].groupName : undefined}
        />
      </div>
    </>
  );
};
function BaoCaoTongHop06aSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHop06a />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHop06aSwapper;


export const CountDataThongKe06a = ({
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
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(dangXuLyQuaHanTotal)}
      </td>
    </tr>
  )
}