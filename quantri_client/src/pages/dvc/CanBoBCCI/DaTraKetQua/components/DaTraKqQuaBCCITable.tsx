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
import { DaTraKqQuaBCCISearch } from "./DaTraKqQuaBCCISearch";
import { CanBoBCCISearch, SearchHoSo } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  DaTraKqQuaBCCIProvider,
  useDaTraKqQuaBCCIContext,
} from "../contexts/DaTraKqQuaBCCIContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";

import {
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useHoSoCanBoBCCIColumn } from "@/features/hoso/hooks/useHoSoCanBoBCCIColumn";
import { useHoSoCanBoBCCIDaDangKyDaTraKqColumn } from "@/features/hoso/hooks/useHoSoCanBoBCCIDaDangKyDaTraKqColumn";

import { XuatDanhSachHoSoCanBoBCCIModal2 } from "./XuatDanhSachHoSoCanBoBCCI2";

const DaTraKqQuaBCCITable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    data: hoSo,
    count,
    loading
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["da-tra-kq-qua-bcci"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    // nhanKetQuaBCCI: true,
    canBoBCCIDaDangKy: true,
    donViTraKq: user?.officeCode,
    daYeuCauBCCILayKetQua: true,
    inMaTrangThais: ["2","4","5","6","7","8","9","10"],
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
  const { columns } = useHoSoCanBoBCCIDaDangKyDaTraKqColumn(
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
        <DaTraKqQuaBCCISearch setSearchParams={setSearchParams} />
        <Spin spinning={loading}>
        <AntdTable
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count,
          }}
          rowSelection={rowSelection}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(CanBoBCCISearch(params))}
        />
         </Spin>
      </AntdSpace>
      <XuatDanhSachHoSoCanBoBCCIModal2 data={hoSos} searchParams={searchParams} />
     
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <DaTraKqQuaBCCIProvider>
    <ButtonActionProvider>
      <DaTraKqQuaBCCITable />
    </ButtonActionProvider>
  </DaTraKqQuaBCCIProvider>
);
export default HoSoTableWrapper;
