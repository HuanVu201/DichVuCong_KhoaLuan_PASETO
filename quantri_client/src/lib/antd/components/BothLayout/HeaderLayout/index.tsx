import { useEffect, useMemo, useState } from "react";
import { Button, Space, Layout, Menu, theme } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "./HeaderLayout.scss";
import { CrudLocalStorage } from "../../../../../services/localstorage";
import { BannerService } from "../Services/banner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { UserPortalService } from "@/features/portaldvc/UserPortal/services/UserPortal";
import { IUserPortal } from "@/features/portaldvc/UserPortal/models/UserPortal";
import { Link, useNavigate } from "react-router-dom";
import { Service } from "@/services";
import { GetUser } from "@/features/user/redux/Actions";
import { resetData as resetAuth } from "@/features/auth/redux/Slice";
import { logout, resetData as resetUser } from "@/features/user/redux/Slice";
import { resetPublicModule } from "@/features/config/redux/slice";
import { getUrlFromBlob } from "@/utils";
import { resetModule } from "@/features/danhmucmenu/redux/slice";
import { userService } from "@/features/user/services";
import { IQuanLyLienKet } from "@/features/portaldvc_admin/QuanLyLienKet/models";
import { ZaloQrLayout } from "./ZaloQrModal";
import logoThanhHoa from '../../../../../assets/images/logo-TTHC_ThanhHoa.png'
import { LoginModalLayout } from "./LoginModal";
import LogoTTHCThanhHoa from "../../../../../assets/images/logo-TTHC_ThanhHoa.svg"
import { SearchBanner } from "@/features/portaldvc_admin/banner/redux/action";
import { HOST_PATH } from "@/data";
import { useSearchParams } from "react-router-dom"
import { useNhacViecPortal } from "../../layout/hooks/useNhacViecPortal";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";

function StatusLogin({ showLoginModal }: { showLoginModal: () => void }) {
  const { data: auth } = useAppSelector((state) => state.auth);
  const { data: user } = useAppSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const hostPath: string = `${window.location.host}`


  const crudLocalStorage = new CrudLocalStorage();
  let quanlylienkets = crudLocalStorage.getWithExpriry('quanlylienket');
  const { _internalRenderMenuItem, BadgeBell } = useNhacViecPortal({})


  const [linkDangNhapCanBo, linkDangNhapCongDan] = useMemo(() => {
    let linkDangNhapCongDan: string = ""
    let linkDangNhapCanBo: string = ""
    quanlylienkets?.data?.forEach((item: IQuanLyLienKet) => {
      if (item.ma === "dang-nhap-can-bo") {
        linkDangNhapCanBo = item.linkLienKet
      }
      if (item.ma === "dang-nhap-cong-dan") {
        linkDangNhapCongDan = item.linkLienKet;
      }
    })
    return [linkDangNhapCanBo, linkDangNhapCongDan]
  }, [quanlylienkets])

  useEffect(() => {
    if (auth?.token) {
      dispatch(GetUser({ token: auth.token }))
    }
  }, [auth]);

  const logoutHandler = () => {
    if (top?.window) {
      if(auth?.token){
        top.location = `/logout?accessToken=${auth.token}`;
      } else {
        dispatch(logout())
        navigate(Service.primaryRoutes.portaldvc.home)
      }
    }
  }

  if (user) {
    return (
      <ul className="loged_Options">
         <div style={{ display: 'flex', alignItems: 'center',marginRight : '20px' }}>
          {BadgeBell}
        </div>
        <li className="statusLogin-item">
          <Link to="#">Xin chào <strong style={{ fontWeight: 600 }} id="statusLogin_username">{user?.fullName || user?.userName}</strong></Link>
        </li>
        <li className="statusLogin-item"><Link to={Service.primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi} style={{fontWeight: 600}}>Hồ sơ cá nhân</Link></li>
        {hostPath.includes('localhost')
          ?
          <li className="statusLogin-item"><a style={{ fontWeight: 600 }}
            onClick={async () => {
              dispatch(logout())
              if (auth?.token) {
                await userService.LogoutSSO({ access_token: auth.token })

              }
              navigate(Service.primaryRoutes.portaldvc.home)
            }}
          >Thoát</a></li>
          :
          <li className="statusLogin-item">
            <a style={{ padding: "6px 10px", fontWeight: 600 }}
              onClick={async () => logoutHandler()}
            >Thoát</a>
          </li>
        }
       
      </ul>
    )
  }
  else {
    return (
      <ul className="unLog_Options">
        <li className="statusLogin-item"><a href="https://dangky.dichvucong.gov.vn/register">Đăng ký</a></li>
        <li className="statusLogin-item"><a onClick={() => {
          showLoginModal()
        }}>Đăng nhập</a></li>
      </ul>

    )
  }
}

function HeaderLayout() {
  var crudLocalStorage = new CrudLocalStorage();
  var bannerServices = new BannerService();
  const [banner, setBanner] = useState<string>("");
  const {loginModalVisible} = useAppSelector(state => state.global)

  const dispatch = useAppDispatch()
  const [urlLogoImage, setUrlLogoImage] = useState('')
  const { datas: banners, count } = useAppSelector(state => state.banner)
  // useEffect(() => {
  //   dispatch(SearchBanner({ pageNumber: 1, pageSize: 10 }))
  // }, [])

  useEffect(() => {
    banners?.forEach(item => {
      if (item.suDung == true) {
        setUrlLogoImage(item.imageUrl)
      }
    })
  }, [banners])

  useEffect(() => {
    (async () => {
      // var tmpBanner = crudLocalStorage.getWithExpriry("banner");
      // if (!tmpBanner) {
      let resBanners = await bannerServices.Search({});
      if (resBanners?.data?.data) {
        let resBanner = resBanners.data.data.filter((x) => x.suDung);
        let tmp = resBanner[0];
        // let imageUrl =await getUrlFromBlob(tmp.imageUrl)
        setBanner(tmp.imageUrl);
        // crudLocalStorage.setWithExpiry({
        //   key: "banner",
        //   value: tmp.imageUrl,
        //   expiry: 300000,
        // });
        //   }
        // } else {
        //   setBanner(tmpBanner as string);
      }
    })();
  }, []);

  return (
    <div >
      <header className="headerPortal">
        <div className="header-container">
          <div className="headerBlock">
            <div className="header-title">
              <Link to={Service.primaryRoutes.portaldvc.home}>
                <img
                  className="logo"
                  src={banner}
                //src={LogoTTHCThanhHoa}
                />

              </Link>

            </div>
            <div className="header-account">
              <div className="statusLogin">
                <StatusLogin showLoginModal={() => { dispatch(togglerLoginModalVisible(true)) }} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {loginModalVisible ? <LoginModalLayout handlerCancel={() => dispatch(togglerLoginModalVisible(false))} /> : null}

    </div>
  );
}

export default HeaderLayout;
