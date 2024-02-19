import React, { useEffect, useState } from 'react'
import { CompanyType } from '../../Types/CompanyType'
import { SubscriptionType } from '../../Types/SubscriptionType';
import { fetchSubscriptions } from '../../firestore';
import { format } from 'date-fns';


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
      // const storedSubscriptions = sessionStorage.getItem('subscriptions');
      // if (storedSubscriptions) {
      //   setSubscriptions(JSON.parse(storedSubscriptions).slice(0, 3))
      //   setsinglePurchases(JSON.parse(storedSubscriptions).slice(3, 5))
      //   setIsLoading(false)
      // } else {
      fetchSubscriptions().then((fetchedSubscriptions: SubscriptionType[]) => {
        if (fetchedSubscriptions) {
          setsinglePurchases(fetchedSubscriptions.slice(0, 2))
          setSubscriptions(fetchedSubscriptions.slice(2, 5))
          setIsLoading(false)
        }
      })
      // }
    }
  })

  // useEffect(() => {
  //   if (subscriptions) {
  //     sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  //   }
  // }, [subscriptions])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div className='border rounded p-2'>
        {companySubscription ? (
          <>
            {companySubscription.type === 3 || companySubscription.type === 4 || companySubscription.type === 5 ? (
              <div>
                <h2>Du har en aktiv prenumeration</h2>
                <p>Event kvar: {companySubscription.eventsLeft}</p>
                <p>Förnyas: {format(new Date(companySubscription.renewDate), 'yyyy-MM-dd')}</p>
                <p>pris: {companySubscription.price} kr/månad</p>
                <p>Prenumererat sedan: {format(new Date(companySubscription.subscribeDate), 'yyyy-MM-dd')}</p>
              </div>
            ) : companySubscription.type === 1 || companySubscription.type === 2 ? (
              <div>
                <h2>Du har oanvända evenemang att nyttja</h2>
                <p>Event kvar: {companySubscription.eventsLeft}</p>
              </div>
            ) : null}
          </>
        ) : (
          <h2>Du har inga evenemang att lägga upp</h2>
        )}
      </div>
      <div className="d-flex justify-content-around mt-2">
        {subscriptions && subscriptions.map((subscription) => (
          <div className='border rounded py-3 px-3 text-center' key={subscription.type}>
            <h4>{subscription.name}</h4>
            <p>{subscription.price} kr/månad</p>
            </div>
        ))}
      </div>
      <h2 className='text-center mt-4'>Köp extra event</h2>
      <div className="d-flex justify-content-around mt-2">
        {singlePurchases && singlePurchases.map((singlePurchase) => (
          <div className='border rounded py-3 px-3 text-center' key={singlePurchase.type}>
            <h4>{singlePurchase.name}</h4>
            <p>{singlePurchase.price} kr</p>
            </div>
        ))}
      </div>
    </div>
  );

}

export default CompanySubscriptions