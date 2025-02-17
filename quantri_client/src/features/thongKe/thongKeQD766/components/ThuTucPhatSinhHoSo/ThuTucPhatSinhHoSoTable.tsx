import React, { useEffect } from "react";
import { Dropdown, MenuProps, Row, SelectProps, Space, Spin } from "antd";
import {
  DownOutlined,
  FileExcelOutlined,
  LoadingOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AntdSpace } from "@/lib/antd/components";

import { Value } from "sass";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";

import { Link } from "react-router-dom";
import {
  ThuTucProvider,
  useThuTucContext,
} from "@/features/thutuc/contexts/ThuTucContext";
import { ThuTucTheoBaoCaoTongHopWrapper } from "@/features/thutuc/components/ThuTucTheoBaoCaoTongHopTable";
import { SearchThongKeBaoCaoTTHC } from "../SearchThongKeBaoCaoTTHC";
import { ISearchThongKe766TTHCParams } from "../../models/ThongKe766TTHCModels";
import { TongHopTTHC } from "../../redux/action";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          downloadPhieuExcel("Bảng thống kê thủ tục phát sinh hồ sơ")
        }
      >
        <FileExcelOutlined style={{ color: "green" }} /> In file excel
      </button>
    ),
    key: "excel",
  },
];

const ThongKeThuTucPhatSinhHoSo = () => {
  const dispatch = useAppDispatch();
  const thuTucContext = useThuTucContext();
  const [searchParams, setSearchParams] = useState<ISearchThongKe766TTHCParams>(
    {}
  );
  const { TongHopTTHCs: dataThongKe, loading } = useAppSelector(
    (state) => state.ThongKeQD766
  );

  const onFinish = async (value: ISearchThongKe766TTHCParams) => {
    var res: any = await dispatch(TongHopTTHC(value)).unwrap();
  };
  const getElementThongKe = (data: any) => {
    return (
      <>
        {data.map((item: any, index: number) => {
          return (
            <>
              <tr>
                <td
                  rowSpan={item.children.length + 1}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                    paddingLeft: "10px",
                  }}
                >
                  {item.tenDonVi}
                </td>
              </tr>

              {item.children.map((child: any) => {
                return (
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        padding: "5px",
                        border: "1px solid #333",
                        width: "20%",
                      }}
                    >
                      {child?.tenLinhVuc}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tongTTHC ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tongTTHC",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tongTTHC}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcTrucTuyenToanTrinh ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tthcTrucTuyenToanTrinh",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tthcTrucTuyenToanTrinh}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcTrucTuyenMotPhan ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tthcTrucTuyenMotPhan",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tthcTrucTuyenMotPhan}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcConLai ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tthcConLai",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tthcConLai}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tongTTHCThuPhi ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tongTTHCThuPhi",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tongTTHCThuPhi}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcThuPhiTrucTuyenToanTrinh ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tthcThuPhiTrucTuyenToanTrinh",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tthcThuPhiTrucTuyenToanTrinh}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcThuPhiTrucTuyenMotPhan ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tthcThuPhiTrucTuyenMotPhan",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tthcThuPhiTrucTuyenMotPhan}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      {child?.tthcThuPhiConLai ? (
                        <Link
                          to={""}
                          onClick={() => {
                            thuTucContext.setThuTucTheoBaoCaoTongHopModalVisible(
                              true
                            );
                            thuTucContext.setSearchThuTucTheoBaoCaoTongHopParams(
                              {
                                pageNumber: 1,
                                pageSize: 20,
                                tieuChi: "tthcThuPhiConLai",
                                groupCode: child?.maDonVi,
                                maLinhVuc: child?.malinhVuc,
                                catalog: child?.catalog,
                              }
                            );
                          }}
                        >
                          {" "}
                          {child?.tthcThuPhiConLai}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                  </tr>
                );
              })}
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="thongKeSwapper">
      <div className="headerThongKe">
        <div className="title">
          <h6>THỐNG KÊ THỦ TỤC HÀNH CHÍNH PHÁT SINH HỒ SƠ</h6>
        </div>
        <div className="actionButtons">
          <button className="btnThongKe" onClick={() => onFinish(searchParams)}>
            <span className="icon">
              <SearchOutlined />
            </span>
            <span>Thống kê</span>
          </button>
          <div className="btnXuatBaoCao" style={{display: items.length > 0 ? '' : 'none'}}>
            <span className="icon">
              <PrinterOutlined />
            </span>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  In báo cáo
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
            }
          >
            <SearchThongKeBaoCaoTTHC
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
                {/* <thead> */}
                <tr>
                  <td
                    colSpan={11}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <strong>BẢNG THỐNG KÊ THỦ TỤC HÀNH CHÍNH</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={11}></td>
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      fontSize: "17px",
                      width: "20%",
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
                      fontSize: "17px",
                      width: "20%",
                    }}
                  >
                    <strong>Thủ tục hành chính</strong>
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      fontSize: "17px",
                    }}
                  >
                    <strong>Mức độ</strong>
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      fontSize: "17px",
                    }}
                  >
                    <strong>Số lượng hồ sơ tiếp nhận</strong>
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
                      fontSize: "17px",
                    }}
                  >
                    <strong>Qua mạng</strong>
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      fontSize: "17px",
                    }}
                  >
                    <strong>Qua bưu chính</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      fontSize: "17px",
                    }}
                  >
                    <strong>Trực tiếp</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",
                      fontSize: "17px",
                    }}
                  >
                    <strong>Tổng số</strong>
                  </td>
                </tr>
                {/* </thead> */}
                <tbody id="data"></tbody>
              </table>
            </div>
          </Spin>
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
        </AntdSpace>
      </div>
    </div>
  );
};

const ThongKeThuTucPhatSinhHoSoSwapper = () => (
  <ThuTucProvider>
    <ThongKeThuTucPhatSinhHoSo />
  </ThuTucProvider>
);

export default ThongKeThuTucPhatSinhHoSoSwapper;
