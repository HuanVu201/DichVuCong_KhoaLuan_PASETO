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
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThongKeChiTieuDVCElement, IThongKeChiTieuDVCResponse } from "../models/ThongKe766Response";
import { SearchChiTieuDVCTrucTuyenNew } from "../redux/action";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";

import {
  ThuTucProvider,
  useThuTucContext,
} from "@/features/thutuc/contexts/ThuTucContext";
import { Link } from "react-router-dom";
import { getCurrencyThongKe } from "@/utils";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoChiTieuDvcTrucTuyenWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoChiTieuDvcTrucTuyenTable";
import { ThuTucTheoBaoCaoTongHopWrapper } from "@/features/thutuc/components/ThuTucTheoBaoCaoTongHopTable";
import { SearchThongKeTheoKhungTg } from "./SearchThongKeTheoKhungTg";
import { SearchBaoCaoTongHop } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTongHop";
import { XuatThongKeChiTieuDVCTrucTuyen2 } from "./exportElements/XuatThongKeChiTieuDVCTrucTuyen2";
import dayjs from "dayjs";
import { SearchThongKe766 } from "../../ThongKeTheoDonVi/components/SearchThongKe766";
import { export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";


const TheoDoiChiTieuDVCTrucTuyen2 = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() =>
            downloadPhieuExcel(
              "Bảng thống kê chỉ tiêu DVC trực tuyến", "tableHoSo"
            )
          }
        >
          <FileExcelOutlined style={{ color: "green" }} /> In file excel
        </button>
      ),
      key: "excel",
    },
   
  ];

  const dispatch = useAppDispatch();
  const [dataThongKe, setDataThongKe] = useState<IThongKeChiTieuDVCResponse>({
    data: [],
  });
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const thuTucContext = useThuTucContext();
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
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (value: ISearchThongKeParams) => {
    setLoading(true);
    try {
      var res: any = await dispatch(SearchChiTieuDVCTrucTuyenNew(value)).unwrap();

      if (res) {
        setDataThongKe(res);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }


  };


  const handleViewChiTietThuTuc = (
    item: any,
    tieuChi: string,
    phatSinhHoSo?: boolean
  ) => {
    thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(true);

    thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams({
      pageNumber: 1,
      pageSize: 20,
      tieuChi: tieuChi,
      groupCode: item.maThongKe,
      coPhatSinhHoSo: phatSinhHoSo,
    });
  };
  return (
    <div className="thongKeSwapper">

      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
          }
        >
          <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
            Theo dõi chỉ tiêu DVC trực tuyến
          </div>
          <SearchThongKe766
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            resetSearchParams={() => { }}
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
              id=""
              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                fontSize: "16px",
              }}
            >
              <thead style={{ fontSize: "16px" }}>
                <tr>
                  <td
                    colSpan={20}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <strong>
                      THEO DÕI CHỈ TIÊU DVC TRỰC TUYẾN - THEO QUYẾT
                      ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={20}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <strong></strong>
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
                    }}
                  >
                    <strong>Đơn vị</strong>
                  </td>
                  <td
                    rowSpan={1}
                    colSpan={4}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Cung cấp DVC trực tuyến</strong>
                  </td>
                  <td
                    rowSpan={1}
                    colSpan={14}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Phát sinh hồ sơ</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Tổng số thủ tục</strong>
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
                    <strong>DVC trực tuyến</strong>
                  </td>
                  <td
                    colSpan={5}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Tổng</strong>
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
                    <strong>Toàn trình</strong>
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
                    <strong>Một phần</strong>
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
                    <strong>Dịch vụ cung cấp thông tin</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
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
                    }}
                  >
                    <strong>Toàn trình</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Một phần</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số thủ tục phát sinh hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>
                      Số hồ sơ phát sinh cả trực tuyến và trực tiếp
                    </strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số thủ tục trực tuyến phát sinh hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>
                      Số hồ sơ phát sinh cả trực tuyến và trực tiếp trong các
                      thủ tục trực tuyến
                    </strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số hồ sơ phát sinh trực tuyến</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số thủ tục</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>
                      Số hồ sơ phát sinh cả trực tuyến và trực tiếp
                    </strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số hồ sơ phát sinh trực tuyến</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số thủ tục</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>
                      Số hồ sơ phát sinh cả trực tuyến và trực tiếp
                    </strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số hồ sơ phát sinh trực tuyến</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số thủ tục</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số thủ tục phát sinh hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số hồ sơ phát sinh</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
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
                          {item.tongSoThuTuc ? (
                            <Link
                              to=""
                              onClick={() => handleViewChiTietThuTuc(item, "")}
                            >
                              {getCurrencyThongKe(item.tongSoThuTuc)}
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
                          {item.thuTucDvcTrucTuyen ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(
                                  item,
                                  "TongTTHCTrucTuyen"
                                )
                              }
                            >
                              {getCurrencyThongKe(item.thuTucDvcTrucTuyen)}
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
                          {item.thuTucToanTrinh ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(
                                  item,
                                  "tthctructuyentoantrinh"
                                )
                              }
                            >
                              {getCurrencyThongKe(item.thuTucToanTrinh)}
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
                          {item.thuTucMotPhan ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(
                                  item,
                                  "tthctructuyenmotphan"
                                )
                              }
                            >
                              {getCurrencyThongKe(item.thuTucMotPhan)}
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
                          {item.thuTucPhatSinhHoSo ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(item, "", true)
                              }
                            >
                              {getCurrencyThongKe(item.thuTucPhatSinhHoSo)}
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
                          {item.tongHoSoPhatSinh ? (
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "")}
                            >
                              {getCurrencyThongKe(item.tongHoSoPhatSinh)}
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
                          {item.thuTucTrucTuyenPhatSinhHoSo ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(
                                  item,
                                  "TongTTHCTrucTuyen",
                                  true
                                )
                              }
                            >
                              {getCurrencyThongKe(item.thuTucTrucTuyenPhatSinhHoSo)}
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
                          {item.hoSoPhatSinhTrongThuTucTrucTuyen ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrongThuTucTrucTuyen"
                                )
                              }
                            >
                              {getCurrencyThongKe(
                                item.hoSoPhatSinhTrongThuTucTrucTuyen
                              )}
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
                          {item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen"
                                )
                              }
                            >
                              {getCurrencyThongKe(
                                item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen
                              )}
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
                          {item.thuTucToanTrinhPhatSinhHoSo ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(
                                  item,
                                  "tthctructuyentoantrinh",
                                  true
                                )
                              }
                            >
                              {getCurrencyThongKe(item.thuTucToanTrinhPhatSinhHoSo)}
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
                          {item.hoSoPhatSinhTrongThuTucToanTrinh ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrongThuTucToanTrinh"
                                )
                              }
                            >
                              {getCurrencyThongKe(
                                item.hoSoPhatSinhTrongThuTucToanTrinh
                              )}
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
                          {item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrucTuyenTrongThuTucToanTrinh"
                                )
                              }
                            >
                              {getCurrencyThongKe(
                                item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh
                              )}
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
                          {item.thuTucMotPhanPhatSinhHoSo ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(
                                  item,
                                  "tthctructuyenmotphan",
                                  true
                                )
                              }
                            >
                              {getCurrencyThongKe(item.thuTucMotPhanPhatSinhHoSo)}
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
                          {item.hoSoPhatSinhTrongThuTucMotPhan ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrongThuTucMotPhan"
                                )
                              }
                            >
                              {getCurrencyThongKe(item.hoSoPhatSinhTrongThuTucMotPhan)}
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
                          {item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrucTuyenTrongThuTucMotPhan"
                                )
                              }
                            >
                              {getCurrencyThongKe(
                                item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan
                              )}
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
                          {item.thuTucDvc ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(item, "thuTucDvc")
                              }
                            >
                              {getCurrencyThongKe(item.thuTucDvc)}
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
                          {item.thuTucDvcPhatSinhHoSo ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleViewChiTietThuTuc(item, "thuTucDvc", true)
                              }
                            >
                              {getCurrencyThongKe(item.thuTucDvcPhatSinhHoSo)}
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
                          {item.hoSoPhatSinhTrongThuTucDvc ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(
                                  item,
                                  "HoSoPhatSinhTrongThuTucDvc"
                                )
                              }
                            >
                              {getCurrencyThongKe(item.hoSoPhatSinhTrongThuTucDvc)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                <CountDataThongKeChiTieuDVCTrucTuyen data={dataThongKe.data} />
              </tbody>
            </table>
            {thuTucContext.thuTucTheoBaoCaoTongHopModalVisible ? (
              <ThuTucTheoBaoCaoTongHopWrapper
                searchParams={thuTucContext.searchThuTucTheoBaoCaoTongHopParams}
                setSearchParams={
                  thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams
                }
                modalVisible={thuTucContext.thuTucTheoBaoCaoTongHopModalVisible}
                setModalVisible={
                  thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible
                }
              />
            ) : null}
            <XuatThongKeChiTieuDVCTrucTuyen2 data={dataThongKe.data}
              tuNgay={dayjs(searchParams.tuNgay).format('DD/MM/YYYY')}
              denNgay={dayjs(searchParams.denNgay).format('DD/MM/YYYY')}
              groupName={coCauToChucs && coCauToChucs.length > 0 && searchParams.maDinhDanhCha ? coCauToChucs?.filter((x: any) => x.maDinhDanh == searchParams.maDinhDanhCha)[0].groupName : undefined}
            />
            {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
              <HoSoTheoChiTieuDvcTrucTuyenWrapper />
            ) : null}
          </div>
        </Spin>
      </AntdSpace>
    </div>
  );
};

