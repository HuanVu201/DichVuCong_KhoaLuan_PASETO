import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { ScreenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action";
import { TiepNhanHoSoProvider } from "../contexts/TiepNhanHoSoContext";
import { HoSoTableActions, useHoSoColumn } from "../../../../../features/hoso/hooks/useHoSoColumn";
import { TableRowSelection } from "antd/es/table/interface";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined, FileTextOutlined, PrinterOutlined, StepForwardOutlined } from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { DiaDanhPhatSinhHoSoSearchElement } from "@/features/hoso/components/DiaDanhPhatSinhHoSoSearchElement";
import dayjs from 'dayjs'
import '../../../xulyhoso/dangxuly/components/DangXuLy.scss'
import { TableProps } from "antd";
import { Badge, Divider, Space } from 'antd';
import { toast } from "react-toastify";

export const TiepNhanHoSoTable = ({ maScreen, extraSearchParams }: { maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: maScreen,
  });

  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    byCurrentUser: true,
    maTrangThai: "2",
    ...extraSearchParams
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
      },
      {
        icon: <PrinterOutlined title="In phiếu tiếp nhận" onClick={() => {
          searchParams.laHoSoChungThuc ? buttonActionContext.setInPhieuTiepNhanChungThucModalVisible(true) : buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(true)
        }} />
      },
      {
        icon: <FileTextOutlined title="In phiếu kiểm soát" onClick={() => buttonActionContext.setInPhieuKiemSoatModalVisible(true)} />
      },
      {
        icon: <StepForwardOutlined title="Chuyển bước" onClick={() => buttonActionContext.setChuyenBuocXuLyModalVisible(true)} />
      },
    ],
    []
  );
  const { columns } = useHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items,
    maScreen
  );
  const rowSelection: TableRowSelection<IHoSo> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
      
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  const rowClassName = (e: IHoSo) => {
    const ngayHienTai = dayjs();
    const ngayTiepNhanObject = dayjs(e.ngayHenTraCaNhan);

    if (ngayHienTai.diff(ngayTiepNhanObject, 'hours') > 8) {
      return 'custom-row-style-qua-han';
    } else {
      return '';
    }

  }

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
          pageNumber: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          reFetch: true,
          byCurrentUser: true,
          maTrangThai: "2",
          ...extraSearchParams
        });
      }
    } else {
      setSearchParams({
        pageNumber: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        reFetch: true,
        byCurrentUser: true,
        maTrangThai: "2",
        ...extraSearchParams
      });
    }
    
  };

  return (
    <LazyActions setSearchParams={setSearchParams}>
      <span id="dangerHtml"></span>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <div>

          <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} resetSearchParams={() => setSearchParams({
            pageNumber: 1,
            pageSize: 10,
            reFetch: true,
            byCurrentUser: true,
            maTrangThai: "2",
          })} extraElement={(form) => (<>
            <DiaDanhPhatSinhHoSoSearchElement form={form} />
          </>)} defaultVisible={false} 
            showAdvanceSearchBtn
          />
        </div>

        <AntdTable
          loading={loading}
          rowClassName={rowClassName as any}
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count,
          }}
          rowSelection={rowSelection}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchNguoiDangXuLy(params))}
          onChange={onChange}
        />
      </AntdSpace>
    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <TiepNhanHoSoProvider>
    <ButtonActionProvider>
      <TiepNhanHoSoTable maScreen="tiep-nhan-ho-so-truc-tiep" />
    </ButtonActionProvider>
  </TiepNhanHoSoProvider>
);
export default HoSoTableWrapper;
