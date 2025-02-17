import { FORMAT_DATE } from "@/data";
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
export const XuatDanhSachChoThuPhi = ({
  yeucauthanhtoans,
}: {
  yeucauthanhtoans: IYeuCauThanhToan[] | undefined;
}) => {
  return (
    <div
      id="ContainerSwapper"
      style={{
        display: "none",
        fontSize: "13px",
      }}
    >
      <table
        id="tableToExcel"
        style={{
          verticalAlign: "middle",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
          fontSize: "13px",
        }}
      >
        <tr>
          <td
            colSpan={8}
            style={{
              textAlign: "left",
              verticalAlign: "middle",
              padding: "5px",
            }}
          >
            <strong>THỐNG KÊ THU PHÍ, LỆ PHÍ</strong>
          </td>
        </tr>
        <thead>
          <tr>
            <td
              style={{
                textAlign: "center",
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
              <strong>Mã hồ sơ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Người nộp (In BL)</strong>
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
              <strong>Địa chỉ chủ hồ sơ (In BL)</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Người yêu cầu</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Đơn vị yêu cầu</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Ngày chuyển TTHCC</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Hình thức thu</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Thu phí/lệ phí (VNĐ)</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {yeucauthanhtoans?.map((item, index) => {
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
                    textAlign: "center",
                  }}
                >
                  {item.maHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <span>
                    {item.nguoiNopTienBienLai ||
                      item.nguoiUyQuyen ||
                      item.chuHoSo}
                  </span>
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
                  }}
                >
                  <span>{item.diaChiBienLai || item.diaChiChuHoSo}</span>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <span>{item.tenNguoiYeuCau}</span>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <span>{item.tenDonVi}</span>
                </td>
                <td
                className="addMsoNumberFormat_right"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'right'
                  }}
                >
                  <span>
                    {item.createdOn
                      ? dayjs(item.createdOn).format(FORMAT_DATE)
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
                  <span>{item.hinhThucThu}</span>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "500" }}>
                      {" "}
                      - Phí: {getCurrency(item.phi ?? "0")}
                    </div>
                    <div style={{ fontWeight: "500" }}>
                      {" "}
                      - Lệ phí: {getCurrency(item.lePhi ?? "0")}
                    </div>
                    <div style={{ fontWeight: "500" }}>
                      {" "}
                      - Số tiền: {getCurrency(item.soTien ?? "0")}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
