import React, { useEffect, useState } from "react";
import { Button, Space, Layout, Menu, theme, Pagination, Spin } from "antd";
import "./index.scss";
import Sidebar from "./components/SideBar";
import TinTucContainer from "./components/TinTuc";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchTinBaiPortal } from "./redux/action";
import { TinTucLayOut } from "./layouts/TinTuc";

function TinTucPage() {
  const dispatch = useAppDispatch();
  const {
    datas: tinBais,
    count,
    loading,
  } = useAppSelector((state) => state.portaltinbai);
  //   const [tinTucPagination, setTinTucPagination] = useState({
  //     currentPage: 3,
  //     pageSize: 10,
  //   });
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(
      SearchTinBaiPortal({
        pageNumber: currentPage,
        pageSize: pageSize,
        reFetch: true,
      })
    );
  }, [pageSize, currentPage]);
  //   useEffect(() => {
  //     console.log("====================================");
  //     console.log(tinBais);
  //     console.log("====================================");
  //   }, [tinBais]);
  const onChangePage = (current: number, tmpPageSize: number) => {
    setCurrentPage(current);
    setPageSize(tmpPageSize);
  };
  return (
    <TinTucLayOut>
      <div className="ms-webpart-zone ms-fullWidth">
        <div className="col-xs-12">
          <Spin spinning={loading}>
            <TinTucContainer tinBais={tinBais} />
          </Spin>

          <div className="d-flex justify-content-center p-3">
            <Pagination
              onChange={onChangePage}
              total={count}
              pageSize={pageSize}
              current={currentPage}
            />
          </div>
        </div>
      </div>
    </TinTucLayOut>
  );
}

export default TinTucPage;
