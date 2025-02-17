import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { GetHoSo, TuChoiTiepNhanHoSoTrucTuyen } from "@/features/hoso/redux/action";
import { TuChoiTiepNhanHoSoTrucTuyenParams } from "@/features/hoso/services";
import { AntdModal, AntdUpLoad } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, Input, Row, Typography } from "antd";
import { useEffect } from "react";

const TuChoiTiepNhanHoSoTrucTuyenModal = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<TuChoiTiepNhanHoSoTrucTuyenParams["data"]>()
    const {data: hoSo, loading} = useAppSelector(state => state.hoso)
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKemTuChoi", form)
    const handleCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setTuChoiTiepNhanHoSoTrucTuyenModalVisible(false)
    }

    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        }
    }, [buttonActionContext.selectedHoSos.length])

    const onOk = async () => {
        const formData = await form.validateFields() as TuChoiTiepNhanHoSoTrucTuyenParams["data"]
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(TuChoiTiepNhanHoSoTrucTuyen({id: buttonActionContext.selectedHoSos[0] as string, data: formData})).unwrap()
            if(res.succeeded){
                form.setFieldValue("dinhKemTuChoi", undefined) // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined 
                setSearchHoSoParams((curr) => ({...curr}))
                handleCancel()
            }
        }
    }
    return <AntdModal confirmLoading={loading} title={`TỪ CHỐI TIẾP NHẬN HỒ SƠ: ${hoSo?.maHoSo}`} visible={true} handlerCancel={handleCancel} width={1000}
    onOk={onOk} okText="Xác nhận">
    <Form form={form} layout="vertical" name="YeuCauMotCuaBoSung" >
        <Form.Item name="thanhPhanBoSung" hidden><Input></Input></Form.Item>
        <Row gutter={[16,8]}>
            <Col span={8}>
                <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
                <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
            </Col>
            <Col span={16}>
                <Form.Item<IHoSo> name="lyDoTuChoi" label="Lý do từ chối" >
                    <Input.TextArea rows={4} maxLength={500} showCount/>
                </Form.Item>
                <Form.Item<IHoSo> name="dinhKemTuChoi" label="Nội dung từ chối">
                    {hoSo?.maHoSo ? <RegularUpload 
                        dinhKem={dinhKem}
                        fieldName={"dinhKemTuChoi"} 
                        folderName={hoSo.maHoSo} 
                        form={form}/>: null}
                    
                </Form.Item>
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default TuChoiTiepNhanHoSoTrucTuyenModal