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
  PaginationProps,
  Pagination,
} from "antd";

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
import { BaoCaoTongHop06aAction, ThongKeTiepNhanHoSoBuuChinhAction } from "@/features/baocaotonghop/redux/action";
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
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { SearchThongKeTiepNhanBuuChinh } from "./SearchThongKeTiepNhanBuuChinh";
import { IThongKeHoSoTiepNhanBuuChinh } from "@/features/hoso/models";
import HoSoTheoBaoCaoTiepNhanBuuChinhWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoThongKeTiepNhanBuuChinh";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê hồ sơ tiếp nhận bưu chính", "TableThongKeHoSoTiepNhanBuuChinh")}
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
          downloadPhieuWord(
            "Thống kê hồ sơ tiếp nhận bưu chính",
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



const ThongKeHoSoTiepNhanBuuChinh = () => {

  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();

  const dispatch = useAppDispatch();
  const { thongKeTiepNhanHoSoBuuChinhs, count, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IThongKeHoSoTiepNhanBuuChinh[]>([]);
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
    console.log(value);

    if (value.tuNgay && value.denNgay) {

      var res = await dispatch(
        ThongKeTiepNhanHoSoBuuChinhAction({
          pageNumber: 1,
          pageSize: 1500,
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          catalog: value.catalog,
          maDinhDanhCha: value.maDinhDanh || value.maDinhDanhCha
        })
      ).unwrap();
      setData(res?.data || []);
    }
  };

  const handleLoadHoSo = (item: any, tieuChi?: string) => {

    hoSoTheoBaoCaoTongHopContext.setHoSoTiepNhanBuuChinhModalVisible(true);
    if (tieuChi == "Hồ sơ tiếp nhận qua dịch vụ bưu chính") {
      hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoTiepNhan({
        pageNumber: 1,
        pageSize: 20,
        Groupcode: item.groupCode,
        MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
        tiepNhanFrom: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
        tiepNhanTo: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
        KenhThucHien: '3'
      });
    }
    else if (tieuChi == "Hồ sơ bưu điện đã chuyển trả kết quả") {
      hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoTiepNhan({
        pageNumber: 1,
        pageSize: 20,
        Groupcode: item.groupCode,
        MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
        tiepNhanFrom: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
        tiepNhanTo: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
        DaYeuCauBCCILayKetQua: true
      });
    }
    else if (tieuChi == "Hồ sơ đăng ký trả kết quả qua bưu điện") {
      hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoTiepNhan({
        pageNumber: 1,
        pageSize: 20,
        Groupcode: item.groupCode,
        MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
        tiepNhanFrom: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
        tiepNhanTo: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
        DangKyTraKQQuaBuuDien: true
      });
    }

  };

  return (
    <>
      <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
          THỐNG KÊ TIẾP NHẬN HỒ SƠ VÀ TRẢ KẾT QUẢ QUA DỊCH VỤ BƯU CHÍNH
        </div>
        <SearchThongKeTiepNhanBuuChinh
          setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
          resetSearchParams={() => { }}
          onFinish={onFinish}
          items={items}
        />
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <div id="ContainerSwapper1" style={{ fontSize: "16px" }}>
            <table
              id="TableThongKeHoSoTiepNhanBuuChinh"
              // className="scrollTable"
              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                fontSize: "17px",
              }}
            >
              <thead>
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                    }}
                  >
                    {/* <strong style={{ fontSize: '20px' }}>
                      THỐNG KÊ TIẾP NHẬN HỒ SƠ VÀ TRẢ KẾT QUẢ QUA DỊCH VỤ BƯU CHÍNH
                    </strong> */}
                    <br />
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan={1}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "5%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>STT</strong>
                  </td>
                  <td
                    rowSpan={1}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      minWidth: "30%",
                      width: "30%",
                       textAlign: 'center'
                    }}
                  >
                    <strong>Đơn vị</strong>
                  </td>
                  <td
                    rowSpan={1}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                       textAlign: 'center'
                    }}
                  >
                    <strong>Hồ sơ tiếp nhận qua dịch vụ bưu chính</strong>
                  </td>
                  <td
                    rowSpan={1}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                       textAlign: 'center'
                    }}
                  >
                    <strong>Hồ sơ bưu điện đã chuyển trả kết quả</strong>
                  </td>
                  <td
                    rowSpan={1}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                       textAlign: 'center'
                    }}
                  >
                    <strong>Hồ sơ đăng ký trả kết quả qua bưu điện</strong>
                  </td>
                </tr>
              </thead>
              <tbody id="data">
                {thongKeTiepNhanHoSoBuuChinhs?.map((item: IThongKeHoSoTiepNhanBuuChinh, index) => {
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
                        {index + 1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "left",
                          padding: "5px",
                          border: "1px solid #333",

                          fontFamily: "Times New Roman, Times, serif;",
                        }}
                      >
                        {item.groupName}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          padding: "5px",
                          border: "1px solid #333",
                          fontFamily: "Times New Roman, Times, serif;",
                        }}
                      >
                        {item.countTiepNhanQuaBuuChinh ?
                          <Link
                            to=""
                            onClick={() => handleLoadHoSo(item, "Hồ sơ tiếp nhận qua dịch vụ bưu chính")}
                          >
                            {getCurrencyThongKe(item.countTiepNhanQuaBuuChinh)}
                          </Link> : '0'
                        }

                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          padding: "5px",
                          border: "1px solid #333",

                          fontFamily: "Times New Roman, Times, serif;",
                        }}
                      >
                        {item.countBuuDienDaChuyenTraKQ ?
                          <Link
                            to=""
                            onClick={() => handleLoadHoSo(item, "Hồ sơ bưu điện đã chuyển trả kết quả")}
                          >
                            {getCurrencyThongKe(item.countBuuDienDaChuyenTraKQ)}
                          </Link> : '0'
                        }
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                          padding: "5px",
                          border: "1px solid #333",

                          fontFamily: "Times New Roman, Times, serif;",
                        }}
                      >
                        {item.countDangKyQuaKQBuuDien ?
                          <Link
                            to=""
                            onClick={() => handleLoadHoSo(item, "Hồ sơ đăng ký trả kết quả qua bưu điện")}
                          >
                            {getCurrencyThongKe(item.countDangKyQuaKQBuuDien)}
                          </Link> : '0'
                        }
                      </td>
                    </tr>
                  )
                })}
                <CountDataThongKeHoSoTiepNhanBuuChinh data={data} />
              </tbody>
            </table>
          </div>
        </Spin>

        {hoSoTheoBaoCaoTongHopContext.hoSoTiepNhanBuuChinhModalVisible ? (
          <HoSoTheoBaoCaoTiepNhanBuuChinhWrapper />
        ) : null}

        {/* <XuatBaoCaoTongHop06aModal data={data} /> */}
      </div>
    </>
  );
};
function ThongKeHoSoTiepNhanBuuChinhSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThongKeHoSoTiepNhanBuuChinh />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default ThongKeHoSoTiepNhanBuuChinhSwapper;


