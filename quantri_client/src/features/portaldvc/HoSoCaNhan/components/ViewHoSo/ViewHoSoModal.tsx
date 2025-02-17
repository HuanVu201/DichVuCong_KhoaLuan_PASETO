import {
  AntdButton,
  AntdDivider,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTab,
  AntdUpLoad,
} from '@/lib/antd/components'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { Col, Input, Row, Form, DatePicker, TabsProps, Spin } from 'antd'
import { IHoSo, ISearchHoSo } from '@/features/hoso/models'
import { SetStateAction, Suspense, useEffect, useMemo, useState } from 'react'
import { RenderTitle } from '../../../../../components/common/RenderTitle'
import { FORMAT_DATE } from '@/data'
import dayjs from 'dayjs'
import { GetHoSo } from '@/features/hoso/redux/action'
import { resetData } from '@/features/hoso/redux/slice'
import { LOAITIEPNHAN_OPTIONS } from '@/features/hoso/data/formData'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { hoSoApi } from '@/features/hoso/services'
import { SearchThanhPhanHoSo } from '@/features/thanhphanhoso/redux/action'
import { resetDatas } from '@/features/thanhphanhoso/redux/slice'
import { RegularUpload } from '@/lib/antd/components/upload/RegularUpload'
import QuaTrinhTraoDoiCongDanWrapper from '@/features/quatrinhtraodoicongdan/components/QuaTrinhTraoDoiCongDanTable'
import { useButtonActions } from '@/features/hoso/hooks/useButtonActions'
import BoSungHoSoTab from './BoSungHoSoTab'
import PhiLePhiTab from './PhiLePhiTab'
import QuaTrinhXuLyTab from './QuaTrinhXuLyTab'
import ThongTinChungTab from './ThongTinChungTab'
import { CaretDownOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'



const ViewHoSoModal = ({ maHoSo, hoSoId, closeModal, setDetailHoSoVisible }: { hoSoId: string; maHoSo: string; closeModal: () => void; setDetailHoSoVisible: React.Dispatch<SetStateAction<boolean>> }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { data: hoSo } = useAppSelector((state) => state.hoso)
  const [searchQuerys, setSearchQuerys] = useSearchParams();

  const dinhKem = Form.useWatch('dinhKemKetQua', form)
  useEffect(() => {
    dispatch(GetHoSo({
      id: hoSoId,
      returnNodeQuyTrinh: false,
    }))
  }, [hoSoId])

  useEffect(() => {
    if (hoSo) {
      form.setFieldsValue({
        ...hoSo,
        ngayNopHoSo: hoSo.ngayNopHoSo
          ? (dayjs(hoSo.ngayNopHoSo) as any)
          : undefined,
        ngayTiepNhan: hoSo.ngayTiepNhan
          ? (dayjs(hoSo.ngayTiepNhan) as any)
          : undefined,
        ngayHenTra: hoSo.ngayHenTra
          ? (dayjs(hoSo.ngayHenTra) as any)
          : undefined,
      })


    }
  }, [hoSo])

  const CHITIETHOSO_TABS: TabsProps['items'] = [
    {
      key: 'thong-tin-chung',
      label: <div style={{ fontWeight: 500 }}>Thông tin chung</div>,
      children: <ThongTinChungTab form={form} addKhoTaiLieuCaNhanVisible={true} />,
    },
    {
      key: 'qua-trinh-xu-ly',
      label: <div style={{ fontWeight: 500 }}>Quá trình xử lý</div>,
      children: <QuaTrinhXuLyTab />,
    },
    {
      key: 'thanh-toan-phi-le-phi',
      label: <div style={{ fontWeight: 500 }}>Thanh toán phí, lệ phí</div>,
      children: <PhiLePhiTab />,
    },
    {
      key: 'bo-sung-ho-so',
      label: <div style={{ fontWeight: 500 }}>Bổ sung hồ sơ</div>,
      children: <BoSungHoSoTab />,
    },
  ]
  const handleCancel = () => {
    dispatch(resetDatas())
    setDetailHoSoVisible(false)
    setSearchQuerys();
  }

  return (
    <AntdModal
      title={'Chi tiết hồ sơ: ' + maHoSo}
      className='viewDetailHoSoModal'
      visible={true}
      handlerCancel={handleCancel}
      fullsizeScrollable
      footer={
        <AntdSpace direction="horizontal">
          <AntdButton onClick={handleCancel}>Đóng</AntdButton>
        </AntdSpace>
      }
    >
      <Form
        name="ViewHoSoModal"
        layout="vertical"
        form={form}
        disabled
        initialValues={{ thuTu: 1 }}
      >
        <Form.Item name="hinhThucTra" hidden>
          <Input />
        </Form.Item>
        <div className='row formDetailHoSo'>
          <>
            <div>
              <RenderTitle title="Thông tin chi tiết" />
            </div>
            <div className='col-12 col-sm-3' >
              <Form.Item name="kenhThucHien" label="Kênh thực hiện">
                <AntdSelect options={LOAITIEPNHAN_OPTIONS} />
              </Form.Item>
            </div>
            <div className='col-12 col-sm-3' >
              <Form.Item name="ngayNopHoSo" label="Ngày nộp hồ sơ">
                <DatePicker format={FORMAT_DATE} />
              </Form.Item>
            </div>
            <div className='col-12 col-sm-3' >
              <Form.Item name="ngayTiepNhan" label="Ngày tiếp nhận">
                <DatePicker format={FORMAT_DATE} />
              </Form.Item>
            </div>
            <div className='col-12 col-sm-3' >
              <Form.Item name="ngayHenTra" label="Ngày hẹn trả">
                <DatePicker format={FORMAT_DATE} />
              </Form.Item>
            </div>
            <div className='col-12'>
              <Form.Item name="trichYeuHoSo" label="Nội dung hồ sơ">
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            {hoSo?.trangThaiHoSoId == "10" ?
              <>
                <div className='col-12' >
                  <RenderTitle title={'Kết quả xử lý'} />
                </div>
                <div className='col-12 col-sm-6' >
                  <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </div>
                <div className='col-12 col-sm-6'>
                  <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                    {hoSo?.maHoSo ? (
                      <RegularUpload
                        // kySo={KY_SO}
                        hideUpload={true}
                        dinhKem={dinhKem}
                        fieldName={'dinhKemKetQua'}
                        folderName={hoSo.maHoSo}
                        form={form}
                        addKhoTaiLieuCaNhanVisible={true}
                        maLinhVuc={hoSo.maLinhVuc}
                      />
                    ) : null}
                  </Form.Item>
                </div>
              </> : null
            }

            <AntdDivider />
          </>
          <>
            <div className='col-12' >
              <Suspense
                fallback={
                  <Spin spinning={true} rootClassName="suspense-spin"></Spin>
                }
              >
                <AntdTab items={CHITIETHOSO_TABS} centered moreIcon={<CaretDownOutlined />} />
              </Suspense>
            </div>
          </>
        </div>
      </Form>
    </AntdModal>
  )
}

export default ViewHoSoModal
