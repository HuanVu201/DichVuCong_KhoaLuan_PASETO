import "bootstrap/dist/css/bootstrap.css";
import "./SidebarTTHC.scss";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { DanhMucThuTucPortalService } from "../services/DanhMucThuTucPortal";
import { useDanhMucThuTucPortalContext } from "../context/DanhMucThuTucPortalContext";

interface IMenu {
  key: string,
  label: string,
  children: [
    {
      key: string,
      label: string,
      children: [
        {
          key: string,
          label: string,
          soLuongThuTuc: string,
        }
      ],
    }
  ],
}

export interface IFilterThuTuc {
  tenLinhVuc: string;
  maLinhVuc: string;
  maNganh: string;
  tenNganh: string;
  capThucHien: string;
  soLuongThuTuc: string;
}

const SidebarDanhMucThuTuc: React.FC = () => {
  const menuCapThucHien = [
    {
      key: "CapTinh",
      label: "Cấp tỉnh",
      children: [],
    },
    {
      key: "CapHuyen",
      label: "Cấp huyện",
      children: [],
    },
    {
      key: "CapXa",
      label: "Cấp xã",
      children: [],
    },
  ];


  const thuTucContext = useDanhMucThuTucPortalContext();
  const thuTucPortalService = new DanhMucThuTucPortalService();
  const [thuTuc, setThuTuc] = useState<IFilterThuTuc[]>([]);
  const [menu, setMenu] = useState<IMenu[]>([]);

  let maLinhVucURL = ''
  let capThucHienURL = ''
  if (thuTucContext.searchParams.has('MaLinhVuc')) {
    maLinhVucURL += thuTucContext.searchParams.get('MaLinhVuc')
  }
  if (thuTucContext.searchParams.has('CapThucHien')) {
    capThucHienURL += thuTucContext.searchParams.get('CapThucHien')
  }

  useEffect(() => {
    (async () => {
      const resThuTuc = await thuTucPortalService.SearchSideBar({
        pageSize: 10000,
      });
      if (resThuTuc?.data?.data) {
        setThuTuc(resThuTuc?.data?.data);
      }
    })();
  }, []);

  useEffect(() => {
    var tmpMenu = menuCapThucHien.map((item1) => {
      return {
        ...item1,
        children: [
          ...new Map(
            thuTuc
              .filter((x) => x.capThucHien == item1?.key)
              .map((item) => [
                item.maNganh,
                {
                  key: item.maNganh,
                  label: item.tenNganh,
                  children: [
                    ...new Map(
                      thuTuc
                        .filter((x) => x.maNganh == item?.maNganh && x.capThucHien == item1.key)
                        .map((linhVuc) => [
                          linhVuc.maLinhVuc,
                          {
                            key: linhVuc.maLinhVuc,
                            label: linhVuc.tenLinhVuc,
                            soLuongThuTuc: linhVuc.soLuongThuTuc
                          },
                        ])
                    ).values(),
                  ],
                },
              ])
          ).values(),
        ],
      };
    }) as IMenu[];
    setMenu(tmpMenu);

    document.querySelector('#menuCapTinhBlock')?.classList.add('selected');

  }, [thuTuc]);



  const toggleCacCap = (keyCap: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();

      const currentSelectedElement = document.getElementById(`menu${keyCap}Block`)

      if (currentSelectedElement?.classList.contains('selected')) {
        currentSelectedElement.classList.remove('selected')
      } else {
        document.querySelectorAll('.menuCacCapBlock').forEach(element => {
          if (element.classList.contains('selected')) {
            element.classList.remove('selected')
          }
        })
        currentSelectedElement?.classList.add('selected');
      }
    }
  }

  const toggleNganh = (keyCap: string, keyNganh: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();

      const currentSelectedElement = document.getElementById(`${keyCap}-${keyNganh}`)

      if (currentSelectedElement?.classList.contains('selected')) {
        currentSelectedElement.classList.remove('selected')
      } else {
        document.querySelectorAll(`.${keyCap}`).forEach(element => {
          element.classList.remove('selected')
        })
        currentSelectedElement?.classList.add('selected')
      }
    }
  }


  const handlerSearchLinhVuc = (keyCap: string, keyNganh: string, keyLinhVuc: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();

      document.querySelectorAll('.itemLinhVuc').forEach(item => item.classList.remove('actived'))
      document.getElementById(`${keyCap}-${keyLinhVuc}`)?.classList.add('actived')

      thuTucContext.handleUrlQueryStringChange({
        MaLinhVuc: keyLinhVuc,
        CapThucHien: keyCap,
        TuKhoa: '',
        MaThuTuc: ''
      })
      thuTucContext.setThuTucId(null)
    }
  }

  return (
    <div className="sidebar">
      {menu.map((itemCap, indexCap) => {
        return (
          <div className="menuCacCapBlock" id={`menu${itemCap?.key}Block`} key={indexCap}>
            <div className="titleCap" id={`${itemCap?.key}`} onClick={toggleCacCap(itemCap.key)}>
              <div className="tenCap">{itemCap.label.toLocaleUpperCase()}</div>
            </div>
            <div className="listNganh" id={`listNganh${itemCap.key}`}>
              {
                itemCap.children.map((itemNganh, indexNganh) => {
                  return (
                    <div className={`${itemCap.key} itemNganh`}
                      id={`${itemCap.key}-${itemNganh.key}`}
                      key={`${indexCap}-${indexNganh}`}
                    >
                      <div className="tenNganh" onClick={toggleNganh(itemCap.key, itemNganh.key)}>{itemNganh.label}</div>
                      <div className="listItemsLinhVuc">
                        {itemNganh.children.map((itemLinhVuc, indexLinhVuc) => {

                          return (
                            <div className={maLinhVucURL == itemLinhVuc.key && capThucHienURL == itemCap.key ? 'itemLinhVuc actived' : 'itemLinhVuc'}
                              id={`${itemCap.key}-${itemLinhVuc.key}`}
                              key={`${indexCap}-${indexNganh}-${indexLinhVuc}`}
                              onClick={handlerSearchLinhVuc(itemCap.key, itemNganh.key, itemLinhVuc.key)}
                            >
                              <i>{itemLinhVuc.label} ({itemLinhVuc.soLuongThuTuc} thủ tục)</i>
                            </div>
                          )


                        })}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default SidebarDanhMucThuTuc;
