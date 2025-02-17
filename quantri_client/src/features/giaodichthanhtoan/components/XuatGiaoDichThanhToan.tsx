import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
import { IGiaoDichThanhToan } from "../models";
export const XuatDanhSachGiaoDichThanhToanModal = ({
  data,
}: {
  data: IGiaoDichThanhToan[] | undefined;
}) => {
  return (
    <div id="ContainerSwapper">
      <table
        id="danhSachHoSoTable"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
          fontSize: "16px",
          display: "none",
        }}
      >
        <thead>
          <tr>
            <td
              colSpan={9}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                fontSize: "16px",
              }}
            >
              {/* <strong>THỐNG KÊ HỒ SƠ TIẾP NHẬN QUÁ HẠN</strong> */}
              <br />
              {/* <strong
                className="filterDate"
                dangerouslySetInnerHTML={{ __html: dateToDate || "" }}
              /> */}
            </td>
          </tr>
          <tr>
            <td colSpan={8} style={{ verticalAlign: "middle", padding: "5px" }}>
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
              <strong>Thời gian giao dịch</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Hồ sơ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Mã tham chiếu</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Số tiền (VNĐ)</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Người nộp tiền biên lai</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Địa chỉ biên lai</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Mã số thuế người nộp tiền biên lai</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>trạng thái</strong>
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
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.thoiGianGD ? dayjs(item?.thoiGianGD).format(FORMAT_DATE) : ""}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.hoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.maThamChieu}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {getCurrency(item.soTien)}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.nguoiNopTienBienLai}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.diaChiBienLai}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.maSoThueBienLai}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.trangThai == "khoi-tao" ? "Chờ xác nhận" : item.trangThai == "thanh-cong" ? "Thành công" : "Thất bại"}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
