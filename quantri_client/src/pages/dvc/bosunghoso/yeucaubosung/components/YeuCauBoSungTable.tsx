import { Suspense, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { YeuCauBoSungSearch } from "./YeuCauBoSungSearch";
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  YeuCauBoSungProvider,
  useYeuCauBoSungContext,
} from "../contexts/YeuCauBoSungContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useBoSungHoSoColumn } from "../../hooks/useBoSungHoSoColumn";

const YeuCauBoSungTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["yeu-cau-bo-sung"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai: "5",
    // groupCode: user?.officeCode,
    byCurrentUser: true,
    trangThaiBoSung: "Yêu cầu một cửa bổ sung",
    trangThaiTraKq: "3",
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            style={{ fontSize: "18px" }}
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
    ],
    []
  );
  const { columns } = useBoSungHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <div className="row">
          <div className="col-auto"></div>
          <div className="col">
            <SearchHoSoComp
              btnComfirmLoading={loading}
              setSearchParams={setSearchParams}
              defaultVisible={false}
              showAdvanceSearchBtn
            />
          </div>
        </div>
        <hr style={{ margin: "8px 0" }} />
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
          onSearch={(params) => dispatch(SearchNguoiDangXuLy(params))}
        />
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <YeuCauBoSungProvider>
    <ButtonActionProvider>
      <YeuCauBoSungTable />
    </ButtonActionProvider>
  </YeuCauBoSungProvider>
);
export default HoSoTableWrapper;
