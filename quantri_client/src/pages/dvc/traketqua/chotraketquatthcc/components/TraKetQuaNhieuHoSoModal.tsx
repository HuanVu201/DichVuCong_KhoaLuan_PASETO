import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  AntdModal,
  AntdSelect,
  AntdUploadPublicFile,
} from "@/lib/antd/components";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_VERSION, CURRENTTIME, UPLOADFILE_ENDPOINT } from "@/data";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";
import { hoSoApi } from "@/features/hoso/services";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { Signotec, SignotecRef } from "@/lib/signotec/Signotec";
import axiosInstance from "@/lib/axios";
import { IResult } from "@/models";
import { base64DataURLToArrayBuffer } from "@/utils/common";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { loaiNguoiNhanKetQuas } from "./ChoTraKetQuaTTHCCTable";

const TraKetQuaNhieuHoSoModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
  const buttonActionContext = useButtonActionContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IHoSo>();
  const [form] = Form.useForm<IHoSo>();
  const dispatch = useAppDispatch();
  let signotecRef = useRef<SignotecRef | null>(null);
  const dinhKem = Form.useWatch("urlDinhKem", form);
  const [usingSignotec, setUsingSignotec] = useState<boolean>(false)
  const { publicModule: config } = useAppSelector(state => state.config)

  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'using-signotec' && item.content == '1') {
        setUsingSignotec(true)
      }
    })
  }, [config])

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (buttonActionContext.selectedHoSos.length) {
        const res = await hoSoApi.GetInfoChuHoSo({
          id: buttonActionContext.selectedHoSos[0] as string,
        });
        const hoSo = res.data;
        if (hoSo) {
          setLoading(false);
          setData(hoSo);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.uyQuyen) {
        form.setFieldValue('loaiNguoiNhanKetQua', 'nguoiDuocUyQuyen')
        form.setFieldValue('hoTenNguoiNhanKetQua', data.nguoiUyQuyen)
      } else if (data.chuHoSo) {
        form.setFieldValue('loaiNguoiNhanKetQua', 'chuHoSo')
        form.setFieldValue('hoTenNguoiNhanKetQua', data.chuHoSo)
      }
    }
  }, [data])


  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  };

  const onOk = async (dghl: boolean = false) => {
    setLoading(true);
    let urlChuKyCongDan: string = '';

    let base64: string = ''
    if (usingSignotec)
      base64 = await signotecRef.current?.confirmSignture();

    if (!form.getFieldValue("loaiNguoiNhanKetQua")) {
      toast.error("Chọn đối tượng nhận kết quả!");
      setLoading(false);
      return;
    }
    if (!form.getFieldValue("hoTenNguoiNhanKetQua")) {
      toast.error("Nhập người nhận nhận kết quả!");
      setLoading(false);
      return;
    }
    if (base64 && usingSignotec) {
      const blobImage: Blob = base64ToBlob(base64);
      const bodyFormData = new FormData();
      bodyFormData.append("Files", blobImage!, `Signotec.png`);
      bodyFormData.append("FolderName", `SignotecTraKetQua`);
      const resCreat = await axiosInstance.post<IResult<any>>(
        API_VERSION + UPLOADFILE_ENDPOINT,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resCreat) {
        urlChuKyCongDan = resCreat.data.data;
      } else {
        toast.error("Có lỗi trong quá trình ký điện tử!");
        setLoading(false);
        return;
      }
    }


    try {
      var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
      const res = await hoSoApi.UpdateTraKetQuaHCC({
        ids: sltHoSos,
        loaiNguoiNhanKetQua: form.getFieldValue("loaiNguoiNhanKetQua"),
        hoTenNguoiNhanKetQua: form.getFieldValue("hoTenNguoiNhanKetQua"),
        dinhKemNhanKetQua: dinhKem,
        chuKyNguoiNhanKetQua: urlChuKyCongDan,

      });
      if (res.status == 200) {
        toast.success("Thao tác thành công!");
        buttonActionContext.setTraKetQuaNhieuHoSoModalVisible(false);
        setSearchHoSoParams((curr) => ({ ...curr }))
        setLoading(false);
        if (dghl) {
          if (!data?.nguoiNhapDanhGiaText)
            buttonActionContext.setTraKetQuaVaDanhGiaHaiLongModalVisible(dghl);
          else {
            toast.error('Hồ sơ đã được đánh giá')
          }
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Thao tác thất bại!")
      // buttonActionContext.setTraKetQuaNhieuHoSoModalVisible(false);
    }
    setLoading(false)

  };

  const handleChangeLoaiNguoiNhan = (value: string) => {
    if (value == "chuHoSo") {
      form.setFieldValue("hoTenNguoiNhanKetQua", data?.chuHoSo);
    }
    if (value == "nguoiDuocUyQuyen") {
      form.setFieldValue("hoTenNguoiNhanKetQua", data?.nguoiUyQuyen);
    }
    if (value == "canBoBuuDien") {
      form.setFieldValue("hoTenNguoiNhanKetQua", "Cán bộ bưu điện");
    }
    if (value == "nguoiKhac") {
      form.setFieldValue("hoTenNguoiNhanKetQua", null);
    }
  };

  const handlerCancel = () => {
    signotecRef.current = null;
    buttonActionContext.setSelectedHoSos([]);
    buttonActionContext.setTraKetQuaNhieuHoSoModalVisible(false);
  };

  return (
    <AntdModal
      visible={true}
      title={`Trả kết quả nhiều hồ sơ (${buttonActionContext.selectedHoSos.length} bộ)`}
      width={700}
      handlerCancel={handlerCancel}
      footer={[
        <Button type="primary" onClick={() => onOk(false)}>
          Trả kết quả
        </Button>,
        <Button type="primary" hidden={!data?.nguoiNhapDanhGiaText ? false : true}
          onClick={() =>
            onOk(true)
          }>
          Trả kết quả và đánh giá hài lòng
        </Button>,
        <Button key="back" onClick={handlerCancel}>
          Hủy
        </Button>,
      ]}
    >
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
        }
      >
        <Form
          name="TraKetQuaHCC"
          layout="vertical"
          form={form}
          style={{ marginBottom: "30px" }}
        >
          <Row gutter={[8, 8]}>
            <Col span={24} md={12}>
              <Form.Item
                label="Người nhận kết quả là"
                name="loaiNguoiNhanKetQua"
                required
              >
                <AntdSelect
                  placeholder={"Chọn người nhận kết quả"}
                  virtual={true}
                  onChange={handleChangeLoaiNguoiNhan}
                  generateOptions={{
                    model: loaiNguoiNhanKetQuas,
                    label: "label",
                    value: "value",
                  }}
                />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Họ tên" name="hoTenNguoiNhanKetQua" required>
                <Input placeholder="Tên người nhận" />
              </Form.Item>
            </Col>
            <Col md={24} span={24}>
              <Form.Item label="Tệp đính kèm" name="urlDinhKem">
                <RegularUpload
                  form={form}
                  fieldName="urlDinhKem"
                  folderName={`TraKetQuaHcc_${data?.maHoSo}`}
                  dinhKem={dinhKem}
                />
              </Form.Item>
            </Col>
          </Row>

          {usingSignotec ? <Signotec ref={signotecRef} /> : null}
        </Form>
      </Spin>
    </AntdModal>
  );
};

export default TraKetQuaNhieuHoSoModal;
