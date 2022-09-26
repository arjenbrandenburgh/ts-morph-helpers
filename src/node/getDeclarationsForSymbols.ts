import type { Symbol } from 'ts-morph';

const getDeclarationsForSymbol = (symbol: Symbol) => symbol.getDeclarations();

export const getDeclarationsForSymbols = (symbols: Symbol[]) => {
  const declarations = symbols.map(getDeclarationsForSymbol).flat().filter(Boolean);
  return [...new Set(declarations)];
};
