// import { useState } from "react"
// import { AntdTable, AntdSpace } from "../../../lib/antd/components"
// import { useColumn } from "../hooks/useColumn"
// import { ISearchHoSo } from "../../hoso/models"
// import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
// import { SearchHoSo } from "../../hoso/redux/action"
// import { HoSoLienThongViLisSearch } from "./HoSoLienThongViLisSearch"
// import { HoSoLienThongViLisProvider } from "../context/HoSoLienThongViLisContext"
// import { HoSoLienThongViLisDetail } from "./HoSoLienThongViLisDetail"
// import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
// import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
// import { screenType } from "@/features/hoso/data"
// import { useHoSoLienThongViLisContext } from "../context/HoSoLienThongViLisContext"

// const HoSoLienThongViLisTable = () => {
//     const dispatch = useAppDispatch()
//     const { datas: hoSos, count } = useAppSelector(state => state.hoso)
//     const hoSoLienThongViLisContext = useHoSoLienThongViLisContext()
//     const buttonActionContext = useButtonActionContext()
//     const buttons = useButtonActions({ maScreen: screenType["ho-so-lien-thong-ViLIS"] })
//     const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10 })
//     const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
//     return (
//         <>
//             <AntdSpace direction="vertical" style={{ width: "100%" }}>
//                 {buttons}
//                 <HoSoLienThongViLisSearch setSearchParams={setSearchParams} />
//                 <AntdTable
//                     columns={columns}
//                     dataSource={hoSos}
//                     pagination={{
//                         total: count
//                     }}
//                     searchParams={searchParams}
//                     setSearchParams={setSearchParams}
//                     onSearch={(params) => dispatch(SearchHoSo(params))}
//                 />
//             </AntdSpace>
//             {hoSoLienThongViLisContext.detailHoSoLienThongViLisModalVisible ? <HoSoLienThongViLisDetail/> : null}
//         </>

//     )
// }
// const HoSoLienThongViLisWrapper = () => (<HoSoLienThongViLisProvider>
//     <HoSoLienThongViLisTable />
// </HoSoLienThongViLisProvider>)
// export default HoSoLienThongViLisWrapper