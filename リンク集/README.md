# SNS Links

おしゃれなSNSリンク集サイト。ライトモード・ダークモード対応で、JSONで管理できるシンプルなリンク集です。

## 機能

- **ライト/ダークモード切替** — 右下のボタン（太陽/月アイコン）で即座に切り替え可能。設定はブラウザに保存されます。
- **JSON管理** — SNSのリンク情報は `links.json` で一元管理。追加・編集が簡単です。
- **SVGアイコン** — 各SNSのアイコンはSVGで提供。カスタマイズ可能です。
- **レスポンシブデザイン** — モバイル対応。
- **アクセシビリティ** — キーボード操作とスクリーンリーダー対応。

## ファイル構成

```
.
├── index.html          # メインのHTMLファイル
├── styles.css          # スタイル（ライト/ダークモード対応）
├── script.js           # JavaScriptロジック（テーマ管理、JSON読み込み）
├── links.json          # SNSリンク情報（JSONフォーマット）
├── icons/              # SVGアイコン格納フォルダ
│   ├── avatar.svg
│   ├── twitter.svg
│   ├── instagram.svg
│   ├── facebook.svg
│   ├── youtube.svg
│   └── github.svg
└── README.md           # このファイル
```

## 使い方

### ローカルで実行

ブラウザの CORS 制限を避けるため、ローカルサーバーで実行してください。

**Python 3 を使う場合：**
```bash
cd "C:\Users\yu34\Downloads\まんさん　リンク集"
python -m http.server 8000
```

その後、ブラウザで `http://localhost:8000` を開きます。

### SNSリンクの追加・編集

`links.json` ファイルを編集して、SNSのリンク情報を管理します。

**JSON フォーマット例：**
```json
[
  {
    "name": "Twitter",
    "url": "https://twitter.com/your-handle",
    "icon": "twitter.svg",
    "description": "ツイートしてます。フォローお待ちしてます！"
  },
  {
    "name": "GitHub",
    "url": "https://github.com/your-username",
    "icon": "github.svg",
    "description": "コードを公開しています。PRも歓迎です。"
  }
]
```

各フィールド：
- `name` — SNS名（カードに表示されます）
- `url` — SNSのプロフィールURL
- `icon` — アイコンファイル名（`icons/` フォルダ内のSVGファイル）
- `description` — 説明文（カードに表示されます）

### アイコンのカスタマイズ

`icons/` フォルダ内のSVGファイルを編集するか、新しいSVGを追加してください。JSONの `icon` フィールドでそのファイル名を指定します。

### プロフィール画像の変更

`icons/avatar.svg` をあなたのプロフィール画像に置き換えるか、JSONで管理できるように拡張します。

## テーマについて

- **ライトモード** — 明るい背景と暗いテキスト
- **ダークモード** — 暗い背景と明るいテキスト

設定はブラウザの `localStorage` に保存され、次回アクセス時も同じモードが適用されます。

## カスタマイズ

### 色を変更

`styles.css` の `:root` セクションを編集します：

```css
:root {
  --bg: #ffffff;         /* ライト背景色 */
  --text: #111827;       /* ライトテキスト色 */
  --muted: #6b7280;      /* ライト補助色 */
  --card: #f8fafc;       /* ライトカード色 */
  --accent: #1d4ed8;     /* アクセントカラー */
}

body.dark {
  --bg: #0b1220;         /* ダーク背景色 */
  --text: #e6eef8;       /* ダークテキスト色 */
  --muted: #9aa6b2;      /* ダーク補助色 */
  --card: #071127;       /* ダークカード色 */
  --accent: #60a5fa;     /* ダークアクセント色 */
}
```

### フォントを変更

`styles.css` の `body` セクション内、`font-family` を編集します。

### レイアウトを調整

`styles.css` の `.links-grid` や `.card` セクションで、幅やパディング、ギャップなどを調整できます。

## ブラウザ対応

- Chrome / Edge （推奨）
- Firefox
- Safari
- モバイルブラウザ

## ライセンス

自由に使用・編集・配布してください。
