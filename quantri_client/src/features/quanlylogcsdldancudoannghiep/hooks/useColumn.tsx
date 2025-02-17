import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useLogCSDLDanCuDoanhNghiepContext } from '../context/LogCSDLDanCuDoanhNghiepContext'
import { ILogCSDLDanCuDoanhNghiep } from '../models'
import { DeleteLogCSDLDanCuDoanhNghiep } from '../redux/action'
import { formatDateStringToDate } from '@/lib/antd/components/upload/ultis' // Import format từ date-fns
import dayjs from 'dayjs';
import {
    FORMAT_DATE,
    FORMAT_DATE_WITHOUT_SECOND,
    FORMAT_DATE_WITHOUT_TIME,
  } from "@/data";

  export const dateSorter = (a: ILogCSDLDanCuDoanhNghiep, b: ILogCSDLDanCuDoanhNghiep, order: 'ascend' | 'descend') => {
    const dateA = a.thoiGian ? dayjs(a.thoiGian, FORMAT_DATE_WITHOUT_SECOND).valueOf() : 0;
    const dateB = b.thoiGian ? dayjs(b.thoiGian, FORMAT_DATE_WITHOUT_SECOND).valueOf() : 0;
    return order === 'ascend' ? dateA - dateB : dateB - dateA;
  }

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const LogCSDLDanCuDoanhNghiepContext = useLogCSDLDanCuDoanhNghiepContext()
    const columns = useMemo(() : ColumnsType<ILogCSDLDanCuDoanhNghiep> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                  },
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
                render: (text) => {
                    // Định dạng ngày theo kiểu 'dd/MM/yyyy'
                    return dayjs(text).format(FORMAT_DATE_WITHOUT_SECOND).toString();
                },
                sorter: (a, b) => dateSorter(a, b, 'ascend'), // Sử dụng hàm sắp xếp
            },
            {
                title: "Loại",
                key: "loai",
                dataIndex: "loai",
            },
            {
                title: "Đơn vị",
                key: "groupName",
                dataIndex: "groupName",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            LogCSDLDanCuDoanhNghiepContext.setLogCSDLDanCuDoanhNghiepId(record.id)
                            LogCSDLDanCuDoanhNghiepContext.setLogCSDLDanCuDoanhNghiepModalVisible(true)
                        }} />
                        {/* <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteLogCSDLDanCuDoanhNghiep({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm> */}
                    </Space>
                )
            }
        ]
    }, [pagination])
    return {columns}
}