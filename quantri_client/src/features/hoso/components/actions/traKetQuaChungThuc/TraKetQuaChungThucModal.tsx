import { AntdButton, AntdDivider, AntdModal, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo, TraKetQuaChungThuc, TraKetQuaHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import { resetData } from "@/features/hoso/redux/slice"
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import { RegularUpload, RegularUploadRef, TrichXuatOCRMode } from "@/lib/antd/components/upload/RegularUpload"
import { ReadOnlyThanhPhanChungThuc } from "../../ReadOnlyThanhPhanChungThuc"

const TraKetQuaChungThucModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
   const [form] = Form.useForm()
    const buttonActionContext = useButtonActionContext()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const [btnLoading, setBtnLoading] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if(hoSo != undefined){
            form.setFieldsValue(hoSo)
        }
    }, [hoSo])

    const handleCancel = async () => {
        form.resetFields();
        dispatch(resetData())
        dispatch(resetDatas())
        buttonActionContext.setTraKetQuaChungThucModalVisible(false)
        // buttonActionContext.setSelectedHoSos([])

    }
    const onOk = async () => {
        const formData = await form.validateFields()
        if(buttonActionContext.selectedHoSos.length){
            try {
                setBtnLoading(true)
                const res = await dispatch(TraKetQuaChungThuc({...formData, id: buttonActionContext.selectedHoSos[0] as string})).unwrap()
                if(res.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    handleCancel()
                }
                setBtnLoading(false)
            } catch(error){
                console.log(error);
                setBtnLoading(false)
            }
        }
    }
   return <AntdModal title={"TRẢ KẾT QUẢ HỒ SƠ" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} visible={true} handlerCancel={handleCancel} width={1280}
   footer={<AntdSpace>
       <AntdButton onClick={handleCancel} key={"1"}>Đóng</AntdButton>
       <AntdButton loading={btnLoading} onClick={onOk} key={"3"} type="primary">Trả kết quả</AntdButton>
   </AntdSpace>}>
   <Form form={form} layout="vertical" name="TraKetQuaHoSoModal">
       <Row gutter={8}>
           <Col span={24}>
               <Row gutter={[4, 8]}>
                <ReadOnlyThanhPhanChungThuc form={form}/>
               </Row>
               <AntdDivider />
           </Col>
       </Row>
   </Form>
</AntdModal>
}
export default TraKetQuaChungThucModal