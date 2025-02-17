import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo } from "@/features/hoso/redux/action"
import { hoSoApi } from "@/features/hoso/services"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Modal } from "antd"
import { useEffect } from "react"
import { toast } from "react-toastify"

const ChuyenBuocNhanhModal = ({setSearchHoSoParams}: {setSearchHoSoParams : React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const handleCancel = () => {
        buttonActionContext.setChuyenBuocNhanhHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }

    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            Modal.confirm({
                content: "Xác nhận chuyển bước nhanh",
                okText: "Đồng ý",
                // content: <AntdSpace direction="vertical">
                //     <div> Mã bước hiện tại: {hoSo.buocHienTai}</div>
                //     <div>Tên bước hiện tại: {hoSo.tenBuocHienTai}</div>
                //     {/* <div>Mã bước trước: {hoSo.buocXuLyTruoc}</div> */}
                // </AntdSpace>,
                onOk: async () => {
                    if(buttonActionContext.selectedHoSos.length){
                        const res = await hoSoApi.ChuyenBuocNhanhHoSo({ids: buttonActionContext.selectedHoSos as string[]})
                        if(res.data.succeeded){
                            setSearchHoSoParams((curr) => ({...curr}))
                            toast.success("Chuyển bước thành công")
                            handleCancel()
                        }
                    }
                },
                onCancel: () => {
                    handleCancel()
                }
            }) 
        }
    }, [buttonActionContext.selectedHoSos.length]) 

    // const onOk = () => {
    //     console.log();
        
    // }
    // return <AntdModal title="TRẢ LẠI BƯỚC TRƯỚC" visible={true} handlerCancel={handleCancel} width={1280}
    // onOk={onOk} okText="Xác nhận" >
    // </AntdModal>
    return <></>
}

export default ChuyenBuocNhanhModal