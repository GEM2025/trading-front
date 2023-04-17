export interface Step {
  side: string;
  name: string;
  exchange: string
}

export interface Opportunity {
  id: number;
  a: Step;
  b: Step;
  c?: Step;
  volume: number;
  trade: number;
}




