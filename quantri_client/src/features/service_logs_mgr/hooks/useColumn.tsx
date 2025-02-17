import { useMemo } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../lib/redux/Hooks';
import { IBasePagination } from '../../../models';
import { useService_Logs_Mgr_Context } from '../context/Service_Logs_Mgr_Context';
import { IService_Logs_Mgr } from '../models';
import { DeleteService_Logs_Mgr } from '../redux/action';
import {
    FORMAT_DATE_WITHOUT_TIME,
} from "@/data";

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch();
    const Service_Logs_MgrContext = useService_Logs_Mgr_Context();

    const columns = useMemo((): ColumnsType<IService_Logs_Mgr> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1;
                    const pageSize = pagination.pageSize ?? 10;
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>;
                },
            },
            {
                title: "Dịch vụ",
                key: "service",
                dataIndex: "service",
            },
            {
                title: "Người nhận",
                key: "receiver",
                dataIndex: "receiver",
            },
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
            },
            {
                title: "Trạng thái yêu cầu",
                key: "isSucceed",
                dataIndex: "isSucceed",
                render: (isSucceed) => (
                    <span style={{ color: isSucceed ? 'green' : 'red' }}>
                        {isSucceed ? '✔️ Thành công' : '❌ Thất bại'}
                    </span>
                ),
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: 'actions',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined
                            style={{ color: "cornflowerblue" }}
                            title="Xem chi tiết"
                            onClick={() => {
                                Service_Logs_MgrContext.setService_Logs_MgrId(record.id);
                                Service_Logs_MgrContext.setService_Logs_MgrModalVisible(true);
                            }}
                        />
                    </Space>
                ),
            }
        ];
    }, [pagination, Service_Logs_MgrContext, dispatch]);

    return { columns };
};
