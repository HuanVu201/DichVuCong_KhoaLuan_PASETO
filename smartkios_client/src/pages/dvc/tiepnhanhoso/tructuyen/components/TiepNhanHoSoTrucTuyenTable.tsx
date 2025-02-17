import { Suspense, lazy, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { TiepNhanHoSoTrucTuyenSearch } from "./TiepNhanHoSoTrucTuyenSearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { TiepNhanHoSoTrucTuyenProvider } from "../contexts/TiepNhanHoSoContext"
import { HoSoTableActions, useHoSoColumn } from "../../../../../features/hoso/hooks/useHoSoColumn"
import { TableRowSelection } from "antd/es/table/interface"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { CheckOutlined, DollarOutlined, EyeOutlined, StopOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"

const INIT_SEARCHPARAM: ISearchHoSo = {
  pageNumber: 1,
  pageSize: 10,
  reFetch: true,
  byCurrentUser: true,
  maTrangThai: "1",
};

export const TiepNhanHoSoTrucTuyenTable = ({
  maScreen,
  extraSearchParams,
}: {
  maScreen: ScreenType;
  extraSearchParams?: ISearchHoSo;
}) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({ maScreen: maScreen });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    ...INIT_SEARCHPARAM,
    ...extraSearchParams,
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            style={{ color: "blue" }}
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
      {
        icon: (
          <CheckOutlined
            style={{ color: "green" }}
            title="Tiếp nhận"
            onClick={() =>
              buttonActionContext.setTiepNhanHoSoTrucTuyenModalVisible(true)
            }
          />
        ),
      },
      {
        icon: (
          <StopOutlined
            style={{ color: "red" }}
            title="Từ chối tiếp nhận"
            onClick={() =>
              buttonActionContext.setTuChoiTiepNhanHoSoTrucTuyenModalVisible(
                true
              )
            }
          />
        ),
      },
      {
        icon: (
          <DollarOutlined
            style={{ color: "#c0d70c" }}
            title="Yêu cầu thu phí lệ phí"
            onClick={() =>
              buttonActionContext.setYeuCauThanhToanModalVisible(true)
            }
          />
        ),
      },
      // {
      //   icon: (
      //     <CheckOutlined
      //       style={{ color: "#c0d70c" }}
      //       title="Chuyển phi địa giới"
      //       onClick={() =>
      //         buttonActionContext.setChuyenPhiDiaGioiModalVisible(true)
      //       }
      //     />
      //   ),
      // },
    ],
    []
  );
  const { columns } = useHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection: TableRowSelection<IHoSo> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <SearchHoSoComp setSearchParams={setSearchParams} resetSearchParams={() => setSearchParams(INIT_SEARCHPARAM)}/>
        <AntdTable
          bordered
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
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <TiepNhanHoSoTrucTuyenProvider>
    <ButtonActionProvider>
      <TiepNhanHoSoTrucTuyenTable maScreen="tiep-nhan-ho-so-truc-tuyen" />
    </ButtonActionProvider>
  </TiepNhanHoSoTrucTuyenProvider>
);
export default HoSoTableWrapper;
