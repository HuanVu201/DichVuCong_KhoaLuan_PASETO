import React, { useEffect, useMemo } from "react";
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
import { useState } from "react";

import {
  SearchThanhToanTrucTuyenNew,
  SearchTienDoGiaiQuyetNew,
  TongHopTTHC,
} from "../redux/action";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import {
  ISearchThongKe766TTHCParams,
  IThongKe766TTHCElement,
  IThongKe766TTHCResponse,
} from "../models/ThongKe766TTHCModels";
import { SearchThongKeBaoCaoTTHC } from "./SearchThongKeBaoCaoTTHC";
import { Link } from "react-router-dom";
import {
  ThuTucProvider,
  useThuTucContext,
} from "@/features/thutuc/contexts/ThuTucContext";
import { ThuTucTheoBaoCaoTongHopWrapper } from "@/features/thutuc/components/ThuTucTheoBaoCaoTongHopTable";
import { getCurrencyThongKe } from "@/utils";
import { XuatThongKeTongHopThuTuc } from "./exportElements/XuatThongKeTongHopThuTuc";
import { XuatDanhSachDonViThuTucTheoMucDoTable } from "./exportElements/XuatDanhSachDonViThuTucTheoMucDo";
import { export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
var Template = (index: number, name: string) => {
  return (
    <tr>
      <td colSpan={10}
        style={{
          verticalAlign: "middle",
          textAlign: "left",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "17px",
          fontFamily: "Times New Roman, Times, serif;",
        }}
      >
        <strong>{name}</strong>
      </td>

    </tr>
  );
};
const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          downloadPhieuExcel(
            "Bảng thống kê thủ tục hành chính", "tableToExcel2"
          )
        }
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
            "TỔNG HỢP SỐ LƯỢNG DỊCH VỤ CÔNG TRỰC TUYẾN", true, "ContainerSwapper2"
          )
        }
      >
        <FileWordOutlined style={{ color: "blue" }} /> Báo cáo số lượng DVC trực tuyến
      </button>
    ),
    key: "world",
  },
];
export interface IThongKeTongHopThuTucElement {
  maDonVi: string;
  tenDonVi: string;
  children: IThongKe766TTHCElement[];
}
const ThongKeTongHopThuTuc = () => {
  const dispatch = useAppDispatch();
  const thuTucContext = useThuTucContext();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const [groupCode, setGroupCode] = useState<string>()
  const [firstAccess, setFirstAccess] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<ISearchThongKe766TTHCParams>(
    {}
  );
  const { TongHopTTHCs: dataThongKe, loading } = useAppSelector(
    (state) => state.ThongKeQD766
  );
  const [dataCapSo, setDataCapSo] = useState<IThongKeTongHopThuTucElement[]>(
    []
  );
  const [dataCapHuyen, setDataCapHuyen] = useState<
    IThongKeTongHopThuTucElement[]
  >([]);
  const [dataCapXa, setDataCapXa] = useState<IThongKeTongHopThuTucElement[]>(
    []
  );
  const onFinish = async (value: any) => {
    setGroupCode(value.groupCode)
    var res: any = await dispatch(TongHopTTHC(value)).unwrap();
  };
  const getElementThongKe = (data: IThongKeTongHopThuTucElement[]) => {
    return (
      <>
        {data.map((item, index) => {
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
                        textAlign: "right",
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
                        textAlign: "right",
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
                        textAlign: "right",
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
                        textAlign: "right",
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
                        textAlign: "right",
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
                        textAlign: "right",
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
                        textAlign: "right",
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
                        textAlign: "right",
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
  useEffect(() => {
    if (dataThongKe) {
      var tmpDataCapSo = dataThongKe.filter(
        (x) => x.catalog == "so-ban-nganh"
      );
      var tmpDataQuanHuyen = dataThongKe.filter(
        (x) => x.catalog == "quan-huyen"
      );
      var tmpDataXaPhuong = dataThongKe.filter((x) => x.catalog == "xa-phuong");
      var soBanNganhs: IThongKeTongHopThuTucElement[] = [];
      var quanHuyens: IThongKeTongHopThuTucElement[] = [];
      var xaPhuongs: IThongKeTongHopThuTucElement[] = [];
      tmpDataCapSo.forEach((item: any) => {
        var checked = false;
        soBanNganhs.forEach((soBanNganh) => {
          if (soBanNganh.maDonVi == item.maDonVi) {
            checked = true;
            soBanNganh.children.push(item);
          }
        });
        if (!checked)
          soBanNganhs.push({
            maDonVi: item.maDonVi,
            tenDonVi: item.tenDonVi,
            children: [item],
          });
      });
      quanHuyens.push({
        maDonVi: "",
        tenDonVi: "",
        children: tmpDataQuanHuyen,
      });
      xaPhuongs.push({
        maDonVi: "",
        tenDonVi: "",
        children: tmpDataXaPhuong,
      });

      setDataCapSo(soBanNganhs);
      setDataCapHuyen(quanHuyens);
      setDataCapXa(xaPhuongs);
    }
  }, [dataThongKe]);
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
            Thống kê thủ tục hành chính
          </div>
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
              {/* <thead> */}
              <tr>
                <td
                  colSpan={10}
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
                <td colSpan={10}></td>
              </tr>
              <tr>
                <td
                  rowSpan={3}
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
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "17px",
                    width: "20%",
                  }}
                >
                  <strong>Lĩnh vực</strong>
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
                  <strong>Thủ tục hành chính</strong>
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
                  <strong>Thủ tục hành chính yêu cầu thu phí, lệ phí</strong>
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
                  <strong>Tổng số</strong>
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
                  <strong>Trực tuyến</strong>
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
                  <strong>Còn lại</strong>
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
                  <strong>Trực tuyến</strong>
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
                  <strong>Còn lại</strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",
                    fontSize: "17px",
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
                    fontSize: "17px",
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
                    fontSize: "17px",
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
                    fontSize: "17px",
                  }}
                >
                  <strong>Một phần</strong>
                </td>
              </tr>

              {/* </thead> */}
              <tbody id="data">
                {dataCapSo &&
                  dataCapSo.length > 0 &&
                  dataCapSo[0].children.length > 0 ? (
                  <>
                    {Template(0, "Sở ban ngành")}
                    {getElementThongKe(dataCapSo)}
                  </>
                ) : null}
                {dataCapHuyen &&
                  dataCapHuyen.length > 0 &&
                  dataCapHuyen[0].children.length > 0 ? (
                  <>
                    {Template(0, "Huyện, thành phố, thị xã")}
                    {getElementThongKe(dataCapHuyen)}
                  </>
                ) : null}
                {dataCapXa &&
                  dataCapXa.length > 0 &&
                  dataCapXa[0].children.length > 0 ? (
                  <>
                    {Template(0, "Xã, phường, thị trấn")}
                    {getElementThongKe(dataCapXa)}
                  </>
                ) : null}
                <CountDataThongKeTongHopThuTuc data={dataThongKe} />
              </tbody>
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
        <XuatThongKeTongHopThuTuc data={dataThongKe}
          groupName={coCauToChucs && coCauToChucs.length > 0 && groupCode
            ? coCauToChucs?.filter(x => x.groupCode == groupCode)[0].groupName : undefined}
        />
        <XuatDanhSachDonViThuTucTheoMucDoTable data={dataThongKe}
          groupName={coCauToChucs && coCauToChucs.length > 0 && groupCode
            ? coCauToChucs?.filter(x => x.groupCode == groupCode)[0].groupName : undefined}
        />

      </AntdSpace>
    </div>
  );
};

