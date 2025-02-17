import { Suspense, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { ScreenType, screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { ChoBoSungSearch } from "./ChoBoSungSearch";
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  ChoBoSungProvider,
  useChoBoSungContext,
} from "../contexts/ChoBoSungContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useBoSungHoSoColumn } from "../../hooks/useBoSungHoSoColumn";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";

export const ChoBoSungTable = ({ maScreen, extraSearchParams }: { maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: maScreen,
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai: "5",
    // groupCode: user?.officeCode,
    byCurrentUser: true,
    trangThaiBoSung: "Yêu cầu công dân bổ sung",
    ...extraSearchParams
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
              extraButtons={maScreen === "bo-sung-nhan-phi-dia-gioi" ? <AntdButton
                type="primary"
                onClick={() => {
                  downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
                }}
              >
                In danh sách
              </AntdButton> : undefined}
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
      {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
    </LazyActions>
  );
};

const HoSoTableWrapper = () => (
  <ChoBoSungProvider>
    <ButtonActionProvider>
      <ChoBoSungTable maScreen='cho-bo-sung-ho-so'/>
    </ButtonActionProvider>
  </ChoBoSungProvider>
);
export default HoSoTableWrapper;
