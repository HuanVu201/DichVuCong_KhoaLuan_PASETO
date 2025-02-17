import "bootstrap/dist/css/bootstrap.css";

import { Select, Space, Input, Form, Button, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CrudLocalStorage } from "@/services/localstorage";
import { IPaginationResponse } from "@/models";
import { SelectProps } from "antd/lib";
import { OptionProps } from "antd/es/select";
import { ISearchLinhVuc } from "@/features/linhvuc/models";
import { ISearchDonVi } from "@/features/donvi/models";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { AntdSelect } from "@/lib/antd/components";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

// const linhVuc = [
//   { value: "", label: "--Chọn lĩnh vực--" },
//   { value: "anToanBucXaVaHatNhan", label: "An toàn bức xạ và hạt nhân" },
//   { value: "anToanDapHoChuaThuyDien", label: "An toàn đập, hồ chứa thủy điện" },
//   { value: "anToanThucPham", label: "An toàn thực phẩm" },
// ];

const capThucHien = [
  { value: "", label: "--Chọn cấp thực hiện--" },
  { value: "so-ban-nganh", label: "--Cấp tỉnh--" },
  { value: "quan-huyen", label: "--Cấp huyện--" },
  { value: "xa-phuong", label: "--Cấp xã--" },
];
const otherCatalogOptions = [
  { value: "", label: "--Chọn nhóm khác" },
  { value: "mien-nui", label: "Miền núi" },
  { value: "hai-dao", label: "Hải đảo" },
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

function SearchDonViContainer() {
  const thuTucContext = useThuTucContext();
  let [form] = Form.useForm<ISearchDonVi>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [searchDanhMucParams, setSearchDanhMucParams] =
  useState<ISearchDanhMucChung>({
    pageNumber: 1,
    pageSize: 1000,
  });
  const { datas: danhMucChungs } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  useEffect(() => {
    (async () => {
      if(danhMucChungs === undefined){
        await dispatch(SearchDanhMucChung(searchDanhMucParams));
      }
    })();
  }, [danhMucChungs, ]);
  const nhomCoCauKhacs = useMemo(() => {
    return danhMucChungs?.filter((x) => x.type == "nhom-co-cau-khac") ?? [];
  }, [danhMucChungs]);
  const setSearchValue = () => {
    thuTucContext.setSearchDonViParams({
      ...thuTucContext.searchDonViParams,
      catalog: form.getFieldValue("capThucHien") || null,
      otherCatalog: form.getFieldValue("otherCatalog") || null,
    });
    
    // thuTucContext.setSearch({
    //   ...thuTucContext.search,
    //   maLinhVucChinh: form.getFieldValue("linhVuc") || null,
    //   doiTuong: form.getFieldValue("doiTuong") || null,
    //   capThucHien: form.getFieldValue("capThucHien") || null,
    //   tuKhoa: form.getFieldValue("searchKeys") || null,
    // });
    // thuTucContext.setThuTucId(null);
  };
  return (
    <Spin spinning={loading}>
      <div className="SearchDonViContainer">
        <div className="selectBlock">
          <Form form={form} name="FilterThuTuc">
            <div className="row">
              <div className="col-6 selectValue">
                <Form.Item name="capThucHien">
                  <Select defaultValue="" options={capThucHien} />
                </Form.Item>
              </div>
              <div className="col-6 selectValue">
                <Form.Item name="otherCatalog" label="Nhóm khác">
                  <AntdSelect
                    generateOptions={{
                      model: nhomCoCauKhacs,
                      value: "code",
                      label: "tenDanhMuc",
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            

            <div className="row row-search">
              <Form.Item>
                <Button onClick={setSearchValue}>Tìm kiếm</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
}

export default SearchDonViContainer;
