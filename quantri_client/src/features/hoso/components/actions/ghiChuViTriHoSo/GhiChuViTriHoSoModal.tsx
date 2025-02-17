import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal } from "@/lib/antd/components"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { Button, Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CURRENTTIME } from "@/data";
import { LoadingOutlined } from "@ant-design/icons";
import { hoSoApi } from "@/features/hoso/services";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { SearchHoSo } from "@/features/hoso/redux/action";


const GhiChuViTriHoSoModal = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<IHoSo>()
    const [form] = Form.useForm<IHoSo>()
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.GetViTriDeHoSo({ id: buttonActionContext.selectedHoSos[0] as string })
                const hoSo = res.data.data
                if (hoSo) {
                    form.setFieldValue('viTriDeHoSo', hoSo.viTriDeHoSo)
                    setData(hoSo)
                }
                setLoading(false)
            }
        })()
    }, [])




    const onOk = () => {
        (async () => {
            setLoading(true)
            const res = await hoSoApi.UpdateViTriDeHoSo({
                id: buttonActionContext.selectedHoSos[0] as string,
                viTriDeHoSo: form.getFieldValue('viTriDeHoSo')
            })
            if(res.status == 200){
                toast.success("Cập nhật thành công!")
                handlerCancel()
                setSearchHoSoParams((curr) => ({...curr}))
            }
            setLoading(false)
        })()
    }


    const handlerCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setGhiChuViTriHoSoModalVisible(false)
    }

    return <AntdModal visible={true} title={`Ghi chú vị trí lưu hồ sơ: ${data?.maHoSo || ''}`} width={700} handlerCancel={handlerCancel}
        footer={[
            <Button type="primary" onClick={onOk} loading={loading}>
                Lưu vị trí
            </Button>,
            <Button key="back" onClick={handlerCancel}>
                Hủy
            </Button>
        ]}
    >
        <Spin
            spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <Form name='GhiChuViTriHoSo' layout="vertical" form={form} style={{ marginBottom: '30px' }} >
                <Form.Item label="" name="viTriDeHoSo"  >
                    <Input.TextArea showCount maxLength={500} rows={5} />
                </Form.Item>
            </Form>
        </Spin>
    </AntdModal>
}



export default GhiChuViTriHoSoModal