import { useMemo, useState } from "react";
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

import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { DatLaiQuyTrinhXuLyModal } from "@/features/hoso/components/actions/datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import {
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { ThongKeDanhSachHoSoProvider } from "../contexts/ThongKeDanhSachHoSoContext";
import { ThongKeDanhSachHoSoSearch } from "./ThongKeDanhSachHoSoSearch";
import { useHoSoTheoBaoCaoTongHopColumn } from "@/features/hoSoTheoBaoCaoTongHop/hooks/useHoSoTheoBaoCaoTongHopColumn";

const ThongKeDanhSachHoSoTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    data: hoSo,
    count,
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["thong-ke-danh-sach-ho-so"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
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
  const { columns } = useHoSoTheoBaoCaoTongHopColumn(
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
        <ThongKeDanhSachHoSoSearch setSearchParams={setSearchParams} />
        <div className="table-responsive">
          <AntdTable
            columns={columns}
            dataSource={hoSos}
            pagination={{
              total: count,
            }}
            rowSelection={rowSelection}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => dispatch(SearchHoSo(params))}
          />
        </div>
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ThongKeDanhSachHoSoProvider>
    <ButtonActionProvider>
      <ThongKeDanhSachHoSoTable />
    </ButtonActionProvider>
  </ThongKeDanhSachHoSoProvider>
);
export default HoSoTableWrapper;
