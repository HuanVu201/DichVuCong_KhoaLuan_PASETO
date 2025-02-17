import { RenderTitle } from "@/components/common";
import { } from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { XacNhanTraLaiXinRut } from "@/features/hoso/redux/action";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row } from "antd";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { Signotec, SignotecRef } from "@/lib/signotec/Signotec";
import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TrangThaiTraKetQuaContants } from "@/pages/dvc/traketqua/contants/TrangThaiTraKetQuaContants";

const XacNhanTraLaiXinRutModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const [btnLoading, setBtnLoading] = useState(false)
  const handleCancel = () => {
    buttonActionContext.setXacNhanTraLaiXinRutModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
  var selectedHoSos = useMemo(() => {
    if (hoSos && hoSos.length > 0) {
      var sltHoSos = hoSos.filter((x) =>
        buttonActionContext.selectedHoSos.includes(x.id)
      );
      var hoSoKhongThuocTraLaiXinRut = sltHoSos.filter(
        (x) => x.loaiKetQua != "Trả lại/Xin rút"
      );
      if (hoSoKhongThuocTraLaiXinRut.length > 0) {
        toast.warning("Hồ sơ được chọn không thuộc loại trả lại/xin rút");
        handleCancel();
      }
      return sltHoSos;
    }

    return [];
  }, [buttonActionContext.selectedHoSos]);
  const onOk = async () => {
    if (selectedHoSos.length) {
      try {
        setBtnLoading(true)
        var sltHoSoIds = selectedHoSos.map((i) => i.id.toString());
        const res = await dispatch(
          XacNhanTraLaiXinRut({
            ids: sltHoSoIds,
            TrangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
            ThaoTac: "Xác nhận trả lại/ xin rút",
          })
        ).unwrap();
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
      title={"Xác nhận trả lại/ xin rút?"}
      visible={true}
      confirmLoading={btnLoading}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận "
      width={1000}
    >
      <Form form={form} layout="vertical" name="datLaiNgayHenTraModal">
        {selectedHoSos.length > 1 ? (
          <span>
            Xác nhận trả lại/ xin rút <strong>{selectedHoSos.length}</strong> hồ
            sơ
          </span>
        ) : (
          <span>
            Xác nhận trả lại/ xin rút hồ sơ: {selectedHoSos[0].maHoSo}
          </span>
        )}
      </Form>
    </AntdModal>
  );
};
export default XacNhanTraLaiXinRutModal;
