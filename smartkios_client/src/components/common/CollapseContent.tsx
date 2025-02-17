import { useState } from 'react'
import { IWithChildren } from '../../types'
import { AntdButton } from '../../lib/antd/components/button/Button'
import { Col, Row } from 'antd'
import { AntdModal } from '../../lib/antd/components'

export interface ICollapseContentProps extends IWithChildren{
  defaultVisible?: boolean,
  extraButtons?: React.ReactNode[],
}

export const CollapseContent = ({ children, extraButtons, defaultVisible}: ICollapseContentProps) => {
  const [open, setOpen] = useState(defaultVisible)
  return (
    <div>
      <Row className='d-flex' justify="end" gutter={[16,16]}>
        <Col>
          <AntdButton onClick={() => setOpen(curr => !curr)}>Tìm kiếm</AntdButton>
        </Col>
        {extraButtons?.length ? extraButtons.map((button, index) => {
          return <Col key={index}>
          {button}
        </Col>
        }): null}
        
      </Row>
      <div className={`collapse-content-wrapper ${open ? `opened` : ``}`}>
        {children}
      </div>
    </div>

  )
}
