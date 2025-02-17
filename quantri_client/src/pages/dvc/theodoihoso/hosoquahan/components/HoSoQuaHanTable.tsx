import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  HoSoQuaHanProvider,
  useHoSoQuaHanContext,
} from "../contexts/HoSoQuaHanContext";
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn";
import dayjs from "dayjs";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { SearchHoSoQuaHan } from "./HoSoQuaHanSearch";
import { SearchHoSoToiHan } from "../../hosotoihan/components/HoSoToiHanSearch";
import { IUserRole } from "@/features/user/models";
import { userService } from "@/features/user/services";
import { useHoSoQuaHanColumn } from "@/features/hoso/hooks/useHoSoQuaHanColumn";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";

const HoSoQuaHanTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({ maScreen: screenType["ho-so-qua-han"] });
  const [enableFilterDonVi, setEnableFilterDonVi] = useState<boolean>(true);
  const [userRoles, setUserRoles] = useState<IUserRole[]>([]);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    inMaTrangThais: ["2", "4"],
    henTraTo: dayjs().format("YYYY-MM-DD"),
    donViQuanLy: user?.officeCode,
    viewHoSo: 'da-chuyen-xu-ly'

  });

  useEffect(() => {
    if (auth) {
      (async () => {
        let getRoles = await userService.GetUserRoles(user?.id as any);
        if (getRoles?.data && getRoles?.data?.length > 0) {
          setUserRoles(getRoles.data)
          getRoles?.data.map((item: IUserRole) => {
            if ((item.roleName == 'Theo dõi hồ sơ tới hạn, quá hạn đơn vị' && item.enabled) || (item.roleName == 'Quản trị hệ thống' && item.enabled)) {
              setEnableFilterDonVi(false)
              // setSearchParams((curr) => ({ ...curr, donViQuanLy: user?.officeCode }))
            }
          });
        }
      })()
    }
  }, [auth]);

  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
      },
    ],
    []
  );
  const { columns } = useHoSoQuaHanColumn(
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
        <SearchHoSoQuaHan enableFilterDonVi={enableFilterDonVi} btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn />
        {userRoles.length ? (
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
            onSearch={(params) => dispatch(SearchHoSo({ ...params, donViQuanLy: enableFilterDonVi == false ? user?.officeCode : undefined, groupCode: enableFilterDonVi == false ? undefined : user?.officeCode }))}
          />
        ) : null}
      </AntdSpace>
      <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} />
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <HoSoQuaHanProvider>
    <ButtonActionProvider>
      <HoSoQuaHanTable />
    </ButtonActionProvider>
  </HoSoQuaHanProvider>
);
export default HoSoTableWrapper;
