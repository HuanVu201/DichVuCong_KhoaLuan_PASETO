
import "./QuanTam.scss"
import { Row, Col } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect } from "react";
import { SearchPublicConfig } from "@/features/config/redux/action";


export const QuanTam = () => {
  let imageQuanTamZalo
  let useImageQuanTamZalo = false
  let imageAndroidAppCongDan
  let useImageAndroidAppCongDan = false
  let imageIOSAppCongDan
  let useImageIOSAppCongDan = false
  let linkQuanTamZalo
  let useLinkQuanTamZalo = false
  let linkAppCongDanAndroid
  let useLinkAppCongDanAndroid = false
  let linkAppCongDanIOS
  let useLinkAppCongDanIOS = false

  const { publicModule: config } = useAppSelector(state => state.config)
  let getTinh
  config?.map(item => {
    if (item.code == "ten-don-vi-lowercase") {
      getTinh = item.content
    }
  })

  
  const { datas: quanlylienket } = useAppSelector(
    (state) => state.quanlylienket
  );

  quanlylienket?.map(item => {
    if (item.ma === "image-quan-tam-zalo") {
      imageQuanTamZalo = item.linkLienKet;
      useImageQuanTamZalo = item.suDung
    }
    if (item.ma === "image-android-appCongDan") {
      imageAndroidAppCongDan = item.linkLienKet;
      useImageAndroidAppCongDan = item.suDung
    }
    if (item.ma === "image-ios-appCongDan") {
      imageIOSAppCongDan = item.linkLienKet;
      useImageIOSAppCongDan = item.suDung
    }
    if (item.ma === "link-quan-tam-zalo") {
      linkQuanTamZalo = item.linkLienKet;
      useLinkQuanTamZalo = item.suDung
    }
    if (item.ma === "appCongDan-android") {
      linkAppCongDanAndroid = item.linkLienKet;
      useLinkAppCongDanAndroid = item.suDung
    }
    if (item.ma === "appCongDan-ios") {
      linkAppCongDanIOS = item.linkLienKet;
      useLinkAppCongDanIOS = item.suDung
    }
  })


  return <div>
    <Row gutter={16}>
      <Col span={24} className="d-flex justify-content-center QuanTam">
        {
          linkQuanTamZalo && useLinkQuanTamZalo && useImageQuanTamZalo
            ? <a href={linkQuanTamZalo} className="QR_Information" target="_blank">
              <div className="w-100 title_QuanTam" style={{ fontWeight: '600', color: '#ce7a58' }}>Cổng Dịch vụ công tỉnh {getTinh}</div>
              <img src={imageQuanTamZalo} className="qr-quantam text-center" />
              <p style={{ fontWeight: '500' }}>Quét để quan tâm</p>

            </a>
            : ""
        }
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24} className="d-flex justify-content-center QuanTamApp">
      {
          linkAppCongDanAndroid && useLinkAppCongDanAndroid && useImageAndroidAppCongDan
            ? <a href={linkAppCongDanAndroid} className="linkApp" target="_blank">
              <img src={imageAndroidAppCongDan} className="imageApp text-center" />
            </a>
            : ""
        }
      {
          linkAppCongDanIOS && useLinkAppCongDanIOS && useImageIOSAppCongDan
            ? <a href={linkAppCongDanIOS} className="linkApp" target="_blank">
              <img src={imageIOSAppCongDan} className="imageApp text-center" />
            </a>
            : ""
        }
      </Col>
    </Row>
  </div>
}