import { Dropdown, MenuProps, Row, SelectProps, Space, Spin } from "antd";
import "../../ThongKe.scss";
import {
  DownOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  LoadingOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AntdSpace } from "@/lib/antd/components";
import { SearchThongKe } from "./SearchThongKe";
import { Value } from "sass";
import { useMemo, useState } from "react";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import {
  SearchThanhToanTrucTuyenNew,
  SearchTienDoGiaiQuyetNew,
} from "../redux/action";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  IThongKeTTTTResponse,
  IThongKeTienDoGiaiQuyetElement,
  IThongKeTienDoGiaiQuyetResponse,
} from "../models/ThongKe766Response";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoTienDoGiaiQuyetWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoTienDoGiaiQuyetTable";
import { SearchThongKeTheoKhungTg } from "./SearchThongKeTheoKhungTg";
import { SearchBaoCaoTongHop } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTongHop";
import { XuatThongKeTienDoGiaiQuyet2 } from "./exportElements/XuatThongKeTienDoGiaiQuyet2";
import { SearchThongKe766 } from "../../ThongKeTheoDonVi/components/SearchThongKe766";
import dayjs from 'dayjs'
import { export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";


const TienDoGiaiQuyet2 = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() => downloadPhieuExcel("Bảng thống kê tiến độ giải quyết", 'ContainerSwapper1')}
        >
          <FileExcelOutlined style={{ color: "green" }} /> In file excel
        </button>
      ),
      key: "excel",
    },
    {
      label: (
        <button
          onClick={() => {
            export2Word(
              "Bảng thống kê tiếp nhận hồ sơ trực tuyến của UBND cấp huyện", true, 'ContainerSwapper1'
            );
          }}
          style={{ border: "none", background: "inherit" }}
        >
          <FileWordOutlined style={{ color: "#36a3f7" }} /> In file word
        </button>
      ),
      key: "word",
    },
  ];
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaDonVi: item.maThongKe,
      //   Catalog: "quan-huyen",
      // MaDinhDanh: thongKeHoSoContext.search.maDinhDanhCha,
      TuNgay: searchParams.tuNgay,
      DenNgay: searchParams.denNgay,
      tieuChi: tieuChi,
    });
  };
  const dispatch = useAppDispatch();
  const [dataThongKe, setDataThongKe] =
    useState<IThongKeTienDoGiaiQuyetResponse>({
      data: [],
    });
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const onFinish = async (value: ISearchThongKeParams) => {
    setLoading(true);
    var res: any = await dispatch(SearchTienDoGiaiQuyetNew(value)).unwrap();
    if (res) {
      setDataThongKe(res);
      setLoading(false);
    }
  };

  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        Theo dõi chỉ tiêu tiến độ giải quyết
      </div>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
          }
        >
          <SearchThongKe766
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            resetSearchParams={() => {
              setSearchParams({});
            }}
            onFinish={onFinish}
            items={items}
          />

          <div
            id="ContainerSwapper"
            className="table-responsive"
            style={{
              fontSize: "16px",
            }}
          >
            <table
              id="tableToExcel"
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
                    colSpan={15}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <strong>
                      THEO DÕI TIẾN ĐỘ GIẢI QUYẾT - THEO
                      QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                    </strong>
                  </td>
                </tr>


                <tr>
                  <td
                    rowSpan={3}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>STT</strong>
                  </td>
                  <td
                    rowSpan={3}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "20%"
                    }}
                  >
                    <strong>Đơn vị</strong>
                  </td>
                  <td
                    colSpan={6}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",

                    }}
                  >
                    <strong>Tiếp nhận</strong>
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {/*  (Đã xử lý xong + Đã trả kết quả + Rút) */}
                    <strong>Đã xử lý</strong>
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Đang xử lý</strong>
                  </td>
                  {/* <td
                    rowSpan={3}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>
                      Tạm dừng xử lý <br />
                    </strong>
                  </td> */}
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Tổng số</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Kỳ trước chuyển sang</strong>
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Trong kỳ</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Tổng số</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Trước hạn</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Trong hạn</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Quá hạn</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Tổng số</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Trong hạn</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Quá hạn</strong>
                  </td>

                </tr>
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Tổng số</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Trực tuyến</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>Trực tiếp</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "6%"
                    }}
                  >
                    <strong>BCCI</strong>
                  </td>
                </tr>
              </thead>
              <tbody id="data">
                {dataThongKe?.data
                  .filter((x) => x.catalog)
                  .map((item, index) => {
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
                          {index + 1}
                        </td>
                        <td
                          style={{
                            verticalAlign: "left",
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
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "TongSo")}
                            >
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
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "KyTruoc")}
                            >
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
                          {item.tongTiepNhan ? (
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "TrongKy")}
                            >
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
                          }}
                        >
                          {item.tiepNhanQuaMang ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "TrongKyTrucTuyen")
                              }
                            >
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
                          }}
                        >
                          {item.tiepNhanTrucTiep ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "TrongKyTrucTiep")
                              }
                            >
                              {getCurrencyThongKe(item.tiepNhanTrucTiep)}
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
                          {item.tiepNhanBCCI ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "TrongKyBCCI")
                              }
                            >
                              {getCurrencyThongKe(item.tiepNhanBCCI)}
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
                          {item.tongDaXuLy ? (
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "DaXuLy")}
                            >
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
                          }}
                        >
                          {item.daXuLyTruocHan ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DaXuLyTruocHan")
                              }
                            >
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
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DaXuLyTrongHan")
                              }
                            >
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
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DaXuLyQuaHan")
                              }
                            >
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
                          }}
                        >
                          {item.dangXuLyTrongHanVaBoSung ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DangXuLyTrongHanVaBoSung")
                              }
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
                          }}
                        >
                          {item.dangXuLyQuaHan ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DangXuLyQuaHan")
                              }
                            >
                              {getCurrencyThongKe(item.dangXuLyQuaHan)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        {/* <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "right",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item.tongTamDungXuLy ? (
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "DungXuLy")}
                            >
                              {getCurrencyThongKe(item.tongTamDungXuLy)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td> */}
                      </tr>
                    );
                  })}
                <CountDataTienDoGiaiQuyet2 data={dataThongKe.data} />
              </tbody>
            </table>
            {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
              <HoSoTheoTienDoGiaiQuyetWrapper />
            ) : null}
            <XuatThongKeTienDoGiaiQuyet2 data={dataThongKe?.data}
              tuNgay={searchParams.tuNgay ? dayjs(searchParams.tuNgay).format('DD/MM/YYYY') : undefined}
              denNgay={searchParams.denNgay ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') : undefined}
              groupName={coCauToChucs && coCauToChucs.length > 0 && searchParams.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == searchParams.maDinhDanhCha)[0].groupName : undefined}
            />
          </div>
        </Spin>
      </AntdSpace>
    </div>
  );
};

