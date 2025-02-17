import { MenuProps } from "antd/es/menu";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  ContainerOutlined,
  UserOutlined,
  FormOutlined,
  IssuesCloseOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  ExportOutlined,
  DollarOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
  PlusOutlined,
  StepForwardOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SwapOutlined,
  DeleteOutlined,
  FastForwardOutlined,
  RollbackOutlined,
  CheckOutlined,
  StopOutlined,
  StepBackwardOutlined,
  RetweetOutlined,
  LogoutOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import { Service } from "@/services";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { resetData } from "@/features/auth/redux/Slice";
import resetDataUser from "../features/user/redux/Slice";
import { Link } from "react-router-dom";
const { apiEndpoints, primaryRoutes } = Service;

export const HEADER_MENU: MenuProps["items"] = [
  {
    label: <Link to={primaryRoutes.portaldvc.root}>Cổng Dịch vụ công</Link>,
    key: primaryRoutes.portaldvc.root,
  },
  {
    label: <Link to={primaryRoutes.dvc.root}>HT Một cửa điện tử</Link>,
    key: primaryRoutes.dvc.root,
  },
  {
    label: (
      <Link to={primaryRoutes.portaldvc_admin.root}>Quản trị Cổng DVC</Link>
    ),
    key: primaryRoutes.portaldvc_admin.root,
  },
  {
    label: <Link to={primaryRoutes.admin.root}>Quản trị</Link>,
    key: primaryRoutes.admin.root,
  },
];

export const ICON_HOLDER_KEYS = {
  FormOutlined: "FormOutlined",
  IssuesCloseOutlined: "IssuesCloseOutlined",
  EyeOutlined: "EyeOutlined",
  PlayCircleOutlined: "PlayCircleOutlined",
  ExportOutlined: "ExportOutlined",
  DollarOutlined: "DollarOutlined",
  SearchOutlined: "SearchOutlined",
  MenuUnfoldOutlined: "MenuUnfoldOutlined",
  StarOutlined: "StarOutlined",
  SettingOutlined: "SettingOutlined",
  UserOutlined: "UserOutlined",
  PlusOutlined: "PlusOutlined",
  StepForwardOutlined: "StepForwardOutlined",
  EditOutlined: "EditOutlined",
  CloudUploadOutlined: "CloudUploadOutlined",
  SwapOutlined: "SwapOutlined",
  DeleteOutlined: "DeleteOutlined",
  FastForwardOutlined: "FastForwardOutlined",
  RollbackOutlined: "RollbackOutlined",
  CheckOutlined: "CheckOutlined",
  StopOutlined: "StopOutlined",
  StepBackwardOutlined: "StepBackwardOutlined",
  RetweetOutlined: "RetweetOutlined",
  LogoutOutlined: "LogoutOutlined",
  FileDoneOutlined: "FileDoneOutlined",
  AlignCenterOutlined: "AlignCenterOutlined",
} as const;

export const ICON_HOLDER: Record<
  keyof typeof ICON_HOLDER_KEYS,
  React.ReactNode
> = {
  FormOutlined: <FormOutlined />,
  IssuesCloseOutlined: <IssuesCloseOutlined />,
  EyeOutlined: <EyeOutlined />,
  PlayCircleOutlined: <PlayCircleOutlined />,
  ExportOutlined: <ExportOutlined />,
  DollarOutlined: <DollarOutlined />,
  SearchOutlined: <SearchOutlined />,
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  StarOutlined: <StarOutlined />,
  SettingOutlined: <SettingOutlined />,
  UserOutlined: <UserOutlined />,
  PlusOutlined: <PlusOutlined />,
  StepForwardOutlined: <StepForwardOutlined />,
  EditOutlined: <EditOutlined />,
  CloudUploadOutlined: <CloudUploadOutlined />,
  SwapOutlined: <SwapOutlined />,
  DeleteOutlined: <DeleteOutlined />,
  FastForwardOutlined: <FastForwardOutlined />,
  RollbackOutlined: <RollbackOutlined />,
  CheckOutlined: <CheckOutlined />,
  StopOutlined: <StopOutlined />,
  StepBackwardOutlined: <StepBackwardOutlined />,
  RetweetOutlined: <RetweetOutlined />,
  LogoutOutlined: <LogoutOutlined />,
  FileDoneOutlined: <FileDoneOutlined />,
  AlignCenterOutlined: <AlignCenterOutlined></AlignCenterOutlined>,
};

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: keyof typeof ICON_HOLDER_KEYS,
  children?: MenuItem[],
  title?: string,
  type?: "group"
): MenuItem {
  return {
    title: title ? title : label,
    key,
    icon: icon ? ICON_HOLDER[icon] : "",
    children,
    label,
    type,
  } as MenuItem;
}

