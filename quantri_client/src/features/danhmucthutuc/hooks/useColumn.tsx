import { useMemo } from 'react'
import { INguoiTiepNhanThuTuc } from '../../thutuc/models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, LinkOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { useThuTucContext } from '../../thutuc/contexts/ThuTucContext'
import { useSearchParams } from 'react-router-dom'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from '@/data'
import dayjs from 'dayjs'
import { MUCDO_THUTUC } from '@/features/thutuc/data'
import { AntdSpace } from '@/lib/antd/components'
import { callApiAndDisplayFile } from '@/utils'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const nguoiTiepNhanThuTucContext = useThuTucContext()

    const columns = useMemo((): ColumnsType<INguoiTiepNhanThuTuc> => {
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
                title: <p style={{ textAlign: 'center' }}>Mã TTHC</p>,
                key: "maTTHC",
                dataIndex: "maTTHC",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thủ tục</p>,
                key: "tenTTHC",
                width: "30%",
                dataIndex: "tenTTHC",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Cán bộ tiếp nhận</p>,
                key: "nguoiTiepNhan",
                dataIndex: "nguoiTiepNhan",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mức độ</p>,
                key: "mucDo",
                dataIndex: "mucDo",
                render: (_, record) => {
                    if (record.mucDo) return <>{MUCDO_THUTUC[record.mucDo]}</>;
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Quyết định công bố</p>,
                key: "mucDo",
                dataIndex: "mucDo",
                render: (_, record) => {
                    if (record.quyetDinhCongBo) {
                        try {
                            const data = JSON.parse(record.quyetDinhCongBo);
                            const soQuyetDinh = data.SOQUYETDINH;
                            const ngayQuyetDinh = data.NGAYQUYETDINH;

                            return <>
                                <p>- Số: {soQuyetDinh} </p>
                                <p>- Ngày: {dayjs(ngayQuyetDinh).format(FORMAT_DATE_WITHOUT_TIME)} </p>
                            </>;

                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                        }
                    } else {
                        return <></>
                    }


                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đính kèm quyết định</p>,
                key: "dinhKemQuyetDinh",
                dataIndex: "dinhKemQuyetDinh",
                render: (_, record) => {
                    return (
                        <>
                            {record.dinhKemQuyetDinh?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                    {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                                </AntdSpace>
                            )}
                        </>
                    )
                }
            },
            {
                title: "Sử dụng",
                key: "suDung",
                dataIndex: "suDung",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "5%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết thủ tục" onClick={() => {
                            nguoiTiepNhanThuTucContext.setThuTucId(record.id)
                            nguoiTiepNhanThuTucContext.setThuTucModalVisible(true)
                        }} />
                        <UnorderedListOutlined title='Xem danh sách trường hợp thủ tục' onClick={() => {
                            // console.log(record.id);
                            nguoiTiepNhanThuTucContext.setThuTucId(record.maTTHC)
                            nguoiTiepNhanThuTucContext.setMaThuTuc(record.id)
                            nguoiTiepNhanThuTucContext.setTruongHopThuTucModalVisible(true)
                        }} />
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}