import React, { useEffect, useMemo, useState } from "react";

import "./FooterLayout.scss";
import image from "../../../../../assets/images/TinNhiemMang.png";
import logoEMC from '../../../../../assets/images/Logo_EMC.png';
import { CrudLocalStorage } from "@/services/localstorage";
import { FooterService } from "../Services/Footer";
import { useAppSelector } from "@/lib/redux/Hooks";
function FooterLayout() {
  var crudLocalStorage = new CrudLocalStorage();
  var footerServices = new FooterService();
  const [footer, setFooter] = useState<string>("");
  // const {publicModule} = useAppSelector(state => state.config)


  let linkNCSC
  let useLinkNCSC = false
  const { datas: quanlylienket } = useAppSelector(
    (state) => state.quanlylienket
  );

  quanlylienket?.map(item => {
    if (item.ma === "ncsc") {
      linkNCSC = item.linkLienKet;
      useLinkNCSC = item.suDung;
    }
  })


  useEffect(() => {
    (async () => {
      // var tmpFooter = crudLocalStorage.getWithExpriry("footer");
      // if (!tmpFooter) {
      let resFooters = await footerServices.Search({});

      if (resFooters?.data?.data) {
        let resFooter = resFooters.data.data;
        let tmp = resFooter[0];
        setFooter(tmp.noiDung);
        // crudLocalStorage.setWithExpiry({
        //   key: "footer",
        //   value: tmp.imageUrl,
        //   expiry: 300000,
        // });
      }
      // } else {
      //   setFooter(tmpFooter as string);
      // }
    })();
  }, []);
  return (
    <div className="footer-swapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="row footer-head">
            <div className="col-md-2 col-sm-12 text-center itemBlock">
              {
                linkNCSC && useLinkNCSC &&
                <a
                  href={linkNCSC}
                  target="_blank"
                >
                  <img
                    alt="TinNhiemMang"
                    src={image}
                    width={"150px"}
                    height={"auto"}
                  />
                </a>
              }

            </div>
            <div className="col-md-8 col-sm-12 text-center itemBlock" dangerouslySetInnerHTML={{ __html: footer }}> 

            </div>
            {/* <div className="col-md-5 col-sm-12 text-center" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div>
                <i className="fa fa-university" aria-hidden="true" style={{fontSize: 25}}></i>
              </div>
              <div style={{textAlign: 'left'}}>
                <span>Cơ quan chủ quản: <b>Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa</b></span><br/>
                <span>Địa chỉ: <b>28 Đại lộ Lê Lợi, phường Điện Biên, thành phố Thanh Hóa, tỉnh Thanh Hóa</b></span>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 text-center" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div>
                <i className="fa fa-envelope" aria-hidden="true" style={{fontSize: 25}}></i>
              </div>
              <div style={{textAlign: 'left'}}>
                <span>Thông tin liên hệ:</span><br/>
                <span>Email: <b>dichvucong@thanhhoa.gov.vn</b></span>
                
              </div>
            </div>
            <div className="col-md-2 col-sm-12 text-center" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div>
                <i className="fa fa-phone-square" aria-hidden="true" style={{fontSize: 25}}></i>
              </div>
              <div style={{textAlign: 'left'}}>
                <span>Tổng đài hỗ trợ:</span><br/>
                <span><b>02373 900 900 </b></span>
                
              </div>
            </div> */}
            <div className="col-md-2 col-sm-12 text-center itemBlock">
              <div className="TD-div-module-tit">
                <p>Số lượt truy cập</p>
              </div>
              <div className="TD-div-module-border-center-flag">
                <div className="TD-div-module-thongke">
                  <span className="td-sta-val" id="total-access">
                    200103
                  </span>
                </div>
                <div className="current-online">
                  <p>
                    <span className="td-sta-val" id="current-online">
                      2001
                    </span>{" "}
                    người đang online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row footer-bottom"></div>


      </footer>

    </div>
  );
}
export default FooterLayout;
