import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, TraLaiHoSo } from "@/features/hoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { TraLaiBuocTruocParams } from "@/features/hoso/services"
import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import {   Col, Form, Input, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"

const TraLaiBuocTruocModal = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<TraLaiBuocTruocParams["data"]>()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKemChuyenXuLy", form)
    const [btnLoading, setBtnLoading] = useState(false)
    const handleCancel = () => {
        // buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setTraLaiBuocTruocModalVisible(false)
    }

    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        }
    }, [buttonActionContext.selectedHoSos.length])

    const onOk = async () => {
        try {
            setBtnLoading(true)
            const formData = await form.validateFields() as TraLaiBuocTruocParams["data"]
            if(buttonActionContext.selectedHoSos.length){
                const res = await dispatch(TraLaiHoSo({id: buttonActionContext.selectedHoSos[0] as string, data: formData})).unwrap()
                if(res.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    handleCancel()
                }
            }
            setBtnLoading(false)
        } catch (error) {
            console.log(error);
            setBtnLoading(false)
        }
    }

    return <>
    <AntdModal confirmLoading={btnLoading} title={`TRẢ LẠI HỒ SƠ: ${hoSo?.maHoSo}`} visible={true} handlerCancel={handleCancel} width={1000} onOk={onOk}
>
    <Form form={form} layout="vertical" name="YeuCauMotCuaBoSung" >
        <Row gutter={[16,8]}>
            <Col span={8}>
                <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
                <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
            </Col>
            <Col span={16}>
                <Form.Item<TraLaiBuocTruocParams["data"]> name="noiDungTraLai" label="Nội dung trả lại" >
                    <Input.TextArea rows={4} maxLength={500} showCount/>
                </Form.Item>
                <Form.Item<TraLaiBuocTruocParams["data"]> name="dinhKemChuyenXuLy" label="Đính kèm trả lại">
                    {hoSo?.maHoSo ? <RegularUpload 
                        dinhKem={dinhKem}
                        fieldName={"dinhKemChuyenXuLy"} 
                        folderName={hoSo.maHoSo} 
                        form={form}/>: null}
                    
                </Form.Item>
            </Col>
        </Row>
    </Form>
    </AntdModal>
    </>
}
const TraLaiBuocTruocModalWrapper = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    return <TraLaiBuocTruocModal setSearchHoSoParams={setSearchHoSoParams}/>
}

export default TraLaiBuocTruocModalWrapper