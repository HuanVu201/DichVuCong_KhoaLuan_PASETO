import { useEffect, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "@/features/quanlylogcsdldancudoannghiep/hooks/useColumn";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { LogCSDLDanCuDoanhNghiepProvider } from "../context/LogCSDLDanCuDoanhNghiepContext";
import { ISearchLogCSDLDanCuDoanhNghiep } from "../models";
import { SearchLogCSDLDanCuDoanhNghiep } from "../redux/action";
import { LogCSDLDanCuDoanhNghiepSearch } from "./LogCSDLDanCuDoanhNghiepSearch";
// import { LogCSDLDanCuDoanhNghiepDetail } from "./LogCSDLDanCuDoanhNghiepDetail";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { LogCSDLDanCuDoanhNghiepDetail } from "./LogCSDLDanCuDoanhNghiepDetail";

// Thành phần chính để hiển thị bảng dữ liệu của LogCSDLDanCuDoanhNghiep
const LogCSDLDanCuDoanhNghiepTable = () => {
    const dispatch = useAppDispatch(); // Hook để dispatch hành động tới Redux store
    const { datas: logcsdldancudoanhnghieps, count } = useAppSelector(state => state.logcsdldancudoanhnghiep); // Lấy dữ liệu và số lượng từ Redux store
    const [searchParams, setSearchParams] = useState<ISearchLogCSDLDanCuDoanhNghiep>({ pageNumber: 1, pageSize: 10 }); // Trạng thái lưu trữ tham số tìm kiếm
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }); // Hook tùy chỉnh để lấy cấu hình cột của bảng
    const [showTable, setShowTable] = useState(false); // Trạng thái điều khiển việc hiển thị bảng

    // Hook để gửi yêu cầu tìm kiếm khi searchParams hoặc showTable thay đổi
    useEffect(() => {
        if (showTable && searchParams) {
            dispatch(SearchLogCSDLDanCuDoanhNghiep(searchParams)); // Gửi hành động tìm kiếm
        }
    }, [searchParams, dispatch, showTable]);

    // Hook để tải danh sách cơ cấu tổ chức khi component mount
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 3000 })); // Gửi hành động tìm kiếm cơ cấu tổ chức
    }, [dispatch]);

    // Hàm xử lý khi người dùng thực hiện tìm kiếm
    const handleSearch = (params: ISearchLogCSDLDanCuDoanhNghiep) => {
        console.log('Search Params:', params);
        setSearchParams(params); // Cập nhật tham số tìm kiếm
        setShowTable(true); // Hiển thị bảng khi có tìm kiếm
    };

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {/* Thành phần tìm kiếm */}
                <LogCSDLDanCuDoanhNghiepSearch setSearchParams={handleSearch} />
                
                {/* Hiển thị bảng dữ liệu nếu showTable là true */}
                {showTable && (
                    <AntdTable
                        columns={columns} // Cấu hình cột của bảng
                        dataSource={logcsdldancudoanhnghieps} // Dữ liệu bảng
                        pagination={{
                            total: count // Tổng số bản ghi cho phân trang
                        }}
                        searchParams={searchParams} // Tham số tìm kiếm
                        setSearchParams={setSearchParams} // Hàm để cập nhật tham số tìm kiếm
                        onSearch={(params) => dispatch(SearchLogCSDLDanCuDoanhNghiep(params))} // Xử lý tìm kiếm từ bảng
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
            <LogCSDLDanCuDoanhNghiepDetail />
        </>
    );
};

// Wrapper component để bao bọc bảng trong LogCSDLDanCuDoanhNghiepProvider
const LogCSDLDanCuDoanhNghiepTableWrapper = () => (
    <LogCSDLDanCuDoanhNghiepProvider>
        <LogCSDLDanCuDoanhNghiepTable />
    </LogCSDLDanCuDoanhNghiepProvider>
);

export default LogCSDLDanCuDoanhNghiepTableWrapper;
