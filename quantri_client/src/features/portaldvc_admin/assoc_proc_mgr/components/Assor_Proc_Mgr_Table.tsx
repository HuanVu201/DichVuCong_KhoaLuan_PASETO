import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Assor_Proc_MgrProvider, useAssor_Proc_Mgr_Context } from "../contexts"
import { ISearchAssor_Proc_Mgr, IAssor_Proc_Mgr } from "../model"
import { useColumn } from "../hooks/useColumn"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { assor_Proc_Mgr_Api } from "../services"
import { toast } from "react-toastify"
import { Assor_Proc_Mgr_Search } from "./Assor_Proc_Mgr_Search"
import { Assor_Proc_Mgr_Detail } from "./Assor_Proc_Mgr_Detail"

const Assor_Proc_Mgr_Table = () => {
    const dispatch = useAppDispatch()
    const assor_Proc_Mgr_Context = useAssor_Proc_Mgr_Context()
    const [data, setData] = useState<IAssor_Proc_Mgr[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const { columns } = useColumn({ pageNumber: assor_Proc_Mgr_Context.searchParams.pageNumber, pageSize: assor_Proc_Mgr_Context.searchParams.pageSize })

    useEffect(() => {
        (async () => {
            if (assor_Proc_Mgr_Context.searchParams) {
                assor_Proc_Mgr_Context.setLoading(true)
                const res = await assor_Proc_Mgr_Api.Search({
                    ...assor_Proc_Mgr_Context.searchParams
                })
                if (res.data.data)
                    setData(res.data.data)
                if (res.data.data == null )
                    setData(res.data.data)
                assor_Proc_Mgr_Context.setLoading(false)
            }
        })()
    }, [assor_Proc_Mgr_Context.searchParams])

    return (
        <>
            <Spin spinning={assor_Proc_Mgr_Context.loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <AntdSpace direction="vertical" style={{ width: "100%" }}>
                    <Assor_Proc_Mgr_Search />
                    <p><b>Tổng: {data?.length || 0} thủ tục</b></p>
                    <AntdTable
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            total: data?.length || 0
                        }}
                        searchParams={assor_Proc_Mgr_Context.searchParams}
                        setSearchParams={assor_Proc_Mgr_Context.setSearchParams}
                        onSearch={(params) => { }}
                    />
                </AntdSpace>
                <Assor_Proc_Mgr_Detail />
            </Spin>
        </>

    )
}
const Assor_Proc_MgrTableWrapper = () => (<Assor_Proc_MgrProvider>
    <Assor_Proc_Mgr_Table />
</Assor_Proc_MgrProvider>)
export default Assor_Proc_MgrTableWrapper