export const SIDER_MENU_ADMIN: MenuProps["items"] = [
  getItem(
    "Quản trị người dùng",
    primaryRoutes.admin.quanTriNguoiDung.root,
    "UserOutlined",
    [
      getItem(
        <Link to={primaryRoutes.admin.quanTriNguoiDung.coCauToChuc}>
          Danh mục người dùng
        </Link>,
        primaryRoutes.admin.quanTriNguoiDung.coCauToChuc,
        undefined,
        undefined,
        "Danh mục người dùng"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTriNguoiDung.vaiTro}>
          Danh mục vai trò
        </Link>,
        primaryRoutes.admin.quanTriNguoiDung.vaiTro,
        undefined,
        undefined,
        "Danh mục vai trò"
      ),

      getItem(
        <Link to={primaryRoutes.admin.quanTriNguoiDung.taiKhoanTuCSDLDanCu}>
          TK từ CSDL dân cư
        </Link>,
        primaryRoutes.admin.quanTriNguoiDung.taiKhoanTuCSDLDanCu,
        undefined,
        undefined,
        "TK từ CSDL dân cư"
      ),
      // getItem(<Link to={ primaryRoutes.admin.quanTriNguoiDung.doimatkhau}>Đổi mật khẩu</Link>, primaryRoutes.admin.quanTriNguoiDung.doimatkhau),
    ]
  ),
  getItem(
    "Danh mục dùng chung",
    primaryRoutes.admin.danhMucDungChung.root,
    "MenuUnfoldOutlined",
    [
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=quoc-tich"}
        >
          Danh mục quốc tịch
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=quoc-tich",
        undefined,
        undefined,
        "Danh mục quốc tịch"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=dan-toc"}
        >
          Danh mục dân tộc
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=dan-toc",
        undefined,
        undefined,
        "Danh mục dân tộc"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-van"}
        >
          Danh mục học vấn
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-van",
        undefined,
        undefined,
        "Danh mục học vấn"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=chuc-vu"}
        >
          Danh mục chức vụ
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=chuc-vu",
        undefined,
        undefined,
        "Danh mục chức vụ"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-vi"}
        >
          Danh mục học vị
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-vi",
        undefined,
        undefined,
        "Danh mục học vị"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=lanh-dao"}
        >
          Danh mục lãnh đạo
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=lanh-dao",
        undefined,
        undefined,
        "Danh mục lãnh đạo"
      ),
      getItem(
        <Link
          to={
            primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=nghe-nghiep"
          }
        >
          Danh mục nghề nghiệp
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=nghe-nghiep",
        undefined,
        undefined,
        "Danh mục nghề nghiệp"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=ton-giao"}
        >
          Danh mục tôn giáo
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=ton-giao",
        undefined,
        undefined,
        ">Danh mục tôn giáo"
      ),
      getItem(
        <Link to={primaryRoutes.admin.danhMucDungChung.danhMucNgayNghi}>
          Danh mục ngày nghỉ
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMucNgayNghi,
        undefined,
        undefined,
        "Danh mục ngày nghỉ"
      ),
      getItem(
        <Link to={primaryRoutes.admin.danhMucDungChung.danhMucDiaBan}>
          Danh mục địa bàn
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMucDiaBan,
        undefined,
        undefined,
        "Danh mục địa bàn"
      ),
    ]
  ),
  getItem("Danh mục DVC", primaryRoutes.admin.danhMucDVC.root, "StarOutlined", [
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.linhvuc}>Lĩnh vực</Link>,
      primaryRoutes.admin.danhMucDVC.linhvuc,
      undefined,
      undefined,
      "Lĩnh vực"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.thutuc}>Thủ tục</Link>,
      primaryRoutes.admin.danhMucDVC.thutuc,
      undefined,
      undefined,
      "Thủ tục"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.thuTucDonVis}>
        Thủ tục đơn vị
      </Link>,
      primaryRoutes.admin.danhMucDVC.thuTucDonVis,
      undefined,
      undefined,
      "Thủ tục đơn vị"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.philephi}>Phí, lệ phí</Link>,
      primaryRoutes.admin.danhMucDVC.philephi,
      undefined,
      undefined,
      "Phí, lệ phí"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.trangthai}>Trạng thái</Link>,
      primaryRoutes.admin.danhMucDVC.trangthai,
      undefined,
      undefined,
      "Trạng thái"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.nhomnguoidung}>
        Nhóm người dùng
      </Link>,
      primaryRoutes.admin.danhMucDVC.nhomnguoidung,
      undefined,
      undefined,
      "Nhóm người dùng"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.buocxuly}>Bước xử lý</Link>,
      primaryRoutes.admin.danhMucDVC.buocxuly,
      undefined,
      undefined,
      "Bước xử lý"
    ),
    // getItem(<Link to={primaryRoutes.admin.danhMucDVC.donvi}>Đơn vị</Link>, primaryRoutes.admin.danhMucDVC.donvi, undefined, undefined, "Đơn vị"),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.thongbao}>Thông báo</Link>,
      primaryRoutes.admin.danhMucDVC.thongbao,
      undefined,
      undefined,
      "Thông báo"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.taikhoanthuhuong}>
        Tài khoản thụ hưởng
      </Link>,
      primaryRoutes.admin.danhMucDVC.taikhoanthuhuong,
      undefined,
      undefined,
      "Thông báo"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.quanlydanhmucnganh}>
        Danh mục ngành
      </Link>,
      primaryRoutes.admin.danhMucDVC.quanlydanhmucnganh,
      undefined,
      undefined,
      "Quản lý danh mục ngành"
    ),
    getItem(
      <Link to={primaryRoutes.admin.danhMucDVC.mauphoi}>Mẫu phôi</Link>,
      primaryRoutes.admin.danhMucDVC.mauphoi,
      undefined,
      undefined,
      "Mẫu phôi"
    ),
  ]),
  getItem(
    "Quản trị khác",
    primaryRoutes.admin.quanTri.root,
    "SettingOutlined",
    [
      getItem(
        <Link to={primaryRoutes.admin.quanTri.danhSachMenu}>
          Danh sách menu
        </Link>,
        primaryRoutes.admin.quanTri.danhSachMenu,
        undefined,
        undefined,
        "Danh sách menu"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTri.action}>Quản trị action</Link>,
        primaryRoutes.admin.quanTri.action,
        undefined,
        undefined,
        "Quản trị action"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTri.screen}>Quản trị screen</Link>,
        primaryRoutes.admin.quanTri.screen,
        undefined,
        undefined,
        "Quản trị screen"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTri.config}>Quản trị cấu hình</Link>,
        primaryRoutes.admin.quanTri.config,
        undefined,
        undefined,
        "Quản trị config"
      ),
    ]
  ),
  getItem(
    "Quản trị đơn vị",
    primaryRoutes.admin.quanTriDonVi.root,
    "AlignCenterOutlined",
    [
      getItem(
        <Link to={primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung}>
          Quản trị người dùng{" "}
        </Link>,
        primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung,
        undefined,
        undefined,
        "Quản trị người dùng"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTriDonVi.thuTuc}>
          Quản trị thủ tục
        </Link>,
        primaryRoutes.admin.quanTriDonVi.thuTuc,
        undefined,
        undefined,
        "Quản trị thủ tục"
      ),
    ]
  ),
];

