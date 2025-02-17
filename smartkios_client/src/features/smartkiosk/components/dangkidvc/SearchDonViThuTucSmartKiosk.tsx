import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Button, Form, Radio, Space, Spin } from "antd";
import { RadioChangeEvent } from "antd/lib";
import { SearchDonViThuTuc as DispatchSearchDonViThuTuc } from "@/features/donvithutuc/redux/action";
import { AntdSelect } from "@/lib/antd/components";
import { SearchTruongHopThuTuc } from "@/features/truonghopthutuc/redux/action";
import { thuTucApi } from "@/features/thutuc/services";
import { truongHopThuTucApi } from "@/features/truonghopthutuc/services";
import { donViThuTucApi } from "@/features/donvithutuc/services";
import { IDonViThuTuc } from "@/features/donvithutuc/models";
import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { ID_SEPARATE_ONE_THUNK } from "@/data";
import { QUAN_HUYEN, SO_BAN_NGANH, XA_PHUONG } from "./SearchThuTucSmartKiosk";
import { coCauToChucService } from "@/features/cocautochuc/services";
import { DefaultOptionType } from "antd/es/select";
import { ISearchDanhMucThuTucPortal } from "@/features/portaldvc/DanhMucThuTuc/models/DanhMucThuTucPortal";
import { DonViThuTucGroup, useDvcTrucTuyenPortalContext } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";
const CAP_TINH = "so-ban-nganh";
const  CAP_HUYEN= "quan-huyen";
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


