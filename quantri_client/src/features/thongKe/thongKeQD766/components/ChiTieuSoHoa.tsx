import { Dropdown, MenuProps, Row, SelectProps, Space, Spin } from "antd";
import "../../ThongKe.scss";
import {
  DownOutlined,
  FileExcelOutlined,
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
import { IThongKeChiTieuSoHoaElement, IThongKeChiTieuSoHoaResponse } from "../models/ThongKe766Response";
import { SearchChiTieuSoHoaNew } from "../redux/action";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoChiTieuSoHoaWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoChiTieuSoHoaTable";
import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import { SearchThongKeTheoKhungTg } from "./SearchThongKeTheoKhungTg";
import { SearchBaoCaoTongHop } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTongHop";
import { SearchThongKe766 } from "../../ThongKeTheoDonVi/components/SearchThongKe766";
import dayjs from 'dayjs'

const MucDoSoHoa = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() => downloadPhieuExcel("Bảng thống kê chỉ tiêu số hóa")}
        >
          <FileExcelOutlined style={{ color: "green" }} /> In file excel
        </button>
      ),
      key: "excel",
    },
  ];

  const dispatch = useAppDispatch();
  const [dataThongKe, setDataThongKe] = useState<IThongKeChiTieuSoHoaResponse>({
    data: [],
  });
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const onFinish = async (value: ISearchThongKeParams) => {
    setLoading(true);
    setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
    var res: any = await dispatch(SearchChiTieuSoHoaNew(value)).unwrap();
    if (res) {
      setDataThongKe(res);
      setLoading(false);
    }
  };
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
      laDuLieuThongKeCacNam
    });
  };
  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        Theo dõi chỉ tiêu số hóa các đơn vị
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
              fontFamily: "'Roboto', ",
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
                fontFamily: "'Roboto', ",
              }}
            >
              <thead id="headerTable">
                <tr>
                  <td
                    colSpan={14}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      textAlign: "center",
                      fontFamily: "'Roboto', ",
                      fontSize: "17px",
                    }}
                  >
                    <strong>
                      THEO DÕI MỨC ĐỘ SỐ HÓA CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ
                      766/QĐ-TTg ngày 23/06/2022
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td colSpan={10}></td>
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
                    <strong>STT</strong>
                  </td>
                  <td
                    rowSpan={2}
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
                    rowSpan={2}
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
                    colSpan={5}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Số hóa hồ sơ TTHC khi tiếp nhận</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Đã giải quyết</strong>
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
                    <strong>Số hóa kết quả giải quyết</strong>
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Đánh giá</strong>
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
                    <strong>Chưa số hóa TPHS</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Có số hóa TPHS</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Có tái sử dụng thành phần</strong>
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
                      Có tái sử dụng thành phần từ cổng DVC quốc gia
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
                    <strong>Tỷ lệ số hóa TPHS</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Chưa số hóa</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Đã số hóa</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Tỷ lệ số hóa kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Tỷ lệ số hóa TPHS</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    <strong>Tỷ lệ số hóa kết quả</strong>
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
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.tiepNhan ? (
                            <Link
                              to=""
                              onClick={() => handleLoadHoSo(item, "TiepNhan")}
                            >
                              {getCurrencyThongKe(item.tiepNhan)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.chuaSoHoaTPHS ? (
                            <Link
                              style={{ color: "#E91313" }}
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "ChuaSoHoaTPHS")
                              }
                            >
                              {getCurrencyThongKe(item.chuaSoHoaTPHS)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.coSoHoaTPHS ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "CoSoHoaTPHS")
                              }
                            >
                              {getCurrencyThongKe(item.coSoHoaTPHS)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.coTaiSuDungTPHS ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "CoTaiSuDungTPHS")
                              }
                            >
                              {getCurrencyThongKe(item.coTaiSuDungTPHS)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.coTaiSuDungTPHSTuDvcQg ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "CoTaiSuDungTPHSTuDvcQg")
                              }
                            >
                              {getCurrencyThongKe(item.coTaiSuDungTPHSTuDvcQg)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'center'
                          }}
                        >
                          <span>
                            {item?.coSoHoaTPHS &&
                              item?.tiepNhan &&
                              item?.coSoHoaTPHS / item?.tiepNhan > 0
                              ? Math.round(
                                (item.coSoHoaTPHS / item.tiepNhan) * 100 * 100
                              ) /
                              100 +
                              "%"
                              : "0"}
                          </span>
                        </td>

                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.daGiaiQuyet ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DaGiaiQuyet")
                              }
                            >
                              {getCurrencyThongKe(item.daGiaiQuyet)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.daGiaiQuyetChuaSoHoa ? (
                            <Link
                              style={{ color: "#E91313" }}
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DaGiaiQuyetChuaSoHoa")
                              }
                            >
                              {getCurrencyThongKe(item.daGiaiQuyetChuaSoHoa)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'right'
                          }}
                        >
                          {item.daGiaiQuyetDaSoHoa ? (
                            <Link
                              to=""
                              onClick={() =>
                                handleLoadHoSo(item, "DaGiaiQuyetDaSoHoa")
                              }
                            >
                              {getCurrencyThongKe(item.daGiaiQuyetDaSoHoa)}
                            </Link>
                          ) : (
                            "0"
                          )}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'center'
                          }}
                        >
                          <span>
                            {item?.daGiaiQuyet &&
                              item?.daGiaiQuyetDaSoHoa &&
                              item?.daGiaiQuyetDaSoHoa / item?.daGiaiQuyet > 0
                              ? Math.round(
                                (item.daGiaiQuyetDaSoHoa / item.daGiaiQuyet) *
                                100 *
                                100
                              ) /
                              100 +
                              "%"
                              : "0"}
                          </span>
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'center'
                          }}
                        >
                          <span>
                            {item?.coSoHoaTPHS && item?.tiepNhan ? (
                              item?.coSoHoaTPHS / item?.tiepNhan > 0 &&
                                item?.coSoHoaTPHS / item?.tiepNhan < 0.8 ? (
                                <span style={{ color: "#E91313" }}>
                                  Không đạt
                                </span>
                              ) : (
                                <span style={{ color: "#0958d9" }}>Đạt </span>
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: 'center'
                          }}
                        >
                          {item?.daGiaiQuyet && item?.daGiaiQuyetDaSoHoa ? (
                            item?.daGiaiQuyetDaSoHoa / item?.daGiaiQuyet > 0 &&
                              item?.daGiaiQuyetDaSoHoa / item?.daGiaiQuyet <
                              0.8 ? (
                              <span style={{ color: "#E91313" }}>
                                Không đạt
                              </span>
                            ) : (
                              <span style={{ color: "#0958d9" }}>Đạt </span>
                            )
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
                <CountDataMucDoSoHoa data={dataThongKe.data} />
              </tbody>
            </table>
            <div style={{ display: 'none' }}>
              <table
                id="tableToExcel"
                style={{
                  verticalAlign: "middle",
                  borderCollapse: "collapse",
                  width: "100%",
                  textAlign: "center",
                  margin: "10px 0",
                  fontFamily: "'Roboto', ",
                }}
              >
                <thead id="headerTable">
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        verticalAlign: "top",
                        padding: "5px",
                        textAlign: 'center',
                      }}
                    >
                      {coCauToChucs && coCauToChucs.length > 0 && searchParams.maDinhDanhCha ?
                        <strong>{coCauToChucs?.filter(x => x.maDinhDanh == searchParams.maDinhDanhCha)[0].groupName.toUpperCase()} </strong> : ''}
                    </td>
                    <td
                      colSpan={7}
                      style={{
                        verticalAlign: "top",
                        padding: "5px",
                        textAlign: 'center',
                      }}
                    >
                      <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br /><u>Độc lập - Tự do - Hạnh phúc</u></strong>
                    </td>

                  </tr>

                  <tr>
                    <td
                      colSpan={14}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        textAlign: 'center',
                      }}
                    >
                      <strong>THEO DÕI MỨC ĐỘ SỐ HÓA CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ
                        766/QĐ-TTg ngày 23/06/2022</strong>
                      <br />
                      <i>(Từ ngày {searchParams.tuNgay ?
                        dayjs(searchParams.tuNgay).format('DD/MM/YYYY') :
                        "..."} đến ngày {searchParams.denNgay
                          ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') :
                          "..."} )</i>
                    </td>
                  </tr>

                  <tr><p></p></tr>


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
                      <strong>STT</strong>
                    </td>
                    <td
                      rowSpan={2}
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
                      rowSpan={2}
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
                      colSpan={5}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Số hóa hồ sơ TTHC khi tiếp nhận</strong>
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Đã giải quyết</strong>
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
                      <strong>Số hóa kết quả giải quyết</strong>
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Đánh giá</strong>
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
                      <strong>Chưa số hóa TPHS</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Có số hóa TPHS</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Có tái sử dụng thành phần</strong>
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
                        Có tái sử dụng thành phần từ cổng DVC quốc gia
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
                      <strong>Tỷ lệ số hóa TPHS</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Chưa số hóa</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Đã số hóa</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Tỷ lệ số hóa kết quả</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Tỷ lệ số hóa TPHS</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Tỷ lệ số hóa kết quả</strong>
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
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.tiepNhan ? getCurrencyThongKe(item.tiepNhan) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.chuaSoHoaTPHS ? getCurrencyThongKe(item.chuaSoHoaTPHS) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.coSoHoaTPHS ?
                              getCurrencyThongKe(item.coSoHoaTPHS) : (
                                "0"
                              )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.coTaiSuDungTPHS ? getCurrencyThongKe(item.coTaiSuDungTPHS) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.coTaiSuDungTPHSTuDvcQg ? getCurrencyThongKe(item.coTaiSuDungTPHSTuDvcQg) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'center'
                            }}
                          >
                            <span>
                              {item?.coSoHoaTPHS &&
                                item?.tiepNhan &&
                                item?.coSoHoaTPHS / item?.tiepNhan > 0
                                ? Math.round(
                                  (item.coSoHoaTPHS / item.tiepNhan) * 100 * 100
                                ) /
                                100 +
                                "%"
                                : "0"}
                            </span>
                          </td>

                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.daGiaiQuyet ? getCurrencyThongKe(item.daGiaiQuyet) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.daGiaiQuyetChuaSoHoa ? getCurrencyThongKe(item.daGiaiQuyetChuaSoHoa) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'right'
                            }}
                          >
                            {item.daGiaiQuyetDaSoHoa ? getCurrencyThongKe(item.daGiaiQuyetDaSoHoa) : (
                              "0"
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'center'
                            }}
                          >
                            <span>
                              {item?.daGiaiQuyet &&
                                item?.daGiaiQuyetDaSoHoa &&
                                item?.daGiaiQuyetDaSoHoa / item?.daGiaiQuyet > 0
                                ? Math.round(
                                  (item.daGiaiQuyetDaSoHoa / item.daGiaiQuyet) *
                                  100 *
                                  100
                                ) /
                                100 +
                                "%"
                                : "0"}
                            </span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'center'
                            }}
                          >
                            <span>
                              {item?.coSoHoaTPHS && item?.tiepNhan ? (
                                item?.coSoHoaTPHS / item?.tiepNhan > 0 &&
                                  item?.coSoHoaTPHS / item?.tiepNhan < 0.8 ? (
                                  <span style={{ color: "#E91313" }}>
                                    Không đạt
                                  </span>
                                ) : (
                                  <span style={{ color: "#0958d9" }}>Đạt </span>
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'center'
                            }}
                          >
                            {item?.daGiaiQuyet && item?.daGiaiQuyetDaSoHoa ? (
                              item?.daGiaiQuyetDaSoHoa / item?.daGiaiQuyet > 0 &&
                                item?.daGiaiQuyetDaSoHoa / item?.daGiaiQuyet <
                                0.8 ? (
                                <span style={{ color: "#E91313" }}>
                                  Không đạt
                                </span>
                              ) : (
                                <span style={{ color: "#0958d9" }}>Đạt </span>
                              )
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  <CountDataMucDoSoHoa data={dataThongKe.data} />
                </tbody>
              </table>
            </div>
            {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
              <HoSoTheoChiTieuSoHoaWrapper />
            ) : null}
          </div>
        </Spin>
      </AntdSpace>
    </div>
  );
};

