import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { UploadAntdTableProps } from "../UploadTable"
import { ID_SEPARATE } from "@/data"
import { AntdSpace } from "../.."
import { DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons"
import { callApiAndDisplayFile, getFileName } from "@/utils"
import { Popconfirm } from "antd"
import { SignSignature, btnSignClick } from "@/utils/common"
import { NeacModal } from "../modals/NeacModal"
import { fileApi } from "@/features/file/services"
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange"

export type useUploadTableType<IModel> = Pick<UploadAntdTableProps<IModel>, "folderName" | "kySoToken" | "kySoNEAC" | "dinhKem" | "setDataSource" | "colDinhKemName" | "rowNumber" | "hideUpload" | "hideKySoWith" | "onCleanSoHoa" | "onRemoveFile"> & {
    customSignature?: SignSignature[];
    customGetFileSignature?: (fileName: string) => Promise<any>
}
export const useUploadTable = <IModel,>(props: useUploadTableType<IModel>) => {
    const { folderName, kySoToken, customGetFileSignature, customSignature, kySoNEAC, dinhKem, setDataSource, colDinhKemName, rowNumber, hideUpload, hideKySoWith, onCleanSoHoa, onRemoveFile } = props
    // thêm sửa xóa trường dinhKem trên row của dataSource.
    const [_, startTransition] = useTransition()
    const [neacVisible, setNeacVisible] = useState(false)
    const { isMobile } = useWindowSizeChange()

    const onChangeDinhKemTable = useCallback((fileName: string, oldFile?: string, flag: "override" | "remove" | "add" | "replace" = "add", overideRowNumber: number = rowNumber) => {
        startTransition(() => {
            setDataSource ?
                setDataSource((curr) => {
                    const newDataSource = [...curr];
                    return newDataSource.map((item, idx) => {
                        const rowIdx = overideRowNumber !== rowNumber ? overideRowNumber : rowNumber // dùng để tránh gọi useUploadTable bên trong 1 hàm do cần truyền động index
                        if (idx === rowIdx) {
                            const dinhKem = (item[colDinhKemName] as string) || ""
                            const fileAlreadyExists = dinhKem && dinhKem?.includes(fileName)
                            if (flag == "add") {
                                const newValues = dinhKem ? dinhKem + ID_SEPARATE + fileName : fileName
                                return { ...item, [colDinhKemName]: fileAlreadyExists ? dinhKem : newValues }
                            } else if (flag == "override" && oldFile != undefined) {
                                return { ...item, [colDinhKemName]: dinhKem ? dinhKem?.replace(oldFile, fileName) : fileName }
                            } else if (flag == "remove") {
                                const oldDinhKem = dinhKem?.split(ID_SEPARATE)
                                const removedFile = oldDinhKem?.filter(x => x != fileName)
                                return { ...item, [colDinhKemName]: dinhKem ? removedFile.length ? removedFile.join(ID_SEPARATE) : undefined : fileName }
                            } else if (flag == "replace") {
                                return { ...item, [colDinhKemName]: fileName }
                            }
                        }
                        return item
                    })
                })
                : null
        })
    }, [setDataSource])

    const removeFileHandler = async (fileName: string) => {
        // const res = await fileApi.RemoveFile({
        //     path: fileName
        // })
        // if (res.status === 200) {
        onChangeDinhKemTable(fileName, undefined, "remove")
        // không được phép xóa file đã số hóa
        hideKySoWith === undefined && onRemoveFile ? onRemoveFile(fileName) : null
        // onCleanSoHoa ?  onCleanSoHoa() : null
        // }
    }

    useEffect(() => {
        if (!dinhKem && onCleanSoHoa) {
            onCleanSoHoa()
        }
    }, [onCleanSoHoa, dinhKem])

    const signFileToken = useCallback(async (fileName: string) => {
        // const file = fileList?.find(file => file.response.data == fileName)

        if (fileName && folderName) {
            await btnSignClick(fileName, folderName, (urlFileSigned, oldFileUrl) => {
                onChangeDinhKemTable(urlFileSigned, oldFileUrl, "override")
            }, customGetFileSignature, customSignature)
        } else {
            console.error("không tìm thấy file đã tải lên")
        }
    }, [folderName])

    const onClickSignFileNEAC = () => {
        setNeacVisible(true)
    }

    const danhSachDinhKems = useMemo(() => {
        const danhSach = dinhKem ? dinhKem?.split(ID_SEPARATE) : []
        return <AntdSpace direction="vertical">
            {danhSach?.map((fileName, index) => {
                return <AntdSpace direction="horizontal" key={index}>
                    <AntdSpace direction="horizontal" role="button" onClick={() => callApiAndDisplayFile(fileName)}>
                        <LinkOutlined />
                        <>{getFileName(fileName)}</>
                    </AntdSpace>
                    {hideUpload ? null : <Popconfirm
                        title='Xoá?'
                        onConfirm={() => {
                            removeFileHandler(fileName)
                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <DeleteOutlined style={{ color: "tomato" }} />
                    </Popconfirm>}
                    {/* hideKySoWith là khi trạng thái số hóa */}
                    {kySoToken && hideKySoWith === undefined && !isMobile ? <span onClick={async () => {
                        await signFileToken(fileName)
                    }} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45, cursor: "pointer" }}>
                        <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span id={`check_daKySo_${fileName || ""}`}>Ký số</span></span>
                    </span> : null}
                    {kySoNEAC && hideKySoWith === undefined ? <span onClick={onClickSignFileNEAC} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45, cursor: "pointer" }}>
                        <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span >Ký số NEAC</span></span>
                    </span> : null}
                </AntdSpace>
            })}
            <NeacModal setVisible={setNeacVisible} visible={neacVisible} fileList={dinhKem} />

        </AntdSpace>

    }, [dinhKem, hideUpload, neacVisible, hideKySoWith, kySoToken, kySoNEAC, onRemoveFile])
    return { danhSachDinhKems, onChangeDinhKemTable }
}