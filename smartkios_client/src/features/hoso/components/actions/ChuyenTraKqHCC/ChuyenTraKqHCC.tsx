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
import React from "react";

const ChuyenTraKqHCCModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const handleCancel = () => {
    buttonActionContext.setChuyenTraKqHCCModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
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
    }
  };
  return (
    <AntdModal
      title={"Chuyển trả kết quả"}
      visible={true}
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
