import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import './scss/index.scss'
import { useEffect } from 'react'
import { SearchDSTaiLieuHDSD } from '@/features/portaldvc_admin/DSTaiLieuHDSD/redux/action'
import { Table } from 'antd'
import { callApiAndDisplayFile, getFileName } from '@/utils'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'
import { dateFormat } from 'highcharts'
import dayjs from "dayjs";


const DanhSachTaiLieuHDSDWrapper = () => {
    const dispatch = useAppDispatch()
    const { data: dstailieuhuongdan, datas: dstailieuhuongdans } = useAppSelector(state => state.dstailieuhdsd)
    useEffect(() => {
        dispatch(SearchDSTaiLieuHDSD({}))
    }, [])


    return (

        <div className="container-sm mt-5">
            <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                <div className='mb-4'>
                    <strong style={{color:'#d7764f',fontSize : '24px'}}>Danh sách tài liệu hướng dẫn sử dụng</strong>
                </div>
                {dstailieuhuongdans?.map((item, index) => (
                    <div>
                        <div className='mb-2'>
                            <div className='text-title'>{index + 1 + ". "}{item.tenTaiLieu}</div>
                        </div>
                        <div className='mb-5 table'>
                            <table className="table table-bordered align-middle custom-table">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên tài liệu</th>
                                        <th scope="col">File đính kèm</th>
                                        <th scope="col">Mô tả</th>
                                        <th scope="col">Ngày đăng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope='row'>{index + 1}</td>
                                        <td >{item.tenTaiLieu}</td>
                                        <td ><span onClick={() => { callApiAndDisplayFile(item.tepDinhKem) }}>{getFileName(item.tepDinhKem)}</span></td>
                                        <td >{item.moTa}</td>
                                        <td>{dayjs(item.ngayDang).format(FORMAT_DATE_WITHOUT_TIME)}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DanhSachTaiLieuHDSDWrapper