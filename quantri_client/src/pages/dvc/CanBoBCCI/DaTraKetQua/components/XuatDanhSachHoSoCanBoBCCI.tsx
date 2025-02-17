import { FORMAT_DATE } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import { PhoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
export const XuatDanhSachHoSoCanBoBCCIModal = ({
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
          fontSize: "16px",
          display: "none"
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
              <strong>Đơn vị tiếp nhận</strong>
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
              <strong>Chủ hồ sơ</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Thông tin người nhận kết quả qua BCCI</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Số điện thoại</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Mã vận đơn bưu điện</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
              }}
            >
              <strong>Phí thu hộ</strong>
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
              var nhanKqQuaBCCI = item.dangKyNhanHoSoQuaBCCIData
              ? JSON.parse(item.dangKyNhanHoSoQuaBCCIData)
              : {};
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
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.chuHoSo}
                </td>
                <td
                  style={{
                    textAlign:"left",
                    verticalAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                 <span >{nhanKqQuaBCCI.hoVaTen}</span>
                 <br/>
               
              {nhanKqQuaBCCI.diaChi ? (


                  <span>{nhanKqQuaBCCI.diaChi}</span>
              
              ) : null}
                </td>
               
               <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                 {nhanKqQuaBCCI.soDienThoai ? (
                <span >
                {nhanKqQuaBCCI.soDienThoai}
                </span>
              ) : null}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.maVanDonBuuDien}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                 {nhanKqQuaBCCI.phiThuHo ? (
                <span >
                 
                {getCurrency(nhanKqQuaBCCI.phiThuHo) }
                <br/>
                </span>): ""}
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
                  {item?.ngayKetThucXuLy
                    ? dayjs(item.ngayKetThucXuLy).format(FORMAT_DATE)
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