export const CountDataThongKeHoSoTiepNhanBuuChinh = ({
  data,
}: {
  data: IThongKeHoSoTiepNhanBuuChinh[] | undefined;
}) => {
  const [
    hoSoTiepNhanQuaDichVuBuuChinhTotal, hoSoBuuDienDaTraKetQuaTotal, hoSoDangKyTraKQBuuDienTotal
  ] = useMemo(() => {

    let hoSoTiepNhanQuaDichVuBuuChinhTotal = 0, hoSoBuuDienDaTraKetQuaTotal = 0, hoSoDangKyTraKQBuuDienTotal = 0

    data?.forEach((item: IThongKeHoSoTiepNhanBuuChinh) => {
      hoSoTiepNhanQuaDichVuBuuChinhTotal += item.countTiepNhanQuaBuuChinh as any
      hoSoBuuDienDaTraKetQuaTotal += item.countBuuDienDaChuyenTraKQ as any
      hoSoDangKyTraKQBuuDienTotal += item.countDangKyQuaKQBuuDien as any

    })

    return [hoSoTiepNhanQuaDichVuBuuChinhTotal, hoSoBuuDienDaTraKetQuaTotal, hoSoDangKyTraKQBuuDienTotal];
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
          textAlign: "center",
          padding: "5px",
          border: "1px solid #333",
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
          fontWeight: 600
        }}
      >
        {/* {getCurrencyThongKe(dangXuLyVaBoSungTotal)} */} {hoSoTiepNhanQuaDichVuBuuChinhTotal}
      </td>
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
        {/* {getCurrencyThongKe(dangXuLyTrongHanVaBoSungTotal)} */} {hoSoBuuDienDaTraKetQuaTotal}
      </td>
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
        {/* {getCurrencyThongKe(dangXuLyQuaHanTotal)} */} {hoSoDangKyTraKQBuuDienTotal}
      </td>
    </tr>
  )
}