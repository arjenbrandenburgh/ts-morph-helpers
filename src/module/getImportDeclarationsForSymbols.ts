import { ts } from 'ts-morph';
import type { Symbol, ImportDeclaration } from 'ts-morph';
import { getDeclarationsForSymbols } from '../node/getDeclarationsForSymbols';

type Options = { onlyRelative: boolean };
type GetImportDeclarationsForSymbols = (symbols: Symbol[], options?: Options) => ImportDeclaration[];

/** Get import declarations for symbols (only ./relative ../imports by default) */
export const getImportDeclarationsForSymbols: GetImportDeclarationsForSymbols = (
  symbols,
  options = { onlyRelative: true },
) => {
  const declarations = getDeclarationsForSymbols(symbols);
  const importDeclarations = declarations
    .filter(
      declaration =>
        declaration.isKind(ts.SyntaxKind.ImportSpecifier) || declaration.isKind(ts.SyntaxKind.ImportClause),
    )
    .map(declaration => declaration.getFirstAncestorByKind(ts.SyntaxKind.ImportDeclaration))
    .filter((declaration): declaration is ImportDeclaration => Boolean(declaration));

  if (options.onlyRelative) {
    return importDeclarations.filter(declaration => declaration.isModuleSpecifierRelative());
  }

  return importDeclarations;
};
