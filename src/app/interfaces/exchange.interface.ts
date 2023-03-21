export interface Exchange {
  id: string;
  name: string;
  description: string;
  markets: Array<string>;
  key: string;
  secret: string;
  extra: string;
  enabled: boolean;
}
