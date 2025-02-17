import { useEffect, useMemo } from 'react'
import { ILogCSDLDanCuDoanhNghiep } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteLogCSDLDanCuDoanhNghiep } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useLogTaiKhoanCSDLDanCuContext } from '../contexts/LogTaiKhoanCSDLDanCuContext'
import { SearchDonVi } from '@/features/donvi/redux/action'
import moment from 'moment';


export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const LogCSDLDanCuDoanhNghiepContext = useLogTaiKhoanCSDLDanCuContext()
    const { datas: donVis } = useAppSelector(state => state.donvi)
    useEffect(() => {
        dispatch(SearchDonVi({pageSize : 1000 }))
    }, [])
    const getTenDonVi = useMemo(() => {
        const donViMap = new Map(donVis?.map(dv => [dv.donViId, dv.groupName]))
        return (donViId: string) => donViMap.get(donViId) || 'Không xác định';
    }, [donVis]);

    const columns = useMemo((): ColumnsType<ILogCSDLDanCuDoanhNghiep> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tài khoản",
                key: "taiKhoan",
                dataIndex: "taiKhoan",
            },
            {
                title: "Thời gian",
                key: "thoiGian",
                dataIndex: "thoiGian",
                render: (_,record) => moment(record.thoiGian).format('DD/MM/YYYY'), // Định dạng ngày tháng năm
            },
            {
                title: "Đơn vị",
                key: "donViId",
                dataIndex: "donViId",
                render: (_,record) => getTenDonVi(record.donViId),
            },
            {
                title: "Loại",
                key: "loai",
                dataIndex: "loai",
            },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width:"10%",
            //     align:'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
            //                 LogCSDLDanCuDoanhNghiepContext.setMaLogTaiKhoanCSDLDanCu(record.id)
            //                 LogCSDLDanCuDoanhNghiepContext.setLogTaiKhoanCSDLDanCuModalVisible(true)
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={() => {
            //                     dispatch(DeleteLogCSDLDanCuDoanhNghiep({ id: record.id, forceDelete: false }))
            //                 } }
            //                 okText='Xoá'
            //                 cancelText='Huỷ'
            //             >
            //                 <DeleteOutlined style={{color:"tomato"}}/>
            //             </Popconfirm>
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return { columns }
}