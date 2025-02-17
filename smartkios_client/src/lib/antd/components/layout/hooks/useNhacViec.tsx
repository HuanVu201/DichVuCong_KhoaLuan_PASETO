import { NhacViecResponse } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices"
import { Service } from "@/services"
import { useCallback, useEffect, useMemo, useState } from "react"
import { NhacViecLinkResponseKey, nhacViecLabelMapper, nhacViecLinkMapper, nhacViecMapper } from "../data/nhacViecMapper"
import { Badge, Dropdown, MenuProps } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { BellOutlined } from "@ant-design/icons"
import { AntdMenu } from "../.."

export type NhacViecHookParams = {
  hideNhacViecOnMenu?: boolean 
}

export const useNhacViec = ({hideNhacViecOnMenu = false} : NhacViecHookParams) => {
  const [nhacViec, setNhacViec] = useState<NhacViecResponse>()

  useEffect(() => {
    (async () => {
      if (location.pathname.includes(Service.primaryRoutes.dvc.root)) {
        const res = await tiepNhanHoSoTrucTuyenApi.NhacViec()
        const respData = res.data.data
        if (respData) {
          setNhacViec(respData)
        }
      }
    })()
  }, [location.pathname])

  const BadgeBell = useMemo(() => {
    const items = nhacViec ? (Object.keys(nhacViec).filter((x) => 
      x == "choTraBCCI" || x == "choTraTrucTiep" || x== "choTraTrucTuyen" || x =="moiDangKy" || x == "duocTiepNhan" || x== "choCongDanBoSung" || x == "dangXuLy" || x == "dungXuLy" || x == "yeuCauThucHienNghiaVuTaiChinh"
    ) as Array<NhacViecLinkResponseKey>).map((key)  => {
     return {
      key: nhacViecLinkMapper[key],
      label: nhacViecLabelMapper[key](`${nhacViec[key]}`)
     }
    }) : null
    const totalCount =nhacViec ? nhacViec.choTraBCCI + nhacViec.choTraTrucTiep + nhacViec.choTraTrucTuyen + nhacViec.moiDangKy + nhacViec.duocTiepNhan + nhacViec.choCongDanBoSung : 0

    return <Badge count={totalCount} overflowCount={9999} offset={[5,0]}>
      <Dropdown menu={{items: items || []} as any} trigger={["click"]} placement="bottomRight">
        <BellOutlined style={{fontSize:22, color:"white"}} role="button"/>
      </Dropdown>
    </Badge>
  }, [nhacViec])

  const _internalRenderMenuItem: MenuProps["_internalRenderMenuItem"] = useCallback((originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>, props: any, stateProps: {
    selected: boolean;
  }) => {
    const nhacViecMenuItem = nhacViecMapper[props.eventKey]
    const renderNhacViecCount = <span style={{ color: "red" }}> {nhacViec && nhacViec[nhacViecMenuItem] ? `(${nhacViec[nhacViecMenuItem]})` : undefined}</span>
    const cloneNode = React.cloneElement(originNode, {},
      <span className='ant-menu-title-content'>
        <Link to={props.eventKey}>{props.title} {hideNhacViecOnMenu ? null: renderNhacViecCount}</Link>
      </span>
    )
    return <> {cloneNode} </>
  }, [ nhacViec, hideNhacViecOnMenu])

  return {
    _internalRenderMenuItem,
    BadgeBell
  }
}