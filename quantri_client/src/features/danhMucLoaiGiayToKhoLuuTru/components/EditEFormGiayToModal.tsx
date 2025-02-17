
import { useState, useEffect } from 'react'
import { FormBuilder } from '@formio/react'
import { AntdButton, AntdModal, AntdSelect, AntdSpace } from '@/lib/antd/components'
import "formiojs/dist/formio.full.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { useLoaiGiayToKhoLuuTruContext } from '../context'
import { loaiGiayToKhoLuuTruApi } from '../services'
import { toast } from 'react-toastify'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FORMTYPE_OPTIONS = [
    { label: "Form", value: 'form' },
    { label: "Wizard", value: 'wizard' },
    { label: "PDF", value: 'pdf' },
]

const EFormGiayTo = () => {
    const loaiGiayToKhoLuuTruContext = useLoaiGiayToKhoLuuTruContext()
    const [formType, setFormType] = useState('form')
    const [formData, setFormData] = useState({ display: formType, components: [] });
    const [loading, setLoading] = useState<boolean>(false)

    const onSaveForm = async () => {
        (async () => {
            setLoading(true)
            const resUpdate = await loaiGiayToKhoLuuTruApi.Update({
                id: loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId,
                data: {
                    eform: JSON.stringify(formData)
                }
            })
            if (resUpdate.data.succeeded) {
                loaiGiayToKhoLuuTruContext.setEditEFormModalVisible(false)
                loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruId(undefined)
                toast.success("Cập nhật thành công!")
            } else {
                toast.error("Cập nhật thất bại!")
            }
            setLoading(false)
        })()
    }

    const onChangeFormType = (value: string) => {
        setFormType(value)
    }

    useEffect(() => {
        (async () => {
            if (loaiGiayToKhoLuuTruContext.editEFormModalVisible
                && loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId
            ) {
                setLoading(true)
                const resGetEForm = await loaiGiayToKhoLuuTruApi.Get(loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId)
                if (resGetEForm.status == 200) {
                    const eform = JSON.parse(resGetEForm.data.data.eform as any);
                    setFormData(eform ? eform : { display: formType, components: [] });
                } else {
                    toast.error("Lỗi lấy thông tin EForm!")
                }
                setLoading(false)
            }
        })()
    }, [loaiGiayToKhoLuuTruContext.loaiGiayToKhoLuuTruId, loaiGiayToKhoLuuTruContext.editEFormModalVisible])

    return (
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <AntdSpace className='d-flex justify-content-center align-items-center'>
                    <span className='fs-6'>Chọn loại form muốn xây dựng:</span>
                    <AntdSelect options={FORMTYPE_OPTIONS} defaultValue={"form"} style={{ width: 100 }} onChange={onChangeFormType} />
                    <AntdButton type="primary" onClick={onSaveForm}>Lưu Form</AntdButton>
                    <AntdButton onClick={() => {
                        loaiGiayToKhoLuuTruContext.setEditEFormModalVisible(false)
                        loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruId(undefined)
                    }}>Đóng</AntdButton>
                </AntdSpace>
                {formData && formData.components ? (
                    <FormBuilder
                        form={formData}
                        onChange={(schema: any) => {
                            setFormData(schema);
                        }}
                    />
                ) : null}
            </Spin>
        </AntdSpace>
    )
}

const EditEFormGiayToModal = () => {
    const loaiGiayToKhoLuuTruContext = useLoaiGiayToKhoLuuTruContext()
    const handlerCancel = () => {
        loaiGiayToKhoLuuTruContext.setEditEFormModalVisible(false)
        loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruId(undefined)
    }
    return <AntdModal footer={null} fullsizeScrollable title="Cập nhật EForm giấy tờ" visible={loaiGiayToKhoLuuTruContext.editEFormModalVisible} handlerCancel={handlerCancel}>
        <EFormGiayTo />
    </AntdModal>
}

export default EditEFormGiayToModal