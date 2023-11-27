import * as React from 'react'

interface Props {
  children: React.ReactNode
  value: number
  index: number
  other: string
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-3">{children}</div>}
    </div>
  )
}

export default TabPanel
