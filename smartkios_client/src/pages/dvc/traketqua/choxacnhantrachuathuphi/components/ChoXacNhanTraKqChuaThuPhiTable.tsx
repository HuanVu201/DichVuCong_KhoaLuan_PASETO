import { Suspense, lazy, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo, TRANGTHAITHUPHI } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ChoXacNhanTraKqChuaThuPhiSearch } from "./ChoXacNhanTraKqChuaThuPhiSearch";
import {
  SearchHoSo,
  SearchHoSoTheoTrangThaiThuPhi,
  XacNhanKetQua,
} from "@/features/hoso/redux/action";
import { MenuProps, Popconfirm, Spin } from "antd";
import {
  ChoXacNhanTraKqChuaThuPhiProvider,
  useChoXacNhanTraKqChuaThuPhiContext,
} from "../contexts/ChoXacNhanTraKqChuaThuPhiContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import {
  CheckCircleOutlined,
  DollarCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useChoXacNhanKqChuaThuPhiColumn } from "../hooks/ChoXacNhanTraKqChuaThuPhiColumn";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import YeuCauThanhToanVaXacNhanKqModal from "./ThanhToanVaXacNhanKqModal";

const ChoXacNhanTraKqChuaThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["cho-xac-nhan-tra-kq-chua-thu-phi"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    maTrangThai: "9",
    // groupCode: user?.officeCode,
    // daHoacKhongThuPhi: true,
    trangThaiChuaHoacKhongThuPhi: true,
    // trangThaiThuPhi: TRANGTHAITHUPHI["Chờ thanh toán"],
    // nhanKetQuaBCCI: false,
    trangThaiTraKq: TrangThaiTraKetQuaContants.CHO_XAC_NHAN,
    groupCode: user?.officeCode,
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
        <ChoXacNhanTraKqChuaThuPhiSearch setSearchParams={setSearchParams} />
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
