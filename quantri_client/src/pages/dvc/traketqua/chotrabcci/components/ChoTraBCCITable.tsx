import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { ChoTraBCCIProvider } from "../contexts/ChoTraBCCIContext";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useHoSoCanBoBCCIColumn } from "@/features/hoso/hooks/useHoSoCanBoBCCIColumn";
import { ChoTraKetQuaTTHCCSearch } from "../../chotraketquatthcc/components/ChoTraKetQuaTTHCCSearch";
import { useChoTraKetQuaColumn } from "../../chotraketquatthcc/hook/useChoTraKetQuaColumn";

const ChoTraBCCITable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-tra-bcci"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    inMaTrangThais: ["9"],
    donViTraKq: user?.officeCode,
    nhanKetQuaBCCI: true,
    trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
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
  const { columns } = useChoTraKetQuaColumn(
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
        <ChoTraKetQuaTTHCCSearch defaultVisible={true} setSearchParams={setSearchParams} />

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
            onSearch={(params) => dispatch(SearchHoSo(params))}
          />
        ) : null}
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoTraBCCIProvider>
    <ButtonActionProvider>
      <ChoTraBCCITable />
    </ButtonActionProvider>
  </ChoTraBCCIProvider>
);
export default HoSoTableWrapper;
