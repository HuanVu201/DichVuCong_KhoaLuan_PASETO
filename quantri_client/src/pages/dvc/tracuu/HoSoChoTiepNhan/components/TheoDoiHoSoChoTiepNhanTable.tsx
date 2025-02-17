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
  TheoDoiHoSoChoTiepNhanProvider,
} from "../contexts/TheoDoiHoSoChoTiepNhanContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { DatLaiQuyTrinhXuLyModal } from "@/features/hoso/components/actions/datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import {
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  ReloadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { Col, DatePicker, Form, Spin } from "antd";
import { filterOptions } from "@/utils";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { resetDatas } from "@/features/hoso/redux/slice";
import { toast } from "react-toastify";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { SearchTraCuuHoSo } from "@/features/hoso/components/SearchTraCuuHoSo";

export const TRANG_THAI_HO_SOS=[
  { value: '1', label: 'Mới đăng ký' },
  { value: '2', label: 'Được tiếp nhận' },
  { value: '3', label: 'Không được tiếp nhận' },
  { value: '4', label: 'Đang xử lý' },
  { value: '5', label: 'Yêu cầu bổ sung giấy tờ' },
  { value: '6', label: 'Yêu cầu thực hiện nghĩa vụ tài chính' },
  { value: '7', label: 'Công dân yêu cầu rút hồ sơ' },
  { value: '8', label: 'Dừng xử lý' },
  { value: '9', label: 'Đã xử lý xong' },
  { value: '10', label: 'Đã trả kết quả' },
]

const TheoDoiHoSoChoTiepNhanTable = () => {
  const dispatch = useAppDispatch();
 
 

  const buttonActionContext = useButtonActionContext();
  const [firstAccess, setFirstAccess] = useState<boolean>(true)
 

  const {
    datas: hoSos,
    data: hoSo,
    count,
    loading: loadingHoSos
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["tra-cuu-ho-so"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    searchAllType: true
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
          <EditOutlined
            title="Vị trí lưu hồ sơ"
            onClick={() =>
              buttonActionContext.setGhiChuViTriHoSoModalVisible(true)
            }
          />
        ),
        key: 'viTriLuuHoSo'
      },
      {
        icon: (
          <ReloadOutlined
            title="Đặt lại ngày hẹn trả"
            onClick={() =>
              buttonActionContext.setDatLaiHanXuLyModalVisible(true)
            }
          />
        ),
      },
      {
        icon: (
          <RollbackOutlined
            title="Đặt lại quy trình xử lý"
            onClick={() =>
              buttonActionContext.setDatLaiQuyTrinhXuLyModalVisible(true)
            }
          />
        ),
      },
      {
        icon: (
          <EditOutlined
            title="Admin sửa hồ sơ"
            onClick={() =>
              buttonActionContext.setAdminCapNhatHoSoModalVisible(true)
            }
          />
        ),
      },

    ],
    []
  );
  const { columns } = useHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items,
    'tra-cuu-ho-so'
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };

  useEffect(() => {
    if (searchParams && !firstAccess) {
      dispatch(SearchHoSo(searchParams))
    }
  }, [searchParams])

  useEffect(() => {
    setFirstAccess(false)
  }, [])
  useEffect(() => {
    return () => {
      dispatch(resetDatas());
    };
  }, []);


  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <Spin spinning={ loadingHoSos}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <AntdSpace direction="vertical" style={{ width: "100%" }}>
            {btnElememts}
            <SearchTraCuuHoSo
              btnComfirmLoading={loadingHoSos}
              setSearchParams={setSearchParams} defaultVisible={true} showAdvanceSearchBtn/>

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
            />
          </AntdSpace>
          {buttonActionContext.datLaiQuyTrinhXuLyModalVisible ? (
            <DatLaiQuyTrinhXuLyModal
              refreshTable={() => dispatch(SearchHoSo(searchParams))}
            />
          ) : null}
        </Spin>

      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <TheoDoiHoSoChoTiepNhanProvider>
    <ButtonActionProvider>
      <TheoDoiHoSoChoTiepNhanTable />
    </ButtonActionProvider>
  </TheoDoiHoSoChoTiepNhanProvider>
);
export default HoSoTableWrapper;
