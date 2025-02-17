import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { XinRutSearch } from "./XinRutSearch"
import { SearchHoSo, SearchNguoiNhanHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { XinRutProvider, useXinRutContext } from "../contexts/XinRutContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"

const XinRutTable = () => {
  const dispatch = useAppDispatch()
  const buttonActionContext = useButtonActionContext()
  const { data: user } = useAppSelector(state => state.user)
  const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
  const { btnElememts } = useButtonActions({ maScreen: screenType["xin-rut-ho-so"] })
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1, pageSize: 50, reFetch: true, inMaTrangThais: ["9", "10"], loaiKetQua: "Trả lại/Xin rút", groupCode: user?.officeCode,
    laNguoiNhanHoSo: true,
  })
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
      },
    ],
    []
  );
  const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items, 'xin-rut-ho-so')
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys)
    },
    selectedRowKeys: buttonActionContext.selectedHoSos
  }



  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn />
        {searchParams.groupCode ? <AntdTable
          loading={loading}
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count
          }}
          rowSelection={rowSelection}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchHoSo(params))}
        /> : null}
      </AntdSpace>
    </LazyActions>

  )
}
const HoSoTableWrapper = () => (<XinRutProvider>
  <ButtonActionProvider>
    <XinRutTable />
  </ButtonActionProvider>
</XinRutProvider>)
export default HoSoTableWrapper