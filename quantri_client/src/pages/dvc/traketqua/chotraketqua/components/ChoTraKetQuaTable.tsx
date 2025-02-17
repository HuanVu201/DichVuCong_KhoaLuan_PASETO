import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { ScreenType, screenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { ChoTraKetQuaProvider } from "../contexts/ChoTraKetQuaContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";

export const ChoTraKetQuaTable = ({ maScreen, extraSearchParams }: { maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen,
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai: "9",
    nhanKetQuaBCCI: false,
    donViTraKq: user?.officeCode,
    trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
    ...extraSearchParams
    // daYeuCauBCCILayKetQua: true,
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
      // {
      //   icon: (
      //     <CheckCircleOutlined
      //       title="Yêu cầu bưu chính công ích lấy kết quả"
      //       onClick={() =>
      //         buttonActionContext.setYeuCauBCCILayKetQuaModalVisible(true)
      //       }
      //     />
      //   ),
      // },
    ],
    []
  );
  const { columns } = useHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items,
    maScreen
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
          showAdvanceSearchBtn
          extraButtons={maScreen === "cho-tra-ket-qua-phi-dia-gioi" ? <AntdButton
            type="primary"
            onClick={() => {
              downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
            }}
          >
             In danh sách
          </AntdButton> : undefined}/>
        {user?.officeCode ? (
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
            onSearch={(params) => dispatch(SearchHoSo(params))}
          />
        ) : null}
      </AntdSpace>
      {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoTraKetQuaProvider>
    <ButtonActionProvider>
      <ChoTraKetQuaTable maScreen="cho-tra-ket-qua-truc-tuyen" />
    </ButtonActionProvider>
  </ChoTraKetQuaProvider>
);
export default HoSoTableWrapper;
