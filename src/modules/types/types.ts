export type Target = {
  id: string;
  name: string;
  url: string;
  checkInterval: number;
  lastStatus?: StatusEntry;
  statusHistory?: StatusEntry[];
};

export type StatusEntry = {
  online: boolean;
  statusCode: number | null;
  responseTime: number | null;
  checkedAt: string;
};