const MucDoSoHoaSwapper = () => {
  return (
    <HoSoTheoBaoCaoTongHopProvider>
      <MucDoSoHoa />
    </HoSoTheoBaoCaoTongHopProvider>
  );
};
export default MucDoSoHoaSwapper;



export const CountDataMucDoSoHoa = ({
  data,
}: {
  data: IThongKeChiTieuSoHoaElement[] | undefined;
}) => {
  const [tiepNhanTotal, chuaSoHoaTPHSTotal, coSoHoaTPHSTotal, coTaiSuDungTPHSTotal,
    coTaiSuDungTPHSTuDvcQgTotal, daGiaiQuyetTotal, daGiaiQuyetChuaSoHoaTotal, daGiaiQuyetDaSoHoaTotal,

  ] = useMemo(() => {

    let tiepNhanTotal = 0, chuaSoHoaTPHSTotal = 0, coSoHoaTPHSTotal = 0, coTaiSuDungTPHSTotal = 0,
      coTaiSuDungTPHSTuDvcQgTotal = 0, daGiaiQuyetTotal = 0, daGiaiQuyetChuaSoHoaTotal = 0, daGiaiQuyetDaSoHoaTotal = 0


    data?.forEach((item: IThongKeChiTieuSoHoaElement) => {
      tiepNhanTotal += item.tiepNhan || 0
      chuaSoHoaTPHSTotal += item.chuaSoHoaTPHS || 0
      coSoHoaTPHSTotal += item.coSoHoaTPHS || 0
      coTaiSuDungTPHSTotal += item.coTaiSuDungTPHS || 0
      coTaiSuDungTPHSTuDvcQgTotal += item.coTaiSuDungTPHSTuDvcQg || 0
      daGiaiQuyetTotal += item.daGiaiQuyet || 0
      daGiaiQuyetChuaSoHoaTotal += item.daGiaiQuyetChuaSoHoa || 0
      daGiaiQuyetDaSoHoaTotal += item.daGiaiQuyetDaSoHoa || 0

    })



    return [tiepNhanTotal, chuaSoHoaTPHSTotal, coSoHoaTPHSTotal, coTaiSuDungTPHSTotal,
      coTaiSuDungTPHSTuDvcQgTotal, daGiaiQuyetTotal, daGiaiQuyetChuaSoHoaTotal, daGiaiQuyetDaSoHoaTotal];
  }, [data]);



  return (
    <tr>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
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
          fontWeight: 600
        }}
      >
        Tổng số
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(tiepNhanTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(chuaSoHoaTPHSTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(coSoHoaTPHSTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(coTaiSuDungTPHSTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(coTaiSuDungTPHSTuDvcQgTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        <span>
          {coSoHoaTPHSTotal &&
            tiepNhanTotal &&
            coSoHoaTPHSTotal / tiepNhanTotal > 0
            ? Math.round(
              (coSoHoaTPHSTotal / tiepNhanTotal) * 100 * 100
            ) /
            100 +
            "%"
            : "0"}
        </span>
      </td>

      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(daGiaiQuyetTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {
          getCurrencyThongKe(daGiaiQuyetChuaSoHoaTotal)
        }
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        {getCurrencyThongKe(daGiaiQuyetDaSoHoaTotal)}
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        <span>
          {daGiaiQuyetTotal &&
            daGiaiQuyetDaSoHoaTotal &&
            daGiaiQuyetDaSoHoaTotal / daGiaiQuyetTotal > 0
            ? Math.round(
              (daGiaiQuyetDaSoHoaTotal / daGiaiQuyetTotal) *
              100 *
              100
            ) /
            100 +
            "%"
            : "0"}
        </span>
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        <span>
          {coSoHoaTPHSTotal && tiepNhanTotal ? (
            coSoHoaTPHSTotal / tiepNhanTotal > 0 &&
              coSoHoaTPHSTotal / tiepNhanTotal < 0.8 ? (
              <span style={{ color: "#E91313" }}>
                Không đạt
              </span>
            ) : (
              <span style={{ color: "#0958d9" }}>Đạt </span>
            )
          ) : (
            ""
          )}
        </span>
      </td>
      <td
        style={{
          verticalAlign: "middle",
          padding: "5px",
          border: "1px solid #333",
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        {daGiaiQuyetTotal && daGiaiQuyetDaSoHoaTotal ? (
          daGiaiQuyetDaSoHoaTotal / daGiaiQuyetTotal > 0 &&
            daGiaiQuyetDaSoHoaTotal / daGiaiQuyetTotal <
            0.8 ? (
            <span style={{ color: "#E91313" }}>
              Không đạt
            </span>
          ) : (
            <span style={{ color: "#0958d9" }}>Đạt </span>
          )
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}