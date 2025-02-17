import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, YeuCauMotCuaBoSungHoSo } from "@/features/hoso/redux/action"
import { AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, InputNumber, Row, Typography } from "antd"
import React, { useEffect } from "react"
import { YeuCauDinhKemBoSungHoSo } from "../../YeuCauDinhKemBoSungHoSo"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { RenderTitle } from "@/components/common"
import { resetData } from "@/features/hoso/redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { toast } from "react-toastify"

export interface IDinhKemBoSungHoSo  {
    lyDoBoSung: string;
    noiDungBoSung?: string;
    dinhKemBoSung?: string;
    thanhPhanBoSung: ThanhPhanBoSungHoSo[];
    thoiHanBoSung?: number;
}
export interface ThanhPhanBoSungHoSo {
    thanhPhanHoSoId: string;
    tenThanhPhan: string;
    fileDinhKem: string;
    noiDungBoSung?: string;
}

const YeuCauMotCuaBoSungModal = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm()
    const {loading, data: hoSo} = useAppSelector(state => state.hoso)
    const {datas: thanhPhanHoSos} = useAppSelector(state => state.thanhphanhoso)
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKemBoSung", form)
    const buttonActionContext = useButtonActionContext()
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        }
    }, [buttonActionContext.selectedHoSos.length])
    useEffect(() => {
        if(hoSo != undefined){
            dispatch(SearchThanhPhanHoSo({hoSo: hoSo.maHoSo, reFetch: true}))
        }
    }, [hoSo])
    const handleCancel = () => {
        dispatch(resetData())
        buttonActionContext.setYeuCauMotCuaBoSungModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields() as IDinhKemBoSungHoSo
        const res = await dispatch(YeuCauMotCuaBoSungHoSo({id: buttonActionContext.selectedHoSos[0] as string, data: formData})).unwrap()
        if(res.succeeded){
            setSearchHoSoParams((curr) => ({...curr}))
            toast.success("Yêu cầu bổ sung thành công")
            handleCancel()
        }
    }
    return <AntdModal confirmLoading={loading} title="YÊU CẦU CÁN BỘ MỘT CỬA BỔ SUNG HỒ SƠ" visible={true} handlerCancel={handleCancel} fullsizeScrollable
    onOk={onOk} okText="Xác nhận">
    <Form form={form} layout="vertical" name="YeuCauMotCuaBoSung" >
        <Form.Item name="thanhPhanBoSung" hidden><Input></Input></Form.Item>
        <Row gutter={[16,8]}>
            <Col span={8}>
                <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
                <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
            </Col>
            <Col span={16}>
                <Form.Item name="lyDoBoSung" label="Lý do bổ sung" >
                    <Input.TextArea rows={4} maxLength={500} showCount/>
                </Form.Item>
                <Form.Item name="noiDungBoSung" label="Nội dung bổ sung" rules={[{required: true, message: "Vui lòng nhập nội dung"}]}>
                    <Input.TextArea rows={4} maxLength={500} showCount/>
                </Form.Item>
                <Row>
                    <Col span={6}>
                        <Form.Item name="dinhKemBoSung" label="Nội dung bổ sung" rules={[{required: true, message: "Vui lòng nhập nội dung"}]}>
                            {/* <AntdUpLoad maxCount={10} formInstance={form} fieldName="dinhKemBoSung" folderName="YeuCauBoSung" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
                            {hoSo?.maHoSo ? <RegularUpload 
                                // kySo={KY_SO}
                                dinhKem={dinhKem}
                                fieldName={"dinhKemBoSung"} 
                                folderName={hoSo.maHoSo} 
                                form={form}/>: null} 
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="thoiHanBoSung" label="Thời hạn bổ sung (theo ngày)" >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <RenderTitle title={"Tệp đính kèm"}/>
                <YeuCauDinhKemBoSungHoSo form={form} thanhPhanHoSos={thanhPhanHoSos}/>
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default YeuCauMotCuaBoSungModal