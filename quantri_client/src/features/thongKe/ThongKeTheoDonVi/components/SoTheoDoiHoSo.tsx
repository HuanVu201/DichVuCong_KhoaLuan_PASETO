import { Dropdown, MenuProps, Pagination, Row, SelectProps, Space, Spin } from "antd";
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
import { Value } from "sass";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from "dayjs";
import {
  IHoSoTheoTrangThaiXuLy,
  ISearchHoSoTheoTrangThaiXuLy,
} from "@/features/hoso/models/searchHoSoTheoTrangThaiXuLy";
import { SearchHoSo, SearchHoSoTheoBaoCaoTongHop, SearchHoSoTheoTrangThaiXuLy, SearchSoTheoDoiHoSoAction } from "@/features/hoso/redux/action";
import { downloadPhieuWord, export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { SearchSoTheoDoiHoSo } from "./SearchSoTheoDoiHoSo";
import { ISearchThongKeParams } from "../../thongKeQD766/models/ThongKeQD766Search";
import { ThongKeSoTheoDoiHoSo } from "../../thongKeHoSoTrucTuyen/redux/action";
import { IParseUserToken } from "@/models";
import { parseJwt } from "@/utils/common";
import { FORMAT_TIME } from "@/data";
import { IHoSoTiepNhanQuaHan } from "../../thongKeQD766/models/ThongKeHoSoTiepNhanQuaHan";
import { toast } from "react-toastify";
import { exportThongKeApi } from "../../services";
const ThanhToanTrucTuyenNew = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ border: "none", background: "inherit" }}
          onClick={() =>
            exportThongKe('excel')
            // downloadPhieuExcel(
            //   "Bảng thống kê sổ theo dõi hồ sơ",
            //   "ContainerSwapper1"
            // )
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
            exportThongKe('word')
            // export2Word("Sổ theo dõi hồ sơ", true, "ContainerSwapper1")
          }
        >
          <FileWordOutlined style={{ color: "#36a3f7" }} /> In file word
        </button>
      ),
      key: "Word",
    },
  ];

  const exportThongKe = async (typeExport: string) => {
    setLoading(true)
    const resExport = await exportThongKeApi.ExportThongKeSoTheoDoiHoSo(searchParams, typeExport)
    if (resExport.data) {
      console.log(`${import.meta.env.VITE_HOST_PATH_FILE}/${resExport.data}`)
      try {
        let tab = window.open();
        if (tab) {
          tab.location.href = `${import.meta.env.VITE_HOST_PATH_FILE}${resExport.data}`;

        }
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      toast.error("Có lỗi trong quá trình xuất thống kê!")
    }
    setLoading(false)
  }

  const dispatch = useAppDispatch();
  const {
    hoSoTheoTrangThais: hoSos,
    count: countHoSo,
    loading: loadingHoSo,
  } = useAppSelector((state) => state.hoso);
  const [loading, setLoading] = useState<boolean>(false)
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const [totalTk, setTotalTk] = useState<number>(0);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({
    pageNumber: 1,
    pageSize: 50
  });
  const [userData, setUserData] = useState<IParseUserToken>();
  const [data, setData] = useState<IHoSoTiepNhanQuaHan[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0)
  const [firstAccess, setFirstAccess] = useState<boolean>(true);
  useEffect(() => {
    if (auth) {
      var user = parseJwt(auth.token) as IParseUserToken;

      setUserData(user);
    }
  }, [auth]);
  const onFinish = async (value: ISearchThongKeParams) => {
    // var res = await dispatch(ThongKeSoTheoDoiHoSo(value)).unwrap();

    if (value.tuNgay && value.denNgay) {

      var res = await dispatch(
        SearchSoTheoDoiHoSoAction({
          ...value,
          groupCode:
            value.groupCode,
          donViQuanLy: value.donViQuanLy,
          pageSize: value.pageSize,
          pageNumber: value.pageNumber

        })
      ).unwrap();
      setTotalCount(res.totalCount);
      setData(res.data ?? []);
      setFirstAccess(false)
    }
  };

  //   useEffect(() => {
  //     (async () => {
  //       var tmp = 0;
  //       await dataThongKe?.data.map((item) => {
  //         tmp += item.tongSo;
  //       });
  //       setTotalTk(tmp);
  //     })();
  //   }, [dataThongKe]);
  // useEffect(() => {
  //   (async () => {
  //     if (userData) {

  //     }
  //   })();
  // }, [searchHoSoParams, userData,firstAccess]);
  useEffect(() => {
    (async () => {
      if (!firstAccess) {
        var res = await dispatch(
          SearchSoTheoDoiHoSoAction({
            ...searchParams,
            groupCode:
              searchParams.groupCode,
            donViQuanLy: searchParams.donViQuanLy,

          })
        ).unwrap();
        setTotalCount(res.totalCount);
        setData(res.data ?? []);
      }
    })()

  }, [
    searchParams.pageSize, searchParams.pageNumber, firstAccess
  ])
  return (
    <div className="thongKeSwapper">

      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Spin
          spinning={loadingHoSo || loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
          }
        >
          <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>SỔ THEO DÕI TÌNH HÌNH TIẾP NHẬN HỒ SƠ TTHC</div>
          <SearchSoTheoDoiHoSo
            setSearchParams={setSearchParams}
            resetSearchParams={() => {
              setSearchParams({});
            }}
            onFinish={onFinish}
            searchParams={searchParams}
            items={items}
          />
          <Pagination total={totalCount} current={searchParams.pageNumber || 1} pageSize={searchParams.pageSize || 50} showSizeChanger={true} onChange={(page, pageSize) => {
            setSearchParams({
              ...searchParams,
              pageSize: pageSize,
              pageNumber: page,
            })
          }}
            // showTotal={(total) => `Tổng ${total} hồ sơ`}
            defaultPageSize={50}
            showQuickJumper={true}
            pageSizeOptions={["50", "100", "1000", "5000", "10000"]}
            style={{ paddingTop: "10px" }} />
          <div
            id="ContainerSwapper"
            className="table-responsive"
            style={{
              fontSize: "13px",
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
                fontSize: "17px",
              }}
            >
              <thead>

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
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>STT</strong>
                  </td>

                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'

                    }}
                    rowSpan={2}
                  >
                    <strong>Mã hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',
                      width: "15%"

                    }}
                    rowSpan={2}
                  >
                    <strong>Nội dung hồ sơ</strong>
                  </td>

                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Số lượng </strong>
                    <strong>(bộ)</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Họ tên chủ hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',
                      width: "15%"
                    }}
                    rowSpan={2}
                  >
                    <strong>Địa chỉ chủ hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',

                    }}
                    rowSpan={2}
                  >
                    <strong>Số điện thoại</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    colSpan={2}
                  >
                    <strong>Ngày, tháng, năm</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    colSpan={3}
                  >
                    <strong>Trả kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Người nhận hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Địa bàn phát sinh hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Ghi chú</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Nhận hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Hẹn trả kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Ngày nhận kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Bên giao</strong>
                    <br />
                    <i>(Ký tên)</i>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Bên nhận</strong>
                    <br />
                    <i>(Ký tên)</i>
                  </td>
                </tr>
              </thead>
              <tbody id="data">
                {data?.map((item, index) => {
                  let tenDiaBan = "";
                  if (item.tenDiaBan) {
                    try {
                      var thongTinDiaBan = JSON.parse(item.tenDiaBan);
                      if (thongTinDiaBan.tenTinh) tenDiaBan = thongTinDiaBan.tenTinh;
                      if (thongTinDiaBan.tenHuyen) tenDiaBan = tenDiaBan ? thongTinDiaBan.tenHuyen + " - " + tenDiaBan : thongTinDiaBan.tenHuyen;
                      if (thongTinDiaBan.tenXa) tenDiaBan = tenDiaBan ? thongTinDiaBan.tenXa + " - " + tenDiaBan : thongTinDiaBan.tenXa;
                    } catch (e) { console.log(e) }
                  }
                  return (
                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        {searchParams.pageSize && searchParams.pageNumber ? (searchParams.pageSize) * (searchParams.pageNumber - 1) + index + 1 : index + 1}
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
                          textAlign: "left",
                          minWidth: "30%",
                        }}
                      >
                        <span>{item.trichYeuHoSo}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>{item.soBoHoSo}</span>
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
                          textAlign: "left",
                        }}
                      >
                        <span>{item.diaChiChuHoSo}</span>
                      </td>
                      <td
                        className="addMsoNumberFormat_right"
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>{item.soDienThoaiChuHoSo}</span>
                      </td>

                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>
                          {item.ngayTiepNhan
                            ? dayjs(item.ngayTiepNhan).format(FORMAT_TIME)
                            : ""}
                        </span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>
                          {item.ngayHenTra
                            ? dayjs(item.ngayHenTra).format(FORMAT_TIME)
                            : ""}
                        </span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>
                          {item.ngayTra
                            ? dayjs(item.ngayTra).format(FORMAT_TIME)
                            : ""}
                        </span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >{item.tenNguoiNhanHoSo}</td>
                      <td
                        style={{
                          textAlign: "left",
                          verticalAlign: "left",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >{tenDiaBan}</td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      ></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>

          <div style={{ display: "none" }} id="ContainerSwapper1" className="ContainerSwapper1">
            <table

              style={{
                verticalAlign: "middle",
                borderCollapse: "collapse",
                width: "100%",

                margin: "10px 0",
                fontSize: "17px",
              }}
            >
              <thead>
                <tr style={{ width: "100%" }}>
                  <td
                    colSpan={5}
                    style={{
                      verticalAlign: "top",
                      padding: "5px",
                      textAlign: 'center',

                    }}
                  >
                    {coCauToChucs && coCauToChucs.length > 0 && searchParams.groupCode ?
                      <strong>{coCauToChucs?.filter(x => x.groupCode == searchParams.groupCode)[0].groupName.toUpperCase()} </strong> : ''}
                  </td>
                  <td
                    colSpan={8}
                    style={{
                      verticalAlign: "top",
                      padding: "5px",
                      textAlign: 'center',

                    }}
                  >
                    <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br /><u>Độc lập - Tự do - Hạnh phúc</u></strong>
                  </td>

                </tr>
                <tr>
                  <td
                    colSpan={13}
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      textAlign: 'center',
                    }}
                  >
                    <strong>SỔ THEO DÕI TÌNH HÌNH TIẾP NHẬN HỒ SƠ TTHC</strong>
                    <br />
                    <i>(Từ ngày {searchParams.tuNgay ?
                      dayjs(searchParams.tuNgay).format('DD/MM/YYYY') :
                      "..."} đến ngày {searchParams.denNgay
                        ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') :
                        "..."} )</i>
                  </td>
                </tr>
                <tr><p></p></tr>
              </thead>
            </table>
            <table
              id="tableToExcel"
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
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>STT</strong>
                  </td>

                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Mã hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',
                      width: "15%"
                    }}
                    rowSpan={2}
                  >
                    <strong>Nội dung hồ sơ</strong>
                  </td>

                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Số lượng </strong>
                    <strong>(bộ)</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Họ tên chủ hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Địa chỉ chủ hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center',
                      width: "15%"
                    }}
                    rowSpan={2}
                  >
                    <strong>Số điện thoại</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    colSpan={2}
                  >
                    <strong>Ngày, tháng, năm</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    colSpan={3}
                  >
                    <strong>Trả kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                    rowSpan={2}
                  >
                    <strong>Ghi chú</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Nhận hồ sơ</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Hẹn trả kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Ngày nhận kết quả</strong>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Bên giao</strong>
                    <br />
                    <i>(Ký tên)</i>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      padding: "5px",
                      border: "1px solid #333",
                      textAlign: 'center'
                    }}
                  >
                    <strong>Bên nhận</strong>
                    <br />
                    <i>(Ký tên)</i>
                  </td>
                </tr>
              </thead>
              <tbody id="data">
                {data?.map((item, index) => {
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
                        <span>{item.maHoSo}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "left",
                          minWidth: "30%",
                        }}
                      >
                        <span>{item.trichYeuHoSo}</span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>{item.soBoHoSo}</span>
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
                          textAlign: "left",
                        }}
                      >
                        <span>{item.diaChiChuHoSo}</span>
                      </td>
                      <td
                        className="addMsoNumberFormat_right"
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>{item.soDienThoaiChuHoSo}</span>
                      </td>

                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>
                          {item.ngayTiepNhan
                            ? dayjs(item.ngayTiepNhan).format(FORMAT_TIME)
                            : ""}
                        </span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>
                          {item.ngayHenTra
                            ? dayjs(item.ngayHenTra).format(FORMAT_TIME)
                            : ""}
                        </span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      >
                        <span>
                          {item.ngayTra
                            ? dayjs(item.ngayTra).format(FORMAT_TIME)
                            : ""}
                        </span>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                        }}
                      ></td>
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
