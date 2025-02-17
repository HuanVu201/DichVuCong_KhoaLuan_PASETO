import { useEffect, useState } from "react";
import { useThongKePortalContext } from "../../context/ThongKePortalContext";
import { IThongKeTienDoGiaiQuyetResponse } from "../../models/ThongKe766Response";
import { AntdSpace } from "@/lib/antd/components";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchTienDoGiaiQuyetPortal } from "../../redux/action";
import { constrainedMemory } from "process";
import { useLocation, useSearchParams } from "react-router-dom";
import { MONTH, YEAR } from "@/data";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCurrencyThongKe } from "@/utils";
import dayjs from 'dayjs';
// import MapThongKe from "../ThongKeMap/MapThongKe";

export const ThongKeTongHop = ({ useThongKe }: { useThongKe: any }) => {
  const thongKePortalContext = useThongKePortalContext();
  const { getFromDateToDate, searchParams } = useThongKe();
  const dispatch = useAppDispatch();
  const [dataThongKe, setDataThongKe] =
    useState<IThongKeTienDoGiaiQuyetResponse>({
      data: [],
    });
  const [loading, setLoading] = useState<boolean>(false)
  let indexSo = 0;
  let indexVPDK = 0;
  let indexHuyen = 0;
  let indexAnyType = 0;
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const thangQuery = searchParams.get('thang');

  useEffect(() => {
    (async () => {
      setLoading(true)
      const month = searchParams.get("thang") || undefined;
      const year = searchParams.get("nam") || undefined;
      const date = getFromDateToDate(
        year ? +year : undefined,
        month ? +month : undefined
      );
      const tuNgay = date?.fromDate as Date;
      const denNgay = date?.toDate as Date;
      const res = await dispatch(
        SearchTienDoGiaiQuyetPortal({
          tuNgay: dayjs(tuNgay).format("YYYY-MM-DDT00:00:01"),
          denNgay: dayjs(denNgay).format("YYYY-MM-DDT23:59:59") as any,
          maDinhDanhCha: "",
          cache: true,
          laDuLieuThongKeCacNam: true
        })
      ).unwrap();
      if (res) setDataThongKe(res);
      setLoading(false)
    })();
  }, [searchParams]);

  return (
    <>
      {/* <MapThongKe/> */}
      <Spin spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
      >
        <div className="titleThongKe">
          <center>
            <strong>
              BẢNG TỔNG HỢP TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH
              {thangQuery ? ` THÁNG ${searchParams.get("thang") ?? MONTH}` : null}

              {" "} NĂM {" "} {searchParams.get("nam") ?? YEAR}
            </strong>
          </center>
        </div>
        <div
          id="ContainerSwapper"
          style={{
            fontSize: "13px",
            cursor: "default",
          }}
        >
          <table
            id="table"
            style={{
              verticalAlign: "middle",
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            <thead id="headerTable">
              <tr>
                <td
                  className="tdHeader tdData"
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>STT</strong>
                </td>
                <td
                  className="tdHeader"
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                    minWidth: '250px',
                  }}
                >
                  <strong>Đơn vị</strong>
                </td>
                <td
                  className="tdHeader tdData"
                  rowSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Tổng số tiếp nhận</strong>
                </td>
                <td
                  className="tdHeader"
                  colSpan={4}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Hồ sơ đã xử lý</strong>
                </td>
                <td
                  className="tdHeader "
                  colSpan={2}
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Hồ sơ đang xử lý</strong>
                </td>
              </tr>
              <tr>
                <td
                  className="tdHeader tdData"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Trước hạn</strong>
                </td>
                <td
                  className="tdHeader tdData"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>
                    Đúng hạn
                  </strong>
                </td>
                <td
                  className="tdHeader tdData"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Quá hạn</strong>
                </td>
                <td
                  className="tdHeader tdData"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Tỷ lệ trước hạn và đúng hạn</strong>
                </td>
                <td
                  className="tdHeader tdData"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>
                    Trong hạn
                  </strong>
                </td>
                <td
                  className="tdHeader tdData"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #dfb6a5",
                  }}
                >
                  <strong>Quá hạn</strong>
                </td>
              </tr>
            </thead>

            {/* //////////////////////////////////////////////////////////////////////////////////// */}
            <tbody id="data">
              {thongKePortalContext.catalogSearchPortal == "" ? (
                <>
                  {/* Sở ban ngành */}
                  <tr className="rowPhanCap" key="so-ban-nganh">
                    <td
                      colSpan={1}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #dfb6a5",
                      }}
                    >
                      I
                    </td>
                    <td
                      colSpan={17}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #dfb6a5",
                        textAlign: "left",
                      }}
                    >
                      Sở, ban, ngành
                    </td>
                  </tr>
                  {dataThongKe.data
                    .filter((x) => x.catalog)
                    .map((item) => {
                      if (item.catalog == "so-ban-nganh") {
                        indexSo++;
                        return (
                          <>
                            <tr
                              className={indexSo % 2 ? "rowChan" : "rowLe"}
                              key={indexSo}
                            >
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {indexSo}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                  textAlign: "left",
                                }}
                              >
                                {item.tenThongKe}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.tongTiepNhan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.daXuLyTruocHan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.daXuLyDungHan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.daXuLyQuaHan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                                  (item.daXuLyDungHan +
                                    item.daXuLyTruocHan +
                                    item.daXuLyQuaHan)
                                  ? (Math.round(
                                    ((item.daXuLyDungHan +
                                      item.daXuLyTruocHan) /
                                      (item.daXuLyDungHan +
                                        item.daXuLyTruocHan +
                                        item.daXuLyQuaHan)) *
                                    100 *
                                    100
                                  ) /
                                    100).toString().replace('.', ',') +
                                  "%"
                                  : "0"}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.dangXuLyQuaHan)}
                              </td>
                            </tr>
                          </>
                        );
                      }
                    })}
                  {/* Văn Phòng đăng kí đất đai */}
                  <tr className="rowPhanCap" key="vnvpdk">
                    <td
                      colSpan={1}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #dfb6a5",
                      }}
                    >
                      II
                    </td>
                    <td
                      colSpan={17}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #dfb6a5",
                        textAlign: "left",
                      }}
                    >
                      Văn phòng đăng ký đất đai
                    </td>
                  </tr>
                  {dataThongKe.data.map((item) => {
                    if (item.catalog == "cnvpdk") {
                      indexVPDK++;
                      return (
                        <>
                          <tr
                            className={indexVPDK % 2 ? "rowChan" : "rowLe"}
                            key={indexVPDK}
                          >
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {indexVPDK}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                                textAlign: "left",
                              }}
                            >
                              {item.tenThongKe}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.tongTiepNhan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.daXuLyTruocHan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.daXuLyDungHan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.daXuLyQuaHan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                                (item.daXuLyDungHan +
                                  item.daXuLyTruocHan +
                                  item.daXuLyQuaHan)
                                ? Math.round(
                                  ((item.daXuLyDungHan + item.daXuLyTruocHan) /
                                    (item.daXuLyDungHan +
                                      item.daXuLyTruocHan +
                                      item.daXuLyQuaHan)) *
                                  100 *
                                  100
                                ) /
                                100 +
                                "%"
                                : "0"}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.dangXuLyQuaHan)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  })}
                  {/* Quận huyện */}
                  <tr className="rowPhanCap" key="quan-huyen">
                    <td
                      colSpan={1}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #dfb6a5",
                      }}
                    >
                      III
                    </td>
                    <td
                      colSpan={17}
                      style={{
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #dfb6a5",
                        textAlign: "left",
                      }}
                    >
                      Cấp huyện
                    </td>
                  </tr>
                  {dataThongKe.data.map((item) => {
                    if (item.catalog == "quan-huyen") {
                      indexHuyen++;
                      return (
                        <>
                          <tr
                            className={indexHuyen % 2 ? "rowChan" : "rowLe"}
                            key={indexHuyen}
                          >
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {indexHuyen}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                                textAlign: "left",
                              }}
                            >
                              {item.tenThongKe}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.tongTiepNhan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.daXuLyTruocHan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.daXuLyDungHan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.daXuLyQuaHan)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                                (item.daXuLyDungHan +
                                  item.daXuLyTruocHan +
                                  item.daXuLyQuaHan)
                                ? Math.round(
                                  ((item.daXuLyDungHan + item.daXuLyTruocHan) /
                                    (item.daXuLyDungHan +
                                      item.daXuLyTruocHan +
                                      item.daXuLyQuaHan)) *
                                  100 *
                                  100
                                ) /
                                100 +
                                "%"
                                : "0"}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                padding: "5px",
                                border: "1px solid #dfb6a5",
                              }}
                            >
                              {getCurrencyThongKe(item.dangXuLyQuaHan)}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  })}
                </>
              ) : (
                // Bất kì
                <>
                  {dataThongKe.data
                    .filter((x) =>
                      x.catalog == thongKePortalContext.catalogSearchPortal &&
                        thongKePortalContext.catalogSearchPortal == "xa-phuong"
                        ? (thongKePortalContext.thongKeXaPhuong?.catalog ==
                          "quan-huyen"
                          ? x.maThongKeCha
                          : x.maThongKe) ==
                        thongKePortalContext.thongKeXaPhuong?.groupCode
                        : true
                    )
                    .map((item: any, index: number) => {
                      if (
                        item.catalog == thongKePortalContext.catalogSearchPortal
                      ) {
                        indexAnyType++;
                        return (
                          <>
                            <tr
                              className={indexAnyType % 2 ? "rowChan" : "rowLe"}
                              key={indexAnyType}
                            >
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {indexAnyType}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                  textAlign: "left",
                                }}
                              >
                                {item.tenThongKe}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.tongTiepNhan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.daXuLyTruocHan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.daXuLyDungHan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.daXuLyQuaHan)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                                  (item.daXuLyDungHan +
                                    item.daXuLyTruocHan +
                                    item.daXuLyQuaHan)
                                  ? Math.round(
                                    ((item.daXuLyDungHan +
                                      item.daXuLyTruocHan) /
                                      (item.daXuLyDungHan +
                                        item.daXuLyTruocHan +
                                        item.daXuLyQuaHan)) *
                                    100 *
                                    100
                                  ) /
                                  100 +
                                  "%"
                                  : "0"}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.dangXuLyTrongHanVaBoSung)}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  padding: "5px",
                                  border: "1px solid #dfb6a5",
                                }}
                              >
                                {getCurrencyThongKe(item.dangXuLyQuaHan)}
                              </td>
                            </tr>
                          </>
                        );
                      }
                    })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Spin>
    </>
  );
};
