import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Form,
  FormProps,
  Radio,
  Select,
  Space,
  StepProps,
  Tag,
  Typography,
} from 'antd'
import {
  AntdButton,
  AntdDivider,
  AntdSelect,
  AntdStep,
} from '@/lib/antd/components'
import { ISearchDanhMucThuTucPortal } from '@/features/portaldvc/DanhMucThuTuc/models/DanhMucThuTucPortal'
import { DonViThuTucGroup } from '@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext'
import { ICON_STYLE_ACTIVE_COLOR, STEP_ICONS } from '../NopHoSoStep'
import {
  Link,
  NavigateOptions,
  SetURLSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { IThuTuc } from '@/features/thutuc/models'
import { thuTucApi } from '@/features/thutuc/services'
import { MUCDO_THUTUC } from '@/features/thutuc/data'
import { ID_SEPARATE_ONE_THUNK, PORTAL_PRIMARY_COLOR } from '@/data'
import { donViThuTucApi } from '@/features/donvithutuc/services'
import { coCauToChucService } from '@/features/cocautochuc/services'
import {
  QUAN_HUYEN,
  SO_BAN_NGANH,
  XA_PHUONG,
} from '@/features/portaldvc/DvcTrucTuyen/components/SearchThuTuc'
import { toast } from 'react-toastify'
import { truongHopThuTucApi } from '@/features/truonghopthutuc/services'
import { ITruongHopThuTuc } from '@/features/truonghopthutuc/models'
import { IDonViThuTuc } from '@/features/donvithutuc/models'
import { filterOptions } from '@/utils'
import { Service } from '@/services'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { togglerLoginModalVisible } from '@/lib/redux/GlobalState'
import { GetTruongHopThuTuc, GetTruongHopThuTucByMa } from '@/features/truonghopthutuc/redux/action'
const CAP_TINH = 'so-ban-nganh'
const CAP_HUYEN = 'quan-huyen'
const CAP_XA = 'xa-phuong'
const capThucHiens = [
  { value: CAP_TINH, label: 'Cấp tỉnh' },
  { value: CAP_HUYEN, label: 'Cấp huyện' },
  { value: CAP_XA, label: 'Cấp xã' },
]
const capThucHienLableFormat = {
  CapXa: 'Cấp xã',
  CapHuyen: 'Cấp huyện',
  CapTinh: 'Cấp tỉnh',
}
const capThucHienValueFormat = {
  CapTinh: 'so-ban-nganh',
  CapHuyen: 'quan-huyen',
  CapXa: 'xa-phuong',
}
const steps = [
  {
    description: 'Chọn dịch vụ công',
    icon: 'FileSearchOutlined',
  },
  {
    description: 'Nhập thông tin hồ sơ',
    icon: 'UserOutlined',
  },
  {
    description: 'Biểu mẫu điện tử',
    icon: 'SolutionOutlined',
  },
  {
    description: 'Thành phần hồ sơ',
    icon: 'FileAddOutlined',
  },
  {
    description: 'Đăng ký nhận kết quả',
    icon: 'EnvironmentOutlined',
  },
]

export const ChonCoQuanThucHien = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
}) => {
  const { data: user } = useAppSelector(state => state.user)
  const { data: truongHopThuTuc } = useAppSelector(state => state.truonghopthutuc)
  const { publicModule } = useAppSelector(state => state.config)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<ISearchDanhMucThuTucPortal>()
  const capThucHien = Form.useWatch('capThucHien', form)
  const [maTinh, setMaTinh] = useState<DonViThuTucGroup[]>([])
  const [maTinhUser, setMaTinhUser] = useState<string>('')
  const [maHuyen, setMaHuyen] = useState<DonViThuTucGroup[]>([])
  const [maXa, setMaXa] = useState<DonViThuTucGroup[]>([])
  const [thuTuc, setThuTuc] = useState<IThuTuc>()
  const [truongHopThuTucs, setTruongHopThuTucs] = useState<ITruongHopThuTuc[]>()
  const [donViThuTucs, setDonViThuTucs] = useState<IDonViThuTuc[]>()
  const navigate = useNavigate()
  const capThucHienQs = searchParams.get("capThucHien")
  const donViQs = searchParams.get('donVi')
  const donViCapHuyenQs = searchParams.get("donViCapHuyen")
  const maTTHCQs = searchParams.get("maTTHC")
  const [currentStep, setCurrentStep] = useState<number>(0)
  const maTruongHop = Form.useWatch("truongHopId", form);
  const [ma_tinh_config, cho_phep_can_bo_nop_ho_so_config] = useMemo(() => {
    return [publicModule?.find(x => x.code == 'ma-tinh'), publicModule?.find(x => x.code == 'cho_phep_can_bo_nop_ho_so')]
  }, [publicModule])

  const capThucHienOptions = useMemo(() => {
    //thuTuc?.capThucHien
    return thuTuc?.capThucHien
      .split(ID_SEPARATE_ONE_THUNK)
      .filter((x) => x == 'CapTinh' || x == 'CapHuyen' || x == 'CapXa')
      .map((item) => {
        return {
          label: (capThucHienLableFormat as any)[item],
          value: (capThucHienValueFormat as any)[item],
        }
      })
  }, [thuTuc])

  useEffect(() => {
    if (maTruongHop)
      dispatch(GetTruongHopThuTucByMa(maTruongHop))
  }, [maTruongHop])


  useEffect(() => {
    ; (async () => {
      const maTTHC = maTTHCQs
      if (maTTHC) {
        const {
          data: { data: thuTuc },
        } = await thuTucApi.GetByMa(maTTHC)
        if (thuTuc.mucDo != "3" && thuTuc.mucDo != "4") {
          navigate(-1);
          return;
        }
        setThuTuc(thuTuc)
        setMaHuyen([])
        setMaTinh([])
        setMaXa([])
        form.resetFields()
      }
    })()
  }, [maTTHCQs])

  useEffect(() => {
    if (user) {
      try {
        const data = user.thuongTru
        let jsonParse = data ? (JSON.parse(data as unknown as string)) : undefined
        let maTinh = jsonParse.MaTinhThanh ? jsonParse.MaTinhThanh : undefined
        setMaTinhUser(maTinh)
      } catch (error) {
      }
    }
  }, [user])


  useEffect(() => {
    ; (async () => {
      const maTTHC = maTTHCQs
      const donVi = donViQs || undefined

      if (donVi && maTTHC) {
        const {
          data: { data: truongHopThuTucs },
        } = await truongHopThuTucApi.Search({
          pageNumber: 1,
          pageSize: 1000,
          thuTucId: maTTHC,
          donViTiepNhan: donVi,
          khongNopTrucTuyen: false
        })
        setTruongHopThuTucs(truongHopThuTucs)
        if (truongHopThuTucs != null && truongHopThuTucs.length == 1) {
          form.setFieldValue('truongHopId', truongHopThuTucs[0].ma)
        }
      }
    })()
  }, [maTTHCQs, donViQs])

  // tự động điền đơn vị từ searchParams
  useEffect(() => {
    (async () => {
      const donVi = donViQs
      const donViCapHuyen = donViCapHuyenQs

      if (capThucHienQs && capThucHienOptions) {
        form.setFieldValue("capThucHien", capThucHienQs)
      }

      if (donVi && capThucHienQs) {
        if (capThucHienQs == SO_BAN_NGANH) {
          await onFocus('CapTinh', 'so-ban-nganh')
        } else if (capThucHienQs == QUAN_HUYEN) {
          await onFocus('CapHuyen', 'quan-huyen')
        } else if (capThucHienQs == XA_PHUONG) {
          await onFocus('CapHuyen', 'quan-huyen')
          await onFocus('CapXa', 'xa-phuong')
          if (donViCapHuyen) {
            await onChangMaHuyen(donViCapHuyen)
          }
        }
      }

    })()
  }, [donViQs, capThucHienQs, donViCapHuyenQs, donViThuTucs])

  useEffect(() => {
    const donVi = donViQs
    const donViCapHuyen = donViCapHuyenQs
    if (capThucHienQs == SO_BAN_NGANH && donVi) {
      form.setFieldValue("maTinh", donVi)
    } else if (capThucHienQs == QUAN_HUYEN && donVi) {
      form.setFieldValue("maHuyen", donVi)
    } else if (capThucHienQs == XA_PHUONG) {
      if (donViCapHuyen) {
        form.setFieldValue("maHuyen", donViCapHuyen)
      }
      form.setFieldValue("maXa", donVi)
    }
  }, [capThucHienQs, donViThuTucs, donViQs, donViCapHuyenQs])

  useEffect(() => {
    ; (async () => {
      if (capThucHienOptions && capThucHienOptions.length === 1) {
        const option = capThucHienOptions[0].value
        form.setFieldValue('capThucHien', option)
      }
      let ctt = capThucHienQs
      if (capThucHienOptions?.length) {
        if (capThucHienOptions && capThucHienOptions.length === 1) {
          ctt = capThucHienOptions[0].value
        }
        const maTTHC = maTTHCQs
        if (ctt && maTTHC) {
          const res = await donViThuTucApi.SearchPublic({
            maTTHC,
            pageNumber: 1,
            pageSize: 200,
            catalog: ctt || undefined,
            ofGroupCode: donViCapHuyenQs ? donViCapHuyenQs : undefined
          })
          if (ctt == SO_BAN_NGANH) {
            setMaTinh(res.data.data)
          } else if (ctt == QUAN_HUYEN) {
            setMaHuyen(res.data.data)
          } else if (ctt == XA_PHUONG) {
            setMaXa(res.data.data)
          }
          setDonViThuTucs(res.data.data)
          if (res.data.data.length == 1) {
            const donVi = res.data.data[0]
            form.setFieldValue(
              ctt == SO_BAN_NGANH
                ? 'maTinh'
                : ctt == QUAN_HUYEN
                  ? 'maHuyen'
                  : ctt == XA_PHUONG
                    ? 'maXa'
                    : '',
              donVi.donViId)
            if (ctt == SO_BAN_NGANH) {
              handleUrlQueryStringChange({ donVi: donVi.donViId, donViCapHuyen: undefined } as any, { replace: true })
            } else if (ctt == QUAN_HUYEN) {
              handleUrlQueryStringChange({ donVi: donVi.donViId, donViCapHuyen: undefined } as any, { replace: true })
            } else if (ctt == XA_PHUONG) {
              handleUrlQueryStringChange({ donVi: donVi.donViId, donViCapHuyen: donViCapHuyenQs } as any, { replace: true })
            }
          }
        }
      }
    })()
  }, [capThucHienQs, donViCapHuyenQs, capThucHienOptions])
  const handleUrlQueryStringChange = (
    formData: Record<string, string>,
    navOpts?: NavigateOptions
  ) => {
    setSearchParams((curr) => {
      const urlQuery: Record<string, string> = {}
      curr.forEach((value, key) => {
        if (value !== undefined) {
          urlQuery[key] = value
        }
      })

      Object.keys(formData).map((key) => {
        if (formData[key]) {
          if (['maTinh', 'maHuyen', 'maXa'].includes(key)) {
            urlQuery['donVi'] = formData[key]
          } else {
            urlQuery[key] = formData[key]
          }
        } else {
          delete urlQuery[key]
        }
      })
      return urlQuery
    }, navOpts)
  }
  const onFinish = async () => {
    const formData = (await form.validateFields()) as ISearchDanhMucThuTucPortal

    if (
      (formData.maTinh || formData.maHuyen || formData.maXa) &&
      formData.capThucHien
    ) {
      const urlRedirect = donViThuTucs?.find(x => x.donViId == (formData.maXa || formData.maHuyen || formData.maTinh))?.urlRedirect

      if (urlRedirect) {
        window.open(urlRedirect, '_blank');
        return
      }

      if ("truongHopId" in formData) {
        if (truongHopThuTuc?.batBuocDungDiaBan && maTinhUser) {
          if (ma_tinh_config?.content !== maTinhUser) {
            toast.warning("Thủ tục chỉ được thực hiện đối với công dân có thường trú trong Tỉnh!")
            return
          }
        }
        if (formData.truongHopId == undefined) {
          if (truongHopThuTucs?.length && truongHopThuTucs?.length == 1) {
            navigate(`?truongHopId=${truongHopThuTucs[0].ma}&donVi=${formData.maXa || formData.maHuyen || formData.maTinh}&maTTHC=${thuTuc?.maTTHC}`)
            return
          }
          toast.warning('Vui lòng chọn trường hợp xử lý')
          return
        }
        navigate(`?truongHopId=${formData.truongHopId}&donVi=${formData.maXa || formData.maHuyen || formData.maTinh}&maTTHC=${thuTuc?.maTTHC}`)
      }
    }
    else toast.warning('Bạn chưa chọn đủ thông tin!')

    // handleUrlQueryStringChange({
    //   donVi: formData.maXa || formData.maHuyen || formData.maTinh,
    //   donViCapHuyen: formData.maHuyen,
    //   capThucHien: formData.capThucHien || capThucHienQs,
    //   maTTHC: thuTuc?.maTTHC,
    //   truongHopId:
    //     'truongHopId' in formData ? formData.truongHopId : undefined,
    // } as any)

  }

  const onFocus = async (
    target: 'CapHuyen' | 'CapXa' | 'CapTinh',
    catalog: 'so-ban-nganh' | 'quan-huyen' | 'xa-phuong'
  ) => {

    const maTTHC = maTTHCQs
    const currentCapThucHien = capThucHien || capThucHienQs
    if (!maTTHC) {
      return
    }
    if (target == 'CapTinh' && catalog == 'so-ban-nganh' && !maTinh?.length) {
      const res = await donViThuTucApi.SearchPublic({
        maTTHC,
        pageNumber: 1,
        pageSize: 200,
        catalog,
      })
      setMaTinh(res.data.data)
    }
    if (
      target == 'CapHuyen' &&
      catalog == 'quan-huyen' &&
      !maHuyen?.length
    ) {
      if (currentCapThucHien == CAP_XA) {
        const res = await coCauToChucService.PortalSearch({
          pageNumber: 1,
          pageSize: 200,
          cataLog: 'quan-huyen',
        })
        // const res = await donViThuTucApi.SearchPublic({
        //   maTTHC,
        //   pageNumber: 1,
        //   pageSize: 200,
        //   catalog,
        // })
        const formated: DonViThuTucGroup[] = res.data.data.map((item) => {
          return {
            ...item,
            donViId: item.groupCode,
            groupName: item.groupName,
          } as any
        })
        setMaHuyen(formated)
        // setMaXa(res.data.data)
      } else if (currentCapThucHien == QUAN_HUYEN) {
        const res = await donViThuTucApi.SearchPublic({
          maTTHC,
          pageNumber: 1,
          pageSize: 200,
          catalog,
        })
        setMaHuyen(res.data.data)
      }
    }
    if (target == 'CapXa' && catalog == 'xa-phuong' && !maHuyen?.length) {
      const res = await coCauToChucService.PortalSearch({
        pageNumber: 1,
        pageSize: 200,
        cataLog: 'quan-huyen',
      })
      const formated: DonViThuTucGroup[] = res.data.data.map((item) => {
        return {
          ...item,
          donViId: item.groupCode,
          groupName: item.groupName,
        } as any
      })
      setMaHuyen(formated)
    }
  }

  const onChangMaHuyen = async (value: string) => {
    const maTTHC = maTTHCQs
    if (!maTTHC) {
      return
    }
    if (capThucHien != XA_PHUONG) {
      return
    }
    const res = await donViThuTucApi.SearchPublic({
      maTTHC,
      pageNumber: 1,
      pageSize: 1000,
      catalog: 'xa-phuong',
      ofGroupCode: value,
    })
    setMaXa(res.data.data)
  }

  useEffect(() => {
    const donVi = donViQs
    const truongHopId = searchParams.get('truongHopId')
    const maTTHC = maTTHCQs
    if (maTTHC && (donVi == null || truongHopId == null)) {
      setCurrentStep(0)
    } else if (maTTHC == null && (donVi != null || truongHopId != null)) {
      setCurrentStep(1)
    }
  }, [searchParams])

  const onValuesChange: FormProps['onValuesChange'] = (changedValues: any, values: any) => {
    const currentCapThucHien = form.getFieldValue("capThucHien") || capThucHienQs
    console.log(capThucHienQs);
    console.log(capThucHien);
    console.log(changedValues);
    console.log(values);
    console.log(currentCapThucHien)

    if (!changedValues.truongHopId) {
      form.setFieldValue("truongHopId", undefined)
      if (currentCapThucHien == SO_BAN_NGANH) {
        if (capThucHien != currentCapThucHien && capThucHien != undefined) {
          form.resetFields(["maTinh", "maHuyen", "maXa"])
          handleUrlQueryStringChange({ donVi: undefined, donViCapHuyen: undefined, capThucHien: currentCapThucHien } as any, { replace: true })
        } else {
          handleUrlQueryStringChange({ donVi: changedValues.maTinh, donViCapHuyen: undefined } as any, { replace: true })
        }
      } else if (currentCapThucHien == QUAN_HUYEN) {
        if (capThucHien != currentCapThucHien && capThucHien != undefined) {
          form.resetFields(["maTinh", "maHuyen", "maXa"])
          handleUrlQueryStringChange({ donVi: undefined, donViCapHuyen: undefined, capThucHien: currentCapThucHien } as any, { replace: true })
        } else {
          handleUrlQueryStringChange({ donVi: changedValues.maHuyen, donViCapHuyen: undefined } as any, { replace: true })
        }
      } else if (currentCapThucHien == XA_PHUONG) {
        if (capThucHien != currentCapThucHien && capThucHien != undefined) {
          form.resetFields(["maTinh", "maHuyen", "maXa"])
          handleUrlQueryStringChange({ donVi: undefined, donViCapHuyen: undefined, capThucHien: currentCapThucHien } as any, { replace: true })
        } else {
          handleUrlQueryStringChange({ donVi: changedValues.maXa, donViCapHuyen: values.maHuyen } as any, { replace: true })
        }
      }
    }
  }

  return (
    <div className="container commonBackgroundTrongDong" style={{ minHeight: '80vh', padding: '50px 0' }}>
      <AntdStep
        className="mb-4"
        items={steps.map((step, index): StepProps => {
          let color = index == currentStep ? ICON_STYLE_ACTIVE_COLOR : undefined
          return {
            title: (
              <Typography.Title level={5}>Bước {index + 1}</Typography.Title>
            ),
            description: step?.description,
            icon:
              step?.icon && step.icon
                ? (STEP_ICONS as any)[step.icon]({ style: { color } })
                : '',
          }
        })}
        current={currentStep}
        onChange={(value) => {
          // thêm role = 'button'
        }}
      />
      <div className="border px-2 py-3 ChonCoQuanThucHienBlock">
        <div className='titleChonCoQuanThucHien'>
          <Tag color="gold-inverse">
            {' '}
            {thuTuc?.mucDo ? (MUCDO_THUTUC as any)[thuTuc?.mucDo] : ''}
          </Tag>
          <b style={{ fontSize: 18 }}>{thuTuc?.tenTTHC}</b>
        </div>
        <Link to={`/portaldvc/danh-muc-tthc?MaThuTuc=${thuTuc?.maTTHC}`} >
          <Tag className='actionViewDetailThuTuc' color="gold" style={{ float: 'right', marginBottom: '10px' }}>
            Chi tiết thủ tục
          </Tag>
        </Link>
        <AntdDivider />
        {/* <Typography.Title level={5}>Chọn trường hợp hồ sơ</Typography.Title> */}
        <Form
          form={form}
          name="FilterDonViThuTuc"
          layout="vertical"
          onValuesChange={onValuesChange}
          initialValues={{ capThucHien: capThucHienQs }}
        >
          <div className="row px-3 py-2">
            <div
              className="col-12 col-md-12"
              style={{ height: capThucHien != undefined && capThucHienOptions?.length == 1 ? 0 : '100%' }}
            >
              <Form.Item name="capThucHien" label="">
                <div hidden={capThucHien != undefined && capThucHienOptions?.length == 1}>
                  <Radio.Group value={capThucHien}>
                    <Space direction="vertical">
                      {capThucHienOptions?.map((item, index) => {
                        return (
                          <Radio value={item.value} key={index}>
                            {item.label}
                          </Radio>
                        )
                      })}
                    </Space>
                  </Radio.Group>
                </div>
              </Form.Item>
            </div>
            <div className="col-md-8 col-12">
              <div
                className="col-12 col-md-8"
                hidden={capThucHien == CAP_TINH ? false : true}
              >
                <Form.Item name="maTinh" label="Đơn vị thực hiện">
                  <AntdSelect
                    onFocus={() => onFocus('CapTinh', 'so-ban-nganh')}
                    generateOptions={{
                      model: maTinh,
                      value: 'donViId',
                      label: 'groupName',
                    }}
                    showSearch
                  />
                </Form.Item>
              </div>

              <div className="col-12 col-md-8" hidden={(capThucHien == CAP_HUYEN || capThucHien == CAP_XA) ? false : true}>
                <Form.Item name="maHuyen" label="Đơn vị cấp huyện">
                  <AntdSelect
                    onChange={onChangMaHuyen}
                    onFocus={() => onFocus('CapHuyen', 'quan-huyen')}
                    options={maHuyen?.map((x) => {
                      const label = x.groupName
                        .replace('UBND', '')
                        .trimStart()
                      return {
                        label: label.charAt(0).toUpperCase() + label.slice(1),
                        value: x.donViId,
                      }
                    })}
                    showSearch
                  />
                </Form.Item>
              </div>
              <div
                className="col-12 col-md-8"
                hidden={capThucHien == CAP_XA ? false : true}
              >
                <Form.Item name="maXa" label="Đơn vị cấp xã">
                  <AntdSelect
                    onFocus={() => onFocus('CapXa', 'xa-phuong')}
                    options={maXa?.map((x) => {
                      const label = x.groupName.replace('UBND', '').trimStart()
                      return {
                        label: label.charAt(0).toUpperCase() + label.slice(1),
                        value: x.donViId,
                      }
                    })}
                    showSearch
                  />
                </Form.Item>
              </div>
              {truongHopThuTucs ? <div
                className="col-12 col-md-8"
                hidden={
                  truongHopThuTucs?.length == 1 || !donViQs
                }
              >
                <Form.Item name="truongHopId" label="Chọn trường hợp giải quyết">
                  <AntdSelect
                    options={truongHopThuTucs?.map((truongHopThuTuc, idx) => {
                      return {
                        label: truongHopThuTuc.ten || truongHopThuTuc.ma,
                        value: truongHopThuTuc.ma,
                      }
                    })}
                    showSearch
                    filterOption={filterOptions}
                  />
                </Form.Item>
              </div> : null}

            </div>
            <div className="col-md-8 col-12"></div>
          </div>
        </Form>
        <div className="d-flex justify-content-between align-items-center">
          {currentStep == 0 ? (
            <div />
          ) : (
            <AntdButton key={1}>Quay lại bước trước</AntdButton>
          )}
          <div style={{ display: "flex", justifyContent: "end", width: "100%", padding: "1rem 0", gap: "1rem" }}>
            <AntdButton key={2} onClick={(e) => {


              if (!user) {
                dispatch(togglerLoginModalVisible(true))
                toast.info("Vui lòng đăng nhập để tiếp tục")
                e.preventDefault()
              }
              else if (cho_phep_can_bo_nop_ho_so_config?.content !== "true") {
                if (user?.typeUser !== "CongDan") {
                  toast.info("Vui lòng sử dụng tài khoản công dân để thực hiện nộp hồ sơ")
                }
                else {
                  onFinish()
                }
              }
              else {
                onFinish()
              }

            }
            }>
              Đồng ý và tiếp tục
            </AntdButton>
          </div>
        </div>
      </div>
    </div >
  )
}