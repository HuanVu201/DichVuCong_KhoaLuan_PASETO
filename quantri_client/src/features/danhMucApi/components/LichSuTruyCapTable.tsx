import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdTable, AntdUpLoad, AntdUploadPublicFile } from "../../../lib/antd/components"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { IApiChiaSe, ISearchApiChiaSe } from "@/features/quanLySuDungApi/models"
import { useLichSuApiColumn } from "@/features/quanLySuDungApi/hooks/useLichSuApiColumn"
import { ApiChiaSe } from "@/features/quanLySuDungApi/services"
import { FilterApiChiaSeSearch } from "@/features/quanLySuDungApi/components/FilterApiChiaSeSearch"
import { form } from "@formio/react"

export const LichSuApiChiaSeTable = ({ dataLichSu, totalCountLS, searchLichSuParams, setSearchLichSuParams }: {
    dataLichSu: IApiChiaSe[] | undefined,
    totalCountLS: number,
    searchLichSuParams: ISearchApiChiaSe,
    setSearchLichSuParams: React.Dispatch<React.SetStateAction<ISearchApiChiaSe>>
}) => {

    const { columns } = useLichSuApiColumn()

    return (
        <>
            <FilterApiChiaSeSearch setSearchParams={setSearchLichSuParams} />
            <p><b>Số lượt truy cập: {totalCountLS} lượt</b></p>
            <AntdTable
                columns={columns}
                dataSource={dataLichSu}
                searchParams={searchLichSuParams}
                setSearchParams={setSearchLichSuParams}
                onSearch={(params) => { }}
                style={{ margin: '15px 0' }}
                position={["bottomRight"]}
            />

        </>
    )
}