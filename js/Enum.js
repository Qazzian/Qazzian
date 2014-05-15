/**
 * Create an enum construct
 * Converts a list of strings into an object with a mapping of index values > key names and vice versa.
 * e.g. var responses = new Enum('no', 'yes', 'no');
 * // { 0: 'no', 1: 'yes', 'no': 0, 'yes': 1 }
 * response === responses.yes ? console.log('User said yes') : console.log("User said no");
 *
 * Can also take an Array of Strings.
 * @constructor
 */
function Enum(){
    var self = this,
        length = 0,
        args;

    args = _.isArray(arguments[0]) ? arguments[0] : arguments;

    _.each(arguments, function(key){
        self[key] = length;
        self[length] = key;
        length++;
    });

    if (typeof this.seal === 'function') {
        this.seal();
    }
}

Enum.prototype = {
	// TODO

}
