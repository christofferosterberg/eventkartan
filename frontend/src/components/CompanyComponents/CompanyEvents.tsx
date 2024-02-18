import React from 'react'
import { CompanyType } from '../../Types/CompanyType'

interface CompanyEventsProps {
    company: CompanyType
}

function CompanyEvents({company} : CompanyEventsProps) {
  return (
    <div>{company.email}</div>
  )
}

export default CompanyEvents