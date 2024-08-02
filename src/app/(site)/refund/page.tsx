import { Heading } from '@/components/Global/BasicComponents';
import React from 'react'

const RefundPolicy = () => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto p-[2rem] min-h-[90vh]" id="22">
      <Heading>REFUNDS AND CANCELLATIONS</Heading>
      <h1>
        You are entitled to cancel Your Order within 7 days without giving any
        reason for doing so.
      </h1>
      <h1>
        The deadline for applying the refund is 7 days from the day of your
        payment.
      </h1>
      <h1>
        In order to exercise Your right of cancellation, You must inform Us of
        your decision by means of a clear statement. You can inform us of your
        decision by:
      </h1>
      <ul className="list-disc list-inside">
        <li>By Email : refunds@eomr.in</li>
      </ul>

      <h1>Refunds will only be provided in the following cases: </h1>
      <ul className="list-disc list-inside">
        <li>
          If you haven&apos;t attempted any test from the module of which you
          have made payment.
        </li>
        <li>
          If you have intimate us within 7 days of the date of your purchase.
        </li>
      </ul>

      <h1>
        If you satisfy above conditions, we will process your refund within the
        next 7 days of approving of your request of refund.
      </h1>
      <h1>
        We reserve the right to not reimburse the refund in case we found
        irregularities, fraud, or any other reason.{" "}
      </h1>
      <h1>
        If you have any questions about our Returns and Refunds Policy, please
        contact us by email: refunds@eomr.in
      </h1>
    </div>
  );
}

export default RefundPolicy
