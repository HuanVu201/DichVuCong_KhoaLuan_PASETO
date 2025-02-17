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
import "../../../ThongKe.scss";
import dayjs from "dayjs";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";


import {
  IBaoCaoDonVi,
  ISearchBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";

import { getCurrencyThongKe } from "@/utils";
import { Link } from "react-router-dom";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import HoSoTheoBaoCaoTongHopWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoTheoBaoCaoTongHopTable";

import { toast } from "react-toastify";
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../context/BaoCaoTongHopContext";
import { BaoCaoTongHopTheoTruongHopAction } from "@/features/baocaotonghop/redux/action";
import { SearchBaoCaoTongHopTheoTruongHop } from "./SearchBaoCaoTongHopTheoTruongHop";
import { XuatBaoCaoTongHopTheoTruongHopModal } from "../exportElements/XuatBaoCaoTheoTruongHop";
const items: MenuProps["items"] = [
  {
    label: (
      <button
        style={{ border: "none", background: "inherit" }}
        onClick={() => downloadPhieuExcel("Thống kê báo cáo tổng hợp đơn vị", "ContainerSwapper1")}
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
            "Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh",
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

const BaoCaoTongHopTheoTruongHop = () => {
  var ngayHienTai = new Date();
  var ngay = String(ngayHienTai.getDate()).padStart(2, "0");
  var thang = String(ngayHienTai.getMonth() + 1).padStart(2, "0");
  var nam = ngayHienTai.getFullYear();
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const [thongKeToanBo, setThongKeToanBo] = useState<boolean>(false);
  const [laDuLieuThongKeCacNam, setLaDuLieuThongKeCacNam] = useState<boolean | undefined>();
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  let [form] = Form.useForm<ISearchBaoCaoThuTuc>();
  const dispatch = useAppDispatch();
  const { datas: thongKeDatas, loading } = useAppSelector(
    (state) => state.BaoCaoTongHop
  );
  var [data, setData] = useState<IBaoCaoDonVi[][]>([]);
  var [totalTK, setTotalTk] = useState<IBaoCaoDonVi>();
  useEffect(() => {
    thongKeHoSoContext.setSearchBaoCaoDonVi({
      ...thongKeHoSoContext.searchBaoCaoThuTuc,
      tuNgay: `${nam}-${thang}-01`,
      denNgay: `${nam}-${thang}-${ngay}`,
    });
  }, []);
  const onFinish = async (value: ISearchBaoCaoThuTuc) => {
    // toast('zpp')
    // console.log(value.tuNgay, value.denNgay)

    if (value.tuNgay && value.denNgay) {
      if (!value.catalog && !value.maDinhDanh) {
        toast.warning("Vui lòng chọn đơn vị")
      } if (value.catalog && value.catalog == "xa-phuong") {
        toast.warning("Vui lòng chọn đơn vị")
      } else {
        setLaDuLieuThongKeCacNam(value.laDuLieuThongKeCacNam)
        var res = await dispatch(
          BaoCaoTongHopTheoTruongHopAction({
            tuNgay: value.tuNgay,
            denNgay: value.denNgay,
            maDinhDanhCha: value.maDinhDanhCha,
            maDinhDanh: value.maDinhDanh,
            catalog: value.catalog,
            chiBaoGomDonViCon: value.chiBaoGomDonViCon,
            kenhThucHien: value.kenhThucHien,
            mucDo: value.mucDo,
            loaiDoiTuong: value.loaiDoiTuong,
            maTTHC: value.maTTHC,
            cache: false,
            laDuLieuThongKeCacNam: value.laDuLieuThongKeCacNam
          })
        ).unwrap();
        // setData(res?.data ?? []);
        // format dữ liệu thống kê
        if (res.data && res.data.length > 0) {
          var dataTk: IBaoCaoDonVi[][] = [];
          var resTk: IBaoCaoDonVi[][] = [];
          var tongSo: any = {
            maDonVi: "total",
            tenDonVi: "Tổng số",
            tiepNhanTrongKy: 0,
            tiepNhanQuaMang: 0,
            tiepNhanTrucTiep: 0,
            tiepNhanQuaBCCI: 0,

          }
          res.data.map((item: IBaoCaoDonVi) => {
            tongSo.tiepNhanTrongKy += item.tiepNhanTrongKy;
            tongSo.tiepNhanQuaMang += item.tiepNhanQuaMang;
            tongSo.tiepNhanTrucTiep += item.tiepNhanTrucTiep;
            tongSo.tiepNhanQuaBCCI += item.tiepNhanQuaBCCI;
            if (dataTk.length == 0) dataTk.push([item]);
            else {
              var check = false;
              dataTk.map(item1 => {
                if (item1[0] && item1[0].maDonVi == item.maDonVi) {
                  item1.push(item);
                  check = true;
                }

              })
              if (!check) dataTk.push([item])
            }
          })
          dataTk.map(item => {
            const grouped = item.reduce((acc: any, item: any) => {
              const key = item?.maTTHC ?? undefined;
              if (key && !acc[key]) {
                acc[key] = {
                  maTTHC: key,
                  tenTTHC: item.tenTTHC,
                  maDonVi: item.maDonVi,
                  tenDonVi: item.tenDonVi,
                  thanhPhan: [],
                };
              }
              if (key) acc[key].thanhPhan.push(item);
              return acc;
            }, {} as Record<string, IBaoCaoDonVi[]>);
            resTk.push(Object.values(grouped) ?? [])
          })
          setTotalTk(tongSo);
          setData(resTk)

        }

        // const grouped = res.data.reduce((acc: any, item: any) => {
        //   const key = item?.maDonVi ?? undefined;
        //   if (key && !acc[key]) {
        //     acc[key] = {
        //       maDonVi: key,
        //       tenDonVi: item.tenDonVi,
        //       thanhPhan: [],
        //     };
        //   }
        //   if (key) acc[key].thanhPhan.push(item);
        //   return acc;
        // }, {} as Record<string, IBaoCaoDonVi[]>);


      }
    } else if (!value.maDinhDanh) {
      toast.warning("Vui lòng chọn đơn vị")
    } else if (!value.maTTHC) {
      toast.warning("Vui lòng chọn thủ tục hành chính");
    }
  };

  const handleLoadHoSo = (item: any, tieuChi?: string) => {


    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);

    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      maTruongHop: item.maThongKe,
      maTTHC: item.maTTHC,
      laHoSoTrucTuyen: true,
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      kenhThucHien: thongKeHoSoContext.searchBaoCaoThuTuc.kenhThucHien,
      mucDo: thongKeHoSoContext.searchBaoCaoThuTuc.mucDo,
      loaiDoiTuong: thongKeHoSoContext.searchBaoCaoThuTuc.loaiDoiTuong,
      tieuChi: tieuChi,
      mucDos: ['3', '4'],
      laDuLieuThongKeCacNam
    });
  };
  const getElementThongKe = (itemGroup: IBaoCaoDonVi[], indexGroup: number) => {

    if (itemGroup && itemGroup.length > 0)
      return (

        <>

          <tr>
            <td
              colSpan={1}
              style={{
                verticalAlign: "middle",
                textAlign: "center",
                padding: "5px",
                border: "1px solid #333",
              }}
            >


            </td>
            <td
              colSpan={5}
              style={{
                verticalAlign: "middle",
                textAlign: "left",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>
                {itemGroup[0].tenDonVi}
              </strong>

            </td>
          </tr>
          {itemGroup.map((item: any, index: any) => {
            var tongSo: any = {
              maDonVi: "total",
              tenDonVi: "Tổng số",
              tiepNhanTrongKy: 0,
              tiepNhanQuaMang: 0,
              tiepNhanTrucTiep: 0,
              tiepNhanQuaBCCI: 0,

            }
            if (item.thanhPhan && item.thanhPhan.length > 0) {
              item.thanhPhan.map((itemTp: any) => {

                tongSo.tiepNhanTrongKy += itemTp.tiepNhanTrongKy;
                tongSo.tiepNhanQuaMang += itemTp.tiepNhanQuaMang;
                tongSo.tiepNhanTrucTiep += itemTp.tiepNhanTrucTiep;
                tongSo.tiepNhanQuaBCCI += itemTp.tiepNhanQuaBCCI;
              })
            }
            return <>
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
                  {item.tenTTHC}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",


                  }}
                >
                  {tongSo.tiepNhanTrongKy ? (
                    <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanTrongKy")}>
                      {getCurrencyThongKe(tongSo.tiepNhanTrongKy)}
                    </Link>
                  ) : (
                    "0"
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
                  {tongSo.tiepNhanQuaMang ? (
                    <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanQuaMang")}>
                      {getCurrencyThongKe(tongSo.tiepNhanQuaMang)}
                    </Link>
                  ) : (
                    "0"
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

                  {tongSo.tiepNhanTrucTiep ? (
                    <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanTrucTiep")}>
                      {getCurrencyThongKe(tongSo.tiepNhanTrucTiep)}
                    </Link>
                  ) : (
                    "0"
                  )
                  }
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "right",
                    padding: "5px",
                    border: "1px solid #333",

                  }}
                >
                  {tongSo.tiepNhanQuaBCCI ? (
                    <Link to="" onClick={() => handleLoadHoSo(item, "TiepNhanQuaBCCI")}>
                      {getCurrencyThongKe(tongSo.tiepNhanQuaBCCI)}
                    </Link>
                  ) : (
                    "0"
                  )}
                </td>
              </tr>
              {item.thanhPhan && item.thanhPhan.length > 0 ? item.thanhPhan.map((itemTp: any) => {
                return <tr>

                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      padding: "5px",
                      border: "1px solid #333",


                    }}
                  >

                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "left",
                      padding: "5px",
                      border: "1px solid #333",
                    }}
                  >
                    {itemTp.tenThongKe}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",


                    }}
                  >
                    {itemTp.tiepNhanTrongKy ? (
                      <Link to="" onClick={() => handleLoadHoSo(itemTp, "TiepNhanTrongKy")}>
                        {getCurrencyThongKe(itemTp.tiepNhanTrongKy)}
                      </Link>
                    ) : (
                      "0"
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
                    {itemTp.tiepNhanQuaMang ? (
                      <Link to="" onClick={() => handleLoadHoSo(itemTp, "TiepNhanQuaMang")}>
                        {getCurrencyThongKe(itemTp.tiepNhanQuaMang)}
                      </Link>
                    ) : (
                      "0"
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

                    {itemTp.tiepNhanTrucTiep ? (
                      <Link to="" onClick={() => handleLoadHoSo(itemTp, "TiepNhanTrucTiep")}>
                        {getCurrencyThongKe(itemTp.tiepNhanTrucTiep)}
                      </Link>
                    ) : (
                      "0"
                    )
                    }
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "right",
                      padding: "5px",
                      border: "1px solid #333",

                    }}
                  >
                    {itemTp.tiepNhanQuaBCCI ? (
                      <Link to="" onClick={() => handleLoadHoSo(itemTp, "TiepNhanQuaBCCI")}>
                        {getCurrencyThongKe(itemTp.tiepNhanQuaBCCI)}
                      </Link>
                    ) : (
                      "0"
                    )}
                  </td>
                </tr>
              }) : null}
            </>
          })}

        </>

      );
    return null;
  };

  return (
    <div className="thongKeSwapper">
      <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>Báo cáo tổng hợp đơn vị</div>
      <SearchBaoCaoTongHopTheoTruongHop
        setSearchParams={thongKeHoSoContext.setSearchBaoCaoThuTuc}
        resetSearchParams={() => { }}
        setThongKeToanBo={setThongKeToanBo}
        loaiDonViThongKe="donvi"
        onFinish={onFinish}
        items={items}
      />
      <div className="table-responsive">
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <div id="ContainerSwapper" style={{ fontSize: "16px" }}>
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
                    colSpan={6}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      fontSize: "19px",
                      textAlign: 'center'
                    }}
                  >
                    <strong>
                      THỐNG KÊ THEO TRƯỜNG HỢP THỦ TỤC
                    </strong>
                    <br />
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "1%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>STT</strong>
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "50%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Tên trường hợp</strong>
                  </td>
                  <td
                    rowSpan={2}
                    // colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',
                      width: "10%",
                    }}
                  >
                    <strong>Tiếp nhận</strong>
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Trong đó</strong>
                  </td>

                </tr>
                <tr>

                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Trực tuyến</strong>
                  </td>

                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Trực tiếp</strong>
                  </td>


                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      width: "10%",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Qua BCCI</strong>
                  </td>




                </tr>
              </thead>
              <tbody id="data">
                {data && data.length > 0
                  ? data.map((item: any, index: number) =>
                    getElementThongKe(item, index + 1)
                  )
                  : null}
                {
                  totalTK && totalTK.maDonVi ?
                    <tr>
                      <td colSpan={2} style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px",
                        border: "1px solid #333", minWidth: "500px", fontWeight: 600
                      }}
                      >
                        TỔNG SỐ
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle", textAlign: "right", padding: "5px",
                          border: "1px solid #333", fontWeight: 600
                        }}
                      >
                        {getCurrencyThongKe(totalTK.tiepNhanTrongKy)}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle", textAlign: "right", padding: "5px",
                          border: "1px solid #333", fontWeight: 600
                        }}
                      >
                        {getCurrencyThongKe(totalTK.tiepNhanQuaMang)}
                      </td>

                      <td
                        style={{
                          verticalAlign: "middle", textAlign: "right", padding: "5px",
                          border: "1px solid #333", fontWeight: 600
                        }}
                      >
                        {
                          getCurrencyThongKe(totalTK.tiepNhanTrucTiep)
                        }
                      </td>



                      <td
                        style={{
                          verticalAlign: "middle", textAlign: "right", padding: "5px",
                          border: "1px solid #333", fontWeight: 600
                        }}
                      >
                        {getCurrencyThongKe(totalTK.tiepNhanQuaBCCI)}
                      </td>


                    </tr> : null
                }
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
      {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
        <HoSoTheoBaoCaoTongHopWrapper />
      ) : null}
      <XuatBaoCaoTongHopTheoTruongHopModal data={data} totalTK={totalTK}
        tuNgay={thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay).format('DD/MM/YYYY') : undefined}
        denNgay={thongKeHoSoContext.searchBaoCaoThuTuc.denNgay ? dayjs(thongKeHoSoContext.searchBaoCaoThuTuc.denNgay).format('DD/MM/YYYY') : undefined}
        catalog={thongKeHoSoContext.searchBaoCaoThuTuc.catalog ? thongKeHoSoContext.searchBaoCaoThuTuc.catalog as any
          : coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanhCha)[0].catalog : undefined
        }
        groupName={coCauToChucs && coCauToChucs.length > 0 && thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh ? coCauToChucs?.filter(x => x.maDinhDanh == thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh)[0].groupName : undefined}
      />
    </div>
  );
};
function BaoCaoTongHopTheoTruongHopSwapper() {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <BaoCaoTongHopTheoTruongHop />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
}
export default BaoCaoTongHopTheoTruongHopSwapper;
