import { useEffect, useMemo, useState } from "react";
import {
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { ScreenType } from "@/features/hoso/data";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import {
  HoSoTableActions,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import {
    EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { Search } from "./Search";
import { hoSoApi } from "@/features/hoso/services";
import SoHoaThanhPhanWrapper from "./SoHoaThanhPhanWrapper";
import { useColumns } from "./hooks/useColumns";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { useTramSoHoaContext } from "./contexts/TramSoHoaContext";
import { GiayToTramSoHoa } from "./GiayToTramSoHoa";

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

const ChamSoHoaTable = ({maScreen, extraSearchParams}: {maScreen: ScreenType, extraSearchParams?: ISearchHoSo}) => {
  const buttonActionContext = useButtonActionContext();
  const tramSoHoaContext = useTramSoHoaContext()
  const [hoSos, setHoSos] = useState<IHoSo[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0);
  const [soHoaModalVisible, setSoHoaModalVisible] = useState(false)

  const { btnElememts } = useButtonActions({
    maScreen: maScreen ,
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    searchAllType: true,
    ...extraSearchParams
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EditOutlined
            title="Xem chi tiết"
            onClick={() => setSoHoaModalVisible(true)}
          />
        ),
      },
    ],
    []
  );
  
  const setSoHoaModal = (hoSoId: string) => {
    buttonActionContext.setSelectedHoSos([hoSoId])
    setSoHoaModalVisible(true)
  }
  
  const { columns } = useColumns(
    searchParams,
    items,
    setSoHoaModal,
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };

  useEffect(() => {
    return () => {
        setHoSos([])
        setCount(0)
    }
  }, [])

  const searchHoSo = async (values: ISearchHoSo) => {
    try{
        setLoading(true)
        const res = await hoSoApi.SearchChamSoHoa(values)
        setHoSos(res.data.data || [])
        setCount(res.data.totalCount)
    } catch(er){
        console.log(er);
    } finally{
        setLoading(false)

    }
  }

  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <Spin spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <AntdSpace direction="vertical" style={{ width: "100%" }}>
            {btnElememts}
            <Search
              btnComfirmLoading={loading}
              setSearchParams={setSearchParams} defaultVisible={true} showAdvanceSearchBtn />
            <AntdTable
              columns={columns}
              dataSource={hoSos}
              pagination={{
                total: count,
              }}
              rowSelection={rowSelection}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) => searchHoSo(params)}
            />
          </AntdSpace>
          {soHoaModalVisible ? <SoHoaThanhPhanWrapper setSearchHoSoParams={setSearchParams} onCloseModal={() => setSoHoaModalVisible(false)}/> : null}
          {tramSoHoaContext.giayToSoHoaVisible ? <GiayToTramSoHoa /> : null}
        </Spin>
        <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} />
      </LazyActions>
    </>
  );
};

export default ChamSoHoaTable