import "bootstrap/dist/css/bootstrap.css";
import "./HeaderContainerTTHC.scss";

import { Select, Space, Input, Form, Button, Spin } from "antd";
import { ISearchDanhMucThuTucPortal } from "../models/DanhMucThuTucPortal";
import { useDanhMucThuTucPortalContext } from "../context/DanhMucThuTucPortalContext";
import { useEffect, useState } from "react";
import { CrudLocalStorage } from "@/services/localstorage";
import { IPaginationResponse } from "@/models";
import { LinhVucPortalService } from "../services/LinhVucsPortal";
import { SelectProps } from "antd/lib";
import { OptionProps } from "antd/es/select";
import { ISearchLinhVuc } from "@/features/linhvuc/models";
import { DanhMucThuTucPortalService } from "../services/DanhMucThuTucPortal";
import { combineReducers } from "@reduxjs/toolkit";
import { AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { PortalSearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchLinhVucTheoDonVi } from "@/features/linhvuc/redux/action";
interface IValueHeader {
  maLinhVuc: any,
  capThucHien: any,
  tuKhoa: any,
}

// export const capThucHien = [
//   { value: "", label: "--Chọn cấp thực hiện--" },
//   { value: "CapTinh", label: "Cấp tỉnh" },
//   { value: "CapHuyen", label: "Cấp huyện" },
//   { value: "CapXa", label: "Cấp xã" },
// ];
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

export const mucDo = [
  { value: "2", label: "Dịch vụ cung cấp thông tin trực tuyến" },
  { value: "3", label: "DVC TT một phần" },
  { value: "4", label: "DVC TT toàn trình" },
];
export const thucHienTaiBoPhanMotCuas = [
  { value: true, label: "Có" },
  { value: false, label: "Không" },
]

const doiTuong = [
  { value: "1", label: "Công dân" },
  { value: "2", label: "Tổ chức" },
  { value: "3", label: "Doanh nghiệp" },
];

function ContainerTTHC() {
  const thuTucContext = useDanhMucThuTucPortalContext();
  // const [valParams, setValParams] = useState<IValueHeader>()
  const dispatch = useAppDispatch();
  let [form] = Form.useForm<ISearchLinhVuc>();
  const capThucHien = Form.useWatch("capThucHien", form);
  const currMaHuyen = Form.useWatch("maHuyen", form);
  const crudLocalStorage = new CrudLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [maTinhArrange, setMaTinhArrange] = useState<any[]>()
  const [donVi, setDonVi] = useState<string>()
  const { maHuyen, maTinh, maXa } = useAppSelector(
    (state) => state.cocautochuc
  );

  // console.log(thuTucContext.searchParams.get("TuKhoa"))
  useEffect(() => {
    if (thuTucContext.searchParams) {
      form.setFieldValue('searchKeys', thuTucContext.searchParams.get("TuKhoa"))
      form.setFieldValue('capThucHien', thuTucContext.searchParams.get("CapThucHien"))
      form.setFieldValue('maLinhVucChinh', thuTucContext.searchParams.get("MaLinhVuc"))
      form.setFieldValue('mucDo', thuTucContext.searchParams.get("MucDo"))
      form.setFieldValue('doiTuongThucHien', thuTucContext.searchParams.get("DoiTuongThucHien"))
      form.setFieldValue('thucHienTaiBoPhanMotCua',
        thuTucContext.searchParams.get("ThucHienTaiBoPhanMotCua") == '1' ? true
          : thuTucContext.searchParams.get("ThucHienTaiBoPhanMotCua") == '0' ? false : undefined
      )
    }
  }, [thuTucContext.searchParams])

  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);


  const setSearchValue = () => {
    thuTucContext.setThuTucId(null);
    thuTucContext.handleUrlQueryStringChange({
      MaLinhVuc: form.getFieldValue("maLinhVucChinh"),
      CapThucHien: form.getFieldValue("capThucHien"),
      TuKhoa: form.getFieldValue("searchKeys"),
      MucDo: form.getFieldValue("mucDo"),
      DoiTuongThucHien: form.getFieldValue('doiTuongThucHien'),
      DonViThucHien: form.getFieldValue('maXa') || form.getFieldValue('maHuyen') || form.getFieldValue('maTinh'),
      ThucHienTaiBoPhanMotCua: form.getFieldValue("thucHienTaiBoPhanMotCua") == true ? '1'
        : form.getFieldValue("thucHienTaiBoPhanMotCua") == false ? '0' : ''
    })
  };


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

  useEffect(() => {
    const currCapThucHien = form.getFieldValue("capThucHien")

    if (currCapThucHien === SO_BAN_NGANH) {
      form.setFieldValue("maTinh", undefined);
      form.setFieldValue("maHuyen", undefined);
      form.setFieldValue("maXa", undefined);
      setDonVi(undefined)
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
      form.setFieldValue("maTinh", undefined);
      form.setFieldValue("maHuyen", undefined);
      form.setFieldValue("maXa", undefined);
      setDonVi(undefined)
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
      // form.setFieldValue("maHuyen", undefined);
      const currSelectMaHuyen = form.getFieldValue("maHuyen");
      form.setFieldValue("maTinh", undefined);
      form.setFieldValue("maXa", undefined);
      // if (donVi && currSelectMaHuyen != donVi)
      //   form.setFieldValue("maXa", donVi);
      if (!maHuyen?.length) {
        dispatch(
          PortalSearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            cataLog: QUAN_HUYEN,
          })
        );
      }

    } else {
      form.setFieldValue("maTinh", undefined);
      form.setFieldValue("maHuyen", undefined);
      form.setFieldValue("maXa", undefined);
    }
  }, [
    capThucHien,
    maTinh,
    maHuyen,
    maXa,
  ]);

  useEffect(() => {
    const currCapThucHien = form.getFieldValue("capThucHien")
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
    dispatch(SearchLinhVucTheoDonVi({ pageNumber: 1, pageSize: 10000, donViId: donVi || undefined, }));
  }, [donVi]);

  return (
    <Spin spinning={loading}>
      <div className="ContainerTTHC">
        <div className="selectBlock">
          <Form form={form} name="FilterThuTuc">
            <div className="row">
              <div
                className="col-md-3 col-12"
              >
                <Form.Item name="capThucHien">
                  <AntdSelect
                    options={capThucHiens}
                    allowClear={true}
                    showSearch
                    placeholder="Chọn cấp thực hiện"
                  />
                </Form.Item>
              </div>
              <div
                className="col-md-3 col-12"
                // style={{ flex: 1, }}
                hidden={capThucHien == SO_BAN_NGANH ? false : true}
              >
                <Form.Item name="maTinh">
                  <AntdSelect
                    generateOptions={{
                      model: maTinhArrange,
                      value: "groupCode",
                      label: "groupName",
                    }}
                    allowClear={true}
                    showSearch
                    placeholder="Chọn đơn vị thực hiện"
                    onChange={(value) => setDonVi(value)}
                  />
                </Form.Item>
              </div>
              <div
                className="col-md-3 col-12"
                // style={{ flex: 1 }}
                hidden={
                  capThucHien == QUAN_HUYEN || capThucHien == XA_PHUONG ? false : true
                }
              >
                <Form.Item name="maHuyen">
                  <AntdSelect
                    generateOptions={{
                      model: maHuyen,
                      value: "groupCode",
                      label: "groupName",
                    }}
                    allowClear={true}
                    showSearch
                    placeholder="Chọn đơn vị cấp huyện"
                    onChange={(value) => setDonVi(value)}
                  />
                </Form.Item>
              </div>
              <div
                className="col-md-3 col-12"
                // style={{ flex: 1 }}
                hidden={capThucHien == XA_PHUONG ? false : true}
              >
                <Form.Item name="maXa">
                  <AntdSelect
                    generateOptions={{
                      model: maXa,
                      value: "groupCode",
                      label: "groupName",
                    }}
                    showSearch
                    allowClear={true}
                    placeholder="Chọn đơn vị cấp xã"
                    onChange={(value) => setDonVi(value)}
                  />
                </Form.Item>
              </div>
              <div className="col-md-3 col-12 selectValue">
                <Form.Item name="thucHienTaiBoPhanMotCua">
                  <AntdSelect
                    generateOptions={{
                      model: thucHienTaiBoPhanMotCuas,
                      value: "value",
                      label: "label",
                    }}
                    allowClear={true}
                    showSearch
                    placeholder="Thực hiện tại bộ phận một cửa"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-12 selectValue">
                <Form.Item name="maLinhVucChinh">
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
              <div className="col-md-4 col-12 selectValue">
                <Form.Item name="mucDo">
                  <AntdSelect
                    generateOptions={{
                      model: mucDo,
                      value: "value",
                      label: "label",
                    }}
                    allowClear={true}
                    showSearch
                    placeholder="Chọn mức độ"
                  />
                </Form.Item>
              </div>
              <div className="col-md-4 col-12 selectValue">
                <Form.Item name="doiTuongThucHien">
                  <AntdSelect
                    generateOptions={{
                      model: doiTuong,
                      value: "value",
                      label: "label",
                    }}
                    allowClear={true}
                    showSearch
                    placeholder="Chọn đối tượng thực hiện"
                  />
                </Form.Item>
              </div>
              

            </div>

            <div className="row">
              <div className="col-md-10 col-12  selectValue">
                <Form.Item name="searchKeys">
                  <Input placeholder="Nhập từ khóa" />
                </Form.Item>
              </div>
              <div className="col-md-2 col-12 selectValue text-align-center button" style={{ marginBottom: '10px' }}>
                <Button className="buttonSearchPortal" htmlType="submit" onClick={setSearchValue}
                  style={{ width: '100%' }}
                >
                  Tìm kiếm
                </Button>
              </div>

            </div>
          </Form>
        </div>

        <div className="ContainerTTHC"></div>
      </div>
    </Spin>
  );
}

export default ContainerTTHC;
