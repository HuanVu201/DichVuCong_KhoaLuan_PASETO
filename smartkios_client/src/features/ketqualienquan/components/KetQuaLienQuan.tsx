import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "@/features/ketqualienquan/models"
import { ketQuaLienQuanService } from "@/features/ketqualienquan/services"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ComponentProps, useState } from "react"
import { KetQuaLienQuanProvider, useKetQuaLienQuanContext } from "../contexts/KetQuaLienQuanProvider"
import { useColumn } from "../hooks/useColumn"
import { KetQuaLienQuanDetail } from "./KetQuaLienQuanDetail"
import { KetQuaLienQuanSearch } from "./KetQuaLienQuanSearch"

const KetQuaLienQuan = ({maHoSo}: {maHoSo: string}) => {
    const [searchParams, setSearchParams] = useState<ISearchKetQuaLienQuan>({pageNumber: 1, pageSize: 10, maHoSo})
    const ketQuaLienQuanContext = useKetQuaLienQuanContext()
    const columns = useColumn({searchParams})

    return <>
        <KetQuaLienQuanSearch setSearchParams={setSearchParams}/>
        <AntdTable
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(values) => ketQuaLienQuanContext.onSearch(values)}
            columns={columns as any}
            pagination={{
                total: ketQuaLienQuanContext.count
            }}
            dataSource={ketQuaLienQuanContext.ketQuaLienQuans as any}
        />
        {ketQuaLienQuanContext.ketQuaLienQuanModalVisible ? <KetQuaLienQuanDetail maHoSo={maHoSo} searchParams={searchParams}/> : null}
    </>
}

export const KetQuaLienQuanWrapper = (props: ComponentProps<typeof KetQuaLienQuan>) => {
    return <KetQuaLienQuanProvider>
        <KetQuaLienQuan {...props}/>
    </KetQuaLienQuanProvider>
}