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
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { constants } from "fs/promises";
import { IDanhMucChung, ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { AntdSelect } from "@/lib/antd/components";
import { danhMucChungApi } from "@/features/danhmucdungchung/services";

// const linhVuc = [
//   { value: "", label: "--Chọn lĩnh vực--" },
//   { value: "anToanBucXaVaHatNhan", label: "An toàn bức xạ và hạt nhân" },
//   { value: "anToanDapHoChuaThuyDien", label: "An toàn đập, hồ chứa thủy điện" },
//   { value: "anToanThucPham", label: "An toàn thực phẩm" },
// ];
const otherCatalogOptions = [
  { value: "", label: "--Chọn nhóm đơn vị khác" },
  { value: "mien-nui", label: "Miền núi" },
  { value: "hai-dao", label: "Hải đảo" },
];
function SearchDonViContainer() {
  const thuTucContext = useThuTucContext();
  let [form] = Form.useForm<ISearchDonVi>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { datas: danhMucChungs } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const [searchDanhMucParams, setSearchDanhMucParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 1000,
    });
  const [danhMucChungNhomCoCau, setDanhMucChungNhomCoCau] = useState<IDanhMucChung[]>([])
  const [danhMucChungNhomCoCauKhac, setDanhMucChungNhomCoCauKhac] = useState<IDanhMucChung[]>([])
  useEffect(() => {
    (async () => {
      const res = await danhMucChungApi.Search({ pageNumber: 1, pageSize: 1000, type: 'nhom-co-cau' })
      setDanhMucChungNhomCoCau(res.data.data as any)
    })();
  }, [])
  useEffect(() => {
    (async () => {
      const res = await danhMucChungApi.Search({ pageNumber: 1, pageSize: 1000, type: 'nhom-co-cau-khac' })
      setDanhMucChungNhomCoCauKhac(res.data.data as any)
    })();
  }, [])
  
  const setSearchValue = () => {
    thuTucContext.setSearchDonViParams({
      ...thuTucContext.searchDonViParams,
      catalog: form.getFieldValue("capThucHien") || null,
      otherCatalog: form.getFieldValue("otherCatalog") || null,
      maDinhDanhCha: form.getFieldValue("maDinhDanh") || null,
    });

  };

  const capThucHiens = useMemo(() => {
    return danhMucChungNhomCoCau?.filter((x) => x.type == "nhom-co-cau") ?? [];
  }, [danhMucChungNhomCoCau]);
  const nhomCoCauKhacs = useMemo(() => {
    return danhMucChungNhomCoCauKhac?.filter((x) => x.type == "nhom-co-cau-khac") ?? [];
  }, [danhMucChungNhomCoCauKhac]);
  return (
    <Spin spinning={loading}>
      <div className="SearchDonViContainer">
        <div className="selectBlock">
          <Form form={form} name="FilterThuTuc">
            <div className="row">
              <div className="col-4 selectValue">
                <Form.Item name="capThucHien" label="Nhóm cơ cấu">
                  <AntdSelect
                    generateOptions={{
                      model: capThucHiens,
                      label: "tenDanhMuc",
                      value: "code",
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-4 selectValue">
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
              <div className="col-4">
                <Form.Item name="maDinhDanh" label="Mã định danh">
                  <Input></Input>
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
