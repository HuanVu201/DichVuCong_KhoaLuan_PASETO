import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo } from "@/features/hoso/redux/action"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Modal } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const HoanThanhBoSungModal = ({setSearchHoSoParams}: {setSearchHoSoParams : React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [btnLoading, setBtnLoading] = useState(false)
    const handleCancel = () => {
        buttonActionContext.setHoanThanhBoSungModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        if(buttonActionContext.selectedHoSos.length){
            try {
                setBtnLoading(true)
                const res = await hoSoApi.HoanThanhBoSungHoSo(buttonActionContext.selectedHoSos[0] as string)
                if(res.data.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    toast.success("Thao tác thành công")
                    handleCancel()
                }
                setBtnLoading(false)
            } catch (error) {
                setBtnLoading(false)
            }
        }
    }

    // useEffect(() => {
    //     if(buttonActionContext.selectedHoSos.length){
    //         Modal.confirm({
    //             content: "Xác nhận công dân đã bổ sung hồ sơ",
    //             okText: "Đồng ý",
    //             // content: <AntdSpace direction="vertical">
    //             //     <div> Mã bước hiện tại: {hoSo.buocHienTai}</div>
    //             //     <div>Tên bước hiện tại: {hoSo.tenBuocHienTai}</div>
    //             //     {/* <div>Mã bước trước: {hoSo.buocXuLyTruoc}</div> */}
    //             // </AntdSpace>,
    //             onOk: async () => {
    //                 if(buttonActionContext.selectedHoSos.length){
    //                     const res = await hoSoApi.HoanThanhBoSungHoSo(buttonActionContext.selectedHoSos[0] as string)
    //                     if(res.data.succeeded){
    //                         setSearchHoSoParams((curr) => ({...curr}))
    //                         toast.success("Thao tác thành công")
    //                         handleCancel()
    //                     }
    //                 }
    //             },
    //             onCancel: () => {
    //                 handleCancel()
    //             }
    //         }) 
    //     }
    // }, [buttonActionContext.selectedHoSos.length]) 

    // const onOk = () => {
    //     console.log();
        
    // }
    // return <AntdModal title="TRẢ LẠI BƯỚC TRƯỚC" visible={true} handlerCancel={handleCancel} width={1280}
    // onOk={onOk} okText="Xác nhận" >
    // </AntdModal>
    return <AntdModal confirmLoading={btnLoading} visible={true} title="Xác nhận công dân đã bổ sung hồ sơ" okText="Đồng ý" onOk={onOk} onCancel={handleCancel}>
    </AntdModal>
}

export default HoanThanhBoSungModal