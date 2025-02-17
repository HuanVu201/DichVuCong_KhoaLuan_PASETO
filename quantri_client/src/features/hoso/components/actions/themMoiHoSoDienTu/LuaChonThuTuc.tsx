import { IHoSo } from '@/features/hoso/models'
import { SearchThuTuc } from '@/features/thutuc/redux/action'
import { useTruongHopThuTucColumn } from '@/features/hoso/hooks/useTruongHopThuTucColumn'
import { ISearchTruongHopThuTuc } from '@/features/truonghopthutuc/models'
import {
  GetDuLieuThemHoSo,
  SearchTruongHopThuTuc,
} from '@/features/truonghopthutuc/redux/action'
import { AntdDivider, AntdSelect, AntdTable } from '@/lib/antd/components'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  SelectProps,
  Typography,
} from 'antd'
import {
  ElementRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import dayjs from 'dayjs'
import { filterOptions, filterOptionsWithTitle } from '@/utils/select'
import {
  LOAITIEPNHAN_FORMNOPTRUCTIEP,
  LOAITIEPNHAN_OPTIONS,
} from '@/features/hoso/data/formData'
import {
  resetDatas,
  resetDuLieuThemHoSo,
} from '@/features/truonghopthutuc/redux/slice'
import { RenderTitle } from '../../../../../components/common/RenderTitle'
import { FORMAT_DATE } from '@/data'
import { INPUT_RULES } from '@/features/hoso/data/formRules'
import { ISearchThuTuc, IThuTuc } from '@/features/thutuc/models'
import { Select } from 'antd/lib'
import { MUCDO_THUTUC } from '@/features/thutuc/data'
import { ISearchDanhMucDiaBan } from '@/features/danhmucdiaban/models'
import { danhMucDiaBanApi } from '@/features/danhmucdiaban/services'
import { DiaBanChuHoSo } from '@/features/portaldvc/NopHoSoTrucTuyen/components'
import { DiaBanPhatSinhHoSo } from '@/features/hoso/components/DiaBanPhatSinhHoSo'
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import { lazy } from '@/utils/lazyLoading'
import DetailThuTucModal from '../themMoiHoSo/DetailThuTucModal'


export const LuaChonThuTucThemMoiHoSoDienTuWrapper = ({
  form,
  extraSearchThuTuc,
}: {
  extraSearchThuTuc?: ISearchThuTuc
  form: FormInstance<IHoSo>
}) => {
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc)
  const { datas: truongHopThuTucs, duLieuThemHoSo } = useAppSelector(
    (state) => state.truonghopthutuc
  )
  const { data: user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [filteredThuTucs, setFilteredThuTucs] = useState<IThuTuc[]>()
  const [detailThuTucModalVisible, setDetailThuTucModalVisible] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useState<ISearchTruongHopThuTuc>({
    pageNumber: 1,
    pageSize: 100,
    reFetch: true,
    byUserOfficeCode: true,
  })
  const [selectedTruongHop, setSelectedTruongHop] = useState<string>()
  const [selectedThuTuc, setSelectedThuTuc] = useState<string>()
  const columns = useTruongHopThuTucColumn()
  const donViPhiDiaGioi = Form.useWatch("donViPhiDiaGioi", form)
  const thuTucId = useMemo(() => {
    if(thuTucs){
      const thuTuc =  thuTucs.find(x => x.maTTHC == searchParams.thuTucId)
      if(thuTuc) {
        return thuTuc.id
      }
    }
  }, [thuTucs, searchParams.thuTucId])

  useEffect(() => {
    if(extraSearchThuTuc?.laPhiDiaGioi){
      if (donViPhiDiaGioi) {
        dispatch(
          SearchThuTuc({
            pageNumber: 1,
            pageSize: 300,
            reFetch: true,
            donVi: donViPhiDiaGioi,
            laThuTucChungThuc: false,
            suDung: true,
            ...extraSearchThuTuc,
          })
        )
      }
    } else {
      if (thuTucs === undefined && user !== undefined) {
        dispatch(
          SearchThuTuc({
            pageNumber: 1,
            pageSize: 300,
            reFetch: true,
            laThuTucChungThuc: false,
            suDung: true,
            ...extraSearchThuTuc,
          })
        )
      }
    }
    return () => {
      dispatch(resetDuLieuThemHoSo())
      dispatch(resetDatas())
      form.setFieldValue('thuTucId', undefined)
    }
  }, [user, donViPhiDiaGioi])

  useEffect(() => {
    if (duLieuThemHoSo && duLieuThemHoSo?.truongHopthuTuc) {
      const truongHopThuTuc = duLieuThemHoSo.truongHopthuTuc

      form.setFieldValue(
        'ngayTiepNhan',
        duLieuThemHoSo.ngayTiepNhan ? dayjs(duLieuThemHoSo.ngayTiepNhan) : null
      )
      form.setFieldValue(
        'ngayHenTra',
        duLieuThemHoSo.ngayHenTra ? dayjs(duLieuThemHoSo.ngayHenTra) : null
      )
      form.setFieldValue('truongHopId', truongHopThuTuc.id)
      form.setFieldValue('maTruongHop', truongHopThuTuc.ma)
      form.setFieldValue('tenTruongHop', truongHopThuTuc.ten)
      form.setFieldValue('thoiHanBuocXuLy', truongHopThuTuc.thoiGianThucHien)
      form.setFieldValue(
        'loaiThoiHanBuocXuLy',
        truongHopThuTuc.loaiThoiGianThucHien
      )
    } else {
      form.setFieldValue('ngayTiepNhan', undefined)
      form.setFieldValue('ngayHenTra', undefined)
      form.setFieldValue('truongHopId', undefined)
      form.setFieldValue('maTruongHop', undefined)
      form.setFieldValue('tenTruongHop', undefined)
      form.setFieldValue('thoiHanBuocXuLy', undefined)
      form.setFieldValue('loaiThoiHanBuocXuLy', undefined)
    }
  }, [duLieuThemHoSo?.truongHopthuTuc])

  useEffect(() => {
    if (selectedTruongHop) {
      dispatch(
        GetDuLieuThemHoSo({
          thuTucId: form.getFieldValue('maTTHC'),
          truongHopId: selectedTruongHop,
          returnPhiLePhi: true,
          returnDonVi: true,
          donViId: user?.officeCode
        })
      )
    }
  }, [selectedTruongHop])

  useEffect(() => {
    if (truongHopThuTucs?.length) {
      setSelectedTruongHop(truongHopThuTucs[0].ma)
    }
    return () => {
      setSelectedTruongHop(undefined)
    }
  }, [truongHopThuTucs])
  const linhVucs = useMemo(() => {
    return [...new Map(thuTucs?.map(item =>
      [item.maLinhVucChinh, item])).values()]
  }, [thuTucs])

  useEffect(() => {
    if (thuTucs) {
      setFilteredThuTucs(thuTucs)
    }
    if (thuTucs && thuTucs?.length == 1) {
      const thuTuc = thuTucs[0]
      setSelectedThuTuc(thuTuc.maTTHC)
      form.setFieldValue('maTTHC', thuTuc.maTTHC)
      form.setFieldValue('tenTTHC', thuTuc.tenTTHC)
      form.setFieldValue('trichYeuHoSo', thuTuc.tenTTHC)
      console.log(thuTucs);
      console.log(thuTuc);
      
      setSearchParams(
        (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: thuTuc.maTTHC })
      )
    }
  }, [thuTucs])

  const onChangeThuTuc = (maTTHC: string, attrs: any) => {
    dispatch(resetDuLieuThemHoSo())
    setSelectedTruongHop(undefined)
    const kenhThucHien = attrs['data-kenhthuchien']
    const maLinhVucChinh = attrs['data-malinhvucchinh']
    const trichYeuHoSo = attrs['data-trichyeuhoso']
    form.setFieldValue('kenhThucHien', '1')

    if (thuTucs?.length && thuTucs?.length == 1) {
      setSelectedThuTuc(maTTHC)
    }
    if (!maTTHC) {
      setSearchParams(
        (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: undefined })
      )
      return
    }
    form.setFieldValue('maTTHC', maTTHC)
    form.setFieldValue('tenTTHC', trichYeuHoSo)
    form.setFieldValue('trichYeuHoSo', trichYeuHoSo)
    form.setFieldValue("maLinhVuc", maLinhVucChinh)
    if (maTTHC) {
      setFilteredThuTucs(maLinhVucChinh ? thuTucs?.filter(x => x.maLinhVucChinh == maLinhVucChinh) : thuTucs)
    }

    setSearchParams(
      (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: maTTHC })
    )
  }
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedTruongHop(selectedRowKeys[0] as string)
    },
    selectedRowKeys: [selectedTruongHop] as any,
  }
  const onChangeLinhVuc = (value: string) => {
    form.resetFields(["thuTucId"])
    if (linhVucs.length > 1) {
      setSearchParams(
        (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: undefined })
      )
      dispatch(resetDuLieuThemHoSo())
    }
    setFilteredThuTucs(!value ? thuTucs : thuTucs?.filter(x => x.maLinhVucChinh == value))
  }

  const viewDetailThuTucModal = () => {
    setDetailThuTucModalVisible(true)
  }
  return (
    <>
      <>
        <RenderTitle title="Lựa chọn lĩnh vực/thủ tục" />

        <Form.Item name="maLinhVuc" label="Chọn lĩnh vực">
          {thuTucs?.length && thuTucs.length > 0 ?
            <AntdSelect style={{ width: "35%" }}
              defaultValue={thuTucs?.length && thuTucs.length == 1
                ? thuTucs[0].maLinhVucChinh
                : undefined}
              generateOptions={{ model: linhVucs, value: "maLinhVucChinh", label: "linhVucChinh" }} allowClear showSearch onChange={onChangeLinhVuc} /> : null}
        </Form.Item>
        <Form.Item name="thuTucId" label="Chọn thủ tục">
          {thuTucs?.length && thuTucs.length > 0 ? <AntdSelect key="1" style={{ width: "100%" }} defaultValue={thuTucs?.length && thuTucs.length == 1
            ? thuTucs[0].maTTHC
            : undefined} filterOption={filterOptionsWithTitle} allowClear showSearch onChange={onChangeThuTuc}  >
            {filteredThuTucs?.map((thutuc, idx) => {
              const title = `${thutuc.tenTTHC}`
              const mucDo = thutuc.mucDo ? " - " + MUCDO_THUTUC[thutuc.mucDo] : undefined
              return <Select.Option title={title} key={idx} value={thutuc.maTTHC} data-kenhthuchien={"1"} data-malinhvucchinh={thutuc.maLinhVucChinh} data-trichyeuhoso={thutuc.tenTTHC}>
                <span style={{ fontSize: "1rem" }}>{title} <span style={{ color: '#ff4d4f' }}>{mucDo ? mucDo : ''}</span></span>
              </Select.Option>
            })}
          </AntdSelect> : null}
        </Form.Item>
      </>
      {searchParams.thuTucId ? (
        <>
          <>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <RenderTitle title="Lựa chọn trường hợp" />
              <Button className="buttonSearchPortal" 
                onClick={() => viewDetailThuTucModal()}
                // loading={btnLoading}
                style={{
                  color: '#fff', display: 'flex', alignItems: 'center',
                  backgroundColor: '#3eaa4f', marginBottom: '8px', padding: '0px 5px'
                }}
              >
                <EyeOutlined /> Xem chi tiết thủ tục
              </Button>
              {detailThuTucModalVisible ? <DetailThuTucModal
                thuTucId={thuTucId}
                detailThuTucModalVisible={detailThuTucModalVisible}
                setDetailThuTucModalVisible={setDetailThuTucModalVisible}
              /> : null}
              
            </div>

            <AntdTable
              style={{ marginBottom: 12 }}
              rowKey={'ma'}
              columns={columns}
              dataSource={truongHopThuTucs}
              pagination={false}
              rowSelection={{ type: 'radio', ...rowSelection }}
              onSearch={(params) => dispatch(SearchTruongHopThuTuc(params))}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            {duLieuThemHoSo?.truongHopthuTuc ? (
              <>
                <RenderTitle title="Thông tin chung" />
                <Row gutter={[8, 0]}>
                  <Col md={6} span={24}>
                    {/* ? */}
                    <Form.Item name="kenhThucHien" label="Loại tiếp nhận">
                      <AntdSelect
                        options={LOAITIEPNHAN_FORMNOPTRUCTIEP}
                        showSearch
                        allowClear
                        filterOption={filterOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={6} span={24}>
                    <Form.Item
                      name="ngayTiepNhan"
                      label="Ngày tiếp nhận"
                      rules={INPUT_RULES.ngayTiepNhan}
                    >
                      <DatePicker disabled format={FORMAT_DATE} />
                    </Form.Item>
                  </Col>
                  <Col md={6} span={24}>
                    <Form.Item
                      name="ngayHenTra"
                      label="Ngày hẹn trả"
                      tooltip={duLieuThemHoSo?.truongHopthuTuc.khongCoNgayHenTra == true ? "Thủ tục không có ngày hẹn trả" : undefined}
                      rules={duLieuThemHoSo?.truongHopthuTuc.khongCoNgayHenTra == true ? undefined : INPUT_RULES.ngayHenTra}
                    >
                      <DatePicker disabled format={FORMAT_DATE} />
                    </Form.Item>
                  </Col>
                  <Col md={6} span={24}>
                    <Form.Item name="soBoHoSo" label="Số bộ hồ sơ">
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    {/* ? */}
                    <Form.Item name="trichYeuHoSo" label="Nội dung hồ sơ">
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </Col>
                  <DiaBanPhatSinhHoSo form={form} tinhThanhDiaBan={duLieuThemHoSo.tinhThanhDiaBan} quanHuyenDiaBan={duLieuThemHoSo.quanHuyenDiaBan} xaPhuongDiaBan={duLieuThemHoSo.xaPhuongDiaBan} mergeStr={true} />
                </Row>
              </>
            ) : null}
            <AntdDivider />
          </>
        </>
      ) : null}
    </>
  )
}
