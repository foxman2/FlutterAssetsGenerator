import * as path from 'path';
import * as vscode from 'vscode';
import { generateAssets } from './assetGenerator';
import { getConfig } from './config';

let fileSystemWatcher: vscode.FileSystemWatcher | undefined;

export function activate(context: vscode.ExtensionContext) {
  // 注册资源生成命令
  let disposable = vscode.commands.registerCommand('flutterAssetsGen.generate', () => {
    const config = getConfig();

    const rootPath = vscode.workspace.rootPath || '';
    const outputFile = path.join(rootPath, config.outputFile);

    try {
      generateAssets({
        ...config,
        outputFile,
      });
      vscode.window.showInformationMessage('Assets generated successfully!');
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to generate assets: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}
