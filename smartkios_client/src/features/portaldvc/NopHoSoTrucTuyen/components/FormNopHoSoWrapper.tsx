import { useAppSelector } from "@/lib/redux/Hooks"
import { useSearchParams } from "react-router-dom"
import { FormNopHoSo } from "."
import { ChonCoQuanThucHien } from "./ChonDVC/ChonCoQuanThucHien"
import { useEffect, useState } from "react"


export const FormNopHoSoWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data: user} = useAppSelector(state => state.user)
    
    const [showFormNopHoSo, setShowFormNopHoSo] = useState<boolean>(false);
    useEffect(() => {
        const donVi = searchParams.get("donVi")
        const truongHopId = searchParams.get("truongHopId")
        const maTTHC = searchParams.get("maTTHC")
        if(donVi && truongHopId && maTTHC && user !== undefined){
            setShowFormNopHoSo(true)
        } else {
            setShowFormNopHoSo(false)
        }   
    }, [searchParams, user])
    console.log(showFormNopHoSo);
    
    if(showFormNopHoSo) {
        return <FormNopHoSo searchParams={searchParams} setSearchParams={setSearchParams} />
    }
    else return <ChonCoQuanThucHien searchParams={searchParams} setSearchParams={setSearchParams}/>
}