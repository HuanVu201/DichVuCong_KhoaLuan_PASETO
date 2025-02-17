import { useEffect, useState } from "react";
import "./QuanTam.scss"
import { Row, Col } from "antd"
import { Link } from "react-router-dom"
import QRKhaoSat from '../../../../assets/images/QRMOI.jpg'
import { useAppSelector } from "@/lib/redux/Hooks";


export const QuanTam = () => {
  let imageQuanTamZalo
  let useImageQuanTamZalo = false
  let linkQuanTamZalo
  let useLinkQuanTamZalo = false

  const { datas: quanlylienket } = useAppSelector(
    (state) => state.quanlylienket
  );

  quanlylienket?.map(item => {
    if (item.ma === "image-quan-tam-zalo") {
      imageQuanTamZalo = item.linkLienKet;
      useImageQuanTamZalo = item.suDung
    }
    if (item.ma === "link-quan-tam-zalo") {
      linkQuanTamZalo = item.linkLienKet;
      useLinkQuanTamZalo = item.suDung
    }
  })


  return <div>
    <Row gutter={16}>
      <Col span={24} className="d-flex justify-content-center QuanTam">
        {
          linkQuanTamZalo && useLinkQuanTamZalo && useImageQuanTamZalo
            ? <a href={linkQuanTamZalo} className="QR_Information" target="_blank">
              <div className="w-100" style={{fontWeight : '600', color: '#ce7a58', fontSize: 23}}>Cổng Dịch vụ công tỉnh Thanh Hóa</div>
              <img src={imageQuanTamZalo} className="qr-quantam text-center" />
              <p style={{fontWeight : '500'}}>Quét để quan tâm</p>

            </a>
            : ""
        }
      </Col>


      {/* <Col span={12} className="d-flex justify-content-center">

        <Link to="http://form.gov.vn/0eftZd" className="QR_Information" target="_blank">
          <div className="w-100">Khảo sát trải nghiệm người dùng</div>
          <img src={QRKhaoSat} className="qr-quantam text-center"/>
          <p>Quét để quan tâm</p>
        </Link>
      </Col> */}
    </Row>
  </div>
}