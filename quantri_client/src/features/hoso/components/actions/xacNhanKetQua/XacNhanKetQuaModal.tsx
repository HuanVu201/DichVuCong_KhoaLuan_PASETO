import { RenderTitle } from "@/components/common";
import { } from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { XacNhanKetQua } from "@/features/hoso/redux/action";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row } from "antd";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";
import { ISearchHoSo } from "@/features/hoso/models";
import { Signotec, SignotecRef } from "@/lib/signotec/Signotec";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import React from "react";

const XacNhanKetQuaModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false)
  const { datas: hoSos } = useAppSelector(state => state.hoso)
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    buttonActionContext.setXacNhanKetQuaModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      try {
        setBtnLoading(true)
        var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
        const res = await dispatch(
          XacNhanKetQua({
            ids: sltHoSos,
          })
        ).unwrap();
        const errorIds = Object.keys(res.data) || []
        if (errorIds.length) {
          const dataKey: Record<string, string> = {}
          hoSos?.forEach(item => {
            if (errorIds.includes(item.id)) {
              dataKey[item.id] = item.maHoSo
            }
          })
          const toastData = errorIds.map(key => {
            return <p>Hồ sơ <strong>{dataKey[key]}</strong>: {res.data[key]}</p>
          })
          toast.warn(<>{toastData.map((item, idx) => {
            return <React.Fragment key={idx}>{item}</React.Fragment>
          })}</>, { autoClose: 10000 })
        }

        if (res.succeeded) {
          toast.success("Xác nhận thành công")
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
  return (
    <AntdModal
      title={"Xác nhận kết quả hồ sơ?"}
      visible={true}
      confirmLoading={btnLoading}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
      width={1000}
    >
      <Form form={form} layout="vertical" name="datLaiNgayHenTraModal"></Form>
    </AntdModal>
  );
};
export default XacNhanKetQuaModal;
