import { RenderTitle } from "@/components/common";
import { ISearchHoSoBoSung } from "@/features/bosunghoso/models";
import { CheckGiaoDichThanhToanModal } from "@/features/giaodichthanhtoan/components/CheckGiaoDichThanhToanModal";
import { GiaoDichThanhToanProvider } from "@/features/giaodichthanhtoan/contexts/GiaoDichThanhToanContext";
import { useGdttColumn } from "@/features/giaodichthanhtoan/hooks/useColumn";
import { ISearchGiaoDichThanhToan } from "@/features/giaodichthanhtoan/models";
import { SearchGiaoDichThanhToan } from "@/features/giaodichthanhtoan/redux/action";
import { useCanBoYeuCauThanhToanColumn } from "@/features/hoso/hooks/useCanBoYeuCauThanhToanColumn";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";

import { useYeuCauThanhToanColumn } from "@/features/hoso/hooks/useYeuCauThanhToanColumn";
import { ISearchPhiLePhi } from "@/features/philephi/models";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { BienLaiDienTuDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiDienTuDetail";
import { BienLaiPaymentPlatformDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiPaymentPlatform";
import { YeuCauThuSauModal } from "@/pages/dvc/thuphilephi/chothuphi/components/YeuCauThuSauModal";
import {
  ChoThuPhiProvider,
  useChoThuPhiContext,
} from "@/pages/dvc/thuphilephi/chothuphi/contexts/ChoThuPhiContext";

import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Suspense, useEffect, useMemo, useState } from "react";
const PhiLePhiTable = () => {
  const yeuCauThanhToanContext = useChoThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
  });
  const [searchGdttParams, setSearchGdttParams] = useState<ISearchGiaoDichThanhToan>({ pageNumber: 1, pageSize: 100 })
  const [traCuuGdttVisible, setTraCuuGdttVisible] = useState<boolean>(false);
  const items: HoSoTableActions[] = useMemo(
    () => [
      // {
      //   icon: (
      //     <EditOutlined
      //       title="Yêu cầu thu phí sau"
      //       onClick={() => {
      //         yeuCauThanhToanContext.setPayYeuCauThuSauVisible(true);
      //       }}
      //     />
      //   ),
      //   key: "YeuCauThuSau",
      // },
      {
        icon: (
          <AuditOutlined
            disabled={false}
            title="Biên lai phí"
            onClick={() => {

              yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
                ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
                loaiPhi: "phi",
              });
              yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
            }}
          />
        ),
        key: 'phi'
      },
      {
        icon: (
          <AuditOutlined
            disabled={false}
            title="Biên lai lệ phí"
            onClick={() => {
              yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
                ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
                loaiPhi: "lephi",
              });
              yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
            }}
          />
        ),
        key: 'lePhi'
      },
      {
        icon: (
          <AuditOutlined
            disabled={false}
            title="Biên lai phí, lệ phí"
            onClick={() => {
              yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
                ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
                loaiPhi: "phiLephi",
              });
              yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
            }}
          />
        ),
        key: 'phiLephi'
      },
      {
        icon: (
          <AuditOutlined
            title="Biên lai Payment Platform"
            onClick={() => {
              yeuCauThanhToanContext.setViewBienLaiPaymentPlatform(true);
            }}
          />
        ),
        key: 'paymentPlatform'
      },
    ],

    []
  );
  const dispatch = useAppDispatch();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const { datas: yeuCauThanhToans } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const { datas: giaoDichThanhToans, count } = useAppSelector(state => state.giaodichthanhtoans)
  const columns = useCanBoYeuCauThanhToanColumn({
    pagination: {
      pageNumber: searchParams.pageNumber,
      pageSize: searchParams.pageSize,
    },
    items,
  });
  const { columns: gdttColumns } = useGdttColumn({ pagination: searchGdttParams, setSearchParams: setSearchGdttParams })
  useEffect(() => {
    if (hoSo != undefined) {
      setSearchParams((curr) => ({ ...curr, maHoSo: hoSo.maHoSo }));
      setSearchGdttParams((curr) => ({ ...curr, hoSo: hoSo.maHoSo }))
    }
  }, [hoSo]);
  useEffect(() => {
    if (yeuCauThanhToans && yeuCauThanhToans.length > 0) {
      yeuCauThanhToans.map(item => {
        if (item.trangThai == "Chờ thanh toán" && hoSo?.maHoSo) {
          setTraCuuGdttVisible(true);
          return;
        }
        if (item.trangThai == "Đã thanh toán" && item.hinhThucThanhToan == "truc-tuyen" && hoSo?.maHoSo) {
          setTraCuuGdttVisible(true);
          return;
        }
      })
    }
  }, [yeuCauThanhToans])
  useEffect(() => {
    (async () => {
      if (traCuuGdttVisible && hoSo?.maHoSo) await dispatch(SearchGiaoDichThanhToan(searchGdttParams))
    })()
  }, [traCuuGdttVisible, hoSo])
  return (
    <>
      {searchParams.maHoSo ? (
        <AntdTable
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchYeuCauThanhToan(params))}
          columns={columns}
          dataSource={yeuCauThanhToans}
        />
      ) : null}
      {traCuuGdttVisible ? <>
        <RenderTitle title={"Thông tin giao dịch thanh toán"} />
        <AntdSpace direction="vertical" style={{ width: "100%" }}>

          <AntdTable
            columns={gdttColumns}
            dataSource={giaoDichThanhToans}
            pagination={{
              total: count
            }}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => { }}
          />
        </AntdSpace>
        <CheckGiaoDichThanhToanModal searchParams={searchGdttParams} />
      </>

        : null}
      <Suspense
        fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
      >
        {yeuCauThanhToanContext.yeuCauThuSauVisible ? (
          <YeuCauThuSauModal
            handleCancel={() =>
              yeuCauThanhToanContext.setPayYeuCauThuSauVisible(false)
            }
            reFetch={() => {
              setSearchParams({ ...searchParams });
            }}
            YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
          ></YeuCauThuSauModal>
        ) : null}
        {yeuCauThanhToanContext.viewBienLaiThanhToanVisible ? (
          <BienLaiDienTuDetail
            bienLai={{
              idYeuCauThanhToan:
                yeuCauThanhToanContext.selectedIds[0].toString(),
              loaiPhi:
                yeuCauThanhToanContext.searchBienLaiThanhToanParams.loaiPhi,
            }}
            handleCancel={() => {
              yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({});
              yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(false);
            }}
          />
        ) : null}
        {yeuCauThanhToanContext.viewBienLaiPaymentPlatform && yeuCauThanhToanContext.selectedMaGiaoDich ? (
          <BienLaiPaymentPlatformDetail
            maGiaoDich={yeuCauThanhToanContext.selectedMaGiaoDich}
            handleCancel={() => {
              yeuCauThanhToanContext.setViewBienLaiPaymentPlatform(false);
            }}
          />
        ) : null}
      </Suspense>
    </>
  );
};
export const PhiLePhi = () => {
  return (
    <>
      <GiaoDichThanhToanProvider>
        <ChoThuPhiProvider>
          <PhiLePhiTable />
        </ChoThuPhiProvider>
      </GiaoDichThanhToanProvider>
    </>
  );
};
