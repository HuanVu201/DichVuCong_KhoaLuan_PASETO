import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { ChuyenPhiDiaGioi } from "@/features/hoso/redux/action";
import {
  AntdDivider,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, Input, Row } from "antd";
import { ChuyenPhiDiaGioiParams } from "@/features/hoso/services";
import { useEffect, useMemo, useState } from "react";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { toast } from "react-toastify";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";

const ChuyenPhiDiaGioiModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm<ChuyenPhiDiaGioiParams>();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const { loading, datas: hoSos } = useAppSelector((state) => state.hoso);
  const { data: users } = useAppSelector((state) => state.user);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const handleCancel = () => {
    buttonActionContext.setChuyenPhiDiaGioiModalVisible(false);
    buttonActionContext.setSelectedHoSos([]);
  };
  const [searchCoCauParams, setSearchCoCauParams] =
    useState<ISearchCoCauToChuc>({
      pageNumber: 1,
      pageSize: 10000,
      reFetch: true,
      orderBy: ["GroupOrder", "GroupCode"],
      cataLogs: ["xa-phuong", "quan-huyen"],
    });
  const selectedQuanHuyen = Form.useWatch("QuanHuyen", form);
  useEffect(() => {
    dispatch(SearchCoCauToChuc(searchCoCauParams));
  }, [searchCoCauParams]);
  const quanHuyen = useMemo(() => {
    return coCauToChucs?.filter((x) => x.catalog == "quan-huyen");
  }, [coCauToChucs]);
  const xaPhuong = useMemo(() => {
    return coCauToChucs?.filter(
      (x) => x.catalog == "xa-phuong" && x.ofGroupCode == selectedQuanHuyen
    );
  }, [coCauToChucs, selectedQuanHuyen]);
  const onOk = async () => {
    const formData = (await form.validateFields()) as ChuyenPhiDiaGioiParams;
    if (buttonActionContext.selectedHoSos.length) {
      if (form.getFieldValue("XaPhuong") || form.getFieldValue("QuanHuyen")) {
        const res = await dispatch(
          ChuyenPhiDiaGioi({
            Ids: buttonActionContext.selectedHoSos,
            DonViId: form.getFieldValue("XaPhuong")
              ? form.getFieldValue("XaPhuong")
              : form.getFieldValue("QuanHuyen"),
          })
        ).unwrap();
        if (res.succeeded) {
          // form.setFieldValue("dinhKemYKienNguoiChuyenXuLy", undefined)
          setSearchHoSoParams((curr) => ({ ...curr }));
          handleCancel();
        }
      } else {
        toast.warning("Chưa chọn đơn vị");
      }
    }
  };
  const maHoSo = useMemo(() => {
    return hoSos?.find(
      (hoSo) => hoSo.id == (buttonActionContext.selectedHoSos[0] as string)
    )?.maHoSo;
  }, [buttonActionContext.selectedHoSos]);

  return (
    <AntdModal
      confirmLoading={loading}
      title="CHUYỂN PHI ĐỊA GIỚI"
      visible={true}
      handlerCancel={handleCancel}
      width={1280}
      onOk={onOk}
      okText="Xác nhận"
    >
      <Form
        form={form}
        layout="vertical"
        name="ChuyenPhiDiaGioiHoSo"
        onFieldsChange={(changedFields, allFields) => {
          if (
            changedFields[0] &&
            changedFields[0]["name"] &&
            changedFields[0]["name"][0] == "QuanHuyen"
          ) {
            form.setFieldValue("XaPhuong", undefined);
          }
        }}
      >
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item name="QuanHuyen" label="Quận huyện">
              <AntdSelect
                generateOptions={{
                  model: quanHuyen,
                  value: "groupCode",
                  label: "groupName",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="XaPhuong" label="Xã phường">
              <AntdSelect
                generateOptions={{
                  model: xaPhuong,
                  value: "groupCode",
                  label: "groupName",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};

export default ChuyenPhiDiaGioiModal;
