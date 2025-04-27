const Main = imports.ui.main;
const appMenu = Main.panel.statusArea.appMenu;
const layoutManager = Main.layoutManager;

let activityButton;
let dateMenu;
let monitorsChangedEvent;
let showEvent;

function _hideAppMenu() {
    // Hide the app menu if available
    if (appMenu != null) {
        appMenu.hide();
    }
}

function init() {
    // Nothing to initialize here
}

function enable() {
    // アクティビティボタンを非表示にする
    activityButton = Main.panel.statusArea.activities;
    if (activityButton) {
        activityButton.hide();
    }

    // クロックメニュー（時計）を非表示にする
    dateMenu = Main.panel.statusArea.dateMenu;
    if (dateMenu) {
        dateMenu.hide();
    }

    // アプリメニュー（現在のウィンドウタイトル）を非表示にする
    // メニューが表示されようとした時と、UIがリロードされた時に非表示にする
    monitorsChangedEvent = layoutManager.connect('monitors-changed', _hideAppMenu);
    showEvent = appMenu.connect('show', _hideAppMenu);
    // 拡張機能が有効になった時にも非表示にする
    _hideAppMenu();
}

function disable() {
    // アクティビティボタンを再表示する
    if (activityButton) {
        activityButton.show();
        activityButton = null;
    }

    // クロックメニュー（時計）を再表示する
    if (dateMenu) {
        dateMenu.show();
        dateMenu = null;
    }

    // アプリメニューの非表示処理を解除して、再表示する
    layoutManager.disconnect(monitorsChangedEvent);
    appMenu.disconnect(showEvent);
    // アプリメニューを再表示する（もし存在すれば）
    if (appMenu != null) {
        appMenu.show();
    }
}
