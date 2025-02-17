import { RenderTitle } from '@/components/common'
import { ReadOnLyTepDinhKem } from '@/features/hoso/components/ReadOnlyTepDinhKem'
import { ReadOnlyThanhPhanChungThuc } from '@/features/hoso/components/ReadOnlyThanhPhanChungThuc'
import { UyQuyen } from '@/features/hoso/components/UyQuyen'
import { FORMAT_SOGIAYTO_LABEL } from '@/features/hoso/data/formData'
import { IHoSo } from '@/features/hoso/models'
import { AntdDivider } from '@/lib/antd/components'
import { useAppSelector } from '@/lib/redux/Hooks'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Col, Form, FormInstance, Input, Row, Switch } from 'antd'
import React, { useEffect } from 'react'
import { ReadOnLyTepDinhKemPortal } from './ReadOnLyTepDinhKemPortal'

function ThongTinChungTab({ form, addKhoTaiLieuCaNhanVisible = false }: { form: FormInstance<IHoSo>, addKhoTaiLieuCaNhanVisible: boolean }) {
  const { data: hoSo } = useAppSelector((state) => state.hoso)
  const { datas: thanhPhanHoSos } = useAppSelector(
    (state) => state.thanhphanhoso
  )
  const hinhThucTra = Form.useWatch('hinhThucTra', form)
  const loaiDoiTuong: string = Form.useWatch('loaiDoiTuong', form)
  const isLoaiDoiTuongCongDan = loaiDoiTuong === 'Công dân'
  useEffect(() => {
    if (hinhThucTra === '1' && hoSo) {
      const dangKyNoiNhan: any = hoSo.dangKyNhanHoSoQuaBCCIData
        ? JSON.parse(hoSo.dangKyNhanHoSoQuaBCCIData)
        : undefined
      if (dangKyNoiNhan) {
        form.setFieldValue('bcci_hoVaTen', dangKyNoiNhan.hoVaTen)
        form.setFieldValue('bcci_soDienThoai', dangKyNoiNhan.soDienThoai)
        form.setFieldValue('bcci_email', dangKyNoiNhan.email)
        form.setFieldValue('bcci_diaChi', dangKyNoiNhan.diaChi)
        form.setFieldValue('bcci_tinhThanh', dangKyNoiNhan.tinhThanh)
        form.setFieldValue('bcci_quanHuyen', dangKyNoiNhan.quanHuyen)
        form.setFieldValue('bcci_xaPhuong', dangKyNoiNhan.xaPhuong)
        form.setFieldValue('bcci_tenTinhThanh', dangKyNoiNhan.tenTinhThanh)
        form.setFieldValue('bcci_tenQuanHuyen', dangKyNoiNhan.tenQuanHuyen)
        form.setFieldValue('bcci_tenXaPhuong', dangKyNoiNhan.tenXaPhuong)
        // form.setFieldValue("bcci_ghiChu", dangKyNoiNhan.ghiChu)
      }
    }
  }, [hinhThucTra, hoSo])
  return (
    <Row gutter={8}>
      <>
        <Col span={24}>
          <RenderTitle title={'Định danh chủ hồ sơ'} />
        </Col>
        <Col md={6} span={24}>
          <Form.Item name="loaiDoiTuong" label="Loại chủ hồ sơ">
            <Input />
          </Form.Item>
        </Col>
        <Col md={6} span={24}>
          <Form.Item
            name="soGiayToChuHoSo"
            label={(FORMAT_SOGIAYTO_LABEL as any)[loaiDoiTuong]}
          >
            <Input placeholder="Nhập số căn cước công dân" />
          </Form.Item>
        </Col>
        <Col md={6} span={24}>
          <Form.Item name="chuHoSo" label="Họ và tên">
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
        </Col>
        {isLoaiDoiTuongCongDan ? (
          <Col md={6} span={24}>
            <Form.Item name="ngaySinhChuHoSo" label="Năm sinh">
              <Input placeholder="Nhập năm sinh VD:2000" />
            </Form.Item>
          </Col>
        ) : null}

        <Col md={6} span={24}>
          <Form.Item name="soDienThoaiChuHoSo" label="Số điện thoại">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
        <Col md={6} span={24}>
          <Form.Item name="emailChuHoSo" label="Email">
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>
        </Col>
        <Col md={isLoaiDoiTuongCongDan ? 12 : 18} span={24}>
          <Form.Item name="diaChiChuHoSo" label="Địa chỉ">
            <Input.TextArea rows={1} placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Col>
        <AntdDivider />
      </>
      <>
        <Col span={24}>
          <RenderTitle
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                Đăng ký nhận kết quả hồ sơ qua BCCI
                <Switch
                  checked={hinhThucTra === '1'}
                  style={{ marginLeft: 4 }}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </div>
            }
          />
          {hinhThucTra === '1' ? (
            <Row gutter={[8, 0]}>
              <Col span={6}>
                <Form.Item name="bcci_hoVaTen" label="Họ và tên">
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="bcci_soDienThoai" label="Số điện thoại">
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="bcci_email" label="Email">
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item name="bcci_diaChi" label="Địa chỉ">
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="bcci_tenTinhThanh" label="Tỉnh thành">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="bcci_tenQuanHuyen" label="Quận/Huyện">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="bcci_tenXaPhuong" label="Xã/Phường">
                  <Input />
                </Form.Item>
              </Col>
              {/* <Col md={6} >
                <Form.Item name="bcci_ghiChu" label="Ghi chú">
                    <Input.TextArea rows={2} />
                </Form.Item>
            </Col> */}
            </Row>
          ) : null}
        </Col>
        <Col span={24}>
          <UyQuyen form={form} />
        </Col>
      </>
      <AntdDivider />
      <>
        <Col span={24}>
          <RenderTitle title="Tệp tin đính kèm" />
          {hoSo?.laHoSoChungThuc ? (
            <ReadOnlyThanhPhanChungThuc form={form} />
          ) : (
            <ReadOnLyTepDinhKemPortal form={form} addKhoTaiLieuCaNhanVisible={addKhoTaiLieuCaNhanVisible} maLinhVuc={hoSo?.maLinhVuc} />
          )}
        </Col>
        <AntdDivider />
      </>
    </Row>
  )
}

export default ThongTinChungTab