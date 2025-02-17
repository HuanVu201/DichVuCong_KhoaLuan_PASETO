import { Divider } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import "./DanhSachTrangThai.scss";
import { CSSProperties, useEffect, useLayoutEffect, useState } from "react";
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices";
import { IHoSo } from "@/features/hoso/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useNavigate } from "react-router-dom";

type HoSo = IHoSo & { className: string }

const DURATION = 3000

export const DanhSachHoSo = () => {
  const [hoSos, setHoSos] = useState<HoSo[]>([]);
  const [isTransition, setIsTransition] = useState(false)
  const [startAt, setStartAt] = useState(DURATION)
  const navigate = useNavigate();
  const { publicModule: config } = useAppSelector(state => state.config)
  const [locationOrigin, setLocationOrigin] = useState<string>();
  useEffect(() => {
      config?.map((item: any) => {
          if (item.code == 'ten-mien-dvc') {
              setLocationOrigin(item.content)
          }
      })
  }, [config])

  useEffect(() => {
    const interval = setIntervalImmediately(async () => {
      await fetchDataInterval()
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, []);
  const intervalScroll = () => {
    let elapsedTime = Date.now() - startAt

    let playback = elapsedTime / DURATION
    setHoSos((curr) => {
      return curr.map((hoSo, index) => {
        if (index == 0) {
          return { ...hoSo, className: "hoso_fade-out" }
        } else if (index == 5) {
          return { ...hoSo, className: "hoso_fade-in" }
        }
        return hoSo
      })
    })
    setIsTransition(true)
    if (playback > 0 && playback < 1) {
      requestAnimationFrame(intervalScroll)
    } else {
      setTimeout(() => {
        setStartAt(Date.now())
        requestAnimationFrame(intervalScroll)
      }, DURATION)
    }
  }

  useLayoutEffect(() => {
    requestAnimationFrame(intervalScroll)
    // const interval = setInterval(() => { // k chạy khi tab bị inactive
    //   setHoSos((curr) => {
    //     return curr.map((hoSo, index) => {
    //       if(index == 0){
    //         return {...hoSo, className: "hoso_fade-out"}
    //       } else if(index == 4){
    //         return {...hoSo, className: "hoso_fade-in"}
    //       }
    //       return hoSo
    //     })
    //   })
    //   setIsTransition(true)
    // }, 2000)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [])

  function setIntervalImmediately(func: () => void, interval: number) {
    func();
    return setInterval(func, interval);
  }
  const fetchDataInterval = async () => {
    try {
      const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoDaCoKetQua({})

      
      const hoSos = res.data?.data.map((hoSo, index): HoSo => {
        if (index == 0) {
          return { ...hoSo, className: "" }
        }
        return { ...hoSo, className: "" }
      })
      setHoSos(hoSos)
    } catch (error) {
      console.log(error);
    }
  }

  const onAnimationEndFisrtLi = () => {
    setHoSos((curr) => {
      const resetClassNameHoSos = curr.map((hoSo, index) => {
        return { ...hoSo, className: "" }
      })
      const restHoSo = resetClassNameHoSos.slice(1)
      return [...restHoSo, resetClassNameHoSos[0]]
    })
    setIsTransition(false)
  }

  return (
    <div className=" col-sm-12 col-xs-12">
      <div className="title">
        <BarChartOutlined />
        {/* <span><i className="fa fa-line-chart"/></span> */}
        <span> Danh sách hồ sơ TTHC đã giải quyết</span>
      </div>
      <ul className="overflow-auto" style={{ overflow: "hidden", height: 200, padding: 0, margin: 0 }}>
        {hoSos.slice(0, isTransition ? 6 : 5).map((item, index) => {
          return (
            <li className={` item ${item.className}`} key={index}
              onTransitionEnd={(e) => {
                if (e.propertyName == "padding-bottom") {
                  onAnimationEndFisrtLi()
                }
              }}
              onClick={async () => {
                navigate(`/portaldvc/tra-cuu?MHS=${item?.maHoSo}`)
              }}
             
            >
              <span>{item.maHoSo} - <b>{item.chuHoSo}</b>
                {/* {moment(item.ngayHenTra).format("YYYT/MM/DD") > moment(item.ngayTra).format("YYYT/MM/DD")
                  ? <b style={{ color: 'green' }}> (Trước hạn)</b>
                  : <>
                    {moment(item.ngayHenTra).format("YYYT/MM/DD") == moment(item.ngayTra).format("YYYT/MM/DD")
                      ? <b style={{ color: '#333' }}> (Đúng hạn)</b>
                      : <b style={{ color: 'red' }}> (Quá hạn)</b>
                    }
                  </>
                } */}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
