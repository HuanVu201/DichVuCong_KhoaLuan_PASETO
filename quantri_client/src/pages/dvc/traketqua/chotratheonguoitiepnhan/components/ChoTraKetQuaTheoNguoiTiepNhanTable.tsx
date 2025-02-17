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
import { SearchHoSo, SearchNguoiNhanHoSo } from "@/features/hoso/redux/action";
import { ChoTraKetQuaTheoNguoiTiepNhanProvider } from "../contexts/ChoTraKetQuaTheoNguoiTiepNhanContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { ChoTraKetQuaTTHCCSearch } from "../../chotraketquatthcc/components/ChoTraKetQuaTTHCCSearch";
import { ChoTraKetQuaTheoNguoiTiepNhanSearch } from "./ChoTraKetQuaTheoNguoiTiepNhanSearch";
import '../../../../../features/hoso/scss/SearchHoSoComp.scss'
import { useChoTraTheoNguoiTiepNhanColumn } from "../UseChoTraTheoNguoiTiepNhanColumn";


const ChoTraKetQuaTheoNguoiTiepNhanTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-tra-ket-qua-truc-tuyen"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai: "9",
    // nhanKetQuaBCCI: false,

    trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
    laNguoiNhanHoSo: true,
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
  const { columns } = useChoTraTheoNguoiTiepNhanColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items,
    'cho-tra-ket-qua-truc-tuyen'
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
        <ChoTraKetQuaTheoNguoiTiepNhanSearch defaultVisible={true} setSearchParams={setSearchParams} />
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
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoTraKetQuaTheoNguoiTiepNhanProvider>
    <ButtonActionProvider>
      <ChoTraKetQuaTheoNguoiTiepNhanTable />
    </ButtonActionProvider>
  </ChoTraKetQuaTheoNguoiTiepNhanProvider>
);
export default HoSoTableWrapper;
