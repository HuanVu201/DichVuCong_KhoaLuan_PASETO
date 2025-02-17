import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
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
} from "antd";
import type { MenuProps } from "antd";
import "../../ThongKe.scss";
import dayjs from "dayjs";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdSelect } from "@/lib/antd/components";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { Value } from "sass";
import { toast } from "react-toastify";
import {
  BaoCaoTongHopProvider,
  useBaoCaoTongHopContext,
} from "../context/BaoCaoTongHopContext";
import { IBaoCaoNguoiNopHoSo, ISearchBaoCaoThuTuc } from "@/features/baocaotonghop/model";
import {
  BaoCaoTongHopDonViAction,
  BaoCaoNguoiNopHoSoAction,
} from "@/features/baocaotonghop/redux/action";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import { getCurrencyThongKe } from "@/utils";

const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Bảng thống kê thành phần nộp hồ sơ")}
      >
        <FileExcelOutlined style={{ color: "green" }} /> In file excel
      </button>
    ),
    key: "excel",
  },
];

const BaoCaoNguoiNopHoSo = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { nguoiNopHoSos: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );

  useEffect(() => {
    thongKeHoSoContext.setSearchBaoCaoThuTuc({
      ...thongKeHoSoContext.searchBaoCaoThuTuc,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);

  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
    if (value.tuNgay && value.denNgay)
      await dispatch(
        BaoCaoNguoiNopHoSoAction({
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          maDinhDanhCha: value.maDinhDanhCha,
          catalog: value.catalog,
          laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
        })
      );
  };

  let dataHtmlForPdf = "";
  let dataHtmlForExecl = "";

  thongKeDatas?.forEach((item: any, index) => {
    dataHtmlForPdf += `
        <tr>
        <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${index + 1}
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-family: &quot;Times New Roman&quot;, Times, serif;min-width:400px' >
            ${item.tenThongKe}
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${getCurrencyThongKe(item.congDan)}
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${getCurrencyThongKe(item.doanhNghiep)}
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${getCurrencyThongKe(item.toChuc)}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${getCurrencyThongKe(item.congDan + item.toChuc + item.doanhNghiep)}
          </td>
         
       
         
        </tr>`;
  });

  return (

    <Spin spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
    >
      <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
          Thống kê nộp hồ sơ theo đối tượng
        </div>
        <SearchBaoCaoTongHop
          setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
          resetSearchParams={() => { }}
          onFinish={onFinish}
          items={items}
        />
        <div id="ContainerSwapper" className="table-responsive">
          <table
            id="tableToExcel"
            style={{
              verticalAlign: "middle",
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            <thead>
              <tr>
                <td
                  colSpan={6}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    textAlign: 'center'
                  }}
                >
                  <strong>THỐNG KÊ THÀNH PHẦN NỘP HỒ SƠ</strong>
                  <br />
                  {/* <strong
                className="filterDate"
                dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
              /> */}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center',
                    width: "3%",
                  }}
                >
                  <strong>STT</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center',
                    width: "30%",
                  }}
                >
                  <strong>Đơn vị</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center',
                    width: "15%",
                  }}
                >
                  <strong>Công dân</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center',
                    width: "15%",
                  }}
                >
                  <strong>Doanh nghiệp</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center',
                    width: "15%",
                  }}
                >
                  <strong>Tổ chức</strong>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center',
                    width: "15%",
                  }}
                >
                  <strong>Tổng số</strong>
                </td>
              </tr>
            </thead>
            <tbody
              id="data"
              dangerouslySetInnerHTML={{
                __html: dataHtmlForPdf || "",
              }}
            />
            <CountDataNguoiNopHoSo data={thongKeDatas} />
          </table>
        </div>
      </div>
    </Spin>
  );
};
function BaoCaoNguoiNopHoSoSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <BaoCaoNguoiNopHoSo />
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoNguoiNopHoSoSwapper;

export const CountDataNguoiNopHoSo = ({
  data,
}: {
  data: IBaoCaoNguoiNopHoSo[] | undefined;
}) => {
  const [congDanTotal, doanhNghiepTotal, toChucTotal, tongSoTotal] = useMemo(() => {

    let congDanTotal = 0, doanhNghiepTotal = 0, toChucTotal = 0, tongSoTotal = 0

    data?.forEach((item: IBaoCaoNguoiNopHoSo) => {
      congDanTotal += item.congDan
      doanhNghiepTotal += item.doanhNghiep
      toChucTotal += item.toChuc
      tongSoTotal += item.congDan + item.doanhNghiep + item.toChuc

    })



    return [congDanTotal, doanhNghiepTotal, toChucTotal, tongSoTotal];
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
        {getCurrencyThongKe(congDanTotal)}
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
        {getCurrencyThongKe(doanhNghiepTotal)}
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
        {getCurrencyThongKe(toChucTotal)}
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
        {getCurrencyThongKe(tongSoTotal)}
      </td>
    </tr>
  )


}