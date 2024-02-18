import React, { useEffect, useState } from 'react'
import { CompanyType } from '../../Types/CompanyType'
import { SubscriptionType } from '../../Types/SubscriptionType';
import { fetchSubscriptions } from '../../firestore';

interface CompanySubscriptionsProps {
  company: CompanyType
}

function CompanySubscriptions({ company }: CompanySubscriptionsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[] | null>(null)
  const [singlePurchases, setsinglePurchases] = useState<SubscriptionType[] | null>(null)
  const [companySubscription, setCompanySubscription] = useState(company.subscription)

  useEffect(() => {
    if (!subscriptions) {
      const storedSubscriptions = sessionStorage.getItem('subscriptions');
      if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions).slice(0,3))
        setsinglePurchases(JSON.parse(storedSubscriptions).slice(3,5))
        setIsLoading(false)
      } else {
        fetchSubscriptions().then((fetchedSubscriptions: SubscriptionType[]) => {
          if (fetchedSubscriptions) {
            setSubscriptions(fetchedSubscriptions.slice(0, 3))
            setsinglePurchases(fetchedSubscriptions.slice(3, 4))
            setIsLoading(false)
          }
        })
      }
    }
  })

  useEffect(() => {
    if (subscriptions) {
      sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div className='border rounded p-2'>
        {
          // Render based on the value of stateVar
          (companySubscription.subscriptionID === 3 || companySubscription.subscriptionID === 4 || companySubscription.subscriptionID === 5) ? (
            <div>
              <h2>Du har en aktiv prenumeration</h2>
              <p>Event kvar: {companySubscription.eventsLeft}</p>
              <p>Förnyas: {companySubscription.eventsLeft}</p>
            </div>
          ) : companySubscription.subscriptionID === 99 ? (
            <h2>Du har inga evenemang att lägga upp</h2>
          ) : (
            <div>
              <h2>Du har oanvända evenemang att nyttja</h2>
              <p>Event kvar: {companySubscription.eventsLeft}</p>
            </div>
          )
        }
      </div>
      <div className="d-flex justify-content-around mt-2">
        {subscriptions ? (
          subscriptions.map((subscription) => (
            <div className='border rounded py-3 px-5' key={subscription.id}>{subscription.price}</div>
          ))
        ) : (
          null
        )}
      </div>

    </div>
  )
}

export default CompanySubscriptions