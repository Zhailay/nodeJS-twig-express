
module.exports = {

    ACCEPT_CHARS: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789~!@#$%^&*()_-+={}[]|:;<>",

    //проверяет текст на некоректные символы
    //возыращает некоректный символ если он найден, в противном случаи возвращает пустую строку
    check: function (text) {
        for (var textIndex = 0; textIndex < text.length; textIndex++) {
            var ch = text.charAt(textIndex);

            if (this.ACCEPT_CHARS.indexOf(ch) === -1)
                return ch;
        }

        return "";
    },

    encrypt: function (text, key) {
        if (this.check(text) !== "")
            return "";

        return this._crypt(text, key, 1);
    },

    decrypt: function (text, key) {
        if (this.check(text) !== "")
            return "";

        return this._crypt(text, key, -1);
    },

    _crypt: function (text, key, direction) {

        var res = "";
        var keyIndex = -1;

        for (var textIndex = 0; textIndex < text.length; textIndex++) {

            keyIndex++;
            if (keyIndex === key.length)
                keyIndex = 0;

            var chText = text.charAt(textIndex);
            var chKey = key.charAt(keyIndex);

            var delta = this.ACCEPT_CHARS.indexOf(chKey) * direction;
            var chCrypt = this.round(chText, delta);

            //console.log(chText, chKey, delta, chCrypt, this.ACCEPT_CHARS.length);
            res += chCrypt;
        }

        return res;
    },

    round: function (ch, delta) {

        var index = this.ACCEPT_CHARS.indexOf(ch);

        var newCharIndex = (index + delta) % this.ACCEPT_CHARS.length;

        //console.log(newCharIndex);

        if (newCharIndex < 0)
            newCharIndex = this.ACCEPT_CHARS.length + newCharIndex;

        return this.ACCEPT_CHARS.charAt(newCharIndex);

    }



};