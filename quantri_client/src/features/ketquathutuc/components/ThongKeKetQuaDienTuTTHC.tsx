import { useEffect, useState } from "react"
import { AntdTable, AntdSpace, AntdModal, AntdButton } from "../../../lib/antd/components"
import { useKetQuaThuTucColumns } from "../hooks/useKetQuaThuTucColumns"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { KetQuaThuTucDetail } from "./KetQuaThuTucDetail"
import { ThuTucProvider, useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ketQuaThuTucService } from "../services"
import { KetQuaThuTucProvider, useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"
import { toast } from "react-toastify"
import { GiayToDienTuTTHCSearch } from "./GiayToDienTuTTHCSearch"
import { useGiayToDienTuTTHCColumns } from "../hooks/useGiayToDienTuTTHCColumns"
import { ThemDinhKemMauPhoi } from "./ThemDinhKemMauPhoi"
import { ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useGiayToSoHoaColumns } from "@/features/giaytosohoa/hooks/useColumn"
import { useViewGiayToSoHoaColumns } from "@/features/giaytosohoa/hooks/useColumnView"
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { ThongKeKetQuaDienTuTTHCSearch } from "./ThongKeKetQuaDienTuTTHCSearch"

export const ThongKeKetQuaDienTuTTHCTable = () => {
  const dispatch = useAppDispatch()
  const KetQuaThuTucContext = useKetQuaThuTucContext()
  const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 50 })
  const { columns } = useViewGiayToSoHoaColumns(searchParams, setSearchParams)
  const { datas: giayToSoHoas, loading, count } = useAppSelector(x => x.giaytosohoa)
  useEffect(() => {
    if (KetQuaThuTucContext.thuTucId) {
      setSearchParams((curr) => ({ ...curr, maTTHC: KetQuaThuTucContext.thuTucId } as any))
    }
  }, [KetQuaThuTucContext.thuTucId])

  const onSearch = async (values: ISearchGiayToSoHoa) => {
    const res = await dispatch(SearchGiayToSoHoa(values))

  }
  const resetSearchParams = () => {
    if (KetQuaThuTucContext.thuTucId) {
      setSearchParams({ pageNumber: 1, pageSize: 50, maKetQuaTTHC: KetQuaThuTucContext.maGiayTo })
    }
  }
  useEffect(() => {
    if (searchParams.maKetQuaTTHC)
      onSearch(searchParams)

  }, [
    searchParams
  ])
  useEffect(() => {
    setSearchParams({
      ...searchParams,
      maKetQuaTTHC: KetQuaThuTucContext.maGiayTo
    })
  }, [KetQuaThuTucContext.maGiayTo])
  const handleCancel = () => {
    KetQuaThuTucContext.setThongKeKetQuaTTHCModalVisible(false);
  }
  return (
    <AntdModal title="" visible={true} handlerCancel={handleCancel} footer={<>
      <AntdButton key={"1"} onClick={(handleCancel)}>Đóng</AntdButton>
    </>}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {/* <ThongKeKetQuaDienTuTTHCSearch setSearchParams={setSearchParams} resetSearch={resetSearchParams} /> */}
        <div style={{ fontWeight: '500' }}>Tổng số <span style={{ color: 'red' }}>{count}</span> kết quả biểu mẫu đã trích xuất của thủ tục</div>
        {/* <AntdTable
          columns={columns as any}
          dataSource={giayToSoHoas as any}
          pagination={{
            total: count
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => { }}
        /> */}
      </AntdSpace>
    </AntdModal>

  )
}
