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
