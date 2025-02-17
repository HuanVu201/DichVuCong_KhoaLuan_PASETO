import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType } from "@/features/hoso/data"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components"
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action"
import { TiepNhanHoSoTrucTuyenProvider } from "../contexts/TiepNhanHoSoContext"
import { HoSoTableActions, useHoSoColumn } from "../../../../../features/hoso/hooks/useHoSoColumn"
import { TableRowSelection } from "antd/es/table/interface"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { CheckOutlined, DollarOutlined, EyeOutlined, StopOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import dayjs from 'dayjs'
import { TableProps } from "antd"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"

const INIT_SEARCHPARAM: ISearchHoSo = {
  pageNumber: 1,
  pageSize: 50,
  reFetch: true,
  byCurrentUser: true,
  maTrangThai: "1",
};

export const TiepNhanHoSoTrucTuyenTable = ({
  maScreen,
  extraSearchParams,
}: {
  maScreen: ScreenType;
  extraSearchParams?: ISearchHoSo;
}) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({ maScreen: maScreen });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    ...INIT_SEARCHPARAM,
    ...extraSearchParams,
  });
  const rowClassName = (e: IHoSo) => {
    const ngayHienTai = dayjs();
    const ngayTiepNhanObject = dayjs(e.ngayHenTraCaNhan);
    if (ngayHienTai.diff(ngayTiepNhanObject, 'hours') > 8) {
      return 'custom-row-style-qua-han';
    } else {
      return '';
    }

  }
  const items: HoSoTableActions[] = useMemo(
    () => {
      const s = [
        {
          icon: (
            <EyeOutlined
              style={{ color: "blue" }}
              title="Xem chi tiết"
              onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
            />
          ),
        },
        {
          icon: (
            <CheckOutlined
              style={{ color: "green" }}
              title="Tiếp nhận"
              onClick={() =>
                buttonActionContext.setTiepNhanHoSoTrucTuyenModalVisible(true)
              }
            />
          ),
        },
      ]
      return s
    },
    []
  );

  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    if (filters) {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== null && value !== undefined && value.length > 0)

      );

      if (Object.keys(cleanedFilters).length > 0) {
        if (cleanedFilters.trangThaiPhiLePhi) {
          setSearchParams({
            pageNumber: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
            reFetch: true,
            byCurrentUser: true,
            maTrangThai: "1",
            trangThaiThuPhi: cleanedFilters.trangThaiPhiLePhi[0] as any
          });
        }
      }
      else {
        setSearchParams({
          pageNumber: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          reFetch: true,
          byCurrentUser: true,
          maTrangThai: "1",
        });
      }
    }
  };


  const { columns } = useHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items, maScreen
  );
  const rowSelection: TableRowSelection<IHoSo> = {
    onChange: (selectedRowKeys: React.Key[], hoSos: IHoSo[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
      if (selectedRowKeys.length == 1) {
        buttonActionContext.setSelectedHoSo(hoSos[0]);
      }
      else {
        buttonActionContext.setSelectedHoSo(undefined);
      }
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} resetSearchParams={() => setSearchParams({
        ...INIT_SEARCHPARAM,
        ...extraSearchParams,
        })} defaultVisible={false} showAdvanceSearchBtn 
          extraButtons={maScreen === "cho-ky-duyet-phi-dia-gioi" ? <AntdButton
            type="primary"
            onClick={() => {
              downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
            }}
          >
             In danh sách
          </AntdButton> : undefined}/>
        <AntdTable
          bordered
          loading={loading}
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count,
          }}
          rowSelection={rowSelection}
          rowClassName={rowClassName}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchNguoiDangXuLy(params))}
          onChange={onChange}
        />
      </AntdSpace>
      {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <TiepNhanHoSoTrucTuyenProvider>
    <ButtonActionProvider>
      <TiepNhanHoSoTrucTuyenTable maScreen="tiep-nhan-ho-so-truc-tuyen" />
    </ButtonActionProvider>
  </TiepNhanHoSoTrucTuyenProvider>
);
export default HoSoTableWrapper;
