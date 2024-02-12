import React from 'react'
import { CompanyType } from '../../Types/CompanyType'

interface CompanySubscriptionsProps {
    company: CompanyType
}

function CompanySubscriptions({company}: CompanySubscriptionsProps) {
  return (
    <div>{company.id}</div>
  )
}

export default CompanySubscriptions