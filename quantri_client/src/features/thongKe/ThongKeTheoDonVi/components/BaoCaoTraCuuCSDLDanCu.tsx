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
import {
  IBaoCaoDonVi,
  ISearchBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import {
  BaoCaoTongHopDonViAction,
  BaoCaoTongHopTraCuuCSDLDanCuAction,
} from "@/features/baocaotonghop/redux/action";
import { SearchBaoCaoTongHop } from "./SearchBaoCaoTongHop";
import { getCurrencyThongKe } from "@/utils";
const items: MenuProps["items"] = [
  // {
  //   label: (
  //     <button
  //       style={{ border: "none", background: "inherit" }}
  //       onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp lĩnh vực")}
  //     >
  //       <FileExcelOutlined style={{ color: "green" }} /> In file excel
  //     </button>
  //   ),
  //   key: "excel",
  // },
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() =>
          downloadPhieuWord(
            "Thống kê tra cứu CSDL dân cư",
            true,
            "ContainerSwapper"
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
const BaoCaoTongHopTraCuuCSDLDanCu = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();

  const thongKeHoSoContext = useBaoCaoTongHopContext();
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IBaoCaoDonVi[]>([]);
  useEffect(() => {
    thongKeHoSoContext.setSearchBaoCaoThuTuc({
      ...thongKeHoSoContext.searchBaoCaoThuTuc,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);
  const onFinish = async (value: ISearchBaoCaoDonVi) => {
    if (value.tuNgay && value.denNgay) {
      var res = await dispatch(
        BaoCaoTongHopTraCuuCSDLDanCuAction({
          tuNgay: value.tuNgay,
          denNgay: value.denNgay,
          maDinhDanhCha: value.maDinhDanhCha,
          maDinhDanh: value.maDinhDanh,
          catalog: value.catalog,
          chiBaoGomDonViCon: value.chiBaoGomDonViCon
        })
      ).unwrap();
      setData(res?.data ?? []);
    }
  };

  let dataHtmlForPdf = "";

  data?.forEach((item: any, index) => {
    dataHtmlForPdf += `
        <tr>
        <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${index + 1}
          </td>
          <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;min-width:600px' >
            ${item.tenThongKe}
          </td>
         <td style='vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;' >
            ${getCurrencyThongKe(item.soLuong)}
          </td>
         
       
         
        </tr>`;
  });

  return (
    <div className="thongKeSwapper">
      <div className="title" style={{fontSize: 18, fontWeight: 600}}>Thống kê số lượng tra cứu CSDL dân cư</div>
      <SearchBaoCaoTongHop
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
        onFinish={onFinish}
        items={items}
      />
      <div className="table-responsive">
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <div id="ContainerSwapper" style={{ fontSize: "16px" ,   fontFamily: "'Roboto', ",}} className="table-responsive">
            <table
              id=""
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
                    colSpan={9}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                    }}
                  >
                    <strong>TÌNH HÌNH TRA CỨU CSDL DÂN CƯ</strong>
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
                      width: "20%",
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
                    <strong>Số lượng</strong>
                  </td>
                </tr>
              </thead>
              <tbody
                id="data"
                dangerouslySetInnerHTML={{
                  __html: dataHtmlForPdf || "",
                }}
              />
              <CountDataBaoCaoTongHopTraCuuCSDLDanCu data={data}/>
            </table>
          </div>
        </Spin>
      </div>
    </div>
  );
};
function BaoCaoTongHopTraCuuCSDLDanCuSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <BaoCaoTongHopTraCuuCSDLDanCu />
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHopTraCuuCSDLDanCuSwapper;

export const CountDataBaoCaoTongHopTraCuuCSDLDanCu = ({
  data,
}: {
  data: IBaoCaoDonVi[] | undefined;
}) => {
  const [tongSoTotal] = useMemo(() => {

    let tongSoTotal = 0
    data?.forEach((item: any) => {
      tongSoTotal += item.soLuong

    })



    return [tongSoTotal];
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
        {getCurrencyThongKe(tongSoTotal)}
      </td>

    </tr>
  )
}