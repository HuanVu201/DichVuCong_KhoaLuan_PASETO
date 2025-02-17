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
interface IValueHeader {
  maLinhVuc: any,
  capThucHien: any,
  tuKhoa: any,
}

const capThucHien = [
  { value: "", label: "--Chọn cấp thực hiện" },
  { value: "CapTinh", label: "--Cấp tỉnh--" },
  { value: "CapHuyen", label: "--Cấp huyện--" },
  { value: "CapXa", label: "--Cấp xã--" },
];

const doiTuong = [
  { value: "", label: "--Chọn đối tượng thực hiện--" },
  { value: "congDanVN", label: "Công dân Việt Nam" },
  { value: "dinhCuNuocNgoai", label: "Người Việt Nam định cư ở nước ngoài" },
  { value: "doanhNghiep", label: "Doanh nghiệp" },
  {
    value: "doanhNghiepVonNuocNgoai",
    label: "Doanh nghiệp có vốn đâu tư nước ngoài",
  },
  { value: "toChucNuocNgoai", label: "Tổ chức nước ngoài" },
];

function ContainerTTHC() {
  const thuTucContext = useDanhMucThuTucPortalContext();
  // const [valParams, setValParams] = useState<IValueHeader>()

  let [form] = Form.useForm<ISearchLinhVuc>();
  const crudLocalStorage = new CrudLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [linhVucs, setLinhVucs] = useState<OptionProps["options"]>([
    { value: "", label: "--Chọn lĩnh vực--" },
  ]);

  const [searchLinhVucParams, setSearchLinhVucParams] =
    useState<ISearchLinhVuc>({
      pageNumber: 1,
      pageSize: 1000,
    });

  // useEffect(() => {
  //   setValParams({
  //     maLinhVuc: thuTucContext.searchParams.get('MaLinhVuc') || "",
  //     capThucHien: thuTucContext.searchParams.get('CapThucHien') || "",
  //     tuKhoa: thuTucContext.searchParams.get('TuKhoa') || "",
  //   })
  // }, [thuTucContext.searchParams])

  const setSearchValue = () => {
    thuTucContext.setThuTucId(null);
    thuTucContext.handleUrlQueryStringChange({
      MaLinhVuc: form.getFieldValue("linhVuc"),
      CapThucHien: form.getFieldValue("capThucHien"),
      TuKhoa: form.getFieldValue("searchKeys"),
      MaThuTuc: ''
    })
  };

  const loadLinhVucs = async () => {
    setLoading(true);
    let linhVucServices = new LinhVucPortalService();
    let tmp = crudLocalStorage.getWithExpriry(
      `LinhVucSelectData_${searchLinhVucParams.pageNumber}_${searchLinhVucParams.pageSize}`
    );
    if (tmp) {
      let objLinhVucs: OptionProps["options"] = tmp;
      const listLinhVucs = [{ value: '', label: '--Chọn lĩnh vực--' }, ...objLinhVucs]
      setLinhVucs(listLinhVucs);
    } else {
      let resLinhVucs = await linhVucServices.Search(searchLinhVucParams);
      if (resLinhVucs?.data?.data) {
        const linhVucOptions: OptionProps["options"] =
          resLinhVucs.data.data.map((item) => {
            return {
              value: item.ma,
              label: item.ten,
            };
          });
        setLinhVucs([
          { value: "", label: "--Chọn lĩnh vực--" },
          ...linhVucOptions,
        ]);
        crudLocalStorage.setWithExpiry({
          key: `LinhVucSelectData_${searchLinhVucParams.pageNumber}_${searchLinhVucParams.pageSize}`,
          value: linhVucOptions,
          expiry: 300000,
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLinhVucs();
  }, [searchLinhVucParams]);
  return (
    <Spin spinning={loading}>
      <div className="ContainerTTHC">
        <div className="selectBlock">
          <Form form={form} name="FilterThuTuc">
            <div className="row">
              <div className="col-6 selectValue">
                <Form.Item name="linhVuc">
                  <Select
                    options={linhVucs}
                    defaultValue=""
                    showSearch
                    filterOption={(input: string, option) => {
                      if (!option?.label) return true;
                      let label = option?.label as string;
                      return (
                        label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-6 selectValue">
                <Form.Item name="capThucHien">
                  <Select options={capThucHien} defaultValue="" />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-12 selectValue">
                <Form.Item name="searchKeys">
                  <Input placeholder="Nhập từ khóa" />
                </Form.Item>
              </div>
            </div>
            <div className="row row-search">
              <Form.Item>
                <Button className="buttonSearchPortal" htmlType="submit" onClick={setSearchValue}>Tìm kiếm</Button>
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className="ContainerTTHC"></div>
      </div>
    </Spin>
  );
}

export default ContainerTTHC;
