import { SearchHuongDanSuDung } from "@/features/portaldvc_admin/HuongDanSuDung/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect } from "react"
import '../scss/LeftSide.scss'

export const LeftSideHuongDanSuDung = ({ selected, setSelected }: { selected: string | undefined, setSelected: React.Dispatch<React.SetStateAction<string | undefined>> }) => {
    const dispatch = useAppDispatch()
    const { datas: huongDanSuDungs } = useAppSelector((state) => state.huongdansudung)

    useEffect(() => {
        dispatch(SearchHuongDanSuDung({}))
    }, [])
    const handleSelected = (item: any) => {
        setSelected(item)
    }

    useEffect(() => {
        if (huongDanSuDungs && huongDanSuDungs.length > 0 && selected === undefined) {
            handleSelected(huongDanSuDungs[0].id);
        }
    }, [huongDanSuDungs, selected, handleSelected]);
    return (
        <div className="mt-2 wrapper-left">
            <h5 style={{ color: '#ce7a58' }}>HƯỚNG DẪN</h5>
            {huongDanSuDungs && huongDanSuDungs?.map((item, index) => (
                <div key={item.id}>
                    <div className={`text-content ${item.id === selected ? 'active' : ''}`} onClick={() => handleSelected(item.id)}><span>{index + 1 + ". "}</span>{item.tenHuongDanSuDung}</div>
                </div>
            ))}
        </div>
    )
}