function TienDoGiaiQuyet2Swapper() {
  return (
    <HoSoTheoBaoCaoTongHopProvider>
      <TienDoGiaiQuyet2 />
    </HoSoTheoBaoCaoTongHopProvider>
  );
}
export default TienDoGiaiQuyet2Swapper;


export const CountDataTienDoGiaiQuyet2 = ({
  data,
}: {
  data: IThongKeTienDoGiaiQuyetElement[] | undefined;
}) => {
  const [tongSoTotal, tiepNhanKyTruocTotal, tongTiepNhanTotal, tiepNhanQuaMangTotal,
    tiepNhanTrucTiepTotal, tiepNhanBCCITotal, tongDaXuLyTotal, daXuLyTruocHanTotal,
    daXuLyDungHanTotal, daXuLyQuaHanTotal, dangXuLyVaBoSungTotal, dangXuLyTrongHanVaBoSungTotal,
    dangXuLyQuaHanTotal, tongTamDungXuLyTotal
  ] = useMemo(() => {

    let tongSoTotal = 0, tiepNhanKyTruocTotal = 0, tongTiepNhanTotal = 0, tiepNhanQuaMangTotal = 0,
      tiepNhanTrucTiepTotal = 0, tiepNhanBCCITotal = 0, tongDaXuLyTotal = 0, daXuLyTruocHanTotal = 0,
      daXuLyDungHanTotal = 0, daXuLyQuaHanTotal = 0, dangXuLyVaBoSungTotal = 0, dangXuLyTrongHanVaBoSungTotal = 0,
      dangXuLyQuaHanTotal = 0, tongTamDungXuLyTotal = 0

    data?.forEach((item: IThongKeTienDoGiaiQuyetElement) => {
      tongSoTotal += item.tongSo
      tiepNhanKyTruocTotal += item.tiepNhanKyTruoc
      tongTiepNhanTotal += item.tongTiepNhan
      tiepNhanQuaMangTotal += item.tiepNhanQuaMang
      tiepNhanTrucTiepTotal += item.tiepNhanTrucTiep
      tiepNhanBCCITotal += item.tiepNhanBCCI
      tongDaXuLyTotal += item.tongDaXuLy
      daXuLyTruocHanTotal += item.daXuLyTruocHan
      daXuLyDungHanTotal += item.daXuLyDungHan
      daXuLyQuaHanTotal += item.daXuLyQuaHan
      dangXuLyVaBoSungTotal += item.dangXuLyVaBoSung
      dangXuLyTrongHanVaBoSungTotal += item.dangXuLyTrongHanVaBoSung
      dangXuLyQuaHanTotal += item.dangXuLyQuaHan
      tongTamDungXuLyTotal += item.tongTamDungXuLy
    })



    return [tongSoTotal, tiepNhanKyTruocTotal, tongTiepNhanTotal, tiepNhanQuaMangTotal,
      tiepNhanTrucTiepTotal, tiepNhanBCCITotal, tongDaXuLyTotal, daXuLyTruocHanTotal,
      daXuLyDungHanTotal, daXuLyQuaHanTotal, dangXuLyVaBoSungTotal, dangXuLyTrongHanVaBoSungTotal,
      dangXuLyQuaHanTotal, tongTamDungXuLyTotal];
  }, [data]);



  return (
    <tr>
      <td

        style={{
          verticalAlign: "left",
          textAlign: "left",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600
        }}
      >
      </td>
      <td
        style={{
          verticalAlign: "left",
          textAlign: "left",
          padding: "5px",
          border: "1px solid #333",
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
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tiepNhanTrucTiepTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tiepNhanBCCITotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
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
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(daXuLyDungHanTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
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
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(dangXuLyQuaHanTotal)}
      </td>
      {/* <td
        style={{
          verticalAlign: "middle",
          textAlign: "right",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600
        }}
      >
        {getCurrencyThongKe(tongTamDungXuLyTotal)}
      </td> */}
    </tr>
  );
}