export const SearchDonViThuTuc = () => {
  const [form] = Form.useForm<ISearchDanhMucThuTucPortal>();
  const capThucHien = Form.useWatch("capThucHien", form)
  const dvcTrucTuyenContext = useDvcTrucTuyenPortalContext();

  const capThucHienOptions = useMemo(() => {
    return dvcTrucTuyenContext.thuTuc?.capThucHien.split(ID_SEPARATE_ONE_THUNK).filter(x => x == "CapTinh" || x=="CapHuyen" || x=="CapXa").map((item) => {
      return {
        label: (capThucHienLableFormat as any)[item],
        value: (capThucHienValueFormat as any)[item],
      }
    })
  }, [dvcTrucTuyenContext.thuTuc])

  // useEffect(() => {
  //   (async () => {
  //     const maTTHC = dvcTrucTuyenContext.searchParams.get("maTTHC")
  //     if (maTTHC) {

        // const donVi = dvcTrucTuyenContext.searchParams.get("donVi") || undefined
        // const { data: donViThuTucs } = await donViThuTucApi.SearchPublic({ pageNumber: 1, pageSize: 1000, maTTHC: maTTHC!, donViId: donVi }) // donViId
        // dvcTrucTuyenContext.setDonViThuTucs(donViThuTucs.data)
        // const { data: { data: thuTuc } } = await thuTucApi.GetByMa(maTTHC)
        // dvcTrucTuyenContext.setThuTuc(thuTuc)
        // if (donViThuTucs.data?.length == 1) {
        //   const { data: { data: truongHopThuTucs } } = await truongHopThuTucApi.Search({ pageNumber: 1, pageSize: 1000, thuTucId: maTTHC, donViTiepNhan: donVi })
        //   dvcTrucTuyenContext.setTruongHopThuTucs(truongHopThuTucs)
        // }
  //     }
  //   })()

  // }, [dvcTrucTuyenContext.searchParams]);


  useEffect(() => {
    (async () => {
      const maTTHC = dvcTrucTuyenContext.searchParams.get("maTTHC")
      if(maTTHC){
        const { data: { data: thuTuc } } = await thuTucApi.GetByMa(maTTHC)
        dvcTrucTuyenContext.setThuTuc(thuTuc)
        dvcTrucTuyenContext.setMaHuyen([])
        dvcTrucTuyenContext.setMaTinh([])
        dvcTrucTuyenContext.setMaXa([])
        form.resetFields()
      }
    })()
  }, [dvcTrucTuyenContext.searchParams.get("maTTHC")])

  useEffect(() => {
    (async () => {
      const maTTHC = dvcTrucTuyenContext.searchParams.get("maTTHC")
      const donVi = dvcTrucTuyenContext.searchParams.get("donVi") || undefined
      if (donVi && maTTHC) {
        const { data: { data: truongHopThuTucs } } = await truongHopThuTucApi.Search({ pageNumber: 1, pageSize: 1000, thuTucId: maTTHC, donViTiepNhan: donVi })
        dvcTrucTuyenContext.setTruongHopThuTucs(truongHopThuTucs)
      }
    })()
  }, [dvcTrucTuyenContext.searchParams.get("maTTHC"), dvcTrucTuyenContext.searchParams.get("donVi")])

  useEffect(() => {
    (async () => {
      if (capThucHienOptions && capThucHienOptions.length === 1) {
        const option = capThucHienOptions[0].value
        form.setFieldValue("capThucHien", option)
        const donVi = form.getFieldValue("maTinh") || form.getFieldValue("maHuyen") || form.getFieldValue("maXa")
        const maTTHC = dvcTrucTuyenContext.searchParams.get("maTTHC")
        if(maTTHC && !donVi){
          const res= await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 200, catalog: (capThucHienValueFormat as any)[option]})
          dvcTrucTuyenContext.setMaTinh(res.data.data)
          dvcTrucTuyenContext.setDonViThuTucs(res.data.data)
          if(res.data.data.length == 1) {
            const donVi = res.data.data[0]
            form.setFieldValue(option == SO_BAN_NGANH ? "maTinh" : option == QUAN_HUYEN ? "maHuyen" : option == XA_PHUONG ? "maXa" : "", donVi.donViId)
          }
        }
      }
    })()
  }, [capThucHienOptions])

  useEffect(() => {
    if(dvcTrucTuyenContext.thuTuc && dvcTrucTuyenContext.donViThuTucs?.length == 1){
      const donVi = form.getFieldValue("maTinh") || form.getFieldValue("maHuyen") || form.getFieldValue("maXa")
      if(capThucHien){
        dvcTrucTuyenContext.handleUrlQueryStringChange({donVi, capThucHien: capThucHien, donViCapHuyen: form.getFieldValue("maHuyen")})
      }
    }
  }, [dvcTrucTuyenContext.thuTuc, dvcTrucTuyenContext.donViThuTucs, capThucHien])

  const onFinish = async () => {
    const formData = await form.validateFields() as ISearchDanhMucThuTucPortal
    
    if ((formData.maTinh || formData.maHuyen || formData.maXa) && formData.capThucHien)
      dvcTrucTuyenContext.handleUrlQueryStringChange({ donVi: formData.maXa || formData.maHuyen || formData.maTinh, donViCapHuyen: formData.maHuyen, capThucHien: formData.capThucHien } as any)
    else
      toast.warning('Bạn chưa chọn đủ thông tin!')
  }

  // const generateMaHuyen = useCallback((data: DonViThuTucGroup[]) => {
  //   const quanHuyens = data.map(item => {
  //     return {...item, ofGroupCode: "", ofGroupName: "", groupName: item.ofGroupName, donViId: item.ofGroupCode}
  //   })
  //   const map = new Map();
  //   const ketQua = quanHuyens.filter(function(item) {
  //       return !map.has(item.donViId) && map.set(item.donViId, 1);
  //   });
  //   dvcTrucTuyenContext.setMaHuyen(ketQua)
  // }, [])

  const onFocus = async (target: "CapHuyen" | "CapXa" | "CapTinh", catalog: "so-ban-nganh" | "quan-huyen" | "xa-phuong") => {
    const maTTHC = dvcTrucTuyenContext.searchParams.get("maTTHC")
    if(!maTTHC){
      return;
    }
    if(target == "CapTinh" && catalog == "so-ban-nganh" && !dvcTrucTuyenContext.maTinh.length){
      const res= await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 200, catalog})
      dvcTrucTuyenContext.setMaTinh(res.data.data)
    } else if(target == "CapHuyen" && catalog == "quan-huyen" && !dvcTrucTuyenContext.maHuyen.length){
      if(capThucHien == CAP_XA){
        const res = await coCauToChucService.PortalSearch({pageNumber:1, pageSize:200, cataLog: "quan-huyen"})
        const formated: DonViThuTucGroup[] = res.data.data.map(item => {
          return {...item, donViId: item.groupCode, groupName: item.groupName} as any
        })
        dvcTrucTuyenContext.setMaHuyen(formated)
        // dvcTrucTuyenContext.setMaXa(res.data.data)
      } else if(capThucHien == QUAN_HUYEN){
        const res = await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 200, catalog})
        dvcTrucTuyenContext.setMaHuyen(res.data.data)
      }
    } else if(target == "CapXa" && catalog == "xa-phuong"&& !dvcTrucTuyenContext.maHuyen.length){
      const res = await coCauToChucService.PortalSearch({pageNumber:1, pageSize:200, cataLog: "quan-huyen"})
      const formated: DonViThuTucGroup[] = res.data.data.map(item => {
        return {...item, donViId: item.groupCode, groupName: item.groupName} as any
      })
      dvcTrucTuyenContext.setMaHuyen(formated)
      // const res = await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 1000, catalog})
      // generateMaHuyen(res.data.data as any)
      // dvcTrucTuyenContext.setMaXa(res.data.data)
    }
  }
  const onChangMaHuyen = async (value: string) => {
    const maTTHC = dvcTrucTuyenContext.searchParams.get("maTTHC")
    if(!maTTHC){
      return;
    }
    const res = await donViThuTucApi.SearchPublic({maTTHC, pageNumber: 1, pageSize: 1000, catalog: "xa-phuong", ofGroupCode: value})
    form.setFieldValue("maXa", undefined);
    dvcTrucTuyenContext.setMaXa(res.data.data)
  }

  if (dvcTrucTuyenContext.thuTuc) {
    return (
      <div className="rounded overflow-hidden border my-2">
        <h5 className="px-3 py-2 mb-0 " style={{ backgroundColor: "rgba(30, 47, 65, 0.1)" }}>Chọn cơ quan thực hiện</h5>
        <Spin spinning={false}>
          <Form
            form={form}
            name="FilterDonViThuTuc"
            layout="vertical"
            onFinish={onFinish}
          >
            <div className="row px-3 py-2">
              <div className="col-12 col-md-12">
                <Form.Item name="capThucHien" label="">
                  <Radio.Group>
                    <Space direction="vertical">
                      {capThucHienOptions?.map((item, index) => {
                        return <Radio value={item.value} key={index}>{item.label}</Radio>;
                      })}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div
                className="col-12 col-md-12"
                hidden={capThucHien == CAP_TINH ? false : true}
              >
                <Form.Item name="maTinh" label="Đơn vị thực hiện">
                  <AntdSelect
                    onFocus={() =>onFocus("CapTinh","so-ban-nganh")}
                    generateOptions={{ model: dvcTrucTuyenContext.maTinh, value: "donViId", label: "groupName" }}
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
                    generateOptions={{ model: dvcTrucTuyenContext.maHuyen, value: "donViId", label: "groupName" } as any}
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
                    generateOptions={{ model: dvcTrucTuyenContext.maXa, value: "donViId", label: "groupName" }}
                    showSearch
                  />
                </Form.Item>
              </div>

              <div className="col-2 col-md-2">
                <Button htmlType="submit" className="buttonSearchPortal">Đồng ý</Button>
              </div>
            </div>
          </Form>
        </Spin>
      </div>
    );
  }
  return <></>
};
