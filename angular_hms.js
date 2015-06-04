(function() {

var module = angular.module('hms', []);

module.filter('hms', function() {
    return function(seconds, format) {
        format = format || ['h ', 'm ', 's'];

        var divisor = {};
        divisor.m = seconds % (60 * 60);
        divisor.s = divisor.m % 60;

        var h = Math.floor(seconds / (60 * 60)),
            m = Math.floor(divisor.m / 60),
            s = Math.ceil(divisor.s);

        var hms = '';

        if (h > 0) {
            hms = hms.concat(h + (format[0] ? format[0] : ''));
        }

        if (m > 0) {
            hms = hms.concat(m + (format[1] ? format[1] : ''));
        }

        hms = hms.concat(s + (format[2] ? format[2] : ''));

        return hms;
    };
});

})();