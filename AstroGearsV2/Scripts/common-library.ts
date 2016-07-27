interface Array<T> {
    contains(v: any): any;
    unique(): any;
}

module CommonLibrary {
    // prototypes
    Array.prototype.contains = function (v) {
        for (var i = 0; i < this.length; i++) {
            //if (this[i] === v) return true;
            if (JSON.stringify(this[i]) === JSON.stringify(v)) return true;
        }
        return false;
    };

    Array.prototype.unique = function () {
        var arr: any = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    }

    // string literals
    // - error icon
    export var errorIcon: string = '<span class="fa fa-exclamation-triangle error"></span>';

    // - checkmark for success icon
    export var successIcon: string = '<span class="fa fa-check-circle action-successful"></span>';

    // - coffee icon, because who doesn't need coffee?
    export var coffeeIcon: string = '<span class="fa fa-coffee coffee"></span>';

    // - moment string format for date/times.
    export var momentFormat: string = "MM/DD/YYYY HH:mm";

    // TextLabel class.
    export class TextLabel {
        name: string;
        value: string;
        constructor(name: string) {
            var self = this;
            self.name = name;
            self.value = name.replace(/\s/g, '');
        }
    }

    // creates a list of textlabels
    export function CreateTextLabelList(names: string[]) {
        return names.map((name) => { return new TextLabel(name); });
    }

    // Checks whether a value is within a numerical range, inclusive.
    export function IsInRange(value: any, min: number, max: number) {
        // If either min or max is null/undefined, or if min is greater than max, or if the value is 
        // not a number, it is not in range.
        if ((IsNullOrUndefined(min) || IsNullOrUndefined(max)) || (min > max) || isNaN(value)) {
            return false;
        }

        // parse the integer value.
        var intVal: any = parseInt(value);

        // returns true if the value as an integer is within the range, false otherwise.
        return ((intVal >= min) === (intVal <= max));
    }

    // checks whether a given value is null or undefined.
    export function IsNullOrUndefined(val: any) {
        return (typeof val === 'undefined' || val === null);
    } 

    export function RandomInteger(min: number, max: number) {
        return Math.floor((Math.random() * max) + min);
    }

    export function ConvertSecondsToHoursMinutesSeconds(inSeconds: number) {
        var date = new Date(null);
        date.setSeconds(inSeconds);
        return date.toISOString().substr(11, 8);

        //var outSeconds = inSeconds % 60;
        //var outMinutes = Math.floor(inSeconds / 60) % 60;
        //var outHours = Math.floor(inSeconds / 3600)
        //return outHours + ":" + outMinutes + ":" + outSeconds;
    }
}