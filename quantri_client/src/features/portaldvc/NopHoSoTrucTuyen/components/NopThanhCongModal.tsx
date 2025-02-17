import { Modal } from "antd"
import "./Modal.scss"
import { useNavigate } from "react-router-dom"
import { Service } from "@/services"
import { IHoSo } from "@/features/hoso/models"
import { useEffect, useMemo, useState } from "react"
import { QuanLyLienKetService } from "@/features/portaldvc_admin/QuanLyLienKet/services"
import { IQuanLyLienKet } from "@/features/portaldvc_admin/QuanLyLienKet/models"
const lienKetPortalService = new QuanLyLienKetService();

export const NopThanhCongModal = ({hoSo, handlerClose}: {hoSo: Pick<IHoSo, "chuHoSo" | "maHoSo" | "thoiGianThucHien" | "tenTTHC" | "groupName"> | undefined, handlerClose: () => void}) => {
    const navigate = useNavigate()
    const [links, setLinks] = useState<IQuanLyLienKet[]>([]);
    useEffect(() => {
        (async () => {
        const response = await lienKetPortalService.Search({ma: "image-quan-tam-zalo"});
        if (response?.data?.data) {
            setLinks(response?.data?.data);
        }
        })();
    }, []);
    const imageZalo = useMemo(() => {
        return links?.find(x => x.ma == "image-quan-tam-zalo")?.linkLienKet
    }, [links])
    return <Modal keyboard={false} open={true} maskClosable={false} footer={null} onCancel={handlerClose} wrapClassName="modal-saved-document" width={760} mask={false} closable={false}>
        <h5 className="text-center" style={{color: '#b71a1f', fontWeight:600 }}>Đăng ký hồ sơ thành công</h5>
        <p className="fs-6 mt-2">
            Chúc mừng ông/bà {hoSo?.chuHoSo} đã đăng ký thành công dịch vụ {hoSo?.tenTTHC} cho {hoSo?.groupName}. Hồ sơ của ông/bà sẽ được phản hồi trong 08 giờ làm việc.
        </p>
        <p className="fs-6">Mã hồ sơ đăng ký: {hoSo?.maHoSo}</p>
        <p className="fs-6">
            Ông/bà có thể chọn <span style={{color: "#b71a1f"}}>Quản lý hồ sơ cá nhân</span> để xem thông tin chi tiết hồ sơ đã đăng ký.
        </p>
        <p className="fs-6">
            Ông/bà vui lòng sử dụng ứng dụng Zalo để quét mã QR-Code và nhấn "Quan tâm" Zalo Offical Account để nhận được thông báo tiến độ giải quyết hồ sơ TTHC.
        </p >
        <div className="d-flex my-2">
            <img src={imageZalo || ""} className="text-center" style={{width:100, height:100, margin: "0 auto"}}/>
        </div>

        <div className="row mt-5 d-flex jutify-content-between gy-2">
            <div className="col-12 col-md-4">
                <button className="btn btn-yellow btn-md w-100" role="link" onClick={() => navigate(Service.primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi)}>
                    Quản lý hồ sơ cá nhân
                </button>
            </div>
            <div className="col-md-4 col-6">
                <button className="btn btn-yellow btn-md w-100" role="link" onClick={() => navigate(Service.primaryRoutes.portaldvc.dvcTrucTuyen)}>
                    Đăng ký hồ sơ khác
                </button>
            </div>
            <div className="col-md-4 col-6">
                <button className="btn btn-yellow btn-md w-100" role="link" onClick={() =>{
                    navigate(Service.primaryRoutes.portaldvc.home)
                    window.postMessage("home")
                }}>
                    Về trang chủ
                </button>
            </div>
        </div>
    </Modal>
}