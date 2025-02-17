import { RenderTitle } from "@/components/common";
import {} from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import {
  GetHoSo,
  XacNhanKetQua,
  YeuCauBCCILayKetQuaWithoutItemCode,
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

const YeuCauBCCILayKetQuaWithOutItemCodeModal = ({
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
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
    buttonActionContext.setYeuCauBCCILayKetQuaWithoutItemCodeModalVisible(false);
  };

  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      try {
        setBtnLoading(true)
       
        const res = await dispatch(YeuCauBCCILayKetQuaWithoutItemCode({ids:buttonActionContext.selectedHoSos})).unwrap();
      
        if(res.succeeded){

          var tmpResult = res.data as any;
          var count = 0;
          if(tmpResult != null && tmpResult.length >0){
            tmpResult.map((item:any)=>{
              if(item?.Status && item?.Status == '100')count ++;
            })
          }
          if(count) toast.success(`Trả kết quả thành công ${count}/${buttonActionContext.selectedHoSos.length} hồ sơ`)
        }else {
          toast.warning(res.message)
        }
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
      title={"Yêu cầu bưu chính công ích lấy kết quả"}
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
            Xác nhận yêu cầu bưu chính công ích nhận kết quả {buttonActionContext.selectedHoSos.length} hồ sơ
          </span>
        </Row>
      </Form>
      </Spin>
    </AntdModal>
  );
};
export default YeuCauBCCILayKetQuaWithOutItemCodeModal;
