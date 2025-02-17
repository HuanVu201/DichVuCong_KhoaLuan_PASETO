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

export default function TaiLieuCaNhanTable() {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [data, setData] = useState<ITaiLieuLuuTruCongDan[]>()
    const [existedKho, setExistedKho] = useState<boolean>(false)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [tongDungLuongKho, setTongDungLuongKho] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchTaiLieuLuuTruCongDan>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useTaiLieuCaNhanColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize, searchParams: searchParams, setSearchParams: setSearchParams })
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        (async () => {
            if (user?.soDinhDanh) {
                setLoading(true)
                const checkExistKho = await khoTaiLieuCongDanApi.CheckExistedKho({})
                if (checkExistKho.data.succeeded) {
                    setExistedKho(true)
                } else {
                    toast.error(checkExistKho.data.message)
                }
                setLoading(false)
            }
        })()
    }, [user])

    useEffect(() => {
        (async () => {
            if (existedKho && user?.soDinhDanh) {
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
    }, [existedKho, searchParams])

    useEffect(() => {
        if (data && data?.length > 0) {
            let total: number = 0
            data.forEach(i => {
                total += (Math.floor((i.dungLuong ?? 0) * 100) / 100)
            })
            setTongDungLuongKho(total)
        }
    }, [data])

    useEffect(() => {
        (async () => {
            setLoading(true)
            const resLoaiNhomGiayTo = await LoaiNhomGiayToCaNhanApi.Search({
                pageNumber: 1,
                pageSize: 1000,
            })
            if (resLoaiNhomGiayTo.data.data) {
                khoTaiLieuContext.setLoaiGiayTos(resLoaiNhomGiayTo.data.data.filter(x => x.loai?.toLowerCase() == "loại giấy tờ"))
                khoTaiLieuContext.setNhomGiayTos(resLoaiNhomGiayTo.data.data.filter(x => x.loai?.toLowerCase() == "nhóm giấy tờ"))
            } else {
                toast.error('Không có thông tin loại giấy tờ!')
            }
            setLoading(false)

        })()
    }, [khoTaiLieuContext.reload])

    return (<>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <SearchKhoTaiLieu setSearchParams={setSearchParams} />
                <p><b>Tổng dung lượng trong kho: {(Math.floor((tongDungLuongKho ?? 0) * 100) / 100).toString() ?? 0}/100 MB</b></p>
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
                <TaiLieuDetailModal searchParams={searchParams} setSearchParams={setSearchParams} />
                <ShareDocumnetModal setLoading={setLoading} />
            </Spin>
        </AntdSpace>
    </>)
}