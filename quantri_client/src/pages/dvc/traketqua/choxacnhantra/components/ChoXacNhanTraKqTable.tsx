import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSoTheoTrangThaiThuPhi } from "@/features/hoso/redux/action";
import { ChoXacNhanTraKqProvider } from "../contexts/ChoXacNhanTraKqContext";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useChoXacNhanKqColumn } from "../hooks/ChoXacNhanTraKqColumn";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { ISearchTrangThaiHoSo } from "@/features/trangthaihoso/models";
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action";
import { Spin } from "antd";
import { ChoTraKetQuaTTHCCSearch } from "../../chotraketquatthcc/components/ChoTraKetQuaTTHCCSearch";
import { ChoXacNhanTraKqSearch } from "./ChoXacNhanTraKqSearch";
import '../../../../../features/hoso/scss/SearchHoSoComp.scss'

const ChoXacNhanTraKqTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    count,
    loading,
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-xac-nhan-tra-kq"],
  });

  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai :"9",
    // groupCode: user?.officeCode,
    trangThaiChuaHoacKhongThuPhi: false,
    //trangThaiThuPhi: TRANGTHAITHUPHI["Chờ thanh toán"],
    // nhanKetQuaBCCI: false,
    trangThaiTraKq: TrangThaiTraKetQuaContants.CHO_XAC_NHAN,
    groupCode: user?.officeCode,
    laNguoiNhanHoSo: true,
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
  const { columns } = useChoXacNhanKqColumn(searchParams, items);
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
        <ChoXacNhanTraKqSearch
          setSearchParams={setSearchParams}
          defaultVisible={true}
        />
        <Spin spinning={loading}>
          {searchParams ? (
            <AntdTable
              columns={columns}
              dataSource={hoSos}
              pagination={{
                total: count,
              }}
              rowSelection={rowSelection}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) =>
                dispatch(SearchHoSoTheoTrangThaiThuPhi(params))
              }
            />
          ) : null}
        </Spin>
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <ChoXacNhanTraKqProvider>
    <ButtonActionProvider>
      <ChoXacNhanTraKqTable />
    </ButtonActionProvider>
  </ChoXacNhanTraKqProvider>
);
export default HoSoTableWrapper;
