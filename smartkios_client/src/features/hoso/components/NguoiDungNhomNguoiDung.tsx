import { INguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/models";
import { nguoiDungnhomNguoiDungApi } from "@/features/nguoidungnhomnguoidung/services";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, CheckboxProps, Form, FormInstance, SelectProps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IHoSo } from "../models";
import { ID_SEPARATE } from "@/data";
import { userService } from "@/features/user/services";
import { AntdSelect, AntdSpace } from "@/lib/antd/components";
import { useSelectNguoiDungNhomNguoiDung } from "../hooks/useSelectNguoiDungNhomNguoiDung";

export interface NguoiDungNhomNguoiDungProps extends Pick<IQuyTrinhXuLy, "loaiBuoc" | "nhomNguoiDungId"> {
    disabled ?:boolean;
    form: FormInstance<any>;
    setSelectedNguoiDungs: React.Dispatch<React.SetStateAction<string[]>>;
    selectedNguoiDungs: string[];
    maTrangThaiHoSo: string;
    donViTiepNhan: string | null;
}

export const NguoiDungNhomNguoiDung = (props: NguoiDungNhomNguoiDungProps) => {
    const { loaiBuoc, nhomNguoiDungId, form, disabled, setSelectedNguoiDungs, selectedNguoiDungs, maTrangThaiHoSo, donViTiepNhan } = props
    const [nguoiDungs, setNguoiDungs] = useState<INguoiDungNhomNguoiDung[]>([])
    const {data: user} = useAppSelector(state => state.user)
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const [filterNguoiDungs, setFilterNguoiDungs] = useState<INguoiDungNhomNguoiDung[]>([])
    const {SelectNhomNguoiDung} = useSelectNguoiDungNhomNguoiDung({nguoiDungs, setFilterNguoiDungs})
    // const [selectedNguoiDungs, setSelectedNguoiDungs] = useState<string[]>([])
        
    useEffect(() => {
        const fetch = async () => {
            if(user !== undefined){
                const res = await nguoiDungnhomNguoiDungApi.Search({ nhomNguoiDungId, loaiBuoc, userGroupCode: user?.officeCode, donViTiepNhan: donViTiepNhan  || undefined, maDinhDanh: user.maDinhDanh, pageNumber:1, pageSize:100 })
                setNguoiDungs(res.data.data || [])
                setFilterNguoiDungs(res.data.data || [])
            }
        }
        if(maTrangThaiHoSo !== "9"){
            fetch()
        } else {
            if(hoSo){
                const user: any ={userId: hoSo.nguoiNhanHoSo, fullName: hoSo.fullName, }
                setNguoiDungs([user])
                setFilterNguoiDungs([user])
            }
        }
    }, [nhomNguoiDungId, loaiBuoc, user])

    useEffect(() => {
        if(maTrangThaiHoSo !== "9"){
            form.setFieldValue("nguoiXuLyTiep", selectedNguoiDungs.length ? selectedNguoiDungs.join(ID_SEPARATE) : undefined)
        }
        return () => {
            if(maTrangThaiHoSo !== "9"){
                form.setFieldValue("nguoiXuLyTiep", undefined)
            }
        }
    }, [selectedNguoiDungs])
    
    return <>
    {SelectNhomNguoiDung}
    <div style={{marginTop:12}}>
        {filterNguoiDungs.map((nguoiDung, index) =>
            <NguoiDungItem selectedNguoiDungs={selectedNguoiDungs} nguoiDung={nguoiDung} key={index} setSelectedNguoiDungs={setSelectedNguoiDungs} disabled={disabled}/>
        )}
    </div>
    </>
}

const NguoiDungItem = ({nguoiDung, selectedNguoiDungs, setSelectedNguoiDungs, disabled}: {nguoiDung: INguoiDungNhomNguoiDung; setSelectedNguoiDungs: React.Dispatch<React.SetStateAction<string[]>>; disabled ?:boolean, selectedNguoiDungs:string[] }) => {
    const onSelectNguoiDung: CheckboxProps["onChange"] = (e) => {
        setSelectedNguoiDungs((curr) => {
            if(e.target.checked){
                return [...curr, e.target.id!]
            }
            return curr.filter(x => x !== e.target.id!)
        })
    }
    return <div>
        <label style={{ marginRight: 8 }} htmlFor={nguoiDung.userId}>{nguoiDung.fullName}</label>
        <Checkbox checked={selectedNguoiDungs.includes(nguoiDung.userId) && !disabled} id={nguoiDung.userId} onChange={onSelectNguoiDung}
        disabled={disabled}/>
    </div>
}