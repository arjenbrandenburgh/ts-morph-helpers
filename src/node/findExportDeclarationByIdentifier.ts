import { Identifier } from 'ts-morph';
import type { SourceFile } from 'ts-morph';

export const findExportDeclarationByIdentifier = (sourceFile: SourceFile, identifier: Identifier) =>
  sourceFile.getExportDeclaration(exportDeclaration => {
    const namedExports = exportDeclaration.getNamedExports();
    return Boolean(namedExports.find(namedExport => namedExport.getName() === identifier.getText()));
  });
