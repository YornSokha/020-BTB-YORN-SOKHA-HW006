var startMinutes;
var stopMinutes;
var minutesPlayed;

const hourRate = 1500;
const quarterRate = 500;
const halfRate = 1000;
const quarter = 15;
const half = 30;
const hour = 60;
const milliToMin = 1000 * 60;


var now = setInterval(() => {
    document.getElementById("day").innerHTML = new Date().toDateString('en-GB') + " - " + new Date().toLocaleTimeString("it-IT");
}, 1000);


function start() {
    startMinutes = Date.now() / milliToMin;
    console.log("startMinutes : " + startMinutes);
    document.getElementById("start-at").innerHTML = new Date().format("HH:MM"); //prettyDate2(new Date().getTime());
}

init();


function init() {
    // clear();
    startMinutes = 0;
    stopMinutes = 0;
    minutesPlayed = 0;
    document.getElementById("start-at").innerHTML = "00:00";
    document.getElementById("stop-at").innerHTML = "00:00";
    document.getElementById("minutes-played").innerHTML = "0 Minute";
    document.getElementById("total").innerHTML = "0 Riel";
}

function stop() {
    stopMinutes = Date.now() / milliToMin;
    console.log("stopMinutes : " + stopMinutes);
    minutesPlayed = Math.floor(stopMinutes - startMinutes) + 1;
    console.log(minutesPlayed);
    document.getElementById("total").innerHTML = calculateToltal() + " Riel";
    document.getElementById("minutes-played").innerHTML = Math.floor(minutesPlayed) + (minutesPlayed > 1 ? "Minutes" : "Minute");
    document.getElementById("stop-at").innerHTML = new Date().format("HH:MM");
}

const calculateToltal = () => {
    let totalHoursPlayed = Math.floor(minutesPlayed / hour);

    console.log("totalHoursPlayed : " + totalHoursPlayed);

    let totalMinutesPlayed = Math.floor(minutesPlayed % hour);
    
    console.log("totalMinutesPlayed : " + totalMinutesPlayed);

    let subTotalHours = totalHoursPlayed * hourRate;

    console.log("Sub total hour : " + subTotalHours);

    let subTotalMinutes;

    if (totalMinutesPlayed <= quarter){
        subTotalMinutes = quarterRate;
        console.log("Quarter rate : " + quarterRate);
    }
    else if (totalMinutesPlayed <= half){
        subTotalMinutes = halfRate;
        console.log("Half rate : " + halfRate);
    }
    else if(totalMinutesPlayed <= hour){
        subTotalMinutes = hourRate;
        console.log("Hour rate : " + hourRate);
    }
    console.log("sub total minutes : " + subTotalMinutes);
    let total = subTotalHours + subTotalMinutes;
    return total;
}


btn = document.getElementById("btn-operator");
btn.addEventListener("click", () => {
    let str = btn.innerHTML.toString();
    if (str.substr(str.length - 1) == "t") {
        start();
        btn.classList.remove("btn-success");
        btn.className += " btn-danger";
        btn.innerHTML = '<i class="far fa-stop-circle"></i> Stop';
    } else if (str.substr(str.length - 1) == "p") {
        stop();

        btn.classList.remove("btn-danger");
        btn.classList += " btn-primary";
        btn.innerHTML = '<i class="fas fa-trash"></i> Clear';
    } else if (str.substr(str.length - 1) == "r") {
        init();
        btn.classList.remove("btn-primary");
        btn.classList += " btn-success";
        btn.innerHTML = '<i class="far fa-play-circle"></i> Start';
    }
});


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};