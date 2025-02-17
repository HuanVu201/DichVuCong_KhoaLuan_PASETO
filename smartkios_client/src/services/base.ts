import { IBaseExt, IPaginationResponse, IOmitCreate, IOmitUpdate, IPickSearch, ICredential, IBasePagination, IResult, ISoftDelete } from "../models"
import { AxiosResponseWrapper } from '../lib/axios/typeHelper'
import { API_VERSION } from "../data/constant";
import axiosInstance from "../lib/axios";
export namespace Service {
    export type IUpdateService<TObj> = IOmitUpdate<TObj> & { id: string }
    // weakly typed
    export interface ICrud<TObj extends IBaseExt> {
        Search(_params: IPickSearch<TObj>): AxiosResponseWrapper<IPaginationResponse<TObj[]>>
        Get(_id: string): AxiosResponseWrapper<IResult<TObj>>
        Create(_data: IOmitCreate<TObj>): AxiosResponseWrapper
        Delete(_id: ISoftDelete): AxiosResponseWrapper
        Restore(_id: string): AxiosResponseWrapper
        Update(_params: IOmitUpdate<TObj>): AxiosResponseWrapper
    }

    export const apiEndpoints = {
        dichvus: "dichvus",
        kenhtins: "kenhtins",
        loaidichvus: "loaidichvus",
        tokens: "tokens",
        tinbais: "tinbais",
        cocautochucs: "groups",
        cauhinhhethongs: "cauhinhhethongs",
        linhvucs: "linhvucs",
        mauphois: "mauphois",
        thutucs: "thutucs",
        danhmucchungs: "danhmucchungs",
        ngaynghis: "ngaynghis",
        loaiphilephis: "loaiphilephis",
        philephis: "philephis",
        donvithutucs: 'donvithutucs',
        quytrinhxulys: "quytrinhxulys",
        trangthaihosos: "trangthaihosos",
        nhomnguoidungs: "nhomnguoidungs",
        truonghopthutucs: "truonghopthutucs",
        kieunoidungs: "kieunoidungs",
        danhmucngays: "danhmucngays",
        buocxulys: 'buocxulys',
        thongbaos: 'thongbaos',
        diabans: 'diabans',
        users: "users",
        "personals/changepassword": "personals/changepassword",
        roles: "roles",
        "auth/profile": "auth/profile",
        groups: "groups",
        menus: "menus",
        "personal/profile": "personal/profile",
        hosos: "hosos",
        actions: "actions",
        screens: "screens",
        screenactions: "screenactions",
        thanhphanthutucs: "thanhphanthutucs",
        nguoidungnhomnguoidungs: "nguoidungnhomnguoidungs",
        configs: "configs",
        thanhphanhosos: "thanhphanhosos",
        giaytosohoas: "giaytosohoas",
        quatrinhxulyhosos: "quatrinhxulyhosos",
        banners: 'banners',
        footers: 'footers',
        yeucauthanhtoans: "yeucauthanhtoans",
        trangthais: 'trangthais',
        hoidaps: 'hoidaps',
        phanAnhKienNghis: 'phanAnhKienNghis',
        huongdansudungs: 'huongdansudungs',
        hosobosungs: 'hosobosungs',
        taikhoanthuhuongs: 'taikhoanthuhuongs',
        quanlylienkets: 'quanlylienkets',
        giaodichthanhtoans: 'giaodichthanhtoans',
        thongkehosotructuyens: 'thongkehosotructuyens',
        quyetdinhs: 'quyetdinhs',
        thongkeportals: 'thongkeportals',
        baocaotonghops: "baocaotonghops",
        danhgiahailongs: "danhgiahailongs",
        userroles: "userroles",
        logtaikhoancsdldancudoanhnghieps: 'logtaikhoancsdldancudoanhnghieps',
        neac: "neac",
        adminhosos: "adminhosos",
        files: "files",
        ketqualienquans: "ketqualienquans",
        ketquathutucs: "ketquathutucs",
        quatrinhtraodoicongdans: "quatrinhtraodoicongdans",
        cauhoiphobiens: "cauhoiphobiens",
        dstailieuhdsds : 'dstailieuhdsds',
        menuketquathutucs:"menuketquathutucs",
        quanlyvanbans : 'quanlyvanbans',
        thaydoimucdothutucs : 'thaydoimucdothutucs',
        sochungthucs : 'sochungthucs',
        phieukhaosats : 'phieukhaosats',
        duthaoxulyhosos:"duthaoxulyhosos",
        danhmucgiaytochungthucs: "danhmucgiaytochungthucs",
        danhgiacoquans: "danhgiacoquans"

    } as const
    export const primaryRoutes = {
        redirectUser: "/redirect-user",
        admin: {
            root: "/admin",
            danhgiahailong: {
                root: "/admin/danh-gia-hai-long",
                danhGiaCoQuan: "/admin/danh-gia-hai-long/danh-gia-co-quan",
                baoCao01: "/admin/danh-gia-hai-long/bao-cao-mau01",
                baoCao02: "/admin/danh-gia-hai-long/bao-cao-mau02",
                baoCao03: "/admin/danh-gia-hai-long/bao-cao-mau03",
            },
            thongke: {
                root: "/admin/quan-tri-thong-ke",
                danhGiaHaiLong: "/admin/quan-tri-thong-ke/danh-gia-muc-do-hai-long"

            },
            quanTriNguoiDung: {
                root: "/admin/quan-tri-nguoi-dung",
                coCauToChuc: "/admin/quan-tri-nguoi-dung/co-cau-to-chuc",
                vaiTro: "/admin/quan-tri-nguoi-dung/vai-tro",
                nguoiDungDonVi: '/admin/quan-tri-nguoi-dung/nguoi-dung-don-vi',
                taiKhoanTuCSDLDanCu: '/admin/quan-tri-nguoi-dung/tk-csdl-dan-cu',
                doimatkhau: '/admin/quan-tri-nguoi-dung/doi-mat-khau',
                thongtintaikhoan: '/admin/quan-tri-nguoi-dung/thong-tin-tai-khoan',
                danhsachnguoidung: '/admin/quan-tri-nguoi-dung/danh-sach-nguoi-dung',

            },
            danhMucDungChung: {
                root: "/admin/danh-muc-dung-chung",
                danhMuc: "/admin/danh-muc-dung-chung/danh-muc",
                danhMucNgayNghi: "/admin/danh-muc-dung-chung/ngay-nghi",
                danhMucDiaBan: "/admin/danh-muc-dung-chung/dia-ban"
            },
            danhMucDVC: {
                root: "/admin/danh-muc-dvc",
                linhvuc: "/admin/danh-muc-dvc/linh-vuc",
                danhmucgiaytochungthuc: "/admin/danh-muc-dvc/giay-to-chung-thuc",
                thutuc: "/admin/danh-muc-dvc/thu-tuc",
                mauphoi: "/admin/danh-muc-dvc/mau-phoi",
                philephi: "/admin/danh-muc-dvc/phi-lephi",
                trangthai: "/admin/danh-muc-dvc/trang-thai",
                nhomnguoidung: "/admin/danh-muc-dvc/nhom-nguoi-dung",
                buocxuly: "/admin/danh-muc-dvc/buoc-xu-ly",
                donvi: "/admin/danh-muc-dvc/don-vi",
                thongbao: "/admin/danh-muc-dvc/thong-bao",
                taikhoanthuhuong: "/admin/danh-muc-dvc/tai-khoan-thu-huong",
                thuTucDonVis: "/admin/danh-muc-dvc/thu-tuc-don-vi",
                quanlydanhmucnganh: "/admin/danh-muc-dvc/quanlydanhmucnganh",
                thaydoimucdothutuc: "/admin/danh-muc-dvc/thay-doi-muc-do-thu-tuc",
                sochungthuc: "/admin/danh-muc-dvc/so-chung-thuc"
            },
            quanTri: {
                root: "/admin/quan-tri",
                manager: "/admin/quan-tri/manager-procedure-menu",
                danhSachMenu: "/admin/quan-tri/danh-sach-menu",
                action: "/admin/quan-tri/action",
                screen: "/admin/quan-tri/screen",
                config: "/admin/quan-tri/config",

            },
            quanTriDonVi: {
                root: "/admin/quan-tri-don-vi",
                danhMucCoCauToChuc: "/admin/quan-tri-don-vi/danh-muc-co-cau-to-chuc",
                thuTuc: "/admin/quan-tri-don-vi/danh-muc-thu-tuc",
                danhMucNguoiDung: "/admin/quan-tri-don-vi/danh-muc-nguoi-dung",
                sochungthuc: "/admin/quan-tri-don-vi/so-chung-thuc"

            }
        },
        dvc: {
            root: "/dvc",
            tiepNhanHoSo: {
                root: "/dvc/tiep-nhan-ho-so",
                moiTiepNhan: "/dvc/tiep-nhan-ho-so/moi-tiep-nhan",
                choTiepNhanTrucTuyen: "/dvc/tiep-nhan-ho-so/cho-tiep-nhan-truc-tuyen",
                tuChoiTiepNhan: "/dvc/tiep-nhan-ho-so/tu-choi-tiep-nhan",
                daChuyenXuLy: "/dvc/tiep-nhan-ho-so/da-chuyen-xu-ly",
            },
            xuLyHoSo: {
                root: "/dvc/xu-ly-ho-so",
                dangXuLy: "/dvc/xu-ly-ho-so/dang-xu-ly",
                dungXuLy: "/dvc/xu-ly-ho-so/dung-xu-ly",
                yeuCauThucHienNghiaVuTaiChinh: "/dvc/xu-ly-ho-so/yeu-cau-thuc-hien-nghia-vu-tai-chinh",
                daChuyenXuLy: "/dvc/xu-ly-ho-so/da-chuyen-xu-ly",
                daChuyenCoKetQua: "/dvc/xu-ly-ho-so/da-chuyen-co-ket-qua",
                daChuyenBoSung: "/dvc/xu-ly-ho-so/da-chuyen-bo-sung",
            },
            traKetQua: {
                root: "/dvc/tra-ket-qua",
                choTraTrucTuyen: "/dvc/tra-ket-qua/cho-tra-truc-tuyen",
                choTraTrucTiep: "/dvc/tra-ket-qua/cho-tra-truc-tiep",
                choTraBCCI: "/dvc/tra-ket-qua/cho-tra-bcci",
                xinRut: "/dvc/tra-ket-qua/xin-rut",
                daTra: "/dvc/tra-ket-qua/da-tra",
                choXacNhanTraKq: "/dvc/tra-ket-qua/cho-xac-nhan-tra-kq",
                choXacNhanTraKqChuaThuPhi: "/dvc/tra-ket-qua/cho-xac-nhan-chua-thu-phi",
                daCoKetQua: "/dvc/tra-ket-qua/da-co-ket-qua",
                theoDoiChuyenTraKq: "/dvc/tra-ket-qua/theo-doi-da-chuyen-tra-kq",
            },
            boSungHoSo: {
                root: "/dvc/bo-sung-ho-so",
                yeuCauBoSung: "/dvc/bo-sung-ho-so/yeu-cau-bo-sung",
                choBoSung: "/dvc/bo-sung-ho-so/cho-bo-sung",
                daBoSung: "/dvc/bo-sung-ho-so/da-bo-sung",
                daHoanThanhBoSung: "/dvc/bo-sung-ho-so/da-hoan-thanh-bo-sung",
            },
            theoDoiHoSo: {
                root: "/dvc/theo-doi-ho-so",
                hoSoToiHan: "/dvc/theo-doi-ho-so/ho-so-toi-han",
                hoSoQuaHan: "/dvc/theo-doi-ho-so/ho-so-qua-han",
                theoDoiTatCaHoSo: "/dvc/theo-doi-ho-so/theo-doi-tat-ca-ho-so",
            },
            theoDoiHoSoTN: {
                root: "/dvc/theo-doi-ho-so-tn",
                hoSoToiHan: "/dvc/theo-doi-ho-so-tn/ho-so-toi-han",
                hoSoQuaHan: "/dvc/theo-doi-ho-so-tn/ho-so-qua-han",
                theoDoiTatCaHoSo: "/dvc/theo-doi-ho-so-tn/theo-doi-tat-ca-ho-so",
            },
            thuPhiLePhi: {
                root: "/dvc/thu-phi-le-phi",
                choThuPhi: "/dvc/thu-phi-le-phi/cho-thu-phi",
                daThuPhi: "/dvc/thu-phi-le-phi/da-thu-phi",
                daHoanPhi: "/dvc/thu-phi-le-phi/da-hoan-phi",
                huyThuPhi: "/dvc/thu-phi-le-phi/huy-thu-phi",
                theoDoiHuyThuPhi: "/dvc/thu-phi-le-phi/theo-doi-huy-thu-phi",
                theoDoiChoThuPhi: "/dvc/thu-phi-le-phi/theo-doi-cho-thu-phi",
                theoDoiDaHoanPhi: "/dvc/thu-phi-le-phi/theo-doi-da-hoan-phi",
                theoDoiDaThuPhi: "/dvc/thu-phi-le-phi/theo-doi-da-thu-phi",
                hoSoDaThuPhiTrucTruyen: "/dvc/thu-phi-le-phi/ho-so-da-thu-phi-truc-tuyen",
                tinhHinhSuDungBienLaiThuPhiLePhi: "/dvc/thu-phi-le-phi/tinh-hinh-su-dung-bien-lai-thu-phi-le-phi",
                thongKeThuPhiLePhi: "/dvc/thu-phi-le-phi/thong-ke-thu-phi-le-phi",
            },
            traCuu: {
                root: "/dvc/tra-cuu",
                csdlDanCu: "/dvc/tra-cuu/csdl-dan-cu",
                tatCaHoSo: "/dvc/tra-cuu/tat-ca-ho-so",
                hoSoTheoDonVi: "/dvc/tra-cuu/ho-so-theo-don-vi",
                adminYeuCauThanhToan: "/dvc/tra-cuu/admin-yeu-cau-thanh-toan",
                hoSoLienThong: "/dvc/tra-cuu/ho-so-lien-thong",
            },
            canBoBCCI:{
                root: "/dvc/bcci",
                dangKy: "/dvc/bcci/dang-ky",
                daDangKy: "/dvc/bcci/da-dang-ky",
                daTraKetQua: "/dvc/bcci/da-tra-kq"
            },
            thongKe: {
                root: "/dvc/thong-ke",
                tiepNhanHoSoTrucTuyen: {
                    root: "/dvc/thong-ke/tiep-nhan-ho-so-truc-tuyen",
                    tiepNhanHoSoTrucTuyenCapTinh: "/dvc/thong-ke/ho-so-truc-tuyen-cap-tinh",
                    tiepNhanHoSoTrucTuyenCacSoBanNganh: "/dvc/thong-ke/ho-so-truc-tuyen-cac-so-ban-nganh",
                    tiepNhanHoSoTrucTuyenCapHuyen: "/dvc/thong-ke/ho-so-truc-tuyen-cap-huyen",
                    tiepNhanHoSoTrucTuyenCapXa: "/dvc/thong-ke/ho-so-truc-tuyen-cap-xa",
                },
                quyetDinh766: {
                    root: "/dvc/thong-ke/quyet-dinh-766",
                    tienDoGiaiQuyet: "/dvc/thong-ke/tien-do-giai-quyet",
                    theoDoiChiTieuDVCTrucTuyen: "/dvc/thong-ke/theo-doi-chi-tieu-dvc-truc-tuyen",
                    thanhToanTrucTuyen: "/dvc/thong-ke/thanh-toan-truc-tuyen",
                    thongKeTongHop: "/dvc/thong-ke/thong-ke-tong-hop",
                    thanhToanTrucTuyen2: "/dvc/thong-ke/thanh-toan-truc-tuyen-2",
                    theoDoiChiTieuDVCTrucTuyen2: "/dvc/thong-ke/theo-doi-chi-tieu-dvc-truc-tuyen-2",
                    tienDoGiaiQuyet2: "/dvc/thong-ke/tien-do-giai-quyet-2",
                    chiTieuSoHoa: "/dvc/thong-ke/chi-tieu-so-hoa",
                    hoSoQuaHan: "/dvc/thong-ke/ho-so-qua-han",
                    thongKeThanhToanTrucTuyen: "/dvc/thong-ke/thong-ke-thanh-toan-truc-tuyen",
                }
            },
            chungThuc: {
                root: "/dvc/chung-thuc",
                moiTiepNhan: "/dvc/chung-thuc/tiep-nhan-ho-so",
                choTiepNhanTrucTuyen: "/dvc/chung-thuc/cho-tiep-nhan-truc-tuyen",
                dangXuLy: "/dvc/chung-thuc/dang-xu-ly",
                choTraKetQua: "/dvc/chung-thuc/cho-tra-ket-qua",
            },
            duThaoXuLyHoSo: {
                root: "/dvc/du-thao-xu-ly-ho-so",
                boSungChoXuLy: "/dvc/du-thao-xu-ly-ho-so/bo-sung-cho-xu-ly",
                traLaiXinRutChoXuLy: "/dvc/du-thao-xu-ly-ho-so/tra-lai-xin-rut-cho-xu-ly",
                boSungDaXuLy: "/dvc/du-thao-xu-ly-ho-so/bo-sung-da-xu-ly",
                traLaiXinRutDaXuLy: "/dvc/du-thao-xu-ly-ho-so/tra-lai-xin-rut-da-xu-ly",
                boSungChoKyDuyet: "/dvc/du-thao-xu-ly-ho-so/bo-sung-cho-ky-duyet",
                traLaiXinRutChoKyDuyet: "/dvc/du-thao-xu-ly-ho-so/tra-lai-xin-rut-cho-ky-duyet",
            }

        },
        portaldvc_admin: {
            root: "/portaldvc_admin",
            banner: "/portaldvc_admin/banner",
            footer: "/portaldvc_admin/footer",
            kieunoidung: "/portaldvc_admin/kieunoidung",
            kenhtin: "/portaldvc_admin/kenhtin",
            trangthai: "/portaldvc_admin/trangthai",
            tinbai: "/portaldvc_admin/tinbai",
            quanlylienket: "/portaldvc_admin/quanlylienket",
            huongdansudung: "/portaldvc_admin/huongdansudung",
            cauhoiphobien: "/portaldvc_admin/cauhoiphobien",
            dstailieuhdsd: "/portaldvc_admin/dstailieuhdsd",
            hoidap: "/portaldvc_admin/hoidap",
            paknChuaTraLoi: "/portaldvc_admin/pakn-cho-tra-loi",
            paknDaTraLoi: "/portaldvc_admin/pakn-da-tra-loi",
            quantrivanban: "/portaldvc_admin/quantrivanban",
            taoqrcode: "/portaldvc_admin/tao-qrcode",

        },
        portaldvc: {
            root: '/portaldvc',
            hosocanhan: {
                root:"/portaldvc/ho-so-ca-nhan",
                dichVuCongCuaToi: '/portaldvc/ho-so-ca-nhan/dvc-dich-vu-cong-cua-toi',
                thanhToanPhiLePhi: '/portaldvc/ho-so-ca-nhan/dvc-thanh-toan-phi-le-phi',
                taiLieuDienTu: '/portaldvc/ho-so-ca-nhan/dvc-tai-lieu-dien-tu',
                thongTinDinhDanh: '/portaldvc/ho-so-ca-nhan/dvc-thong-tin-tai-khoan',
            },
            home: '/portaldvc/home',
            tinTuc: '/portaldvc/tin-tuc',
            kieunoidung: "/portaldvc_admin/kieunoidung",
            kenhtin: "/portaldvc_admin/kenhtin",
            trangthai: "/portaldvc_admin/trangthai",
            // tinbai: "/portaldvc_admin/tinbai",
            // kieunoidung: "/portaldvc_admin/kieunoidung",
            // kenhtin: "/portaldvc_admin/kenhtin",
            // trangthai: "/portaldvc_admin/trangthai",
            tinbai: '/portaldvc/tin-bai/:id',
            hoidap: "/portaldvc/hoi-dap",
            hoidapchitiet: '/portaldvc/hoi-dap/:id',
            danhmucTTHC: "/portaldvc/danh-muc-tthc",
            guiPAKN: "/portaldvc/pakn-dvc-tinh",
            danhSachPAKN: "/portaldvc/danh-sach-pakn-dvc-tinh",
            chitietthutuc: '/portaldvc/chi-tiet-thu-tuc/:id',
            trangWiki: '/portaldvc/trang-tin/:id',
            traCuu: '/portaldvc/tra-cuu',
            dvcTrucTuyen: '/portaldvc/dvc-truc-tuyen',
            thanhToan: '/portaldvc/thanh-toan',
            thongke: "/portaldvc/thong-ke",
            thongkeMap: "/portaldvc/ban-do-thong-ke",
            xacNhanThanhToan: '/portaldvc/thanh-toan/xac-nhan',
            nopHoSoTrucTuyen: '/portaldvc/nop-ho-so-truc-tuyen',
            huongdansudungportal: '/portaldvc/huong-dan-su-dung',
            nhungcauhoithuonggap: '/portaldvc/nhung-cau-hoi-thuong-gap',
            nhungcauhoithuonggapchitiet: '/portaldvc/nhung-cau-hoi-thuong-gap/:id',
            dstailieuhuongdansudung: '/portaldvc/danh-sach-tai-lieu-hdsd',
            quanlyvanban: '/portaldvc/quan-ly-van-ban',
            danhgiahailong: '/portaldvc/danh-gia-hai-long',

        },
        readQrCode: {
            root: '/apiqr/qr'
        },
        smartkiosk: {
            root: '/smartkiosk',
            tthc : '/smartkiosk/thu-thuc-hanh-chinh',
            dangkidvc : '/smartkiosk/dang-ki-dich-vu-cong',
            nopHoSoTrucTuyen: '/smartkiosk/nop-ho-so-truc-tuyen',
            laysohangdoi : '/smartkiosk/lay-so-hang-doi',
            tracuuhoso : '/smartkiosk/tra-cuu-ho-so',
            thanhtoandvc : '/smartkiosk/thanh-toan-dich-vu-cong',
            danhgiahailong : '/smartkiosk/danh-gia-hai-long',
        },
        mobile: {
            nopHoSoTrucTuyen: "/mobile/nop-ho-so-truc-tuyen",
            chatBot: "/mobile/chat-bot",
        },
        admin_tthc: {
            root: "/admin_tthc",

        },



    }
    export type AppEndpoint = keyof typeof apiEndpoints
    export class BaseApi {
        public readonly _urlSuffix: string
        // public readonly _axios = axiosInstance 
        constructor(keyEndpoint: AppEndpoint, apiVersion: string = API_VERSION) {
            this._urlSuffix = apiVersion + apiEndpoints[keyEndpoint]
        }
    }
}
