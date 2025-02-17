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
import { Suspense, useEffect, useMemo } from 'react'
import { RenderTitle } from '../../../../../components/common/RenderTitle'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'
import { ThongTinChungTab } from './ThongTinChungTab'
import dayjs from 'dayjs'
import { GetHoSo } from '@/features/hoso/redux/action'
import { resetData } from '@/features/hoso/redux/slice'
import { QuaTrinhXuLy } from './QuaTrinhXuLy'
import { LOAITIEPNHAN_OPTIONS } from '@/features/hoso/data/formData'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { BoSungHoSo } from './BoSungHoSo'
import { hoSoApi } from '@/features/hoso/services'
import { SearchThanhPhanHoSo } from '@/features/thanhphanhoso/redux/action'
import { resetDatas } from '@/features/thanhphanhoso/redux/slice'
import { PhiLePhi } from './PhiLePhi'
import { RegularUpload } from '@/lib/antd/components/upload/RegularUpload'
import QuaTrinhTraoDoiCongDanWrapper from '@/features/quatrinhtraodoicongdan/components/QuaTrinhTraoDoiCongDanTable'
import { useButtonActions } from '@/features/hoso/hooks/useButtonActions'
import { KetQuaLienQuanWrapper } from '@/features/ketqualienquan/components/KetQuaLienQuan'
import { lazy } from '@/utils/lazyLoading'
import { DiaBanPhatSinhHoSoReadOnly } from '../../DiaBanPhatSinhHoSoReadOnly'
const ThongTinTraKetQuaHCCModalLazy = lazy(
  () => import("../thongTinTraKetQuaHcc/ThongTinTraKetQuaHcc")
);

const QuyTrinhXuLyLazy = lazy(() => import('./QuyTrinhXuLy'))

const ChiTietHoSoModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams?: React.Dispatch<React.SetStateAction<ISearchHoSo>>
}) => {
  const dispatch = useAppDispatch()
  const { data: hoSo } = useAppSelector((state) => state.hoso)

  // const {actionInModals} = useAppSelector(state => state.screenaction)
  const buttonActionContext = useButtonActionContext()
  const { buttons } = useButtonActions({
    filterActionBy: (action) => action.showInModal == true,
  })
  const [form] = Form.useForm<IHoSo>()
  const dinhKem = Form.useWatch('dinhKemKetQua', form)
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(
        GetHoSo({
          id: buttonActionContext.selectedHoSos[0] as string,
          returnNodeQuyTrinh: true,
        })
      )
    }
  }, [buttonActionContext.selectedHoSos])
  useEffect(() => {
    if (hoSo) {
      form.setFieldsValue({
        ...hoSo,
        ngayTiepNhan: hoSo.ngayTiepNhan
          ? (dayjs(hoSo.ngayTiepNhan) as any)
          : undefined,
        ngayHenTra: hoSo.ngayHenTra
          ? (dayjs(hoSo.ngayHenTra) as any)
          : undefined,
        ngayBanHanhKetQua: hoSo.ngayBanHanhKetQua
          ? (dayjs(hoSo.ngayBanHanhKetQua) as any)
          : undefined,
        ngayKyKetQua: hoSo.ngayKyKetQua
          ? (dayjs(hoSo.ngayKyKetQua) as any)
          : undefined,
        ngayNopHoSo: hoSo.ngayNopHoSo
          ? (dayjs(hoSo.ngayNopHoSo) as any)
          : undefined,
        ngayKetThucXuLy: hoSo.ngayKetThucXuLy
          ? (dayjs(hoSo.ngayKetThucXuLy) as any)
          : undefined,
        ngayTra: hoSo.ngayTra
          ? (dayjs(hoSo.ngayTra) as any)
          : undefined,
      })

      // if(hoSo.eFormData){
      //     window.objDataCSDLDanCu = JSON.parse(hoSo.eFormData)
      // }
    }
  }, [hoSo])

  const CHITIETHOSO_TABS: TabsProps['items'] = [
    {
      key: 'thong-tin-chung',
      label: <div style={{ fontWeight: 500 }}>Thông tin chung</div>,
      children: <ThongTinChungTab form={form} />,
    },
    {
      key: 'qua-trinh-xu-ly',
      label: <div style={{ fontWeight: 500 }}>Quá trình xử lý</div>,
      children: <QuaTrinhXuLy />,
    },
    {
      key: "qua-trinh-trao-doi-voi-cong-dan",
      label: <div style={{ fontWeight: 500 }}> Quá trình trao đổi với công dân</div>,
      children: <QuaTrinhTraoDoiCongDanWrapper />,
    },
    {
      key: 'thanh-toan-phi-le-phi',
      label: <div style={{ fontWeight: 500 }}>Thanh toán phí, lệ phí</div>,
      children: <PhiLePhi />,
    },
    {
      key: 'bo-sung-ho-so',
      label: <div style={{ fontWeight: 500 }}>Bổ sung hồ sơ</div>,
      children: <BoSungHoSo />,
    },
    {
      key: 'quy-trinh-xu-ly',
      label: <div style={{ fontWeight: 500 }}>Quy trình xử lý</div>,
      children: <QuyTrinhXuLyLazy />,
    },
    {
      key: 'thong-tin-tra-ket-qua',
      label: hoSo?.trangThaiHoSoId == '10' ? <div style={{ fontWeight: 500 }}>Thông tin trả kết quả</div> : <></>,
      children: <ThongTinTraKetQuaHCCModalLazy />,
    },
  ]
  const handleCancel = () => {
    form.resetFields()
    dispatch(resetData())
    dispatch(resetDatas())
    buttonActionContext.setChiTietHoSoModalVisible(false)
    // buttonActionContext.setSelectedHoSos([])
  }



  // const onOk = async () => {
  //     if(buttonActionContext.selectedHoSos.length){
  //         const res = await hoSoApi.ChuyenBuocNhanhHoSo({id: buttonActionContext.selectedHoSos[0] as string})
  //         if(res.data.succeeded){
  //             setSearchHoSoParams ? setSearchHoSoParams((curr) => ({...curr})) : null
  //             handleCancel()
  //         }
  //     }
  // }
  return (
    <AntdModal
      title={'Chi tiết hồ sơ ' + hoSo?.maHoSo}
      visible={true}
      handlerCancel={handleCancel}
      fullsizeScrollable
      footer={
        <AntdSpace direction="horizontal">
          {buttons}
          <AntdButton onClick={handleCancel}>Đóng</AntdButton>
          {/* {actionInModals?.map((action, index) =>
                <AntdButton type="primary" key={index}>{action.ten}</AntdButton>
            )} */}
        </AntdSpace>
      }
    >
      <Form
        name="ChiTietHoSoModal"
        layout="vertical"
        form={form}
        disabled
        initialValues={{ thuTu: 1 }}
      >
        <Form.Item name="hinhThucTra" hidden>
          <Input />
        </Form.Item>

        <Row gutter={8}>
          <>
            <Col span={24}>
              <RenderTitle title="Thông tin chi tiết" />
            </Col>
            <Col span={4}>
              <Form.Item name="kenhThucHien" label="Kênh thực hiện">
                <AntdSelect options={LOAITIEPNHAN_OPTIONS} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="ngayNopHoSo" label="Ngày nộp hồ sơ">
                <DatePicker format={FORMAT_DATE} />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item name="ngayTiepNhan" label="Ngày tiếp nhận">
                <DatePicker format={FORMAT_DATE} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="ngayHenTra" label="Ngày hẹn trả">
                <DatePicker format={FORMAT_DATE} />
              </Form.Item>
            </Col>
            {hoSo?.ngayKetThucXuLy ?
              <Col span={4}>
                <Form.Item name="ngayKetThucXuLy" label="Ngày kết thúc xử lý">
                  <DatePicker format={FORMAT_DATE} />
                </Form.Item>
              </Col> : null
            }
            {hoSo?.ngayTra ?
              <Col span={4}>
                <Form.Item name="ngayTra" label="Ngày trả">
                  <DatePicker format={FORMAT_DATE} />
                </Form.Item>
              </Col> : null

            }

            <Col span={24}>
              <Form.Item name="trichYeuHoSo" label="Nội dung hồ sơ">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="tenDonVi" label="Đơn vị tiếp nhận">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="tenTTHC" label="Tên thủ tục">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tenTruongHopThuTuc" label="Trường hợp thủ tục">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="thoiGianThucHien" label="Thời hạn giải quyết">
                <div>
                  <Input value={hoSo ? hoSo.thoiGianThucHienHoSo / 8 + ' ' + hoSo.loaiThoiGianThucHien : ''} disabled={true} style={{ width: '300px' }} />
                </div>
              </Form.Item>
            </Col>
            <>
              <DiaBanPhatSinhHoSoReadOnly tenDiaBan={hoSo?.tenDiaBan} form={form} />
            </>

            <Col span={24}>
              <RenderTitle title={'Kết quả xử lý'} />
            </Col>
            <Col span={24} md={6}>
              <Form.Item name="loaiVanBanKetQua" label="Loại văn bản">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} md={6}>
              <Form.Item name="soKyHieuKetQua" label="Số ký hiệu">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} md={6}>
              <Form.Item name="nguoiKyKetQua" label="Người ký">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} md={6}>
              <Form.Item name="coQuanBanHanhKetQua" label="Cơ quan ban hành">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                {/* <AntdUpLoad editing = {buttonActionContext.chiTietHoSoModalVisible !== undefined} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                {/* <AntdUpLoad editing={true} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                {hoSo?.maHoSo ? (
                  <RegularUpload
                    // kySo={KY_SO}
                    hideUpload={true}
                    dinhKem={dinhKem}
                    fieldName={'dinhKemKetQua'}
                    folderName={hoSo.maHoSo}
                    form={form}
                  />
                ) : null}
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item name="ngayBanHanhKetQua" label="Ngày ban hành">
                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item name="ngayKyKetQua" label="Ngày ký">
                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
              </Form.Item>
            </Col>

            <AntdDivider />
          </>
          <Col span={24}>
            <RenderTitle title="Kết quả liên quan (nếu có)" />
            {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo} readOnlyMode={true} /> : null}
          </Col>
          <>
            <Col span={24}>
              <Suspense
                fallback={
                  <Spin spinning={true} rootClassName="suspense-spin"></Spin>
                }
              >
                <AntdTab items={CHITIETHOSO_TABS} centered />
              </Suspense>
            </Col>
          </>
        </Row>
      </Form>
    </AntdModal>
  )
}

export default ChiTietHoSoModal
