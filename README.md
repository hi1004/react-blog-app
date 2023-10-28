# ICHIGOICHIE - React Blog

### 📌 概要

## [🔗 ICHIGOICHIE React Blog Link](https://ichigoichie-83333.web.app/)

## 1. プロジェクト紹介

> 勉強会のメンバーに勉強・学習した情報を書き込む技術ブログを活用する目的で作りました。

<center>

![light mode]("https://github.com/hi1004/react-blog-app/blob/main/public/images/screenshot-1.png?raw=true") ![dark mode]("https://raw.githubusercontent.com/hi1004/react-blog-app/main/public/images/screenshot-2.png")

</center>

<br/>

## 2. 開発環境

### 2.1 技術

| フロントエンド                                                                                                                                                                                                                                                                                                                                 | バックエンド                                                                                               | バージョン、イシュー管理                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><br> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"><br/><img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> | <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"> | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"><br/><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> |

### 2.2 パッケージモジュール

<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"><br/><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white"> <img src="https://img.shields.io/badge/React Router Dom-CA4245?style=for-the-badge&logo=React Router&logoColor=white"><br/><img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"> <img src="https://img.shields.io/badge/react_hook_form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

- react-toastify
- ract-slick
- toastify-ui/editor
- react-toggle-dark-mode
- firestore

## 3. コア機能

### 3.1 ログイン・ログアウト・新規会員登録

- ログイン: 認証されたユーザーのみ、ブログ書く・閲覧できます。
- 新規会員登録: 会員登録で全てのサービスが利用できます。
- 信用できるGoogleの`firebaseーAuth`で認証し、`React Hook Form`で簡単にログインできるようにしました。
- `React Router Dom`でrouter機能を実装し、認証されていない方にはログインページを見せるようにしました。
- パスワード入力時に右側にある目のマークを長押しすると、パスワード情報が見れます。

### 3.2 CRUD

- `NoSQL DataBase`であるfirebaseの `firestore`で データを管理します。
- C(create): ブログを書くページのフォームでは、`React Hook Form`と`Toast UI Editor`で実装しました。
- R(read): ブログを読み込むブログリストページでは、`FormList` componentで再利用性を高め、プロフィールやホームページなどにも見えるようにしています。
- U(update): ブログを修正する機能は自分の投稿のみ修正できるようにしました。別のアカウントでログインしたら、修正ができません。
- D(delete): ブログを削除する機能もupdateと同じく機能しています。
- `React Toastify`ライブラリーを利用し、ログイン、会員登録、ログアウト、CRUDなど実行した後は右上に状態メッセージが見えるようになっています。

### 3.3 ダークモード

- `react toggle dark mode`で簡単にダークモードのUIを向上させました。
- `useContext`でダークモードを実装しました。
- `Tailwind css`でclass名を`dark:`にするだけで簡単にダークモードによるUIを変えるようにしました。

### 3.4 レスポンシブ

- モバイル環境でも使えるようにレスポンシブデザインにしました。
- `Tailwind css`を利用したため、モバイル優先デザインです。
- `React Slick`ライブラリで簡単なスライドを実装しました。
