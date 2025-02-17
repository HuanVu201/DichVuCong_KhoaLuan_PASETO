import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo, SearchHoSoTheoChiTieuSoHoa } from "@/features/hoso/redux/action";
import dayjs from "dayjs";
import {
  TraCuuHoSoSoHoaProvider,
} from "../contexts/TraCuuHoSoSoHoaContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { DatLaiQuyTrinhXuLyModal } from "@/features/hoso/components/actions/datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  ReloadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Col, DatePicker, Form, Spin } from "antd";
import { resetDatas } from "@/features/hoso/redux/slice";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { TraCuuHoSoSoHoaSearch } from "./TraCuuHoSoSoHoaSearch";
import { ISearchThongKeParams } from "@/features/thongKe/thongKeQD766/models/ThongKeQD766Search";

const HoSoChuaSoHoaTable = () => {
  const dispatch = useAppDispatch();

  const { publicModule } = useAppSelector(state => state.config)
  const buttonActionContext = useButtonActionContext();
  const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
  const {
    datas: hoSos,
    data: hoSo,
    count,
    loading: loadingHoSos
  } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["theo-doi-ho-so-chua-so-hoa"],
  });
  const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({
    pageNumber: 1,
    pageSize: 50,

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
            title="Sửa hồ sơ"
            onClick={() =>
              buttonActionContext.setAdminCapNhatHoSoModalVisible(true)
            }
          />
        ),
      },
      {
        icon: (
          <DeleteOutlined
            title="Xoá"
            onClick={() =>
              buttonActionContext.setXoaHoSoModalVisible(true)
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
    'theo-doi-ho-so-chua-so-hoa'
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };

  useEffect(() => {

    if (searchParams && (searchParams.maDonVi || thongKeToanHeThong)) {
      dispatch(SearchHoSoTheoChiTieuSoHoa({
        ...searchParams,
        tieuChi: "ChuaSoHoaTPHS"
      }))
    }
  }, [searchParams, thongKeToanHeThong])




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
            <TraCuuHoSoSoHoaSearch
              btnComfirmLoading={loadingHoSos}
              setSearchParams={setSearchParams}
              defaultVisible={true}
              showAdvanceSearchBtn
              thongKeToanHeThong={thongKeToanHeThong}
              setThongKeToanHeThong={setThongKeToanHeThong} />

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
              onSearch={(params) => {
                if (params && params.maDonVi) {
                  dispatch(SearchHoSoTheoChiTieuSoHoa({
                    ...params,
                    tieuChi: "ChuaSoHoaTPHS"
                  }))
                }
              }}
            />
          </AntdSpace>

          <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} />
        </Spin>

      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <TraCuuHoSoSoHoaProvider>
    <ButtonActionProvider>
      <HoSoChuaSoHoaTable />
    </ButtonActionProvider>
  </TraCuuHoSoSoHoaProvider>
);
export default HoSoTableWrapper;
