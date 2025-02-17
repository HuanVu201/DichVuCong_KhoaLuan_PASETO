import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { AntdModal } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSoResponse } from "../models"
import { toast } from "react-toastify"
import { duThaoXuLyHoSoApi } from "../services"


export const DuyetDuThaoModal = ({ loadingAction, setLoadingAction, searchParams, setSearchParams, extraSearchParams }: {
    loadingAction: boolean, setLoadingAction: (onchange: boolean) => void,
    extraSearchParams: ISearchDuThaoXuLyHoSo,
    searchParams: ISearchDuThaoXuLyHoSo,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchDuThaoXuLyHoSo>>

}) => {
    const buttonActionContext = useButtonActionContext()
    const [infoHoSo, setInfoHoSo] = useState<string>()
    const { duThaoXuLyHoSos, count } = useAppSelector(state => state.duthaoxulyhoso)

    useEffect(() => {
        if (buttonActionContext.duyetThongQuaDuThaoModalVisible || buttonActionContext.tuChoiDuThaoModalVisible) {
            const duThaoXuLyHoSo = duThaoXuLyHoSos?.filter((x: ISearchDuThaoXuLyHoSoResponse) => x.id == buttonActionContext.selectedHoSos[0] as any)
            if (duThaoXuLyHoSo) {
                setInfoHoSo(`${duThaoXuLyHoSo[0].maHoSo} (${duThaoXuLyHoSo[0].chuHoSo})`)
            }
        }

    }, [buttonActionContext.duyetThongQuaDuThaoModalVisible, buttonActionContext.tuChoiDuThaoModalVisible])

    const duyetThongQuaHandler = () => {
        if (buttonActionContext.selectedHoSos.length) {
            (async () => {
                setLoadingAction(true)
                const res = await duThaoXuLyHoSoApi.DuyetThongQua({
                    id: buttonActionContext.selectedHoSos[0].toString()
                })
                if (res.status == 200) {
                    toast.success("Duyệt thông qua thành công!")
                    setSearchParams({
                        ...searchParams,
                        ...extraSearchParams,
                        reFetch: true
                    })
                    handlerCancel()
                } else {
                    console.log(res.data.message)
                    toast.error(`Lỗi: ${res.data.message}`)
                }

                setLoadingAction(false)
            })()
        } else {
            toast.error("Không có thông tin dự thảo!")
            return
        }
    }

    const tuChoiDuThaoHandler = () => {
        if (buttonActionContext.selectedHoSos.length) {
            (async () => {
                setLoadingAction(true)
                const res = await duThaoXuLyHoSoApi.TuChoiDuThao({
                    id: buttonActionContext.selectedHoSos[0].toString()
                })
                if (res.status == 200) {
                    toast.success("Đã từ chối dự thảo!")
                    setSearchParams({
                        ...searchParams,
                        ...extraSearchParams,
                        reFetch: true
                    })
                    handlerCancel()
                } else {
                    console.log(res.data.message)
                    toast.error(`Lỗi: ${res.data.message}`)
                }

                setLoadingAction(false)
            })()
        } else {
            toast.error("Không có thông tin dự thảo!")
            return
        }
    }

    const handlerCancel = () => {
        buttonActionContext.setDuyetThongQuaDuThaoModalVisible(false)
        buttonActionContext.setTuChoiDuThaoModalVisible(false)
    }


    return (<>
        <AntdModal visible={buttonActionContext.duyetThongQuaDuThaoModalVisible} title={`Duyệt thông qua dự thảo: ${infoHoSo}`} width={700} handlerCancel={handlerCancel}
            footer={[
                <Button type="primary" onClick={duyetThongQuaHandler} disabled={infoHoSo ? false : true}>Xác nhận</Button>,
                <Button onClick={handlerCancel} >Hủy</Button>,
            ]} />
        <AntdModal visible={buttonActionContext.tuChoiDuThaoModalVisible} title={`Từ chối dự thảo: ${infoHoSo}`} width={700} handlerCancel={handlerCancel}
            footer={[
                <Button type="primary" onClick={tuChoiDuThaoHandler} disabled={infoHoSo ? false : true} >Xác nhận</Button>,
                <Button onClick={handlerCancel} >Hủy</Button>,
            ]} />
    </>)
}