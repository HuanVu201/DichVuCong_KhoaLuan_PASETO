import { INguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/models";
import { nguoiDungnhomNguoiDungApi } from "@/features/nguoidungnhomnguoidung/services";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, CheckboxProps, FormInstance, SelectProps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IHoSo } from "../models";
import { ID_SEPARATE } from "@/data";
import { userService } from "@/features/user/services";
import { AntdSelect, AntdSpace } from "@/lib/antd/components";
import { useSelectNguoiDungNhomNguoiDung } from "../hooks/useSelectNguoiDungNhomNguoiDung";
import '../scss/NguoiDungNhomNguoiDung.scss'

export interface NguoiDungNhomNguoiDungProps extends Pick<IQuyTrinhXuLy, "loaiBuoc" | "nhomNguoiDungId"> {
    disabled?: boolean;
    form: FormInstance<any>;
    setSelectedNguoiDungs: React.Dispatch<React.SetStateAction<string[]>>;
    selectedNguoiDungs: string[];
    maTrangThaiHoSo: string;
    donViTiepNhan: string | null;
}

export const NguoiDungNhomNguoiDung = (props: NguoiDungNhomNguoiDungProps) => {
    const { loaiBuoc, nhomNguoiDungId, form, disabled, setSelectedNguoiDungs, selectedNguoiDungs, maTrangThaiHoSo, donViTiepNhan } = props
    const [nguoiDungs, setNguoiDungs] = useState<INguoiDungNhomNguoiDung[]>([])
    const { data: user } = useAppSelector(state => state.user)
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const [filterNguoiDungs, setFilterNguoiDungs] = useState<INguoiDungNhomNguoiDung[]>([])
    const { SelectNhomNguoiDung } = useSelectNguoiDungNhomNguoiDung({ nguoiDungs, setFilterNguoiDungs })
    // const [selectedNguoiDungs, setSelectedNguoiDungs] = useState<string[]>([])
    const setDonViNguoiTiepNhanXuLy = (officeCode: string | undefined) => {
        form.setFieldValue("donViNguoiTiepNhanXuLy", officeCode)
    }
    const setDefaultUser = (nguoiDungnhomNguoiDungs?: INguoiDungNhomNguoiDung[]) => {
        if (!nguoiDungnhomNguoiDungs) {
            return;
        }
        if (nguoiDungnhomNguoiDungs.length == 1 && !disabled) {
            setSelectedNguoiDungs([nguoiDungnhomNguoiDungs[0].userId])
            setDonViNguoiTiepNhanXuLy(nguoiDungnhomNguoiDungs[0].officeCode)
        } else if (nguoiDungnhomNguoiDungs.length > 1 && !disabled) {
            const firstUserOccur = nguoiDungnhomNguoiDungs.find(x => {
                const nguoiDungHoSo = ((hoSo?.nguoiDaXuLy || "") + ID_SEPARATE + (hoSo?.nguoiXuLyTiep || "")).toLowerCase()
                return nguoiDungHoSo.includes(x.userId.toLowerCase())
            })
            if (firstUserOccur) {
                setSelectedNguoiDungs([firstUserOccur.userId])
                setDonViNguoiTiepNhanXuLy(firstUserOccur.officeCode)
            }
        }
    }

    useEffect(() => {
        const fetch = async () => {
            if (user !== undefined) {
                const res = await nguoiDungnhomNguoiDungApi.Search({ nhomNguoiDungId, loaiBuoc, userGroupCode: user?.officeCode, donViTiepNhan: donViTiepNhan || undefined, maDinhDanh: user.maDinhDanh, pageNumber: 1, pageSize: 1000 })
                setDefaultUser(res.data.data)
                setNguoiDungs(res.data.data || [])
                setFilterNguoiDungs(res.data.data || [])
            }
        }
        if (maTrangThaiHoSo !== "9") {
            fetch()
        } else {
            if (hoSo) {
                ;(async () => {
                    const user: any = { userId: hoSo.nguoiNhanHoSo.toLowerCase(), fullName: hoSo.fullName, }
                    const danhSachNguoiTiepNhanHoSo = await nguoiDungnhomNguoiDungApi.DanhSachNguoiTraKetQua({donViId: hoSo.donViId, maTTHC: hoSo.maTTHC})
                    if(danhSachNguoiTiepNhanHoSo.data.data != null && danhSachNguoiTiepNhanHoSo.data.data.length){
                        const dsUser = danhSachNguoiTiepNhanHoSo.data.data.map(x => ({...x, userId: x.userId.toLowerCase()}))
                        setSelectedNguoiDungs([hoSo.nguoiNhanHoSo.toLowerCase()])
                        setNguoiDungs(dsUser || [])
                        setFilterNguoiDungs(dsUser || [])
                    } else {
                        setSelectedNguoiDungs([hoSo.nguoiNhanHoSo.toLowerCase()])
                        setNguoiDungs([user])
                        setFilterNguoiDungs([user])
                    }
                })()
            }
        }
    }, [nhomNguoiDungId, loaiBuoc, user])

    useEffect(() => {
        if (!disabled && nguoiDungs.length == 1) {
            setDefaultUser(nguoiDungs)
        }
    }, [disabled, nguoiDungs])

    useEffect(() => {
        if (maTrangThaiHoSo !== "9") {
            form.setFieldValue("nguoiXuLyTiep", selectedNguoiDungs.length ? selectedNguoiDungs.join(ID_SEPARATE) : undefined)
        }
        return () => {
            if (maTrangThaiHoSo !== "9") {
                form.setFieldValue("nguoiXuLyTiep", undefined)
            }
        }
    }, [selectedNguoiDungs])

    const columns = useMemo(() => {
        const cols: any[] = [];
        if (filterNguoiDungs) {
            for (let i = 0; i < filterNguoiDungs.length; i += 10) {
                cols.push(filterNguoiDungs.slice(i, i + 10));
            }
        }
        return cols;
    }, [filterNguoiDungs]);

    return (
        <>
            {SelectNhomNguoiDung}
            <div style={{ display: 'flex', width: '100%', gap: 15, flexWrap: 'wrap' }}>
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} >
                        {column.map((nguoiDung: any, index: any) => (
                            <NguoiDungItem
                                key={index}
                                selectedNguoiDungs={selectedNguoiDungs}
                                nguoiDung={nguoiDung}
                                setSelectedNguoiDungs={setSelectedNguoiDungs}
                                disabled={disabled}
                                form={form}
                                setDonViNguoiTiepNhanXuLy={setDonViNguoiTiepNhanXuLy}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

const NguoiDungItem = ({ nguoiDung, selectedNguoiDungs, setSelectedNguoiDungs, disabled, form, setDonViNguoiTiepNhanXuLy }: { nguoiDung: INguoiDungNhomNguoiDung; setSelectedNguoiDungs: React.Dispatch<React.SetStateAction<string[]>>; disabled?: boolean, selectedNguoiDungs: string[]; form: FormInstance<any>; setDonViNguoiTiepNhanXuLy: (officeCode: string | undefined) => void }) => {
    const onSelectNguoiDung: CheckboxProps["onChange"] = (e) => {
        setDonViNguoiTiepNhanXuLy(nguoiDung.officeCode)
        setSelectedNguoiDungs((curr) => {
            const selectedUserId = e.target.id!;

            if (e.target.checked) {
                return [selectedUserId]
            }
            return curr.filter(x => x !== selectedUserId)
        })
    }



    return <div className={selectedNguoiDungs.includes(nguoiDung.userId) ? "selected-user" : ""}>
        <Checkbox checked={selectedNguoiDungs.includes(nguoiDung.userId) && !disabled} id={nguoiDung.userId} onChange={onSelectNguoiDung}
            disabled={disabled} />
        <label style={{ marginLeft: 8 }} htmlFor={nguoiDung.userId}>{nguoiDung.fullName} - ({nguoiDung.positionName})</label>

    </div>
}