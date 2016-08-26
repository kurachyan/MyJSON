"use strict";
/*
	周期起動タイマー専用パッケージ

	(内容)
	周期起動タイマーの管理・操作を行う。

*/
(function (window) {
    const dfInterval = 1000;      // １秒周期
    let timerID = null;         // 周期起動タイマーＩＤ
    let TimerFlag = new Boolean(false);     // タイマー運用
    let TimerInterval = dfInterval;

    function LocalTimerScript() {
        // Local Timer Script Module

        // モジュール名：BootTimer
        // 　　　　入力：なし
        //　　 　　出力：なし
        // 　　処理内容：周期タイマーを起動する。
        // 　　　　　　：１秒周期を初期設定とする。
        this.BootTimer = function () {
            // Boot Interval_Timer
            if (timerID == null) {      // タイマー未稼働？
                // タイマー稼働
                timerID = setInterval("iTimer()", TimerInterval);

                TimerFlag = true;       // タイマー稼働
            }
        };

        // モジュール名：StopTimer
        // 　　　　入力：なし
        //　　 　　出力：なし
        // 　　処理内容：周期タイマーを停止する。
        this.StopTimer = function () {
            // Stop Interval_Timer
            clearInterval(timerID);         // タイマー停止
            timerID = null;
            TimerFlag = false;
        };

        // モジュール名：CheckTimer
        // 　　　　入力：なし
        //　　 　　出力：なし
        // 　　処理内容：周期タイマーを停止する。
        this.CheckTimer = function () {
            // Check_Status Interval_Timer
            return (TimerFlag);
        };

        // モジュール名：ChangeTimer
        // 　　　　入力：interval　・・・　新しい周期情報
        //　　 　　出力：なし
        // 　　処理内容：タイマー周期情報を変更する。
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

// モジュール名：iTimer
// 　　　　入力：なし
//　　 　　出力：なし
// 　　処理内容：タイマー周期起動を行う。
// 　　　その他：周期処理で行う内容を記述する。
function iTimer() {
    // インターバル
    let txt3 = setLogTime();    // ログＴｉｍｅの更新
    document.getElementById("timeinfo").innerHTML = txt3;
}
