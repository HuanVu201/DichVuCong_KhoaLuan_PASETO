
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import auth from '../../features/auth/redux/Slice'
import user, { logout } from '../../features/user/redux/Slice'
import cocautochuc from '../../features/cocautochuc/redux/slice'
import danhmucdungchung from '../../features/danhmucdungchung/redux/slice'
import linhvuc from '../../features/linhvuc/redux/slice'
import mauphoi from '../../features/quanlymauphoi/redux/slice'
import thutuc from '../../features/thutuc/redux/slice'
import thaydoimucdothutuc from '../../features/thaydoimucdothutuc/redux/slice'
import ngayNghi from '../../features/danhmucngaynghi/redux/slice'
import truonghopthutuc from '../../features/truonghopthutuc/redux/slice'
import quytrinhxuly from '../../features/quytrinhxuly/redux/slice'
import loaiphilephi from '../../features/loaiphilephi/redux/slice'
import trangthaihoso from '../../features/trangthaihoso/redux/slice'
import nhomnguoidung from '../../features/nhomnguoidung/redux/slice'
import phiLePhi from '../../features/philephi/redux/slice'
import donvithutuc from '../../features/donvithutuc/redux/slice'
import buocxuly from '../../features/buocxuly/redux/slice'
import donvi from '../../features/donvi/redux/slice'
import thongbao from '../../features/thongbao/redux/slice'
import cauhinhhethong from '../../features/CauHinhHeThong/redux/slice'
import menu from '../../features/danhmucmenu/redux/slice'
import hoso from '../../features/hoso/redux/slice'
import phieukhaosat from '../../features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice'

import vaitro from '../../features/vaitro/redux/slice'
import screen from '../../features/screen/redux/slice'
import action from '../../features/action/redux/slice'
import screenaction from '../../features/screenaction/redux/slice'
import thanhphanthutuc from '../../features/thanhphanthutuc/redux/slice'
import danhmucdiaban from '../../features/danhmucdiaban/redux/slice'
import danhmucngaynghi from '../../features/danhmucngaynghi/redux/slice'
import nguoidungnhomnguoidung from '../../features/nguoidungnhomnguoidung/redux/slice'
import config from '../../features/config/redux/slice'
import danhgiacoquan from '../../features/danhgiacoquan/redux/slice'
import thanhphanhoso from '../../features/thanhphanhoso/redux/slice'
import giaytosohoa from '../../features/giaytosohoa/redux/slice'
import quatrinhxulyhoso from '../../features/quatrinhxulyhoso/redux/slice'
import yeucauthanhtoan from '../../features/yeucauthanhtoan/redux/slice'
import taikhoanthuhuong from '../../features/taikhoanthuhuong/redux/slice'
import bosunghoso from '../../features/bosunghoso/redux/slice'
import sochungthuc from '../../features/sochungthuc/redux/slice'

import banner from '../../features/portaldvc_admin/banner/redux/slice'
import footer from '../../features/portaldvc_admin/footer/redux/slice'
import huongdansudung from '../../features/portaldvc_admin/HuongDanSuDung/redux/slice'
import cauhoiphobien from '../../features/portaldvc_admin/CauHoiPhoBien/redux/slice'
import dstailieuhdsd from '../../features/portaldvc_admin/DSTaiLieuHDSD/redux/slice'

import kieunoidung from '../../features/portaldvc_admin/kieunoidung/redux/slice'
import kenhtin from '../../features/portaldvc_admin/kenhtin/redux/slice'
import trangthai from '../../features/portaldvc_admin/trangthai/redux/slice'
import tinbai from '../../features/portaldvc_admin/tinbai/redux/slice'
import quanlylienket from '../../features/portaldvc_admin/QuanLyLienKet/redux/slice'
import quanlyvanban from '../../features/portaldvc_admin/QuanLyVanBan/redux/slice'
import logtaikhoancsdldancu from '../../features/taikhoancsdldancu/redux/slice'
import statisticlogtaikhoancsdldancu from '../../features/taikhoancsdldancu/redux/sliceStatistic'

import portalmenu from '../../lib/antd/components/BothLayout/Redux/slide'
import portaltinbai from '../../features/portaldvc/TinTuc/redux/slide'
import hoidap from '../../features/portaldvc/HoiDap/redux/slice'
import phanAnhKienNghi from '../../features/portaldvc/PhanAnhKienNghi/redux/slice'
import portalThanhToan from '../../features/portaldvc/ThanhToan/redux/slide'
import storage from 'redux-persist/lib/storage';
import thongKeTiepNhanHoSoTrucTuyen from '../../features/thongKe/thongKeHoSoTrucTuyen/redux/slide'
import ThongKeQD766 from '../../features/thongKe/thongKeQD766/redux/slide'
import danhmucnganh from '../../features/portaldvc_admin/DanhMucNganh/redux/slice'
import userroles from '@/features/userroles/redux/slice'
import adminHoSo from "@/features/adminHoSo/redux/slice"
import menuketquathutuc from "@/features/menuketquathutuc/redux/slice"
import nguoitiepnhanthutuc from "@/features/thutuc/redux/slice2"
import duthaoxulyhoso from "@/features/duthaoxulyhoso/redux/slice"
import danhmucgiaytochungthuc from "@/features/danhmucgiaytochungthuc/redux/slice"

import { AnyAction } from '@reduxjs/toolkit';
import { persistor } from './Store';

export const appReducer = combineReducers({
    user: persistReducer( {
        key: 'user',
        storage: storage,
        // blacklist: ['userCDSLDanCu', 'donViThuTucUsers', 'datas']
        whitelist : ["userKiosk"]
      }, user),
    // user:user,
    auth,
    cocautochuc,
    danhmucdungchung,
    linhvuc,
    mauphoi,
    thutuc,
    ngayNghi,
    truonghopthutuc,
    quytrinhxuly,
    loaiphilephi,
    trangthaihoso,
    nhomnguoidung,
    phiLePhi,
    donvithutuc,
    buocxuly,
    donvi,
    thongbao,
    cauhinhhethong,
    menu,
    hoso,
    vaitro,
    screen,
    dstailieuhdsd,
    action,
    screenaction,
    thanhphanthutuc,
    danhmucdiaban,
    sochungthuc,
    nguoidungnhomnguoidung,
    phieukhaosat,
    danhmucngaynghi,
    // config: persistReducer( {
    //     key: 'config',
    //     storage: storage,
    //     blacklist: ['datas', 'data', 'loading', 'error', 'count', 'totalPages', 'currentPages']
    //   }, config),
    config,
    thanhphanhoso,
    quatrinhxulyhoso,
    giaytosohoa,
    banner,
    footer,
    yeucauthanhtoan,
    kieunoidung,
    kenhtin,
    trangthai,
    tinbai,
    quanlyvanban,
    nguoitiepnhanthutuc,
    portalmenu,
    portaltinbai,
    huongdansudung,
    hoidap,
    phanAnhKienNghi,
    bosunghoso,
    taikhoanthuhuong,
    quanlylienket,
    portalThanhToan,
    thongKeTiepNhanHoSoTrucTuyen,
    ThongKeQD766,
    danhmucnganh,
    userroles,
    logtaikhoancsdldancu,
    statisticlogtaikhoancsdldancu,
    cauhoiphobien,
    adminHoSo,
    menuketquathutuc,
    thaydoimucdothutuc,
    duthaoxulyhoso,
    danhmucgiaytochungthuc,
    danhgiacoquan
})

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === logout.type) {
    localStorage.removeItem("persist:user")
    return appReducer(undefined, { type: undefined });
  }

  return appReducer(state, action);
};