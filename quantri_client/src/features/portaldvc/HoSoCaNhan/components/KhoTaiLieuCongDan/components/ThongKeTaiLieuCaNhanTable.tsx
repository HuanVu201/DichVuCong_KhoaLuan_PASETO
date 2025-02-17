import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ITaiLieuLuuTruCongDan, ISearchTaiLieuLuuTruCongDan, IDataChartTaiLieuCongDan } from "../models";
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
import SearchThongKeKhoTaiLieu from "./SearchThongKeKhoTaiLieu";
import { linhVucApi } from "@/features/linhvuc/services";
import { ILinhVuc } from "@/features/linhvuc/models";


export default function ThongKeTaiLieuCaNhanTable() {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchTaiLieuLuuTruCongDan>({ pageNumber: 1, pageSize: 10 })
    const { data: user } = useAppSelector(state => state.user)
    const [blockCallApi, setBlockCallApi] = useState<boolean>(true)
    const [linhVucs, setLinhVucs] = useState<ILinhVuc[]>()
    const [dataTaiLieuChartTheoCongdan, setDataTaiLieuChartTheoCongDan] = useState<IDataChartTaiLieuCongDan>()

    useEffect(() => {
        const fetchData = async () => {
            if (!linhVucs) {
                const resLinhVuc = await linhVucApi.SearchTheoDonVi({ pageNumber: 1, pageSize: 10000, })
                if (resLinhVuc.data.data) {
                    setLinhVucs(resLinhVuc.data.data)
                } else {
                    setLinhVucs(undefined)
                    toast.error("Không có thông tin danh mục lĩnh vực")
                }
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        (async () => {
            if (user?.soDinhDanh && !blockCallApi) {
                setLoading(true)
                const res = await khoTaiLieuCongDanApi.GetDataChartTaiLieuCongDan({ ...searchParams })
                if (res.data.data) {
                    setDataTaiLieuChartTheoCongDan(res.data.data)
                }
                else {
                    toast.error("Lỗi lấy danh sách tài liệu")
                }
                setLoading(false)
            }
        })()
    }, [searchParams, blockCallApi])

    console.log(dataTaiLieuChartTheoCongdan);


    return (<>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <SearchThongKeKhoTaiLieu setSearchParams={setSearchParams} linhVucs={linhVucs} setBlockCallApi={setBlockCallApi} />
                {dataTaiLieuChartTheoCongdan ?
                    <div style={{ fontSize: '17px', fontWeight: '500' }}>
                        Có tổng số {dataTaiLieuChartTheoCongdan?.dataValue} tài liệu
                    </div> :
                    <div style={{ fontSize: '17px', fontWeight: '500' }}>
                        Có tổng số 0 tài liệu
                    </div>
                }

            </Spin>
        </AntdSpace>
    </>)
}