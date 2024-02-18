import React from 'react'
import { CompanyType } from '../../Types/CompanyType'

interface CompanyEventsProps {
    company: CompanyType
}

function CompanyEvents({company} : CompanyEventsProps) {
  return (
    <div>{company.contactEmail}</div>
  )
}

export default CompanyEvents