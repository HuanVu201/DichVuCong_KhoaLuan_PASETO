import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { ISearchKenhTin } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components"
import { ThemKenhTin } from "../modals/ThemKenhTin"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { KenhTinActionContextMenu } from "../KenhTinActionContextMenu"
import { GetKenhTin, SearchKenhTin } from "@/features/portaldvc_admin/kenhtin/redux/action"
import { useKenhTinContext } from "../../contexts/KenhTinContext"
// import { SuaKenhTinAction } from "../modals/SuaKenhTinAction"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree

export const KenhTin = () => {
    const { datas: KenhTin } = useAppSelector(state => state.kenhtin)
    const [searchParams, setSearchParams] = useState<ISearchKenhTin>({ pageNumber: 1, pageSize: 10000, reFetch: true })
    const kenhTinActionContext = useKenhTinContext()
    const [folderSearchParams, setFolderSearchParams] = useState("")
    const [delayFolderSearch, setDelayFolderSearch] = useState("")
    const [themKenhTinActionModalVisible, setThemKenhTinActionModalVisible] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(SearchKenhTin(searchParams))
    }, [searchParams])

    useEffect(() => {
        const timeOutId = setTimeout(() => setFolderSearchParams(delayFolderSearch), 1500)
        return () => {
            clearTimeout(timeOutId)
        }
    }, [delayFolderSearch])
    const onChangeFolder: SearchProps["onChange"] = (e) => {
        setDelayFolderSearch(e.target.value)
    }
    const onSearchFolder: SearchProps["onSearch"] = (value) => {
        setFolderSearchParams(value)
    }
    // useEffect(() => {
    //     if (idKenhTin) {
    //         dispatch(GetKenhTin(idKenhTin))
    //     }
    // }, [idKenhTin])
    return <ZoomComponent title={"Danh sách KenhTin"} onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true, pageNumber: 1, pageSize: 10000, }))}>
        <Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm kênh tin" onChange={onChangeFolder} onSearch={onSearchFolder} />
        <AntdDivider />
        <AntdSpace onClick={() => setThemKenhTinActionModalVisible(true)} style={{ cursor: "pointer" }}>
            <PlusCircleOutlined style={{ fontSize: "18px" }} />
            Thêm kênh tin
        </AntdSpace>
        <AntdDivider />
        <AntdDirectoryTree
            multiple={false}
            generateTree={{ data: KenhTin, title: 'tenKenhTin', parentId: "maKenhTinCha", id: 'id' }}
            searchParams={folderSearchParams}
            onSelect={(value) => {
                kenhTinActionContext.setMaKenhTin((value as string[])[0])
            }
            }
            contextMenu={(setVisible, id, top, left) => {
                return <KenhTinActionContextMenu id={id} top={top} left={left} setVisible={setVisible} />
            }}
        />
        {/* modals */}
        {themKenhTinActionModalVisible ?
            <ThemKenhTin visible={true} handlerClose={() => setThemKenhTinActionModalVisible(false)} />
            : <></>}


        {/* modals */}
    </ZoomComponent>
}