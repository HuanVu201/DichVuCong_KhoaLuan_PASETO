import { useEffect, useMemo } from 'react'
import { ILogCSDLDanCuDoanhNghiep, IStatisticLogCSDLDanCuDoanhNghiep } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteLogCSDLDanCuDoanhNghiep } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useLogTaiKhoanCSDLDanCuContext } from '../contexts/LogTaiKhoanCSDLDanCuContext'
import { SearchDonVi } from '@/features/donvi/redux/action'
import moment from 'moment';


export const useColumnStatistic = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const { datas: donVis } = useAppSelector(state => state.donvi)

    const getTenDonVi = useMemo(() => {
        const donViMap = new Map(donVis?.map(dv => [dv.donViId, dv.groupName]))
        return (donViId: string) => donViMap.get(donViId) || 'Không xác định';
    }, [donVis]);

    const columnsStatistics = useMemo((): ColumnsType<IStatisticLogCSDLDanCuDoanhNghiep> => {
        return [
            {
                title: "Đơn vị",
                key: "donViId",
                dataIndex: "donViId",
                render: (_,record) => getTenDonVi(record.donViId),
            },
            {
                title: "Số lượng",
                key: "soLuong",
                dataIndex: "soLuong",
                align : 'center'
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
    return { columnsStatistics }
}