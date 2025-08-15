import * as vscode from 'vscode';
import { generateAssets } from './assetGenerator';
import { AssetsConfig, getConfig } from './config';

let fileSystemWatchers: vscode.FileSystemWatcher[] = [];

export function activate(context: vscode.ExtensionContext) {
  // 注册资源生成命令
  let disposable = vscode.commands.registerCommand('flutterAssetsGen.generate', () => {
    try {
      generateAssets(getConfig());
      vscode.window.showInformationMessage('Assets generated successfully!');
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to generate assets: ${error}`);
    }
  });

  context.subscriptions.push(disposable);

  // 初始设置文件监听
  setupFileWatcher(getConfig());

  // 监听配置变化
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('flutterAssetsGen')) {
        setupFileWatcher(getConfig());
      }
    })
  );
}

let debounceTimer: NodeJS.Timeout | undefined;

function setupFileWatcher(config: AssetsConfig) {
  if (config.autoDetection) {
    startFileWatcher(config);
  } else {
    stopFileWatcher();
  }
}

function startFileWatcher(config: AssetsConfig) {
  // 清理现有的 watchers
  stopFileWatcher();

  // 为每个资源目录创建文件系统监听器
  fileSystemWatchers = config.assetsDirs.map(assetsDir => {
    const pattern = new vscode.RelativePattern(assetsDir, '**/*');
    const watcher = vscode.workspace.createFileSystemWatcher(pattern);

    // 监听文件变化事件
    const handleChange = () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      // 使用防抖，避免频繁生成
      debounceTimer = setTimeout(() => {
        const currentConfig = getConfig();
        try {
          generateAssets(currentConfig);
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to regenerate assets: ${error}`);
        }
      }, 500); // 500ms 防抖延迟
    };

    // 注册文件变化事件处理
    watcher.onDidCreate(handleChange);
    watcher.onDidChange(handleChange);
    watcher.onDidDelete(handleChange);

    return watcher;
  });
}

function stopFileWatcher() {
  // 清理所有监听器
  fileSystemWatchers.forEach(watcher => watcher.dispose());
  fileSystemWatchers = [];

  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }
}

