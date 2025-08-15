# Flutter Assets Generator VS Code Extension

This VS Code extension scans your Flutter project's assets directory and generates a Dart class with constants for each asset.

## Features
- Configure asset directory, output file, class name, and ignored extensions
- Trigger generation via Command Palette: `Flutter: Generate Assets`

## Usage
1. Set your configuration in VS Code settings (`flutterAssetsGen.*`)
2. Run the command `Flutter: Generate Assets`

## Configuration Options
- `flutterAssetsGen.assetsDir` (default: `assets`)
- `flutterAssetsGen.outputFile` (default: `lib/generated/assets.dart`)
- `flutterAssetsGen.className` (default: `Assets`)
- `flutterAssetsGen.ignoreExtensions` (default: [".ttf", ".otf"])
