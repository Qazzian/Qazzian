/**
 * Some useful functions for manipulating URL's
 * Place it inside your standard module wrapper.
 */


function isUrlWrapped(obj) {
	if (typeof obj === "string") {
		return false;
	}
}

UrlTools = {

	/**
	 * Wrap a url string in a url object
	 * @param url
	 * @returns {*}
	 */
	urlWrapper: function (url) {
		if (isUrlWrapped(url)) {
			return url;
		}
		var tag = document.createElement('a');
		tag.href = url;
		return tag;
	},

	/**
	 * Join parts of a url string together similar to url tools joi9n different directories
	 * @param {string}... - any number of strings to be joined e.g. ('a', 'b/', 'c')
	 * @returns {string} - joined url string e.g. 'a/b/c'
	 */
	join: function () {
		var out = '', stack = [], tmp;
		for (var i = 0; i < arguments.length; i++) {
			tmp = arguments[i];
			if (tmp === undefined || tmp === null) {
				continue;
			}
			tmp = tmp.replace(/(^\/|\/$)/g, '');
			if (tmp.length > 0) {
				stack.push(tmp);
			}
		}
		out = stack.join('/');
		if (!out.match(/^http/)) {
			out = '/' + out;
		}
		if (arguments[arguments.length - 1].match(/\/$/)) {
			out += '/';
		}
		return out;
	},

	/**
	 * Convert url param string into an object
	 * @param url {string} - The url to parse
	 * @param urlPart {string} - The section of the url to parse (hash|search)
	 * @param filterList {Array} (optional) - list of attributes you want returned
	 * @returns {{}}
	 */
	deserialise: function (url, urlPart, filterList) {
		var params = {}, paramString, paramStrings = [], i, l;
		urlPart = urlPart || 'search';
		if (typeof filterList === 'string') {
			filterList = [filterList];
		}
		url = UrlTools.urlWrapper(url);
		paramString = url[urlPart];
		if (paramString.length > 0) {
			paramStrings = paramString.slice(1).split(/[&=]/);
		}
		for (i = 0, l = paramStrings.length; i < l; i += 2) {
			if (typeof filterList === 'undefined' || filterList.indexOf(paramStrings[i]) > -1) {
				params[paramStrings[i]] = decodeURIComponent(paramStrings[i + 1]);
			}
		}
		return params;
	},

	/**
	 * Convert an object into a url params string
	 * @param params {object} - Object of key value pairs.
	 * @returns {string}
	 */
	serialise: function (params) {
		var paramList = [], k;
		for (k in params)if (params.hasOwnProperty(k)) {
			paramList.push(k + '=' + encodeURIComponent(params[k]));
		}
		return paramList.join('&');
	},

	/**
	 * Return the search part of the url
	 * @param url
	 * @param filterList
	 * @returns {{}}
	 */
	getSearchParams: function (url, filterList) {
		return UrlTools.deserialise(url, 'search', filterList);
	},

	/**
	 * return the hash part of the url
	 * @param url
	 * @param filterList
	 * @returns {{}}
	 */
	getHashParams: function (url, filterList) {
		return UrlTools.deserialise(url, 'hash', filterList);
	},

	/**
	 * Replace the current url params with the given set of params.
	 * Any params that were previously on the url will be deleted.
	 * @param url {string} - URL to edit
	 * @param params {object} - list of key, value pairs to add to the url
	 * @param urlPart (hash|search) - Which part of the url the params should be added to
	 * @returns {string} - the edited url
	 */
	setParams: function (url, params, urlPart) {
		url = UrlTools.urlWrapper(url);
		urlPart = urlPart || 'search';
		var paramList = [], k, v;
		for (k in params)if (params.hasOwnProperty(k)) {
			paramList.push(k + '=' + encodeURIComponent(params[k]));
		}
		if (urlPart === 'hash') {
			url.hash = '#' + paramList.join('&');
		}
		else {
			url.search = '?' + paramList.join('&');
		}
		return url.href;
	},

	/**
	 * Add params to the url. IF the param already exists for the url then the value will be changed.
	 * @param url {string}
	 * @param params {object}
	 * @param urlPart {hash|search}
	 * @returns {string}
	 */
	addParams: function (url, params, urlPart) {
		url = UrlTools.urlWrapper(url);
		urlPart = urlPart || 'search';
		var oldParams = UrlTools.deserialise(url, urlPart), k;
		for (k in params)if (params.hasOwnProperty(k)) {
			oldParams[k] = params[k];
		}
		return UrlTools.setParams(url, oldParams, urlPart);
	}
};
