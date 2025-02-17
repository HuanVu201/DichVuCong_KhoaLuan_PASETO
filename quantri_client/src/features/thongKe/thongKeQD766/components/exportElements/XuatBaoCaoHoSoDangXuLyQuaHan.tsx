import { useEffect, useState } from "react"
import { ISearchThongKeParams } from "../../models/ThongKeQD766Search"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IParseUserToken } from "@/models";
import { SearchHoSoQuaHan } from "../SearchHoSoQuaHan";
import { SearchHoSoQuaHanAction } from "@/features/hoso/redux/action";
import { IHoSoTheoTrangThaiXuLy } from "@/features/hoso/models/searchHoSoTheoTrangThaiXuLy";
import dayjs from "dayjs";
import { export2Word } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { toast } from "react-toastify";

export const XuatBaoCaoHoSoDangXuLyQuaHanTable = ({
  hoSos,
  userData,
  tuNgay,
  denNgay,
  groupName
}: {
  hoSos: IHoSoTheoTrangThaiXuLy[]
  userData?: IParseUserToken,
  tuNgay?: string,
  denNgay?: string,
  groupName?: string
}) => {
  const dispatch = useAppDispatch();
  const {

    count: countHoSo,
    loading: loadingHoSo,
  } = useAppSelector((state) => state.hoso);
  var [dataDangXuLyQuaHan, setDataDangXuLyQuaHan] = useState<IHoSoTheoTrangThaiXuLy[]>([]);

  // useEffect(() => {
  //     if (userData) {
  //         if (
  //             searchParams.tuNgay &&
  //             searchParams.denNgay &&
  //             searchParams.trangThaiXuLy
  //         )
  //             dispatch(
  //                 SearchHoSoQuaHanAction({
  //                     ...searchParams,
  //                     maDinhDanhCha:
  //                         searchParams.maDinhDanhCha ?? userData?.typeUser != "Admin"
  //                             ? userData?.maDinhDanh
  //                             : searchParams.maDinhDanhCha,
  //                 })
  //             );
  //     }
  // }, [searchParams, userData]);

  useEffect(() => {
    if (hoSos && hoSos.length > 0) {
      const groupedDangXuLy = hoSos.reduce((acc: any, item: any) => {
        if (!item.daXuLy) {
          const key = item.catalog == "cnvpdk" ? "Chi nhánh VPĐKĐĐ" : item?.ofGroupName ? item.ofGroupName : item.groupName ? item.groupName : undefined;
          if (!acc[key]) {
            acc[key] = {
              ofGroupName: key,

              thanhPhan: [],
            };
          }
          acc[key].thanhPhan.push(item);
        }
        return acc;

      }, {} as Record<string, IHoSoTheoTrangThaiXuLy[]>);

      setDataDangXuLyQuaHan(Object.values(groupedDangXuLy) ?? []);

      setTimeout(() => {
        export2Word(
          "Danh sách hồ sơ xử lý quá hạn",
          true,
          "ContainerSwapper3"
        )

      }, 1000)
    } else {
      setDataDangXuLyQuaHan([]);

      // toast.warning("Không có dữ liệu hồ sơ quá hạn")
    }
  }, [hoSos])

  return <div>
    <div
      id="ContainerSwapper3"
      className="ContainerSwapper3"
      style={{
        fontSize: "13px",
        display: "none"
      }}
    >
      {dataDangXuLyQuaHan && dataDangXuLyQuaHan.length > 0 ? <>
        <table
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
                colSpan={9}
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  textAlign: 'center',
                }}
              >
                <strong>Phụ lục II</strong>
                <br />
                <strong>DANH SÁCH ĐƠN VỊ, CÁ NHÂN ĐANG CHẬM TRỄ TRONG VIỆC GIẢI QUYẾT HỒ SƠ TTHC</strong>
                <br />
                <i>(Từ ngày {tuNgay ?? "..."} đến ngày {denNgay ?? "..."} )</i>
              </td>
            </tr>

            <tr><p></p></tr>
          </thead>
        </table>
        <table
          id="tableHoSo"
          style={{
            verticalAlign: "middle",
            borderCollapse: "collapse",
            width: "100%",


            fontSize: "13px",
          }}
        >
          <thead>

            <tr>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "3%"
                }}
              >
                <strong>STT</strong>
              </td>

              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "7%"
                }}
              >
                <strong>Mã hồ sơ</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "15%"
                }}
              >
                <strong>Ngày tiếp nhận</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "15%"
                }}
              >
                <strong>Ngày hẹn trả</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "15%"
                }}
              >
                <strong>Đơn vị giải quyết</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "15%"
                }}
              >
                <strong>Cán bộ đang xử lý</strong>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  textAlign: "center",
                  width: "15%"
                }}
              >
                <strong>Ghi chú</strong>
              </td>
            </tr>

          </thead>
          <tbody id="data">
            {dataDangXuLyQuaHan?.map((item, index) => {

              if (item.thanhPhan && item.thanhPhan.length > 0)
                return (
                  <>
                    <tr>

                      <td
                        colSpan={7}
                        style={{
                          verticalAlign: "middle",
                          padding: "5px",
                          border: "1px solid #333",
                          textAlign: "left",

                        }}
                      >
                        <strong>{item.ofGroupName}</strong>
                      </td>
                    </tr>
                    {item.thanhPhan.map((hoSo: any, idx: any) => {
                      var tenNguoiDangXuLy = hoSo.tenNguoiDangXuLy ? hoSo.tenNguoiDangXuLy.split("##") : [];

                      return <tr>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "center",

                          }}
                        >
                          {idx + 1}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "center",

                          }}
                        >
                          {hoSo.maHoSo}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "center",

                          }}
                        >
                          {hoSo.ngayTiepNhan
                            ? dayjs(hoSo.ngayTiepNhan).format(
                              "DD/MM/YYYY"
                            )
                            : ""}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "center",

                          }}
                        >
                          {hoSo.ngayHenTra
                            ? dayjs(hoSo.ngayHenTra).format(
                              "DD/MM/YYYY"
                            )
                            : ""}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "left",

                          }}
                        >
                          {hoSo.groupName}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "left",

                          }}
                        >
                          {hoSo.tenNguoiDangXuLy ? hoSo.tenNguoiDangXuLy.replace("##", "; ") : ""}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "5px",
                            border: "1px solid #333",
                            textAlign: "left",

                          }}
                        >

                        </td>
                      </tr>
                    })
                    }
                  </>)



              return null
            })}
          </tbody>
        </table></> : null}
    </div>
  </div>
}