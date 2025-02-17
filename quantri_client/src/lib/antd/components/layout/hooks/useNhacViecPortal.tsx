import { NhacViecResponse } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices"
import { Service } from "@/services"
import './NhacViePortal.scss'
import { useCallback, useEffect, useMemo, useState } from "react"
import { NhacViecLinkResponseKey, nhacViecLabelMapper, nhacViecLinkMapper, nhacViecMapper } from "../data/nhacViecMapper"
import { Badge, Dropdown, MenuProps } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { BellOutlined } from "@ant-design/icons"
import { AntdMenu } from "../.."
import { NhacViecLinkPortalResponseKey, nhacViecLabelPortalMapper, nhacViecLinkPortalMapper, nhacViecPortalMapper } from "../data/nhacViecPortalMapper"
import { HoSoFormData } from "@/features/portaldvc/HoSoCaNhan/components/DichVuCongComponent"
import { useAppSelector } from "@/lib/redux/Hooks"

export type NhacViecHookParams = {
  hideNhacViecOnMenu?: boolean
}

export const useNhacViecPortal = ({ hideNhacViecOnMenu = false }: NhacViecHookParams) => {
  const [nhacViec, setNhacViec] = useState<NhacViecResponse>()
  const [formData, setFormData] = useState<HoSoFormData>()
  const { data: user } = useAppSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      if (location.pathname.includes(Service.primaryRoutes.portaldvc.root)) {
        if (user) {
          const res = await tiepNhanHoSoTrucTuyenApi.NhacViecPortal({ nguoiGui: true })
          const respData = res.data.data
          if (respData) {
            setNhacViec(respData)
          }
        }

      }

    })()
  }, [user])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  const BadgeBell = useMemo(() => {
    const items = nhacViec ? (Object.keys(nhacViec).filter((x) =>
      x == "duocTiepNhan" || x == "choThanhToan" || x == "khongDuocTiepNhan" || x == "yeuCauBoSung" || x == "daCoKetQua"
    ) as Array<NhacViecLinkPortalResponseKey>).map((key) => {
      return {
        key: nhacViecLinkPortalMapper[key],
        label: nhacViecLabelPortalMapper[key](`${nhacViec[key]}`)
      }
    }) : null
    
    const totalCount = nhacViec ? (nhacViec.khongDuocTiepNhan + nhacViec.choThanhToan + nhacViec.duocTiepNhan + nhacViec.yeuCauBoSung + nhacViec.daCoKetQua) : 0

    return <Badge count={totalCount} overflowCount={9999} offset={[0, 0]}>
      <Dropdown menu={{ items: items || [], onClick } as any} trigger={["click"]} placement="bottomRight">
        <BellOutlined style={{ fontSize: 30, color: "black" }} role="button" />
      </Dropdown>
    </Badge>
  }, [nhacViec])

  const _internalRenderMenuItem: MenuProps["_internalRenderMenuItem"] = useCallback((originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>, props: any, stateProps: {
    selected: boolean;
  }) => {
    const nhacViecMenuItem = nhacViecPortalMapper[props.eventKey]
    
    const renderNhacViecCount = <span style={{ color: 'red' }}> {nhacViec && nhacViec[nhacViecMenuItem] ? `(${nhacViec[nhacViecMenuItem]})` : undefined}</span>
    
    const cloneNode = React.cloneElement(originNode, {},
      <span className='ant-menu-title-content'>
        <Link to={props.eventKey}>{props.title} {hideNhacViecOnMenu ? null : renderNhacViecCount}</Link>
      </span>
    )
    return <> {cloneNode} </>
  }, [nhacViec, hideNhacViecOnMenu])

  return {
    _internalRenderMenuItem,
    BadgeBell
  }
}