import { Modal } from "antd"
import "./Modal.scss"
import { useNavigate } from "react-router-dom"
import { Service } from "@/services"
import { IHoSo } from "@/features/hoso/models"
import { useEffect, useMemo, useState } from "react"
import { QuanLyLienKetService } from "@/features/portaldvc_admin/QuanLyLienKet/services"
import { IQuanLyLienKet } from "@/features/portaldvc_admin/QuanLyLienKet/models"
const lienKetPortalService = new QuanLyLienKetService();

export const NopThanhCongHoSoNhapModal = ({ hoSo, handlerClose }: { hoSo: Pick<IHoSo, "chuHoSo" | "maHoSo" | "thoiGianThucHien" | "tenTTHC" | "groupName"> | undefined, handlerClose: () => void }) => {
    const navigate = useNavigate()
    const [links, setLinks] = useState<IQuanLyLienKet[]>([]);

    return <Modal  keyboard={false} open={true} maskClosable={false} footer={null} onCancel={handlerClose} wrapClassName="modal-saved-document" width={760} mask={false} closable={true}>
        <h5 className="text-center" style={{ color: '#b71a1f', fontWeight: 600 }}>Lưu hồ sơ thành công!</h5>
        <p className="fs-6 mt-3" style={{textAlign : 'center',fontWeight : "600"}}>
            Ông/bà có thể xem lại hồ sơ tại mục: Hồ sơ chưa gửi. Số lượng hồ sơ lưu nháp tối đa là 05 hồ sơ.
        </p>
        <div className="row mt-3 d-flex jutify-content-between gy-2">
            <div className="col-12 col-md-4">
                <button className="btn btn-yellow btn-md w-100" role="link" onClick={() => navigate(Service.primaryRoutes.portaldvc.hosocanhan.hoSoLuuTru)}>
                    Quản lý hồ sơ chưa gửi
                </button>
            </div>
            <div className="col-md-4 col-6">
                <button className="btn btn-yellow btn-md w-100" role="link" onClick={() => navigate(Service.primaryRoutes.portaldvc.dvcTrucTuyen)}>
                    Đăng ký hồ sơ khác
                </button>
            </div>
            <div className="col-md-4 col-6">
                <button className="btn btn-yellow btn-md w-100" role="link" onClick={() => {
                    navigate(Service.primaryRoutes.portaldvc.home)
                    window.postMessage("home")
                }}>
                    Về trang chủ
                </button>
            </div>
        </div>
    </Modal>
}