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

  if (tuKhoa != "") {
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

  const handleKeyDown = (event:any) => {
    if (event.key === "Enter") {
      // const searchKey = event.target.value;
      // console.log("Searching for:", searchKey);
      // Gọi hàm tìm kiếm hoặc thực hiện hành động tìm kiếm tại đây
      setTuKhoa((document.querySelector('#searchKey') as HTMLInputElementWithOptionalValue).value)
    }
  };

  return (
    <div className="search-home">
      <div className="containerSearch">
        <Row
          justify="center"
          className="input-group input-group-lg inputBlock"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Space.Compact block className="rowSearch" style={{ width: '90%' }}>
            <Tooltip>
              <Input
                id="searchKey"
                className="form-control input-search searchItem"
                placeholder="Nhập từ khoá tìm kiếm"
                onKeyDown={handleKeyDown}
              />
            </Tooltip>
            <Tooltip>
              <Button className="btn-search timKiemNangCao searchItem"
                onClick={() => {
                  setTuKhoa((document.querySelector('#searchKey') as HTMLInputElementWithOptionalValue).value)
                }}
              >
                {/* <Link to={"/portaldvc/danh-muc-tthc"} style={{  transition: 'none' }} > */}
                <span>Tìm kiếm nâng cao</span>
                {/* </Link> */}
              </Button>
            </Tooltip>
            <Tooltip>
              <Button className="btn-search timKiem searchItem" icon={<SearchOutlined />}
                onClick={() => {
                  setTuKhoa((document.querySelector('#searchKey') as HTMLInputElementWithOptionalValue).value)
                }}
              >
              </Button>
            </Tooltip>
          </Space.Compact>
        </Row>
        <Row
          justify="center"
          className="input-group input-group-lg boxBlock"
          // gutter={{  }}
          style={{ zIndex: 0, display: 'flex' }}
        >
          <Col style={{ flex: 1 }} >
            <div
              style={{ backgroundColor: '#ce7a58' }}
              className=" btn text-center d-flex align-items-center h-100 boxBlock_item"
            >

              {btnDichVuCongTrucTuyen && useBtnDichVuCongTrucTuyen
                ? <Link to={btnDichVuCongTrucTuyen} className="btn-link w-100 p-2 align-self-center" >
                  <span>Dịch vụ công trực tuyến</span>
                </Link>
                : <Link to={""} className="btn-link w-100 p-2 align-self-center" >
                  <span>Dịch vụ công trực tuyến</span>
                </Link>
              }
            </div>
          </Col>
          <Col style={{ flex: 1 }} >
            <div
              style={{ backgroundColor: '#ce7a58' }}
              className="btn text-center d-flex align-items-center h-100 boxBlock_item"
            >
              {btnKQDanhGiaBoChiSo && useBtnKQDanhGiaBoChiSo
                ? <Link to={btnKQDanhGiaBoChiSo} className="btn-link w-100 p-2 align-self-center" >
                  <span>Kết quả đánh giá Bộ chỉ số phục vụ người dân và doanh nghiệp của bộ, ngành, địa phương</span>
                </Link>
                : <Link to={""} className="btn-link w-100 p-2 align-self-center" >
                  <span>Kết quả đánh giá Bộ chỉ số phục vụ người dân và doanh nghiệp của bộ, ngành, địa phương</span>
                </Link>
              }
            </div>
          </Col>
          <Col style={{ flex: 1 }} >
            <div
              style={{ backgroundColor: '#ce7a58' }}
              className=" btn text-center d-flex align-items-center h-100 boxBlock_item"
            >
              {btnDichVuCongLienThong && useBtnDichVuCongLienThong
                ? <Link to={btnDichVuCongLienThong} className="btn-link w-100 align-self-center p-2" >
                  <span>Dịch vụ công liên thông: Khai sinh, Khai tử</span>
                </Link>
                : <Link to={""} className="btn-link w-100 align-self-center p-2" >
                  <span>Dịch vụ công liên thông: Khai sinh, Khai tử</span>
                </Link>
              }
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
