import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { ISearchTaiLieuGiayToCaNhan, ITaiLieuGiayToCaNhan } from "../models";
import { LoaiNhomGiayToCaNhanApi } from "../services/LoaiNhomGiayToCaNhanService";
import { useTaiLieuGiayToCaNhanNamDinhColumn } from "../hooks/useTaiLieuGiayToCaNhanColumn";
import SearchTaiLieuCaNhan from "./SearchTaiLieuCaNhanNamDinh";
import AddTaiLieuCaNhanModal from "./AddTaiLieuCaNhanModal";
import { useKhoTaiLieuCongDanNamDinhContext } from "../contexts";
import { TaiLieuGiayToCaNhanApi } from "../services/TaiLieuGiayToCaNhanService";

export default function TaiLieuCaNhanNamDinhTable() {
    const khoTaiLieuContext = useKhoTaiLieuCongDanNamDinhContext()
    const [data, setData] = useState<ITaiLieuGiayToCaNhan[]>()
    const [existedKho, setExistedKho] = useState<boolean>(false)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [tongDungLuongKho, setTongDungLuongKho] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const searchParamOrigins: ISearchTaiLieuGiayToCaNhan = {
        pageNumber: 1, pageSize: 10
    }
    const [searchParams, setSearchParams] = useState<ISearchTaiLieuGiayToCaNhan>({ ...searchParamOrigins })
    const { columns } = useTaiLieuGiayToCaNhanNamDinhColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize, searchParams: searchParams, setSearchParams: setSearchParams })
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        (async () => {
            if (user?.soDinhDanh) {
                setLoading(true)
                const res = await TaiLieuGiayToCaNhanApi.Search({ ...searchParams })
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
    }, [searchParams, khoTaiLieuContext.reload])

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
                <SearchTaiLieuCaNhan setSearchParams={setSearchParams} />
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
                <AddTaiLieuCaNhanModal searchParams={searchParams} setSearchParams={setSearchParams} />
            </Spin>
        </AntdSpace>
    </>)
}