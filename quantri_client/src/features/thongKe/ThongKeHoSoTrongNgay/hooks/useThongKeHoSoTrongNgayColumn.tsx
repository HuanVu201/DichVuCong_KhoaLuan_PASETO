import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IThongKeHoSoTrongNgay, IThongKeHSLT } from '@/features/hoso/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { useHoSoTheoBaoCaoTongHopContext } from '@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext'
import { useBaoCaoTongHopContext } from '../../ThongKeTheoDonVi/context/BaoCaoTongHopContext'
import HoSoTheoBaoCaoLienThongWrapper from '@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeLienThong'
import { Link } from 'react-router-dom'
import { getCurrencyThongKe } from '@/utils'

export const useColumnThongKeHoSoTrongNgay = (pagination: IBasePagination) => {
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const handleLoadHoSo = (item: IThongKeHoSoTrongNgay, tieuChi: string) => {
        hoSoTheoBaoCaoTongHopContext.setThongKeHoSoTrongNgayModalVisible(true);
        hoSoTheoBaoCaoTongHopContext.setSearchThongKeHoSoTrongNgay({
            pageNumber: 1,
            pageSize: 50,
            Groupcode: item.groupCode,
            searchAllType: true,
            tieuChiThongKeHoSoTrongNgay: tieuChi,
            hienThiTrangThaiThanhToanBaoGomNgayThuPhi: true,
            hienThiTrangThaiThanhToan : false
        });


    };
    const columns = useMemo((): ColumnsType<IThongKeHoSoTrongNgay> => {
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
                title: <p style={{ textAlign: 'center' }}>Tiếp nhận trong ngày</p>,
                key: "tiepNhanTrongNgay",
                dataIndex: "tiepNhanTrongNgay",
                align : 'right',
                children : [
                    {
                        title: <p style={{ textAlign: 'center' }}>Trực tiếp</p>,
                        dataIndex: 'tiepNhanTrucTiepTrongNgay',
                        key: 'tiepNhanTrucTiepTrongNgay',
                        align: 'right',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.tiepNhanTrucTiepTrongNgay ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, "tiep-nhan-truc-tiep-trong-ngay")}
                                        >
                                            {getCurrencyThongKe(record.tiepNhanTrucTiepTrongNgay)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: <p style={{ textAlign: 'center' }}>Trực tuyến</p>,
                        dataIndex: 'tiepNhanTrucTuyenTrongNgay',
                        key: 'tiepNhanTrucTuyenTrongNgay',
                        align: 'right',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.tiepNhanTrucTuyenTrongNgay ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, "tiep-nhan-truc-tuyen-trong-ngay")}
                                        >
                                            {getCurrencyThongKe(record.tiepNhanTrucTuyenTrongNgay)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                    {
                        title: <p style={{ textAlign: 'center' }}>Qua BCCI</p>,
                        dataIndex: 'tiepNhanBCCITrongNgay',
                        key: 'tiepNhanBCCITrongNgay',
                        align: 'right',
                        render(value, record, index) {
                            return (
                                <>
                                    {record.tiepNhanBCCITrongNgay ?
                                        <Link
                                            to=""
                                            onClick={() => handleLoadHoSo(record, "tiep-nhan-qua-bcci-trong-ngay")}
                                        >
                                            {getCurrencyThongKe(record.tiepNhanBCCITrongNgay)}
                                        </Link> : '0'
                                    }
                                </>
                            )
                        },
                    },
                ],
            },
            {
                title: <p style={{ textAlign: 'center' }}>Có kết quả trong ngày</p>,
                key: "coKetQuaTrongNgay",
                dataIndex: "coKetQuaTrongNgay",
                align : 'right',
                render(value, record, index) {
                    return (
                        <>
                            {record.coKetQuaTrongNgay ?
                                <Link
                                    to=""
                                    onClick={() => handleLoadHoSo(record, "co-ket-qua-trong-ngay")}
                                >
                                    {getCurrencyThongKe(record.coKetQuaTrongNgay)}
                                </Link> : '0'
                            }
                        </>
                    )
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đã trả công dân trong ngày</p>,
                key: "daTraCongDanTrongNgay",
                dataIndex: "daTraCongDanTrongNgay",
                align : 'right',
                render(value, record, index) {
                    return (
                        <>
                            {record.daTraCongDanTrongNgay ?
                                <Link
                                    to=""
                                    onClick={() => handleLoadHoSo(record, "da-tra-cong-dan-trong-ngay")}
                                >
                                    {getCurrencyThongKe(record.daTraCongDanTrongNgay)}
                                </Link> : '0'
                            }
                        </>
                    )
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thu phí, lệ phí trong ngày</p>,
                key: "thuPhiLePhiTrongNgay",
                dataIndex: "thuPhiLePhiTrongNgay",
                align : 'right',
                render(value, record, index) {
                    return (
                        <>
                            {record.thuPhiLePhiTrongNgay ?
                                <Link
                                    to=""
                                    onClick={() => handleLoadHoSo(record, "thu-phi-le-phi-trong-ngay")}
                                >
                                    {getCurrencyThongKe(record.thuPhiLePhiTrongNgay)}
                                </Link> : '0'
                            }
                        </>
                    )
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Yêu cầu bổ sung trong ngày</p>,
                key: "yeuCauBoSungTrongNgay",
                dataIndex: "yeuCauBoSungTrongNgay",
                align : 'right',
                render(value, record, index) {
                    return (
                        <>
                            {record.yeuCauBoSungTrongNgay ?
                                <Link
                                    to=""
                                    onClick={() => handleLoadHoSo(record, "yeu-cau-bo-sung-trong-ngay")}
                                >
                                    {getCurrencyThongKe(record.yeuCauBoSungTrongNgay)}
                                </Link> : '0'
                            }
                        </>
                    )
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Yêu cầu trả lại, xin rút trong ngày</p>,
                key: "yeuCauTraLaiXinRutTrongNgay",
                dataIndex: "yeuCauTraLaiXinRutTrongNgay",
                align : 'right',
                render(value, record, index) {
                    return (
                        <>
                            {record.yeuCauTraLaiXinRutTrongNgay ?
                                <Link
                                    to=""
                                    onClick={() => handleLoadHoSo(record, "yeu-cau-tra-lai-xin-rut-trong-ngay")}
                                >
                                    {getCurrencyThongKe(record.yeuCauTraLaiXinRutTrongNgay)}
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