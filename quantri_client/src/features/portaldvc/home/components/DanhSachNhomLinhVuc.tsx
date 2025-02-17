import "./DanhSachNhomLinhVuc.scss";
import { useEffect, useState } from "react";
import { Row, Col, Divider, Button } from "antd";
import { Link, redirect } from "react-router-dom";
import imageCoCon from './iconLinhVuc/CongDan/cocon.svg'
import imageHocTap from './iconLinhVuc/CongDan/giaoduc.svg'
import imageViecLam from './iconLinhVuc/CongDan/vieclam.svg'
import imageCuTru from './iconLinhVuc/CongDan/cutru.svg'
import imageHonNhan from './iconLinhVuc/CongDan/honnhan.svg'
import imageNhaO from './iconLinhVuc/CongDan/nhao.svg'
import imageSucKhoe from './iconLinhVuc/CongDan/suckhoe.svg'
import imagePhuongTien from './iconLinhVuc/CongDan/phuongtien.svg'
import imageLyLich from './iconLinhVuc/CongDan/huutri.svg'
import imageQuaDoi from './iconLinhVuc/CongDan/quadoi.svg'

import imageKhoiSuKD from './iconLinhVuc/DoanhNghiep/khoisukinhdoanh.svg'
import imageLaoDong from './iconLinhVuc/DoanhNghiep/laodong.svg'
import imageTaiChinh from './iconLinhVuc/DoanhNghiep/taichinhdn.svg'
import imageDatDai from './iconLinhVuc/DoanhNghiep/datdai.svg'
import imageThuongMai from './iconLinhVuc/DoanhNghiep/thuongmai.svg'
import imageSoHuuTriTue from './iconLinhVuc/DoanhNghiep/sohuutritue.svg'
import imageThanhLapChiNhanh from './iconLinhVuc/DoanhNghiep/tlcn.svg'
import imageDauThau from './iconLinhVuc/DoanhNghiep/dauthau.svg'
import imageTaiCauTruc from './iconLinhVuc/DoanhNghiep/taicautrucdn.svg'
import imageTamDung from './iconLinhVuc/DoanhNghiep/tamdung.svg'
import necessaryDVC from './iconLinhVuc/necessaryDVC.svg'
import { useAppSelector } from "@/lib/redux/Hooks";
import { thuTucThietYeuApi } from "@/features/portaldvc_admin/thuTucThietyeu/services";
import { toast } from "react-toastify";


