import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThanhToanTrucTuyenParams } from "../models/ThongKeQD766Search";
import {
  SearchDonDocThanhToanTrucTuyen,
  SearchThanhToanTrucTuyen,
} from "../redux/action";
import {
  useThanhToanTrucTuyenContext,
  ThanhToanTrucTuyenContextProvider,
} from "../context/ThongKeQD766Context";
import {
  SearchOutlined,
  PrinterOutlined,
  DownOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Select, Dropdown, Space, Form, DatePicker, Col, Row, Spin } from "antd";
import type { MenuProps } from "antd";
import "../../ThongKe.scss";
import dayjs from "dayjs";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdSelect } from "@/lib/antd/components";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { Value } from "sass";
import { toast } from "react-toastify";
import { getCurrency } from "@/utils";
import { Link } from "react-router-dom";
import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext";

import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { SearchThongKeTheoKhungTg } from "./SearchThongKeTheoKhungTg";
import { IThongKeQD766DonDocTTTTElement } from "../models/ThongKe766Response";
import {
  YeuCauThanhToanProvider,
  useYeuCauThanhToanContext,
} from "@/features/yeucauthanhtoan/contexts/useYeuCauThanhToansContext";
import { TRANGTHAITHANHTOAN } from "@/features/hoso/data/formData";
import { TRANGTHAITHUPHI } from "@/features/hoso/models";
import DanhSachYeuCauThanhToansTheoBaoCaoWrapper from "./DanhSachYeuCauThanhToansTheoBaoCao";
import { XuatThongKeThanhToanTheoHinhThucThanhToanTable } from "./exportElements/XuatThongKeThanhToanTheoHinhThucThanhToan";
import { SearchThongKeThanhToanTheoHinhThucThanhToan } from "./SearchThongKeThanhToanTheoHinhThucThanhToan";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Theo dõi thu phí, lệ phí theo hình thức thanh toán", "ContainerSwapper")}
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
        onClick={() => export2Word("Theo dõi thu phí, lệ phí theo hình thức thanh toán", true, "ContainerSwapper1")}
      >
        <FileWordOutlined style={{ color: "blue" }} /> In file word
      </button>
    ),
    key: "word",
  },
];
const ThongKeThanhToanTheoHinhThucThanhToan = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useThanhToanTrucTuyenContext();
  const thongKeContext = useBaoCaoTongHopContext();
  const yeuCauThanhToanContext = useYeuCauThanhToanContext();

  const dispatch = useAppDispatch();
  const { DonDocThanhToanTrucTuyens: thongKeDatas, loading } = useAppSelector(
    (state) => state.ThongKeQD766
  );
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);

  const [maDinhDanh, setMaDinhDanh] = useState<string>();
  const [displayDonVi, setDisplayDonVi] = useState<string>("none");

  const { data: auth } = useAppSelector((state) => state.auth);
  let userData: IParseUserToken;




  useEffect(() => {
    if (auth !== undefined) {
      userData = parseJwt(auth.token);
      if (userData.typeUser == "Admin") setDisplayDonVi("block");
      setMaDinhDanh(userData.maDinhDanh);
    }
  }, [auth]);

  useEffect(() => {
    (async () => {
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          cataLog: "so-ban-nganh",
          pageSize: 200,
          pageNumber: 1,
        })
      );
    })();
  }, []);

  const onFinish = (value: any) => {
    dispatch(SearchDonDocThanhToanTrucTuyen(value));
  };

  const handleLoadHoSo = (item: any, tieuChi?: string) => {
    yeuCauThanhToanContext.setYeuCauThanhToanModalVisible(true);
    yeuCauThanhToanContext.setSearchParams({
      pageNumber: 1,
      pageSize: 100,
      donVi: item.maThongKe,
      trangThai: TRANGTHAITHANHTOAN["Đã thanh toán"],
      thanhToanTuNgay: thongKeHoSoContext.search.tuNgay,
      thanhToanDenNgay: thongKeHoSoContext.search.denNgay,
      tieuChi: tieuChi,
    });
  };
  const getElementThongKe = (item: any, index: number) => {
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
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tenThongKe}
        </td>

        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongLePhi ? (
            getCurrency(item.tongLePhi)
          ) : (
            "0"
          )}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongPhi ? (
            getCurrency(item.tongPhi)
          ) : (
            "0"
          )}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongSoTien ? getCurrency(item.tongSoTien) : "0"}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongSoTienTienMat ? (
            getCurrency(item.tongSoTienTienMat)
          ) : (
            "0"
          )}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongSoTienTrucTuyen ? (
            getCurrency(item.tongSoTienTrucTuyen)
          ) : (
            "0"
          )}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {item.tongSoTienChuyenKhoan ? (
            getCurrency(item.tongSoTienChuyenKhoan)
          ) : (
            "0"
          )}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {/* {item.hoSoDaThuPhi ? getCurrency(item.hoSoDaThuPhi) : "0"} */}
          {item.hoSoDaThuPhi ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "HoSoDaThuPhi")}
            >
              {getCurrency(item.hoSoDaThuPhi)}
            </Link>
          ) : (
            "0"
          )}
        </td>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            padding: "5px",
            border: "1px solid #333",
            fontSize: "16px",
            fontFamily: "Times New Roman, Times, serif;",
          }}
        >
          {/* {item.hoSoDaThuPhi ? getCurrency(item.hoSoDaThuPhi) : "0"} */}
          {item.hoSoThuocDoiTuongMienPhi ? (
            <Link
              to=""
              onClick={() => handleLoadHoSo(item, "HoSoThuocDoiTuongMienPhi")}
            >
              {getCurrency(item.hoSoThuocDoiTuongMienPhi)}
            </Link>
          ) : (
            "0"
          )}
        </td>

      </tr>
    );
  };

  return (
    <div className="thongKeSwapper table-responsive">
      <Spin spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
      >
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
          Theo dõi chỉ tiêu thanh toán các đơn vị
        </div>


        <SearchThongKeThanhToanTheoHinhThucThanhToan
          setSearchParams={thongKeHoSoContext.setSearch}
          resetSearchParams={() => { }}
          items={items}
        />

        <div
          id="ContainerSwapper1"
          className="ContainerSwapper1"
          style={{
            paddingTop: "10px",
            fontSize: "16px",
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
              fontSize: "16px",
            }}
          >
            <thead>
              <tr>
                <td
                  colSpan={12}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                  }}
                >
                  <strong>
                    THEO DÕI THU PHÍ, LỆ PHÍ THEO HÌNH THỨC THANH TOÁN
                  </strong>
                  <br />
                  {/* <strong
                className="filterDate"
                dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
              /> */}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={12}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                  }}
                >
                  <strong>
                    (Từ ngày {dayjs(thongKeHoSoContext.search.tuNgay).format('DD/MM/YYYY') || '...'} đến ngày {dayjs(thongKeHoSoContext.search.denNgay).format('DD/MM/YYYY') || '...'})
                  </strong>
                  <br />

                </td>
              </tr>
              <tr>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
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
                    padding: "5px",
                    border: "1px solid #333",
                    maxWidth: "30%",
                    width: "30%",
                  }}
                >
                  <strong>Tên đơn vị</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Lệ phí đã thu (VNĐ)</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Phí đã thu (VNĐ)</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <strong>Số tiền (VNĐ)</strong>
                </td>
                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  <strong>Phân loại theo hình thức thu phí, lệ phí</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    maxWidth: "10%",
                    width: "10%",
                  }}
                >
                  <strong>Số lượt hồ sơ đã thu phí, lệ phí</strong>
                </td>
                <td
                  rowSpan={3}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    maxWidth: "10%",
                    width: "10%",
                  }}
                >
                  <strong>Số lượt hồ sơ thuộc đối tượng miễn phí</strong>
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  <strong>Tiền mặt (VNĐ)</strong>
                </td>
                <td
                  colSpan={2}
                  style={{

                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  <strong>Chuyển khoản (VNĐ)</strong>
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
                  <strong>Qua cổng DVCQG</strong>
                </td>
                <td

                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  <strong>Chuyển khoản khác</strong>
                </td>
              </tr>
            </thead>
            <tbody id="data">
              {thongKeDatas?.map(
                (item: IThongKeQD766DonDocTTTTElement, index: number) => {
                  return getElementThongKe(item, index);
                }
              )}
              <CountDataThongKeThanhToanTheoHinhThucThanhToan data={thongKeDatas} />
            </tbody>
          </table>
        </div>

        {yeuCauThanhToanContext.yeuCauThanhToanModalVisible ? (
          <DanhSachYeuCauThanhToansTheoBaoCaoWrapper
            title={"THEO DÕI THU PHÍ, LỆ PHÍ THEO HÌNH THỨC THANH TOÁN"}
            donViThongKe={thongKeHoSoContext.search?.donViQuanLy ? coCauToChucs?.filter((x: any) => x.groupCode == thongKeHoSoContext.search?.donViQuanLy)[0].groupName : 'Tất cả'}
            tuNgay={dayjs(thongKeHoSoContext.search.tuNgay).format('DD/MM/YYYY')}
            denNgay={dayjs(thongKeHoSoContext.search.denNgay).format('DD/MM/YYYY')} />
        ) : null}
        <XuatThongKeThanhToanTheoHinhThucThanhToanTable data={thongKeDatas} tuNgay={dayjs(thongKeHoSoContext.search.tuNgay).format('DD/MM/YYYY')} denNgay={dayjs(thongKeHoSoContext.search.denNgay).format('DD/MM/YYYY')} />
      </Spin>
    </div>
  );
};

