import { IHoSo } from "@/features/hoso/models";

export const XuatDanhSachHoSoTable = ({ data }: { data: IHoSo[] }) => {
  return (
    <table
      id="tableHoSo"
      style={{
        verticalAlign: "middle",
        borderCollapse: "collapse",
        width: "100%",
        textAlign: "center",
        margin: "10px 0",
        fontSize: "13px",
        display: "none",
      }}
    >
      {/* <thead> */}
      {/* <tr>
    <td colSpan={8} style={{ textAlign: "left", padding: "5px" }}>
      <strong>
        PHỤ LỤC II: DANH SÁCH ĐƠN VỊ, CÁ NHÂN CẤP TỈNH, HUYỆN, XÃ
        GIẢI QUYẾT HỒ SƠ QUÁ HẠN
      </strong>
    </td>
  </tr> */}

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
          <strong>Lĩnh vực</strong>
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
        <td
          style={{
            verticalAlign: "middle",
            padding: "5px",
            border: "1px solid #333",
          }}
        >
          <strong>Đơn vị/ cá nhân giải quyết</strong>
        </td>
      </tr>

      {/* </thead> */}
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
                <span>{item.groupName}</span>
              </td>

              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                  minWidth: "30%",
                }}
              >
                <span>{item.tenTTHC}</span>
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
                }}
              >
                <span>{item.diaChiChuHoSo}</span>
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
                <span>{item.ngayTiepNhan}</span>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                }}
              >
                <span>{item.ngayHenTra}</span>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "5px",
                  border: "1px solid #333",
                }}
              >
                <span>{item.ngayTra}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
