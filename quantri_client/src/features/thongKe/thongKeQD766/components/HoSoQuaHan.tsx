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
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchThongKe } from "./SearchThongKe";
import { Value } from "sass";
import { useEffect, useState } from "react";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { TinhDiemDVC } from "../constant/DiemToiDaDVCTT";
import { ThongKeHoSoQuaHan } from "../../thongKeHoSoTrucTuyen/redux/action";
import { IThongKeHoSoQuaHanResponse } from "../../thongKeHoSoTrucTuyen/models/ThongKeHoSoQuaHanResponse";
import { ISearchHoSoTheoTrangThaiXuLy } from "@/features/hoso/models/searchHoSoTheoTrangThaiXuLy";
import { useColumn } from "../hooks/useColumnTkHoSoQuaHan";
import { SearchHoSoTheoTrangThaiXuLy } from "@/features/hoso/redux/action";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { SearchHoSoQuaHan } from "./SearchHoSoQuaHan";
import dayjs from "dayjs";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import { getCurrencyThongKe } from "@/utils";
import { XuatBaoCaoHoSoQuaHanTable } from "./exportElements/XuatBaoCaoHoSoQuaHan";
const ThanhToanTrucTuyenNew = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() => {
            export2Word("Bảng thống kê hồ sơ quá hạn", true, "ContainerSwapper");
          }}
          style={{ border: "none", background: "inherit" }}
        >
          <FileWordOutlined style={{ color: "#36a3f7" }} /> In file word
        </button>
      ),
      key: "word",
    },
    // {
    //   label: (
    //     <button
    //       onClick={() => {
    //         export2Word("Bảng thống kê hồ sơ quá hạn", true, "ContainerSwapper1");
    //       }}
    //       style={{ border: "none", background: "inherit" }}
    //     >
    //       <FileWordOutlined style={{ color: "#36a3f7" }} /> In danh sách
    //     </button>
    //   ),
    //   key: "word",
    // },
    // {
    //   label: (
    //     <button
    //       style={{ border: "none", background: "inherit" }}
    //       onClick={() => downloadPhieuExcel("Bảng thống kê hồ sơ quá hạn")}
    //     >
    //       <FileExcelOutlined style={{ color: "green" }} /> In file excel
    //     </button>
    //   ),
    //   key: "excel",
    // },
  ];

  const dispatch = useAppDispatch();
  const {
    hoSoTheoTrangThais: hoSos,
    count: countHoSo,
    loading: loadingHoSo,
  } = useAppSelector((state) => state.hoso);
  const {
    TkHoSoQuaHans: dataThongKe,
    count,
    loading,
  } = useAppSelector((state) => state.thongKeTiepNhanHoSoTrucTuyen);
  const [userData, setUserData] = useState<IParseUserToken>();
  const { data: auth } = useAppSelector((state) => state.auth);
  const [totalTk, setTotalTk] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
  const [searchHoSoParams, setSearchHoSoParams] =
    useState<ISearchHoSoTheoTrangThaiXuLy>({
      TrangThaiXuLy: "quahan",
    });
  useEffect(() => {
    if (auth) {
      var user = parseJwt(auth.token) as IParseUserToken;

      setUserData(user);
    }
  }, [auth]);
  const onFinish = async (value: ISearchThongKeParams) => {
    var res = await dispatch(ThongKeHoSoQuaHan(value)).unwrap();
    setSearchHoSoParams({
      ...searchParams,
    });
  };

  useEffect(() => {
    (async () => {
      var tmp = 0;
      await dataThongKe?.data.map((item) => {
        tmp += item.tongSo;
      });
      setTotalTk(tmp);
    })();
  }, [dataThongKe]);
  useEffect(() => {
    if (userData) {
      if (
        searchHoSoParams.TuNgay &&
        searchHoSoParams.DenNgay &&
        searchHoSoParams.TrangThaiXuLy
      )
        dispatch(
          SearchHoSoTheoTrangThaiXuLy({
            ...searchParams,
            maDinhDanhCha: searchParams.maDinhDanhCha,
          })
        );
    }
  }, [searchHoSoParams, userData]);
  return (
    <div className="thongKeSwapper">

      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
          }
        >
          <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Thống kê hồ sơ quá hạn các đơn vị</div>
          <SearchHoSoQuaHan
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            resetSearchParams={() => {
              setSearchParams({});
            }}
            onFinish={onFinish}
            items={items}
          />
          <div className="table-responsive">
            <div
              id="ContainerSwapper"
              className="ContainerSwapper"
              style={{
                fontSize: "13px",
              }}
            >
              <Spin spinning={loading}>

                <table

                  style={{
                    verticalAlign: "middle",
                    borderCollapse: "collapse",
                    width: "100%",
                    textAlign: "center",
                    margin: "10px 0",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          padding: "5px",
                        }}
                      >
                        <strong>
                          PHỤ LỤC I: DANH SÁCH CÁC CƠ QUAN, ĐƠN VỊ GIẢI QUYẾT TTHC QUÁ
                          HẠN
                        </strong>
                      </td>
                    </tr>
                  </thead>
                </table>
                <table
                  id="table"
                  style={{
                    verticalAlign: "middle",
                    borderCollapse: "collapse",
                    width: "100%",
                    textAlign: "center",
                    margin: "10px 0",
                    fontSize: "13px",
                  }}
                >
                  <thead>

                    <tr>
                      <td
                        colSpan={8}
                        style={{ verticalAlign: "middle", padding: "5px" }}
                      >
                        <strong></strong>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <strong>STT</strong>
                      </td>

                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <strong>Đơn vị</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <strong>Số hồ sơ quá hạn</strong>
                      </td>
                    </tr>

                  </thead>
                  <tbody id="data">
                    {dataThongKe?.data.map((item, index) => {
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
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: 'left'
                            }}
                          >
                            {item.tenThongKe}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>{getCurrencyThongKe(item.tongSo)}</span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <strong></strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: 'left'
                        }}
                      >
                        <strong>TỔNG CỘNG</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}

                      >
                        <strong>{getCurrencyThongKe(totalTk)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Spin>
              <Spin spinning={loadingHoSo}>

                <table

                  style={{
                    verticalAlign: "middle",
                    borderCollapse: "collapse",
                    width: "100%",
                    textAlign: "center",
                    margin: "10px 0",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr>
                      <td colSpan={8} style={{ textAlign: "left", padding: "5px" }}>
                        <strong>
                          PHỤ LỤC II: DANH SÁCH ĐƠN VỊ, CÁ NHÂN CẤP TỈNH, HUYỆN, XÃ
                          GIẢI QUYẾT HỒ SƠ QUÁ HẠN
                        </strong>
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan={8}
                        style={{ verticalAlign: "middle", padding: "5px" }}
                      >
                        <strong></strong>
                      </td>
                    </tr>
                  </thead>
                </table>
                <table
                  id="tableHoSo"
                  style={{
                    verticalAlign: "middle",
                    borderCollapse: "collapse",
                    width: "100%",


                    fontSize: "13px",
                  }}
                >
                  <thead>

                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "3%"
                        }}
                      >
                        <strong>STT</strong>
                      </td>

                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "7%"
                        }}
                      >
                        <strong>Đơn vị tiếp nhận</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "15%"
                        }}
                      >
                        <strong>Lĩnh vực</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "15%"
                        }}
                      >
                        <strong>Tên thủ tục hành chính</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "5%"
                        }}
                      >
                        <strong>Mã hồ sơ</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "5%"
                        }}
                      >
                        <strong>Trạng thái</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "10%"
                        }}
                      >
                        <strong>Địa chỉ</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "5%"
                        }}
                      >
                        <strong>Chủ hồ sơ</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "5%"
                        }}
                      >
                        <strong>Ngày nhận</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "5%"
                        }}
                      >
                        <strong>Ngày hẹn trả</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "5%"
                        }}
                      >
                        <strong>Ngày kết thúc xử lý</strong>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "center",
                          width: "10%"
                        }}
                      >
                        <strong>Đơn vị/ cá nhân giải quyết quá hạn</strong>
                      </td>
                    </tr>

                  </thead>
                  <tbody id="data">
                    {hoSos?.map((item, index) => {
                      return (
                        <tr>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: "center"
                            }}
                          >
                            {index + 1}
                          </td>

                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>{item.groupName}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>{item.linhVucChinh}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",

                            }}
                          >
                            <span>{item.tenTTHC}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: "center"
                            }}
                          >
                            <span>{item.maHoSo}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>{item.tenTrangThaiHoSo}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>{item.diaChiChuHoSo}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>{item.chuHoSo}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: "center"
                            }}
                          >
                            <span>
                              {item.ngayTiepNhan
                                ? dayjs(item.ngayTiepNhan).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )
                                : ""}
                            </span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: "center"
                            }}
                          >
                            <span>
                              {item.ngayHenTra
                                ? dayjs(item.ngayHenTra).format("DD/MM/YYYY")
                                : ""}
                            </span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                              textAlign: "center"
                            }}
                          >
                            {item.ngayKetThucXuLy
                              ? dayjs(item.ngayKetThucXuLy).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )
                              : ""}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            {item.nguoiXuLyQuaHans?.map((d: any, i: any) => {
                              if (d?.tenNguoiGui && d?.tenDonViGui) {
                                return (
                                  <p>
                                    {i + 1}. {d.tenDonViGui} - {d.tenNguoiGui}
                                  </p>
                                );
                              } else if (d?.tenNguoiGui) {
                                return (
                                  <p>
                                    {i + 1}. {d.tenNguoiGui}
                                  </p>
                                );
                              }
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Spin>
            </div>
          </div>
          {/* <XuatBaoCaoHoSoQuaHanTable searchParams={searchParams}
            tuNgay={searchParams.tuNgay ? dayjs(searchParams.tuNgay).format('DD/MM/YYYY') : undefined}
            denNgay={searchParams.denNgay ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') : undefined}
            userData={userData} /> */}
        </Spin>
      </AntdSpace>
    </div>
  );
};

const ThanhToanTrucTuyen2Swapper = () => {
  return ThanhToanTrucTuyenNew;
};
export default ThanhToanTrucTuyen2Swapper();
