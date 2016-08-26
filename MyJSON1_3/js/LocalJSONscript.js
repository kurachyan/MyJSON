"use strict";
/*
	ＪＳＯＮ専用パッケージ

	(内容)
	ＪＳＯＮ関連の管理・操作を行う。
    （その他）
    ＪＳＯＮパッケージ情報			'16.08.16
*/
(function (window) {
    let jsonID = null;         // ＪＳＯＮパッケージＩＤ
    let JSONFlag = new Boolean(false);     // ＪＳＯＮパッケージ運用
    let jsonbuf;
    let Table = new Array();
    let pos;

    // Map Table Item
    const dfM1 = {
        key: null,			// Map　：　Key
        value: null,		// Map　：　Value

        set Key(valuedata) { this.key = valuedata; },
        set Value(valuedata) { this.value = valuedata; },
        get Key() { return this.key; },
        get Value() { return this.value; }
    };

    function LocalJSONScript() {
        // Local JSON Script Module
        this.Init = function (wkey, wvalue) {
            // 初期領域作成
            let m1 = Object.create(dfM1);     // テンプレートを取り出し
            m1.Key = wkey;					// Ｋｅｙ情報設定
            m1.Value = wvalue;				// Ｖａｌｕｅ情報設定

            return m1;						// 新しい初期領域を返す。
        };
        this.Start = function () {
            // Start JSON Job
            jsonbuf = new String();

            if (window.JSON) {
                // document.getElementById("footinfo").innerHTML = "JSON動作可能です。";
                JSONFlag = true;
            }
            pos = 0;
        };
        this.End = function () {
            // End JSON Job
            //			delete jsonbuf;
            JSONFlag = false;
        };
        this.Check = function () {
            // Check JSON Flag
            return (JSONFlag);
        };
        this.Encode = function (value) {
            // JSON生成
            if (window.JSON) {          // JSON動作可能か？
                jsonbuf = JSON.stringify(value);       // JSON生成
            }

            return (jsonbuf);
        };
        this.Decode = function () {
            // JSON復号
            if (window.JSON) {          // JSON動作可能か？
                let obj = JSON.parse(jsonbuf);
                for (var id in obj) {   // プロパティ登録分、繰り返す
                    let item = this.Init(id, obj[id]);
                    Table.push(item);
                    pos++;
                }
            }
        };
        this.ReEncode = function () {
            // Tableを基に、JSONを再生成
            jsonbuf = "";               // 登録情報クリア
            if (window.JSON) {          // JSON動作可能か？
                if (Table.length != 0) {        // Table登録有り？
                    jsonbuf = "{"
                    for (let i = 0; i < this.Length() ; i++) {    // Table登録分、繰り返す
                        if (i==this.Length()-1) {
                            jsonbuf += "\"" + Table[i].Key + "\":"+ Table[i].Value;
                        } else {
                            jsonbuf += "\"" + Table[i].Key + "\":" + Table[i].Value + ",";
                        }
                    }
                    jsonbuf += "}";
                }
//                jsonbuf = JSON.stringify(Table);       // JSON生成
            }

            return (jsonbuf);
        };
        this.Clear = function () {
            // 情報クリア
            if (jsonbuf.length != 0) {      // 登録情報有り？
                jsonbuf = "";               // 登録情報クリア
            }
            if (Table.length != 0) {        // Table登録有り？
                do {                        // Table登録分、繰り返す
                    Table.pop();            // Table登録を削除
                } while (Table.length != 0);
            }
            pos = 0;
        };
        this.Length = function () {
            // Table Length 確認
            return (pos);
        };
        this.GetKey = function (wpos) {
            // Table指定位置から、Key情報を取り出す
            if ((wpos > 0) && (wpos < Table.length)) {
                return (Table[wpos].Key);
            } else {
                return ("");
            }
        };
        this.GetValue = function (wpos) {
            // Table指定位置から、Value情報を取り出す
            if ((wpos > 0) && (wpos < Table.length)) {
                return (Table[wpos].Value);
            } else {
                return ("");
            }
        };
        this.SearchKey = function (wkey) {
            // Ｋｅｙ情報を基に、Table位置を取り出す
            let wpos = -1;       // -1:未検出

            if ((Table.length == 0) || (pos == 0)) {    // Table未登録？
                return (-1);       // -1:未検出
            }
            if (wkey.length == 0) {     // 検索Key情報が未定義？
                return (-1);       // -1:未検出
            }

            for (let i = 0; i < Table.length; i++) {
                // 登録情報の全てを検索する
                if (Table[i].Key == wkey) {     // 該当情報を検出？
                    wpos = i;
                    break;
                }
            }
            return (wpos);
        };
    }

    window.LocalJSONScript = LocalJSONScript;
}(window));
