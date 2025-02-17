import { RenderTitle } from "@/components/common";
import {} from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import {
  GetHoSo,
  XacNhanKetQua,
  ThuHoiDangKyNhanKqQuaBCCI,
} from "@/features/hoso/redux/action";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row, Spin } from "antd";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";
import { ISearchHoSo } from "@/features/hoso/models";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ThuHoiDangKyNhanKqQuaBCCIModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const { data: hoSo, loading } = useAppSelector((state) => state.hoso);
  const [btnLoading, setBtnLoading] = useState(false)
  const handleCancel = () => {
    buttonActionContext.setThuHoiDangKyNhanKqQuaBCCIModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
 
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      try {
        setBtnLoading(true)
     
        const res = await dispatch(ThuHoiDangKyNhanKqQuaBCCI({ids:buttonActionContext.selectedHoSos})).unwrap();
        
        setSearchHoSoParams((curr) => ({ ...curr }));
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
      title={"Thu hồi kết quả"}
      visible={true}
      confirmLoading={btnLoading }
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận "
    >
      <Spin spinning = {loading}>
      <Form form={form} layout="vertical" name="yeuCauBCCILayKetQua">
        <Row gutter={8}>
          <span>
            Xác nhận thu hồi kết quả {buttonActionContext.selectedHoSos.length} hồ sơ
           
          </span>
        </Row>
      </Form>
      </Spin>
    </AntdModal>
  );
};
export default ThuHoiDangKyNhanKqQuaBCCIModal;
