import { Dropdown, MenuProps, Row, SelectProps, Space, Spin } from "antd";
import "../../../ThongKe.scss";
import {
  DownOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  LoadingOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { Value } from "sass";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from "dayjs";
import { ISearchHoSoTheoTrangThaiXuLy } from "@/features/hoso/models/searchHoSoTheoTrangThaiXuLy";
import {
  SearchHoSoTheoTrangThaiXuLy,
  SearchHoSoTiepNhanQuaHan,
} from "@/features/hoso/redux/action";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { ISearchThongKeParams } from "@/features/thongKe/thongKeQD766/models/ThongKeQD766Search";
import { SearchSoTheoDoiHoSo } from "../SearchSoTheoDoiHoSo";
import { ISearchHoSoTiepNhanQuaHan } from "@/features/thongKe/thongKeQD766/models/ThongKeHoSoTiepNhanQuaHan";
import { FORMAT_DATE } from "@/data";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import { SearchThongKeHoSoTiepNhanQuaHan } from "./SearchThongKeTiepNhanHoSoQuaHan";
import { XuatBaoCaoHoSoTiepNhanQuaHanModal } from "../exportElements/XuatBaoCaoHoSoTiepNhanQuaHan";

const ThongKeHoSoTiepNhanQuaHan = () => {
  const buttonActionContext = useButtonActionContext();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();

  const itemsThaoTac: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
    ],
    []
  );
  const dispatch = useAppDispatch();
  const {
    hoSoTiepNhanQuaHans: hoSos,

    loading: loadingHoSo,
  } = useAppSelector((state) => state.hoso);

  const [totalTk, setTotalTk] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<ISearchHoSoTiepNhanQuaHan>(
    {}
  );
  const [searchHoSoParams, setSearchHoSoParams] =
    useState<ISearchHoSoTiepNhanQuaHan>({});
  const onFinish = async () => {
    // var res = await dispatch(ThongKeSoTheoDoiHoSo(value)).unwrap();
    var postData = {
      ...searchParams,
      tiepNhanTuNgay: searchParams.tiepNhanTuNgay ? dayjs(searchParams.tiepNhanTuNgay).format("YYYY-MM-DD") : undefined,
      tiepNhanDenNgay: searchParams.tiepNhanDenNgay ? dayjs(searchParams.tiepNhanDenNgay).format("YYYY-MM-DD") : undefined,
    }

    dispatch(SearchHoSoTiepNhanQuaHan(postData));
  };

  return (
    <div className="thongKeSwapper table-responsive">

      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        <h6>THỐNG KÊ HỒ SƠ TIẾP NHẬN QUÁ HẠN CÁC ĐƠN VỊ</h6>
      </div>


      <LazyActions
        setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchParams}
      >
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <Spin
            spinning={loadingHoSo}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 50, color: "#f0ad4e" }}
                spin
              />
            }
          >
            <SearchThongKeHoSoTiepNhanQuaHan
              setSearchParams={setSearchParams}
              resetSearchParams={() => {
                setSearchParams({});
              }}
              onFinish={onFinish}

              items={[]}
            />

            <div
              id="ContainerSwapper"
              className="table-responsive"
              style={{
                fontSize: "16px",
              }}
            >
              <table
                id="tableHoSo"
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
                {/* <tr>
                <td colSpan={8} style={{ textAlign: "left", padding: "5px" }}>
                  <strong>
                    PHỤ LỤC II: DANH SÁCH ĐƠN VỊ, CÁ NHÂN CẤP TỈNH, HUYỆN, XÃ
                    GIẢI QUYẾT HỒ SƠ QUÁ HẠN
                  </strong>
                </td>
              </tr> */}

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
                    <strong>Người tiếp nhận</strong>
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
                    <strong>Ngày nộp hồ sơ</strong>
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
                    <strong>Thao tác</strong>
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
                            textAlign: "left",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.tenDonVi}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "left",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.tenNguoiNhanHoSo}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.tenTTHC}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.maHoSo}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.tenTrangThaiHoSo}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.diaChiChuHoSo}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.chuHoSo}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.ngayNopHoSo
                            ? dayjs(item.ngayNopHoSo).format(FORMAT_DATE)
                            : ""}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {item?.ngayTiepNhan
                            ? dayjs(item.ngayTiepNhan).format(FORMAT_DATE)
                            : ""}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                          }}
                        >
                          {itemsThaoTac?.map((thaoTac, indexThaoTac) => {
                            return (
                              <span
                                key={indexThaoTac}
                                onClick={(e) => {
                                  e.preventDefault();
                                  buttonActionContext.setSelectedHoSos([
                                    item.id ?? "",
                                  ]);
                                }}
                              >
                                {thaoTac.icon}
                              </span>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <XuatBaoCaoHoSoTiepNhanQuaHanModal data={hoSos} />
          </Spin>
        </AntdSpace>
      </LazyActions>
    </div>
  );
};

const ThongKeHoSoTiepNhanQuaHanSwapper = () => {
  return (
    <HoSoTheoBaoCaoTongHopProvider>
      <ButtonActionProvider>
        <ThongKeHoSoTiepNhanQuaHan />
      </ButtonActionProvider>
    </HoSoTheoBaoCaoTongHopProvider>
  );
};
export default ThongKeHoSoTiepNhanQuaHanSwapper;
