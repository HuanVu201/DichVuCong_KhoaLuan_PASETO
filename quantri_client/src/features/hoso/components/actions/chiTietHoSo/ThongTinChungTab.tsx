import { Button, Col, Form, Input, Row, Switch } from 'antd'
import { AntdButton, AntdDivider } from '@/lib/antd/components'
import { CheckOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons'

import { FormInstance } from 'antd/lib'
import { useAppSelector } from '@/lib/redux/Hooks'
import { IHoSo } from '@/features/hoso/models'
import { useEffect, useState } from 'react'
import { RenderTitle } from '@/components/common'
import { UyQuyen } from '../../UyQuyen'
import { PhuongThucNhanThongBao } from '@/features/hoso/components/actions/themMoiHoSo/PhuongThucNhanThongBao'
import { ReadOnLyTepDinhKem } from '../../ReadOnlyTepDinhKem'
import { ToKhaiDienTu } from '../../ToKhaiDienTu'
import { FORMAT_SOGIAYTO_LABEL } from '@/features/hoso/data/formData'
import { ReadOnlyThanhPhanChungThuc } from '../../ReadOnlyThanhPhanChungThuc'
import { toast } from 'react-toastify'
import { fileApi } from '@/features/file/services'
import saveAs from 'file-saver'

export const ThongTinChungTab = ({ form }: { form: FormInstance<IHoSo> }) => {
  const { data: hoSo } = useAppSelector((state) => state.hoso)
  const [btnLoading, setBtnLoading] = useState(false)
  const { datas: thanhPhanHoSos } = useAppSelector(
    (state) => state.thanhphanhoso
  )

  function getSubstringAfterGUID(url: any) {
    const regex = /[0-9a-fA-F-]{36}/; // Biểu thức chính quy cho GUID
    const match = url.match(regex);
    if (match) {
      const index = url.indexOf(match[0]);
      return url.substring(index + match[0].length + 1);
    } else {
      return null; // Không tìm thấy GUID
    }
  }

  const taiDinhKem = async () => {
    setBtnLoading(true);
    if (thanhPhanHoSos) {
      let arrDinhKem: string[] = []
      let hasDinhKem: boolean = false
      thanhPhanHoSos.forEach(item => {
        if (item.dinhKem) {
          hasDinhKem = true
          if (item.dinhKem.includes('##')) {
            arrDinhKem.push(...item.dinhKem.split('##'))
          } else {
            arrDinhKem.push(item.dinhKem)
          }
        }
      })
      if (!hasDinhKem) {
        toast.error("Không có tệp tin đính kèm!")
      } else {
        (async () => {
          arrDinhKem?.forEach((dinhKem: string) => {
            const valueGetPdf = fileApi.GetFileByte({ path: dinhKem })
            valueGetPdf.then(function (result) {
              console.log(result)
              saveAs(result.data, `${hoSo?.maHoSo}_${getSubstringAfterGUID(dinhKem)}`)
            }).catch(function (error) {
              toast.error("Lỗi lấy thông tin tệp tin đính kèm!")
              console.log(error);
            });
          })

        })()
        toast.success('Thao tác thành công!')
      }
    }

    setBtnLoading(false);

  }

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
        form.setFieldValue('bcci_phiThuHo', dangKyNoiNhan.phiThuHo)
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
                Ủy quyền nộp hồ sơ
                <Form.Item
                  name="uyQuyen"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    style={{ marginLeft: 4 }}
                  />
                </Form.Item>
              </div>
            }
          />
        </Col>
        <Col span={24}>
          <UyQuyen form={form} tinhThanhDiaBan={hoSo?.tinhThanhDiaBan || hoSo?.tinhThanhNguoiUyQuyen} quanHuyenDiaBan={hoSo?.quanHuyenNguoiUyQuyen} xaPhuongDiaBan={hoSo?.xaPhuongNguoiUyQuyen} />
        </Col>
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
              <Col md={6}>
                <Form.Item name="bcci_diaChi" label="Địa chỉ">
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="bcci_phiThuHo" label="Phí thu hộ">
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
      </>

      {hoSo?.eForm ? (
        <Col span={24}>
          <RenderTitle title="Tờ khai điện tử" />
          <ToKhaiDienTu
            form={hoSo.eForm}
            viewMode='view'
            submission={
              hoSo?.eFormData ? { data: JSON.parse(hoSo.eFormData) } : undefined
            }
            antdForm={form}
          />
        </Col>
      ) : null}
      <AntdDivider />

      <>
        <Col span={24}>
          <PhuongThucNhanThongBao />
        </Col>
        <AntdDivider />
      </>
      <>
        <Col span={24}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <RenderTitle title="Tệp tin đính kèm" />
            <Button className="buttonSearchPortal" htmlType="submit"
              disabled={false} hidden={!thanhPhanHoSos ? true : false}
              onClick={async () => taiDinhKem()}
              loading={btnLoading}
              style={{
                color: '#fff', display: 'flex', alignItems: 'center',
                backgroundColor: '#3eaa4f', marginBottom: '8px', padding: '0px 5px'
              }}
            >
              <DownloadOutlined /> Tải tất cả đính kèm
            </Button>

          </div>
          {hoSo?.laHoSoChungThuc ? (
            <ReadOnlyThanhPhanChungThuc form={form} />
          ) : (
            <ReadOnLyTepDinhKem form={form} />
          )}
        </Col>
        <AntdDivider />
      </>
    </Row>
  )
}
