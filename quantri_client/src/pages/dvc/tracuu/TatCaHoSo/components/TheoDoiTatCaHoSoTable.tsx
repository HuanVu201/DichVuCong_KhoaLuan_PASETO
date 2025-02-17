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
import { SearchHoSo } from "@/features/hoso/redux/action";
import dayjs from "dayjs";
import {
  TheoDoiTatCaHoSoProvider,
} from "../contexts/TheoDoiTatCaHoSoContext";
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
import { Spin } from "antd";
import { resetDatas } from "@/features/hoso/redux/slice";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { TheoDoiTatCaHoSoSearch } from "./TheoDoiTatCaHoSoSearch";

export const TRANG_THAI_HO_SOS = [
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

const TheoDoiTatCaHoSoTable = () => {
  const dispatch = useAppDispatch();
  const { publicModule } = useAppSelector(state => state.config)
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


  const [ngayQuaHanXuLyHoSo] = useMemo(() => {
    return [publicModule?.find(x => x.code == 'ngay-qua-han-xu-ly-ho-so')]
  }, [publicModule])

  const rowClassName = (record: IHoSo) => {
    const ngayHienTai = dayjs(Date.now()).startOf('day');
    const hanXuLyCaNhan = record.ngayHenTra ? dayjs(record.ngayHenTra) : null;
    const isAfterNow = ngayHienTai && ngayHienTai.isAfter(hanXuLyCaNhan);
    const twoDaysBefore = hanXuLyCaNhan && hanXuLyCaNhan.subtract(parseInt(ngayQuaHanXuLyHoSo?.content as any), 'day');
    const isBeforeTwoDays = hanXuLyCaNhan && hanXuLyCaNhan.isBefore(twoDaysBefore);
    if (record.trangThaiHoSoId !== '9' && record.trangThaiHoSoId !== '10') {
      if (isAfterNow) {

        return 'custom-row-style-qua-han custom-typography-qua-han';
      }
      else if (isBeforeTwoDays || (hanXuLyCaNhan && hanXuLyCaNhan.isSame(ngayHienTai, 'day'))) {
        return 'custom-row-style-toi-han';
      }
    }
    else {
      return ''
    }

  };

  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <Spin spinning={loadingHoSos}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <AntdSpace direction="vertical" style={{ width: "100%" }}>
            {btnElememts}
            <TheoDoiTatCaHoSoSearch
              btnComfirmLoading={loadingHoSos}
              setSearchParams={setSearchParams} defaultVisible={true} showAdvanceSearchBtn />

            <AntdTable
              columns={columns}
              dataSource={hoSos}
              pagination={{
                total: count,
              }}
              rowClassName={rowClassName as any}
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
          <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} />
        </Spin>

      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <TheoDoiTatCaHoSoProvider>
    <ButtonActionProvider>
      <TheoDoiTatCaHoSoTable />
    </ButtonActionProvider>
  </TheoDoiTatCaHoSoProvider>
);
export default HoSoTableWrapper;
