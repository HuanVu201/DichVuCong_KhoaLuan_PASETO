import { SearchCauHoiPhoBien } from "@/features/portaldvc_admin/CauHoiPhoBien/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import '../scss/List.scss'
import { Link, useLocation } from "react-router-dom"
import { Pagination, PaginationProps } from "antd"
import { useDispatch } from "react-redux"
import '../../HoiDap/components/HoiDapList.scss'
import { useNhungCauHoiThuongGapContext } from "../contexts/NhungCauHoiThuongGapContext"


const PossitionPage = ({ type }: { type: string }) => {
    const [current, setCurrent] = useState(1);
    const dispatch = useDispatch()
    const { count } = useAppSelector((state) => state.cauhoiphobien)

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        dispatch(SearchCauHoiPhoBien({ pageSize: 10, pageNumber: page, type: type ? type : "cong-dan" }) as any)
    };

    return <Pagination total={count} current={current} onChange={onChange} />;
};


export const ListNhungCauHoiThuongGap = () => {
    const nhungCauHoiThuongGapContext = useNhungCauHoiThuongGapContext()
    const dispatch = useAppDispatch()
    const { datas: cauHoiPhoBiens } = useAppSelector((state) => state.cauhoiphobien)
    useEffect(() => {
        dispatch(SearchCauHoiPhoBien({ pageSize: 10, pageNumber: 1, reFetch: true, type: nhungCauHoiThuongGapContext.NhungCauHoiThuongGapType ? nhungCauHoiThuongGapContext.NhungCauHoiThuongGapType : "cong-dan" }))
    }, [nhungCauHoiThuongGapContext.NhungCauHoiThuongGapType])

    return (
        <div>
            {cauHoiPhoBiens?.map((item, index) => (
                <div key={index} className="d-flex align-items-center" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '2px 2px' }}>
                    <div className="imageBlock">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05q_vg5Ux_rPqNDBBeYLc1BHrG-qjaw7_tA&usqp=CAU' alt='' />
                    </div>
                    <div className="list-text">
                        <Link to={`/portaldvc/nhung-cau-hoi-thuong-gap/${item.id}`}>
                            <strong style={{ color: '#ce7a58', fontSize: '15px' }}>{item.tieuDe}</strong>
                        </Link>
                        <div style={{ fontSize: '16px', fontWeight: '400', overflow: 'hidden', whiteSpace: 'nowrap', width: '500px', textOverflow: 'ellipsis' }}>{item.noiDungCauHoi}</div>
                    </div>
                </div>
            ))}
            {cauHoiPhoBiens ? <PossitionPage type={nhungCauHoiThuongGapContext.NhungCauHoiThuongGapType as any} /> : <></>}

        </div>
    )
}