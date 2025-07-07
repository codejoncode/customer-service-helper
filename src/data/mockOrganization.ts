import { OrganizationProfile } from "./OrganizationProfile";

export const mockOrganization: OrganizationProfile = {
  id: "org-healthsecure",
  name: "HealthSecure",
  agents: [
    {
      id: "agent-001",
      name: "Maria Thompson",
      email: "maria@healthsecure.org",
      role: "agent",
      orgId: "org-healthsecure",
    },
    {
      id: "agent-002",
      name: "David Reyes",
      email: "david@healthsecure.org",
      role: "agent",
      orgId: "org-healthsecure",
    },
    {
      id: "agent-003",
      name: "Alana Cho",
      email: "alana@healthsecure.org",
      role: "admin",
      orgId: "org-healthsecure",
    },
  ],
  memberProfiles: [
    {
      memberId: "ABC123456",
      name: "John Doe",
      dob: "01/15/1982",
      phone: "555-123-9876",
      streetAddress: "123 Elm St",
      city: "Chicago",
      state: "IL",
      zipcode: "60610",
    },
    {
      memberId: "XYZ789101",
      name: "Jane Smith",
      dob: "07/28/1975",
      phone: "555-768-4312",
      streetAddress: "456 Maple Ave",
      city: "Evanston",
      state: "IL",
      zipcode: "60201",
    },
  ],
  actions: [
    "Changed PCP",
    "Provided Specialist Directory",
    "Updated Member Info",
    "Explained Plan Options",
    "Submitted Claim Inquiry",
    "Verified Coverage",
    "Escalated to Nurse Line",
    "Reviewed Referral Requirement",
    "Resent ID Cards",
    "Updated Email Preferences",
  ],
  articles: [
    {
      id: "article-001",
      title: "How to Change Your Primary Care Provider",
      url: "https://healthsecure.org/articles/change-pcp",
      mustSay: [
        "The new PCP becomes effective within 24 hours",
        "Only one PCP change is allowed per month",
        "Emergency services do not require a PCP",
      ],
      callReasons: ["change PCP", "doctor switch", "primary care update"],
    },
    {
      id: "article-002",
      title: "Finding a Specialist in Your Network",
      url: "https://healthsecure.org/articles/specialist-directory",
      mustSay: [
        "Referrals may be required for some specialties",
        "Confirm the specialist is in-network before scheduling",
        "Directory is updated weekly",
      ],
      callReasons: ["find specialist", "referral needed", "doctor search"],
    },
    {
      id: "article-003",
      title: "Understanding Your Claim Status",
      url: "https://healthsecure.org/articles/claim-status",
      mustSay: [
        "Claims are processed within 10–14 business days",
        "Appeals can be submitted within 60 days of denial",
        "We recommend checking your explanation of benefits (EOB)",
      ],
      callReasons: ["check claim", "claim denied", "billing question"],
    },
  ],
  endCallFlow: [
    {
      id: "issue-resolved",
      label: "Was the issue resolved?",
      required: true,
    },
    {
      id: "additional-questions",
      label: "Did you ask if they had any additional questions?",
      required: true,
    },
    {
      id: "closing-thanks",
      label: "Did you thank the caller for contacting HealthSecure?",
      required: true,
    },
  ],
  reasonsForCall: [
    {
      id: "reason-pcp",
      label: "Change PCP",
      relatedArticles: ["article-001"],
    },
    {
      id: "reason-specialist",
      label: "Find a Specialist",
      relatedArticles: ["article-002"],
    },
    {
      id: "reason-claim",
      label: "Check Claim Status",
      relatedArticles: ["article-003"],
    },
  ],
};