const ThongKeTongHopThuTucSwapper = () => (
  <ThuTucProvider>
    <ThongKeTongHopThuTuc />
  </ThuTucProvider>
);

export default ThongKeTongHopThuTucSwapper;


export const CountDataThongKeTongHopThuTuc = ({
  data,
}: {
  data: IThongKe766TTHCElement[] | undefined;
}) => {
  const [tongTTHCTotal, tthcTrucTuyenToanTrinhTotal, tthcTrucTuyenMotPhanTotal, tthcConLaiTotal,
    tongTTHCThuPhiTotal, tthcThuPhiTrucTuyenToanTrinhTotal, tthcThuPhiTrucTuyenMotPhanTotal, tthcThuPhiConLaiTotal
  ] = useMemo(() => {

    let tongTTHCTotal = 0, tthcTrucTuyenToanTrinhTotal = 0, tthcTrucTuyenMotPhanTotal = 0,
      tthcConLaiTotal = 0, tongTTHCThuPhiTotal = 0, tthcThuPhiTrucTuyenToanTrinhTotal = 0, tthcThuPhiTrucTuyenMotPhanTotal = 0,
      tthcThuPhiConLaiTotal = 0

    data?.forEach((item: any) => {
      tongTTHCTotal += item.tongTTHC
      tthcTrucTuyenToanTrinhTotal += item.tthcTrucTuyenToanTrinh
      tthcTrucTuyenMotPhanTotal += item.tthcTrucTuyenMotPhan
      tthcConLaiTotal += item.tthcConLai
      tongTTHCThuPhiTotal += item.tongTTHCThuPhi
      tthcThuPhiTrucTuyenToanTrinhTotal += item.tthcThuPhiTrucTuyenToanTrinh
      tthcThuPhiTrucTuyenMotPhanTotal += item.tthcThuPhiTrucTuyenMotPhan
      tthcThuPhiConLaiTotal += item.tthcThuPhiConLai

    })



    return [tongTTHCTotal, tthcTrucTuyenToanTrinhTotal, tthcTrucTuyenMotPhanTotal, tthcConLaiTotal,
      tongTTHCThuPhiTotal, tthcThuPhiTrucTuyenToanTrinhTotal, tthcThuPhiTrucTuyenMotPhanTotal, tthcThuPhiConLaiTotal];
  }, [data]);


  return (
    <tr>
      <td
        colSpan={2}
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
        {getCurrencyThongKe(tongTTHCTotal)}
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
        {getCurrencyThongKe(tthcTrucTuyenToanTrinhTotal)}
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
        {getCurrencyThongKe(tthcTrucTuyenMotPhanTotal)}
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
        {getCurrencyThongKe(tthcConLaiTotal)}
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
        {getCurrencyThongKe(tongTTHCThuPhiTotal)}
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
        {getCurrencyThongKe(tthcThuPhiTrucTuyenToanTrinhTotal)}
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
        {getCurrencyThongKe(tthcThuPhiTrucTuyenMotPhanTotal)}
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
        {getCurrencyThongKe(tthcThuPhiConLaiTotal)}
      </td>

    </tr>
  )
}