import { coCauToChucService } from "@/features/cocautochuc/services"
import { ISearchUser, IUser } from "@/features/user/models"
import { userService } from "@/features/user/services"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks"
import { filterOptions } from "@/utils"
import { Form, Input, Space, Row, SelectProps } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useChuyenDLTKContext } from "../../contexts/ChuyenDLTKContext"

export const LeftSideChuyenDLTKSearch = ({ onUpdateDataSource }: { onUpdateDataSource: (res: any) => void }) => {
    const [form] = Form.useForm()
    const [dataDonVi, setDataDonVi] = useState([])
    const [dataPhongBan, setDataPhongBan] = useState([])
    const [dataTaiKhoan, setDataTaiKhoan] = useState([])
    const [groupCode, setGroupCode] = useState('')
    const chuyenDLTKContext = useChuyenDLTKContext()
    const resetSearchParams = useCallback(async () => {
        form.resetFields()
    }, []);

    const onFinish = async (values: ISearchUser) => {

        const res = await userService.GetById(form.getFieldValue("userName"))
        onUpdateDataSource(res.data)
        chuyenDLTKContext.setChuyenDLTKLeftSideId(res.data.id)
    }

    const handeChangeTaiKhoan = async (e: any) => {
        const res = await userService.Search({ officeCode: e as any })
        setDataTaiKhoan(res.data.data as any)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await coCauToChucService.Search({ pageSize: 1500, type: 'don-vi' });
            setDataDonVi(res.data.data as any)
        };
        fetchData();
    }, [])

    const filterDonViOptions = useMemo((): SelectProps["options"] => {
        const filteredOptions = dataDonVi?.map((item: any) => ({
            label: item.groupName,
            value: item.groupCode,
        }));
        return filteredOptions || [];
    }, [dataDonVi]);

    const filterPhongBanOptions = useMemo((): SelectProps["options"] => {
        const filteredOptions = dataPhongBan?.map((item: any) => ({
            label: item.groupName,
            value: item.groupCode,
        }));
        return filteredOptions || [];
    }, [dataPhongBan]);
    const filterTaiKhoanOptions = useMemo((): SelectProps["options"] => {
        const filteredOptions = dataTaiKhoan?.map((item: IUser) => ({
            label: item.userName,
            value: item.id,
        }));
        return filteredOptions || [];
    }, [dataTaiKhoan]);
    return (

        <Form name='diaBan' layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
                label="Đơn vị"
                name="officeCode"
            >
                <AntdSelect
                    onChange={handeChangeTaiKhoan}
                    options={filterDonViOptions}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                />
            </Form.Item>

            <Form.Item
                label="Tài khoản"
                name="userName"

            >
                <AntdSelect
                    options={filterTaiKhoanOptions}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                />
            </Form.Item>
            <Form.Item>
                <Row justify="center">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={resetSearchParams}>
                            Tải lại
                        </AntdButton>

                    </Space>
                </Row>
            </Form.Item>
        </Form>
    )
}