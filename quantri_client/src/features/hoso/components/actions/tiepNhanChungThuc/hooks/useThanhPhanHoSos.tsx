import { IHoSo } from "@/features/hoso/models"
import { IKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { AntdButton, AntdSelect, UploadTable } from "@/lib/antd/components"
import { Checkbox, FormInstance, Input, InputNumber, Popconfirm, Select } from "antd"
import { ColumnsType } from "antd/es/table"
import { useCallback, useMemo, useTransition } from "react"
import { IDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/models"
import { filterOptions, filterOptionsChungThuc, getCurrency } from "@/utils"
import { KetQuaThuTucChungThuc } from "../ThanhPhanHoSo"
import { tinhTongTien } from "../../yeuCauThanhToanChungThuc/ultis"
import { IBasePagination } from "@/models"

export const useThanhPhanHoSos = ({ dataSource, setDataSource, form, danhMucGiayToChungThucs, useKySoNEAC, pagination }: {pagination: IBasePagination; useKySoNEAC?: boolean, danhMucGiayToChungThucs: IDanhMucGiayToChungThuc[] | undefined; dataSource: KetQuaThuTucChungThuc[], setDataSource: React.Dispatch<React.SetStateAction<KetQuaThuTucChungThuc[]>>, form: FormInstance<IHoSo> }) => {
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
    const onRowChangeWithoutTransition = useCallback((value: any, index: number, colName: keyof KetQuaThuTucChungThuc) => {
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
    }, [])
    
    const columns = useMemo((): ColumnsType<KetQuaThuTucChungThuc> => {
        const pageNumber = pagination.pageNumber ?? 1
        const pageSize = pagination.pageSize ?? 10
        return [
            {
                title: <>Loại giấy tờ <span style={{color:"red"}}>*</span></>,
                key: "maGiayTo",
                dataIndex: "maGiayTo",
                render: (_, record, idx) => {
                    const page = (pageNumber - 1) * pageSize + idx
                    
                    return <Select style={{width:"100%"}} defaultValue={record.maGiayTo} showSearch filterOption={filterOptionsChungThuc} onSelect={(value, option) => {
                        onRowChange(value, page, "maGiayTo")
                        onRowChange(option["data-ten"], page, "ten")
                    }}>
                        {danhMucGiayToChungThucs?.map((danhMuc, idx) => {
                            return <Select.Option key={idx} data-ten={danhMuc.ten} value={danhMuc.ma}>{danhMuc.ten}</Select.Option>
                        })}
                    </Select>
                }
            },
            {
                title: <>Mô tả/nội dung giấy tờ <span style={{color:"red"}}>*</span></>,
                key: "ten",
                dataIndex: "ten",
                render: (_, record, idx) => {
                    const page = (pageNumber - 1) * pageSize + idx
                    return <Input onChange={(e) => onRowChangeWithoutTransition(e.target.value, page, "ten")} value={record.ten}></Input>
                }
            },
            {
                title: "Số trang",
                key: "soTrang",
                dataIndex: "soTrang",
                align: "center",
                render: (_, record, idx) => {
                    const page = (pageNumber - 1) * pageSize + idx
                    return <div style={{display:"flex" ,justifyContent: "center"}}><InputNumber min={1} defaultValue={record.soTrang ?? 0} onChange={(e) => onRowChange(e, page, "soTrang")} /></div>
                }
            },
            {
                title: "Số bản giấy",
                key: "soBanGiay",
                dataIndex: "soBanGiay",
                align: "center",
                render: (_, record, idx) => {
                    const page = (pageNumber - 1) * pageSize + idx
                    return <div style={{display:"flex" ,justifyContent: "center"}}><InputNumber min={record.kyDienTuBanGiay ? 0 : 1} defaultValue={record.soBanGiay ?? 0} value={record.soBanGiay} onChange={(e) => onRowChange(e != null ? e : record.soBanGiay, page, "soBanGiay")} /></div>
                }
            },
            {
                title: "Bản điện tử",
                key: "kyDienTuBanGiay",
                dataIndex: "kyDienTuBanGiay",
                align: "center",
                render: (_, record, idx) => {
                    const page = (pageNumber - 1) * pageSize + idx
                    return <div style={{display:"flex" ,justifyContent: "center"}}><Checkbox defaultChecked={record.kyDienTuBanGiay} onChange={(e) => onRowChange(e.target.checked, page, "kyDienTuBanGiay")} /></div>
                }
            },
            {
                title: "Số tiền",
                key: "soTien",
                align: "center",
                render: (_, record, idx) => {
                    if(record){
                        return <div>{getCurrency(tinhTongTien([record]), '.')}</div>
                    }
                    return <></>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    const page = (pageNumber - 1) * pageSize + idx
                    return <>
                        <UploadTable
                            kySoToken
                            kySoNEAC={useKySoNEAC}
                            maxCount={1}
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                            folderName={"ThemMoiHoSoChungChuc"}
                            colDinhKemName="dinhKem"
                            rowNumber={page}
                            dinhKem={record.dinhKem}
                            accept="application/pdf"
                            scanPC={true}
                            onRemoveFile={(file: string) => {
                                // const removeFiles: string[] = form.getFieldValue("removeFiles") || []
                                // console.log(file);
                                // console.log(removeFiles);
                                
                                // form.setFieldValue("removeFiles", [...removeFiles, file])
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
                            const currDeletedIds: string[] = form.getFieldValue(
                                "deletedThanhPhanIds"
                              );
                              form.setFieldValue("deletedThanhPhanIds", [
                                ...currDeletedIds,
                                record.id,
                              ]);
                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <AntdButton > Xóa</AntdButton>
                        
                    </Popconfirm>
                )
            },
        ]
    }, [dataSource, form, pagination])
    return {columns}
}