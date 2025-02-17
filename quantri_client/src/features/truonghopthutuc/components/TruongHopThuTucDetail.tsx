import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  SelectProps,
  Space,
  TabsProps,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { ISearchTruongHopThuTuc, ITruongHopThuTuc } from "../models";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSelectProps,
  AntdTab,
  AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddTruongHopThuTuc,
  GetTruongHopThuTuc,
  SearchTruongHopThuTuc,
  UpdateTruongHopThuTuc,
} from "../redux/action";
import { useTruongHopThuTucContext } from "../contexts/TruongHopThuTucContext";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import {
  BATBUOCDINHKEM_OPTIONS,
  CHOCHUYENPHIDIAGIOI_OPTIONS,
  KHONGCONGAYHENTRA_OPTIONS,
  KHONGNOPTRUCTUYEN_OPTIONS,
  KHONGTHUBANGIAY_OPTIONS,
  LOAIBAOTROXAHOI_OPTIONS,
  LOAIDULIEUKETNOI_OPTIONS,
  LOAITHOIGIANTHUCHIEN_OPTIONS,
  YEUCAUNOPTRUCTUYEN_OPTIONS,
} from "../data";
import { resetData } from "@/features/truonghopthutuc/redux/slice";
import ThanhPhanThuTucTableWrapper from "@/features/thanhphanthutuc/components/ThanhPhanThuTucTable";
import {
  ICoCauToChuc,
  ISearchCoCauToChuc,
} from "@/features/cocautochuc/models";
import { coCauToChucService } from "@/features/cocautochuc/services";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { ID_SEPARATE } from "@/data";
import { useWatch } from "antd/es/form/Form";

