import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { AntdButton, AntdModal } from "@/lib/antd/components";
import { Col, Form, Input, Row } from "antd";
import { ToKhaiDienTu } from "../../ToKhaiDienTu";
import React, { useEffect, useState } from "react";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { hoSoApi } from "@/features/hoso/services";
import { toast } from "react-toastify";

type HoSoResponse = {
    maHoSo: string;
    eFormData: string;
    eForm: string;
}
type ParseHoSoResponse = {
    maHoSo: string;
    eFormData: any;
    eForm: any;
}

const LienThongHeThongLLTP = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<{idHoSo: string; eformBase64Data: string; eFormDataValid?: boolean}>()
    const [hoSo, setHoSo] = useState<ParseHoSoResponse>()
    useEffect(() => {
        (async () => {
            if(buttonActionContext.selectedHoSos.length){
                const res = await hoSoApi.GetHoSo({id: buttonActionContext.selectedHoSos[0] as string, view: "lienThongHeThongLLTP"})
                const data = res.data.data as HoSoResponse
                if(data){
                    const formData = {maHoSo: data.maHoSo, eFormData: data.eFormData ? {data: JSON.parse(data.eFormData)} : undefined, eForm: data.eForm}
                    setHoSo(formData)
                    form.setFieldsValue({idHoSo: data.maHoSo})
                }
                window.objDataCSDLDanCu = undefined
            }
        })()
    }, [buttonActionContext.selectedHoSos])
    const onOk = async () => {
        const formData = await form.validateFields()
        if(!formData.eFormDataValid) {
            toast.warn("Vui lòng điền các trường thông tin còn thiếu trong tờ khai")
            return;
        }
        delete formData.eFormDataValid
        try {
            const res = await hoSoApi.LienThongHeThongLLTP({idHoSo: formData.idHoSo, eformBase64Data: JSON.stringify({data: formData.eformBase64Data})})
            if(res.data.succeeded){
                setSearchHoSoParams((curr) => ({...curr}))
                toast.success("Gửi hồ sơ thành công");
                handlerCancel()
            }
        } catch (error) {
            toast.error("Thao tác thất bại");
            console.error(error)
        }
        
    }
    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setLienThongHeThongLLTPHoSoModalVisible(false)
    }
    const onChangeToKhai = (formData: any) => {
        form.setFieldValue("eformBase64Data", formData.data)
        form.setFieldValue("eFormDataValid", formData.isValid)
    }
    return <AntdModal visible={true} title={"THÔNG TIN TỜ KHAI"} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable cancelText="Đóng" okText="Gửi hồ sơ">
        <Form form={form} name="LienThongHeThongLLTP" layout="vertical">
            <Form.Item name="idHoSo" hidden><Input/></Form.Item>
            <Form.Item name="eformBase64Data" hidden><Input/></Form.Item>
            <Form.Item name="eFormDataValid" hidden><Input/></Form.Item>
            {hoSo ? <ToKhaiDienTu defaultOpen form={hoSo.eForm} submission={hoSo.eFormData} antdForm={form} onChange={onChangeToKhai}/> : null}
        </Form>
    </AntdModal>
}

export default LienThongHeThongLLTP;