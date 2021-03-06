---
title: PythonでLINE Notifyに通知を送る
date: '2018-11-30'
categories: Python
tag:
- python
slug: linenotify
---
## LINE Notifyとは？

LINE Notifyのヘルプによると、  

>LINE Notifyとはどんなサービスですか?
>>Webサービスと連携すると、LINEが提供する公式アカウント「LINE Notify」から通知を受信する事ができるサービスです。

IFTTTやGitHubと連携して色々な通知を受け取ることができるwebサービスですが、提供されているAPIを利用すればwebサービスを利用しなくても通知を送受信できるようなので利用してみました。

## アクセストークンを取得

[https://notify-bot.line.me/my/](https://notify-bot.line.me/my/)の`トークンを発行する`をクリック。
![notifytop](../../../images/linenotify.jpg)

トークン名を記入して`1:1でLINE Notifyから通知を受け取る`を選択して`発行する`を押す。

![tokenname](../../../images/linenotify2.jpg)

トークンが発行されたのでコピーしてメモ帳などに一時的に保管しておきましょう。

![token](../../../images/linetoken.jpg)

## テスト送信

pythonのrequestsライブラリを使ってテスト送信。

```python

#!  /usr/bin/env python
#-*- coding: utf-8-*-

import requests

def line():
    url = "https://notify-api.line.me/api/notify"
    token = "発行されたトークンをここに記入"
    headers = {"Authorization": "Bearer " + token}
    message = 'テスト'
    payload = {"message":  message}
    requests.post(url, headers=headers, params=payload)


if __name__ == '__main__':
    line()

```

line.pyで保存して実行`py -3 line.py`

![linetest](../../../images/linetest.jpg)

無事成功！  
次回はスクレイピングした情報をLINEで通知するを試してみます。
