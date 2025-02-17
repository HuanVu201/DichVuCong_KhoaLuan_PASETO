import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ITaiLieuLuuTruCongDan, ISearchTaiLieuLuuTruCongDan } from "../models";
import { useEffect, useState } from "react";
import { useTaiLieuCaNhanColumn } from "../hooks/useTaiLieuCaNhanColumn";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { khoTaiLieuCongDanApi } from "../services";
import { toast } from "react-toastify";
import SearchKhoTaiLieu from "./SearchKhoTaiLieu";
import ShareDocumnetModal from "./ShareDocumentModal";
import TaiLieuDetailModal from "./TaiLieuDetailModal";
import { LoaiNhomGiayToCaNhanApi } from "../../KhoTaiLieuCongDanNamDinh/services/LoaiNhomGiayToCaNhanService";
import { useKhoTaiLieuCongDanContext } from "../contexts/KhoTaiLieuCongDanContext";
import { useTraCuuTaiLieuCaNhanColumn } from "../hooks/useTraCuuTaiLieuCaNhanColumn";
import SearchTraCuuKhoTaiLieu from "./SearchTraCuuKhoTaiLieu";

export default function TraCuuTaiLieuCaNhanTable() {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [data, setData] = useState<ITaiLieuLuuTruCongDan[]>()
    const [existedKho, setExistedKho] = useState<boolean>(false)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [tongDungLuongKho, setTongDungLuongKho] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchTaiLieuLuuTruCongDan>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useTraCuuTaiLieuCaNhanColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize, searchParams: searchParams, setSearchParams: setSearchParams })
    const { data: user } = useAppSelector(state => state.user)
    const [blockCallApi, setBlockCallApi] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            if (user?.soDinhDanh && !blockCallApi) {
                setLoading(true)
                const res = await khoTaiLieuCongDanApi.SearchTaiLieuTrongKho({ ...searchParams })
                if (res.status == 200) {
                    setData(res.data.data)
                    setTotalCount(res.data.totalCount)
                }
                else {
                    toast.error("Lỗi lấy danh sách tài liệu")
                }
                setLoading(false)
            }
        })()
    }, [existedKho, searchParams, blockCallApi])

    useEffect(() => {
        if (data && data?.length > 0) {
            let total: number = 0
            data.forEach(i => {
                total += (Math.floor((i.dungLuong ?? 0) * 100) / 100)
            })
            setTongDungLuongKho(total)
        }
    }, [data])

    return (<>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <SearchTraCuuKhoTaiLieu setSearchParams={setSearchParams} setBlockCallApi={setBlockCallApi} />
                {/* <p><b>Tổng dung lượng trong kho: {(Math.floor((tongDungLuongKho ?? 0) * 100) / 100).toString() ?? 0}/100 MB</b></p> */}
                {blockCallApi ? null :
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
                        style={{ margin: '15px 0' }}
                    />
                }
                <TaiLieuDetailModal searchParams={searchParams} setSearchParams={setSearchParams} />
                <ShareDocumnetModal setLoading={setLoading} />
            </Spin>
        </AntdSpace>
    </>)
}