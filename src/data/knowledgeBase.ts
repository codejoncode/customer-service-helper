// In knowledgeBase.ts
export interface KnowledgeBaseEntry {
  reason: string;
  required: string[];
  template: string;
  url: string;
  fullArticle: string;
}

export const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    reason: "Reset Password",
    required: [
      "Verify identity with a security code",
      "Ensure the new password is at least 8 characters long",
    ],
    template: `Call Reason: Reset Password\nActions Taken:\n- Verified customer's identity using a security code\n- Explained new password policy`,
    url: "/articles/reset-password",
    fullArticle: `
      If a customer is unable to log in, begin by verifying their identity with a security code. 
      Once verified, guide them through the reset process. 
      **Required:** Verify identity with a security code. 
      **Required:** Password must be at least 8 characters long and should include a mix of letters and numbers.
    `,
  },
  {
    reason: "Change Shipping Address",
    required: [
      "Confirm identity before making any changes",
      "Explain changes may delay shipment by 1–2 business days",
    ],
    template: `Call Reason: Change Shipping Address\nActions Taken:\n- Verified identity before modifying delivery info\n- Notified customer of possible 1–2 day delay`,
    url: "/articles/change-shipping-address",
    fullArticle: `
      If a customer requests to update their shipping address post-order, identity must be verified before any changes are processed. 
      In many cases, changing the shipping address will require rerouting through the logistics system, which may cause **Required:** a 1–2 business day delay.
      **Required:** Confirm identity with at least two authentication elements (e.g., name, order number, billing ZIP).
    `,
  },
  {
    reason: "Activate Warranty",
    required: [
      "Collect product serial number and proof of purchase",
      "Inform customer the warranty will be active within 24 hours",
    ],
    template: `Call Reason: Activate Warranty\nActions Taken:\n- Gathered serial number and verified purchase date\n- Confirmed warranty activation timeline (within 24 hours)`,
    url: "/articles/activate-warranty",
    fullArticle: `
      Customers may activate warranty coverage within 30 days of purchase. 
      **Required:** Collect the serial number found on the product or packaging, along with a digital or physical proof of purchase.
      The warranty system processes entries every evening, so **Required:** inform customers that activation should occur within 24 hours.
    `,
  },
  {
    reason: "Reschedule Installation Appointment",
    required: [
      "Verify the customer's current appointment window",
      "Inform about available slots and potential delays",
    ],
    template: `Call Reason: Reschedule Installation\nActions Taken:\n- Confirmed existing appointment\n- Reviewed open time slots with customer`,
    url: "/articles/reschedule-installation",
    fullArticle: `
      When customers need to move their installation date, check the CRM system for their existing scheduled window. 
      **Required:** Verify and confirm the original time slot.
      Provide options for rescheduling, noting that **Required:** availability may vary and could introduce delays of up to 3 days.
    `,
  },
];