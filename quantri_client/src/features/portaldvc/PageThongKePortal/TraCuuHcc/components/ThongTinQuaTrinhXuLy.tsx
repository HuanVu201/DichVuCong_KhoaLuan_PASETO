import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect } from "react";
import { useTraCuuHccContext } from "../contexts";
import { SearchQuaTrinhXuLyHoSo } from "@/features/quatrinhxulyhoso/redux/action";
import { FORMAT_DATE, FORMAT_TIME } from "@/data";
import dayjs from 'dayjs'

function ThongTinQuaTrinhXuLy() {
    const dispatch = useAppDispatch()
    const traCuuContext = useTraCuuHccContext()
    const { datas: quaTrinhXuLyHoSos } = useAppSelector((state) => state.quatrinhxulyhoso)

    useEffect(() => {
        if (traCuuContext.data) {
            dispatch(SearchQuaTrinhXuLyHoSo({ maHoSo: traCuuContext.data.maHoSo }))
        }
    }, [traCuuContext.data])
    return (<>
        <div className='tinhTrangHoSo componentBlock'>
            <div className='panel-body'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th className='titleTable'># </th>
                            <th className='titleTable'>Thời gian</th>
                            <th className='titleTable'>Người gửi</th>
                            <th className='titleTable'>Thao tác xử lý</th>
                            <th className='titleTable'>Người nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quaTrinhXuLyHoSos?.map((quaTrinh, index) => (<>
                            <tr key={index} className={index % 2 ? "rowChan" : "rowLe"}>
                                <td className='dataTable'>{index + 1}</td>
                                <td className='dataTable'>{quaTrinh.thoiGian ? dayjs(quaTrinh.thoiGian).format(FORMAT_TIME) : ""}</td>
                                <td className='dataTable'>{quaTrinh.tenNguoiGui}</td>
                                <td className='dataTable'>{quaTrinh.thaoTac}</td>
                                <td className='dataTable'>{quaTrinh.tenNguoiNhan}</td>
                            </tr>
                        </>))}
                    </tbody>
                </table>

            </div>
        </div>
    </>);
}

export default ThongTinQuaTrinhXuLy;