export const TruongHopThuTucDetail = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchTruongHopThuTuc>>;
}) => {
  const dispatch = useAppDispatch();
  const { data: truongHopThuTuc } = useAppSelector(
    (state) => state.truonghopthutuc
  );
  const truongHopThuTucContext = useTruongHopThuTucContext();
  const thuTucContext = useThuTucContext();
  const [form] = Form.useForm<ITruongHopThuTuc>();
  const dinhKem = Form.useWatch("eFormTemplate", form);
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>([]);
  const [thoiGianThucHien, setThoiGianThucHien] = useState()
  const [thoiGianThucHienTrucTuyen, setThoiGianThucHienTrucTuyen] = useState()
  const [gio, setGio] = useState(truongHopThuTuc?.thoiGianThucHien);
  const [gioTrucTuyen, setGioTrucTuyen] = useState(truongHopThuTuc?.thoiGianThucHienTrucTuyen);

  const [searchDonViParams, setSearchDonViParams] =
    useState<ISearchCoCauToChuc>({
      pageNumber: 1,
      pageSize: 5000,
      type: "don-vi",
    });
  const onFinish = async () => {
    const formData: ITruongHopThuTuc = await form.validateFields();

    if (truongHopThuTucContext?.truongHopThuTucId) {
      await dispatch(
        UpdateTruongHopThuTuc({
          id: truongHopThuTucContext.truongHopThuTucId,
          data: {
            ...formData,
            donViTiepNhanRieng:
              formData?.selectedDonViTiepNhanRieng.join(ID_SEPARATE),
            thoiGianThucHien: gio,
            thoiGianThucHienTrucTuyen: gioTrucTuyen,
            noteNgayLamViec: formData.noteNgayLamViec,
            noteTraKetQua: formData.noteTraKetQua,
          },
        })
      ).unwrap();
    } else {
      if (thuTucContext.thuTucId) {
        await dispatch(
          AddTruongHopThuTuc({
            ...formData,
            donViTiepNhanRieng:
              formData?.selectedDonViTiepNhanRieng.join(ID_SEPARATE),
            thuTucId: thuTucContext.thuTucId,
            thoiGianThucHien: gio as any,
            thoiGianThucHienTrucTuyen: gioTrucTuyen,
            noteNgayLamViec: formData.noteNgayLamViec,
            noteTraKetQua: formData.noteTraKetQua,
          })
        ).unwrap();
      }
    }
    form.setFieldValue("eFormTemplate", undefined); // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined
    setSearchParams((curr) => ({ ...curr, thuTucId: thuTucContext.thuTucId }));
    handleCancel();
  };
  const handleCancel = () => {
    dispatch(resetData());
    form.resetFields();
    truongHopThuTucContext.setTruongHopThuTucModalVisible(false);
    truongHopThuTucContext.setTruongHopThuTucId(undefined);
  };
  useEffect(() => {
    if (truongHopThuTucContext.truongHopThuTucId) {
      dispatch(
        GetTruongHopThuTuc(truongHopThuTucContext.truongHopThuTucId)
      ).unwrap();
    }
  }, [truongHopThuTucContext.truongHopThuTucId]);

  useEffect(() => {
    if (truongHopThuTuc) {
      form.setFieldsValue({ ...truongHopThuTuc });
      if (truongHopThuTuc?.donViTiepNhanRieng) {
        var arrDonViTiepNhanRiengs =
          truongHopThuTuc?.donViTiepNhanRieng.split(ID_SEPARATE);
        form.setFieldValue(
          "selectedDonViTiepNhanRieng",
          arrDonViTiepNhanRiengs
        );
      }
      if (truongHopThuTuc.thoiGianThucHien) {
        form.setFieldValue(
          "thoiGianThucHien",
          truongHopThuTuc.thoiGianThucHien
        );
      }
    }
  }, [truongHopThuTuc]);

  useEffect(() => {
    var tmpValue = truongHopThuTucContext.selectedDonViThucHienRieng.map(
      (x) => x.groupCode
    );
    form.setFieldValue("selectedDonViTiepNhanRieng", tmpValue);
  }, [truongHopThuTucContext.selectedDonViThucHienRieng]);
  // load options DonVi
  useEffect(() => {
    (async () => {
      var coCauToChucResponse = await coCauToChucService.Search(
        searchDonViParams
      );
      if (coCauToChucResponse?.data?.data) {
        setDonVis(coCauToChucResponse?.data?.data);
      }
    })();
  }, [searchDonViParams]);

  useEffect(() => {
    if (gioTrucTuyen)
      form.setFieldValue("thoiGianThucHienTrucTuyen", gioTrucTuyen)
  }, [gioTrucTuyen])
  const handleChange = (value: any) => {
    setGio(value * 8)
    setGioTrucTuyen(value * 8)
  }
  const handleChangeThoiHanTrucTuyen = (value: any) => {
    setGioTrucTuyen(value * 8)
  }
  const renderContent = useMemo((): React.ReactNode => {
    const TRUONGHOPTHUTUC_DETAIL_TAB: TabsProps["items"] = [
      {
        key: "detail",
        label: "Thông tin trường hợp",
        children: (
          <Form
            name="TruongHopThuTuc"
            layout="vertical"
            form={form}
            initialValues={{
              batBuocDinhKemKetQua: true,
              yeuCauNopPhiTrucTuyen: false,
              batBuocDungDiaBan: false,
              batBuocKySoKetQua: true,
              loaiThoiGianThucHien: "Ngày làm việc",
              anThongTinLienHeNopTrucTuyen: false,
              khongCoNgayHenTra: false,
              khongNopTrucTuyen: false,
            }}
            requiredMark={truongHopThuTucContext.truongHopThuTucId !== null}
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item label="Tên trường hợp thủ tục" name="ten">
                  <Input />
                </Form.Item>
              </Col>
              <Col style={{ width: '20%' }} >
                <Form.Item
                  label="Bắt buộc đính kèm kết quả"
                  name="batBuocDinhKemKetQua"
                >
                  <AntdSelect options={BATBUOCDINHKEM_OPTIONS} />
                </Form.Item>
              </Col>
              <Col style={{ width: '20%' }} >
                <Form.Item
                  label="Bắt buộc đúng địa bàn"
                  name="batBuocDungDiaBan"
                >
                  <AntdSelect options={BATBUOCDINHKEM_OPTIONS} />
                </Form.Item>
              </Col>
              <Col style={{ width: '20%' }} >
                <Form.Item
                  label="Ẩn thông tin liên hệ nộp trực tuyến"
                  name="anThongTinLienHeNopTrucTuyen"
                >
                  <AntdSelect options={BATBUOCDINHKEM_OPTIONS} />
                </Form.Item>
              </Col>
              <Col style={{ width: '20%' }} >
                <Form.Item
                  label="Bắt buộc ký số kết quả"
                  name="batBuocKySoKetQua"
                >
                  <AntdSelect options={YEUCAUNOPTRUCTUYEN_OPTIONS} />
                </Form.Item>
              </Col>
              <Col style={{ width: '20%' }} >
                <Form.Item
                  label="Cho chuyển phi địa giới"
                  name="choChuyenPhiDiaGioi"
                >
                  <AntdSelect options={CHOCHUYENPHIDIAGIOI_OPTIONS} />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item
                  label="Là thủ tục không có ngày hẹn trả"
                  name="khongCoNgayHenTra"
                >
                  <AntdSelect options={KHONGCONGAYHENTRA_OPTIONS} />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item
                  label="Cho phép nộp ủy quyền"
                  name="choPhepNopUyQuyen"
                >
                  <AntdSelect options={KHONGCONGAYHENTRA_OPTIONS} />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item
                  label="Không thu bản giấy"
                  name="khongThuBanGiay"
                >
                  <AntdSelect options={KHONGTHUBANGIAY_OPTIONS} />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item
                  label="Không nộp trực tuyến"
                  name="khongNopTrucTuyen"
                >
                  <AntdSelect options={KHONGNOPTRUCTUYEN_OPTIONS} />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Thời gian thực hiện"
                  name="thoiGianThucHien"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian thực hiện (ngày)",
                    },
                    {
                      required: true,
                      pattern: new RegExp(/\d+/g),
                      message: "Vui lòng nhập đúng định dạng!",
                    },
                  ]}
                >
                  <Row>
                    <div style={{ alignItems: 'center', display: 'flex', marginRight: '10px' }}>
                      <span style={{ marginRight: '5px' }}>Ngày: </span>
                      <InputNumber value={gio ? gio / 8 : (truongHopThuTuc?.thoiGianThucHien as any) / 8} style={{ width: '250px' }} onChange={handleChange}></InputNumber>
                    </div>
                    <div>
                      <span style={{ marginRight: '5px' }}>Giờ: </span>
                      <Input value={gio ? gio : truongHopThuTuc?.thoiGianThucHien} disabled={true} style={{ width: '250px' }} />
                    </div>

                  </Row>
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item

                  label="Thời gian thực hiện trực tuyến"
                  name="thoiGianThucHienTrucTuyen"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian thực hiện trực tuyến (ngày)",
                    },
                    {
                      required: true,
                      pattern: new RegExp(/\d+/g),
                      message: "Vui lòng nhập đúng định dạng!",
                    },
                  ]}
                >
                  <Row>
                    <div style={{ alignItems: 'center', display: 'flex', marginRight: '10px' }}>
                      <span style={{ marginRight: '5px' }}>Ngày: </span>
                      <InputNumber value={gioTrucTuyen ? gioTrucTuyen / 8 : (truongHopThuTuc?.thoiGianThucHienTrucTuyen as any) / 8} style={{ width: '250px' }} onChange={handleChangeThoiHanTrucTuyen}></InputNumber>
                    </div>
                    <div>
                      <span style={{ marginRight: '5px' }}>Giờ: </span>
                      <Input value={gioTrucTuyen ? gioTrucTuyen : truongHopThuTuc?.thoiGianThucHienTrucTuyen} disabled={true} style={{ width: '250px' }} />
                    </div>

                  </Row>
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Loại thời gian thực hiện"
                  name="loaiThoiGianThucHien"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập loại thời gian thực hiện",
                    },
                  ]}
                >
                  <AntdSelect options={LOAITHOIGIANTHUCHIEN_OPTIONS} />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Đơn vị thực hiện riêng"
                  name="selectedDonViTiepNhanRieng"
                >
                  <AntdSelect
                    generateOptions={{
                      model: donVis,
                      label: "groupName",
                      value: "groupCode",
                    }}
                    showSearch
                    mode="multiple"
                  />
                </Form.Item>
                <Button
                  title="Chọn đơn vị thực hiện riêng"
                  type="primary"
                  onClick={() => {
                    truongHopThuTucContext.setSelectDonViThucHienRiengModalVisible(
                      true
                    );
                  }}
                >
                  Chọn đơn vị
                </Button>
              </Col>
              <Col md={4} span={8}>
                <Form.Item label="Mẫu tải EForm" name="eFormTemplate">
                  <RegularUpload
                    dinhKem={dinhKem}
                    fieldName={"eFormTemplate"}
                    folderName={"TruongHopThuTuc"}
                    form={form}
                  />
                </Form.Item>
              </Col>
              <Col md={4} span={8}>
                <Form.Item label="Loại bảo trợ xã hội" name="loaiBaoTroXaHoi" >
                  <AntdSelect options={LOAIBAOTROXAHOI_OPTIONS} allowClear />
                </Form.Item>
              </Col>
              <Col md={4} span={8}>
                <Form.Item label="Loại dữ liệu kết nối" name="loaiDuLieuKetNoi">
                  <AntdSelect options={LOAIDULIEUKETNOI_OPTIONS} allowClear />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
              <Col span={12} >
                <Form.Item label="Ghi chú thời gian làm việc" name="noteNgayLamViec"  >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ghi chú trả kết quả" name="noteTraKetQua" >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <AntdButton type="primary" htmlType="submit">
                  Xác nhận
                </AntdButton>
                <AntdButton type="default" onClick={handleCancel}>
                  Đóng
                </AntdButton>
              </Space>
            </Form.Item> */}
          </Form>
        ),
      },
      {
        key: "thanh-phan-thu-tuc",
        label: "Thành phần thủ tục",
        children: <ThanhPhanThuTucTableWrapper />,
      },
    ];
    return <AntdTab items={TRUONGHOPTHUTUC_DETAIL_TAB}></AntdTab>;
  }, [
    form,
    truongHopThuTucContext.truongHopThuTucId,
    truongHopThuTucContext.selectedDonViThucHienRieng,
    donVis,
    dinhKem,
    gio, gioTrucTuyen
  ]);

  return (
    <AntdModal
      title={`${truongHopThuTucContext.truongHopThuTucId ? "Sửa" : "Thêm mới"
        } trường hợp thủ tục`}
      visible={truongHopThuTucContext.truongHopThuTucModalVisible}
      handlerCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      fullsizeScrollable
      onOk={onFinish}
    >
      {renderContent}
    </AntdModal>
  );
};
