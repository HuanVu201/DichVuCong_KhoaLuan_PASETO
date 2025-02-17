import { KenhTinChiTiet } from "@/features/portaldvc_admin/kenhtin/components/modals/KenhTinChiTiet";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HoiDapProvider, useHoiDapContext } from "../../../portaldvc_admin/HoiDap/contexts/HoiDapContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchHoiDap } from "../redux/action";
import { Pagination, PaginationProps } from "antd";
import { useDispatch } from "react-redux";
import '../components/HoiDapList.scss'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from 'dayjs';

const PossitionPage: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const dispatch = useDispatch()
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        dispatch(SearchHoiDap({ pageSize: 5, pageNumber: page }) as any)
    };

    return <Pagination current={current} onChange={onChange}  />;
};

export const HoiDapList = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch()
    const { data: hoidap, datas: hoidaps } = useAppSelector(state => state.hoidap)

    useEffect(() => {
        dispatch(SearchHoiDap({ pageSize: 5, pageNumber: 1, congKhai: 'co', trangThai: type ? type : 'da-giai-dap' }))
    }, [type])
    return (
        <div >
            {hoidaps?.map(item => (
                <div >
                    <div className='imageBlock'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05q_vg5Ux_rPqNDBBeYLc1BHrG-qjaw7_tA&usqp=CAU' alt='' />
                    </div>
                    <div className='wrap-list'>
                        <Link to={`/portaldvc/hoi-dap/${item.id}`} className='text-primary'>
                            <strong className="Hoidap-CH">{item.tieuDe}</strong>
                        </Link>
                        <p className='Hoidap-detail'>
                            <i>Người gửi: </i>
                            {item.hoTen}
                            - <em className='Hoidap-time'>{item?.ngayGui ? dayjs(item.ngayGui).format(FORMAT_DATE_WITHOUT_TIME) : ""}</em>
                        </p>
                        <p className='Hoidap-content'>
                            {item.noiDung}
                        </p>
                        <p className='Hoidap-link text-right' >
                            <Link to={`/portaldvc/hoi-dap/${item.id}`}>Chi tiết</Link>
                        </p>

                    </div>
                </div>
            ))}

            {hoidaps ? <PossitionPage /> : <></>}
        </div >


    )
}




