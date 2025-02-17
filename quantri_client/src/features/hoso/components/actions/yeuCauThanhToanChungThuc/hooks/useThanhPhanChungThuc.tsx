
import { IHoSo } from "@/features/hoso/models"
import { IKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { AntdButton, AntdSelect, AntdSpace, UploadTable } from "@/lib/antd/components"
import { Checkbox, FormInstance, Input, InputNumber, Popconfirm, Space, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { IThanhPhanHoSo, THANHPHANHOSO_TRANGTHAIDUYET, THANHPHANHOSO_TRANGTHAIDUYET_TYPE } from "@/features/thanhphanhoso/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SoChungThucApi } from "@/features/sochungthuc/services"
import { ISoChungThuc } from "@/features/sochungthuc/models"
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"
import { toast } from "react-toastify"
import { GetHoSo } from "@/features/hoso/redux/action"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { TagProps } from "antd/lib"
import { DATE, MONTH, YEAR } from "@/data"
import { getCurrency, leading0 } from "@/utils"

export const useThanhPhanChungThuc = ({ dataSource, setDataSource, form, soChungThucs }: { soChungThucs: ISoChungThuc[] | undefined; dataSource: IThanhPhanHoSo[], setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSo[]>>, form: FormInstance<IHoSo> }) => {
    const [_, startTransition] = useTransition()
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext();

    // const {} = useKe({donVi: hoSo?.donViId})
    const onRowChange = useCallback((value: any, index: number, colName: keyof IThanhPhanHoSo) => {
        startTransition(() => {
            setDataSource((curr) => {
                const newDataSource = [...curr];
                return newDataSource.map((item, idx) => {
                    if (idx === index) {
                        // sau khi thay đổi thì kyDienTuBanGiay sẽ là false. và nếu soBanGiay là 0 thì mặc định nó lên 1 
                        if (colName == "kyDienTuBanGiay" && item.kyDienTuBanGiay == true && item.soBanGiay == 0) {
                            return { ...item, [colName]: value, "soBanGiay": 1 }
                        }
                        return { ...item, [colName]: value }
                    }
                    return item
                })
            })
        })
    }, [])
    const [soChungThucGiay, soChungThucDienTu] = useMemo(() => {
        return [soChungThucs?.find(x => x.loai == "Giấy"), soChungThucs?.find(x => x.loai == "Điện tử")]
    }, [soChungThucs])

    const columns = useMemo((): ColumnsType<IThanhPhanHoSo> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                width: "40%",
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
                    const color: TagProps["color"] = record.trangThaiDuyet == "Chưa ký" ? "red" : record.trangThaiDuyet == "Đã ký" ? "success" :"default" 
                    return <Tag color={color}>{record.trangThaiDuyet ? THANHPHANHOSO_TRANGTHAIDUYET[record.trangThaiDuyet] : ""}</Tag>
                }
            },
            {
                title: "Số chứng thực điện tử",
                key: "soChungThucDienTu",
                render: (_, record, idx) => {
                    return <>{record.soChungThucDienTu && record.soChungThucDT && soChungThucDienTu?.id == record.soChungThucDT ? <>
                        <p>{record.soChungThucDienTu}/ĐT</p>
                        <p>{soChungThucDienTu.tenSo}</p>
                    </> : ""}</>
                }
            },
            {
                title: "Số chứng thực giấy",
                key: "soChungThucGiay",
                render: (_, record, idx) => {
                    return <>{record.soChungThucGiay && record.soChungThucG && soChungThucGiay?.id == record.soChungThucG ? <>
                        <p>{record.soChungThucGiay}</p>
                        <p>{soChungThucGiay?.tenSo}</p>
                    </> : ""}</>
                }
            },
            {
                title: "Tổng tiền",
                key: "tongTien",
                render: (_, record, idx) => {
                    return <span>{"tongTien" in record ? getCurrency(record.tongTien as number, ".") : ""}</span>
                }
            },
            // {
            //     title: "Sổ chứng thực",
            //     key: "soChungThucDT",
            //     dataIndex: "soChungThucDT",
            //     render: (_, record, idx) => {
            //         const soChungThucOptions = soChungThucs?.filter(x => record.kyDienTuBanGiay == true ? x.loai == "Điện tử" : x.loai == "Giấy").map((soChungThuc) => {
            //             const title = `${soChungThuc.tenSo}`
            //             return {
            //                 label: <span title={title}>{title}</span>,
            //                 value: soChungThuc.id
            //             }
            //         })
            //         return <AntdSelect allowClear value={record.soChungThucDT} showSearch options={soChungThucOptions} style={{ width: "100%" }} onSelect={(value) => onRowChange(value, idx, "soChungThucDT")} />
            //     }
            // },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    return <>
                        <UploadTable
                            
                            hideUpload
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                            folderName={"ThemMoiHoSoChungChuc"}
                            colDinhKemName="dinhKem"
                            rowNumber={idx}
                            dinhKem={record.dinhKem}
                            onRemoveFile={(file: string) => {
                                const removeFiles: string[] = form.getFieldValue("removeFiles")
                                form.setFieldValue("removeFiles", [...removeFiles, file])
                            }}
                        />
                    </>
                }
            },
            // {
            //     title: "Thao tác",
            //     width: "10%",
            //     align: 'center',
            //     key: 'thaotac',
            //     render: (_, record, idx) => {
            //         const showBtnKyBanGiay = record.soBanGiay && record.soBanGiay > 0 && !record.soChungThucGiay;
            //         const showBtnKyBanDT = record.kyDienTuBanGiay && !record.soChungThucDienTu;
            //         return (
            //             <AntdSpace direction="vertical">
            //                 {showBtnKyBanDT ? <Popconfirm
            //                     title='Xác nhận cấp số bản điện tử'
            //                     onConfirm={async () => {
            //                         const res = await thanhPhanHoSoApi.CapSoVaDongDauChungThuc({
            //                             thanhPhanHoSos: {
            //                                 id: record.id,
            //                                 soChungThucDT: soChungThucDienTu?.id
            //                             }
            //                         })
            //                         if (res.data.succeeded) {
            //                             dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "kySoChungThuc" }))
            //                         }
            //                     }}
            //                     okText='Xác nhận'
            //                     cancelText='Huỷ'
            //                 >
            //                     <Tag color="success" role="button">Cấp số bản điện tử</Tag>
            //                 </Popconfirm> : null}
            //                 {showBtnKyBanGiay ? <Popconfirm
            //                     title='Xác nhận cấp số bản giấy'
            //                     onConfirm={async () => {
            //                         const res = await thanhPhanHoSoApi.CapSoVaDongDauChungThuc({
            //                             thanhPhanHoSos: {
            //                                 id: record.id,
            //                                 soChungThucG: soChungThucGiay?.id
            //                             }
            //                         })
            //                         if (res.data.succeeded) {
            //                             dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "kySoChungThuc" }))
            //                         }
            //                     }}
            //                     okText='Xác nhận'
            //                     cancelText='Huỷ'
            //                 >
            //                     <Tag color="magenta" role="button">Cấp số bản giấy</Tag>
            //                 </Popconfirm> : null}
            //             </AntdSpace>
            //         )
            //     }
            // },
        ]
    }, [dataSource, form])
    return { columns }
}