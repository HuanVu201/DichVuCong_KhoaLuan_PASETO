import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { DangKyNhanKqQuaBCCISearch } from "./DangKyNhanKqQuaBCCISearch";
import { CanBoBCCISearch, SearchHoSo } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";
import {
  DangKyNhanKqQuaBCCIProvider,
  useDangKyNhanKqQuaBCCIContext,
} from "../contexts/DangKyNhanKqQuaBCCIContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { DatLaiQuyTrinhXuLyModal } from "@/features/hoso/components/actions/datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import {
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { useHoSoCanBoBCCIColumn } from "@/features/hoso/hooks/useHoSoCanBoBCCIColumn";
import { deleteObjectKeyValues } from "@/utils/common";
import { useHoSoCanBoBCCIDaDangKyChuaTraKqColumn } from "@/features/hoso/hooks/useHoSoCanBoBCCIDaDangKyChuaTraKqColumn";
import { XuatDanhSachHoSoCanBoBCCIModal } from "../../DaTraKetQua/components/XuatDanhSachHoSoCanBoBCCI";

const DangKyNhanKqQuaBCCITable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: hoSos,
    data: hoSo,
    count,
    loading,
  } = useAppSelector((state) => state.hoso);
  // const [dataHoSos, setDataHoSos] = useState<IHoSo[]>([]);
  const [firstAccess,setFirstAccess] = useState<boolean>(true);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["dang-ky-nhan-kq-qua-bcci"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    donViTraKq: user?.officeCode,
    canBoBCCIDaDangKy: false,
    inMaTrangThais: ["2","4","5","6","7","8","9","10"],
   
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
  const { columns } = useHoSoCanBoBCCIDaDangKyChuaTraKqColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  const onFinsh = async (value: ISearchHoSo) => {
    setFirstAccess(false);
    // var res = await dispatch(CanBoBCCISearch(value)).unwrap();
  };
  
  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <DangKyNhanKqQuaBCCISearch
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          onFinish={onFinsh}
        />
        <Spin spinning={loading}>
          <AntdTable
            columns={columns}
            dataSource={firstAccess ? [ ]: hoSos}
            pagination={{
              total: count,
            }}
            rowSelection={rowSelection}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => {
              // const hasValue = (
              //   Object.keys(params) as Array<keyof ISearchHoSo>
              // ).filter(
              //   (x) =>
              //     !["donViTraKq", "pageNumber", "pageSize", "reFetch"].includes(x)
              // );
              // if (hasValue.length > 0) {
              //   dispatch(SearchHoSo(params));
              // }
              if( params.pageNumber == 1 && !firstAccess) dispatch(CanBoBCCISearch(params));
            }}
          />
          
        </Spin>
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <DangKyNhanKqQuaBCCIProvider>
    <ButtonActionProvider>
      <DangKyNhanKqQuaBCCITable />
    </ButtonActionProvider>
  </DangKyNhanKqQuaBCCIProvider>
);
export default HoSoTableWrapper;
