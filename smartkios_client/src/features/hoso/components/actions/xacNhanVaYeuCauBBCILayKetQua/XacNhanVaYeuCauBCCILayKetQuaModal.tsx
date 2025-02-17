import {
  AntdButton,
  AntdDivider,
  AntdModal,
  AntdSpace,
  AntdUpLoad,
} from "@/lib/antd/components";
import { Col, Form, Input, Row } from "antd";
import { RenderTitle } from "../../../../../components/common/RenderTitle";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  CapNhatKetQuaHoSo,
  GetHoSo,
  TraKetQuaHoSo,
  XacNhanVaYeuCauBCCILayKetQua,
} from "@/features/hoso/redux/action";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { resetData } from "@/features/hoso/redux/slice";
import { resetDatas } from "@/features/thanhphanhoso/redux/slice";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";

const XacNhanVaYeuCauBCCILayKetQuaModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const dinhKem = Form.useWatch("dinhKemKetQua", form);
  const dispatch = useAppDispatch();
  const eFormKetQuaData = Form.useWatch("eFormKetQuaData", form);
  const regularUploadRef = useRef<RegularUploadRef>(null);
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }));
    }
  }, [buttonActionContext.selectedHoSos]);

  useEffect(() => {
    if (hoSo != undefined) {
      form.setFieldsValue(hoSo);
    }
  }, [hoSo]);

  const handleCancel = async () => {
    form.resetFields();
    dispatch(resetData());
    dispatch(resetDatas());
    buttonActionContext.setXacNhanVaYeuCauBCCILayKetQuaModalVisible(false);
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    const formData = (await form.validateFields()) as Pick<
      IHoSo,
      "trichYeuKetQua" | "dinhKemKetQua"
    >;
    if (buttonActionContext.selectedHoSos.length) {
      const postData = {
        ...formData,
        id: buttonActionContext.selectedHoSos[0] as string,
        YeuCauBCCILayKetQua: true,
      };
      console.log("====================================");
      console.log(postData);
      console.log("====================================");
      const res = await dispatch(TraKetQuaHoSo(postData)).unwrap();
      if (res.succeeded) {
        form.setFieldValue("dinhKemKetQua", undefined); // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined
        setSearchHoSoParams((curr) => ({ ...curr }));
        handleCancel();
      }
    }
  };
  const handlerTrichXuatOCR = (eFormData: string, eForm: string) => {
    form.setFieldValue("eFormKetQuaData", eFormData);
    form.setFieldValue("eFormKetQua", eForm);
  };
  // const onExtractDataModify = () => {
  //     regularUploadRef.current?.setTrichXuatDuLieuOCRModalVisible
  //      regularUploadRef.current?.setModeTrichXuat("modify")
  // }
  return (
    <AntdModal
      title={"TRẢ KẾT QUẢ HỒ SƠ"}
      visible={true}
      handlerCancel={handleCancel}
      width={1280}
      footer={
        <AntdSpace>
          <AntdButton onClick={handleCancel} key={"1"}>
            Đóng
          </AntdButton>
          {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
          <AntdButton onClick={onOk} key={"3"} type="primary">
            Cập nhật
          </AntdButton>
        </AntdSpace>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="XacNhanVaYeuCauBCCILayKetQuaModal"
      >
        <Row gutter={8}>
          <Col span={24}>
            <RenderTitle title="Kết quả xử lý hồ sơ" />
            <Row gutter={[4, 8]}>
              <Col span={16}>
                <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                  {/* <AntdUpLoad maxCount={10} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
                  {hoSo?.maHoSo ? (
                    <RegularUpload
                      kySoToken
                      // useSoHoa={true}
                      ref={regularUploadRef}
                      dinhKem={dinhKem}
                      fieldName={"dinhKemKetQua"}
                      folderName={hoSo.maHoSo}
                      form={form}
                    />
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <AntdDivider />
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};

export default XacNhanVaYeuCauBCCILayKetQuaModal;
