import { SoHoaThanhPhan } from "@/features/hoso/components/actions/tiepNhanHoSoTrucTuyen/SoHoaThanhPhan"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { GetHoSo } from "@/features/hoso/redux/action"
import { CapNhatChamSoHoa, hoSoApi } from "@/features/hoso/services"
import { AntdButton, AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Form, Input } from "antd"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useTramSoHoaThanhPhanHoSo } from "./hooks/useSoHoa"
import { ISearchThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { IThanhPhanHoSoWithSoHoa } from '@/features/hoso/components/actions/suaHoSo/TepDinhKemHoSo'
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"
import {v4 as uuid} from 'uuid'
import { PlusCircleOutlined } from "@ant-design/icons"
import { TRANGTHAISOHOA } from "@/features/hoso/data/formData"
import { ISearchHoSo } from "@/features/hoso/models"
import { resetData } from "@/features/hoso/redux/slice"

const SoHoaThanhPhanWrapper = ({onCloseModal, setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>; onCloseModal: () => void;}) => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const buttonActionContext = useButtonActionContext()
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const columns = useTramSoHoaThanhPhanHoSo({dataSource, setDataSource, form})
    const [newCount, setNewCount] = useState<number>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    const { data: hoSo } = useAppSelector((state) => state.hoso)
  
    useEffect(() => {
        (async () => {
            if (hoSo) {
                setLoading(true)
                const res = await thanhPhanHoSoApi.Search({...searchParams, pageSize:200, hoSo : hoSo.maHoSo})
                setLoading(false)
                // dispatch(SearchThanhPhanHoSo(params))
                setDataSource(res.data.data.map(x => ({...x, trangThaiSoHoa: x.trangThaiSoHoa} as any)))
                setNewCount(res.data.totalCount)
            }
        })()
    }, [hoSo])

    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length !== undefined){
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "tiepNhanTrucTuyen", returnNodeQuyTrinh: true }))
        }
    }, [buttonActionContext.selectedHoSos])

    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        buttonActionContext.setSelectedHoSos([])
        onCloseModal()
    }

    const onOk = async () => {
        const formData = await form.validateFields() as CapNhatChamSoHoa
        try {
            setLoading(true)
            if(!buttonActionContext.selectedHoSos.length){
                toast.warn("Có lỗi xảy ra khi lấy mã hồ sơ")
                return;
            }
            const res = await hoSoApi.CapNhatChamSoHoa({...formData, id: buttonActionContext.selectedHoSos[0] as string, saveAndForward: true})  
            if(res.data.succeeded){
                toast.success("Lưu thành công")
                setSearchHoSoParams((curr) =>({...curr}))
                handlerCancel()
            }
        } catch (error) {
            console.log(error);
            toast.error("Thao tác thất bại, vui lòng thử lại sau")
        } finally{
            setLoading(false)
        }
    }

    const onSave = async () => {
        const formData = await form.validateFields() as CapNhatChamSoHoa
        try {
            setLoading(true)
            if(!buttonActionContext.selectedHoSos.length){
                toast.warn("Có lỗi xảy ra khi lấy mã hồ sơ")
                return;
            }
            console.log(formData);
            
            // const res = await hoSoApi.CapNhatChamSoHoa({...formData, id: buttonActionContext.selectedHoSos[0] as string, saveAndForward: false})  
            // if(res.data.succeeded){
            //     toast.success("Lưu thành công")
            //setSearchHoSoParams((curr) =>({...curr}))
            // }
        } catch (error) {
            console.log(error);
            toast.error("Thao tác thất bại, vui lòng thử lại sau")
        } finally{
            setLoading(false)
        }
    }
    // const onAddRow = () => {
    //     const newRow : any = {
    //         id: uuid(),
    //         ten: "",
    //         dinhKem: "",
    //         soBanGiay: 1, 
    //         soTrang: 1,
    //         kyDienTuBanGiay: false,
    //         hoSo: hoSo?.maHoSo,
    //         trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"]
    //     }
    //     const newDataSource = [...dataSource, newRow]
    //     setNewCount(newDataSource.length)
    //     setDataSource(newDataSource)
    // }
    
    return <AntdModal title={"Số hóa hồ sơ: " + hoSo?.maHoSo} confirmLoading={loading} visible={true} handlerCancel={handlerCancel} fullsize 
        footer={<AntdSpace direction="horizontal">
            <AntdButton key={1} onClick={handlerCancel}>Đóng</AntdButton>
            <AntdButton key={2} onClick={onSave}>Lưu</AntdButton>
            <AntdButton key={3} onClick={onOk}>Lưu & Hoàn tất</AntdButton>
        </AntdSpace>}
    >
        <Form form={form} layout="vertical" name="tiepNhanHoSoTrucTuyen" >
            <Form.Item name="soDinhDanh" hidden><Input/></Form.Item>
            <Form.Item name={"thanhPhanHoSos"} hidden><Input/></Form.Item>
            <AntdTable
            columns={columns}
            // footer={() => <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm giấy tờ</AntdButton>}
            loading={loading}
            dataSource={dataSource}
            pagination={{total: newCount}}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => {}}/>
        </Form>
    </AntdModal>
}

export default SoHoaThanhPhanWrapper