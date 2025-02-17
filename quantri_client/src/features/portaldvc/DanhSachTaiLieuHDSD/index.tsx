import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import './index.scss'
import { useEffect, useState } from 'react'
import { SearchDSTaiLieuHDSD } from '@/features/portaldvc_admin/DSTaiLieuHDSD/redux/action'
import { Table } from 'antd'
import { callApiAndDisplayFile, callApiAndDisplayPublicFile, getFileName, getUrlFromBlobPublic } from '@/utils'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'
import { dateFormat } from 'highcharts'
import dayjs from "dayjs";
import { AntdButton } from '@/lib/antd/components'
import { DsTaiLieuFile } from './DsTaiLieuFile'


const DanhSachTaiLieuHDSDWrapper = () => {
    const dispatch = useAppDispatch()
    const { data: dstailieuhuongdan, datas: dstailieuhuongdans } = useAppSelector(state => state.dstailieuhdsd)
    useEffect(() => {
        dispatch(SearchDSTaiLieuHDSD({ taiLieuDanhCho: 'CongDan' }))
    }, [])


    return (

        <div className="containerTaiLieuSwapper mt-5 commonBackgroundTrongDong">
            <div className='containerTaiLieu'>
                <h4 className='mb-4'>
                    <strong style={{ color: '#d7764f' }}>Danh sách tài liệu hướng dẫn sử dụng</strong>
                </h4>
                {dstailieuhuongdans?.map((item, index) => (
                    <div>
                        <div className='mb-2'>
                            <div className='text-title'>{index + 1 + ". "}{item.tenTaiLieu}</div>
                        </div>
                        <div className='mb-5 tableSwapper'>
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
                                        <td ><DsTaiLieuFile item={item}></DsTaiLieuFile></td>
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