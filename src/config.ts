import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as vscode from 'vscode';

export interface AssetsConfig {
    rootPath: string
    assetsDirs: string[];
    outputFile: string;
    className: string;
    autoDetection: boolean;
    pathIgnore: string[];
}

export function getConfig(): AssetsConfig {
    const config = vscode.workspace.getConfiguration('flutterAssetsGen')
    const rootPath = vscode.workspace.rootPath || '';
    const outputFile = path.resolve(rootPath, config.get<string>('outputFile'))
    return {
        rootPath: rootPath,
        assetsDirs: getAssetsDirs(rootPath),
        outputFile: outputFile,
        className: config.get<string>('className'),
        autoDetection: config.get<boolean>('autoDetection'),
        pathIgnore: config.get<string[]>('pathIgnore'),
    };
}

// 在pubspec.yaml中配置的assets目录
function getAssetsDirs(rootPath: string): string[] {
    const pubspecPath = path.resolve(rootPath, 'pubspec.yaml');
    if (!fs.existsSync(pubspecPath)) {
        throw new Error(`pubspec.yaml not found at ${pubspecPath}`);
    }
    const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
    const pubspec = yaml.load(pubspecContent) as any;

    const assets: string[] = [];
    let yamlAssets = pubspec.flutter.assets as string[]
    yamlAssets = yamlAssets.sort()
    for (var asset of yamlAssets) {
        if (typeof asset === 'string') {
            asset = path.resolve(rootPath, asset); // 确保路径是绝对的
            assets.push(asset.replace(/\/$/, '')); // 去除末尾斜杠
        }
    }
    return assets.map(asset => path.resolve(process.cwd(), asset));
}