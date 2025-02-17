import { Suspense, lazy, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { ScreenType, screenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { TiepNhanHoSoSearch } from "./TiepNhanHoSoSearch";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import { TiepNhanHoSoProvider } from "../contexts/TiepNhanHoSoContext";
import { HoSoTableActions, useHoSoColumn } from "../../../../../features/hoso/hooks/useHoSoColumn";
import { TableRowSelection } from "antd/es/table/interface";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined, FileTextOutlined, PrinterOutlined, StepForwardOutlined } from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";

export const TiepNhanHoSoTable = ({maScreen, extraSearchParams} : {maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const {btnElememts} = useButtonActions({
    maScreen: maScreen,
  });

  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    byCurrentUser: true,
    maTrangThai: "2",
    ...extraSearchParams
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
      },
      {
        icon: <PrinterOutlined title="In phiếu tiếp nhận" onClick={() => buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(true)}/>
      },
      {
        icon: <FileTextOutlined title="In phiếu kiểm soát" onClick={() => buttonActionContext.setInPhieuKiemSoatModalVisible(true)}/>
      },
      {
        icon: <StepForwardOutlined title="Chuyển bước" onClick={() => buttonActionContext.setChuyenBuocXuLyModalVisible(true)}/>
      },
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
      <span id="dangerHtml"></span>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <SearchHoSoComp setSearchParams={setSearchParams}  resetSearchParams={() =>
            setSearchParams({
              pageNumber: 1,
              pageSize: 10,
              reFetch: true,
              byCurrentUser: true,
              maTrangThai: "2",
            })
          }/>

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
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <TiepNhanHoSoProvider>
    <ButtonActionProvider>
      <TiepNhanHoSoTable maScreen="tiep-nhan-ho-so-truc-tiep"/>
    </ButtonActionProvider>
  </TiepNhanHoSoProvider>
);
export default HoSoTableWrapper;
