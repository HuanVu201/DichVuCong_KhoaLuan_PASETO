                        
import { IHoSo } from "@/features/hoso/models"
import { IKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { AntdButton, AntdSelect, UploadTable } from "@/lib/antd/components"
import { Checkbox, FormInstance, Input, InputNumber, Popconfirm, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { useCallback, useMemo, useTransition } from "react"
import { MinusCircleOutlined, UploadOutlined } from "@ant-design/icons"
import { IThanhPhanHoSo,THANHPHANHOSO_TRANGTHAIDUYET, THANHPHANHOSO_TRANGTHAIDUYET_TYPE } from "@/features/thanhphanhoso/models"
import { addPagePDF } from "@/utils"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useUploadTable } from "@/lib/antd/components/upload/hooks/useUploadTable"
import { btnSignClick } from "@/utils/common"

export const useThanhPhanChungThuc = ({ dataSource, setDataSource, form }: { dataSource: IThanhPhanHoSo[], setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSo[]>>, form: FormInstance<IHoSo> }) => {
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const [_, startTransition] = useTransition()
    const onRowChange = useCallback((value: any, index: number, colName: keyof IThanhPhanHoSo) => {
        startTransition(() => {
            setDataSource((curr) => {
                const newDataSource = [...curr];
                return newDataSource.map((item, idx) => {
                    if (idx === index) {
                        // sau khi thay đổi thì kyDienTuBanGiay sẽ là false. và nếu soBanGiay là 0 thì mặc định nó lên 1 
                        if(colName == "kyDienTuBanGiay" && item.kyDienTuBanGiay == true && item.soBanGiay == 0){ 
                            return {...item, [colName]: value, "soBanGiay": 1}
                        }
                        return { ...item, [colName]: value}
                    }
                    return item
                })
            })
        })
    }, [])

    const { onChangeDinhKemTable } = useUploadTable<IThanhPhanHoSo>({
        folderName: hoSo?.maHoSo,
        setDataSource,
        colDinhKemName: "dinhKem",
        rowNumber: -1,
      });
    
    const columns = useMemo((): ColumnsType<IThanhPhanHoSo> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Số trang/Số bản giấy",
                key: "soTrang",
                dataIndex: "soTrang",
                render: (_, record) => {
                    return <>{record.soTrang} / {record.soBanGiay}</>
                }
            },
            {
                title: "Bản điện tử",
                key: "kyDienTuBanGiay",
                dataIndex: "kyDienTuBanGiay",
                render: (_, record, idx) => {
                    return <Tag color={record.kyDienTuBanGiay ? "success" : "magenta"}>{record.kyDienTuBanGiay ? "Có" : "Không"}</Tag>
                }
            },
            {
                title: "Trạng thái duyệt",
                key: "trangThaiDuyet",
                dataIndex: "trangThaiDuyet",
                render: (_, record, idx) => {
                    return <AntdSelect 
                    onChange={(value) => onRowChange(value, idx, "trangThaiDuyet")} 
                    options={[{label:"Đã ký", value:"Đã ký"}, {label:"Chưa ký", value:"Chưa ký"}]}
                     defaultValue={THANHPHANHOSO_TRANGTHAIDUYET["Chưa ký"]} style={{width: "100%"}} value={record.trangThaiDuyet}/>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    return <>
                        <UploadTable
                            // kySoToken
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                            folderName={"ThemMoiHoSoChungChuc"}
                            colDinhKemName="dinhKem"
                            rowNumber={idx}
                            maxCount={1}
                            dinhKem={record.dinhKem}
                            // extraElement={
                            //     <>
                            //         <AntdButton icon={<UploadOutlined />}>Scan</AntdButton>
                            //     </>
                            // }
                            onRemoveFile={(file: string) => {
                                const removeFiles: string[] = form.getFieldValue("removeFiles")
                                form.setFieldValue("removeFiles", [...removeFiles, file])
                            }}
                        />
                    </>
                }
            },
            {
                title: "Thao tác",
                key:"ThaoTac",
                render: (_, record, idx) => {
                    return <AntdButton onClick={async () => {
                        await btnSignClick(record.dinhKem, hoSo?.maHoSo ?? "KySoChungThuc", (urlFileSigned, oldFileUrl) => {
                            onChangeDinhKemTable(urlFileSigned, oldFileUrl, "override", idx)
                            onRowChange("Đã ký", idx, "trangThaiDuyet")
                        }, 
                        async (fileName: string) => await addPagePDF(fileName))
                    }}>Ký số</AntdButton>
                }
            }
        ]
    }, [dataSource, form])
    return {columns}
}