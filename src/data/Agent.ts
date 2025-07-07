export interface Agent {
  id: string;
  name: string;
  email: string;
  role: "agent" | "admin";
  orgId: string;
}

// Sample agents
export const agents: Agent[] = [
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
];