import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo } from "@/features/hoso/redux/action";
import {
  HoSoChoCanBoTraKetQuaProvider,
} from "../contexts/HoSoChoCanBoTraKQContext";
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
import { Col, Form, Spin, TableProps } from "antd";
import { filterOptions } from "@/utils";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { resetDatas } from "@/features/hoso/redux/slice";
import { HoSoChoCanBoTraKQSearch } from "./HoSoChoCanBoTraKQSearch";
import { useHoSoChoCanBoTraKQColumn } from "@/features/hoso/hooks/useHoSoChoCanBoTraKQColumn";
import { TrangThaiTraKetQuaContants } from "@/pages/dvc/traketqua/contants/TrangThaiTraKetQuaContants";

const HoSoChoCanBoTraKQTable = () => {
  const dispatch = useAppDispatch();
  const { datas: donVis } = useAppSelector((state) => state.cocautochuc);
  const buttonActionContext = useButtonActionContext();
  const [firstAccess, setFirstAccess] = useState<boolean>(true)
  const { data: user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user)
      dispatch(
        SearchCoCauToChuc({
          type: "don-vi",
          pageNumber: 1,
          pageSize: 10000,
          donViQuanLy: user?.officeCode ? user?.officeCode : "",
          orderBy: ["MaDinhDanh"],
        })
      );
    setSearchParams(curr => ({ ...curr, donViTraKq: user?.officeCode ? user?.officeCode : "", }))
  }, [user]);
  const {
    datas: hoSos,
    data: hoSo,
    count,
    loading
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["tra-cuu-ho-so-cho-can-bo-tra-ket-qua"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,

    inMaTrangThais: ["2", "4", "5", "6", "7", "8", "9", "10"],
  });
  useEffect(() => {
    if (searchParams && !firstAccess) {
      dispatch(SearchHoSo(searchParams))
    }

  }, [searchParams])

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
          <EditOutlined
            title="Vị trí lưu hồ sơ"
            onClick={() =>
              buttonActionContext.setGhiChuViTriHoSoModalVisible(true)
            }
          />
        ),
      },

    ],
    []
  );
  const { columns } = useHoSoChoCanBoTraKQColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };

  const onSubmit = (params: ISearchHoSo) => {
    dispatch(SearchHoSo(params))
    setFirstAccess(false)
  }


  useEffect(() => {
    return () => {
      dispatch(resetDatas());

    };
  }, []);

  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    if (filters) {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== null && value !== undefined && value.length > 0)

      );

      if (Object.keys(cleanedFilters).length > 0) {
        if (cleanedFilters.trangThaiPhiLePhi) {
          setSearchParams((curr) => ({
            ...curr,
            pageNumber: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
            trangThaiThuPhi: cleanedFilters.trangThaiPhiLePhi != null ? cleanedFilters.trangThaiPhiLePhi[0] as any : "",
          }));
        }
      }
      else {
        setSearchParams({
          ...searchParams,
          pageNumber: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          reFetch: true,
          donViTraKq: user?.officeCode,
          trangThaiThuPhi: cleanedFilters.trangThaiPhiLePhi != null ? cleanedFilters.trangThaiPhiLePhi[0] as any : "",
          // trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
        });
      }
    } else {
      setSearchParams({
        ...searchParams,
        pageNumber: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        reFetch: true,
        donViTraKq: user?.officeCode,
        
        // trangThaiTraKq: TrangThaiTraKetQuaContants.DA_CHUYEN_TRA_KQ,
      });
    }

  };


  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          {btnElememts}
          {/* <SearchHoSoComp
            extraElement={(form) => (<>
              <Col span={24}>
                <Form.Item label="Đơn vị" name="groupCode">
                  <AntdSelect
                    generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                  />
                </Form.Item>
              </Col>

            </>)} setSearchParams={setSearchParams} defaultVisible={true} /> */}
          <HoSoChoCanBoTraKQSearch setSearchParams={setSearchParams} onSubmit={onSubmit} searchParams={searchParams} />
          <Spin spinning={loading} >
            <AntdTable
              columns={columns}
              dataSource={hoSos}
              pagination={{
                total: count,
              }}
              rowSelection={rowSelection}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) => { }}
              onChange={onChange}
            /></Spin>
        </AntdSpace>

        {buttonActionContext.datLaiQuyTrinhXuLyModalVisible ? (
          <DatLaiQuyTrinhXuLyModal
            refreshTable={() => dispatch(SearchHoSo(searchParams))}
          />
        ) : null}
      </LazyActions>
    </>
  );
};
const HoSoChoCanBoTraKQTableWrapper = () => (
  <HoSoChoCanBoTraKetQuaProvider>
    <ButtonActionProvider>
      <HoSoChoCanBoTraKQTable />
    </ButtonActionProvider>
  </HoSoChoCanBoTraKetQuaProvider>
);
export default HoSoChoCanBoTraKQTableWrapper;
