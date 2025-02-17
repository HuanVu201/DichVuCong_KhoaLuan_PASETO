import { GetHuongDanSuDung, SearchHuongDanSuDung } from "@/features/portaldvc_admin/HuongDanSuDung/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import '../scss/RightSide.scss'
import { useEffect } from "react"

export const RightSideHuongDanSuDung = ({selected} : {selected : string | undefined}) => {
    const dispatch = useAppDispatch()
    const { data: huongDanSuDung } = useAppSelector((state) => state.huongdansudung)
    useEffect(() => {
        dispatch(GetHuongDanSuDung(selected as any))
    },[selected])
    
    useEffect(() => {
        dispatch(SearchHuongDanSuDung({}))
    },[])
    return(
        <div className="mt-2" style={{marginLeft : '20px'}} > 
            <div dangerouslySetInnerHTML={{ __html: huongDanSuDung?.noiDungHuongDanSuDung || "" }} />
        </div>
    )
}