import { Suspense, lazy, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo, TRANGTHAITHUPHI } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ChoXacNhanTraKqSearch } from "./ChoXacNhanTraKqSearch";
import {
  SearchHoSo,
  SearchHoSoTheoTrangThaiThuPhi,
  XacNhanKetQua,
} from "@/features/hoso/redux/action";
import { MenuProps, Popconfirm, Spin } from "antd";
import {
  ChoXacNhanTraKqProvider,
  useChoXacNhanTraKqContext,
} from "../contexts/ChoXacNhanTraKqContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { useChoXacNhanKqColumn } from "../hooks/ChoXacNhanTraKqColumn";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";

const ChoXacNhanTraKqTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-xac-nhan-tra-kq"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    maTrangThai: "9",
    // groupCode: user?.officeCode,
    trangThaiChuaHoacKhongThuPhi: false,
    //trangThaiThuPhi: TRANGTHAITHUPHI["Chờ thanh toán"],
    // nhanKetQuaBCCI: false,
    trangThaiTraKq: TrangThaiTraKetQuaContants.CHO_XAC_NHAN,
    groupCode: user?.officeCode,
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
    ],
    []
  );
  const { columns } = useChoXacNhanKqColumn(searchParams, items);
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
        <SearchHoSoComp setSearchParams={setSearchParams} />
        {searchParams.groupCode ? (
          <AntdTable
            columns={columns}
            dataSource={hoSos}
            pagination={{
              total: count,
            }}
            rowSelection={rowSelection}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) =>
              dispatch(SearchHoSoTheoTrangThaiThuPhi(params))
            }
          />
        ) : null}
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoXacNhanTraKqProvider>
    <ButtonActionProvider>
      <ChoXacNhanTraKqTable />
    </ButtonActionProvider>
  </ChoXacNhanTraKqProvider>
);
export default HoSoTableWrapper;
