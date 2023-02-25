export interface Symbol {
  name: string;
  exchange: string;
  pair: { base: string, term: string };
  bid: { px: number, qty: number };
  ask: { px: number, qty: number };
}
