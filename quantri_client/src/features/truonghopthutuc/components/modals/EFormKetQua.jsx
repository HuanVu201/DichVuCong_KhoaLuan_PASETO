
import React, { useState, useEffect } from 'react'
import { FormBuilder } from '@formio/react'
import { AntdButton, AntdModal, AntdSelect, AntdSpace } from '@/lib/antd/components'
import { usePrompt } from '@/hooks/usePrompt'
import { useLocation } from 'react-router-dom'
import { useTruongHopThuTucContext } from '../../contexts/TruongHopThuTucContext'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { GetTruongHopThuTuc, UpdateTruongHopThuTuc } from '../../redux/action'
import "formiojs/dist/formio.full.css";
import "bootstrap/dist/css/bootstrap.min.css"

const FORMTYPE_OPTIONS = [
  {label: "Form", value: 'form' },
  {label: "Wizard", value: 'wizard' },
  {label: "PDF", value: 'pdf' },
]

const EFormKetQua = () => {
  const [formType, setFormType] = useState('form')
  const [formData, setFormData] = useState({ display: formType })
  const location = useLocation()
  const dispatch = useAppDispatch()
  const {data: truongHopThuTuc} = useAppSelector(state => state.truonghopthutuc)
  const truongHopThuTucContext = useTruongHopThuTucContext()
  usePrompt(formData?.components?.length, location.pathname)
  const onChangeFormType = (value) => {
    setFormType(value)
  }
  const onSaveForm = () => {
    dispatch(UpdateTruongHopThuTuc({id: truongHopThuTucContext.truongHopThuTucId, data: {eFormKetQua: JSON.stringify(formData)}}))
  }
  useEffect(() => {
    if(truongHopThuTucContext.truongHopThuTucId){
      dispatch(GetTruongHopThuTuc(truongHopThuTucContext.truongHopThuTucId))
    }
  }, [truongHopThuTucContext.truongHopThuTucId])
  useEffect(() => {
    if(truongHopThuTuc && truongHopThuTuc.eFormKetQua){
      setFormData(JSON.parse(truongHopThuTuc.eFormKetQua))
    }
  }, [truongHopThuTuc])
  return (
      <AntdSpace direction="vertical" style={{width:"100%"}}>
        {/* gửi dữ liệu formdata.components lên server */}
        <AntdSpace className='d-flex justify-content-center align-items-center'>
          <span className='fs-6'>Chọn loại form muốn xây dựng:</span> 
          <AntdSelect options={FORMTYPE_OPTIONS} defaultValue={"form"} style={{width:100}} onChange={onChangeFormType}/>
          <AntdButton type="primary" onClick={onSaveForm}>Lưu Form</AntdButton>
          <AntdButton onClick={() => truongHopThuTucContext.setEFormModalVisible(false)}>Đóng</AntdButton>
        </AntdSpace>
        <FormBuilder form={formData} onChange={(schema) => {
          setFormData(schema)
        }} />
      </AntdSpace>
  )
}

const EFormKetQuaModal = () => {
  const truongHopThuTucContext = useTruongHopThuTucContext()
  const handlerCancel = () => {
    truongHopThuTucContext.setEFormModalKetQuaVisible(false)
  }
  return <AntdModal footer={null} fullsizeScrollable title="Cập nhật mẫu phiếu trả kết quả" visible={true} handlerCancel={handlerCancel}>
    <EFormKetQua/>
  </AntdModal>
}

export default EFormKetQuaModal