import { ColumnsType } from "antd/es/table"
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models"
import { useMemo } from "react"
import { Popconfirm } from "antd"
import { DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons"
import { useKetQuaLienQuanContext } from "../contexts/KetQuaLienQuanProvider"
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { callApiAndDisplayFile } from "@/utils"
import { AntdSpace } from "@/lib/antd/components"


export const useColumn = ({searchParams}: {searchParams: ISearchKetQuaLienQuan}) => {
    const ketQuaLienQuanContext = useKetQuaLienQuanContext()
    const columns = useMemo((): ColumnsType<IKetQuaLienQuan> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Loại kết quả",
                key: "loaiKetQua",
                dataIndex: "loaiKetQua",
            },
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Người ký",
                key: "nguoiKy",
                dataIndex: "nguoiKy",
            },
            // {
            //     title: "Cơ quan ban hành",
            //     key: "coQuanBanHanh",
            //     dataIndex: "coQuanBanHanh",
            // },
            {
                title: "Ngày ký/ Hiệu lực",
                render(_, record){
                    return <>
                        <p>- Ngày ký: {record?.ngayKy ? dayjs(record.ngayKy).format(FORMAT_DATE_WITHOUT_TIME) : ""}</p>
                        <p>- Ngày có hiệu lực: {record?.ngayCoHieuLuc ? dayjs(record.ngayCoHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</p>
                        <p>- Ngày hết hiệu lực: {record?.ngayHetHieuLuc ? dayjs(record.ngayHetHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</p>
                    </>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return <>
                    {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) => 
                       <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                            <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)}/>
                        </AntdSpace>
                    )}
                    </>
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <AntdSpace direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            ketQuaLienQuanContext.setKetQuaLienQuanId(record.id)
                            ketQuaLienQuanContext.setKetQuaLienQuanModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                await ketQuaLienQuanContext.onDelete(record.id, searchParams)
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </AntdSpace>
                )
            }
        ]
    }, [])
    return columns;
}