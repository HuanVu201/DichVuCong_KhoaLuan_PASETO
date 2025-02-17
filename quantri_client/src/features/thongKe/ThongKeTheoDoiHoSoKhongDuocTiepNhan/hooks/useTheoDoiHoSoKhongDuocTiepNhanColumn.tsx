import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ITheoDoiHoSoKhongDuocTiepNhan, IThongKeHoSoTrongNgay, IThongKeHSLT } from '@/features/hoso/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { useHoSoTheoBaoCaoTongHopContext } from '@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext'
import { useBaoCaoTongHopContext } from '../../ThongKeTheoDonVi/context/BaoCaoTongHopContext'
import HoSoTheoBaoCaoLienThongWrapper from '@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeLienThong'
import { Link } from 'react-router-dom'
import { getCurrencyThongKe } from '@/utils'
import { ThongKeHSLTParams } from '@/features/hoso/services'

export const useTheoDoiHoSoKhongDuocTiepNhanColumn = (pagination: IBasePagination, searchParams: ThongKeHSLTParams) => {
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const handleLoadHoSo = (item: ITheoDoiHoSoKhongDuocTiepNhan, tieuChi: string) => {
        hoSoTheoBaoCaoTongHopContext.setTheoDoiHoSoKhongDuocTiepNhanModalVisible(true);
        hoSoTheoBaoCaoTongHopContext.setSearchTheoDoiHoSoKhongDuocTiepNhan({
            pageNumber: 1,
            pageSize: 50,
            Groupcode: item.groupCode,
            nopHoSoTuNgay: searchParams.nopHoSoTuNgay,
            nopHoSoDenNgay: searchParams.nopHoSoDenNgay,
            searchAllType: true,
            trangThaiHoSoId: '3'
        });


    };
    const columns = useMemo((): ColumnsType<ITheoDoiHoSoKhongDuocTiepNhan> => {
        return [
            {
                title: "STT",
                width:"5%",
                key: 'STT',
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
              },
            {
                title: <p style={{ textAlign: 'center' }}>Tên đơn vị xử lý</p>,
                key: "groupName",
                dataIndex: "groupName",
                width: 400
            },
            {
                title: <p style={{ textAlign: 'center' }}>Hồ sơ không được tiếp nhận</p>,
                key: "hoSoKhongDuocTiepNhan",
                dataIndex: "hoSoKhongDuocTiepNhan",
                align: 'center',
                render(value, record, index) {
                    return (
                        <>
                            {record.hoSoKhongDuocTiepNhan != "0" ?
                                <Link
                                    to=""
                                    onClick={() => handleLoadHoSo(record, 'dang-xu-ly')}
                                >
                                    {getCurrencyThongKe(record.hoSoKhongDuocTiepNhan)}
                                </Link> : '0'
                            }
                        </>
                    )
                },
            },
        ]

    }, [pagination])

    return { columns }
}