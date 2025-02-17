import { IThuTuc } from "@/features/thutuc/models";

export const XuatDanhSachThuTucTable = ({ data }: { data: IThuTuc[] }) => {
  return (
    <table
      id="tableThuTuc"
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
          <strong>MaTTHC</strong>
        </td>
        <td
          style={{
            verticalAlign: "middle",
            padding: "5px",
            border: "1px solid #333",
          }}
        >
          <strong>TenTTHC</strong>
        </td>
      </tr>

      {/* </thead> */}
      <tbody id="data">
        {data?.map((item: any, index: number) => {
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
                <span>{item.maTTHC}</span>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
