import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { ChoTraKetQuaTTHCCProvider } from "../contexts/ChoTraKetQuaTTHCCContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useChoTraKetQuaColumn } from "../hook/useChoTraKetQuaColumn";
import { ChoTraKetQuaTTHCCSearch } from "./ChoTraKetQuaTTHCCSearch";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { TableProps } from "antd";

export const loaiNguoiNhanKetQuas = [
  { label: "Chủ hồ sơ", value: "chuHoSo" },
  { label: "Người được ủy quyền", value: "nguoiDuocUyQuyen" },
  { label: "Cán bộ bưu điện", value: "canBoBuuDien" },
  { label: "Người khác", value: "nguoiKhac" },
];


const ChoTraKetQuaTTHCCTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-tra-tthcc"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai: "9",
    donViTraKq: user?.officeCode,
    trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
    // daYeuCauBCCILayKetQua: true,
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
      {
        icon: (
          <EditOutlined
            title="Vị trí lưu hồ sơ"
            onClick={() =>
              buttonActionContext.setGhiChuViTriHoSoModalVisible(true)
            }
          />
        ),
      },
    ],
    []
  );
  const { columns } = useChoTraKetQuaColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    if (filters) {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== null && value !== undefined && value.length > 0)

      );

      if (Object.keys(cleanedFilters).length > 0) {
        if (cleanedFilters.trangThaiPhiLePhi) {
          setSearchParams((curr) => ({
            ...curr,
            pageNumber: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
            trangThaiThuPhi: cleanedFilters.trangThaiPhiLePhi != null ? cleanedFilters.trangThaiPhiLePhi[0] as any : "",
          }));
        }
      }
      else {
        setSearchParams({
          pageNumber: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          reFetch: true,
          maTrangThai :"9",
          donViTraKq: user?.officeCode,
          trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
        });
      }
    } else {
      setSearchParams({
        pageNumber: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        reFetch: true,
        maTrangThai :"9",
        donViTraKq: user?.officeCode,
        trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
      });
    }

  };


  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <ChoTraKetQuaTTHCCSearch
          setSearchParams={setSearchParams}
          defaultVisible={true}
        />
        {searchParams ? (
          <AntdTable
            loading={loading}
            columns={columns}
            dataSource={hoSos}
            pagination={{
              total: count,
            }}
            rowSelection={rowSelection}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => dispatch(SearchHoSo(params))}
            onChange={onChange}

          />
        ) : null}
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoTraKetQuaTTHCCProvider>
    <ButtonActionProvider>
      <ChoTraKetQuaTTHCCTable />
    </ButtonActionProvider>
  </ChoTraKetQuaTTHCCProvider>
);
export default HoSoTableWrapper;
