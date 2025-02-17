import { RenderTitle } from "@/components/common";
import { AdminKetThucXuLyNhieuHoSo } from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { AntdDivider, AntdModal, AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row, SelectProps } from "antd";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";
import { ISearchHoSo } from "@/features/hoso/models";
import { Signotec, SignotecRef } from "@/lib/signotec/Signotec";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import dayjs from "dayjs"
import { GetByHoSoId } from "@/features/truonghopthutuc/redux/action";
import { GetHoSo } from "@/features/hoso/redux/action";
import { FORMAT_DATE, FORMAT_DATE_ISO } from "@/data";
export const TRANG_THAI_HO_SO_ID_OPTIONS: SelectProps["options"] = [
  { label: "Đã xử lý xong", value: "9" },
  { label: "Đã trả kết quả", value: "10" },

];
export const TRANG_THAI_TRA_KQ_OPTIONS: SelectProps["options"] = [
  { label: "Chờ xác nhận kết quả", value: "1" },
  { label: "Đã xác nhận kết quả", value: "3" },

];
const KetThucXuLyHoSoModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false)
  const { datas: hoSos, data: hoSo, loading } = useAppSelector(state => state.hoso)
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    buttonActionContext.setKetThucXuLyNhieuHoSoModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      try {
        setBtnLoading(true)
        var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
        const res = await dispatch(
          AdminKetThucXuLyNhieuHoSo({
            ids: sltHoSos,
            trangThaiHoSoId: form.getFieldValue("trangThaiHoSoId"),
            trangThaiTraKq: form.getFieldValue("trangThaiTraKq"),
            ngayKetThucXuLy: form.getFieldValue("ngayKetThucXuLy")
              ? dayjs(form.getFieldValue("ngayKetThucXuLy")).format(FORMAT_DATE_ISO)
              : undefined,

          })
        ).unwrap();

        if (res.succeeded) {
          if (res.message) toast.warning(res.message);
          setSearchHoSoParams((curr) => ({ ...curr }));
        }
        handleCancel();
        setBtnLoading(false)
      } catch (error) {
        console.log(error);
        setBtnLoading(false)
      }
    }
  };
  useEffect(() => {
    form.setFieldsValue({ trangThaiHoSoId: '9', trangThaiTraKq: '1' })

  }, [])
  useEffect(() => {
    (async () => {
      if (buttonActionContext.selectedHoSos && buttonActionContext.selectedHoSos.length == 1) {
        var tmpHoSo = await dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0].toString() })).unwrap();
        if (tmpHoSo && tmpHoSo.data && tmpHoSo.data.ngayHenTra) {
          form.setFieldValue("ngayKetThucXuLy", dayjs(tmpHoSo.data.ngayHenTra))
        }
      }
    })()

  }, [buttonActionContext.selectedHoSos])

  return (
    <AntdModal
      title={"Kết thúc xử lý hồ sơ?"}
      visible={true}
      confirmLoading={btnLoading}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
      width={1000}
    // loading={loading}
    >
      <Form form={form} layout="vertical" name="ketThucXuLyNhieuHoSoModal">
        <Col md={12} span={24}>
          <Form.Item label="Trạng thái hồ sơ id" name="trangThaiHoSoId">
            <AntdSelect options={TRANG_THAI_HO_SO_ID_OPTIONS} />
          </Form.Item>
        </Col>
        <Col md={12} span={24}>
          <Form.Item label="Trạng thái trả kết quả" name="trangThaiTraKq">
            <AntdSelect options={TRANG_THAI_TRA_KQ_OPTIONS} />
          </Form.Item>
        </Col>
        <Col md={12} span={24}>
          <Form.Item label="Ngày kết thúc xử lý" name="ngayKetThucXuLy">
            <DatePicker
              format={FORMAT_DATE}
              showTime
            ></DatePicker>
          </Form.Item>
        </Col>
      </Form>
    </AntdModal>
  );
};
export default KetThucXuLyHoSoModal;
