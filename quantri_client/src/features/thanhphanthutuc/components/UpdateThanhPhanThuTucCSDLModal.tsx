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
import { useThanhPhanThuTucContext } from "../contexts/ThanhPhanThuTucContext"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "../models"
import { thanhPhanThuTucApi } from "../services"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { GetThuTuc } from "@/features/thutuc/redux/action"

export const UpdateThanhPhanThuTucCSDLModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchThanhPhanThuTuc>> }) => {
    const ngayHienTai = dayjs();
    const thanhPhanThuTucContext = useThanhPhanThuTucContext()
    const { data: truonghopthutuc } = useAppSelector(state => state.truonghopthutuc)

    const {
        datas: thanhPhanThuTucs,
        count,
        loading,
    } = useAppSelector((state) => state.thanhphanthutuc);
    const { data: thutuc } = useAppSelector(
        (state) => state.thutuc
    );
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    const initialRender = useRef(true);
    const handleCancel = () => {
        thanhPhanThuTucContext.setCapNhatThanhPhanThuTucCSDLTTHCModalVisible(false)
    }
    const thuTucContext = useThuTucContext()

    useEffect(() => {
        if (thuTucContext.maThuTuc)
            dispatch(GetThuTuc(thuTucContext.maThuTuc))
    }, [thuTucContext.thuTucId])
    const [thanhPhanThuTucGoiTinQG, setThanhPhanThuTucGoiTinQG] = useState([])
    
    // useEffect(() => {
    //     if (thutuc?.goiTinThuTucQG) {
    //         const obj = JSON.parse(thutuc?.goiTinThuTucQG) as any;
    //         obj.THANHPHANHOSO.map((item: any) => {
    //             setThanhPhanThuTucGoiTinQG(item.GIAYTO)
    //         }
    //         )
    //     }
    // }, [thutuc])


    useEffect(() => {
        if (thutuc?.goiTinThuTucQG) {
            const obj = JSON.parse(thutuc?.goiTinThuTucQG);
            const items = obj.THANHPHANHOSO.map((item: any) => item);
            const truongHopItem = items.filter((i: any) => i.TRUONGHOP == truonghopthutuc?.ten)
            if (truongHopItem.length === 0) {
                const itemAddNoTruongHop = items.map((i: any) => setThanhPhanThuTucGoiTinQG(i.GIAYTO.map((i : any) => ({...i, SOBANSAO: i.SOBANSAO === "" ? "0" : i.SOBANSAO,SOBANCHINH: i.SOBANCHINH === "" ? "0" : i.SOBANCHINH}))))
            }
            else {
                const itemAddWithTruongHop = truongHopItem.map((i: any) => setThanhPhanThuTucGoiTinQG(i.GIAYTO.map((i : any) => ({...i, SOBANSAO: i.SOBANSAO === "" ? "0" : i.SOBANSAO,SOBANCHINH: i.SOBANCHINH === "" ? "0" : i.SOBANCHINH}))))
            }
        }
    }, [thutuc]);

    // console.log(JSON.parse(thutuc?.goiTinThuTucQG as any));
    // console.log(truonghopthutuc?.ma);

    console.log(thanhPhanThuTucGoiTinQG);
    console.log(thanhPhanThuTucs);
    

    const onOK = async () => {
        try {
            setBtnLoading(true)
            if (thanhPhanThuTucs) {
                const resDeleteMul = await thanhPhanThuTucApi.DeleteMultiThanhPhanThuTuc({ ids: thanhPhanThuTucs?.flatMap(item => item.id) as any })
                const resAddMul = await thanhPhanThuTucApi.UpdateThanhPhanThuTucCSDLTTHC({ dataAdd: thanhPhanThuTucGoiTinQG, truongHopId: truonghopthutuc?.ma as any, thuTucId: truonghopthutuc?.thuTucId as any })
                if (resDeleteMul.data && resAddMul.data) {
                    toast.success("Thao tác thành công")
                    thanhPhanThuTucContext.setCapNhatThanhPhanThuTucCSDLTTHCModalVisible(false)
                    setSearchParams((cur) => ({ ...cur }))
                    setBtnLoading(false)
                }
            }
            else {
                const resAddMul = await thanhPhanThuTucApi.UpdateThanhPhanThuTucCSDLTTHC({ dataAdd: thanhPhanThuTucGoiTinQG, truongHopId: truonghopthutuc?.ma as any, thuTucId: truonghopthutuc?.thuTucId as any })
                if (resAddMul.data) {
                    toast.success("Thao tác thành công")
                    thanhPhanThuTucContext.setCapNhatThanhPhanThuTucCSDLTTHCModalVisible(false)
                    setSearchParams((cur) => ({ ...cur }))
                    setBtnLoading(false)
                }
            }

        } catch (error) {
            toast.info((error as any).response.data)
            setBtnLoading(false)
        }
    }
    return (
        <AntdModal confirmLoading={btnLoading} onOk={onOK} visible={thanhPhanThuTucContext.capNhatThanhPhanThuTucCSDLTTHCModalVisible} title="" handlerCancel={handleCancel} >
            <div className="text-center" style={{ color: 'rgb(28 26 18)', fontWeight: 500, textAlign: 'center', fontSize: '18px' }}>Xác nhận cập nhật thành phần thủ tục từ CSDLTTHC</div>
        </AntdModal>
    )
}