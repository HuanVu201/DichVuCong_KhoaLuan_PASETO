import { TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { useTraCuuHccContext } from "../contexts";
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from 'dayjs'

function ThongTinHoSoTraCuu() {
    const traCuuContext = useTraCuuHccContext()

    if (traCuuContext.data) {
        const hoSo = traCuuContext.data
        return (
            <div className='contentTraCuu' key={"2"}>
                <div className='row'>
                    <div className='thongTinHoSo componentBlock'>
                        <div className='panel-body'>
                            <table className='table table-hover'>
                                <tbody>
                                    <tr className='row-data'>
                                        <td className='col-2 titleTable'>
                                            <b>Chủ hồ sơ</b>
                                        </td>
                                        <td className='col-10 dataTable'>
                                            {hoSo.chuHoSo}
                                        </td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td className='col-2 titleTable'>
                                            <b>Địa chỉ</b>
                                        </td>
                                        <td className='col-10 dataTable'>
                                            {hoSo.diaChiChuHoSo}
                                        </td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td className='col-2 titleTable'>
                                            <b>Tên thủ tục</b>
                                        </td>
                                        <td className='col-10 dataTable'>
                                            {hoSo.tenTTHC}
                                        </td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td className='col-2 titleTable'>
                                            <b>Ngày tiếp nhận</b>
                                        </td>
                                        <td className='col-10 dataTable'>
                                            {hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                                        </td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td className='col-2 titleTable'>
                                            <b>Ngày hẹn trả</b>
                                        </td>
                                        <td className='col-10 dataTable'>
                                            {hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                                        </td>
                                    </tr>
                                    <tr className='row-data'>
                                        <td className='col-2 titleTable'>
                                            <b>Tình trạng</b>
                                        </td>
                                        <td className='col-10 dataTable'>
                                            {TRANGTHAIHOSO[hoSo.trangThaiHoSoId]}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className='col-xs-12 col-sm-8'>
                        <div className='tinhTrangHoSo componentBlock'>
                            <div className='title'>
                                TÌNH TRẠNG XỬ LÝ HỒ SƠ
                            </div>
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
                                            <tr key={index}>
                                                <td className='dataTable'></td>
                                                <td className='dataTable'>{quaTrinh.thoiGian ? dayjs(quaTrinh.thoiGian).format(FORMAT_DATE) : ""}</td>
                                                <td className='dataTable'>{quaTrinh.tenNguoiGui}</td>
                                                <td className='dataTable'>{quaTrinh.thaoTac}</td>
                                                <td className='dataTable'>{quaTrinh.tenNguoiNhan}</td>
                                            </tr>
                                        </>))}
                                    </tbody>
                                </table>
    
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    } else if (traCuuContext.data === null) {
        return <b>Không có thông tin dữ liệu!</b>
    }
}

export default ThongTinHoSoTraCuu;