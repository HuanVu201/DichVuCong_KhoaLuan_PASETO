import { useMemo } from 'react'
import { IGiaoDichThanhToan, ISearchGiaoDichThanhToan } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Button, Popconfirm, Space } from 'antd'
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { CheckConfirmGiaoDichThanhToan, DeleteGiaoDichThanhToan, SearchGiaoDichThanhToan } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useGiaoDichThanhToanContext } from '../contexts/GiaoDichThanhToanContext'
import { CheckGiaoDichThanhToanModal } from '../components/CheckGiaoDichThanhToanModal'
import { getCurrency } from '@/utils'
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'
export const useGdttColumn = ({ pagination, setSearchParams }: { pagination: IBasePagination, setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiaoDichThanhToan>> }) => {
    const dispatch = useAppDispatch()
    const giaoDichThanhToanContext = useGiaoDichThanhToanContext()
    const columns = useMemo((): ColumnsType<IGiaoDichThanhToan> => {
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
                title: "Thời gian GD",
                key: "thoiGianGD",
                align: "center",
                dataIndex: "thoiGianGD",
                render: (_, record) => (
                    <div style={{ textAlign: "center" }}>
                        {record?.thoiGianGD ? dayjs(record?.thoiGianGD).format(FORMAT_DATE) : ""}
                    </div>
                )
            },
            {
                title: "Hồ sơ",
                key: "hoSo",
                align: "center",
                dataIndex: "hoSo",
            },
            {
                title: "Mã tham chiếu",
                key: "maThamChieu",
                align: "center",
                dataIndex: "maThamChieu",
            },
            {
                title: "Số tiền (VNĐ)",
                key: "soTien",
                align: "center",
                render: (_, record) => (
                    <div style={{ textAlign: "right" }}>
                        {getCurrency(record.soTien)}
                    </div>
                )
            },
            {
                title: "Người nộp tiền biên lai",
                key: "nguoiNopTienBienLai",
                align: "center",
                dataIndex: "nguoiNopTienBienLai",
            },
            {
                title: "Địa chỉ biên lai",
                key: "diaChiBienLai",
                align: "center",
                dataIndex: "diaChiBienLai",
            },
            {
                title: "Mã số thuế người nộp tiền biên lai",
                key: "maSoThueBienLai",
                align: "center",
                dataIndex: "maSoThueBienLai",
            },
            {
                title: "Trạng thái",
                key: "trangThai",
                dataIndex: "trangThai",
                render: (_, record) => (
                    <div>
                        {record.trangThai == "khoi-tao" ? "Chờ xác nhận" : record.trangThai == "thanh-cong" ? "Thành công" : "Thất bại"}
                    </div>
                )
            },
            // {
            //     title: "Body kết quả",
            //     key: "responseDvcPayment",
            //     dataIndex: "responseDvcPayment",

            // },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        {
                            record.trangThai == "khoi-tao" && record.bodyKetQua && record?.bodyKetQua.indexOf("00") != -1 && (!record?.responseDvcPayment || record.responseDvcPayment.indexOf("CONFIRM") != -1) ?
                                <Button
                                    disabled={false}
                                    title='Kiểm tra trạng thái thanh toán trực tuyến'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        giaoDichThanhToanContext.setGiaoDichThanhToanId([record.id]);
                                        giaoDichThanhToanContext.setCheckGiaoDichThanhToanModalVisible(true);


                                    }}
                                >
                                    <CheckOutlined style={{ color: "" }} disabled={false} />
                                </Button>
                                //     <Popconfirm

                                //     title='Kiểm tra kết quả giao dịch trên cổng DVCQG?'
                                //     onConfirm={async () => {
                                //         var res = await dispatch(CheckConfirmGiaoDichThanhToan(record.id)).unwrap();
                                //         if(res.succeeded && res.data){
                                //             var result = res.data as any;
                                //             if(result.maLoi == "00")
                                //                 if(result.trangThaiGD == "1"){
                                //                     toast.success("Xác nhận thanh toán thành công");
                                //                     await dispatch(SearchGiaoDichThanhToan(pagination))
                                //                 }

                                //                 if(result.trangThaiGD == "3")
                                //                     toast.warning("Payment Platform chưa biết trạng thái cuối của GD");
                                //                 if(result.trangThaiGD == "4"){
                                //                     toast.error("Thanh toán thất bại")
                                //                     await dispatch(SearchGiaoDichThanhToan(pagination))
                                //                 }



                                //         }else{
                                //             toast.error("Không thể kiểm tra trạng thái giao dịch")
                                //         }
                                //         // setSearchParams(curr=>curr)


                                //         // if(res)
                                //         // if (action.payload.data && action.payload.data.maLoi == "00") toast.success("Thành công")
                                //         //     else toast.error(action.payload.data.moTaLoi)
                                //     } }

                                //     okText='Xác nhận'
                                //     cancelText='Huỷ'
                                // >
                                //     <CheckOutlined style={{color:""}}/>
                                // </Popconfirm>
                                : null
                        }

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}