import { FORMAT_DATE, FORMAT_TIME } from "@/data";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { KENH_THUC_HIEN, TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { getCurrency } from "@/utils";
import { PhoneOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
export const XuatDanhSachHoSoCanBoBCCIModal2 = ({
  data, searchParams
}: {
  data: IHoSo[] | undefined; searchParams: ISearchHoSo
}) => {

  const { datas: cocautochucs } = useAppSelector((state) => state.cocautochuc);



  const countSumary = () => {
    let tongThuHo: number = 0


    data?.forEach(item => {
      var nhanKqQuaBCCI = item.dangKyNhanHoSoQuaBCCIData
        ? JSON.parse(item.dangKyNhanHoSoQuaBCCIData)
        : {};
      let tmp: number = parseInt(nhanKqQuaBCCI.phiThuHo) || 0
      tongThuHo += tmp

    })


    return (
      <tr>
        <td colSpan={10} style={{
          verticalAlign: "middle", textAlign: "center", padding: "5px",
          border: "1px solid #333", fontFamily: "Times New Roman, Times, serif;", minWidth: "500px", fontWeight: 600
        }}
        >
          TỔNG SỐ
        </td>
        <td
          style={{
            verticalAlign: "middle", textAlign: "right", padding: "5px",
            border: "1px solid #333", fontFamily: "Times New Roman, Times, serif;", fontWeight: 600
          }}
        >
          {getCurrency(tongThuHo)}
        </td>
      </tr>
    )
  }

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
              colSpan={11}
              style={{
                verticalAlign: "middle",
                padding: "5px",
                fontSize: "16px",
                textAlign: 'center'
              }}
            >
              <strong>DANH SÁCH ĐĂNG KÝ CHUYỂN PHÁT QUA BƯU ĐIỆN TỈNH</strong>
              <br />
              {searchParams.groupCode
                ?
                <>
                  {`${cocautochucs?.filter(x => x.groupCode == searchParams.groupCode)[0].groupName.toLocaleUpperCase()} `
                    + `${dayjs(new Date()).format(FORMAT_DATE_WITHOUT_TIME)} (DK6/7)`
                  }
                </> : null
              }

            </td>
          </tr>
          <tr>
            <td colSpan={11} style={{ verticalAlign: "middle", padding: "5px" }}>
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
            >
              <strong>Số hiệu giấy tờ (Mã hồ sơ)</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
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
            >
              <strong>Số CCCD chủ hồ sơ</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Họ tên người nhận kết quả</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Địa chỉ đăng ký nhận kết quả</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Số điện thoại người nhận kết quả</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Ngày công dân đăng ký</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Ngày bưu điện nhận kết quả</strong>
            </td>
            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Số ký hiệu, kết quả</strong>
            </td>

            <td
              style={{
                verticalAlign: "middle",
                padding: "5px",
                border: "1px solid #333",
                textAlign: 'center'
              }}
            >
              <strong>Cước bưu điện thu</strong>
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
                    textAlign:"center"
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
                  {item?.maHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item?.trichYeuHoSo}
                </td>
                <td
                  className="addMsoNumberFormat_center"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.soGiayToChuHoSo}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {nhanKqQuaBCCI.hoVaTen}
                </td>

                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "left",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >


                  {nhanKqQuaBCCI.diaChi ? (


                    <span>{nhanKqQuaBCCI.diaChi}</span>

                  ) : null}
                </td>

                <td
                  className="addMsoNumberFormat_center"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: 'center'
                  }}
                >
                  {nhanKqQuaBCCI.soDienThoai ? (
                    <p >
                      {nhanKqQuaBCCI.soDienThoai}
                    </p>
                  ) : null}
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
                  {item.ngayDangKyBuuDien ? (
                    <p >
                      {dayjs(item.ngayDangKyBuuDien).format(FORMAT_DATE_WITHOUT_TIME)}
                    </p>
                  ) : null}
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
                  {item.ngayTraBuuDien ? (
                    <p >
                      {dayjs(item.ngayTraBuuDien).format(FORMAT_DATE_WITHOUT_TIME)}
                    </p>
                  ) : null}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                  }}
                >
                  {item.soKyHieuKetQua ? <p>{item.soKyHieuKetQua}</p> : null}
                </td>

                <td
                  className="addMsoNumberFormat_right"
                  style={{
                    verticalAlign: "middle",
                    padding: "5px",
                    border: "1px solid #333",
                    textAlign: "right"
                  }}
                >
                  {nhanKqQuaBCCI.phiThuHo ? (
                    <span >

                      {getCurrency(nhanKqQuaBCCI.phiThuHo)}
                      <br />
                    </span>) : 0}
                </td>

              </tr>
            );
          })}
          {countSumary()}
        </tbody>
      </table>
    </div>
  );
};
