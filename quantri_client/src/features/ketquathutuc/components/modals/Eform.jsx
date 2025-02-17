
import React, { useState, useEffect } from 'react'
import { AntdButton, AntdModal, AntdSelect, AntdSpace } from '@/lib/antd/components'
import { usePrompt } from '@/hooks/usePrompt'
import { useLocation } from 'react-router-dom'
import { useKetQuaThuTucContext } from '../../contexts/KetQuaThuTucProvider'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import "formiojs/dist/formio.full.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { ketQuaThuTucService } from '../../services'
import { toast } from 'react-toastify'

const FORMTYPE_OPTIONS = [
  {label: "Form", value: 'form' },
  {label: "Wizard", value: 'wizard' },
  {label: "PDF", value: 'pdf' },
]

  const EForm = ({form, eFormData}) => {
  const [formType, setFormType] = useState('form')
  const [formData, setFormData] = useState({ display: formType })
  const location = useLocation()
  const ketQuaThuTucContext = useKetQuaThuTucContext()
  usePrompt(formData?.components?.length, location.pathname)
  const onChangeFormType = (value) => {
    setFormType(value)
  }
  const onSaveForm = async () => {
    const res = await ketQuaThuTucService.Update({id: ketQuaThuTucContext.maKetQuaThuTuc, data : {eFormKetQua: JSON.stringify(formData)}})
    if(res.data.succeeded){
      toast.success("Cập nhật eForm thành công")
      form.setFieldValue("eFormKetQua", JSON.stringify(formData))
      ketQuaThuTucContext.setEFormVisible(false)
    } else {
      toast.success("Cập nhật eForm thất bại")
    }
  }
  useEffect(() => {
    if(eFormData){
      setFormData(JSON.parse(eFormData))
    }
  }, [eFormData])
  return (
      <AntdSpace direction="vertical" style={{width:"100%"}}>
        {/* gửi dữ liệu formdata.components lên server */}
        <AntdSpace className='d-flex justify-content-center align-items-center'>
          <span className='fs-6'>Chọn loại form muốn xây dựng:</span> 
          <AntdSelect options={FORMTYPE_OPTIONS} defaultValue={"form"} style={{width:100}} onChange={onChangeFormType}/>
          <AntdButton type="primary" onClick={onSaveForm}>Lưu Form</AntdButton>
          <AntdButton onClick={() => {
              ketQuaThuTucContext.setEFormVisible(false)
              ketQuaThuTucContext.setKetQuaThuTucModalVisible(false)
          } }>Đóng</AntdButton>
        </AntdSpace>
        <EFormBuilder form={formData} onChange={(schema) => {
          setFormData(schema)
        }} />
      </AntdSpace>
  )
}

const EformModal = (props) => {
  const ketQuaThuTucContext = useKetQuaThuTucContext()
  const handlerCancel = () => {
    ketQuaThuTucContext.setEFormVisible(false)
  
  }
  return <AntdModal footer={null} fullsizeScrollable title="Cập nhật tờ khai điện tử" visible={true} handlerCancel={handlerCancel}>
    <EForm {...props}/>
  </AntdModal>
}

export default EformModal