import React, { useEffect, useState } from "react";
import { Button, Space, Layout, Menu, theme, Pagination } from "antd";
import "../index.scss";
import Sidebar from "../components/SideBar";
import TinTucContainer from "../components/TinTuc";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchTinBaiPortal } from "../redux/action";
import { Outlet } from "react-router-dom";

function TinTucLayOut({ children }: any) {
  const dispatch = useAppDispatch();
  const { datas: tinBais, count } = useAppSelector(
    (state) => state.portaltinbai
  );
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
    <div className="container_TinTucPage" style={{marginTop : '50px'}}>
      <div className="row">
        {/* <div className="col-sm-3">
          <div className="ms-webpart-zone ms-fullWidth">
            <Sidebar />
          </div>
        </div> */}
        <div className="col-sm-12">
          {children}
          {/* <div className="ms-webpart-zone ms-fullWidth">
            <div className="col-xs-12">
              <TinTucContainer tinBais={tinBais} />
              <div className="d-flex justify-content-center p-3">
                <Pagination
                  onChange={onChangePage}
                  total={100}
                  pageSize={pageSize}
                  current={currentPage}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export { TinTucLayOut };
