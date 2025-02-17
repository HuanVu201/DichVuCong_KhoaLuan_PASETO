import { Col, Form, Input, Row, InputNumber, Space, Spin, Upload, Select, Modal, Checkbox } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ketQuaThuTucService } from "../services"
import EformModal from "./modals/Eform"
import { toast } from "react-toastify"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { filterOptions } from "@/utils"
import { ToKhaiDienTu } from "@/features/hoso/components/ToKhaiDienTu"
import { Eform } from "@/lib/eform"
import { fillEformData } from "@/utils/common"

export const EformKetQuaDienTuModal = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);
  const ketQuaThuTucContext = useKetQuaThuTucContext()
  const [form] = Form.useForm<IKetQuaThuTuc>()
  const [ketQuaThuTuc, setKetQuaThuTuc] = useState<IKetQuaThuTuc>()
  const eFormKetQua = Form.useWatch("eFormKetQua", form)
  const [showEform, setShowEform] = useState(true)
  const onFinish = async () => {
    const formData = await form.validateFields()
    if (ketQuaThuTucContext?.maKetQuaThuTuc) {
      const res = await ketQuaThuTucService.Update({ id: ketQuaThuTucContext.maKetQuaThuTuc, data: formData })
      if (res.data.succeeded) {
        toast.success("Cập nhật thành công")
      }
    } else {
      if (formData.maTTHC) {
        //thuTucContext.thuTucId là matthc / xem usecolumn ở /thutuc
        const res = await ketQuaThuTucService.Create({ ...formData, maTTHC: formData.maTTHC })
        if (res.data.succeeded) {
          toast.success("Thêm mới thành công")
        }
      }
    }
    resetState()
  }
  const hanldeEFormData = useCallback(() => {
    const eFormDataValid = form.getFieldValue("eFormDataValid")
    const eFormData = form.getFieldValue("eFormData")

    if (!eFormDataValid) {
      toast.warn(<>Vui lòng nhập đầy đủ thông tin các trường được đánh dấu <span style={{ color: "red" }}>*</span></>)
      return { docxTemplate: undefined, eFormData: undefined }
    }
    if (!eFormData) {
      return { docxTemplate: undefined, eFormData: undefined }
    }
    for (const [key, value] of Object.entries(eFormData)) {
      var valueText = `${value}`;
      var keyText = `${key}`;
      try {
        const dateKey: any = new Date(valueText);
        if (dateKey instanceof Date === true && dateKey.toString() !== 'Invalid Date') {
          eFormData[keyText + 'Text'] = dateKey.toLocaleDateString('en-GB');
        }
      } catch (err) { }
    }
    const toDay = new Date();
    eFormData["ExportEformDataTime"] = toDay.getHours() + " giờ " + toDay.getMinutes() + " phút, ngày " + toDay.getDate() + " tháng " + (toDay.getMonth() + 1) + " năm " + toDay.getFullYear();
    let docxTemplate = ketQuaThuTuc?.dinhKemPhoi;
    let docxTemplateCustom = "";
    try {
      docxTemplateCustom = eFormData["ExportTemplateCustom"];
      if (docxTemplateCustom) {
        docxTemplate = docxTemplateCustom;
      }
    } catch (err) { }
    return { docxTemplate, eFormData }
  }, [form, ketQuaThuTuc?.dinhKemPhoi])
  const onDownload = async () => {
    const { docxTemplate, eFormData } = hanldeEFormData()
    setLoading(true)
    if (docxTemplate) {
      await fillEformData(docxTemplate, eFormData, "ketqua.docx")
    }
    setLoading(false)

  }
  const resetState = () => {
    form.resetFields();
    ketQuaThuTucContext.setEFormKetQuaTTHCVisible(false)
    ketQuaThuTucContext.setMaKetQuaThuTuc(undefined)
  }
  const handleCancel = () => {
    resetState()
  };
  useEffect(() => {
    (async () => {
      if (ketQuaThuTucContext.maKetQuaThuTuc) {
        const res = await ketQuaThuTucService.Get(ketQuaThuTucContext.maKetQuaThuTuc)
        setKetQuaThuTuc(res.data.data)
      }
    })()
  }, [ketQuaThuTucContext.maKetQuaThuTuc])

  useEffect(() => {
    if (ketQuaThuTuc) {
      form.setFieldsValue({ ...ketQuaThuTuc })
    }
  }, [ketQuaThuTuc])

  const onChangeToKhai = (formData: any, s: any) => {
    console.log(formData);


    form.setFieldValue("eFormData", formData.data)
    form.setFieldValue("eFormDataValid", formData.isValid)

    if ("LoaiToKhai" in formData.data) {
      form.setFieldValue("uyQuyen", formData.data.LoaiToKhai == "UyQuyen" ? false : true) // có người ủy quyền, reset hết dữ liệu chủ hồ sơ hiện tại
    }

    if (formData.changed) {
      const key = formData.changed.component.key
      const value = formData.changed.value

      if (key == "SoDienThoai") {
        form.setFieldValue("soDienThoaiChuHoSo", value)
      }
      else if (key == "Email") {
        form.setFieldValue("emailChuHoSo", value)
      }
      else if (key == "nycSoDienThoai") {
        form.setFieldValue("soDienThoaiNguoiUyQuyen", value)
      }
      else if (key == "nycEmail") {
        form.setFieldValue("emailNguoiUyQuyen", value)
      }
      else if (key == "LoaiToKhai") {
        form.setFieldValue("uyQuyen", value == "UyQuyen" ? false : true) // có người ủy quyền, reset hết dữ liệu chủ hồ sơ hiện tại
      }
      else if (key == "nycHoVaTen") {
        form.setFieldValue("nguoiUyQuyen", value)
      }
      else if (key == "HoVaTen" && !form.getFieldValue("uyQuyen")) {
        form.setFieldValue("chuHoSo", value)
      }
      else if (key == "SoGiayTo" && !form.getFieldValue("uyQuyen")) {
        form.setFieldValue("soGiayToChuHoSo", value)
      }
      else if (key == "NoiOHienTai" && !form.getFieldValue("uyQuyen")) {
        form.setFieldValue("diaChiChuHoSo", value)
      }
      else if (key == "NgaySinh" && !form.getFieldValue("uyQuyen")) {
        form.setFieldValue("ngaySinhChuHoSo", value)
      }
      // else if(key == "nycNoiOHienTai"){
      //     form.setFieldValue("diaChiChuHoSo", value)
      // }
    }

  }
  return (

    <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
      <AntdModal title="Thêm mới kết quả thủ tục" visible={true} handlerCancel={handleCancel} fullsizeScrollable footer={<>
        <AntdButton key={"1"} onClick={(handleCancel)}>Đóng</AntdButton>
        <AntdButton key={"1"} onClick={(onDownload)}>In word</AntdButton>
      </>}>
        <Form name='ketquathutuc' layout="vertical" form={form} >
          <Form.Item name="eFormData" hidden><Input /></Form.Item>
          <Form.Item name="eFormDataValid" hidden valuePropName="checked"><Checkbox /></Form.Item>
        </Form>

        {ketQuaThuTuc?.eFormKetQua ? <Eform form={JSON.parse(ketQuaThuTuc?.eFormKetQua)} onSubmit={onDownload} onChange={onChangeToKhai}></Eform> : null}
      </AntdModal>
    </Suspense>
  )
}