function ThongKeThanhToanTheoHinhThucThanhToanSwapper() {
  return (
    <ThanhToanTrucTuyenContextProvider>
      <BaoCaoTongHopProvider>
        <YeuCauThanhToanProvider>
          <ThongKeThanhToanTheoHinhThucThanhToan />
        </YeuCauThanhToanProvider>
      </BaoCaoTongHopProvider>
    </ThanhToanTrucTuyenContextProvider>
  );
}
export default ThongKeThanhToanTheoHinhThucThanhToanSwapper;


export const CountDataThongKeThanhToanTheoHinhThucThanhToan = ({
  data,
}: {
  data: IThongKeQD766DonDocTTTTElement[] | undefined;
}) => {

  const [lePhiDaThu, phiDaThu] = useMemo(() => {
    var tmp1 = 0;
    var tmp2 = 0;

    data?.map((item) => {
      tmp1 += item?.tongLePhi || 0;
      tmp2 += item?.tongPhi || 0;
    });
    return [tmp1, tmp2];
  }, [data]);


  const [soTien, tienMat] = useMemo(() => {
    var tmp1 = 0;
    var tmp2 = 0;

    data?.map((item) => {
      tmp1 += item?.tongSoTien || 0;
      tmp2 += item?.tongSoTienTienMat || 0;
    });
    return [tmp1, tmp2];
  }, [data]);


  const [chuyenKhoanQuaCong, chuyenKhoanKhac] = useMemo(() => {
    var tmp1 = 0;
    var tmp2 = 0;

    data?.map((item) => {
      tmp1 += item?.tongSoTienTrucTuyen || 0;
      tmp2 += item?.tongSoTienChuyenKhoan || 0;
    });
    return [tmp1, tmp2];
  }, [data]);


  const [soLuot, soHoSoMienPhi] = useMemo(() => {
    var tmp1 = 0;
    var tmp2 = 0;
    data?.map((item) => {
      tmp1 += item?.hoSoDaThuPhi || 0;
      tmp2 += item?.hoSoThuocDoiTuongMienPhi || 0;
    });
    return [tmp1, tmp2];
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
        TỔNG
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
        {getCurrency(lePhiDaThu)}
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
        {getCurrency(phiDaThu)}
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
        {getCurrency(soTien)}
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
        {getCurrency(tienMat)}
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
        {getCurrency(chuyenKhoanQuaCong)}
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
        {getCurrency(chuyenKhoanKhac)}
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
        {getCurrency(soLuot)}
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
        {getCurrency(soHoSoMienPhi)}
      </td>
    </tr>
  )

}
