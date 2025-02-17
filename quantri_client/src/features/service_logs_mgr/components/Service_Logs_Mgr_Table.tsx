import { useEffect, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "@/features/service_logs_mgr/hooks/useColumn";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { Service_Logs_Mgr_Provider } from "../context/Service_Logs_Mgr_Context";
import { ISearchService_Logs_Mgr } from "../models";
import { SearchService_Logs_Mgr } from "../redux/action";
import { Service_Logs_Mgr_Search } from "./Service_Logs_Mgr_Search";
import { Service_Logs_Mgr_Detail } from "./Service_Logs_Mgr_Detail";

// Thành phần chính để hiển thị bảng dữ liệu của Service_Logs_Mgr
const Service_Logs_Mgr_Table = () => {
    const dispatch = useAppDispatch(); // Hook để dispatch hành động tới Redux store
    const { datas: service_logs_mgrs, count } = useAppSelector(state => state.service_logs_mgr); // Lấy dữ liệu và số lượng từ Redux store
    const [searchParams, setSearchParams] = useState<ISearchService_Logs_Mgr>({ pageNumber: 1, pageSize: 10 }); // Trạng thái lưu trữ tham số tìm kiếm
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }); // Hook tùy chỉnh để lấy cấu hình cột của bảng
    const [showTable, setShowTable] = useState(false); // Trạng thái điều khiển việc hiển thị bảng
    
    // useEffect(() => {
    //     if (showTable && searchParams) {
    //         dispatch(SearchService_Logs_Mgr(searchParams)); // Gửi hành động tìm kiếm
    //     }
    // }, [searchParams]);


    // Hàm xử lý khi người dùng thực hiện tìm kiếm
    const handleSearch = (params: ISearchService_Logs_Mgr) => {
        setSearchParams(params); // Cập nhật tham số tìm kiếm
        setShowTable(true); // Hiển thị bảng khi có tìm kiếm
    };

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {/* Thành phần tìm kiếm */}
                <Service_Logs_Mgr_Search setSearchParams={handleSearch} />
                
                {/* Hiển thị bảng dữ liệu nếu showTable là true */}
                {showTable && (
                    <AntdTable
                        columns={columns} // Cấu hình cột của bảng
                        dataSource={service_logs_mgrs} // Dữ liệu bảng
                        pagination={{
                            total: count // Tổng số bản ghi cho phân trang
                        }}
                        searchParams={searchParams} // Tham số tìm kiếm
                        setSearchParams={setSearchParams} // Hàm để cập nhật tham số tìm kiếm
                        onSearch={(params) => dispatch(SearchService_Logs_Mgr(params))} // Xử lý tìm kiếm từ bảng
                        onChange={(pagination) => {
                            // Cập nhật searchParams khi người dùng thay đổi trang
                            setSearchParams(prev => ({
                                ...prev,
                                pageNumber: pagination.current || 1,
                                pageSize: pagination.pageSize || 10,
                            }));
                        }}
                    />
                )}
            </AntdSpace>
            {/* Thành phần chi tiết dữ liệu */}
            <Service_Logs_Mgr_Detail />
        </>
    );
};

// Wrapper component để bao bọc bảng trong Service_Logs_MgrProvider
const Service_Logs_MgrTableWrapper = () => (
    <Service_Logs_Mgr_Provider>
        <Service_Logs_Mgr_Table />
    </Service_Logs_Mgr_Provider>
);

export default Service_Logs_MgrTableWrapper;