const TheoDoiChiTieuDVCTrucTuyen2Swapper = () => {
  return (
    <ThuTucProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <TheoDoiChiTieuDVCTrucTuyen2 />
      </HoSoTheoBaoCaoTongHopProvider>
    </ThuTucProvider>
  );
};

export default TheoDoiChiTieuDVCTrucTuyen2Swapper;



export const CountDataThongKeChiTieuDVCTrucTuyen = ({
  data,
}: {
  data: IThongKeChiTieuDVCElement[] | undefined;
}) => {

  const [
    tongSoThuTucTotal, thuTucDvcTrucTuyenTotal, thuTucToanTrinhTotal,
    thuTucMotPhanTotal, thuTucPhatSinhHoSoTotal, tongHoSoPhatSinhTotal,
    thuTucTrucTuyenPhatSinhHoSoTotal, hoSoPhatSinhTrongThuTucTrucTuyenTotal,
    hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyenTotal, thuTucToanTrinhPhatSinhHoSoTotal,
    hoSoPhatSinhTrongThuTucToanTrinhTotal, hoSoPhatSinhTrucTuyenTrongThuTucToanTrinhTotal,
    thuTucMotPhanPhatSinhHoSoTotal, hoSoPhatSinhTrongThuTucMotPhanTotal,
    hoSoPhatSinhTrucTuyenTrongThuTucMotPhanTotal, thuTucDvcTotal, thuTucDvcPhatSinhHoSoTotal, hoSoPhatSinhTrongThuTucDvcTotal,

  ] = useMemo(() => {
    var tmp1 = 0, tmp2 = 0, tmp3 = 0, tmp4 = 0, tmp5 = 0, tmp6 = 0, tmp7 = 0, tmp8 = 0, tmp9 = 0, tmp10 = 0, tmp11 = 0, tmp12 = 0,
      tmp13 = 0, tmp14 = 0, tmp15 = 0, tmp16 = 0, tmp17 = 0, tmp18 = 0;

    data?.map((item) => {
      tmp1 += item?.tongSoThuTuc || 0;
      tmp2 += item?.thuTucDvcTrucTuyen || 0;
      tmp3 += item?.thuTucToanTrinh || 0;
      tmp4 += item?.thuTucMotPhan || 0;
      tmp5 += item?.thuTucPhatSinhHoSo || 0;
      tmp6 += item?.tongHoSoPhatSinh || 0;
      tmp7 += item?.thuTucTrucTuyenPhatSinhHoSo || 0;
      tmp8 += item?.hoSoPhatSinhTrongThuTucTrucTuyen || 0;
      tmp9 += item?.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen || 0;
      tmp10 += item?.thuTucToanTrinhPhatSinhHoSo || 0;
      tmp11 += item?.hoSoPhatSinhTrongThuTucToanTrinh || 0;
      tmp12 += item?.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh || 0;
      tmp13 += item?.thuTucMotPhanPhatSinhHoSo || 0;
      tmp14 += item?.hoSoPhatSinhTrongThuTucMotPhan || 0;
      tmp15 += item?.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan || 0;
      tmp16 += item?.thuTucDvc || 0;
      tmp17 += item?.thuTucDvcPhatSinhHoSo || 0;
      tmp18 += item?.hoSoPhatSinhTrongThuTucDvc || 0;
    });
    return [tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18];
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
        {getCurrencyThongKe(tongSoThuTucTotal)}
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
        {getCurrencyThongKe(thuTucDvcTrucTuyenTotal)}
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
        {getCurrencyThongKe(thuTucToanTrinhTotal)}
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
        {getCurrencyThongKe(thuTucMotPhanTotal)}
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
        {getCurrencyThongKe(thuTucPhatSinhHoSoTotal)}
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
        {getCurrencyThongKe(tongHoSoPhatSinhTotal)}
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
        {getCurrencyThongKe(thuTucTrucTuyenPhatSinhHoSoTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrongThuTucTrucTuyenTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyenTotal)}
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
        {getCurrencyThongKe(thuTucToanTrinhPhatSinhHoSoTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrongThuTucToanTrinhTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrucTuyenTrongThuTucToanTrinhTotal)}
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
        {getCurrencyThongKe(thuTucMotPhanPhatSinhHoSoTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrongThuTucMotPhanTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrucTuyenTrongThuTucMotPhanTotal)}
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
        {getCurrencyThongKe(thuTucDvcTotal)}
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
        {getCurrencyThongKe(thuTucDvcPhatSinhHoSoTotal)}
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
        {getCurrencyThongKe(hoSoPhatSinhTrongThuTucDvcTotal)}
      </td>
    </tr>
  )

}
