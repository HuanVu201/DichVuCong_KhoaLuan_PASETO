
import { Col, Divider, Row } from "antd";
import { HomeSearch } from "./components/Search";
import { ThongKeTrangThaiHoSo } from "./components/ThongKeTrangThaiHoSo";
import { DanhSachHoSo } from "./components/DanhSachHoSo";
import { QuanTam } from "./components/QuanTam";
import { DanhSachNhomLinhvuc } from "./components/DanhSachNhomLinhVuc";
import "./home.scss"

const Home = () => {
  
  return (
    <>
      <div className="Home-head">
        <HomeSearch />
        <ThongKeTrangThaiHoSo />

      </div>

      <div className="container pt-2" style={{ maxWidth: '67.5%' }}>
        <Divider className="divider" />
        <Row gutter={16} style={{ marginTop: 8 }}>
          <Col >
            <DanhSachHoSo />
          </Col>
          <Col style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
            <QuanTam />
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