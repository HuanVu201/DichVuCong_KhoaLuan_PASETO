import { IHoSo } from "@/features/hoso/models"
import { IKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { AntdButton, AntdSelect, UploadTable } from "@/lib/antd/components"
import { Checkbox, FormInstance, Input, InputNumber, Popconfirm, Select } from "antd"
import { ColumnsType } from "antd/es/table"
import { useCallback, useMemo, useTransition } from "react"
import { KetQuaThuTucChungThuc } from "../ThanhPhanHoSo"
import { MinusCircleOutlined, UploadOutlined } from "@ant-design/icons"
import { IDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/models"
import { filterOptions } from "@/utils"

export const useThanhPhanHoSos = ({ dataSource, setDataSource, form, danhMucGiayToChungThucs }: {danhMucGiayToChungThucs: IDanhMucGiayToChungThuc[] | undefined; dataSource: KetQuaThuTucChungThuc[], setDataSource: React.Dispatch<React.SetStateAction<KetQuaThuTucChungThuc[]>>, form: FormInstance<IHoSo> }) => {
    const [_, startTransition] = useTransition()
    const onRowChange = useCallback((value: any, index: number, colName: keyof KetQuaThuTucChungThuc) => {
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
    
    const columns = useMemo((): ColumnsType<KetQuaThuTucChungThuc> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                render: (_, record, idx) => {
                    return <Select style={{width:"100%"}} allowClear showSearch filterOption={filterOptions} onSelect={(value, option) => {
                        onRowChange(value, idx, "ma")
                        onRowChange(option["data-ten"], idx, "ten")
                    }}>
                        {danhMucGiayToChungThucs?.map((danhMuc, idx) => {
                            return <Select.Option key={idx} data-ten={danhMuc.ten} value={danhMuc.ma}>{danhMuc.ten}</Select.Option>
                        })}
                    </Select>
                }
            },
            {
                title: "Số trang",
                key: "soTrang",
                dataIndex: "soTrang",
                align: "center",
                render: (_, record, idx) => {
                    return <div style={{display:"flex" ,justifyContent: "center"}}><InputNumber min={1} defaultValue={record.soTrang ?? 0} onChange={(e) => onRowChange(e, idx, "soTrang")} /></div>
                }
            },
            {
                title: "Số bản giấy",
                key: "soBanGiay",
                dataIndex: "soBanGiay",
                align: "center",
                render: (_, record, idx) => {
                    return <div style={{display:"flex" ,justifyContent: "center"}}><InputNumber min={record.kyDienTuBanGiay ? 0 : 1} defaultValue={record.soBanGiay ?? 0} value={record.soBanGiay} onChange={(e) => onRowChange(e, idx, "soBanGiay")} /></div>
                }
            },
            {
                title: "Bản điện tử",
                key: "kyDienTuBanGiay",
                dataIndex: "kyDienTuBanGiay",
                align: "center",
                render: (_, record, idx) => {
                    return <div style={{display:"flex" ,justifyContent: "center"}}><Checkbox onChange={(e) => onRowChange(e.target.checked, idx, "kyDienTuBanGiay")} /></div>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    return <>
                        <UploadTable
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                            folderName={"ThemMoiHoSoChungChuc"}
                            colDinhKemName="dinhKem"
                            rowNumber={idx}
                            dinhKem={record.dinhKem}
                            accept="application/pdf"
                            extraElement={
                                <>
                                    <AntdButton icon={<UploadOutlined />}>Scan</AntdButton>
                                </>
                            }
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
                width: "10%",
                align: 'center',
                key: 'thaotac',
                render: (_, record, idx) => (
                    <Popconfirm
                        title='Xoá?'
                        onConfirm={() => {
                            setDataSource((curr) => curr.filter(x => x.id !== record.id))
                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <AntdButton > Xóa</AntdButton>
                        
                    </Popconfirm>
                )
            },
        ]
    }, [dataSource, form])
    return {columns}
}