import { useEffect, useMemo, useState } from "react";
import { Button, Form, FormProps, Radio, Space, StepProps, Tag, Typography } from "antd";
import { AntdButton, AntdDivider, AntdSelect, AntdStep } from "@/lib/antd/components";
import { ISearchDanhMucThuTucPortal } from "@/features/portaldvc/DanhMucThuTuc/models/DanhMucThuTucPortal";
import { DonViThuTucGroup } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";
import { ICON_STYLE_ACTIVE_COLOR, STEP_ICONS } from "../NopHoSoStep";
import { NavigateOptions, SetURLSearchParams, useSearchParams } from "react-router-dom";
import { IThuTuc } from "@/features/thutuc/models";
import { thuTucApi } from "@/features/thutuc/services";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { ID_SEPARATE_ONE_THUNK, PORTAL_PRIMARY_COLOR } from "@/data";
import { donViThuTucApi } from "@/features/donvithutuc/services";
import { coCauToChucService } from "@/features/cocautochuc/services";
import { QUAN_HUYEN, SO_BAN_NGANH, XA_PHUONG } from "@/features/portaldvc/DvcTrucTuyen/components/SearchThuTuc";
import { toast } from "react-toastify";
import { truongHopThuTucApi } from "@/features/truonghopthutuc/services";
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models";
import { IDonViThuTuc } from "@/features/donvithutuc/models";
import { filterOptions } from "@/utils";
const CAP_TINH = "so-ban-nganh";
const CAP_HUYEN = "quan-huyen";
const CAP_XA = "xa-phuong";
const capThucHiens = [
  { value: CAP_TINH, label: "Cấp tỉnh" },
  { value: CAP_HUYEN, label: "Cấp huyện" },
  { value: CAP_XA, label: "Cấp xã" },
];
const capThucHienLableFormat = {
  "CapXa": "Cấp xã",
  "CapHuyen": "Cấp huyện",
  "CapTinh": "Cấp tỉnh",
}
const capThucHienValueFormat = {
  "CapTinh": "so-ban-nganh",
  "CapHuyen": "quan-huyen",
  "CapXa": "xa-phuong",
}
const steps = [{
  description: "Chọn dịch vụ công",
  icon: "FileSearchOutlined"
}, {
  description: "Nhập thông tin hồ sơ",
  icon: "UserOutlined"
}, {
  description: "Biểu mẫu điện tử",
  icon: "SolutionOutlined"
}, {
  description: "Đăng ký nhận kết quả",
  icon: "EnvironmentOutlined"
},
  , {
  description: "Thành phần hồ sơ",
  icon: "FileAddOutlined"
}]

