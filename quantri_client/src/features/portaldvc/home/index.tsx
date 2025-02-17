
import { Col, Divider, Row } from "antd";
import { HomeSearch } from "./components/Search";
import { ThongKeTrangThaiHoSo } from "./components/ThongKeTrangThaiHoSo";
import { DanhSachHoSo } from "./components/DanhSachHoSo";
import { QuanTam } from "./components/QuanTam";
import { DanhSachNhomLinhvuc } from "./components/DanhSachNhomLinhVuc";
import "./home.scss"
import { ThongTinLienQuan } from "./components/ThongTinLienQuan";

const Home = () => {

  return (
    <>
      <div className="Home-head">
        <HomeSearch />
        <ThongKeTrangThaiHoSo />

      </div>

      <div className="containerBody pt-2 commonBackgroundTrongDong">
        <Divider className="divider" />
        <Row gutter={16} className="containerBody_duoItems" style={{ marginTop: 8, display: 'flex' }}>
          <Col className="hoSoCoKetQua item" style={{ flex: 1, minHeight: 221 }} >
            <DanhSachHoSo />
          </Col>
          <Col className="quanTam item" style={{ flex: 1, display: 'flex', margin: '0 auto auto auto', justifyContent: 'center' }}>
            <QuanTam />
          </Col>
          <Col className="quanTam item" style={{ flex: 1, display: 'flex', margin: '0 auto auto auto', justifyContent: 'center' }}>
            <ThongTinLienQuan />
          </Col>
        </Row>
        <div className="">
          <DanhSachNhomLinhvuc />
        </div>
      </div>
    </>
  );
};

export default Home