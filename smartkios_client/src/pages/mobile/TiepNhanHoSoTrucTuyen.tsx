import { FormNopHoSo } from "@/features/portaldvc/NopHoSoTrucTuyen/components"
import { GetUserById } from "@/features/user/redux/Actions"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IParseUserToken } from "@/models"
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { parseJwt } from "@/utils/common"
import { useEffect, useLayoutEffect } from "react"
import { useSearchParams } from "react-router-dom"

const TiepNhanTrucTuyenMobileWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const emcElement = document.querySelector(".yhy-append-wrap") as HTMLDivElement | undefined
        if(emcElement){
            emcElement.style.display = "none"
        }
        return () => {
            if(emcElement){
                emcElement.style.display = "block"
            }
        }
    }, [])
    useEffect(() => {
        const token = searchParams.get("token")
        if(token) {
            const parseToken: IParseUserToken = parseJwt(token)
            dispatch(GetUserById(parseToken.uid))
        }
    }, [searchParams])

    return (
        <TiepNhanHoSoProvider>
            <FormNopHoSo searchParams={searchParams} setSearchParams={setSearchParams}/>
        </TiepNhanHoSoProvider>
    )
}

export default TiepNhanTrucTuyenMobileWrapper