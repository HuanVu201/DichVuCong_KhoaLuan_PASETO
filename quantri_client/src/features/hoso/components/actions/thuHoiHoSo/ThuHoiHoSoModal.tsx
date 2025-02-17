import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, ThuHoiHoSo } from "@/features/hoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { AntdModal, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Modal } from "antd"
import { useEffect, useState } from "react"

const ThuHoiHoSoModal = ({setSearchHoSoParams}: {setSearchHoSoParams : React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    const handleCancel = () => {
        buttonActionContext.setThuHoiHoSoModalVisible(false)
        // buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
    }

    // useEffect(() => {
    //     if(buttonActionContext.selectedHoSos.length){
    //         dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
    //     }
    // }, [buttonActionContext.selectedHoSos])

    const onOk = async () => {
        if(buttonActionContext.selectedHoSos.length){
            try {
                setBtnLoading(true)
                const res = await dispatch(ThuHoiHoSo(buttonActionContext.selectedHoSos[0] as string)).unwrap()
                if(res.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    handleCancel()
                }
                setBtnLoading(false)
            } catch (error) {
                console.log(error);
                setBtnLoading(false)
            }
        }
    }

    // useEffect(() => {
    //     Modal.confirm({
    //         title: "Thu hồi hồ sơ",
    //         okText:"Xác nhận",
    //         // content: <AntdSpace direction="vertical">
    //         //     <div> Mã bước hiện tại: {hoSo.buocHienTai}</div>
    //         //     <div>Tên bước hiện tại: {hoSo.tenBuocHienTai}</div>
    //         //     {/* <div>Mã bước trước: {hoSo.buocXuLyTruoc}</div> */}
    //         // </AntdSpace>,
    //         onOk: async () => {
    //             if(buttonActionContext.selectedHoSos.length){
    //                 const res = await dispatch(ThuHoiHoSo(buttonActionContext.selectedHoSos[0] as string)).unwrap()
    //                 if(res.succeeded){
    //                     setSearchHoSoParams((curr) => ({...curr}))
    //                     handleCancel()
    //                 }
    //             }
    //         },
    //         onCancel: () => {
    //             handleCancel()
    //         }
    //     })
    // }, [ buttonActionContext.selectedHoSos.length]) 

    // const onOk = () => {
    //     console.log();
        
    // }
    // return <AntdModal title="TRẢ LẠI BƯỚC TRƯỚC" visible={true} handlerCancel={handleCancel} width={1280}
    // onOk={onOk} okText="Xác nhận" >
    // </AntdModal>
    return <AntdModal confirmLoading={btnLoading} visible={true} title="Thu hồi hồ sơ" okText="Xác nhận" onOk={onOk} onCancel={handleCancel}></AntdModal>
}

export default ThuHoiHoSoModal