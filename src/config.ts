import * as vscode from 'vscode';

export interface AssetsConfig {
    rootPath: string
    outputFile: string;
    className: string;
    autoDetection: boolean;
    pathIgnore: string[];
}

export function getConfig(): AssetsConfig {
    const config = vscode.workspace.getConfiguration('flutterAssetsGen');
    return {
        rootPath: vscode.workspace.rootPath || '',
        outputFile: config.get<string>('outputFile') || 'lib/generated/assets.dart',
        className: config.get<string>('className') || 'Assets',
        autoDetection: config.get<boolean>('autoDetection') ?? true,
        pathIgnore: config.get<string[]>('pathIgnore') || [],
    };
}
