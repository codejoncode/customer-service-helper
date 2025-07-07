export interface Organization {
  actions: ActionDefinition[];
}

export interface ActionDefinition {
  id: string;
  label: string;
  defaultArticleId?: string;
}