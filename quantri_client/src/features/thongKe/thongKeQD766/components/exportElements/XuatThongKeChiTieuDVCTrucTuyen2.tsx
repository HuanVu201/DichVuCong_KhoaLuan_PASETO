import { getCurrencyThongKe } from "@/utils";
import { IThongKeChiTieuDVCElement, IThongKeChiTieuDVCResponse, IThongKeQD766DonDocTTTTElement, IThongKeTienDoGiaiQuyetElement, IThongKeTienDoGiaiQuyetResponse } from "../../models/ThongKe766Response";
import { CountDataThongKeThanhToanTheoHinhThucThanhToan } from "../ThongKeThanhToanTheoHinhThucThanhToan";
import { useEffect, useMemo, useState } from "react";

export const XuatThongKeChiTieuDVCTrucTuyen2 = ({
  data, tuNgay, denNgay, groupName
}: {
  data: IThongKeChiTieuDVCElement[] | undefined;
  tuNgay?: string,
  denNgay?: string,
  groupName?: string
}) => {
  const [tBodyTable, setTBodyTable] = useState<string>('')

  const [
    tongSoThuTucTotal, thuTucDvcTrucTuyenTotal, thuTucToanTrinhTotal,
    thuTucMotPhanTotal, thuTucPhatSinhHoSoTotal, tongHoSoPhatSinhTotal,
    thuTucTrucTuyenPhatSinhHoSoTotal, hoSoPhatSinhTrongThuTucTrucTuyenTotal,
    hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyenTotal, thuTucToanTrinhPhatSinhHoSoTotal,
    hoSoPhatSinhTrongThuTucToanTrinhTotal, hoSoPhatSinhTrucTuyenTrongThuTucToanTrinhTotal,
    thuTucMotPhanPhatSinhHoSoTotal, hoSoPhatSinhTrongThuTucMotPhanTotal,
    hoSoPhatSinhTrucTuyenTrongThuTucMotPhanTotal, thuTucDvcTotal, thuTucDvcPhatSinhHoSoTotal, hoSoPhatSinhTrongThuTucDvcTotal,

  ] = useMemo(() => {
    var tmp1 = 0, tmp2 = 0, tmp3 = 0, tmp4 = 0, tmp5 = 0, tmp6 = 0, tmp7 = 0, tmp8 = 0, tmp9 = 0, tmp10 = 0, tmp11 = 0, tmp12 = 0,
      tmp13 = 0, tmp14 = 0, tmp15 = 0, tmp16 = 0, tmp17 = 0, tmp18 = 0;

    data?.map((item) => {
      tmp1 += item?.tongSoThuTuc || 0;
      tmp2 += item?.thuTucDvcTrucTuyen || 0;
      tmp3 += item?.thuTucToanTrinh || 0;
      tmp4 += item?.thuTucMotPhan || 0;
      tmp5 += item?.thuTucPhatSinhHoSo || 0;
      tmp6 += item?.tongHoSoPhatSinh || 0;
      tmp7 += item?.thuTucTrucTuyenPhatSinhHoSo || 0;
      tmp8 += item?.hoSoPhatSinhTrongThuTucTrucTuyen || 0;
      tmp9 += item?.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen || 0;
      tmp10 += item?.thuTucToanTrinhPhatSinhHoSo || 0;
      tmp11 += item?.hoSoPhatSinhTrongThuTucToanTrinh || 0;
      tmp12 += item?.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh || 0;
      tmp13 += item?.thuTucMotPhanPhatSinhHoSo || 0;
      tmp14 += item?.hoSoPhatSinhTrongThuTucMotPhan || 0;
      tmp15 += item?.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan || 0;
      tmp16 += item?.thuTucDvc || 0;
      tmp17 += item?.thuTucDvcPhatSinhHoSo || 0;
      tmp18 += item?.hoSoPhatSinhTrongThuTucDvc || 0;
    });
    return [tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18];
  }, [data]);


  let tHeaderTable =
    `
<tr>
<td colspan="20" style=' vertical-align: middle; padding: 5px; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
  <strong>
    THEO DÕI CHỈ TIÊU DVC TRỰC TUYẾN - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
  </strong>
</td >
</tr>
<tr>
<td colspan="20" style=' vertical-align: middle; padding: 5px; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
  <i>
    (Từ ngày ${tuNgay || '...'} đến ngày ${denNgay || '...'})
  </i>
</td >
</tr>
<tr></tr>
<tr>
  <td rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;width: 50px'>
    <strong>
      STT
    </strong>
  </td >
  <td  rowspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 200px'>
    <strong>
      Tên đơn vị
    </strong>
  </td >
  <td colspan="4" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      Cung cấp DVC trực tuyến	
    </strong>
  </td >
  <td colspan="14" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      Phát sinh hồ sơ
    </strong>
  </td >
</tr>
<tr>
  <td rowspan="2" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; '>
    <strong>
      Tổng số thủ tục
    </strong>
  </td >
  <td colspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      DVC trực tuyến
    </strong>
  </td >
  <td colspan="5" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      Tổng
    </strong>
  </td >
  <td colspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      Toàn trình
    </strong>
  </td >
  <td colspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      Một phần
    </strong>
  </td >
  <td colspan="3" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
    <strong>
      Dịch vụ cung cấp thông tin
    </strong>
  </td >
</tr>

<tr>
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Tổng số</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Toàn trình</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Một phần</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số thủ tục phát sinh hồ sơ</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số thủ tục trực tuyến phát sinh hồ sơ</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp trong các thủ tục trực tuyến</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh trực tuyến</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số thủ tục</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh trực tuyến	</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số thủ tục</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh trực tuyến</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số thủ tục</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số thủ tục phát sinh hồ sơ</strong>
  </td >
  <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif; width: 80px;'>
    <strong>Số hồ sơ phát sinh</strong>
  </td >

</tr>
`

  useEffect(() => {
    if (data) {
      let tBodyTableString: string = ''
      data?.forEach((item: IThongKeChiTieuDVCElement, index: number) => {
        tBodyTableString +=
          `
      <tr>
        <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${index + 1}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.tenThongKe || ''}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.tongSoThuTuc ? getCurrencyThongKe(item.tongSoThuTuc) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucDvcTrucTuyen ? getCurrencyThongKe(item.thuTucDvcTrucTuyen) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucToanTrinh ? getCurrencyThongKe(item.thuTucToanTrinh) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucMotPhan ? getCurrencyThongKe(item.thuTucMotPhan) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucPhatSinhHoSo ? getCurrencyThongKe(item.thuTucPhatSinhHoSo) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.tongHoSoPhatSinh ? getCurrencyThongKe(item.tongHoSoPhatSinh) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucTrucTuyenPhatSinhHoSo ? getCurrencyThongKe(item.thuTucTrucTuyenPhatSinhHoSo) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrongThuTucTrucTuyen ? getCurrencyThongKe(item.hoSoPhatSinhTrongThuTucTrucTuyen) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen ? getCurrencyThongKe(item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucToanTrinhPhatSinhHoSo ? getCurrencyThongKe(item.thuTucToanTrinhPhatSinhHoSo) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrongThuTucToanTrinh ? getCurrencyThongKe(item.hoSoPhatSinhTrongThuTucToanTrinh) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh ? getCurrencyThongKe(item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucMotPhanPhatSinhHoSo ? getCurrencyThongKe(item.thuTucMotPhanPhatSinhHoSo) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrongThuTucMotPhan ? getCurrencyThongKe(item.hoSoPhatSinhTrongThuTucMotPhan) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan ? getCurrencyThongKe(item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucDvc ? getCurrencyThongKe(item.thuTucDvc) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.thuTucDvcPhatSinhHoSo ? getCurrencyThongKe(item.thuTucDvcPhatSinhHoSo) : 0}
        </td >
        <td  style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
          ${item.hoSoPhatSinhTrongThuTucDvc ? getCurrencyThongKe(item.hoSoPhatSinhTrongThuTucDvc) : 0}
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
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>Tổng số</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${tongSoThuTucTotal ? getCurrencyThongKe(tongSoThuTucTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucDvcTrucTuyenTotal ? getCurrencyThongKe(thuTucDvcTrucTuyenTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucToanTrinhTotal ? getCurrencyThongKe(thuTucToanTrinhTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucMotPhanTotal ? getCurrencyThongKe(thuTucMotPhanTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucPhatSinhHoSoTotal ? getCurrencyThongKe(thuTucPhatSinhHoSoTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${tongHoSoPhatSinhTotal ? getCurrencyThongKe(tongHoSoPhatSinhTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucTrucTuyenPhatSinhHoSoTotal ? getCurrencyThongKe(thuTucTrucTuyenPhatSinhHoSoTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrongThuTucTrucTuyenTotal ? getCurrencyThongKe(hoSoPhatSinhTrongThuTucTrucTuyenTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyenTotal ? getCurrencyThongKe(hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyenTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucToanTrinhPhatSinhHoSoTotal ? getCurrencyThongKe(thuTucToanTrinhPhatSinhHoSoTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrongThuTucToanTrinhTotal ? getCurrencyThongKe(hoSoPhatSinhTrongThuTucToanTrinhTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrucTuyenTrongThuTucToanTrinhTotal ? getCurrencyThongKe(hoSoPhatSinhTrucTuyenTrongThuTucToanTrinhTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucMotPhanPhatSinhHoSoTotal ? getCurrencyThongKe(thuTucMotPhanPhatSinhHoSoTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrongThuTucMotPhanTotal ? getCurrencyThongKe(hoSoPhatSinhTrongThuTucMotPhanTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrucTuyenTrongThuTucMotPhanTotal ? getCurrencyThongKe(hoSoPhatSinhTrucTuyenTrongThuTucMotPhanTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucDvcTotal ? getCurrencyThongKe(thuTucDvcTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${thuTucDvcPhatSinhHoSoTotal ? getCurrencyThongKe(thuTucDvcPhatSinhHoSoTotal) : 0}</strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: right; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>${hoSoPhatSinhTrongThuTucDvcTotal ? getCurrencyThongKe(hoSoPhatSinhTrongThuTucDvcTotal) : 0}</strong>
      </td >
    </tr>`

  return (
    <div id="tableToExcel">
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
        <tr>
          <td
            colSpan={10}
            style={{
              verticalAlign: "top",
              padding: "5px",
              textAlign: 'center',
            }}
          >
            {groupName ? <strong>{groupName.toUpperCase()} </strong> : ''}
          </td>
          <td
            colSpan={10}
            style={{
              verticalAlign: "top",
              padding: "5px",
              width: "3%",
              textAlign: 'center',
            }}
          >
            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br /><u>Độc lập - Tự do - Hạnh phúc</u></strong>
          </td>

        </tr>
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
