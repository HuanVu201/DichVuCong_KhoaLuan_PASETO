import React, { useCallback, useEffect, useMemo, useState } from "react";

import "./FooterLayout.scss";
import image from "../../../../../assets/images/TinNhiemMang.png";
import logoGroupFooter from "../../../../../assets/images/logoGroupFooter.png";
import logoEMC from '../../../../../assets/images/Logo_EMC.png';
import { CrudLocalStorage } from "@/services/localstorage";
import { FooterService } from "../Services/Footer";
import { useAppSelector } from "@/lib/redux/Hooks";
import { LogAuthenApi } from "@/features/quanLyTruyCapDvc/services";
import { getCurrencyThongKe } from "@/utils";
function FooterLayout() {
  var crudLocalStorage = new CrudLocalStorage();
  var footerServices = new FooterService();
  const [footer, setFooter] = useState<string>('');
  const [totalAccess, setTotalAccess] = useState<string>('');
  const [currentAccess, setCurrentAccess] = useState<string>('');

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
  // let valuePrivate: string = `<div class="row"><div class="col-md-6 col-sm-12" style="display: flex; align-items: center; gap: 15px;"> <div> <i class="icon fa fa-university" aria-hidden="true"></i> </div> <div> <span>Cơ quan chủ quản: <b>Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa</b></span><br/> <span>Địa chỉ: <b>28 Đại lộ Lê Lợi, phường Điện Biên, thành phố Thanh Hóa, tỉnh Thanh Hóa</b></span> </div> </div> <div class="col-md-4 col-sm-12" style="display: flex; align-items: center; gap: 15px;"> <div> <i class="icon fa fa-envelope" aria-hidden="true"></i> </div> <div> <span>Thông tin liên hệ:</span><br/> <span>Email: <b>dichvucong@thanhhoa.gov.vn</b></span> </div> </div> <div class="col-md-2 col-sm-12 " style="display: flex; align-items: center; gap: 15px;"> <div> <i class="icon fa fa-phone-square" aria-hidden="true"></i> </div> <div> <span>Tổng đài hỗ trợ:</span><br/> <span><b>02373 900 900 </b></span> </div> </div></div>`

  useEffect(() => {
    (async () => {
      let resFooters = await footerServices.Search({});
      if (resFooters?.data?.data) {
        let resFooter = resFooters.data.data;
        let tmp = resFooter[0];
        setFooter(tmp.noiDung.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {

        let numberExtra: number = isWithinBusinessHours() ? getRandomNumber() : 0
        const res = await LogAuthenApi.CountAccessPortal();
        setCurrentAccess(getCurrencyThongKe(res.data.data.countAccessPortal + numberExtra) || '...')
        setTotalAccess(getCurrencyThongKe(res.data.data.countAccessTotalPortal + Number(import.meta.env.VITE_ACCESS_TOTAL)) || '...')
      } catch (error) {
        console.error('Error fetching total access:', error);
      }
    })()

  }, [])


  function isWithinBusinessHours() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const start = new Date();
    start.setHours(7, 30, 0, 0);

    const end = new Date();
    end.setHours(17, 0, 0, 0);

    return now >= start && now <= end;
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 41) + 10;
  }

  return (
    <div className="footer-swapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="row footer-head" style={{ margin: '0 40px' }}>
            <div className="col-md-1 col-sm-12 text-center itemBlock" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {
                linkNCSC && useLinkNCSC &&
                <a
                  href={linkNCSC}
                  target="_blank"
                >
                  <img
                    className="TinNhiemMang"
                    alt="TinNhiemMang"
                    src={image}
                    style={{ maxWidth: 120 }}
                    height={"auto"}
                  />
                </a>
              }

            </div>
            <div className="col-md-9 col-sm-12  itemBlock" dangerouslySetInnerHTML={{ __html: footer }} />

            <div className="col-md-2 col-sm-12 text-left itemBlock" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
              <div>
                <img src={logoGroupFooter} className="logoGroupFooter" alt="" style={{ maxWidth: '25px' }} />
              </div>
              <div>
                <span><span id="total-access">{totalAccess}</span> lượt truy cập</span><br />
                <span className="current-online">{currentAccess} người đang online</span>
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
