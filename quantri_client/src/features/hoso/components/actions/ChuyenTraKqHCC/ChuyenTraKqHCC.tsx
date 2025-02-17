import { RenderTitle } from "@/components/common";
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
import { TrangThaiTraKetQuaContants } from "@/pages/dvc/traketqua/contants/TrangThaiTraKetQuaContants";
import React, { useState } from "react";

const ChuyenTraKqHCCModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const [btnLoading, setBtnLoading] = useState(false)
  const handleCancel = () => {
    buttonActionContext.setChuyenTraKqHCCModalVisible(false);
    form.resetFields();
    setBtnLoading(false)
    // buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      setBtnLoading(true)
      try{
        var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
        const res = await dispatch(
          XacNhanKetQua({
            ids: sltHoSos,
            TrangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
          })
        ).unwrap();
        if (res.succeeded) {
          setSearchHoSoParams((curr) => ({ ...curr }));
        }
        handleCancel();
      } catch(error){
        console.log(error);
        setBtnLoading(false)
      } finally {
        setBtnLoading(false)
      }
    }
  };
  return (
    <AntdModal
      title={"Chuyển trả kết quả"}
      visible={true}
      confirmLoading={btnLoading}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận "
    >
      <Form form={form} layout="vertical" name="datLaiNgayHenTraModal">
        <Row gutter={8}>
          <span>Xác nhận chuyển trả kết quả hồ sơ?</span>
        </Row>
      </Form>
    </AntdModal>
  );
};
export default ChuyenTraKqHCCModal;
