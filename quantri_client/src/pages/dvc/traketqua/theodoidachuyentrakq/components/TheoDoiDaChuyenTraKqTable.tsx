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
import { TheoDoiDaChuyenTraKqSearch } from "./TheoDoiDaChuyenTraKqSearch";
import { SearchHoSo, SearchNguoiNhanHoSo, XacNhanKetQua } from "@/features/hoso/redux/action";
import { MenuProps, Popconfirm, Spin } from "antd";
import {
  TheoDoiDaChuyenTraKqProvider,
  useTheoDoiDaChuyenTraKqContext,
} from "../contexts/TheoDoiDaChuyenTraKqContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useTheoDoiDaChuyenTraKqColumn } from "../hooks/TheoDoiDaChuyenTraKqColumn";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { ChoTraKetQuaTTHCCSearch } from "../../chotraketquatthcc/components/ChoTraKetQuaTTHCCSearch";
import '../../../../../features/hoso/scss/SearchHoSoComp.scss'

const TheoDoiDaChuyenTraKqTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    count,
    loading,
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["theo-doi-da-chuyen-tra-kq"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    maTrangThai :"9",
    trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
    laNguoiNhanHoSo: true,
    groupCode: user?.officeCode,
    orderBy: ['NgayXacNhanKetQua']
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
  const { columns } = useTheoDoiDaChuyenTraKqColumn(searchParams, items);
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
        <TheoDoiDaChuyenTraKqSearch defaultVisible = {true} setSearchParams={setSearchParams} />
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
              onSearch={(params) => dispatch(SearchHoSo(params))}
            />
          ) : null}
        </Spin>
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <TheoDoiDaChuyenTraKqProvider>
    <ButtonActionProvider>
      <TheoDoiDaChuyenTraKqTable />
    </ButtonActionProvider>
  </TheoDoiDaChuyenTraKqProvider>
);
export default HoSoTableWrapper;
