import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ChoXacNhanTraKqChuaThuPhiSearch } from "./ChoXacNhanTraKqChuaThuPhiSearch";
import { SearchHoSoTheoTrangThaiThuPhi } from "@/features/hoso/redux/action";
import { ChoXacNhanTraKqChuaThuPhiProvider } from "../contexts/ChoXacNhanTraKqChuaThuPhiContext";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import {
  DollarCircleOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useChoXacNhanKqChuaThuPhiColumn } from "../hooks/ChoXacNhanTraKqChuaThuPhiColumn";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { Spin } from "antd";
import { ChoTraKetQuaTTHCCSearch } from "../../chotraketquatthcc/components/ChoTraKetQuaTTHCCSearch";
import '../../../../../features/hoso/scss/SearchHoSoComp.scss'

const ChoXacNhanTraKqChuaThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    count,
    loading,
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-xac-nhan-tra-kq-chua-thu-phi"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai :"9",
    // groupCode: user?.officeCode,
    // daHoacKhongThuPhi: true,
    trangThaiChuaHoacKhongThuPhi: true,
    // trangThaiThuPhi: TRANGTHAITHUPHI["Chờ thanh toán"],
    // nhanKetQuaBCCI: false,
    trangThaiTraKq: TrangThaiTraKetQuaContants.CHO_XAC_NHAN,
    groupCode: user?.officeCode,
    laNguoiNhanHoSo: true
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
          <DollarCircleOutlined
            title="Yêu cầu thu phí và xác nhận kết quả"
            onClick={() =>
              buttonActionContext.setYeuCauThanhToanVaXacNhanKqModalVisible(
                true
              )
            }
          />
        ),
      },
    ],
    []
  );
  const { columns } = useChoXacNhanKqChuaThuPhiColumn(searchParams, items);
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
        <ChoXacNhanTraKqChuaThuPhiSearch defaultVisible = {true} setSearchParams={setSearchParams} />
        <Spin spinning={loading}>
          {searchParams.groupCode ? (
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
  <ChoXacNhanTraKqChuaThuPhiProvider>
    <ButtonActionProvider>
      <ChoXacNhanTraKqChuaThuPhiTable />
    </ButtonActionProvider>
  </ChoXacNhanTraKqChuaThuPhiProvider>
);
export default HoSoTableWrapper;
