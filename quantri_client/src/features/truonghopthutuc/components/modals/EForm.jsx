
import React, { useState, useEffect } from 'react'
import { AntdButton, AntdModal, AntdSelect, AntdSpace } from '@/lib/antd/components'
import { usePrompt } from '@/hooks/usePrompt'
import { useLocation } from 'react-router-dom'
import { useTruongHopThuTucContext } from '../../contexts/TruongHopThuTucContext'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { GetTruongHopThuTuc, UpdateTruongHopThuTuc } from '../../redux/action'
import "formiojs/dist/formio.full.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Input } from 'antd'
import { EFormBuilder } from '@/lib/eform'

const FORMTYPE_OPTIONS = [
  { label: "Form", value: 'form' },
  { label: "Wizard", value: 'wizard' },
  { label: "PDF", value: 'pdf' },
]

const EForm = () => {
  const [formType, setFormType] = useState('form')
  const [formData, setFormData] = useState({ display: formType })
  const location = useLocation()
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch()
  const { data: truongHopThuTuc } = useAppSelector(state => state.truonghopthutuc)
  const truongHopThuTucContext = useTruongHopThuTucContext()
  usePrompt(formData?.components?.length, location.pathname)
  const onChangeFormType = (value) => {
    setFormType(value)
  }
  const onSaveForm = () => {
    dispatch(UpdateTruongHopThuTuc({ id: truongHopThuTucContext.truongHopThuTucId, data: { eForm: JSON.stringify(formData), maSoBieuMau: inputValue } }))
  }
  useEffect(() => {
    if (truongHopThuTucContext.truongHopThuTucId) {
      dispatch(GetTruongHopThuTuc(truongHopThuTucContext.truongHopThuTucId))
    }
  }, [truongHopThuTucContext.truongHopThuTucId])
  useEffect(() => {
    if (truongHopThuTuc && truongHopThuTuc.eForm) {
      setFormData(JSON.parse(truongHopThuTuc.eForm))
      setInputValue(truongHopThuTuc.maSoBieuMau)
    }
  }, [truongHopThuTuc])
  return (
    <AntdSpace direction="vertical" style={{ width: "100%" }}>
      {/* gửi dữ liệu formdata.components lên server */}
      <AntdSpace style={{ display: 'flex', justifyContent: 'center' }}>
        <span className='fs-6' >Mã số biểu mẫu:</span>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </AntdSpace>
      <AntdSpace className='d-flex justify-content-center align-items-center'>
        <span className='fs-6'>Chọn loại form muốn xây dựng:</span>
        <AntdSelect options={FORMTYPE_OPTIONS} defaultValue={"form"} style={{ width: 100 }} onChange={onChangeFormType} />
        <AntdButton type="primary" onClick={onSaveForm}>Lưu Form</AntdButton>
        <AntdButton onClick={() => truongHopThuTucContext.setEFormModalVisible(false)}>Đóng</AntdButton>
      </AntdSpace>
      <EFormBuilder form={formData} onChange={(schema) => {
        setFormData(schema)
      }} />
    </AntdSpace>
  )
}

const EformModal = () => {
  const truongHopThuTucContext = useTruongHopThuTucContext()
  const handlerCancel = () => {
    truongHopThuTucContext.setEFormModalVisible(false)
  }
  return <AntdModal footer={null} fullsizeScrollable title="Cập nhật tờ khai điện tử" visible={true} handlerCancel={handlerCancel}>
    <EForm />
  </AntdModal>
}

export default EformModal