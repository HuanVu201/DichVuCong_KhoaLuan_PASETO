import { useEffect, useMemo, useState } from "react";
import { Spin, Form, Input, Button, Row, Col } from "antd";
import { OptionProps } from "antd/es/select";

import { ISearchDanhMucThuTucPortal } from "../../DanhMucThuTuc/models/DanhMucThuTucPortal";
import { CoCauToChucPortalService } from "../../CoCauToChuc/services/CoCauToChucPortal";
import { ISearchCoCauToChucPortal } from "../../CoCauToChuc/models/CoCauToChucPortal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useSearchParams } from "react-router-dom";
import { PortalSearchThuTuc as DispatchSearchThuTuc } from "@/features/thutuc/redux/action";
import { ILinhVuc, ISearchLinhVuc } from "@/features/linhvuc/models";
import { SearchLinhVucTheoDonVi } from "@/features/linhvuc/redux/action";
import { PortalSearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AntdSelect } from "@/lib/antd/components";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { useDvcTrucTuyenPortalContext } from "../context/DvcTrucTuyenPortalContext";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
export const SO_BAN_NGANH = "so-ban-nganh";
export const QUAN_HUYEN = "quan-huyen";
export const XA_PHUONG = "xa-phuong";
export const CHI_NHANH_VPDKDD = "cnvpdk";
const capThucHiens = [
  { value: SO_BAN_NGANH, label: "Cấp tỉnh" },
  { value: QUAN_HUYEN, label: "Cấp huyện" },
  { value: XA_PHUONG, label: "Cấp xã" },
  // { value: CHI_NHANH_VPDKDD, label: "Chi nhánh VPĐK đất đai" },

];
const capThucHienValueFormat = {
  'so-ban-nganh': 'CapTinh',
  'quan-huyen': 'CapHuyen',
  'xa-phuong': 'CapXa',
  // 'cnvpdk': 'cnvpdk',
}
const doiTuongThucHienOptions = [
  { value: "1", label: "Công dân" },
  { value: "7", label: "Tổ chức" },
  { value: "5", label: "Doanh nghiệp" },
];

