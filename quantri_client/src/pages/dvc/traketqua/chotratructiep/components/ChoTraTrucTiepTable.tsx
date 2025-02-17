import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { ScreenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo, SearchNguoiNhanHoSo } from "@/features/hoso/redux/action";
import { ChoTraTrucTiepProvider } from "../contexts/ChoTraTrucTiepContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useChoTraKetQuaColumn } from "../../chotraketquatthcc/hook/useChoTraKetQuaColumn";

export const ChoTraTrucTiepTable = ({
  maScreen,
  extraSearchParams,
}: {
  maScreen: ScreenType;
  extraSearchParams?: ISearchHoSo;
}) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: maScreen,
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai :"9",
    donViTraKq: user?.officeCode,
    kenhThucHien: "1",
    nhanKetQuaBCCI: false,
    trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
    ...extraSearchParams,
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
  const { columns } = useChoTraKetQuaColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items,
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
        <SearchHoSoComp
          btnComfirmLoading={loading}
          setSearchParams={setSearchParams}
          defaultVisible={true}
        />
        {searchParams.donViTraKq ? (
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
            onSearch={(params) => {
              dispatch(SearchHoSo(params))
            }}
          />
        ) : null}
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoTraTrucTiepProvider>
    <ButtonActionProvider>
      <ChoTraTrucTiepTable maScreen="cho-tra-ket-qua-truc-tiep" />
    </ButtonActionProvider>
  </ChoTraTrucTiepProvider>
);
export default HoSoTableWrapper;
