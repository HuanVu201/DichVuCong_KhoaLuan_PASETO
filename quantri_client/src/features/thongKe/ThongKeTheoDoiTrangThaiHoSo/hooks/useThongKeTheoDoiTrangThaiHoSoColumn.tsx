import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IThongKeHSLT, IThongKeTheoDoiTrangThaiXuLyHS } from '@/features/hoso/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { ThongKeHSLTParams } from '@/features/hoso/services'
import { useHoSoTheoBaoCaoTongHopContext } from '@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext'
import { useBaoCaoTongHopContext } from '../../ThongKeTheoDonVi/context/BaoCaoTongHopContext'
import { Link } from 'react-router-dom'
import { getCurrencyThongKe } from '@/utils'
import dayjs from "dayjs";


export const useThongKeTheoDoiTrangThaiHSColumn = (pagination: IBasePagination, searchParams: ThongKeHSLTParams) => {
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const handleLoadHoSo = (item: any, tieuChi?: string) => {
        hoSoTheoBaoCaoTongHopContext.setThongKeTheoDoiTrangThaiHoSoModalVisible(true);
        hoSoTheoBaoCaoTongHopContext.setsearchThongKeTheoDoiTrangThaiHS({
            pageNumber: 1,
            pageSize: 100,
            Groupcode: item.groupCode,
            tiepNhanFrom: dayjs(searchParams.tiepNhanTuNgay).format('YYYY-MM-DD'),
            tiepNhanTo: dayjs(searchParams.tiepNhanDenNgay).format('YYYY-MM-DD'),
            nopHoSoTuNgay: searchParams.nopHoSoTuNgay,
            nopHoSoDenNgay: searchParams.nopHoSoDenNgay,
            KenhThucHien: searchParams.kenhThucHien,
            hienThiTrangThaiThanhToan: true,
            searchAllType : true,
            trangThaiTheoDoiHoSo: tieuChi
        });
    };
    const columns = useMemo((): ColumnsType<IThongKeTheoDoiTrangThaiXuLyHS> => {
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
                title: <p style={{ textAlign: 'center' }}>Đơn vị</p>,
                key: "groupName",
                dataIndex: "groupName",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mới đăng ký</p>,
                key: "moiDangKy",
                children: [
                    {
                        title: 'Chờ tiếp nhận',
                        dataIndex: 'choTiepNhan',
                        key: 'choTiepNhan',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choTiepNhan ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-tiep-nhan-khong-co-trang-thai-thu-phi')}
                                        >
                                            {getCurrencyThongKe(record.choTiepNhan)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Đủ điều kiện đã nộp phí, chờ tiếp nhận',
                        dataIndex: 'duDieuKienDaNopPhiChoTiepNhan',
                        key: 'duDieuKienDaNopPhiChoTiepNhan',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.duDieuKienDaNopPhiChoTiepNhan ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'du-dieu-kien-da-nop-phi-cho-tiep-nhan')}
                                        >
                                            {getCurrencyThongKe(record.duDieuKienDaNopPhiChoTiepNhan)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Đủ điều kiện chưa nộp phí, chờ tiếp nhận',
                        dataIndex: 'duDieuKienChuaNopPhiChoTiepNhan',
                        key: 'duDieuKienChuaNopPhiChoTiepNhan',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.duDieuKienChuaNopPhiChoTiepNhan ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'du-dieu-kien-chua-nop-phi-cho-tiep-nhan')}
                                        >
                                            {getCurrencyThongKe(record.duDieuKienChuaNopPhiChoTiepNhan)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                ]
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đã tiếp nhận</p>,
                key: "moiDangKy",
                children: [
                    {
                        title: 'Mới tiếp nhận',
                        dataIndex: 'moiTiepNhan',
                        key: 'moiTiepNhan',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.moiTiepNhan ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'moi-tiep-nhan')}
                                        >
                                            {getCurrencyThongKe(record.moiTiepNhan)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Đang xử lý',
                        dataIndex: 'dangXuLy',
                        key: 'dangXuLy',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.dangXuLy ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'dang-xu-ly')}
                                        >
                                            {getCurrencyThongKe(record.dangXuLy)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },

                    },
                    {
                        title: 'Dừng xử lý',
                        dataIndex: 'dungXuLy',
                        key: 'dungXuLy',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.dungXuLy ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'dung-xu-ly')}
                                        >
                                            {getCurrencyThongKe(record.dungXuLy)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Chờ thực hiện nghĩa vụ tài chính',
                        dataIndex: 'choThucHienNghiaVuTaiChinh',
                        key: 'choThucHienNghiaVuTaiChinh',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choThucHienNghiaVuTaiChinh ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-thuc-hien-nghia-vu-tai-chinh')}
                                        >
                                            {getCurrencyThongKe(record.choThucHienNghiaVuTaiChinh)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Chờ bổ sung',
                        dataIndex: 'choBoSung',
                        key: 'choBoSung',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choBoSung ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-bo-sung')}
                                        >
                                            {getCurrencyThongKe(record.choBoSung)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                ]
            },
            {
                title: <p style={{ textAlign: 'center' }}>Có kết quả</p>,
                key: "coKetQua",
                children: [
                    {
                        title: 'Chờ xác nhận kết quả',
                        dataIndex: 'choXacNhanKetQua',
                        key: 'choXacNhanKetQua',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choXacNhanKetQua ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-xac-nhan-ket-qua')}
                                        >
                                            {getCurrencyThongKe(record.choXacNhanKetQua)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Chờ xác nhận bổ sung',
                        dataIndex: 'choXacNhanBoSung',
                        key: 'choXacNhanBoSung',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choXacNhanBoSung ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-xac-nhan-bo-sung')}
                                        >
                                            {getCurrencyThongKe(record.choXacNhanBoSung)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },

                    },
                    {
                        title: 'Chờ xác nhận trả lại',
                        dataIndex: 'choXacNhanTraLai',
                        key: 'choXacNhanTraLai',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choXacNhanTraLai ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-xac-nhan-tra-lai')}
                                        >
                                            {getCurrencyThongKe(record.choXacNhanTraLai)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: 'Chờ trả',
                        dataIndex: 'choTra',
                        key: 'choTra',
                        align: 'center',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.choTra ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, 'cho-tra')}
                                        >
                                            {getCurrencyThongKe(record.choTra)}
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