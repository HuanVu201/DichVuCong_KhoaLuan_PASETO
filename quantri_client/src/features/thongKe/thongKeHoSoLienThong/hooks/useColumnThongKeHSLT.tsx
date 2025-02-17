import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IThongKeHSLT } from '@/features/hoso/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { useHoSoTheoBaoCaoTongHopContext } from '@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext'
import { useBaoCaoTongHopContext } from '../../ThongKeTheoDonVi/context/BaoCaoTongHopContext'
import HoSoTheoBaoCaoLienThongWrapper from '@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeLienThong'
import { Link } from 'react-router-dom'
import { getCurrencyThongKe } from '@/utils'
import { ThongKeHSLTParams } from '@/features/hoso/services'

export const useColumnThongKeHSLT = (pagination: IBasePagination, searchParams: ThongKeHSLTParams) => {
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const handleLoadHoSo = (item: IThongKeHSLT, tieuChi: string) => {
        hoSoTheoBaoCaoTongHopContext.setThongKeHSLTModalVisible(true);
        if (tieuChi == 'LTKS') {
            hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoLienThong({
                pageNumber: 1,
                pageSize: 50,
                LoaiLienThong: 'LTKS',
                nopHoSoTuNgay: searchParams.tuNgay,
                nopHoSoDenNgay: searchParams.denNgay,
                Groupcode: item.groupCode

            });
        }
        else {
            hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoLienThong({
                pageNumber: 1,
                pageSize: 50,
                LoaiLienThong: 'LTKT',
                nopHoSoTuNgay: searchParams.tuNgay,
                nopHoSoDenNgay: searchParams.denNgay,
                Groupcode: item.groupCode
            });
        }

    };
    const columns = useMemo((): ColumnsType<IThongKeHSLT> => {
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
                title: <p style={{ textAlign: 'center' }}>Thủ tục hành chính công liên thông</p>,
                key: "key",
                children: [
                    {
                        title: 'Tổng số',
                        dataIndex: 'tongSoLuongHoSo',
                        key: 'tongSoLuongHoSo',
                        align: 'right'
                    },
                    {
                        title: 'Liên thông Đăng ký khai sinh - đăng ký thường trú - cấp thẻ bảo hiểm y tế cho trẻ dưới 6 tuổi',
                        dataIndex: 'soLuongHoSoKS',
                        key: 'soLuongHoSoKS',
                        align: 'right',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.soLuongHoSoKS != "0" ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, "LTKS")}
                                        >
                                            {getCurrencyThongKe(record.soLuongHoSoKS)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Liên thông Đăng ký khai tử - xóa đăng ký thường trú - trợ cấp mai táng phí',
                        dataIndex: 'soLuongHoSoKT',
                        key: 'soLuongHoSoKT',
                        align: 'right',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.soLuongHoSoKT != "0" ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, "LTKT")}
                                        >
                                            {getCurrencyThongKe(record.soLuongHoSoKT)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },

                    },
                ]
            },

        ]

    }, [pagination])

    return { columns }
}