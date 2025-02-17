import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { ISearchLoaiNhomGiayToCaNhan, ISearchTaiLieuGiayToCaNhan, ITaiLieuGiayToCaNhan } from "../models";
import { LoaiNhomGiayToCaNhanApi } from "../services/LoaiNhomGiayToCaNhanService";
import { useTaiLieuGiayToCaNhanNamDinhColumn } from "../hooks/useTaiLieuGiayToCaNhanColumn";
import { useLoaiNhomGiayToCaNhanColumn } from "../hooks/useLoaiNhomGiayToCaNhanColumn";
import SearchLoaiNhomGiayToCaNhan from "./SearchLoaiNhomGiayToCaNhan";
import { DetailNhomLoaiGiayToModal } from "./DetailNhomLoaiGiayToModal";
import { useKhoTaiLieuCongDanContext } from "../../KhoTaiLieuCongDan/contexts/KhoTaiLieuCongDanContext";

export default function NhomGiayToCaNhanTable() {
    const khoTaiLieuDienTuContext = useKhoTaiLieuCongDanContext()
    const [data, setData] = useState<ITaiLieuGiayToCaNhan[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const searchParamOrigins: ISearchLoaiNhomGiayToCaNhan = {
        pageNumber: 1, pageSize: 10,
        loai: "Nhóm giấy tờ"
    }
    const [searchParams, setSearchParams] = useState<ISearchLoaiNhomGiayToCaNhan>({ ...searchParamOrigins })
    const { columns } = useLoaiNhomGiayToCaNhanColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize, searchParams: searchParams, setSearchParams: setSearchParams, type: 'nhóm giấy tờ' })
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        (async () => {
            if (searchParams && user?.soDinhDanh) {
                setLoading(true)
                const res = await LoaiNhomGiayToCaNhanApi.Search({ ...searchParams })
                if (res.status == 200) {
                    setData(res.data.data)
                    setTotalCount(res.data.totalCount)
                }
                else {
                    toast.error("Lỗi lấy danh sách loại giấy tờ")
                }
                setLoading(false)
            }
        })()
    }, [searchParams, khoTaiLieuDienTuContext.reload])



    return (<>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <SearchLoaiNhomGiayToCaNhan setSearchParams={setSearchParams}/>
                <AntdTable
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        total: totalCount
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                    position={["bottomRight"]}
                />
                <DetailNhomLoaiGiayToModal />
            </Spin>
        </AntdSpace>
    </>)
}