export interface INhomLinhVuc {
  TenLinhVuc: string;
  Icon?: string;
  MaLinhVuc: string;
  DoiTuong: string;
  TuKhoa: string;
}
export const DanhSachNhomLinhvuc = () => {
  const { datas: quanlylienket } = useAppSelector(
    (state) => state.quanlylienket
  );
  const [thuTucThietYeu, setThuTucThietYeu] = useState<INhomLinhVuc[]>([]);
  const [nhomLinhVucs, setNhomLinhVucs] = useState<INhomLinhVuc[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const colElements = document.querySelectorAll('.DSNLV_Block .container');
    let maxHeight = 0;

    colElements.forEach((col) => {
      if (col.clientHeight > maxHeight) {
        maxHeight = col.clientHeight;
      }
    });

    setMaxHeight(maxHeight);
  }, [nhomLinhVucs]);

  useEffect(() => {
    const tmpLinhVucs = [
      {
        Icon: imageCoCon,
        TenLinhVuc: "Có con nhỏ",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Thủ tục đăng ký khai sinh'
      },
      {
        Icon: imageHocTap,
        TenLinhVuc: "Học tập",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Cấp bản sao văn bằng chứng chỉ từ sổ gốc'
      },
      {
        Icon: imageLyLich,
        TenLinhVuc: "Lý lịch tư pháp",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Lý lịch tư pháp'
      },
      {
        Icon: imageViecLam,
        TenLinhVuc: "Việc làm",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Cấp giấy phép lao động'
      },
      {
        Icon: imageCuTru,
        TenLinhVuc: "Cư trú và giấy tờ tùy thân",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Bản sao'
      },
      {
        Icon: imageHonNhan,
        TenLinhVuc: "Hôn nhân và gia đình",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Đăng ký kết hôn'
      },
      {
        Icon: imageNhaO,
        TenLinhVuc: "Nhà ở, đất đai",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Giấy chứng nhận quyền sử dụng đất'
      },
      {
        Icon: imageSucKhoe,
        TenLinhVuc: "Sức khỏe và y tế",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Bảo hiểm xã hội'
      },
      {
        Icon: imagePhuongTien,
        TenLinhVuc: "Phương tiện và người lái",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Giấy phép lái xe'
      },
      {
        Icon: imageQuaDoi,
        TenLinhVuc: "Người thân qua đời",
        MaLinhVuc: "",
        DoiTuong: "Công dân",
        TuKhoa: 'Mai táng phí'
      },
      {
        Icon: imageKhoiSuKD,
        TenLinhVuc: "Khởi sự kinh doanh",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Khiếu nại'
      },
      {
        Icon: imageLaoDong,
        TenLinhVuc: "Lao động và bảo hiểm xã hội",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Lao động'
      },
      {
        Icon: imageTaiChinh,
        TenLinhVuc: "Tài chính doanh nghiệp",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Doanh nghiệp'
      },
      {
        Icon: imageDatDai,
        TenLinhVuc: "Đất đai, xây dựng",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Đất đai'
      },
      {
        Icon: imageThuongMai,
        TenLinhVuc: "Thương mại, quảng cáo",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Thương mại'
      },
      {
        Icon: imageSoHuuTriTue,
        TenLinhVuc: "Sở hữu trí tuệ, đăng ký tài sản",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Trí tuệ'
      },
      {
        Icon: imageThanhLapChiNhanh,
        TenLinhVuc: "Thành lập chi nhánh, văn phòng đại diện",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Chi nhánh'
      },
      {
        Icon: imageDauThau,
        TenLinhVuc: "Đấu thầu, mua sắm công",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Mua sắm'
      },
      {
        Icon: imageTaiCauTruc,
        TenLinhVuc: "Tái cấu trúc doanh nghiệp",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Chuyển đổi'
      },
      {
        Icon: imageTamDung,
        TenLinhVuc: "Tạm dừng, chấm dứt hoạt động",
        MaLinhVuc: "",
        DoiTuong: "Doanh nghiệp",
        TuKhoa: 'Chấm dứt'
      },
    ];
    setNhomLinhVucs(tmpLinhVucs);
  }, []);

  useEffect(() => {
    (async () => {
      if (thuTucThietYeu.length < 1) {

        const res = await thuTucThietYeuApi.ThuTucThietYeuPortal({
          pageNumber: 1,
          pageSize: 200
        })
        if (res.data.data) {
          const thuTucThietYeuArr: INhomLinhVuc[] = []
          res.data.data.map(item => {
            thuTucThietYeuArr.push(
              {
                Icon: necessaryDVC,
                TenLinhVuc: item.tenTTHC || '',
                MaLinhVuc: "",
                DoiTuong: "DỊCH VỤ CÔNG THIẾT YẾU",
                TuKhoa: item.linkDVC || ''
              })
          })

          if (thuTucThietYeuArr.length > 0) {
            setThuTucThietYeu(thuTucThietYeuArr)
          }
        }
      }
    })()
  }, [])

  console.log(thuTucThietYeu)

  return (
    <div className="container_DSNLV">
      <Row gutter={16} style={{ display: 'flex' }} className="DSNLV_Block">
        <Col style={{ flex: 1 }}>
          <div className="container">
            <div className="title d-flex justify-content-center">CÁ NHÂN</div>
            <Divider className="divider" />
            {nhomLinhVucs.length > 0 ? nhomLinhVucs.map((item, index) => {
              if (item.DoiTuong == "Công dân") {
                return (
                  <div className="item congDan" key={index}>
                    <Link to={`/portaldvc/danh-muc-tthc?TuKhoa=${item.TuKhoa}`} className="w-100 p-2 card-nhomlinhvuc">
                      <img src={item.Icon} />
                      <span className="tenLinhVuc"> {item.TenLinhVuc}</span>
                    </Link>
                  </div>
                );
              }
            }) : null}
          </div>
        </Col>

        <Col style={{ flex: 1 }}>
          <div className="container">
            <div className="title d-flex justify-content-center">DOANH NGHIỆP</div>
            <Divider className="divider" />
            {nhomLinhVucs.length > 0 ? nhomLinhVucs.map((item, index) => {
              if (item.DoiTuong == "Doanh nghiệp") {
                return (
                  <div className="item doanhNghiep" key={index}>
                    <Link to={`/portaldvc/danh-muc-tthc?TuKhoa=${item.TuKhoa}`} className="w-100 p-2 card-nhomlinhvuc">
                      <img src={item.Icon} />
                      <span className="tenLinhVuc"> {item.TenLinhVuc}</span>
                    </Link>
                  </div>
                );
              }
            }) : null}
          </div>
        </Col>
        {thuTucThietYeu.length > 0 ?
          <Col style={{ flex: 1 }}>
            <div className="container thuTucThietYeu" >
              <div className="title d-flex justify-content-center">DỊCH VỤ CÔNG THIẾT YẾU</div>
              <Divider className="divider" />
              <div className="scrollBlock" style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}>

                {thuTucThietYeu.length > 0 ? thuTucThietYeu.map((item, index) => {
                  if (item.DoiTuong == "DỊCH VỤ CÔNG THIẾT YẾU") {
                    return (
                      <div className="item dvcThietYeu" key={index}>
                        <Link to={`${item.TuKhoa}`} className="w-100 p-2 card-nhomlinhvuc" target="_blank">
                          <img src={item.Icon} />
                          <span className="tenLinhVuc"> {item.TenLinhVuc}</span>
                        </Link>
                      </div>
                    );
                  }
                }) : null}

              </div>
            </div>
          </Col> : null
        }
      </Row>
    </div>
  );
};
