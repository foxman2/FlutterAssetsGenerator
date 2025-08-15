# Flutter Assets Generator

A Visual Studio Code extension that automatically generates Dart asset references from your Flutter assets directory.

## Features

- Automatically generate asset class from your assets directory
- Support for various image formats (PNG, JPG, JPEG, GIF, WebP, SVG)
- Customizable output path and class name
- Auto-detection of file changes
- Ignore specific paths or file types
- Smart variable naming based on directory structure

## Installation

1. Install through VS Code extensions
2. Clone the repository and build locally:
   ```bash
   git clone https://github.com/foxman2/FlutterAssetsGenerator.git
   cd FlutterAssetsGenerator
   npm install
   npm run package
   ```

## Usage

1. Open your Flutter project in VS Code
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Flutter: Generate Assets" and press Enter

The extension will generate a Dart class with static const strings for all your assets.

Example output:
```dart
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: constant_identifier_names
class Assets {
  static const String avatarUser = 'assets/images/avatar_user.png';
  static const String iconsHome = 'assets/images/icons/home.png';
  static const String iconsSettings = 'assets/images/icons/settings.png';
}
```

## Configuration

This extension contributes the following settings:

* `flutterAssetsGen.outputFile`: The output file path for generated assets class
* `flutterAssetsGen.className`: The name of the generated assets class
* `flutterAssetsGen.autoDetection`: Whether to automatically regenerate assets when files change
* `flutterAssetsGen.pathIgnore`: Paths to ignore (relative to assets directory)
* `flutterAssetsGen.leadingWithPackageName`: Whether to include package name as prefix in asset paths

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
