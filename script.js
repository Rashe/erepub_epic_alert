// ==UserScript==
// @name       Epic battle notifier, erepublik
// @author Rashe
// @version    1.3
// @description  Alert when epic battle detected, checks every 5 min. It does NOT fight for you, only notify.
// @match      http://www.erepublik.com/*
// @copyright  lol what?
// @noframes
// ==/UserScript==


var Epic_alert =
{
    settings: {
        selectors: {
            epic_selector: 'isEpicBattle',
            epic_text: 'war_details_text'
        },
        urls: {
            war_url: 'http://www.erepublik.com/en/military/campaigns',
            battle_url_part: 'battlefield-new'
        },
        messages: {
            message: 'Hey Epic battle is waiting',
            epic_text_span: 'War: Epic battle '
        }
    },

    init: function () {
        this.start();
    },
    start: function () {
        this.wait_1min();
    },
    go_to: function () {
        if (window.location.href == this.settings.urls.war_url) {
            this.check_if_epic();
        }
        else if (this.check_if_not_in_battle()) {
            this.wait_20min();
        }
        else {
            window.location.href = this.settings.urls.war_url;
        }
    },
    check_if_epic: function () {
        var elements = document.getElementsByClassName(this.settings.selectors.epic_selector);
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                var parent = elements[i].parentNode,
                    value = parent.childNodes[0].textContent;
                if (value == this.settings.messages.epic_text_span) {
                    alert(this.settings.messages.message);
                }
            }
        } else {
            this.wait_5min();
        }
    },
    wait_1min: function () {
        setTimeout(function () {
            Epic_alert.go_to();
        }, 60 * 1000);
    },
    wait_5min: function () {
        setTimeout(function () {
            document.location.reload(true);
        }, 5 * 60 * 1000);
    },
    wait_20min: function () {
        setTimeout(function () {
            window.location.href = Epic_alert.settings.urls.war_url;
        }, 20 * 60 * 1000);
    },
    check_if_not_in_battle: function () {
        var url_parts_arr = window.location.pathname.split('/');
        return (url_parts_arr[3] == this.settings.urls.battle_url_part);
    }
};

Epic_alert.init();