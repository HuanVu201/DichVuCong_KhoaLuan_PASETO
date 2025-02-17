import { AddPhieuKhaoSat, UpdatePhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import { SearchHoSo, SearchHoSoByNguoiGui } from "@/features/hoso/redux/action"
import { AddLogThongKeDGHLCongDan, GetByMHS } from "@/features/logthongkedghlcongdan/redux/action"
import { LogThongKeDGHLCongDanApi } from "@/features/logthongkedghlcongdan/services"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Popconfirm } from "antd"
import dayjs from "dayjs"
import { useEffect } from "react"
import { toast } from "react-toastify"

export const ReactCustomer = ({ maHoSo, donViHoSo }: { maHoSo: string, donViHoSo: string }) => {
    const dispatch = useAppDispatch()

    const { data: user } = useAppSelector(state => state.user)
    
    return (
        <>
            <button className="btn sohappy" >
                <i className="fa-solid fa-thumbs-up"></i>
                <Popconfirm
                    title='Bạn có chắc khi đánh giá rất hài lòng hồ sơ này ?'
                    onConfirm={async () => {
                        const res = await LogThongKeDGHLCongDanApi.Create({
                            maHoSo: maHoSo,
                            donVi: donViHoSo,
                            nguoiDanhGia: user?.fullName,
                            ngayTao: dayjs() as any,
                            traLoi1: '2',
                            traLoi2: '2',
                            traLoi3: '2',
                            traLoi4: '2',
                            traLoi5: '',
                            traLoi6: '2',
                            traLoi7: '2',
                            traLoi8: '',
                            traLoi9: '',
                            traLoi10: '2',
                            traLoi11: '2',
                            hoanThanhDanhGia: true
                        })
                        if (res.status == 201) {
                            toast.success("Đánh giá thành công")
                            dispatch(SearchHoSoByNguoiGui({ byNguoiGui: true }))
                        }
                        
                    }
                    }
                    okText='Đánh giá'
                    cancelText='Huỷ'
                >
                    <span>RẤT HÀI LÒNG</span>

                </Popconfirm>
            </button>
            <button className="btn happy" onClick={() => {
            }}>
                <i className="fa-solid fa-thumbs-up"></i>
                <Popconfirm
                    title='Bạn có chắc khi đánh giá hài lòng hồ sơ này ?'
                    onConfirm={async () => {
                        const res = await LogThongKeDGHLCongDanApi.Create({
                            maHoSo: maHoSo,
                            donVi: donViHoSo,
                            nguoiDanhGia: user?.fullName,
                            ngayTao: dayjs() as any,
                            traLoi1: '1',
                            traLoi2: '1',
                            traLoi3: '1',
                            traLoi4: '1',
                            traLoi5: '',
                            traLoi6: '1',
                            traLoi7: '1',
                            traLoi8: '',
                            traLoi9: '',
                            traLoi10: '1',
                            traLoi11: '1',
                            hoanThanhDanhGia: true
                        })
                        if (res.status == 201) {
                            toast.success("Đánh giá thành công")
                            dispatch(SearchHoSoByNguoiGui({ byNguoiGui: true }))
                        }
                        
                    }
                    }
                    okText='Đánh giá'
                    cancelText='Huỷ'
                >
                    <span>HÀI LÒNG</span>

                </Popconfirm>
            </button >
            <button className="btn nohappy" onClick={() => {

            }}>
                <i className="fa-solid fa-thumbs-down"></i>
                <Popconfirm
                    title='Bạn có chắc khi đánh giá không hài lòng hồ sơ này ?'
                    onConfirm={async () => {
                        const res = await LogThongKeDGHLCongDanApi.Create({
                            maHoSo: maHoSo,
                            donVi: donViHoSo,
                            nguoiDanhGia: user?.fullName,
                            ngayTao: dayjs() as any,
                            traLoi1: '0',
                            traLoi2: '0',
                            traLoi3: '0',
                            traLoi4: '0',
                            traLoi5: '',
                            traLoi6: '0',
                            traLoi7: '0',
                            traLoi8: '',
                            traLoi9: '',
                            traLoi10: '0',
                            traLoi11: '0',
                            hoanThanhDanhGia: true
                        })
                        if (res.status == 201) {
                            toast.success("Đánh giá thành công")
                            dispatch(SearchHoSoByNguoiGui({ byNguoiGui: true }))
                        }
                        
                    }
                    }
                    okText='Đánh giá'
                    cancelText='Huỷ'
                >
                    <span>KHÔNG HÀI LÒNG</span>

                </Popconfirm>
            </button>

        </>
    )
}