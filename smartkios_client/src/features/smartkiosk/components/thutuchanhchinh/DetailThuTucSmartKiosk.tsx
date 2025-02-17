import 'bootstrap/dist/css/bootstrap.css';
import "./DetailThuTucSmartKiosk.scss"
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import imagePaper from '../../../../assets/images/iconPaper.svg'
import { IThuTuc } from '@/features/thutuc/models';
import { thuTucApi } from '@/features/thutuc/services';
import { FilePdfOutlined, FileWordOutlined, LoginOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { downloadPdFromHtml } from '@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf2';
import { downloadPhieuWord } from '@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord';
import { useDanhMucThuTucPortalContext } from '@/features/portaldvc/DanhMucThuTuc/context/DanhMucThuTucPortalContext';
import { DanhMucThuTucPortalService } from '@/features/portaldvc/DanhMucThuTuc/services/DanhMucThuTucPortal';

interface IGoiTinThuTucQuocGia {

  tenCap_CapThucHien: string;
  loaiTTHC: string;
  tenLinhVuc_LinhVucThucHien: string;
  tenTrinhTu_TrinhTuThucHien: string;
  cachThucThucHien: string;
  thanhPhanHoSo: string;
  tenDoiTuong_DoiTuongThucHien: string;
  tenDonVi_CoQuanThucHien: string;
  tenDonVi_CoQuanCoThamQuyen: string;
  diaChiTiepNhan: string;
  tenDonVi_CoQuanDuocUyQuyen: string;
  tenDonVi_CoQuanPhoiHop: string;
  tenKetQua_KetQuaThucHien: string;
  canCuPhapLy: string;
  yeuCau: string;
  tuKhoa: string;
  moTa: string;

}


interface IQuyetDinhCongBo {
  soQuyetDinh_QDCB: string;
  ngayQuyetDinh_QDCB: string;
  trichYeu_QDCB: string;
}

function DetailThuTucHanhChinhSmartKiosk() {

  const thuTucPortalContext = useDanhMucThuTucPortalContext();
  const thuTucPortalService = new DanhMucThuTucPortalService();
  const [thuTuc, setThuTuc] = useState<IThuTuc>();
  const [goiTin, setGoiTin] = useState<IGoiTinThuTucQuocGia>();
  const [qdcb, setQDCB] = useState<IQuyetDinhCongBo>();
  // useEffect(() => {
  //   if (!thuTucPortalContext.searchParams.get('MaThuTuc'))
  //     thuTucPortalContext.setThuTucId('')
  // }, [thuTucPortalContext.handleUrlQueryStringChange])
  useEffect(() => {
    (async () => {
      if (thuTucPortalContext.thuTucId) {
        const resThuTuc = await thuTucPortalService.Get(thuTucPortalContext.thuTucId);
        if (resThuTuc?.data?.data) {
          setThuTuc(resThuTuc.data.data);
        }
      }
    })();
  }, [thuTucPortalContext.thuTucId]);
  useEffect(() => {
    thuTucPortalContext.handleUrlQueryStringChange({
      MaThuTuc: thuTuc?.maTTHC || "",
    })

  }, [thuTuc])


  useEffect(() => {
    let tmp_tenCap_CapThucHien = "";
    let tmp_loaiTTHC = "";
    let tmp_tenLinhVuc_LinhVucThucHien = "";
    let tmp_tenTrinhTu_TrinhTuThucHien = "";
    let tmp_cachThucThucHien = "";
    let tmp_thanhPhanHoSo = "";
    let tmp_tenDoiTuong_DoiTuongThucHien = "";
    let tmp_tenDonVi_CoQuanThucHien = "";
    let tmp_tenDonVi_CoQuanCoThamQuyen = "";
    let tmp_diaChiTiepNhan = "";
    let tmp_tenDonVi_CoQuanDuocUyQuyen = "";
    let tmp_tenDonVi_CoQuanPhoiHop = "";
    let tmp_tenKetQua_KetQuaThucHien = "";
    let tmp_canCuPhapLy = "";
    let tmp_yeuCau = "";
    let tmp_tuKhoa = "";
    let tmp_moTa = "";


    if (thuTuc?.goiTinThuTucQG) {
      const obj = JSON.parse(thuTuc?.goiTinThuTucQG) as any;

      obj.CAPTHUCHIEN?.map((item1: any) => {
        tmp_tenCap_CapThucHien += ` ${item1?.TENCAP} <br/>`;
      })

      if (obj.LOAITTHC == "1") {
        tmp_loaiTTHC += "TTHC không được luật giao cho địa phương quy định hoặc quy định chi tiết";
      }
      else if (obj.LOAITTHC == "2") {
        tmp_loaiTTHC += "TTHC được luật giao quy định chi tiết";
      }
      else if (obj.LOAITTHC == "3") {
        tmp_loaiTTHC += "Loại khác";
      }

      obj.LINHVUCTHUCHIEN?.map((item1: any) => {
        tmp_tenLinhVuc_LinhVucThucHien += ` ${item1?.TENLINHVUC} <br/>`;
      })

      obj.TRINHTUTHUCHIEN?.map((item1: any) => {
        if (item1.TRUONGHOP != "") {
          tmp_tenTrinhTu_TrinhTuThucHien += `<strong>${item1.TRUONGHOP}</strong><br/>`
        }
        item1.TRINHTU.map((item2: any) => {
          tmp_tenTrinhTu_TrinhTuThucHien += ` ${item2.TENTRINHTU}<br/>`;
        })
      })
      if (tmp_tenTrinhTu_TrinhTuThucHien)
        tmp_tenTrinhTu_TrinhTuThucHien = JSON.stringify(tmp_tenTrinhTu_TrinhTuThucHien.replace(/\n/g, "<br>"));

      tmp_cachThucThucHien += `
                <table className='table-data'>
                <thead>
                    <tr>
                        <th style="width: 10%; vertical-align: top; text-align: left">Hình thức nộp</th>
                        <th style="width: 15%; vertical-align: top; text-align: left">Thời hạn giải quyết</th>
                        <th style="width: 25%; vertical-align: top; text-align: left">Phí, lệ phí</th>
                        <th style="width: 50%; vertical-align: top; text-align: left">Mô tả</th>
                    </tr>
                </thead>
                <tbody>`

      obj.CACHTHUCTHUCHIEN?.map((item1: any) => {
        tmp_cachThucThucHien += "<tr>"
        if (item1.KENH == "1") {
          tmp_cachThucThucHien += `<td>Trực tiếp</td>`
        }
        if (item1.KENH == "2") {
          tmp_cachThucThucHien += `<td>Nộp trực tuyến</td>`
        }
        if (item1.KENH == "3") {
          tmp_cachThucThucHien += `<td>Nộp qua bưu chính công ích</td>`
        }

        tmp_cachThucThucHien += `<td>`
        item1.THOIGIAN?.map((item2: any) => {
          tmp_cachThucThucHien += `${item2.THOIGIANGIAIQUYET} ${item2.DONVITINH} <br/>`
        })
        tmp_cachThucThucHien = tmp_cachThucThucHien ? tmp_cachThucThucHien.slice(0, -5) : '';
        tmp_cachThucThucHien += `</td><td style="color: #b10069">`

        item1.THOIGIAN?.map((item2: any) => {
          item2.PHILEPHI?.map((item3: any) => {
            tmp_cachThucThucHien += `-- ${item3.MOTA}: ${item3.SOTIEN} ${item3.DONVI} <br/>`
          })
        })
        tmp_cachThucThucHien = tmp_cachThucThucHien ? tmp_cachThucThucHien.slice(0, -5) : '';
        tmp_cachThucThucHien += `</td><td>`
        item1.THOIGIAN?.map((item2: any) => {
          tmp_cachThucThucHien += `${item2.MOTA ? item2.MOTA.replace(/\n/g, "<br>") : ''} <br/>`
        })

        tmp_cachThucThucHien += `</td>`

        tmp_cachThucThucHien += "</tr>"
      })
      tmp_cachThucThucHien += `
                    </tbody>
                </table> `

      tmp_thanhPhanHoSo += `
                <table className='table-data'>
                <thead>
                    <tr>
                        <th style="width: 65%; vertical-align: top; text-align: left">Tên giấy tờ</th>
                        <th style="width: 15%; vertical-align: top; text-align: left">Mẫu đơn, tờ khai</th>
                        <th style="width: 20%; vertical-align: top; text-align: left">Số lượng</th>
                    </tr>
                </thead>
                <tbody>`

      obj.THANHPHANHOSO?.map((item1: any) => {
        item1.GIAYTO?.map((item2: any) => {
          tmp_thanhPhanHoSo += "<tr>"
          tmp_thanhPhanHoSo += `<td>${item2.TENGIAYTO ? item2.TENGIAYTO.replace(/\n/g, "<br>") : ''}</td>`
          tmp_thanhPhanHoSo += `<td><a href="${item2.URL}">${item2.TENMAUDON}</a></td>`
          tmp_thanhPhanHoSo += `<td>BẢN CHÍNH: ${item2.SOBANCHINH}<br/>BẢN SAO: ${item2.SOBANSAO}</td>`
          tmp_thanhPhanHoSo += "</tr>"
        })
      })
      tmp_thanhPhanHoSo += `
                    </tbody>
                </table> `


      obj.DOITUONGTHUCHIEN?.map((item1: any) => {
        tmp_tenDoiTuong_DoiTuongThucHien += ` ${item1?.TENDOITUONG} <br/>`;
      })
      if (tmp_tenDoiTuong_DoiTuongThucHien)
        tmp_tenDoiTuong_DoiTuongThucHien = JSON.stringify(tmp_tenDoiTuong_DoiTuongThucHien.replace(/\n/g, "<br>"));

      obj.COQUANTHUCHIEN?.map((item1: any) => {
        tmp_tenDonVi_CoQuanThucHien += ` ${item1?.TENDONVI} <br/>`;
      })
      if (tmp_tenDonVi_CoQuanThucHien)
        tmp_tenDonVi_CoQuanThucHien = JSON.stringify(tmp_tenDonVi_CoQuanThucHien.replace(/\n/g, "<br>"));

      obj.COQUANCOTHAMQUYEN?.map((item1: any) => {
        tmp_tenDonVi_CoQuanCoThamQuyen += ` ${item1?.TENDONVI} <br/>`;
      })
      if (tmp_tenDonVi_CoQuanCoThamQuyen)
        tmp_tenDonVi_CoQuanCoThamQuyen = JSON.stringify(tmp_tenDonVi_CoQuanCoThamQuyen.replace(/\n/g, "<br>"));

      tmp_diaChiTiepNhan = obj.DIACHITIEPNHAN;
      if (tmp_diaChiTiepNhan)
        tmp_diaChiTiepNhan = JSON.stringify(tmp_diaChiTiepNhan.replace(/\n/g, "<br>"));

      obj.COQUANDUOCUYQUYEN?.map((item1: any) => {
        tmp_tenDonVi_CoQuanDuocUyQuyen += ` ${item1?.TENDONVI} <br/>`;
      })
      if (tmp_tenDonVi_CoQuanDuocUyQuyen)
        tmp_tenDonVi_CoQuanDuocUyQuyen = JSON.stringify(tmp_tenDonVi_CoQuanDuocUyQuyen.replace(/\n/g, "<br>"));

      obj.COQUANPHOIHOP?.map((item1: any) => {
        tmp_tenDonVi_CoQuanPhoiHop += ` ${item1?.TENDONVI} <br/>`;
      })
      if (tmp_tenDonVi_CoQuanPhoiHop)
        tmp_tenDonVi_CoQuanPhoiHop = JSON.stringify(tmp_tenDonVi_CoQuanPhoiHop.replace(/\n/g, "<br>"));

      obj.KETQUATHUCHIEN?.map((item1: any) => {
        tmp_tenKetQua_KetQuaThucHien += ` ${item1?.TENKETQUA} <br/>`;
      })
      if (tmp_tenKetQua_KetQuaThucHien)
        tmp_tenKetQua_KetQuaThucHien = JSON.stringify(tmp_tenKetQua_KetQuaThucHien.replace(/\n/g, "<br>"));



      tmp_canCuPhapLy += `
            <table className='table-data'>
            <thead>
                <tr>
                    <th style="width: 40%; vertical-align: top; text-align: left">Số ký hiệu</th>
                    <th style="width: 60%; vertical-align: top; text-align: left">Trích yếu</th>
                </tr>
            </thead>
            <tbody>`

      obj.CANCUPHAPLY?.map((item1: any) => {
        tmp_canCuPhapLy +=
          `<tr>
                <td>${item1.SOVANBAN}</td>
                <td>${item1.TENVANBAN}</td>
            </tr>`
      })
      tmp_canCuPhapLy += `
                </tbody>
            </table> `

      tmp_yeuCau = obj.YEUCAU
      if (tmp_yeuCau)
        tmp_yeuCau = JSON.stringify(tmp_yeuCau.replace(/\n/g, "<br>"));

      tmp_tuKhoa = obj.TUKHOA;
      if (tmp_tuKhoa)
        tmp_tuKhoa = JSON.stringify(tmp_tuKhoa.replace(/\n/g, "<br>"));

      tmp_moTa = obj.MOTA;
      if (tmp_moTa)
        tmp_moTa = JSON.stringify(tmp_moTa.replace(/\n/g, "<br>"));

      setGoiTin({
        ...goiTin,
        tenCap_CapThucHien: tmp_tenCap_CapThucHien ? tmp_tenCap_CapThucHien.slice(0, -5) : '',
        loaiTTHC: tmp_loaiTTHC,
        tenLinhVuc_LinhVucThucHien: tmp_tenLinhVuc_LinhVucThucHien ? tmp_tenLinhVuc_LinhVucThucHien.slice(0, -5) : '',
        tenTrinhTu_TrinhTuThucHien: tmp_tenTrinhTu_TrinhTuThucHien ? tmp_tenTrinhTu_TrinhTuThucHien.slice(1, -6) : '',
        cachThucThucHien: tmp_cachThucThucHien,
        thanhPhanHoSo: tmp_thanhPhanHoSo,
        tenDoiTuong_DoiTuongThucHien: tmp_tenDoiTuong_DoiTuongThucHien ? tmp_tenDoiTuong_DoiTuongThucHien.slice(1, -6) : '',
        tenDonVi_CoQuanThucHien: tmp_tenDonVi_CoQuanThucHien ? tmp_tenDonVi_CoQuanThucHien.slice(1, -6) : '',
        tenDonVi_CoQuanCoThamQuyen: tmp_tenDonVi_CoQuanCoThamQuyen ? tmp_tenDonVi_CoQuanCoThamQuyen.slice(1, -6) : '',
        diaChiTiepNhan: tmp_diaChiTiepNhan ? tmp_diaChiTiepNhan.slice(1, -1) : '',
        tenDonVi_CoQuanDuocUyQuyen: tmp_tenDonVi_CoQuanDuocUyQuyen ? tmp_tenDonVi_CoQuanDuocUyQuyen.slice(1, -6) : '',
        tenDonVi_CoQuanPhoiHop: tmp_tenDonVi_CoQuanPhoiHop ? tmp_tenDonVi_CoQuanPhoiHop.slice(1, -6) : '',
        tenKetQua_KetQuaThucHien: tmp_tenKetQua_KetQuaThucHien ? tmp_tenKetQua_KetQuaThucHien.slice(1, -6) : '',
        canCuPhapLy: tmp_canCuPhapLy,
        yeuCau: tmp_yeuCau ? tmp_yeuCau.slice(1, -1) : '',
        tuKhoa: tmp_tuKhoa ? tmp_tuKhoa.slice(1, -1) : '',
        moTa: tmp_moTa ? tmp_moTa.slice(1, -1) : '',
      });

    }


    if (thuTuc?.quyetDinhCongBo) {
      const obj = JSON.parse(thuTuc?.quyetDinhCongBo) as any;
      const inputDateString = obj.NGAYQUYETDINH;
      const inputDate = new Date(inputDateString);
      const day = String(inputDate.getDate()).padStart(2, '0');
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const year = inputDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setQDCB({ ...qdcb, soQuyetDinh_QDCB: obj.SOQUYETDINH, ngayQuyetDinh_QDCB: formattedDate, trichYeu_QDCB: obj.TRICHYEU });
    }


  }, [thuTuc])

  return (
    <div className='chi-tiet-thu-tuc-dvcqg' style={{ padding: 0 }}>
      <div className='main-title'>
        <h2 >
          <img src={imagePaper} />
          {thuTuc?.tenTTHC}
        </h2>
      </div>
      <div className="actionThuTucDetail">
        <div className='nopTrucTuyen'>
          <Link to={`/smartkiosk/dang-ki-dich-vu-cong?maTTHC=${thuTuc?.maTTHC}`}>
            <LoginOutlined style={{ marginRight: '10px', fontSize: '20px' }} />
            Nộp hồ sơ trực tuyến
          </Link>
        </div>
        {/* <div className='download' onClick={() => downloadPhieuWord(`${thuTuc?.tenTTHC}`)}>
          <FileWordOutlined style={{ marginRight: '10px', fontSize: '16px' }} />
          PDF
        </div> */}

      </div>
      <div className='content' id='ContainerSwapper'>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <td style={{ width: '25%' }}></td>
              <td style={{ width: '75%' }}></td>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className='key titleColumnn' style={{ verticalAlign: 'top', padding: '3px 10px' }}><b>Mã thủ tục:</b></td>
              <td className='contentColumn' style={{ verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: thuTuc?.maTTHC || "" }} />
              </td>
            </tr>
            <tr>
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Số quyết định:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <table className='table-data' style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "20%", textAlign: 'left' }}>Số</th>
                      <th style={{ width: "20%", textAlign: 'left' }}>Ngày</th>
                      <th style={{ width: "60%", textAlign: 'left' }}>Trích yếu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{qdcb?.soQuyetDinh_QDCB}</td>
                      <td>{qdcb?.ngayQuyetDinh_QDCB}</td>
                      <td>{qdcb?.trichYeu_QDCB}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Tên thủ tục:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: thuTuc?.tenTTHC || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Cấp thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenCap_CapThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Loại thủ tục:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.loaiTTHC || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Lĩnh vực:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenLinhVuc_LinhVucThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Trình tự thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenTrinhTu_TrinhTuThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Cách thức thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.cachThucThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Thành phần hồ sơ:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.thanhPhanHoSo || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Đối tượng thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenDoiTuong_DoiTuongThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Cơ quan thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenDonVi_CoQuanThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Cơ quan có thẩm quyền:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenDonVi_CoQuanCoThamQuyen || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Địa chỉ tiếp nhận hồ sơ:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.diaChiTiepNhan || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Cơ quan được ủy quyền:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenDonVi_CoQuanDuocUyQuyen || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Cơ quan phối hợp:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenDonVi_CoQuanPhoiHop || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Kết quả thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tenKetQua_KetQuaThucHien || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Căn cứ pháp lý:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.canCuPhapLy || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Yêu cầu, điều kiện thực hiện:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.yeuCau || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Từ khóa:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.tuKhoa || "" }} />
              </td>
            </tr>


            <tr >
              <td className='key titleColumnn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}><b>Mô tả:</b></td>
              <td className='contentColumn' style={{ borderTop: '1px solid #e9e5d7', verticalAlign: 'top', padding: '3px 10px' }}>
                <div dangerouslySetInnerHTML={{ __html: goiTin?.moTa || "" }} />
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      <input type='submit' value="Quay lại" className='btn btn-info'
        onClick={() => {
          thuTucPortalContext.setThuTucId("")
          thuTucPortalContext.handleUrlQueryStringChange({
            MaThuTuc: "",
          })
        }
        }
      />
    </div>
  );
}

export default DetailThuTucHanhChinhSmartKiosk;