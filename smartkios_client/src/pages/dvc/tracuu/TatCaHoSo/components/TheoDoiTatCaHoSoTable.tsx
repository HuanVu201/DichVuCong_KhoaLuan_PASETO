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
import { TheoDoiTatCaHoSoSearch } from "./TheoDoiTatCaHoSoSearch";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  TheoDoiTatCaHoSoProvider,
  useTheoDoiTatCaHoSoContext,
} from "../contexts/TheoDoiTatCaHoSoContext";
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

const TheoDoiTatCaHoSoTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    data: hoSo,
    count,
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["tra-cuu-ho-so"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
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
      {
        icon: (
          <ReloadOutlined
            title="Đặt lại ngày hẹn trả"
            onClick={() =>
              buttonActionContext.setDatLaiHanXuLyModalVisible(true)
            }
          />
        ),
      },
      {
        icon: (
          <RollbackOutlined
            title="Đặt lại quy trình xử lý"
            onClick={() =>
              buttonActionContext.setDatLaiQuyTrinhXuLyModalVisible(true)
            }
          />
        ),
      },
      {
        icon: (
          <EditOutlined
            title="Admin sửa hồ sơ"
            onClick={() =>
              buttonActionContext.setAdminCapNhatHoSoModalVisible(true)
            }
          />
        ),
      },
    ],
    []
  );
  const { columns } = useHoSoColumn(
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
        <SearchHoSoComp setSearchParams={setSearchParams} />

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
      </AntdSpace>
      {buttonActionContext.datLaiQuyTrinhXuLyModalVisible ? (
        <DatLaiQuyTrinhXuLyModal
          refreshTable={() => dispatch(SearchHoSo(searchParams))}
        />
      ) : null}
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <TheoDoiTatCaHoSoProvider>
    <ButtonActionProvider>
      <TheoDoiTatCaHoSoTable />
    </ButtonActionProvider>
  </TheoDoiTatCaHoSoProvider>
);
export default HoSoTableWrapper;
