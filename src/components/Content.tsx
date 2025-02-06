import classNames from 'classnames'
import React, { ReactNode } from 'react'

type Props = Readonly<{
    className?: string
    children: ReactNode
}>

const Content = ({ className = '', children }: Props) => {
  return (
    <div className={classNames(
        'w-[1140px] max-w-[80vw] ml-auto mr-auto',
        className
    )}>
        {children}
    </div>
  )
}

export default Content

