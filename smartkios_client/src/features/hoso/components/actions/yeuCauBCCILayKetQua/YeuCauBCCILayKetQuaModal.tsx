import { RenderTitle } from "@/components/common";
import {} from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import {
  GetHoSo,
  XacNhanKetQua,
  YeuCauBCCILayKetQua,
} from "@/features/hoso/redux/action";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row } from "antd";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";
import { ISearchHoSo } from "@/features/hoso/models";
import { useEffect } from "react";
import { toast } from "react-toastify";

const YeuCauBCCILayKetQuaModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const handleCancel = () => {
    buttonActionContext.setYeuCauBCCILayKetQuaModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length > 1) {
      toast.warning("Không yêu cầu nhiều hồ sơ");
    } else {
      var id = buttonActionContext.selectedHoSos[0] as string;
      dispatch(GetHoSo({ id }));
    }
  }, [buttonActionContext.selectedHoSos]);
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      var id = buttonActionContext.selectedHoSos[0] as string;
      const res = await dispatch(YeuCauBCCILayKetQua(id)).unwrap();
      if (res.succeeded) {
        setSearchHoSoParams((curr) => ({ ...curr }));
      }
      handleCancel();
    }
  };
  return (
    <AntdModal
      title={"Yêu cầu bưu chính công ích lấy kết quả"}
      visible={true}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận "
    >
      <Form form={form} layout="vertical" name="yeuCauBCCILayKetQua">
        <Row gutter={8}>
          <span>
            Xác nhận yêu cầu bưu chính công ích nhận kết quả hồ sơ:{" "}
            {hoSo?.maHoSo}
          </span>
        </Row>
      </Form>
    </AntdModal>
  );
};
export default YeuCauBCCILayKetQuaModal;
