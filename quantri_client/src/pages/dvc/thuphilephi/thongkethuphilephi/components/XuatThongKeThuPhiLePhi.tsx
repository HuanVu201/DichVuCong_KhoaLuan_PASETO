import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { ISearchYeuCauThanhToan, IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface IDataGroupByTrichYeu {
  tenTTHC?: string;
  items: IData[];
}

interface IData {
  maHoSo: string;
  chuHoSo: string;
  soGiayToChuHoSo: string;
  diaChiChuHoSo?: string;
  nguoiUyQuyen?: string;
  trichYeuHoSo?: string;
  nguoiNopTienBienLai?: string;
  diaChiBienLai?: string;
  hinhThucThanhToan?: string;
  ngayThuPhi?: string;

  lePhi?: number;
  phi?: number;
  soBienLaiPhi?: string;
  soBienLaiLePhi?: string;
  tenNguoiNhanHoSo?: string;
  kenhThucHien?: string;
  // thanhToanVNPTPay?: string;
  thanhToanQuaCongQuocGia?: string;
  tenNguoiThuPhi?: string;
}

export const XuatThongkeThuPhiLePhi = ({
  yeucauthanhtoans,
  searchParams,
  totalPhi, totalLePhi
}: {
  yeucauthanhtoans: IYeuCauThanhToan[] | undefined,
  searchParams: ISearchYeuCauThanhToan,
  totalPhi?: number,
  totalLePhi?: number
}) => {

  const [data, setData] = useState<IDataGroupByTrichYeu[]>()
  const [tBodyTable, setTBodyTable] = useState<string>('')
  const [totalBienLaiPhi, setTotalBienLaiPhi] = useState<number>(0)
  const [totalBienLaiLePhi, setTotalBienLaiLePhi] = useState<number>(0)
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);

  let thoiGianThu: string = ''
 
  if (searchParams.thanhToanTuNgay) {
    thoiGianThu += `Từ ngày ${dayjs(searchParams.thanhToanTuNgay).format(FORMAT_DATE_WITHOUT_TIME)}`

    if (searchParams.thanhToanDenNgay) {
      thoiGianThu += ` đến ngày ${dayjs(searchParams.thanhToanDenNgay).format(FORMAT_DATE_WITHOUT_TIME)}`
    }
  }


  function groupByTrichYeuHoSo(yeucauthanhtoans: IData[]): IDataGroupByTrichYeu[] {
    const grouped = yeucauthanhtoans.reduce((acc: any, item: any) => {
      const key = item?.tenTTHC || undefined;
      if (!acc[key]) {
        acc[key] = {
          tenTTHC: key,
          items: [],
        };
      }
      acc[key].items.push(item);
      return acc;
    }, {} as Record<string, IDataGroupByTrichYeu>);
    return Object.values(grouped);
  }



  useEffect(() => {
    if (yeucauthanhtoans) {
      const groupedData = groupByTrichYeuHoSo(yeucauthanhtoans as any);
      if (groupedData) {
        setData(groupedData as any)
      }
      let countBienLaiPhi: number = 0
      let countBienLaiLePhi: number = 0
      yeucauthanhtoans.forEach((item: IYeuCauThanhToan) => {
        if (item.soBienLaiPhi) {
          countBienLaiPhi++
        }
        if (item.soBienLaiLePhi) {
          countBienLaiLePhi++
        }
      })
      setTotalBienLaiPhi(countBienLaiPhi)
      setTotalBienLaiLePhi(countBienLaiLePhi)

    }

  }, [yeucauthanhtoans])


  let tHeaderTable =
    `
    <tr>
      <td colspan="19" style=' vertical-align: middle; padding: 5px; text-align: center; font-size: 18px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          DANH SÁCH THỦ TỤC HÀNH CHÍNH ĐÃ THU PHÍ, LỆ PHÍ
        </strong>
      </td >
    </tr>
    <tr></tr>
    <tr>
      <td></td>
      <td colspan='18' style=' vertical-align: middle; padding: 5px; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Tên đơn vị: ${searchParams.donVi ? coCauToChucs?.filter(x => x.groupCode == searchParams.donVi)[0].groupName : ''}
        </strong>
      </td >
    </tr>
    <tr>
      <td></td>
      <td colspan='18' style=' vertical-align: middle; padding: 5px; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Thời gian: ${thoiGianThu}
        </strong>
      </td >
    </tr>
    <tr></tr>
    <tr>
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          STT
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 150px'>
        <strong>
          Mã hồ sơ
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Chủ hồ sơ
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 250px'>
        <strong>
          Địa chỉ chủ hồ sơ
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Người nộp hồ sơ
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 250px'>
        <strong>
          Nội dung hồ sơ giải quyết
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <p>
          <strong>Người nộp tiền</strong><br/>
          <span>(Hiển thị trên biên lai)</span>
        </p>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <p>
          <strong>Địa chỉ người nộp tiền</strong><br/>
          <span>(Hiển thị trên biên lai)</span>
        </p>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 100px'>
        <p>
          <strong>Hình thức thanh toán</strong><br/>
          <span>(TM hoặc CK)</span>
        </p>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 100px'>
        <strong>
          Ngày thu phí, lệ phí
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 75px'>
        <strong>
          Phí đã thu
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 75px'>
        <strong>
          Lệ phí đã thu
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 75px'>
        <strong>
          Số biên lai phí
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 75px'>
        <strong>
          Số biên lai lệ phí
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Người tiếp nhận
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Loại tiếp nhận
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 75px'>
        <strong>
          Thanh toán qua VNPT PAY
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif; width: 75px'>
        <strong>
          Thanh toán qua Cổng Quốc gia
        </strong>
      </td >
      <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
        <strong>
          Người thu phí
        </strong>
      </td >
    </tr>`

  useEffect(() => {
    if (data) {
      let tBodyTableString: string = ''
      let index: number = 0
      data?.forEach((itemGroupBy: IDataGroupByTrichYeu) => {
        tBodyTableString +=
          `
          <tr>
            <td colspan="19" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
              <strong>
                ${itemGroupBy.tenTTHC || ''}
              </strong>
            </td >
          </tr>
          `

        itemGroupBy.items.forEach((item: IData) => {
          index++
          tBodyTableString +=
            `
            <tr>
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${index}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.maHoSo || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.chuHoSo || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.diaChiChuHoSo || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.nguoiUyQuyen ? item.nguoiUyQuyen : item.chuHoSo}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.trichYeuHoSo || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.nguoiNopTienBienLai || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.diaChiBienLai || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.hinhThucThanhToan == 'truc-tuyen' || item.hinhThucThanhToan == 'chuyen-khoan' ? "Chuyển khoản" : item.hinhThucThanhToan == 'tien-mat' ? "Tiền mặt" : ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.ngayThuPhi ? dayjs(item.ngayThuPhi).format(FORMAT_DATE_WITHOUT_TIME) : ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.phi ? getCurrency(item.phi) : ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                 ${item.lePhi ? getCurrency(item.lePhi) : ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.soBienLaiPhi || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.soBienLaiLePhi || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.tenNguoiNhanHoSo || ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.kenhThucHien == '1' ? "Trực tiếp" : item.kenhThucHien == '2' || item.kenhThucHien == '3' ? "Qua mạng" : ""}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.hinhThucThanhToan == 'truc-tuyen' ? 'DVCQG' : ''}
                </p>
              </td >
              <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
                <p>
                  ${item.tenNguoiThuPhi || ''}
                </p>
              </td >
            </tr>
          
          `
        })


      })

      setTBodyTable(tBodyTableString)
    }
  }, [data])

  let tFooterTable =
    `
  <tr>
    <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
    <td colSpan="9" style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        Tổng cộng
      </strong>
    </td >
    <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        ${totalPhi ? getCurrency(totalPhi) : 0}
      </strong>
    </td >
    <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: center; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong>
        ${totalLePhi ? getCurrency(totalLePhi) : 0}
      </strong>
    </td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
   <td style=' vertical-align: middle; padding: 5px; border: 1px solid #333; text-align: left; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'></td >
  </tr>
  <tr></tr>
  <tr>
    
    <td colSpan="14" style=' vertical-align: middle; padding: 5px; text-align: right; font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;'>
      <strong><i>
        Tổng số biên lai thu phí: ${totalBienLaiPhi}<br/>
        Tổng số biên lai thu lệ phí: ${totalBienLaiLePhi}<br/>

      </i></strong>
    </td >
  </tr>
  `

  return (
    <div
      id="ContainerSwapper"
      style={{
        display: "none",
        fontSize: "13px",
        fontFamily: "Times New Roman, Times, serif;",
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
          fontSize: "16px",
          fontFamily: "Times New Roman, Times, serif;",
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
