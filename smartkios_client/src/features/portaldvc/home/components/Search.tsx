import { useEffect, useState } from "react";
import "./Search.scss";
import { Input, Button, Space, Tooltip, Row, Col, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import COLOR from "../../ultis/ColorConfig";
import { useAppSelector } from "@/lib/redux/Hooks";
interface HTMLInputElementWithOptionalValue extends HTMLInputElement {
  value: string;
}
export const HomeSearch = () => {
  let btnDichVuCongTrucTuyen
  let useBtnDichVuCongTrucTuyen = false
  let btnKQDanhGiaBoChiSo
  let useBtnKQDanhGiaBoChiSo = false
  let btnDichVuCongLienThong
  let useBtnDichVuCongLienThong = false
  const [tuKhoa, setTuKhoa] = useState('')
  const navigate = useNavigate();

  if(tuKhoa!=""){
    navigate(`/portaldvc/danh-muc-tthc?TuKhoa=${tuKhoa}`);

  }

  const { datas: quanlylienket } = useAppSelector(
    (state) => state.quanlylienket
  );

  quanlylienket?.map(item => {
    if (item.ma === "btnDichVuCongTrucTuyen") {
      btnDichVuCongTrucTuyen = item.linkLienKet
      useBtnDichVuCongTrucTuyen = item.suDung
    }
    if (item.ma === "btnKQDanhGiaBoChiSo") {
      btnKQDanhGiaBoChiSo = item.linkLienKet
      useBtnKQDanhGiaBoChiSo = item.suDung
    }
    if (item.ma === "btnDichVuCongLienThong") {
      btnDichVuCongLienThong = item.linkLienKet
      useBtnDichVuCongLienThong = item.suDung
    }
  })

  return (
    <div className="search-home">
      <div className="containerSearch">
        <Row
          justify="center"
          className="input-group input-group-lg inputBlock"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          // style={{padding: '0 16px'}}
          style={{ padding: '32px 16px 0px 16px'}}
        >
          <Space.Compact block>
            <Tooltip>
              <Input
                id="searchKey"
                className="form-control input-search"
                placeholder="Nhập từ khoá tìm kiếm"
              />
            </Tooltip>
            <Tooltip>
              <Button className="btn-search timKiemNangCao">
                <Link to={"/portaldvc/danh-muc-tthc"} style={{ fontSize: '18px', fontWeight: 400, transition: 'none' }} >
                  <span>Tìm kiếm nâng cao</span>
                </Link>
              </Button>
            </Tooltip>
            <Tooltip>
              <Button className="btn-search" icon={<SearchOutlined />}
                onClick={() => {
                  setTuKhoa((document.querySelector('#searchKey') as HTMLInputElementWithOptionalValue).value)
                }}
              >
                Tìm kiếm
              </Button>
            </Tooltip>
          </Space.Compact>
        </Row>
        <Row
          justify="center"
          className="input-group input-group-lg boxBlock"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{zIndex: 0, padding: '32px 0'}}
        >
          <Col span={8}>
            <div
              style={{ backgroundColor: '#ce7a58' }}
              className=" btn text-center d-flex align-items-center h-100 boxBlock_item"
            >

              {btnDichVuCongTrucTuyen && useBtnDichVuCongTrucTuyen
                ? <Link to={btnDichVuCongTrucTuyen} className="btn-link w-100 p-2 align-self-center" >
                  <span style={{ fontSize: 17.5 }}>Dịch vụ công trực tuyến</span>
                </Link>
                : <Link to={""} className="btn-link w-100 p-2 align-self-center" >
                  <span style={{ fontSize: 17.5 }}>Dịch vụ công trực tuyến</span>
                </Link>
              }
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{ backgroundColor: '#ce7a58' }}
              className="btn text-center d-flex align-items-center h-100 boxBlock_item"
            >
              {btnKQDanhGiaBoChiSo && useBtnKQDanhGiaBoChiSo
                ? <Link to={btnKQDanhGiaBoChiSo} className="btn-link w-100 p-2 align-self-center" >
                  <span style={{ fontSize: 17.5 }}>Kết quả đánh giá Bộ chỉ số phục vụ người dân và doanh nghiệp của bộ, ngành, địa phương</span>
                </Link>
                : <Link to={""} className="btn-link w-100 p-2 align-self-center" >
                  <span style={{ fontSize: 17.5 }}>Kết quả đánh giá Bộ chỉ số phục vụ người dân và doanh nghiệp của bộ, ngành, địa phương</span>
                </Link>
              }
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{ backgroundColor: '#ce7a58' }}
              className=" btn text-center d-flex align-items-center h-100 boxBlock_item"
            >
              {btnDichVuCongLienThong && useBtnDichVuCongLienThong
                ? <Link to={btnDichVuCongLienThong} className="btn-link w-100 align-self-center p-2" >
                  <span style={{ fontSize: 17.5 }}>Dịch vụ công liên thông: Khai sinh, Khai tử</span>
                </Link>
                : <Link to={""} className="btn-link w-100 align-self-center p-2" >
                  <span style={{ fontSize: 17.5 }}>Dịch vụ công liên thông: Khai sinh, Khai tử</span>
                </Link>
              }
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
