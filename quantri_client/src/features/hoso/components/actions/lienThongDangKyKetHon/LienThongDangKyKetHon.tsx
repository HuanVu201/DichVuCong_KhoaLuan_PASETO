import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { AntdModal } from "@/lib/antd/components";
import { Form, Input } from "antd";
import { ToKhaiDienTu } from "../../ToKhaiDienTu";
import React, { useEffect, useState } from "react";
import { ISearchHoSo } from "@/features/hoso/models";
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

const LienThongDangKyKetHon = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [btnLoading, setBtnLoading] = useState(false)
    const [form] = Form.useForm<{idHoSo: string; eformBase64Data: string; eFormDataValid?: boolean}>()
    const [hoSo, setHoSo] = useState<ParseHoSoResponse>()
    useEffect(() => {
        (async () => {
            if(buttonActionContext.selectedHoSos.length){
                const res = await hoSoApi.GetHoSo({id: buttonActionContext.selectedHoSos[0] as string, view: "lienThongBTPDangKyKetHon"})
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
            setBtnLoading(true)
            const res = await hoSoApi.LienThongDangKyKetHon({maHoSo: formData.idHoSo, eformBase64Data: JSON.stringify({data: formData.eformBase64Data})})
            if(res.data.succeeded){
                toast.success("Gửi hồ sơ thành công");
                buttonActionContext.setSelectedHoSos([])
                setSearchHoSoParams((curr) => ({...curr}))
                handlerCancel()
            } else {
                toast.warn(res.data.message);
            }
        } catch (error) {
            toast.error("Thao tác thất bại");
            console.error(error)
            setBtnLoading(false)
        } finally {
            setBtnLoading(false)
        }
        
    }
    const handlerCancel = () => {
        buttonActionContext.setLienThongDangKyKetHonHoSoModalVisible(false)
    }
    const onChangeToKhai = (formData: any) => {
        form.setFieldValue("eformBase64Data", formData.data)
        form.setFieldValue("eFormDataValid", formData.isValid)
    }
    return <AntdModal confirmLoading={btnLoading} visible={true} title={"THÔNG TIN TỜ KHAI" + ` ${hoSo?.maHoSo ?? ""}`} handlerCancel={handlerCancel} onOk={onOk} fullsizeScrollable cancelText="Đóng" okText="Gửi hồ sơ">
        <Form form={form} name="LienThongHeThongLLTP" layout="vertical">
            <Form.Item name="idHoSo" hidden><Input/></Form.Item>
            <Form.Item name="eformBase64Data" hidden><Input/></Form.Item>
            <Form.Item name="eFormDataValid" hidden><Input/></Form.Item>
            {hoSo ? <ToKhaiDienTu defaultOpen form={hoSo.eForm} submission={hoSo.eFormData} antdForm={form} onChange={onChangeToKhai}/> : null}
        </Form>
    </AntdModal>
}

export default LienThongDangKyKetHon;