import { getCurrency } from "@/utils";
import { IThongKeQD766DonDocTTTTElement } from "../../models/ThongKe766Response";
import { CountDataThongKeThanhToanTheoHinhThucThanhToan } from "../ThongKeThanhToanTheoHinhThucThanhToan";
import { useEffect, useMemo, useState } from "react";

export const XuatThongKeThanhToanTheoHinhThucThanhToanTable = ({
  data, tuNgay, denNgay
}: {
  data: IThongKeQD766DonDocTTTTElement[] | undefined;
  tuNgay?: string,
  denNgay?: string
}) => {

  const [tBodyTable, setTBodyTable] = useState<string>('')
  const [lePhiDaThu, phiDaThu, soTien, tienMat, chuyenKhoanQuaCong, chuyenKhoanKhac, soLuot] = useMemo(() => {
    var tmp1 = 0;
    var tmp2 = 0;
    var tmp3 = 0;
    var tmp4 = 0;
    var tmp5 = 0;
    var tmp6 = 0;
    var tmp7 = 0;


    data?.map((item) => {
      tmp1 += item?.tongLePhi || 0;
      tmp2 += item?.tongPhi || 0;
      tmp3 += item?.tongSoTien || 0;
      tmp4 += item?.tongSoTienTienMat || 0;
      tmp5 += item?.tongSoTienTrucTuyen || 0;
      tmp6 += item?.tongSoTienChuyenKhoan || 0;
      tmp7 += item?.hoSoDaThuPhi || 0;
    });
    return [tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7];
  }, [data]);



  let tHeaderTable =
    `
  <tr>
    <td colspan="9" style=' vertical-align: middle; padding: 5px; text-align: center; font-size: 18px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        THEO DÕI THU PHÍ, LỆ PHÍ THEO HÌNH THỨC THANH TOÁN
      </strong>
    </td >
  </tr>
  <tr>
    <td colspan="9" style=' vertical-align: middle; padding: 5px; text-align: center; font-size: 18px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        (Từ ngày ${tuNgay || '...'} đến ngày ${denNgay || '...'})
      </strong>
    </td >
  </tr>
  <tr></tr>` +
    // <tr>
    //   <td></td>
    //   <td colspan='18' style=' vertical-align: middle; padding: 5px; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    //     <strong>
    //       Tên đơn vị: ${searchParams.donVi ? coCauToChucs?.filter(x => x.groupCode == searchParams.donVi)[0].groupName : ''}
    //     </strong>
    //   </td >
    // </tr>
    // <tr>
    //   <td></td>
    //   <td colspan='18' style=' vertical-align: middle; padding: 5px; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    //     <strong>
    //       Thời gian: ${thoiGianThu}
    //     </strong>
    //   </td >
    // </tr>
    // <tr></tr>
    `<tr>
    <td rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        STT
      </strong>
    </td >
    <td  rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 150px'>
      <strong>
        Tên đơn vị
      </strong>
    </td >
    <td rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        Lệ phí đã thu (VNĐ)
      </strong>
    </td >
    <td rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 250px'>
      <strong>
        Phí đã thu (VNĐ)
      </strong>
    </td >
    <td rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        Số tiền (VNĐ)
      </strong>
    </td >
    <td colspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 250px'>
      <strong>
        Phân loại theo hình thức thu phí, lệ phí
      </strong>
    </td >
    <td rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>Số lượt hồ sơ đã thu phí, lệ phí</strong>
    </td >
    
  </tr>
  <tr>
   <td rowspan="2" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>Tiền mặt (VNĐ)</strong>
    </td >
   <td colspan="2" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>Chuyển khoản (VNĐ)</strong>
    </td >
  </tr>
  <tr>
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>Qua cổng DVCQG</strong>
    </td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>Chuyển khoản khác</strong>
    </td >
  </tr>`

  useEffect(() => {
    if (data) {
      let tBodyTableString: string = ''
      data?.forEach((item: IThongKeQD766DonDocTTTTElement, index: number) => {
        tBodyTableString +=
          `
        <tr>
          <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${index + 1}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tenThongKe || ''}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tongLePhi ? getCurrency(item.tongLePhi) : 0}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tongPhi ? getCurrency(item.tongPhi) : 0}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tongSoTien ? getCurrency(item.tongSoTien) : 0}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tongSoTienTienMat ? getCurrency(item.tongSoTienTienMat) : 0}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tongSoTienTrucTuyen ? getCurrency(item.tongSoTienTrucTuyen) : 0}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.tongSoTienChuyenKhoan ? getCurrency(item.tongSoTienChuyenKhoan) : 0}
          </td >
          <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
            ${item.hoSoDaThuPhi ? getCurrency(item.hoSoDaThuPhi) : 0}
          </td >
        </tr>
        
      `
      })
      setTBodyTable(tBodyTableString)

    }
  }, [data])


  let tFooterTable =
    `
      <tr>
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>Tổng số</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${lePhiDaThu ? getCurrency(lePhiDaThu) : 0}</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${phiDaThu ? getCurrency(phiDaThu) : 0}</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${soTien ? getCurrency(soTien) : 0}</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${tienMat ? getCurrency(tienMat) : 0}</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${chuyenKhoanQuaCong ? getCurrency(chuyenKhoanQuaCong) : 0}</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${chuyenKhoanKhac ? getCurrency(chuyenKhoanKhac) : 0}</strong>
        </td >
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          <strong>${soLuot ? getCurrency(soLuot) : 0}</strong>
        </td >
      </tr>`

  return (
    <div id="ContainerSwapper" className="ContainerSwapper">
      <table
        id="tableHoSo"
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
        <thead
          id="thead"
          dangerouslySetInnerHTML={{
            __html: tHeaderTable || "",
          }}
        />

        <tbody
          id="tbody"
          dangerouslySetInnerHTML={{
            __html: tBodyTable || "",
          }}
        />
        <tfoot
          id="tbody"
          dangerouslySetInnerHTML={{
            __html: tFooterTable || "",
          }}
        />
      </table>
    </div>
  );
};
