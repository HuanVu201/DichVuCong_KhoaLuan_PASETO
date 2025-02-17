import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ISearchNgayNghi } from "../models"
import { useCallback } from "react"
import { useNgayNghiContext } from "../context/NgayNghiContext"

export const NgayNghiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchNgayNghi>> }) => {
    const ngayNghiContext = useNgayNghiContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchNgayNghi) => {
        console.log(values);
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])
    return (
        <AntdButton onClick={() => { ngayNghiContext.setNgayNghiModalVisible(true) }}>Thêm mới</AntdButton>
    )
}