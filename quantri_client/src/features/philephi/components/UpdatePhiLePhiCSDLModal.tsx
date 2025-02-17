import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useRef, useState } from "react"
import { Modal } from "antd"
import { ISearchHoSo } from "@/features/hoso/models"
import { SearchHoSo, ThuHoiHoSo, UpdateTrangThaiHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"
import dayjs from "dayjs";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { GetThuTuc } from "@/features/thutuc/redux/action"
import { useThanhPhanThuTucContext } from "@/features/thanhphanthutuc/contexts/ThanhPhanThuTucContext"
import { ISearchThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import { ISearchPhiLePhi } from "../models"
import { usePhiLePhiContext } from "../contexts/PhiLePhiContext"
import { phiLePhiApi } from "../services"

export const UpdatePhiLePhiCSDLModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhiLePhi>> }) => {
    const thuTucContext = useThuTucContext()
    const phiLePhiContext = usePhiLePhiContext()
    const { data: truonghopthutuc } = useAppSelector(state => state.truonghopthutuc)
    const { datas: philephis, count } = useAppSelector(state => state.phiLePhi)
    const [thanhPhanThuTucGoiTinQG, setThanhPhanThuTucGoiTinQG] = useState([])

    const { data: thutuc } = useAppSelector(
        (state) => state.thutuc
    );
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    const initialRender = useRef(true);

    useEffect(() => {
        if (thuTucContext.maThuTuc)
            dispatch(GetThuTuc(thuTucContext.maThuTuc))
    }, [thuTucContext.thuTucId])

    useEffect(() => {
        if (thutuc?.goiTinThuTucQG) {
            const obj = JSON.parse(thutuc?.goiTinThuTucQG);
            const items = obj.CACHTHUCTHUCHIEN.map((item: any) => item);
            const phiLePhiList = items.flatMap((channel: any) =>
                channel.THOIGIAN.flatMap((time: any) => time.PHILEPHI)
            );
            console.log(phiLePhiList);
            
            const renamedList = phiLePhiList.map((item: any) => ({
                ten: item.MAPHILEPHI === "1'" ? "Phí" : "Lệ phí",
                ma: item.MAPHILEPHI,
                loai: item.MAPHILEPHI == "1'" ? "Phí" : "Lệ phí",
                soTien: parseInt((item.SOTIEN).replace(/[^0-9]/g, ''), 10),
                moTa: item.MOTA,
                dinhKem: item.TENTEP,
            }));

            setThanhPhanThuTucGoiTinQG(renamedList)
        }
    }, [thutuc]);



    const onOK = async () => {
        try {
            setBtnLoading(true)
            if (philephis) {
                const resDeleteMul = await phiLePhiApi.DeleteMulti({ ids: philephis?.flatMap(item => item.id) as any })
                const resAddMul = await phiLePhiApi.AddMulti({ dataAdd: thanhPhanThuTucGoiTinQG, truongHopId: truonghopthutuc?.ma as any, thuTucId: thuTucContext.thuTucId as any })
                if (resDeleteMul.data && resAddMul.data) {
                    toast.success("Thao tác thành công")
                    phiLePhiContext.setUpdatePhiLePhiCSDLModalVisible(false)
                    setSearchParams((cur) => ({ ...cur }))
                    setBtnLoading(false)
                }
            }
            else {
                const resAddMul = await phiLePhiApi.AddMulti({ dataAdd: thanhPhanThuTucGoiTinQG, truongHopId: truonghopthutuc?.ma as any, thuTucId: thuTucContext.thuTucId as any })
                if (resAddMul.data) {
                    toast.success("Thao tác thành công")
                    phiLePhiContext.setUpdatePhiLePhiCSDLModalVisible(false)
                    setSearchParams((cur) => ({ ...cur }))
                    setBtnLoading(false)
                }
            }
        } catch (error) {
            toast.info((error as any).response.data)
            setBtnLoading(false)
        }
    }

    const handleCancel = () => {
        phiLePhiContext.setUpdatePhiLePhiCSDLModalVisible(false)
    }

    return (
        <AntdModal onOk={onOK} confirmLoading={btnLoading} visible={phiLePhiContext.updatePhiLePhiCSDLModalVisible} title="" handlerCancel={handleCancel} >
            <div className="text-center" style={{ color: 'rgb(28 26 18)', fontWeight: 500, textAlign: 'center', fontSize: '18px' }}>Xác nhận cập nhật phí lệ phí từ CSDLTTHC</div>
        </AntdModal>
    )
}