export const SIDER_MENU_DVC: MenuProps["items"] = [
  getItem(
    "Tiếp nhận hồ sơ",
    primaryRoutes.dvc.tiepNhanHoSo.root,
    "FormOutlined",
    [
      getItem(
        <Link to={primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan}>
          Mới tiếp nhận
        </Link>,
        primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan,
        undefined,
        undefined,
        "Mới tiếp nhận"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen}>
          Chờ tiếp nhận trực tuyến
        </Link>,
        primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen,
        undefined,
        undefined,
        "Chờ tiếp nhận trực tuyến"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan}>
          Từ chối tiếp nhận
        </Link>,
        primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan,
        undefined,
        undefined,
        "Từ chối tiếp nhận"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy}>
          Đã chuyển xử lý
        </Link>,
        primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy,
        undefined,
        undefined,
        "Đã chuyển xử lý"
      ),
    ]
  ),
  getItem(
    "Bổ sung hồ sơ",
    primaryRoutes.dvc.boSungHoSo.root,
    "IssuesCloseOutlined",
    [
      getItem(
        <Link to={primaryRoutes.dvc.boSungHoSo.yeuCauBoSung}>
          Yêu cầu bổ sung
        </Link>,
        primaryRoutes.dvc.boSungHoSo.yeuCauBoSung,
        undefined,
        undefined,
        "Yêu cầu bổ sung"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.boSungHoSo.choBoSung}>Chờ bổ sung</Link>,
        primaryRoutes.dvc.boSungHoSo.choBoSung,
        undefined,
        undefined,
        "Chờ bổ sung"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.boSungHoSo.daBoSung}>Đã bổ sung</Link>,
        primaryRoutes.dvc.boSungHoSo.daBoSung,
        undefined,
        undefined,
        "Đã bổ sung"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.boSungHoSo.daHoanThanhBoSung}>
          Đã hoàn thành bổ sung
        </Link>,
        primaryRoutes.dvc.boSungHoSo.daHoanThanhBoSung,
        undefined,
        undefined,
        "Đã hoàn thành bổ sung"
      ),
    ]
  ),
  getItem("Theo dõi hồ sơ", primaryRoutes.dvc.theoDoiHoSo.root, "EyeOutlined", [
    getItem(
      <Link to={primaryRoutes.dvc.theoDoiHoSo.hoSoToiHan}>Hồ sơ tới hạn</Link>,
      primaryRoutes.dvc.theoDoiHoSo.hoSoToiHan,
      undefined,
      undefined,
      "Hồ sơ tới hạn"
    ),
    getItem(
      <Link to={primaryRoutes.dvc.theoDoiHoSo.hoSoQuaHan}>Hồ sơ quá hạn</Link>,
      primaryRoutes.dvc.theoDoiHoSo.hoSoQuaHan,
      undefined,
      undefined,
      "Hồ sơ quá hạn"
    ),
    getItem(
      <Link to={primaryRoutes.dvc.theoDoiHoSo.theoDoiTatCaHoSo}>
        Theo dõi tất cả hồ sơ
      </Link>,
      primaryRoutes.dvc.theoDoiHoSo.theoDoiTatCaHoSo,
      undefined,
      undefined,
      "Theo dõi tất cả hồ sơ"
    ),
  ]),
  getItem(
    "Theo dõi hồ sơ TN",
    primaryRoutes.dvc.theoDoiHoSoTN.root,
    "EyeOutlined",
    [
      getItem(
        <Link to={primaryRoutes.dvc.theoDoiHoSoTN.hoSoToiHan}>
          Hồ sơ tới hạn
        </Link>,
        primaryRoutes.dvc.theoDoiHoSoTN.hoSoToiHan,
        undefined,
        undefined,
        "Hồ sơ tới hạn"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.theoDoiHoSoTN.hoSoQuaHan}>
          Hồ sơ quá hạn
        </Link>,
        primaryRoutes.dvc.theoDoiHoSoTN.hoSoQuaHan,
        undefined,
        undefined,
        "Hồ sơ quá hạn"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.theoDoiHoSoTN.theoDoiTatCaHoSo}>
          Theo dõi tất cả hồ sơ
        </Link>,
        primaryRoutes.dvc.theoDoiHoSoTN.theoDoiTatCaHoSo,
        undefined,
        undefined,
        "Theo dõi tất cả hồ sơ"
      ),
    ]
  ),
  getItem(
    "Xử lý hồ sơ",
    primaryRoutes.dvc.xuLyHoSo.root,
    "PlayCircleOutlined",
    [
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.dangXuLy}>Đang xử lý</Link>,
        primaryRoutes.dvc.xuLyHoSo.dangXuLy,
        undefined,
        undefined,
        "Đang xử lý"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.dungXuLy}>Dừng xử lý</Link>,
        primaryRoutes.dvc.xuLyHoSo.dungXuLy,
        undefined,
        undefined,
        "Dừng xử lý"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh}>
          Yêu cầu thực hiện nghĩa vụ tài chính
        </Link>,
        primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh,
        undefined,
        undefined,
        "Yêu cầu thực hiện nghĩa vụ tài chính"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy}>
          Đã chuyển xử lý
        </Link>,
        primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy,
        undefined,
        undefined,
        "Đã chuyển xử lý"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua}>
          Đã chuyển có kết quả
        </Link>,
        primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua,
        undefined,
        undefined,
        "Đã chuyển có kết quả"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenBoSung}>
          Đã chuyển bổ sung
        </Link>,
        primaryRoutes.dvc.xuLyHoSo.daChuyenBoSung,
        undefined,
        undefined,
        "Đã chuyển bổ sung"
      ),
    ]
  ),
  getItem("Trả kết quả", primaryRoutes.dvc.traKetQua.root, "ExportOutlined", [
    getItem(
      <Link to={primaryRoutes.dvc.traKetQua.choTraTrucTuyen}>
        Chờ trả trực tuyến
      </Link>,
      primaryRoutes.dvc.traKetQua.choTraTrucTuyen,
      undefined,
      undefined,
      "Chờ trả trực tuyến"
    ),
    getItem(
      <Link to={primaryRoutes.dvc.traKetQua.choTraTrucTiep}>
        Chờ trả trực tiếp
      </Link>,
      primaryRoutes.dvc.traKetQua.choTraTrucTiep,
      undefined,
      undefined,
      "Chờ trả trực tiếp"
    ),
    getItem(
      <Link to={primaryRoutes.dvc.traKetQua.choTraBCCI}>Chờ trả BCCI</Link>,
      primaryRoutes.dvc.traKetQua.choTraBCCI,
      undefined,
      undefined,
      "Chờ trả BCCI"
    ),
    getItem(
      <Link to={primaryRoutes.dvc.traKetQua.xinRut}>Xin rút</Link>,
      primaryRoutes.dvc.traKetQua.xinRut,
      undefined,
      undefined,
      "Xin rút"
    ),
    getItem(
      <Link to={primaryRoutes.dvc.traKetQua.daTra}>Đã trả</Link>,
      primaryRoutes.dvc.traKetQua.daTra,
      undefined,
      undefined,
      "Đã trả"
    ),
  ]),
  getItem(
    "Thu phí/ lệ phí",
    primaryRoutes.dvc.thuPhiLePhi.root,
    "DollarOutlined",
    [
      getItem(
        <Link to={primaryRoutes.dvc.thuPhiLePhi.choThuPhi}>Chờ thu phí</Link>,
        primaryRoutes.dvc.thuPhiLePhi.choThuPhi,
        undefined,
        undefined,
        "Chờ thu phí"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.thuPhiLePhi.daThuPhi}>Đã thu phí</Link>,
        primaryRoutes.dvc.thuPhiLePhi.daThuPhi,
        undefined,
        undefined,
        "Đã thu phí"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.thuPhiLePhi.daHoanPhi}>Đã hoàn phí</Link>,
        primaryRoutes.dvc.thuPhiLePhi.daHoanPhi,
        undefined,
        undefined,
        "Đã hoàn phí"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.thuPhiLePhi.hoSoDaThuPhiTrucTruyen}>
          Hồ sơ đã thu phí trực tuyến
        </Link>,
        primaryRoutes.dvc.thuPhiLePhi.hoSoDaThuPhiTrucTruyen,
        undefined,
        undefined,
        "Hồ sơ đã thu phí trực tuyến"
      ),
      getItem(
        <Link
          to={primaryRoutes.dvc.thuPhiLePhi.tinhHinhSuDungBienLaiThuPhiLePhi}
        >
          Tình hình sử dụng biên lai thu phí lệ phí
        </Link>,
        primaryRoutes.dvc.thuPhiLePhi.tinhHinhSuDungBienLaiThuPhiLePhi,
        undefined,
        undefined,
        "Tình hình sử dụng biên lai thu phí lệ phí"
      ),
      getItem(
        <Link to={primaryRoutes.dvc.thuPhiLePhi.thongKeThuPhiLePhi}>
          Thống kê thu phí
        </Link>,
        primaryRoutes.dvc.thuPhiLePhi.thongKeThuPhiLePhi,
        undefined,
        undefined,
        "Thống kê thu phí"
      ),
    ]
  ),
  getItem("Tra cứu", primaryRoutes.dvc.traCuu.root, "SearchOutlined", [
    getItem(
      <Link to={primaryRoutes.dvc.traCuu.csdlDanCu}>CSDL dân cư</Link>,
      primaryRoutes.dvc.traCuu.csdlDanCu,
      undefined,
      undefined,
      "CSDL dân cư"
    ),
  ]),
  getItem(
    "Thống kê báo cáo",
    primaryRoutes.dvc.thongKe.root,
    "FileDoneOutlined",
    [
      getItem(
        "Hồ sơ trực tuyến",
        primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen.root,
        "FileDoneOutlined",
        [
          getItem(
            <Link
              to={
                primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
                  .tiepNhanHoSoTrucTuyenCapTinh
              }
            >
              Cấp tỉnh
            </Link>,
            primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
              .tiepNhanHoSoTrucTuyenCapTinh,
            undefined,
            undefined,
            "Tiếp nhận hồ sơ trực tuyến cấp tỉnh"
          ),
          getItem(
            <Link
              to={
                primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
                  .tiepNhanHoSoTrucTuyenCacSoBanNganh
              }
            >
              Các sở, ban, ngành
            </Link>,
            primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
              .tiepNhanHoSoTrucTuyenCacSoBanNganh,
            undefined,
            undefined,
            "Tiếp nhận hồ sơ trực tuyến của các sở, ban, ngành"
          ),
          getItem(
            <Link
              to={
                primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
                  .tiepNhanHoSoTrucTuyenCapHuyen
              }
            >
              Cấp huyện
            </Link>,
            primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
              .tiepNhanHoSoTrucTuyenCapHuyen,
            undefined,
            undefined,
            "Tiếp nhận hồ sơ trực tuyến của UBND cấp huyện"
          ),
          getItem(
            <Link
              to={
                primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
                  .tiepNhanHoSoTrucTuyenCapXa
              }
            >
              Cấp xã
            </Link>,
            primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
              .tiepNhanHoSoTrucTuyenCapXa,
            undefined,
            undefined,
            "Tiếp nhận hồ sơ trực tuyến của UBND cấp xã"
          ),
        ]
      ),
      getItem(
        "Quyết định 766",
        primaryRoutes.dvc.thongKe.quyetDinh766.root,
        "FileDoneOutlined",
        [
          getItem(
            <Link to={primaryRoutes.dvc.thongKe.quyetDinh766.tienDoGiaiQuyet}>
              Tiến độ giải quyết
            </Link>,
            primaryRoutes.dvc.thongKe.quyetDinh766.tienDoGiaiQuyet,
            undefined,
            undefined,
            "Tiến độ giải quyết"
          ),
          getItem(
            <Link
              to={
                primaryRoutes.dvc.thongKe.quyetDinh766
                  .theoDoiChiTieuDVCTrucTuyen
              }
            >
              Theo dõi chỉ tiêu DVC
            </Link>,
            primaryRoutes.dvc.thongKe.quyetDinh766.theoDoiChiTieuDVCTrucTuyen,
            undefined,
            undefined,
            "Theo dõi chỉ tiêu DVC trực tuyến"
          ),
          getItem(
            <Link
              to={primaryRoutes.dvc.thongKe.quyetDinh766.thanhToanTrucTuyen}
            >
              Thanh toán trực tuyến
            </Link>,
            primaryRoutes.dvc.thongKe.quyetDinh766.thanhToanTrucTuyen,
            undefined,
            undefined,
            "Thanh toán trực tuyến"
          ),
        ]
      ),
    ]
  ),

  // getItem('Trả kết quả', primaryRoutes.dvc.xuLyHoSo.root, "FormOutlined", [
  //   getItem(<Link to={primaryRoutes.dvc.xuLyHoSo.dangXuLy}>Đang xử lý</Link>, primaryRoutes.dvc.xuLyHoSo.dangXuLy),
  //   getItem(<Link to={primaryRoutes.dvc.xuLyHoSo.dungXuLy}>Dừng xử lý</Link>, primaryRoutes.dvc.xuLyHoSo.dungXuLy),
  //   getItem(<Link to={primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh}>Yêu cầu thực hiện nghĩa vụ tài chính</Link>, primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh),
  //   getItem(<Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy}>Đã chuyển xử lý</Link>, primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy),
  //   getItem(<Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua}>Đã chuyển có kết quả</Link>, primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua),
  //   getItem(<Link to={primaryRoutes.dvc.xuLyHoSo.daChuyenBoSung}>Đã chuyển bổ sung</Link>, primaryRoutes.dvc.xuLyHoSo.daChuyenBoSung),
  // ]),
];
export const SIDER_MENU_PORTALDVC_Admin: MenuProps["items"] = [
  getItem("Quản trị", primaryRoutes.portaldvc_admin.root, "SettingOutlined", [
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.banner}>Banner</Link>,
      primaryRoutes.portaldvc_admin.banner,
      undefined,
      undefined,
      "Banner"
    ),
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.footer}>Footer</Link>,
      primaryRoutes.portaldvc_admin.footer,
      undefined,
      undefined,
      "Footer"
    ),
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.kieunoidung}>Kiểu nội dung</Link>,
      primaryRoutes.portaldvc_admin.kieunoidung,
      undefined,
      undefined,
      "Kiểu nội dung"
    ),
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.kenhtin}>Kênh tin</Link>,
      primaryRoutes.portaldvc_admin.kenhtin,
      undefined,
      undefined,
      "Kênh tin"
    ),
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.trangthai}>Trạng thái</Link>,
      primaryRoutes.portaldvc_admin.trangthai,
      undefined,
      undefined,
      "Trạng thái"
    ),
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.tinbai}>Tin bài</Link>,
      primaryRoutes.portaldvc_admin.tinbai,
      undefined,
      undefined,
      "Tin bài"
    ),
    getItem(
      <Link to={primaryRoutes.portaldvc_admin.quanlylienket}>
        Quản trị Liên kết
      </Link>,
      primaryRoutes.portaldvc_admin.quanlylienket,
      undefined,
      undefined,
      "Quản lý liên kết"
    ),
  ]),
];

export const LOGOUT_MENU: MenuProps["items"] = [
  getItem(
    "Quản trị hệ thống",
    primaryRoutes.admin.quanTriNguoiDung.root,
    "FormOutlined",
    [
      getItem("Đăng xuất", "dangxuat"),
      getItem("Đổi mật khẩu", primaryRoutes.admin.quanTriNguoiDung.vaiTro),
    ]
  ),
];
