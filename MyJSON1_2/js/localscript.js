"use strict";
/*
	プロジェクト専用パッケージ

	(内容)
	処理で使う要素の管理・操作を行う。
    プロジェクトでのみ使うモノだけを、此処に記述する。
    汎用性の高いモノから順に従来の場所へあげる。

    （注意）
    ・リソース関連を扱う、WebStorage
    ・周期起動や並行処理の為の、Worker
    これら二つは、専用の別ファイルを作成して対応する事。
*/

(function (window) {
    const dfInterval = 1000;      // １秒周期
    let timerID = null;         // 周期起動タイマーＩＤ
    let TimerFlag = new Boolean(false);     // タイマー運用
    let TimerInterval = dfInterval;

    function LocalTimerScript() {
        // Local Timer Script Module
        this.BootTimer = function () {
            // Boot Interval_Timer
            if (timerID == null) {      // タイマー未稼働？
                // タイマー稼働
                timerID = setInterval("iTimer()", TimerInterval);
//                document.getElementById("footinfo").innerHTML = "Timer稼働中です。";

                TimerFlag = true;       // タイマー稼働
            }
/*
            else
            {
                // 稼働済み
                document.getElementById("footinfo").innerHTML = "二重稼働は出来ません。";
            }
*/
        };
        this.StopTimer = function () {
            // Stop Interval_Timer
            clearInterval(timerID);         // タイマー停止
            timerID = null;
            TimerFlag = false;

//            document.getElementById("footinfo").innerHTML = "待機中です。";
        };
        this.CheckTimer = function () {
            // Check_Status Interval_Timer
            return(TimerFlag);
        };
        this.ChangeTimer = function (interval) {
            // Change Timer Interval
            TimerInterval = interval;           // タイマー値変更

            if (TimerFlag == true) {
                // タイマー稼働中
                clearInterval(timerID);         // タイマー停止

                timerID = setInterval("iTimer()", TimerInterval);   // タイマー稼働
            }
        };
    }

    window.LocalTimerScript = LocalTimerScript;
}(window));


function setLogTime() {
    // ログＴｉｍｅの更新
    const t_month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const t_day = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
                   "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
                   "21th", "22th", "23th", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31th"];
    const t_ampm = ["am", "pm"]
    let today = new Date();
    let w_y = today.getFullYear();  // 年情報（４桁）
    let w_mo = today.getMonth();     // 月情報（０相対）
    let w_d = today.getDate();      // 日情報（１相対）
    let w_h = today.getHours() % 12;  // 時情報（０相対）
    let w_ampm = today.getHours() / 12;  // AM/PM
    let w_mi = today.getMinutes();  // 分情報（０相対）
    let w_s = today.getSeconds();   // 秒情報（０相対）

    // 時刻情報返送
    let txt = t_month[w_mo] + " " + t_day[w_d - 1] + " " + w_y + ", ";
    txt += w_h + "：" + w_mi + "：" + w_s + " ";
    if (w_ampm == 0) {
        txt += t_ampm[0];    // set "am"
    } else {
        txt += t_ampm[1];    // set "pm"
    }

    //    delete today;
    return (txt);
}

function iTimer() {
    // インターバル
    let txt3 = setLogTime();    // ログＴｉｍｅの更新
    document.getElementById("timeinfo").innerHTML = txt3;
}

function resultLog(dateLog, TodoLog) {
    // コンソールＬｏｇ出力
    //      console.log("日付け　：　"+dateLog);
    //      console.log("メッセージ　:　"+TodoLog);
    let txt = "日付け : " + dateLog;
    txt += "\nメッセージ : " + TodoLog;

    // IE11使用
    //  console.log(txt);
    //  alert(txt);
    // Windows Store App使用
    let msg = new Windows.UI.Popups.MessageDialog(txt);
    msg.showAsync();
}

// ＪＳＯＮパッケージ情報			'16.08.16
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
			return(JSONFlag);
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
            if ((wpos>0)&&(wpos<Table.length)) {
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
