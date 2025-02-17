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
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { SearchHoSoQuaHan } from "./SearchHoSoQuaHan";
const ThanhToanTrucTuyenNew = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() => {
            downloadPhieuWord("Bảng thống kê hồ sơ quá hạn");
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

  const [totalTk, setTotalTk] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
  const [searchHoSoParams, setSearchHoSoParams] =
    useState<ISearchHoSoTheoTrangThaiXuLy>({ TrangThaiXuLy: "daxulyquahan" });
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
    if (searchHoSoParams.TuNgay && searchHoSoParams.DenNgay)
      dispatch(SearchHoSoTheoTrangThaiXuLy(searchHoSoParams));
  }, [searchHoSoParams]);
  return (
    <div className="thongKeSwapper">
      <div className="headerThongKe">
        <div className="title">
          <h6>THỐNG KÊ HỒ SƠ QUÁ HẠN CÁC ĐƠN VỊ</h6>
        </div>
        <div className="actionButtons">
          <button className="btnThongKe" onClick={() => onFinish(searchParams)}>
            <span className="icon">
              <SearchOutlined />
            </span>
            <span>Thống kê</span>
          </button>
          <div className="btnXuatBaoCao">
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
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}>
          <SearchHoSoQuaHan
            setSearchParams={setSearchParams}
            resetSearchParams={() => {
              setSearchParams({});
            }}
            onFinish={onFinish}
          />

          <div
            id="ContainerSwapper"
            style={{
              fontSize: "13px",
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            <table
              id="table"
              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                fontSize: "13px",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              {/* <thead> */}
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

              {/* </thead> */}
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
                        <span>{item.tongSo}</span>
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
                    colSpan={2}
                  >
                    <strong>TỔNG CỘNG</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                    colSpan={2}
                  >
                    <strong>{totalTk}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              id="tableHoSo"
              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                fontSize: "13px",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              {/* <thead> */}
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
                  <strong>Đơn vị tiếp nhận</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Lĩnh vực</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Tên thủ tục hành chính</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Mã hồ sơ</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Trạng thái</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Địa chỉ</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Chủ hồ sơ</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Ngày nhận</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Ngày hẹn trả</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Ngày kết thúc xử lý</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Đơn vị/ cá nhân giải quyết quá hạn</strong>
                </td>
              </tr>

              {/* </thead> */}
              <tbody id="data">
                {hoSos?.map((item, index) => {
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
                          minWidth: "30%",
                        }}
                      >
                        <span>{item.tenTTHC}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
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
                        }}
                      >
                        <span>{item.ngayTiepNhan}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>{item.ngayHenTra}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>{item.ngayTra}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        {item.nguoiXuLyQuaHans?.map((d, i) => {
                          return (
                            <p>
                              {i + 1}. {d.tenDonViGui} - {d.tenNguoiGui}
                            </p>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Spin>
      </AntdSpace>
    </div>
  );
};

const ThanhToanTrucTuyen2Swapper = () => {
  return ThanhToanTrucTuyenNew;
};
export default ThanhToanTrucTuyen2Swapper();
