import { useEffect, useState } from 'react'
import { IWithChildren } from '../../types'
import { AntdButton } from '../../lib/antd/components/button/Button'
import { Badge, Col, Row, Space } from 'antd'
import { AntdModal } from '../../lib/antd/components'
import { useAppSelector } from '@/lib/redux/Hooks'

export interface ICollapseContentProps extends IWithChildren {
  defaultVisible?: boolean,
  extraButtons?: React.ReactNode[],
  typeHoSo?: boolean,
  textButton?: string,
}

export const CollapseContent = ({ children, extraButtons, defaultVisible, typeHoSo = false, textButton= "Tìm kiếm" }: ICollapseContentProps) => {
  const [open, setOpen] = useState(defaultVisible)
  const { maHoSo } = useAppSelector((state) => state.hoso);

  useEffect(() => {
    setOpen(defaultVisible)
  }, [defaultVisible])

  return (
    <div style={{position: 'relative'}}>
      <Row className='d-flex' justify="end" gutter={[16, 16]}>
        <Col>
          <AntdButton onClick={() => setOpen(curr => !curr)} className='search-collapse-btn'>{textButton} <i className="fa-solid fa-magnifying-glass ms-2"></i></AntdButton>
        </Col>
        {extraButtons?.length ? extraButtons.map((button, index) => {
          return <Col key={index} >
            {button}
          </Col>
        }) : null}

      </Row>
      <div className={`collapse-content-wrapper ${open ? `opened` : ``}`}>
        <div className='childSearch'>
          {children}
        </div>
        {typeHoSo
          ?
          <Space direction="horizontal" className="noteColorHoSo">
            <Badge color="rgb(248, 121, 3)" text="Tới hạn" />
            <Badge color="rgb(233, 19, 19)" text="Quá hạn" />
            <Badge color="#333" text="Trong hạn" />
          </Space>
          : null
        }

      </div>
    </div>

  )
}
