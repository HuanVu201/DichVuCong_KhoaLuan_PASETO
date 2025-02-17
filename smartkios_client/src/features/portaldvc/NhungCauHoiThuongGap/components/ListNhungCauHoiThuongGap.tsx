import { SearchCauHoiPhoBien } from "@/features/portaldvc_admin/CauHoiPhoBien/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import '../scss/List.scss'
import { Link, useLocation } from "react-router-dom"

export const ListNhungCauHoiThuongGap = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch()
    const { datas: cauHoiPhoBiens } = useAppSelector((state) => state.cauhoiphobien)
    const [ID, setID] = useState(null)
    useEffect(() => {
        dispatch(SearchCauHoiPhoBien({ pageSize: 10, pageNumber: 1, reFetch: true, type: type ? type : "cong-dan" }))
    }, [type])

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
                        <div style={{ fontSize: '16px', fontWeight: '400', overflow: 'hidden', whiteSpace: 'nowrap', width: '500px',textOverflow : 'ellipsis' }}>{item.noiDungCauHoi}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}