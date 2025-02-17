import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data';
import { useTraCuuContext } from '../context/TraCuuProvider';
import './Content.scss'
import dayjs from 'dayjs'
import { TRANGTHAIHOSO } from '@/features/hoso/data/formData';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { SearchQuaTrinhXuLyHoSo } from '@/features/quatrinhxulyhoso/redux/action';
import { AntdButton } from '@/lib/antd/components';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FormInstance } from 'antd';
import { ReCapChaProps } from '@/lib/recapcha';
function ContentTraCuuPortal({ form }: { form: FormInstance<ReCapChaProps> }) {
    const traCuuContext = useTraCuuContext()
    const { executeRecaptcha } = useGoogleReCaptcha()
    const dispatch = useAppDispatch()
    const { datas: quaTrinhXuLyHoSos } = useAppSelector((state) => state.quatrinhxulyhoso)

    useEffect(() => {
        if (traCuuContext.hoSo) {
            dispatch(SearchQuaTrinhXuLyHoSo({ maHoSo: traCuuContext.hoSo.maHoSo }))
        }
    }, [traCuuContext.hoSo])
    const onShowDetailHoSo = async (maHoSo: string) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha("searchHoSo")
        form.setFieldValue("MaCaptCha", token)
        traCuuContext.handleUrlQueryStringChange({ MaHoSo: maHoSo })
    }

    if(traCuuContext.hoSo){
        const hoSo = traCuuContext.hoSo
        return (
            <div className='contentTraCuu' key={"2"}>
                <div className='row'>
                    <div className='col-xs-12 col-sm-4'>
                        <div className='thongTinHoSo componentBlock'>
                            <div className='title'>
                                THÔNG TIN HỒ SƠ
                            </div>
                            <div className='panel-body'>
                                <table className='table table-hover'>
                                    <tbody>
                                        <tr className='row-data'>
                                            <td className='col-4 titleTable'>
                                                Chủ hồ sơ
                                            </td>
                                            <td className='col-8 dataTable'>
                                                {hoSo.chuHoSo}
                                            </td>
                                        </tr>
                                        <tr className='row-data'>
                                            <td className='col-4 titleTable'>
                                                Địa chỉ
                                            </td>
                                            <td className='col-8 dataTable'>
                                                {hoSo.diaChiChuHoSo}
                                            </td>
                                        </tr>
                                        <tr className='row-data'>
                                            <td className='col-4 titleTable'>
                                                Tên thủ tục
                                            </td>
                                            <td className='col-8 dataTable'>
                                                {hoSo.tenTTHC}
                                            </td>
                                        </tr>
                                        <tr className='row-data'>
                                            <td className='col-4 titleTable'>
                                                Ngày tiếp nhận
                                            </td>
                                            <td className='col-8 dataTable'>
                                                {hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                                            </td>
                                        </tr>
                                        <tr className='row-data'>
                                            <td className='col-4 titleTable'>
                                                Ngày hẹn trả
                                            </td>
                                            <td className='col-8 dataTable'>
                                                {hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                                            </td>
                                        </tr>
                                        <tr className='row-data'>
                                            <td className='col-4 titleTable'>
                                                Tình trạng
                                            </td>
                                            <td className='col-8 dataTable'>
                                                {TRANGTHAIHOSO[hoSo.trangThaiHoSoId]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
    
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-12 col-sm-8'>
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
                    </div>
                </div>
            </div>
        );
    } else if (traCuuContext.hoSo === null){
        return <>Không có thông tin dữ liệu!</>
    }
}

export default ContentTraCuuPortal;