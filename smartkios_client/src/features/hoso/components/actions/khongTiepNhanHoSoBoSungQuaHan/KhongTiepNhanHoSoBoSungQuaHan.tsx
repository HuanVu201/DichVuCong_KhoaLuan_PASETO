import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { GetHoSo, KhongTiepNhanHoSoBoSungQuaHan, TuChoiTiepNhanHoSoTrucTuyen } from "@/features/hoso/redux/action";
import { KhongTiepNhanHoSoBoSungQuaHanParams } from "@/features/hoso/services";
import { AntdModal, AntdUpLoad } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, Input, Row, Typography } from "antd";
import { useEffect } from "react";

const KhongTiepNhanHoSoBoSungQuaHanModal = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<KhongTiepNhanHoSoBoSungQuaHanParams["data"]>()
    const {data: hoSo, loading} = useAppSelector(state => state.hoso)
    const buttonActionContext = useButtonActionContext()
    const dinhKem = Form.useWatch("dinhKemTuChoi", form)
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setKhongTiepNhanHoSoBoSungQuaHanModalVisible(false)
    }

    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        }
    }, [buttonActionContext.selectedHoSos.length])

    const onOk = async () => {
        const formData = await form.validateFields() as KhongTiepNhanHoSoBoSungQuaHanParams["data"]
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(KhongTiepNhanHoSoBoSungQuaHan({id: buttonActionContext.selectedHoSos[0] as string, data: formData})).unwrap()
            if(res.succeeded){
                setSearchHoSoParams((curr) => ({...curr}))
                handleCancel()
            }
        }
    }
    return <AntdModal confirmLoading={loading} title={`HỒ SƠ QUÁ HẠN BỔ SUNG: ${hoSo?.maHoSo}`} visible={true} handlerCancel={handleCancel} width={1000}
    onOk={onOk} okText="Xác nhận">
    <Form form={form} layout="vertical" name="KhongTiepNhanHoSoBoSungQuaHan" >
        <Row gutter={[16,8]}>
            <Col span={8}>
                <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
                <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
            </Col>
            <Col span={16}>
                <Form.Item<IHoSo> name="lyDoTuChoi" label="Lý do từ chối"  rules={[{required: true, message: "Vui lòng nhập lý do"}]}>
                    <Input.TextArea rows={4} maxLength={500} showCount/>
                </Form.Item>
                <Form.Item<IHoSo> name="dinhKemTuChoi" label="Nội dung từ chối" rules={[{required: true, message: "Vui lòng nhập nội dung"}]}>
                    {hoSo?.maHoSo ? <RegularUpload 
                        dinhKem={dinhKem}
                        fieldName={"dinhKemTuChoi"} 
                        folderName={hoSo.maHoSo} 
                        form={form}/> : null}
                    
                </Form.Item>
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default KhongTiepNhanHoSoBoSungQuaHanModal