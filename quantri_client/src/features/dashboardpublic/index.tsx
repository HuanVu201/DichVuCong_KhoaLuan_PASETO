import { useEffect, useMemo } from "react"
import { SearchConfig, SearchPublicConfig } from "../config/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"

const DashboardPublic = () => {
    const dispatch = useAppDispatch()
    const { datas : configs } = useAppSelector(state => state.config)

    useEffect(() => {
        dispatch(SearchConfig({pageSize : 50}))
    }, [])
    const [domainDashboard] = useMemo(() => {
        return [configs?.find(x => x.code == 'Url-DashBoardLienThongDVC')]
    }, [configs])
        
    return (
        <div style={{width  : '100%'}}>
            <div>
                <iframe src={domainDashboard?.content} title="dashboard" width="100%" height="2000px"></iframe>
            </div>
        </div>
    )
}

export default DashboardPublic