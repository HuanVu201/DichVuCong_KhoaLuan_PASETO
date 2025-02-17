import {
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    SelectProps,
    Space,
    Upload,
  } from "antd";
  import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
  import { ILogCSDLDanCuDoanhNghiep } from "../models";
  import { useEffect, useMemo, useRef, useState } from "react";
  import {
    AntdButton,
    AntdModal,
    AntdSelect,
    AntdUpLoad,
    AntdUploadPublicFile,
  } from "../../../lib/antd/components";
  import {
    AddLogCSDLDanCuDoanhNghiep,
    GetLogCSDLDanCuDoanhNghiep,
    UpdateLogCSDLDanCuDoanhNghiep,
  } from "../redux/action";
  import { useLogCSDLDanCuDoanhNghiepContext } from "../context/LogCSDLDanCuDoanhNghiepContext";
  import { resetData } from "@/features/quanlylogcsdldancudoannghiep/redux/slice";
  import {
    FORMAT_DATE,
    FORMAT_DATE_WITHOUT_SECOND,
    FORMAT_DATE_WITHOUT_TIME,
  } from "@/data";
  import dayjs from "dayjs";
  
  interface InputSearch {
    HoVaTen: string;
    Nam: string;
    NgayThangNam: string;
    SoDinhDanh: string;
    SoCMND: string;
    UpdateEntity: boolean;
    Url: string;
    MaDVC: string;
    MaTichHop: string;
    MaCanBo: string;
    MaYeuCau: string;
  }
  
  export const LogCSDLDanCuDoanhNghiepDetail = () => {
    const dispatch = useAppDispatch();
    const LogCSDLDanCuDoanhNghiepContext = useLogCSDLDanCuDoanhNghiepContext();
    const { data: logcsdldancudoanhnghiep } = useAppSelector(
      (state) => state.logcsdldancudoanhnghiep
    );
  
    const [form] = Form.useForm();
    const { publicModule: config } = useAppSelector((state) => state.config);
  
    let arrMaDonVi: any = [];
    const onFinish = async () => {
      const formData = form.getFieldsValue();
    };
    const handleCancel = () => {
      form.resetFields();
      arrMaDonVi = [];
      form.setFieldsValue({
        // maDonVi: arrMaDonVi,
        // maLinhVuc: arrMaLinhVuc,
        // maThuTuc: arrMaThuTuc
      });
      dispatch(resetData());
      LogCSDLDanCuDoanhNghiepContext.setLogCSDLDanCuDoanhNghiepModalVisible(
        false
      );
      LogCSDLDanCuDoanhNghiepContext.setLogCSDLDanCuDoanhNghiepId(undefined);
    };
    useEffect(() => {
      if (LogCSDLDanCuDoanhNghiepContext.LogCSDLDanCuDoanhNghiepId) {
        dispatch(
          GetLogCSDLDanCuDoanhNghiep(
            LogCSDLDanCuDoanhNghiepContext.LogCSDLDanCuDoanhNghiepId
          )
        );
      }
    }, [LogCSDLDanCuDoanhNghiepContext.LogCSDLDanCuDoanhNghiepId]);
  
    useEffect(() => {
      if (logcsdldancudoanhnghiep) {
        const inputSearch = JSON.parse(
          logcsdldancudoanhnghiep.input
        ) as InputSearch;
        form.setFieldsValue({
          ...logcsdldancudoanhnghiep,
          thoiGian: dayjs(logcsdldancudoanhnghiep.thoiGian)
            .format(FORMAT_DATE_WITHOUT_SECOND)
            .toString(),
          HoVaTen: inputSearch.HoVaTen,
          Nam: inputSearch.Nam,
          NgayThangNam: inputSearch.NgayThangNam,
          SoDinhDanh: inputSearch.SoDinhDanh,
          SoCMND: inputSearch.SoCMND,
          UpdateEntity: inputSearch.UpdateEntity,
          Url: inputSearch.Url,
          MaDVC: inputSearch.MaDVC,
          MaTichHop: inputSearch.MaTichHop,
          MaCanBo: inputSearch.MaCanBo,
          MaYeuCau: inputSearch.MaYeuCau,
        });
      }
    }, [logcsdldancudoanhnghiep]);
  
    return (
      <AntdModal
        title={
          LogCSDLDanCuDoanhNghiepContext.LogCSDLDanCuDoanhNghiepId
            ? "Chi tiết log tra cứu CSDL Dân cư"
            : ""
        }
        visible={
          LogCSDLDanCuDoanhNghiepContext.LogCSDLDanCuDoanhNghiepModalVisible
        }
        handlerCancel={handleCancel}
        footer={null}
        width={780}
      >
        <Form
          name="LogCSDLDanCuDoanhNghiep"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          requiredMark={
            LogCSDLDanCuDoanhNghiepContext.LogCSDLDanCuDoanhNghiepId !== null
          }
          initialValues={{ uuTien: 1 }}
        >
          <Row gutter={[8, 8]}>
            <Col md={12} span={24}>
              <Form.Item label="Tên tài khoản tra cứu" name="taiKhoan">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Thời gian tra cứu" name="thoiGian">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={24} span={24}>
              <h6>Thông tin tra cứu</h6>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Họ và tên" name="HoVaTen">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Năm sinh" name="Nam">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Số định danh" name="SoDinhDanh">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Số chứng minh nhân dân" name="SoCMND">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <AntdButton type="primary" onClick={onFinish}>
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={handleCancel}>
                Đóng
              </AntdButton>
            </Space>
          </Form.Item> */}
        </Form>
      </AntdModal>
    );
  };
  