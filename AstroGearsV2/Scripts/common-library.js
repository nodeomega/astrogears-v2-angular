var CommonLibrary;
(function (CommonLibrary) {
    // prototypes
    Array.prototype.contains = function (v) {
        for (var i = 0; i < this.length; i++) {
            //if (this[i] === v) return true;
            if (JSON.stringify(this[i]) === JSON.stringify(v))
                return true;
        }
        return false;
    };
    Array.prototype.unique = function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    };
    // string literals
    // - error icon
    CommonLibrary.errorIcon = '<span class="fa fa-exclamation-triangle error"></span>';
    // - checkmark for success icon
    CommonLibrary.successIcon = '<span class="fa fa-check-circle action-successful"></span>';
    // - coffee icon, because who doesn't need coffee?
    CommonLibrary.coffeeIcon = '<span class="fa fa-coffee coffee"></span>';
    // - moment string format for date/times.
    CommonLibrary.momentFormat = "MM/DD/YYYY HH:mm";
    // TextLabel class.
    var TextLabel = (function () {
        function TextLabel(name) {
            var self = this;
            self.name = name;
            self.value = name.replace(/\s/g, '');
        }
        return TextLabel;
    }());
    CommonLibrary.TextLabel = TextLabel;
    // creates a list of textlabels
    function CreateTextLabelList(names) {
        return names.map(function (name) { return new TextLabel(name); });
    }
    CommonLibrary.CreateTextLabelList = CreateTextLabelList;
    // Checks whether a value is within a numerical range, inclusive.
    function IsInRange(value, min, max) {
        // If either min or max is null/undefined, or if min is greater than max, or if the value is 
        // not a number, it is not in range.
        if ((IsNullOrUndefined(min) || IsNullOrUndefined(max)) || (min > max) || isNaN(value)) {
            return false;
        }
        // parse the integer value.
        var intVal = parseInt(value);
        // returns true if the value as an integer is within the range, false otherwise.
        return ((intVal >= min) === (intVal <= max));
    }
    CommonLibrary.IsInRange = IsInRange;
    // checks whether a given value is null or undefined.
    function IsNullOrUndefined(val) {
        return (typeof val === 'undefined' || val === null);
    }
    CommonLibrary.IsNullOrUndefined = IsNullOrUndefined;
    function RandomInteger(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    CommonLibrary.RandomInteger = RandomInteger;
    function ConvertSecondsToHoursMinutesSeconds(inSeconds) {
        var date = new Date(null);
        date.setSeconds(inSeconds);
        return date.toISOString().substr(11, 8);
        //var outSeconds = inSeconds % 60;
        //var outMinutes = Math.floor(inSeconds / 60) % 60;
        //var outHours = Math.floor(inSeconds / 3600)
        //return outHours + ":" + outMinutes + ":" + outSeconds;
    }
    CommonLibrary.ConvertSecondsToHoursMinutesSeconds = ConvertSecondsToHoursMinutesSeconds;
})(CommonLibrary || (CommonLibrary = {}));
//# sourceMappingURL=common-library.js.map