export const ChonCoQuanThucHien = ({searchParams, setSearchParams}: {searchParams: URLSearchParams; setSearchParams: SetURLSearchParams;}) => {
  const [form] = Form.useForm<ISearchDanhMucThuTucPortal>();
  const capThucHien = Form.useWatch("capThucHien", form)
  const [maTinh, setMaTinh] = useState<DonViThuTucGroup[]>([])
  const [maHuyen, setMaHuyen] = useState<DonViThuTucGroup[]>([])
  const [maXa, setMaXa] = useState<DonViThuTucGroup[]>([])
  const [thuTuc, setThuTuc] = useState<IThuTuc>()
  const [truongHopThuTucs, setTruongHopThuTucs] = useState<ITruongHopThuTuc[]>()
  const [donViThuTucs, setDonViThuTucs] = useState<IDonViThuTuc[]>()

  const [currentStep, setCurrentStep] = useState<number>(0)
  const capThucHienOptions = useMemo(() => {
    return thuTuc?.capThucHien.split(ID_SEPARATE_ONE_THUNK).filter(x => x == "CapTinh" || x=="CapHuyen" || x=="CapXa").map((item) => {
      return {
        label: (capThucHienLableFormat as any)[item],
        value: (capThucHienValueFormat as any)[item],
      }
    })
  }, [thuTuc])


  useEffect(() => {
    (async () => {
      const maTTHC = searchParams.get("maTTHC")
      if(maTTHC){
        const { data: { data: thuTuc } } = await thuTucApi.GetByMa(maTTHC)
        setThuTuc(thuTuc)
        setMaHuyen([])
        setMaTinh([])
        setMaXa([])
        form.resetFields()
      }
    })()
  }, [searchParams.get("maTTHC")])

  useEffect(() => {
    (async () => {
      const maTTHC = searchParams.get("maTTHC")
      const donVi = searchParams.get("donVi") || undefined
      if (donVi && maTTHC) {
        const { data: { data: truongHopThuTucs } } = await truongHopThuTucApi.Search({ pageNumber: 1, pageSize: 1000, thuTucId: maTTHC, donViTiepNhan: donVi })
        setTruongHopThuTucs(truongHopThuTucs)
        if(truongHopThuTucs.length == 1){
          form.setFieldValue("truongHopId", truongHopThuTucs[0].ma)
        }
      }
    })()
  }, [searchParams.get("maTTHC"), searchParams.get("donVi")])

  useEffect(() => {
    (async () => {
      if (capThucHienOptions && capThucHienOptions.length === 1) {
        const option = capThucHienOptions[0].value
        form.setFieldValue("capThucHien", option)
        const donVi = form.getFieldValue("maTinh") || form.getFieldValue("maHuyen") || form.getFieldValue("maXa")
        const maTTHC = searchParams.get("maTTHC")
        if(maTTHC && !donVi){
          const res= await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 200, catalog: (capThucHienValueFormat as any)[option]})
          setMaTinh(res.data.data)
          setDonViThuTucs(res.data.data)
          if(res.data.data.length == 1) {
            const donVi = res.data.data[0]
            form.setFieldValue(option == SO_BAN_NGANH ? "maTinh" : option == QUAN_HUYEN ? "maHuyen" : option == XA_PHUONG ? "maXa" : "", donVi.donViId)
          }
        }
      }
    })()
  }, [capThucHienOptions])
  const handleUrlQueryStringChange = (formData: Record<string, string>, navOpts?: NavigateOptions) => {
    setSearchParams((curr) => {
      const urlQuery: Record<string, string> = {}
      curr.forEach((value, key) => {
        if(value !== undefined){
          urlQuery[key] = value
        }
      });

      Object.keys(formData).map((key) => {
        if(formData[key]){
          if(["maTinh", "maHuyen", "maXa"].includes(key)){
            urlQuery["donVi"] = formData[key] 
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
  useEffect(() => {
    if(thuTuc && donViThuTucs?.length == 1){
      const donVi = form.getFieldValue("maTinh") || form.getFieldValue("maHuyen") || form.getFieldValue("maXa")
      if(capThucHien){
        handleUrlQueryStringChange({donVi, capThucHien: capThucHien, donViCapHuyen: form.getFieldValue("maHuyen")})
      }
    }
  }, [thuTuc, donViThuTucs, capThucHien])

  const onFinish = async () => {
    const formData = await form.validateFields() as ISearchDanhMucThuTucPortal
    
    if ((formData.maTinh || formData.maHuyen || formData.maXa) && formData.capThucHien)
      handleUrlQueryStringChange({ donVi: formData.maXa || formData.maHuyen || formData.maTinh, donViCapHuyen: formData.maHuyen, capThucHien: formData.capThucHien, truongHopId: "truongHopId" in formData ? formData.truongHopId : undefined } as any)
    else
      toast.warning('Bạn chưa chọn đủ thông tin!')
  }


  const onFocus = async (target: "CapHuyen" | "CapXa" | "CapTinh", catalog: "so-ban-nganh" | "quan-huyen" | "xa-phuong") => {
    const maTTHC = searchParams.get("maTTHC")
    if(!maTTHC){
      return;
    }
    if(target == "CapTinh" && catalog == "so-ban-nganh" && !maTinh.length){
      const res= await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 200, catalog})
      setMaTinh(res.data.data)
    } else if(target == "CapHuyen" && catalog == "quan-huyen" && !maHuyen.length){
      if(capThucHien == CAP_XA){
        const res = await coCauToChucService.PortalSearch({pageNumber:1, pageSize:200, cataLog: "quan-huyen"})
        const formated: DonViThuTucGroup[] = res.data.data.map(item => {
          return {...item, donViId: item.groupCode, groupName: item.groupName} as any
        })
        setMaHuyen(formated)
        // setMaXa(res.data.data)
      } else if(capThucHien == QUAN_HUYEN){
        const res = await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 200, catalog})
        setMaHuyen(res.data.data)
      }
    } else if(target == "CapXa" && catalog == "xa-phuong"&& !maHuyen.length){
      const res = await coCauToChucService.PortalSearch({pageNumber:1, pageSize:200, cataLog: "quan-huyen"})
      const formated: DonViThuTucGroup[] = res.data.data.map(item => {
        return {...item, donViId: item.groupCode, groupName: item.groupName} as any
      })
      setMaHuyen(formated)
      // const res = await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 1000, catalog})
      // generateMaHuyen(res.data.data as any)
      // setMaXa(res.data.data)
    }
  }
  const onChangMaHuyen = async (value: string) => {
    const maTTHC = searchParams.get("maTTHC")
    if(!maTTHC){
      return;
    }
    const res = await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 1000, catalog: "xa-phuong", ofGroupCode: value})
    form.setFieldValue("maXa", undefined);
    setMaXa(res.data.data)
  }

  

  useEffect(() => {
    const donVi = searchParams.get("donVi")
    const truongHopId = searchParams.get("truongHopId")
    const maTTHC = searchParams.get("maTTHC")
    if (maTTHC && (donVi == null || truongHopId == null)) {
      setCurrentStep(0)
    } else if (maTTHC == null && (donVi != null || truongHopId != null)) {
      setCurrentStep(1)
    }
  }, [searchParams])

  const onValuesChange: FormProps["onValuesChange"] = (changedValues: any) => {
    if(changedValues.maXa || changedValues.maTinh || changedValues.maHuyen){
      handleUrlQueryStringChange({maTTHC: thuTuc?.maTTHC, ...changedValues})
    }
  }

  return <div className="container my-5">
    <AntdStep className="mb-4" items={steps.map((step, index): StepProps => {
      let color = index == currentStep ? ICON_STYLE_ACTIVE_COLOR : undefined
      return {
        title: <Typography.Title level={4} >Bước {index + 1}</Typography.Title>,
        description: step?.description,
        icon: step?.icon && step.icon ? (STEP_ICONS as any)[step.icon]({ style: { color } }) : ""
      }
    })}

      current={currentStep}
      onChange={(value) => { // thêm role = 'button'

      }}
    />
    <div className="border px-2 py-3">
      <div  >
          <Tag color="gold-inverse"> {thuTuc?.mucDo ? (MUCDO_THUTUC as any)[thuTuc?.mucDo] : ""}</Tag>
        <b style={{ fontSize: 18 }}>{thuTuc?.tenTTHC}</b>
      </div>
      <AntdDivider/>
      <Typography.Title level={5}>Chọn trường hợp hồ sơ</Typography.Title>
      <Form
            form={form}
            name="FilterDonViThuTuc"
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <div className="row px-3 py-2">
              <div className="col-12 col-md-12" style={{height: capThucHienOptions?.length == 1 ? 0 : "100%"}}>
                <Form.Item name="capThucHien" label="">
                  <div hidden={capThucHienOptions?.length == 1}>
                  <Radio.Group>
                    <Space direction="vertical">
                      {capThucHienOptions?.map((item, index) => {
                        return <Radio value={item.value} key={index}>{item.label}</Radio>;
                      })}
                    </Space>
                  </Radio.Group>
                  </div>
                </Form.Item>
              </div>

              <div
                className="col-12 col-md-12"
                hidden={capThucHien == CAP_TINH ? false : true}
              >
                <Form.Item name="maTinh" label="Đơn vị thực hiện">
                  <AntdSelect
                    onFocus={() =>onFocus("CapTinh","so-ban-nganh")}
                    generateOptions={{ model: maTinh, value: "donViId", label: "groupName" }}
                    showSearch
                  />
                </Form.Item>
              </div>
              {(capThucHien == CAP_HUYEN || capThucHien == CAP_XA) ? <div
                className="col-12 col-md-12"
              >
                <Form.Item name="maHuyen" label="Đơn vị cấp huyện">
                  <AntdSelect
                    onChange={onChangMaHuyen}
                    onFocus={() =>onFocus("CapHuyen", "quan-huyen")}
                    options={maHuyen?.map(x => {
                      const label =  x.groupName.replace("UBND","").trimStart();
                      return {
                        label : label.charAt(0).toUpperCase() + label.slice(1),
                        value: x.donViId
                      }
                    })}
                    showSearch
                  />
                </Form.Item>
              </div> : null}
              <div
                className="col-12 col-md-12"
                hidden={capThucHien == CAP_XA  ? false : true}
              >
                <Form.Item name="maXa" label="Đơn vị cấp xã">
                  <AntdSelect
                    onFocus={() =>onFocus("CapXa", "xa-phuong")}
                    options={maXa?.map(x => {
                      const label =  x.groupName.replace("UBND","").trimStart();
                      return {
                        label : label.charAt(0).toUpperCase() + label.slice(1),
                        value: x.donViId
                      }
                    })}
                    showSearch
                  />
                </Form.Item>
              </div>

              <div
                className="col-12 col-md-12"
                hidden={truongHopThuTucs?.length == 1 || !searchParams.get("donVi")}
              >
                <Form.Item name="truongHopId" label="Trường hợp giải quyết">
                  <AntdSelect
                    options={truongHopThuTucs?.map((truongHopThuTuc, idx) => {
                      return {
                        label: <>{+truongHopThuTuc.thoiGianThucHien / 8} ({truongHopThuTuc.loaiThoiGianThucHien}) - {truongHopThuTuc.ten || truongHopThuTuc.ma}</>,
                        value: truongHopThuTuc.ma
                      }
                    })}
                    showSearch
                    filterOption={filterOptions}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="d-flex justify-content-between align-items-center">
      {currentStep == 0 ? <div /> : <AntdButton key={1}>Quay lại bước trước</AntdButton>}
      <AntdButton key={2} onClick={onFinish}>Đồng ý và tiếp tục</AntdButton>
    </div>
    </div>
    
  </div>
}