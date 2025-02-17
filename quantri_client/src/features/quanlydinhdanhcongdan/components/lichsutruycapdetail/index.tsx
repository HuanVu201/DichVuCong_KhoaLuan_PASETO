import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useQuanLyDinhDanhContext } from "../../context/quanLyDinhDanhCongDanContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { ISearchLogAuthenParams } from "@/features/quanLyTruyCapDvc/model"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { LogAuthenSearch } from "@/features/quanLyTruyCapDvc/components/QuanLyTruyCapDvcSearch"
import { LogAuthenDetail } from "@/features/quanLyTruyCapDvc/components/QuanLyTruyCapDvcDetail"
import { SearchLogAuthen } from "@/features/quanLyTruyCapDvc/redux/action"
import { useColumn } from "../../../quanLyTruyCapDvc/hooks/useColumn"
import { LogAuthenProvider } from "@/features/quanLyTruyCapDvc/context"
import { getCurrencyThongKe } from "@/utils"

const LichSuTruyCapDetail = () => {
    const quanLyDinhDanhCongDanContext = useQuanLyDinhDanhContext()

    const dispatch = useAppDispatch()
    const { datas: logAuthens, count, loading } = useAppSelector(state => state.logAuthen)
    const [searchParams, setSearchParams] = useState<ISearchLogAuthenParams>({ pageNumber: 1, pageSize: 10, userName: quanLyDinhDanhCongDanContext.userName })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchDanhMucChung({ type: 'type-login', pageNumber: 1, pageSize: 200 }))
    }, [])
    const handleCancel = () => {
        quanLyDinhDanhCongDanContext.setDetailThongKeModalVisible(false)
        quanLyDinhDanhCongDanContext.setUserName(undefined)
    };
    useEffect(() => {
        setSearchParams(cur => ({ ...cur, userName: quanLyDinhDanhCongDanContext.userName }))
    }, [quanLyDinhDanhCongDanContext.userName])
    return (
        <AntdModal fullsizeScrollable footer={null} visible={quanLyDinhDanhCongDanContext.detailThongKeModalVisible} title={'Chi tiết lịch sử truy cập'} handlerCancel={handleCancel}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    {/* <LogAuthenSearch setSearchParams={setSearchParams} /> */}
                    <div style={{ marginBottom: 8 }}>
                        <b>Số lượng truy cập: {getCurrencyThongKe(count || 0)} lượt</b>
                    </div>
                    <AntdTable
                        columns={columns}
                        dataSource={logAuthens}
                        pagination={{
                            total: count
                        }}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => dispatch(SearchLogAuthen(params))}
                    />
                </Spin>
                <LogAuthenDetail />
            </AntdSpace>
        </AntdModal>
    )
}

const LichSuTruyCapWrapper = () => (<LogAuthenProvider>
    <LichSuTruyCapDetail />
</LogAuthenProvider>)
export default LichSuTruyCapWrapper