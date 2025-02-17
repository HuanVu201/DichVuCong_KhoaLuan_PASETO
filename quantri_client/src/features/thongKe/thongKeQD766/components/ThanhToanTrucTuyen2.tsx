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
import { useEffect, useState } from "react";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchThanhToanTrucTuyenNew } from "../redux/action";
import { IThongKeTTTTResponse } from "../models/ThongKe766Response";
import { TinhDiemDVC } from "../constant/DiemToiDaDVCTT";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import { BaoCaoTongHopProvider } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import { SearchThongKeTheoKhungTg } from "./SearchThongKeTheoKhungTg";
import { SearchBaoCaoTongHop } from "../../ThongKeTheoDonVi/components/SearchBaoCaoTongHop";
import { getCurrencyThongKe } from "@/utils";

const ThanhToanTrucTuyenNew = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() =>
            downloadPhieuExcel(
              "Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh"
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
  const [dataThongKe, setDataThongKe] = useState<IThongKeTTTTResponse>({
    data: [],
  });
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (value: any) => {
    setLoading(true);
   
    var res = await dispatch(SearchThanhToanTrucTuyenNew(searchParams)).unwrap();
    if (res) {
      setDataThongKe(res);
      setLoading(false);
    }
  };

  return (
    <div className="thongKeSwapper">
      <div className="headerThongKe">
        <div className="title">
          <h6>THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ</h6>
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
            <SearchBaoCaoTongHop
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
                fontSize: "13px",
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
                      colSpan={8}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                      }}
                    >
                      <strong>
                        THEO DÕI THANH TOÁN TRỰC TUYẾN - THEO
                        QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                      </strong>
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={8}
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
                      style={{
                        verticalAlign: "middle",
                        textAlign: "left",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Đơn vị</strong>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                        border: "1px solid #333",
                      }}
                    >
                      <strong>Số lượng thủ tục có phí, lệ phí</strong>
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
                        Số lượng thủ tục có phí, lệ phí phát sinh hồ sơ
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
                      <strong>Số lượng thủ tục có phát sinh thanh toán</strong>
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
                        Số lượng thủ tục có phát sinh thanh toán trực tuyến
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
                      <strong>
                        Tổng số hồ sơ thuộc các thủ tục có phí, lệ phí
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
                      <strong>
                        Số hồ sơ được thanh toán trực tuyến thuộc các thủ tục có
                        phí, lệ phí
                      </strong>
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
                            }}
                          >
                            <span>Số lượng: {getCurrencyThongKe(item.thuTucCoPhi) }</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>Số lượng: {getCurrencyThongKe(item.thuTucCoPhiPhatSinhHoSo)}</span>
                            <br />
                            <span>
                              Tỷ lệ:{" "}
                              {item.thuTucCoPhiPhatSinhHoSo / item.thuTucCoPhi > 0
                                ? Math.round(
                                    (item.thuTucCoPhiPhatSinhHoSo /
                                      item.thuTucCoPhi) *
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
                            }}
                          >
                            <span>Số lượng: {getCurrencyThongKe(item.thuTucPhatSinhThanhToan)}</span>
                            <br />
                            <span>
                              Tỷ lệ:{" "}
                              {item.thuTucPhatSinhThanhToan / item.thuTucCoPhi > 0
                                ? Math.round(
                                    (item.thuTucPhatSinhThanhToan /
                                      item.thuTucCoPhi) *
                                      100 *
                                      100
                                  ) /
                                    100 +
                                  "%"
                                : "0"}
                            </span>
                            <br />
                            <strong>
                              Điểm số:{" "}
                              {TinhDiemDVC(
                                item.thuTucPhatSinhThanhToan / item.thuTucCoPhi,
                                "THU_TUC_PHAT_SINH_THANH_TOAN"
                              )}
                            </strong>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>Số lượng: {getCurrencyThongKe(item.thuTucPhatSinhTTTT)}</span>
                            <br />
                            <span>
                              Tỷ lệ:{" "}
                              {item.thuTucPhatSinhTTTT / item.thuTucCoPhi > 0
                                ? Math.round(
                                    (item.thuTucPhatSinhTTTT / item.thuTucCoPhi) *
                                      100 *
                                      100
                                  ) /
                                    100 +
                                  "%"
                                : "0"}
                            </span>
                            <br />
                            <strong>
                              Điểm số:{" "}
                              {TinhDiemDVC(
                                item.thuTucPhatSinhTTTT / item.thuTucCoPhi,
                                "THU_TUC_PHAT_SINH_TTTT"
                              )}
                            </strong>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>Số lượng: {getCurrencyThongKe(item.hoSoThuocThuTucCoPhi)}</span>
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              padding: "5px",
                              border: "1px solid #333",
                            }}
                          >
                            <span>
                              Số lượng: {getCurrencyThongKe(item.hoSoThuocThuTucCoPhiDaTTTT)}
                            </span>
                            <br />
                            <span>
                              Tỷ lệ:{" "}
                              {item.hoSoThuocThuTucCoPhiDaTTTT /
                                item.thuTucCoPhi >
                              0
                                ? Math.round(
                                    (item.hoSoThuocThuTucCoPhiDaTTTT /
                                      item.thuTucCoPhi) *
                                      100 *
                                      100
                                  ) /
                                    100 +
                                  "%"
                                : "0"}
                            </span>
                            <br />
                            <strong>
                              Điểm số:{" "}
                              {TinhDiemDVC(
                                item.hoSoThuocThuTucCoPhiDaTTTT /
                                  item.thuTucCoPhi,
                                "HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT"
                              )}
                            </strong>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
                <HoSoTheoBaoCaoTongHopWrapper />
              ) : null}
            </div>
          </Spin>
        </AntdSpace>
      </div>
    </div>
  );
};

const ThanhToanTrucTuyen2Swapper = () => {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThanhToanTrucTuyenNew />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
};
export default ThanhToanTrucTuyen2Swapper;
