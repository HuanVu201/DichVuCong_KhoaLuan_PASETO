import { Suspense, lazy, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { HoSoDaThuPhiTrucTuyenSearch } from "./HoSoDaThuPhiTrucTuyenSearch";
import {
  SearchHoSo,
  SearchHoSoTheoTrangThaiThuPhi,
} from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  HoSoDaThuPhiTrucTuyenProvider,
  useHoSoDaThuPhiTrucTuyenContext,
} from "../contexts/HoSoDaThuPhiTrucTuyenContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { useHoSoDaThuPhiTrucTuyenColumn } from "../hooks/HoSoDaThuPhiTrucTuyenColumn";

const HoSoDaThuPhiTrucTuyenTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["ho-so-da-thu-phi-truc-tuyen"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    donViYeuCauThuPhi: user?.officeCode,
    trangThaiThuPhi: "Đã thanh toán",
    hinhThucThuPhi: "truc-tuyen",
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
  const { columns } = useHoSoDaThuPhiTrucTuyenColumn(searchParams, items);
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
        <HoSoDaThuPhiTrucTuyenSearch setSearchParams={setSearchParams} />

        <AntdTable
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count,
          }}
          rowSelection={rowSelection}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchHoSoTheoTrangThaiThuPhi(params))}
        />
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <HoSoDaThuPhiTrucTuyenProvider>
    <ButtonActionProvider>
      <HoSoDaThuPhiTrucTuyenTable />
    </ButtonActionProvider>
  </HoSoDaThuPhiTrucTuyenProvider>
);
export default HoSoTableWrapper;
