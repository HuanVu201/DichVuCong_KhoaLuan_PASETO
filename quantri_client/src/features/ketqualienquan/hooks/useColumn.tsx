import { ColumnsType } from "antd/es/table"
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models"
import { useMemo } from "react"
import { Popconfirm, Tag } from "antd"
import { DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons"
import { useKetQuaLienQuanContext } from "../contexts/KetQuaLienQuanProvider"
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { callApiAndDisplayFile } from "@/utils"
import { AntdSpace } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks"


export const useColumn = ({ searchParams, readOnlyMode }: { searchParams: ISearchKetQuaLienQuan; readOnlyMode?: boolean }) => {
    const ketQuaLienQuanContext = useKetQuaLienQuanContext()
    const { data: user } = useAppSelector((state) => state.user);

    const columns = useMemo((): ColumnsType<IKetQuaLienQuan> => {
        const column: ColumnsType<IKetQuaLienQuan> = [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = searchParams.pageNumber ?? 1
                  const pageSize = searchParams.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
              },
            {
                title: <p style={{ textAlign: 'center' }}>Cơ quan ban hành</p>,
                key: "coQuanBanHanh",
                dataIndex: "coQuanBanHanh",
            },
            // {
            //     title: "Loại kết quả",
            //     key: "loaiKetQua",
            //     dataIndex: "loaiKetQua",
            // },
            {
                title: <p style={{ textAlign: 'center' }}>Số ký hiệu</p>,
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Trích yếu</p>,
                key: "trichYeu",
                dataIndex: "trichYeu",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Người ký</p>,
                key: "nguoiKy",
                dataIndex: "nguoiKy",
            },
            // {
            //     title: "Cơ quan ban hành",
            //     key: "coQuanBanHanh",
            //     dataIndex: "coQuanBanHanh",
            // },
            {
                title: <p style={{ textAlign: 'center' }}>Ngày ký/ Hiệu lực</p>,
                render(_, record) {
                    return <>
                        {record?.ngayKy ? <p>- Ngày ký: {dayjs(record.ngayKy).format(FORMAT_DATE_WITHOUT_TIME)}</p> : ""}
                        {record?.ngayCoHieuLuc ? <p>- Ngày có hiệu lực: {dayjs(record.ngayCoHieuLuc).format(FORMAT_DATE_WITHOUT_TIME)} </p> : ""}
                        {record?.ngayHetHieuLuc ? <p>- Ngày hết hiệu lực: {dayjs(record.ngayHetHieuLuc).format(FORMAT_DATE_WITHOUT_TIME)}</p> : ""}
                    </>
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đính kèm</p>,
                key: "dinhKem",
                dataIndex: "dinhKem",
                align: 'center',
                render: (_, record) => {
                    if (!record.dinhKem) {
                        return <></>
                    }
                    return <>
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                            </AntdSpace>
                        )}
                    </>
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: 'thaoTac',
                render: (_, record) => {
                    return (
                        <AntdSpace direction="horizontal">
                            <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                                ketQuaLienQuanContext.setKetQuaLienQuanId(record.id)
                                ketQuaLienQuanContext.setKetQuaLienQuanModalVisible(true)
                            }} />

                            {record.createdBy?.toLocaleLowerCase() !== user?.id.toLocaleLowerCase() ? null :
                                <Popconfirm
                                    title='Xoá?'
                                    onConfirm={async () => {
                                        await ketQuaLienQuanContext.onDelete(record.id, searchParams)
                                    }}
                                    okText='Xoá'
                                    cancelText='Huỷ'
                                >
                                    <DeleteOutlined style={{ color: "tomato" }} />
                                </Popconfirm>
                            }

                        </AntdSpace>
                    )
                }
            }
        ]
        if (readOnlyMode)
            return column.filter(x => x.key != "thaoTac")
        return column
    }, [])

    return columns;
}