export const SearchThuTuc = () => {
  const [form] = Form.useForm<ISearchDanhMucThuTucPortal>();
  const dispatch = useAppDispatch();
  const { maHuyen, maTinh, maXa } = useAppSelector(
    (state) => state.cocautochuc
  );
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const capThucHien = Form.useWatch("capThucHien", form);
  const currMaHuyen = Form.useWatch("maHuyen", form);
  const dichVuCongTrucTuyenContext = useDvcTrucTuyenPortalContext();
  const [maTinhArrange, setMaTinhArrange] = useState<any[]>()
  // const [searchLinhVucParams, setSearchLinhVucParams] =
  //   useState<ISearchLinhVuc>({
  //     pageNumber: 1,
  //     pageSize: 1000,

  //   });
  useEffect(() => {
    if (maTinh) {
      const sortedDonVis = [...maTinh].sort((a, b) => {
        if (a.catalog === b.catalog) {
          return a.groupName.localeCompare(b.groupName);
        } else if (a.catalog === "so-ban-nganh") {
          return -1;
        } else if (b.catalog === "so-ban-nganh") {
          return 1;
        } else if (a.catalog === "cnvpdk") {
          return 1;
        } else if (b.catalog === "cnvpdk") {
          return -1;
        } else {
          return (a.catalog || 'so-ban-nganh').localeCompare(b.catalog || 'so-ban-nganh');
        }
      });
      
      setMaTinhArrange(sortedDonVis)
    }
  }, [maTinh]);


  const onFormValuesChange = (
    formData: Record<string, string>,
    values: ISearchDanhMucThuTucPortal
  ) => {
    if (formData.tuKhoa) {
      return;
    }
    if (formData.capThucHien) {
      delete values.maTinh;
      delete values.maXa;
      delete values.maHuyen;
      delete values.donViCapHuyen;
      values.donVi = undefined;
      values.maTTHC = undefined;
      values.donViCapHuyen = undefined;
      dichVuCongTrucTuyenContext.setCapThucHien(formData.capThucHien)
    }
    if (values.maTinh || values.maXa || values.maHuyen) {
      const donVi =
        capThucHien == SO_BAN_NGANH
          ? values.maTinh
          : capThucHien == QUAN_HUYEN
            ? values.maHuyen
            : capThucHien == XA_PHUONG
              ? values.maXa || values.maHuyen
              : undefined;

      dichVuCongTrucTuyenContext.handleUrlQueryStringChange({
        ...formData,
        tuKhoa: values.tuKhoa,
        mucDo: values.mucDo,
        donVi: formData.maHuyen && values.capThucHien == XA_PHUONG ? undefined : donVi,
        donViCapHuyen:
          capThucHien == XA_PHUONG && values.maHuyen
            ? values.maHuyen
            : undefined,
        pageSize: "10",
        pageNumber: "1",
        maTTHC: undefined,
      } as any);
      return;
    }
    if (
      !values.maTinh &&
      !values.maXa &&
      !values.maHuyen &&
      !values.donViCapHuyen
    ) {
      values.donVi = undefined;
      values.donViCapHuyen = undefined;
    }

    dichVuCongTrucTuyenContext.handleUrlQueryStringChange({ ...values } as any);
  };

  const urlThuTucQuery = useMemo(() => {
    const urlQuery: Record<string, any> = {};

    dichVuCongTrucTuyenContext.searchParams.forEach((value, key) => {
      urlQuery[key] = value;
    });
    return urlQuery;
  }, [dichVuCongTrucTuyenContext.searchParams]);

  useEffect(() => {
    if (!Object.keys(urlThuTucQuery).length) {
      form.resetFields();
    } else {
      if (!("donVi" in urlThuTucQuery)) {
        form.resetFields(["maTinh", "maHuyen", "maXa"]);
      }
      form.setFieldsValue({ ...urlThuTucQuery });
      if (urlThuTucQuery["donViCapHuyen"]) {
        form.setFieldValue("maHuyen", urlThuTucQuery["donViCapHuyen"]);
      }
    }
  }, [urlThuTucQuery]);

  useEffect(() => {
    const capThucHienQs =
      dichVuCongTrucTuyenContext.searchParams.get("capThucHien");
    const pageSizeQueryParam =
      dichVuCongTrucTuyenContext.searchParams.get("pageSize");
    const pageNumberQueryParam =
      dichVuCongTrucTuyenContext.searchParams.get("pageNumber");
    const donVi =
      dichVuCongTrucTuyenContext.searchParams.get("donVi") || undefined;
    const pageNumber = pageNumberQueryParam
      ? +pageNumberQueryParam
      : donVi
        ? 1
        : 1;
    const pageSize = pageSizeQueryParam ? +pageSizeQueryParam : donVi ? 50 : 50;
    const maLinhVucChinh =
      dichVuCongTrucTuyenContext.searchParams.get("maLinhVucChinh") ||
      undefined;
    const tuKhoa =
      dichVuCongTrucTuyenContext.searchParams.get("tuKhoa") || undefined;
    const mucDo =
      dichVuCongTrucTuyenContext.searchParams.get("mucDo") || undefined;
    const doiTuongThucHien =
      dichVuCongTrucTuyenContext.searchParams.get("doiTuongThucHien") ||
      undefined;

    dispatch(
      DispatchSearchThuTuc({
        pageNumber,
        pageSize,
        donVi,
        maLinhVucChinh,
        tuKhoa,
        mucDo,
        doiTuongThucHien,
        laTTHCTrucTuyen: true,
        suDung:true,
        capThucHien: capThucHienQs ? (capThucHienValueFormat as any)[capThucHienQs] : undefined
      })
    );
    if (!donVi) {
      dichVuCongTrucTuyenContext.setTruongHopThuTucs(undefined);
    }
  }, [
    dichVuCongTrucTuyenContext.searchParams.get("pageSize"),
    dichVuCongTrucTuyenContext.searchParams.get("pageNumber"),
    dichVuCongTrucTuyenContext.searchParams.get("donVi"),
    dichVuCongTrucTuyenContext.searchParams.get("doiTuongThucHien"),
    dichVuCongTrucTuyenContext.searchParams.get("maLinhVucChinh"),
    dichVuCongTrucTuyenContext.searchParams.get("tuKhoa"),
    dichVuCongTrucTuyenContext.searchParams.get("mucDo"),
    dichVuCongTrucTuyenContext.searchParams.get("capThucHien"),
  ]);

  const linhVucDonVis = useMemo(() => {
    if (
      thuTucs &&
      dichVuCongTrucTuyenContext.searchParams.has("donVi")
      && linhVucs
    ) {
      var tmpLinhVucs = linhVucs?.filter(linhVuc => thuTucs.find(thuTuc => thuTuc.maLinhVucChinh == linhVuc.ma))


      return tmpLinhVucs
    }
  }, [thuTucs, dichVuCongTrucTuyenContext.searchParams]);

  useEffect(() => {
    const currCapThucHien = form.getFieldValue("capThucHien") ||
      dichVuCongTrucTuyenContext.searchParams.get("capThucHien");


    const donVi = dichVuCongTrucTuyenContext.searchParams.get("donVi");
    if (currCapThucHien === SO_BAN_NGANH) {
      if (donVi) form.setFieldValue("maTinh", donVi);
      if (!maTinh?.length) {
        dispatch(
          PortalSearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            cataLog: currCapThucHien,
          })
        );
      }
    } else if (currCapThucHien === QUAN_HUYEN) {
      if (donVi) form.setFieldValue("maHuyen", donVi);
      if (!maHuyen?.length) {
        dispatch(
          PortalSearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            cataLog: currCapThucHien,
          })
        );
      }
    } else if (currCapThucHien === XA_PHUONG) {
      const currSelectMaHuyen = form.getFieldValue("maHuyen");
      if (donVi && currSelectMaHuyen != donVi)
        form.setFieldValue("maXa", donVi);
      if (!maHuyen?.length) {
        dispatch(
          PortalSearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            cataLog: QUAN_HUYEN,
          })
        );
      }
      // if (!maXa?.length && currSelectMaHuyen) {
      //   dispatch(
      //     PortalSearchCoCauToChuc({
      //       pageNumber: 1,
      //       pageSize: 5000,
      //       cataLog: XA_PHUONG,
      //       ofGroupCode: currSelectMaHuyen,
      //       getAllChildren: true,
      //     })
      //   );
      // }
    }
  }, [
    dichVuCongTrucTuyenContext.searchParams.get("capThucHien"),
    dichVuCongTrucTuyenContext.searchParams.get("donVi"),
    capThucHien,
    maTinh,
    maHuyen,
    maXa,
  ]);

  useEffect(() => {
    const currCapThucHien = form.getFieldValue("capThucHien") ||
    dichVuCongTrucTuyenContext.searchParams.get("capThucHien");
    form.setFieldValue("maXa", undefined);
    if (currMaHuyen && currCapThucHien === XA_PHUONG) {
      dispatch(
        PortalSearchCoCauToChuc({
          pageNumber: 1,
          pageSize: 5000,
          cataLog: XA_PHUONG,
          ofGroupCode: currMaHuyen,
        })
      );
    }
  }, [currMaHuyen]);

  useEffect(() => {
    dispatch(SearchLinhVucTheoDonVi({ pageNumber: 1, pageSize: 10000, donViId: dichVuCongTrucTuyenContext.searchParams.get("donVi") || undefined, }));
  }, [dichVuCongTrucTuyenContext.searchParams.get("donVi"),]);

  const onFinish = (formData: ISearchDanhMucThuTucPortal) => {
    dichVuCongTrucTuyenContext.handleUrlQueryStringChange({
      ...formData,
    } as any);
  };
  return (
    <Form
      form={form}
      name="FilterThuTuc"
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onFormValuesChange}
    >

      <div className="row" style={{ display: 'flex' }}>
        <div
          className="col-lg-4 col-6"
        //   style={{ flex: 1 }}
        >
          <Form.Item name="capThucHien" label="Cấp thực hiện">
            <AntdSelect
              options={capThucHiens}
              allowClear
              showSearch
              placeholder="Chọn cấp thực hiện"
            />
          </Form.Item>
        </div>
        <div
          className="col-md-4 col-12"
          // style={{ flex: 1, }}
          hidden={capThucHien == SO_BAN_NGANH ? false : true}
        >
          <Form.Item name="maTinh" label="Đơn vị">
            <AntdSelect
              generateOptions={{
                model: maTinhArrange,
                value: "groupCode",
                label: "groupName",
              }}
              allowClear
              showSearch
              placeholder="Chọn đơn vị thực hiện"
            />
          </Form.Item>
        </div>
        <div
          className="col-md-4 col-6"
          // style={{ flex: 1 }}
          hidden={
            capThucHien == QUAN_HUYEN || capThucHien == XA_PHUONG ? false : true
          }
        >
          <Form.Item name="maHuyen" label="Cấp huyện">
            <AntdSelect
              generateOptions={{
                model: maHuyen,
                value: "groupCode",
                label: "groupName",
              }}
              allowClear
              showSearch
              placeholder="Chọn đơn vị cấp huyện"
            />
          </Form.Item>
        </div>
        <div
          // className="col-md-6 col-6"
          style={{ flex: 1 }}
          hidden={capThucHien == XA_PHUONG ? false : true}
        >
          <Form.Item name="maXa" label="Cấp xã">
            <AntdSelect
              generateOptions={{
                model: maXa,
                value: "groupCode",
                label: "groupName",
              }}
              showSearch
              allowClear
              placeholder="Chọn đơn vị cấp xã"
            />
          </Form.Item>
        </div>
      </div>

      <div className="row" style={{ display: 'flex' }}>
        <div
          // className="col-lg-4 col-6"
          style={{ flex: 1 }}
        >
          <Form.Item name="maLinhVucChinh" label="Lĩnh vực">
            <AntdSelect
              generateOptions={{
                model: linhVucs,
                value: "ma",
                label: "ten",
              }}
              allowClear
              showSearch
              placeholder="Chọn lĩnh vực"
            />
          </Form.Item>
        </div>
        <div
          // className="col-md-6 col-12"
          style={{ flex: 1 }}
        >
          <Form.Item name="doiTuongThucHien" label="Đối tượng thực hiện">
            <AntdSelect
              options={doiTuongThucHienOptions}
              allowClear
              showSearch
              placeholder="Chọn đối tượng thực hiện"
            />
          </Form.Item>
        </div>
        <div
          // className="col-lg-4 col-6"
          style={{ flex: 1 }}
        >
          <Form.Item name="mucDo" label="Mức độ">
            <AntdSelect
              options={(
                Object.keys(MUCDO_THUTUC) as Array<keyof typeof MUCDO_THUTUC>
              ).filter(x => x != "2").map((key) => ({
                value: key,
                label: MUCDO_THUTUC[key],
              }))}
              allowClear
              showSearch
              placeholder="Chọn mức độ"
            />
          </Form.Item>
        </div>
      </div>

      <div className="row" >
        <div className="col-md-10 col-12">
          <Form.Item name="tuKhoa" label="Từ khóa">
            <Input placeholder="Nhập từ khóa tìm kiếm dịch vụ công trực tuyến" />
          </Form.Item>
        </div>
        <div className="text-align-center button col-md-2 col-12" >
          <Button className="buttonSearchPortal" htmlType="submit" style={{ width: '100%' }}>
            Tìm kiếm
          </Button>
        </div>
      </div>
    </Form>
  );
};
