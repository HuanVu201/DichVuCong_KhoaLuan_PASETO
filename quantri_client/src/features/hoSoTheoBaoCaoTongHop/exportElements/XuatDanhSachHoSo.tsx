import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
export const XuatDanhSachHoSoModal = ({
  data,
}: {
  data: IHoSo[] | undefined;
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
          fontSize: "17px",
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
                fontSize: "19px",
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
              <strong>Đơn vị tiếp nhận</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Người tiếp nhận</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Tên thủ tục hành chính</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Mã hồ sơ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Trạng thái</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Địa chỉ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Chủ hồ sơ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Ngày nộp hồ sơ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Ngày nhận</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Ngày hẹn trả</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Ngày kết thúc xử lý</strong>
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
                    textAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.tenDonVi}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.tenTTHC}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.maHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {TRANGTHAIHOSO[item.trangThaiHoSoId]}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.diaChiChuHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.chuHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.ngayNopHoSo
                    ? dayjs(item.ngayNopHoSo).format(FORMAT_DATE)
                    : ""}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.ngayTiepNhan
                    ? dayjs(item.ngayTiepNhan).format(FORMAT_DATE)
                    : ""}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.ngayHenTra
                    ? dayjs(item.ngayHenTra).format(FORMAT_DATE)
                    : ""}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.ngayTra ? dayjs(item.ngayTra).format(FORMAT_DATE) : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
