import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  SelectProps,
  Space,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IHuongDanNopHoSo } from "../models";
import { useEffect, useMemo, useRef } from "react";
import {
  AntdButton, 
  AntdDivider,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddHuongDanNopHoSo,
  GetHuongDanNopHoSo,
  UpdateHuongDanNopHoSo,
} from "../redux/action";
import { useHuongDanNopHoSoContext } from "../contexts/HuongDanNopHoSoContext";
import { resetData } from "@/features/loaiphilephi/redux/slice";
import { DinhDanhSection } from "@/features/hoso/components/actions/themMoiHoSo/DinhDanhSection";
import { TepDinhKem } from "@/features/hoso/components/actions/themMoiHoSo/TepDinhKem";
import { RenderTitle } from "@/components/common";
import { ThanhPhanHuongDanNopHoSoDetail } from "./ThanhPhanHuongDanNopHoSoDetail";
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import { LuaChonThuTucHuongDanNopHoSoWrapper } from "./LuaChonThuTucHuongDanNopHoSoWrapper";

const suDungPhiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: false },
];
export const HuongDanNopHoSoDetail = () => {
  const dispatch = useAppDispatch();
  const {
    data: huongDanNopHoSo,

    loading,
  } = useAppSelector((state) => state.huongdannophoso);
  const { duLieuThemHoSo } = useAppSelector((state) => state.truonghopthutuc);
  const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
  const [form] = Form.useForm<IHuongDanNopHoSo>();

  const onFinish = async () => {
    const formData = (await form.validateFields()) as IHuongDanNopHoSo;
    const cloneFormData: IThemHoSo = { ...formData, thuTucId: undefined };
    if (form.getFieldValue("daDinhDanh") !== true) {
      toast.warn("Vui lòng định danh chủ hồ sơ");
      return;
    }
    if (!cloneFormData.truongHopId) {
      return;
    }
    if (huongDanNopHoSoContext?.selectedHuongDanNopHoSoId) {
      dispatch(
        UpdateHuongDanNopHoSo({
          id: huongDanNopHoSoContext.selectedHuongDanNopHoSoId,
          data: { ...formData },
        })
      );
    } else {
      dispatch(AddHuongDanNopHoSo({ ...formData }));
    }
    form.resetFields();
    huongDanNopHoSoContext.setHuongDanNopHoSoModalVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    huongDanNopHoSoContext.setHuongDanNopHoSoModalVisible(false);
    huongDanNopHoSoContext.setSelectedHuongDanNopHoSoId(undefined);
  };
  useEffect(() => {
    if (huongDanNopHoSoContext.selectedHuongDanNopHoSoId) {
      dispatch(
        GetHuongDanNopHoSo(huongDanNopHoSoContext.selectedHuongDanNopHoSoId)
      );
    }
  }, [huongDanNopHoSoContext.selectedHuongDanNopHoSoId]);

  useEffect(() => {
    if (huongDanNopHoSo) {
      form.setFieldsValue({ ...huongDanNopHoSo, loaiDoiTuong: "Công dân" });
    }
  }, [huongDanNopHoSo]);

  return (
    <AntdModal
      confirmLoading={loading}
      title={
        <>
          <span>Hướng dẫn nộp hồ sơ</span>
          <AntdDivider />
        </>
      }
      handlerCancel={handleCancel}
      fullsizeScrollable
      visible={true}
      destroyOnClose
      okText="Lưu"
      onOk={onFinish}
      keyboard={false}
    >
      <Form
        form={form}
        name="tiepnhanhoso"
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
        //    onFinishFailed={onFinishFailed}
        initialValues={{
          kenhThucHien: "1",
          removeFiles: [],
          loaiDoiTuong: "Công dân",
          thongBaoZalo: true,
          thongBaoEmail: true,
          uyQuyen: false,
          maTrangThaiHoSo: "2",
          soBoHoSo: 1,
          hinhThucTra: "0",
        }}
      >
        <Form.Item
          name="truongHopId"
          hidden
          // rules={[{required : true, message : "Không được để trống!"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="maTruongHop" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="tenTruongHop" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="maTTHC" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="tenTTHC" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="mucDo" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="maTrangThaiHoSo" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="linhVucId" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="hinhThucTra" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="nodeQuyTrinh" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="chiTietPhiLePhi" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="thoiHanBuocXuLy" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item name="loaiThoiHanBuocXuLy" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="buocXuLyTiep" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="nguoiXuLyTiep" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="tenBuocHienTai" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="buocHienTai" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="nguoiNhanHoSo" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="nguoiDaXuLy" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="dangKyNhanHoSoQuaBCCIData" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="thanhPhanHoSos" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="daDinhDanh" hidden valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item name="bcci_tenTinhThanh" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="bcci_tenQuanHuyen" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="bcci_tenXaPhuong" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="nguoiGui" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="eFormData" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="eFormDataValid" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="removeFiles" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="soDinhDanh" hidden>
          <Input />
        </Form.Item>
        <DinhDanhSection form={form} />

        <LuaChonThuTucHuongDanNopHoSoWrapper
          form={form}
          extraSearchThuTuc={{}}
        />
        <Row gutter={[8, 8]}>
          <Col md={12}>
            <Form.Item name="lyDoTuChoi" label="Lý do từ chối">
              <TextArea />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="lyDoBoSung" label="Lý do bổ sung">
              <TextArea />
            </Form.Item>
          </Col>
        </Row>

        <AntdDivider />

        <div>
          <RenderTitle title="Tệp tin đính kèm" />
          <ThanhPhanHuongDanNopHoSoDetail
            form={form}
            thanhPhanThuTucs={
              huongDanNopHoSo?.thanhPhanHuongDanNopHoSos
                ? huongDanNopHoSo?.thanhPhanHuongDanNopHoSos
                : duLieuThemHoSo?.thanhPhanThuTucs
            }
            hoSoId={huongDanNopHoSo?.id ?? ""}
          />
          <AntdDivider />
        </div>
      </Form>
    </AntdModal>
  );
};
