
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

var _elm_lang$lazy$Native_Lazy = function() {

function memoize(thunk)
{
    var value;
    var isForced = false;
    return function(tuple0) {
        if (!isForced) {
            value = thunk(tuple0);
            isForced = true;
        }
        return value;
    };
}

return {
    memoize: memoize
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$lazy$Lazy$force = function (_p0) {
	var _p1 = _p0;
	return _p1._0(
		{ctor: '_Tuple0'});
};
var _elm_lang$lazy$Lazy$Lazy = function (a) {
	return {ctor: 'Lazy', _0: a};
};
var _elm_lang$lazy$Lazy$lazy = function (thunk) {
	return _elm_lang$lazy$Lazy$Lazy(
		_elm_lang$lazy$Native_Lazy.memoize(thunk));
};
var _elm_lang$lazy$Lazy$map = F2(
	function (f, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p2) {
				var _p3 = _p2;
				return f(
					_elm_lang$lazy$Lazy$force(a));
			});
	});
var _elm_lang$lazy$Lazy$map2 = F3(
	function (f, a, b) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p4) {
				var _p5 = _p4;
				return A2(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b));
			});
	});
var _elm_lang$lazy$Lazy$map3 = F4(
	function (f, a, b, c) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p6) {
				var _p7 = _p6;
				return A3(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c));
			});
	});
var _elm_lang$lazy$Lazy$map4 = F5(
	function (f, a, b, c, d) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p8) {
				var _p9 = _p8;
				return A4(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d));
			});
	});
var _elm_lang$lazy$Lazy$map5 = F6(
	function (f, a, b, c, d, e) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p10) {
				var _p11 = _p10;
				return A5(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d),
					_elm_lang$lazy$Lazy$force(e));
			});
	});
var _elm_lang$lazy$Lazy$apply = F2(
	function (f, x) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p12) {
				var _p13 = _p12;
				return A2(
					_elm_lang$lazy$Lazy$force,
					f,
					_elm_lang$lazy$Lazy$force(x));
			});
	});
var _elm_lang$lazy$Lazy$andThen = F2(
	function (callback, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p14) {
				var _p15 = _p14;
				return _elm_lang$lazy$Lazy$force(
					callback(
						_elm_lang$lazy$Lazy$force(a)));
			});
	});

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_community$parser_combinators$Combine$app = function (p) {
	var _p0 = p;
	if (_p0.ctor === 'Parser') {
		return _p0._0;
	} else {
		return _elm_lang$lazy$Lazy$force(_p0._0);
	}
};
var _elm_community$parser_combinators$Combine$InputStream = F3(
	function (a, b, c) {
		return {data: a, input: b, position: c};
	});
var _elm_community$parser_combinators$Combine$initStream = function (s) {
	return A3(_elm_community$parser_combinators$Combine$InputStream, s, s, 0);
};
var _elm_community$parser_combinators$Combine$runParser = F3(
	function (p, st, s) {
		var _p1 = A3(
			_elm_community$parser_combinators$Combine$app,
			p,
			st,
			_elm_community$parser_combinators$Combine$initStream(s));
		if (_p1._2.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				{ctor: '_Tuple3', _0: _p1._0, _1: _p1._1, _2: _p1._2._0});
		} else {
			return _elm_lang$core$Result$Err(
				{ctor: '_Tuple3', _0: _p1._0, _1: _p1._1, _2: _p1._2._0});
		}
	});
var _elm_community$parser_combinators$Combine$parse = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine$runParser,
		p,
		{ctor: '_Tuple0'});
};
var _elm_community$parser_combinators$Combine$ParseLocation = F3(
	function (a, b, c) {
		return {source: a, line: b, column: c};
	});
var _elm_community$parser_combinators$Combine$currentLocation = function (stream) {
	var find = F3(
		function (position, currentLine, lines) {
			find:
			while (true) {
				var _p2 = lines;
				if (_p2.ctor === '[]') {
					return A3(_elm_community$parser_combinators$Combine$ParseLocation, '', 1, position);
				} else {
					if (_p2._1.ctor === '[]') {
						return A3(_elm_community$parser_combinators$Combine$ParseLocation, _p2._0, currentLine + 1, position);
					} else {
						var _p3 = _p2._0;
						var length = _elm_lang$core$String$length(_p3);
						if (_elm_lang$core$Native_Utils.cmp(position, length) > -1) {
							var _v3 = (position - length) - 1,
								_v4 = currentLine + 1,
								_v5 = _p2._1;
							position = _v3;
							currentLine = _v4;
							lines = _v5;
							continue find;
						} else {
							if (_elm_lang$core$Native_Utils.eq(currentLine, 0)) {
								return A3(_elm_community$parser_combinators$Combine$ParseLocation, _p3, 1, position);
							} else {
								return A3(_elm_community$parser_combinators$Combine$ParseLocation, _p3, currentLine, position - 1);
							}
						}
					}
				}
			}
		});
	return A3(
		find,
		stream.position,
		0,
		A2(_elm_lang$core$String$split, '\n', stream.data));
};
var _elm_community$parser_combinators$Combine$currentSourceLine = function (_p4) {
	return function (_) {
		return _.source;
	}(
		_elm_community$parser_combinators$Combine$currentLocation(_p4));
};
var _elm_community$parser_combinators$Combine$currentLine = function (_p5) {
	return function (_) {
		return _.line;
	}(
		_elm_community$parser_combinators$Combine$currentLocation(_p5));
};
var _elm_community$parser_combinators$Combine$currentColumn = function (_p6) {
	return function (_) {
		return _.column;
	}(
		_elm_community$parser_combinators$Combine$currentLocation(_p6));
};
var _elm_community$parser_combinators$Combine$RecursiveParser = function (a) {
	return {ctor: 'RecursiveParser', _0: a};
};
var _elm_community$parser_combinators$Combine$lazy = function (t) {
	return _elm_community$parser_combinators$Combine$RecursiveParser(
		_elm_lang$lazy$Lazy$lazy(
			function (_p7) {
				var _p8 = _p7;
				return _elm_community$parser_combinators$Combine$app(
					t(
						{ctor: '_Tuple0'}));
			}));
};
var _elm_community$parser_combinators$Combine$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _elm_community$parser_combinators$Combine$primitive = _elm_community$parser_combinators$Combine$Parser;
var _elm_community$parser_combinators$Combine$bimap = F3(
	function (fok, ferr, p) {
		return _elm_community$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _p9 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
					if (_p9._2.ctor === 'Ok') {
						return {
							ctor: '_Tuple3',
							_0: _p9._0,
							_1: _p9._1,
							_2: _elm_lang$core$Result$Ok(
								fok(_p9._2._0))
						};
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p9._0,
							_1: _p9._1,
							_2: _elm_lang$core$Result$Err(
								ferr(_p9._2._0))
						};
					}
				}));
	});
var _elm_community$parser_combinators$Combine$map = F2(
	function (f, p) {
		return A3(_elm_community$parser_combinators$Combine$bimap, f, _elm_lang$core$Basics$identity, p);
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<$>'] = _elm_community$parser_combinators$Combine$map;
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<$'] = function (res) {
	return _elm_community$parser_combinators$Combine$map(
		_elm_lang$core$Basics$always(res));
};
var _elm_community$parser_combinators$Combine$skip = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		p);
};
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['$>'] = _elm_lang$core$Basics$flip(
	F2(
		function (x, y) {
			return A2(_elm_community$parser_combinators$Combine_ops['<$'], x, y);
		}));
var _elm_community$parser_combinators$Combine$mapError = _elm_community$parser_combinators$Combine$bimap(_elm_lang$core$Basics$identity);
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<?>'] = F2(
	function (p, m) {
		return A2(
			_elm_community$parser_combinators$Combine$mapError,
			_elm_lang$core$Basics$always(
				{
					ctor: '::',
					_0: m,
					_1: {ctor: '[]'}
				}),
			p);
	});
var _elm_community$parser_combinators$Combine$withState = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(state),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$withLocation = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(
						_elm_community$parser_combinators$Combine$currentLocation(stream)),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$withLine = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(
						_elm_community$parser_combinators$Combine$currentLine(stream)),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$withColumn = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(
						_elm_community$parser_combinators$Combine$currentColumn(stream)),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$andThen = F2(
	function (f, p) {
		return _elm_community$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _p10 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
					if (_p10._2.ctor === 'Ok') {
						return A3(
							_elm_community$parser_combinators$Combine$app,
							f(_p10._2._0),
							_p10._0,
							_p10._1);
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p10._0,
							_1: _p10._1,
							_2: _elm_lang$core$Result$Err(_p10._2._0)
						};
					}
				}));
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['>>='] = _elm_lang$core$Basics$flip(_elm_community$parser_combinators$Combine$andThen);
var _elm_community$parser_combinators$Combine$andMap = F2(
	function (rp, lp) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['>>='],
			lp,
			A2(_elm_lang$core$Basics$flip, _elm_community$parser_combinators$Combine$map, rp));
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<*>'] = _elm_lang$core$Basics$flip(_elm_community$parser_combinators$Combine$andMap);
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<*'] = F2(
	function (lp, rp) {
		return A2(
			_elm_community$parser_combinators$Combine$andMap,
			rp,
			A2(_elm_community$parser_combinators$Combine$map, _elm_lang$core$Basics$always, lp));
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['*>'] = F2(
	function (lp, rp) {
		return A2(
			_elm_community$parser_combinators$Combine$andMap,
			rp,
			A2(
				_elm_community$parser_combinators$Combine$map,
				_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always),
				lp));
	});
var _elm_community$parser_combinators$Combine$between = F3(
	function (lp, rp, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(_elm_community$parser_combinators$Combine_ops['*>'], lp, p),
			rp);
	});
var _elm_community$parser_combinators$Combine$sequence = function (parsers) {
	var accumulate = F4(
		function (acc, ps, state, stream) {
			accumulate:
			while (true) {
				var _p11 = ps;
				if (_p11.ctor === '[]') {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(
							_elm_lang$core$List$reverse(acc))
					};
				} else {
					var _p12 = A3(_elm_community$parser_combinators$Combine$app, _p11._0, state, stream);
					if (_p12._2.ctor === 'Ok') {
						var _v11 = {ctor: '::', _0: _p12._2._0, _1: acc},
							_v12 = _p11._1,
							_v13 = _p12._0,
							_v14 = _p12._1;
						acc = _v11;
						ps = _v12;
						state = _v13;
						stream = _v14;
						continue accumulate;
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p12._0,
							_1: _p12._1,
							_2: _elm_lang$core$Result$Err(_p12._2._0)
						};
					}
				}
			}
		});
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A4(
					accumulate,
					{ctor: '[]'},
					parsers,
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$fail = function (m) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return {
					ctor: '_Tuple3',
					_0: state,
					_1: stream,
					_2: _elm_lang$core$Result$Err(
						{
							ctor: '::',
							_0: m,
							_1: {ctor: '[]'}
						})
				};
			}));
};
var _elm_community$parser_combinators$Combine$emptyErr = _elm_community$parser_combinators$Combine$Parser(
	F2(
		function (state, stream) {
			return {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Err(
					{ctor: '[]'})
			};
		}));
var _elm_community$parser_combinators$Combine$succeed = function (res) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return {
					ctor: '_Tuple3',
					_0: state,
					_1: stream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _elm_community$parser_combinators$Combine$putState = function (state) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (_p13, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					_elm_community$parser_combinators$Combine$succeed(
						{ctor: '_Tuple0'}),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$modifyState = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					_elm_community$parser_combinators$Combine$succeed(
						{ctor: '_Tuple0'}),
					f(state),
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$count = F2(
	function (n, p) {
		var accumulate = F2(
			function (x, acc) {
				return (_elm_lang$core$Native_Utils.cmp(x, 0) < 1) ? _elm_community$parser_combinators$Combine$succeed(
					_elm_lang$core$List$reverse(acc)) : A2(
					_elm_community$parser_combinators$Combine$andThen,
					function (res) {
						return A2(
							accumulate,
							x - 1,
							{ctor: '::', _0: res, _1: acc});
					},
					p);
			});
		return A2(
			accumulate,
			n,
			{ctor: '[]'});
	});
var _elm_community$parser_combinators$Combine$string = function (s) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				if (A2(_elm_lang$core$String$startsWith, s, stream.input)) {
					var len = _elm_lang$core$String$length(s);
					var rem = A2(_elm_lang$core$String$dropLeft, len, stream.input);
					var pos = stream.position + len;
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: rem, position: pos}),
						_2: _elm_lang$core$Result$Ok(s)
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									'expected ',
									_elm_lang$core$Basics$toString(s)),
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine$parens = A2(
	_elm_community$parser_combinators$Combine$between,
	_elm_community$parser_combinators$Combine$string('('),
	_elm_community$parser_combinators$Combine$string(')'));
var _elm_community$parser_combinators$Combine$braces = A2(
	_elm_community$parser_combinators$Combine$between,
	_elm_community$parser_combinators$Combine$string('{'),
	_elm_community$parser_combinators$Combine$string('}'));
var _elm_community$parser_combinators$Combine$brackets = A2(
	_elm_community$parser_combinators$Combine$between,
	_elm_community$parser_combinators$Combine$string('['),
	_elm_community$parser_combinators$Combine$string(']'));
var _elm_community$parser_combinators$Combine$regex = function (pat) {
	var pattern = A2(_elm_lang$core$String$startsWith, '^', pat) ? pat : A2(_elm_lang$core$Basics_ops['++'], '^', pat);
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p14 = A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(pattern),
					stream.input);
				if ((_p14.ctor === '::') && (_p14._1.ctor === '[]')) {
					var _p15 = _p14._0;
					var len = _elm_lang$core$String$length(_p15.match);
					var rem = A2(_elm_lang$core$String$dropLeft, len, stream.input);
					var pos = stream.position + len;
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: rem, position: pos}),
						_2: _elm_lang$core$Result$Ok(_p15.match)
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									'expected input matching Regexp /',
									A2(_elm_lang$core$Basics_ops['++'], pattern, '/')),
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine$whitespace = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine$regex('[ \t\r\n]*'),
	'whitespace');
var _elm_community$parser_combinators$Combine$whitespace1 = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine$regex('[ \t\r\n]+'),
	'whitespace');
var _elm_community$parser_combinators$Combine$while = function (pred) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _p16 = _elm_lang$core$String$uncons(stream.input);
				if (_p16.ctor === 'Just') {
					var _p17 = _p16._0._0;
					if (pred(_p17)) {
						var pos = stream.position + 1;
						var c = A2(_elm_lang$core$String$cons, _p17, '');
						var _v17 = A2(_elm_lang$core$Basics_ops['++'], acc, c),
							_v18 = state,
							_v19 = _elm_lang$core$Native_Utils.update(
							stream,
							{input: _p16._0._1, position: pos});
						acc = _v17;
						state = _v18;
						stream = _v19;
						continue accumulate;
					} else {
						return {ctor: '_Tuple3', _0: state, _1: stream, _2: acc};
					}
				} else {
					return {ctor: '_Tuple3', _0: state, _1: stream, _2: acc};
				}
			}
		});
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p18 = A3(accumulate, '', state, stream);
				var rstate = _p18._0;
				var rstream = _p18._1;
				var res = _p18._2;
				return {
					ctor: '_Tuple3',
					_0: rstate,
					_1: rstream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _elm_community$parser_combinators$Combine$end = _elm_community$parser_combinators$Combine$Parser(
	F2(
		function (state, stream) {
			return _elm_lang$core$Native_Utils.eq(stream.input, '') ? {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Ok(
					{ctor: '_Tuple0'})
			} : {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Err(
					{
						ctor: '::',
						_0: 'expected end of input',
						_1: {ctor: '[]'}
					})
			};
		}));
var _elm_community$parser_combinators$Combine$lookAhead = function (p) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p19 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
				if ((_p19.ctor === '_Tuple3') && (_p19._2.ctor === 'Ok')) {
					return {
						ctor: '_Tuple3',
						_0: _p19._0,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(_p19._2._0)
					};
				} else {
					return _p19;
				}
			}));
};
var _elm_community$parser_combinators$Combine$or = F2(
	function (lp, rp) {
		return _elm_community$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _p20 = A3(_elm_community$parser_combinators$Combine$app, lp, state, stream);
					if (_p20._2.ctor === 'Ok') {
						return _p20;
					} else {
						var _p21 = A3(_elm_community$parser_combinators$Combine$app, rp, state, stream);
						if (_p21._2.ctor === 'Ok') {
							return _p21;
						} else {
							return {
								ctor: '_Tuple3',
								_0: state,
								_1: stream,
								_2: _elm_lang$core$Result$Err(
									A2(_elm_lang$core$Basics_ops['++'], _p20._2._0, _p21._2._0))
							};
						}
					}
				}));
	});
var _elm_community$parser_combinators$Combine$choice = function (xs) {
	return A3(_elm_lang$core$List$foldr, _elm_community$parser_combinators$Combine$or, _elm_community$parser_combinators$Combine$emptyErr, xs);
};
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<|>'] = _elm_community$parser_combinators$Combine$or;
var _elm_community$parser_combinators$Combine$optional = F2(
	function (res, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			p,
			_elm_community$parser_combinators$Combine$succeed(res));
	});
var _elm_community$parser_combinators$Combine$chainl = F2(
	function (op, p) {
		var accumulate = function (x) {
			return A2(
				_elm_community$parser_combinators$Combine_ops['<|>'],
				A2(
					_elm_community$parser_combinators$Combine$andThen,
					function (f) {
						return A2(
							_elm_community$parser_combinators$Combine$andThen,
							function (y) {
								return accumulate(
									A2(f, x, y));
							},
							p);
					},
					op),
				_elm_community$parser_combinators$Combine$succeed(x));
		};
		return A2(_elm_community$parser_combinators$Combine$andThen, accumulate, p);
	});
var _elm_community$parser_combinators$Combine$chainr = F2(
	function (op, p) {
		var accumulate = function (x) {
			return A2(
				_elm_community$parser_combinators$Combine_ops['<|>'],
				A2(
					_elm_community$parser_combinators$Combine$andThen,
					function (f) {
						return A2(
							_elm_community$parser_combinators$Combine$andThen,
							function (y) {
								return _elm_community$parser_combinators$Combine$succeed(
									A2(f, x, y));
							},
							A2(_elm_community$parser_combinators$Combine$andThen, accumulate, p));
					},
					op),
				_elm_community$parser_combinators$Combine$succeed(x));
		};
		return A2(_elm_community$parser_combinators$Combine$andThen, accumulate, p);
	});
var _elm_community$parser_combinators$Combine$maybe = function (p) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p22 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
				if ((_p22.ctor === '_Tuple3') && (_p22._2.ctor === 'Ok')) {
					return {
						ctor: '_Tuple3',
						_0: _p22._0,
						_1: _p22._1,
						_2: _elm_lang$core$Result$Ok(
							_elm_lang$core$Maybe$Just(_p22._2._0))
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(_elm_lang$core$Maybe$Nothing)
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine$many = function (p) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _p23 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
				if ((_p23.ctor === '_Tuple3') && (_p23._2.ctor === 'Ok')) {
					var _p25 = _p23._1;
					var _p24 = _p23._0;
					if (_elm_lang$core$Native_Utils.eq(stream, _p25)) {
						return {
							ctor: '_Tuple3',
							_0: _p24,
							_1: _p25,
							_2: _elm_lang$core$List$reverse(acc)
						};
					} else {
						var _v25 = {ctor: '::', _0: _p23._2._0, _1: acc},
							_v26 = _p24,
							_v27 = _p25;
						acc = _v25;
						state = _v26;
						stream = _v27;
						continue accumulate;
					}
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$List$reverse(acc)
					};
				}
			}
		});
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p26 = A3(
					accumulate,
					{ctor: '[]'},
					state,
					stream);
				var rstate = _p26._0;
				var rstream = _p26._1;
				var res = _p26._2;
				return {
					ctor: '_Tuple3',
					_0: rstate,
					_1: rstream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _elm_community$parser_combinators$Combine$many1 = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			p),
		_elm_community$parser_combinators$Combine$many(p));
};
var _elm_community$parser_combinators$Combine$skipMany1 = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		_elm_community$parser_combinators$Combine$many1(
			_elm_community$parser_combinators$Combine$skip(p)));
};
var _elm_community$parser_combinators$Combine$sepBy1 = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				p),
			_elm_community$parser_combinators$Combine$many(
				A2(_elm_community$parser_combinators$Combine_ops['*>'], sep, p)));
	});
var _elm_community$parser_combinators$Combine$sepBy = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			A2(_elm_community$parser_combinators$Combine$sepBy1, sep, p),
			_elm_community$parser_combinators$Combine$succeed(
				{ctor: '[]'}));
	});
var _elm_community$parser_combinators$Combine$sepEndBy1 = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(_elm_community$parser_combinators$Combine$sepBy1, sep, p),
			_elm_community$parser_combinators$Combine$maybe(sep));
	});
var _elm_community$parser_combinators$Combine$sepEndBy = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			A2(_elm_community$parser_combinators$Combine$sepEndBy1, sep, p),
			_elm_community$parser_combinators$Combine$succeed(
				{ctor: '[]'}));
	});
var _elm_community$parser_combinators$Combine$skipMany = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		_elm_community$parser_combinators$Combine$many(
			_elm_community$parser_combinators$Combine$skip(p)));
};
var _elm_community$parser_combinators$Combine$manyTill = F2(
	function (p, end) {
		var accumulate = F3(
			function (acc, state, stream) {
				accumulate:
				while (true) {
					var _p27 = A3(_elm_community$parser_combinators$Combine$app, end, state, stream);
					if (_p27._2.ctor === 'Ok') {
						return {
							ctor: '_Tuple3',
							_0: _p27._0,
							_1: _p27._1,
							_2: _elm_lang$core$Result$Ok(
								_elm_lang$core$List$reverse(acc))
						};
					} else {
						var _p28 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
						if ((_p28.ctor === '_Tuple3') && (_p28._2.ctor === 'Ok')) {
							var _v30 = {ctor: '::', _0: _p28._2._0, _1: acc},
								_v31 = _p28._0,
								_v32 = _p28._1;
							acc = _v30;
							state = _v31;
							stream = _v32;
							continue accumulate;
						} else {
							return {
								ctor: '_Tuple3',
								_0: _p27._0,
								_1: _p27._1,
								_2: _elm_lang$core$Result$Err(_p27._2._0)
							};
						}
					}
				}
			});
		return _elm_community$parser_combinators$Combine$Parser(
			accumulate(
				{ctor: '[]'}));
	});

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_community$parser_combinators$Combine_Char$crlf = A2(
	_elm_community$parser_combinators$Combine_ops['<$'],
	_elm_lang$core$Native_Utils.chr('\n'),
	A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		_elm_community$parser_combinators$Combine$regex('\r\n'),
		'expected crlf'));
var _elm_community$parser_combinators$Combine_Char$satisfy = function (pred) {
	return _elm_community$parser_combinators$Combine$primitive(
		F2(
			function (state, stream) {
				var message = 'could not satisfy predicate';
				var _p0 = _elm_lang$core$String$uncons(stream.input);
				if (_p0.ctor === 'Just') {
					var _p1 = _p0._0._0;
					return pred(_p1) ? {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: _p0._0._1, position: stream.position + 1}),
						_2: _elm_lang$core$Result$Ok(_p1)
					} : {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: message,
								_1: {ctor: '[]'}
							})
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: message,
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine_Char$char = function (c) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		_elm_community$parser_combinators$Combine_Char$satisfy(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(c)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected ',
			_elm_lang$core$Basics$toString(c)));
};
var _elm_community$parser_combinators$Combine_Char$anyChar = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(
		_elm_lang$core$Basics$always(true)),
	'expected any character');
var _elm_community$parser_combinators$Combine_Char$oneOf = function (cs) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		_elm_community$parser_combinators$Combine_Char$satisfy(
			A2(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, cs)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected one of ',
			_elm_lang$core$Basics$toString(cs)));
};
var _elm_community$parser_combinators$Combine_Char$noneOf = function (cs) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		_elm_community$parser_combinators$Combine_Char$satisfy(
			function (_p2) {
				return !A3(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, cs, _p2);
			}),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected none of ',
			_elm_lang$core$Basics$toString(cs)));
};
var _elm_community$parser_combinators$Combine_Char$space = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr(' '))),
	'expected space');
var _elm_community$parser_combinators$Combine_Char$tab = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr('\t'))),
	'expected tab');
var _elm_community$parser_combinators$Combine_Char$newline = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr('\n'))),
	'expected newline');
var _elm_community$parser_combinators$Combine_Char$eol = A2(_elm_community$parser_combinators$Combine_ops['<|>'], _elm_community$parser_combinators$Combine_Char$newline, _elm_community$parser_combinators$Combine_Char$crlf);
var _elm_community$parser_combinators$Combine_Char$lower = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(_elm_lang$core$Char$isLower),
	'expected a lowercase character');
var _elm_community$parser_combinators$Combine_Char$upper = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(_elm_lang$core$Char$isUpper),
	'expected an uppercase character');
var _elm_community$parser_combinators$Combine_Char$digit = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(_elm_lang$core$Char$isDigit),
	'expected a digit');
var _elm_community$parser_combinators$Combine_Char$octDigit = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(_elm_lang$core$Char$isOctDigit),
	'expected an octal digit');
var _elm_community$parser_combinators$Combine_Char$hexDigit = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine_Char$satisfy(_elm_lang$core$Char$isHexDigit),
	'expected a hexadecimal digit');

var _Bogdanp$elm_ast$Ast_Helpers$emptyTuple = _elm_community$parser_combinators$Combine$string('()');
var _Bogdanp$elm_ast$Ast_Helpers$name = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(_elm_community$parser_combinators$Combine_ops['<$>'], _elm_lang$core$String$cons, p),
		_elm_community$parser_combinators$Combine$regex('[a-zA-Z0-9-_]*'));
};
var _Bogdanp$elm_ast$Ast_Helpers$upName = _Bogdanp$elm_ast$Ast_Helpers$name(_elm_community$parser_combinators$Combine_Char$upper);
var _Bogdanp$elm_ast$Ast_Helpers$spaces_ = _elm_community$parser_combinators$Combine$regex('[ \\t]+');
var _Bogdanp$elm_ast$Ast_Helpers$initialSymbol = function (k) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<*'],
		_elm_community$parser_combinators$Combine$string(k),
		_Bogdanp$elm_ast$Ast_Helpers$spaces_);
};
var _Bogdanp$elm_ast$Ast_Helpers$spaces = _elm_community$parser_combinators$Combine$regex('[ \\t]*');
var _Bogdanp$elm_ast$Ast_Helpers$between_ = function (p) {
	return A2(_elm_community$parser_combinators$Combine$between, p, p);
};
var _Bogdanp$elm_ast$Ast_Helpers$symbol_ = function (k) {
	return A2(
		_Bogdanp$elm_ast$Ast_Helpers$between_,
		_elm_community$parser_combinators$Combine$whitespace,
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			_elm_community$parser_combinators$Combine$string(k),
			_elm_community$parser_combinators$Combine$regex('( |\\n)+')));
};
var _Bogdanp$elm_ast$Ast_Helpers$symbol = function (k) {
	return A2(
		_Bogdanp$elm_ast$Ast_Helpers$between_,
		_elm_community$parser_combinators$Combine$whitespace,
		_elm_community$parser_combinators$Combine$string(k));
};
var _Bogdanp$elm_ast$Ast_Helpers$commaSeparated = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine$sepBy1,
		_elm_community$parser_combinators$Combine$string(','),
		A2(_Bogdanp$elm_ast$Ast_Helpers$between_, _elm_community$parser_combinators$Combine$whitespace, p));
};
var _Bogdanp$elm_ast$Ast_Helpers$commaSeparated_ = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine$sepBy,
		_elm_community$parser_combinators$Combine$string(','),
		A2(_Bogdanp$elm_ast$Ast_Helpers$between_, _elm_community$parser_combinators$Combine$whitespace, p));
};
var _Bogdanp$elm_ast$Ast_Helpers$moduleName = A2(
	_Bogdanp$elm_ast$Ast_Helpers$between_,
	_Bogdanp$elm_ast$Ast_Helpers$spaces,
	A2(
		_elm_community$parser_combinators$Combine$sepBy1,
		_elm_community$parser_combinators$Combine$string('.'),
		_Bogdanp$elm_ast$Ast_Helpers$upName));
var _Bogdanp$elm_ast$Ast_Helpers$reservedOperators = {
	ctor: '::',
	_0: '=',
	_1: {
		ctor: '::',
		_0: '.',
		_1: {
			ctor: '::',
			_0: '..',
			_1: {
				ctor: '::',
				_0: '->',
				_1: {
					ctor: '::',
					_0: '--',
					_1: {
						ctor: '::',
						_0: '|',
						_1: {
							ctor: '::',
							_0: ':',
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Bogdanp$elm_ast$Ast_Helpers$operator = A2(
	_elm_community$parser_combinators$Combine$andThen,
	function (n) {
		return A2(_elm_lang$core$List$member, n, _Bogdanp$elm_ast$Ast_Helpers$reservedOperators) ? _elm_community$parser_combinators$Combine$fail(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'operator \'',
				A2(_elm_lang$core$Basics_ops['++'], n, '\' is reserved'))) : _elm_community$parser_combinators$Combine$succeed(n);
	},
	_elm_community$parser_combinators$Combine$regex('[+\\-\\/*=.$<>:&|^?%#@~!]+|s\b'));
var _Bogdanp$elm_ast$Ast_Helpers$reserved = {
	ctor: '::',
	_0: 'module',
	_1: {
		ctor: '::',
		_0: 'where',
		_1: {
			ctor: '::',
			_0: 'import',
			_1: {
				ctor: '::',
				_0: 'as',
				_1: {
					ctor: '::',
					_0: 'exposing',
					_1: {
						ctor: '::',
						_0: 'type',
						_1: {
							ctor: '::',
							_0: 'alias',
							_1: {
								ctor: '::',
								_0: 'port',
								_1: {
									ctor: '::',
									_0: 'if',
									_1: {
										ctor: '::',
										_0: 'then',
										_1: {
											ctor: '::',
											_0: 'else',
											_1: {
												ctor: '::',
												_0: 'let',
												_1: {
													ctor: '::',
													_0: 'in',
													_1: {
														ctor: '::',
														_0: 'case',
														_1: {
															ctor: '::',
															_0: 'of',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Bogdanp$elm_ast$Ast_Helpers$loName = function () {
	var loName_ = A2(
		_elm_community$parser_combinators$Combine$andThen,
		function (n) {
			return A2(_elm_lang$core$List$member, n, _Bogdanp$elm_ast$Ast_Helpers$reserved) ? _elm_community$parser_combinators$Combine$fail(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'name \'',
					A2(_elm_lang$core$Basics_ops['++'], n, '\' is reserved'))) : _elm_community$parser_combinators$Combine$succeed(n);
		},
		_Bogdanp$elm_ast$Ast_Helpers$name(_elm_community$parser_combinators$Combine_Char$lower));
	return A2(
		_elm_community$parser_combinators$Combine_ops['<|>'],
		_elm_community$parser_combinators$Combine$string('_'),
		loName_);
}();
var _Bogdanp$elm_ast$Ast_Helpers$functionName = _Bogdanp$elm_ast$Ast_Helpers$loName;

var _Bogdanp$elm_ast$Ast_BinOp$R = {ctor: 'R'};
var _Bogdanp$elm_ast$Ast_BinOp$L = {ctor: 'L'};
var _Bogdanp$elm_ast$Ast_BinOp$operators = A3(
	_elm_lang$core$Dict$insert,
	'=',
	{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$R, _1: 0},
	A3(
		_elm_lang$core$Dict$insert,
		'|>',
		{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$R, _1: 1},
		A3(
			_elm_lang$core$Dict$insert,
			'<|',
			{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$R, _1: 1},
			A3(
				_elm_lang$core$Dict$insert,
				'>>',
				{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 9},
				A3(
					_elm_lang$core$Dict$insert,
					'<<',
					{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 9},
					A3(
						_elm_lang$core$Dict$insert,
						'^',
						{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 8},
						A3(
							_elm_lang$core$Dict$insert,
							'rem',
							{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 7},
							A3(
								_elm_lang$core$Dict$insert,
								'//',
								{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 7},
								A3(
									_elm_lang$core$Dict$insert,
									'%',
									{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 7},
									A3(
										_elm_lang$core$Dict$insert,
										'/',
										{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 7},
										A3(
											_elm_lang$core$Dict$insert,
											'*',
											{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 7},
											A3(
												_elm_lang$core$Dict$insert,
												'-',
												{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 6},
												A3(
													_elm_lang$core$Dict$insert,
													'+',
													{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 6},
													A3(
														_elm_lang$core$Dict$insert,
														'::',
														{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$R, _1: 5},
														A3(
															_elm_lang$core$Dict$insert,
															'++',
															{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$R, _1: 5},
															A3(
																_elm_lang$core$Dict$insert,
																'<=',
																{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 4},
																A3(
																	_elm_lang$core$Dict$insert,
																	'>=',
																	{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 4},
																	A3(
																		_elm_lang$core$Dict$insert,
																		'>',
																		{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 4},
																		A3(
																			_elm_lang$core$Dict$insert,
																			'<',
																			{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 4},
																			A3(
																				_elm_lang$core$Dict$insert,
																				'/=',
																				{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 4},
																				A3(
																					_elm_lang$core$Dict$insert,
																					'==',
																					{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 4},
																					A3(
																						_elm_lang$core$Dict$insert,
																						'&&',
																						{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 3},
																						A3(
																							_elm_lang$core$Dict$insert,
																							'||',
																							{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 2},
																							_elm_lang$core$Dict$empty)))))))))))))))))))))));
var _Bogdanp$elm_ast$Ast_BinOp$N = {ctor: 'N'};

var _elm_community$parser_combinators$Combine_Num$digit = function () {
	var toDigit = function (c) {
		return _elm_lang$core$Char$toCode(c) - _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('0'));
	};
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		toDigit,
		A2(_elm_community$parser_combinators$Combine_ops['<?>'], _elm_community$parser_combinators$Combine_Char$digit, 'expected a digit'));
}();
var _elm_community$parser_combinators$Combine_Num$sign = A2(
	_elm_community$parser_combinators$Combine$optional,
	1,
	_elm_community$parser_combinators$Combine$choice(
		{
			ctor: '::',
			_0: A2(
				_elm_community$parser_combinators$Combine_ops['<$'],
				1,
				_elm_community$parser_combinators$Combine$string('+')),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_community$parser_combinators$Combine_ops['<$'],
					-1,
					_elm_community$parser_combinators$Combine$string('-')),
				_1: {ctor: '[]'}
			}
		}));
var _elm_community$parser_combinators$Combine_Num$unwrap = F2(
	function (f, s) {
		var _p0 = f(s);
		if (_p0.ctor === 'Ok') {
			return _p0._0;
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Combine.Num',
				{
					start: {line: 23, column: 5},
					end: {line: 28, column: 83}
				},
				_p0)(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'impossible state in Combine.Num.unwrap: ',
					_elm_lang$core$Basics$toString(_p0._0)));
		}
	});
var _elm_community$parser_combinators$Combine_Num$toInt = _elm_community$parser_combinators$Combine_Num$unwrap(_elm_lang$core$String$toInt);
var _elm_community$parser_combinators$Combine_Num$int = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		F2(
			function (x, y) {
				return x * y;
			}),
		_elm_community$parser_combinators$Combine_Num$sign),
	A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_elm_community$parser_combinators$Combine_Num$toInt,
			_elm_community$parser_combinators$Combine$regex('(0|[1-9][0-9]*)')),
		'expected an integer'));
var _elm_community$parser_combinators$Combine_Num$toFloat = _elm_community$parser_combinators$Combine_Num$unwrap(_elm_lang$core$String$toFloat);
var _elm_community$parser_combinators$Combine_Num$float = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		function (_p2) {
			return F2(
				function (x, y) {
					return x * y;
				})(
				_elm_lang$core$Basics$toFloat(_p2));
		},
		_elm_community$parser_combinators$Combine_Num$sign),
	A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_elm_community$parser_combinators$Combine_Num$toFloat,
			_elm_community$parser_combinators$Combine$regex('(0|[1-9][0-9]*)(\\.[0-9]+)')),
		'expected a float'));

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isPrefixOf = F2(
	function (prefix, xs) {
		var _p0 = {ctor: '_Tuple2', _0: prefix, _1: xs};
		if (_p0._0.ctor === '[]') {
			return true;
		} else {
			if (_p0._1.ctor === '[]') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p0._0._0, _p0._1._0) && A2(_elm_community$list_extra$List_Extra$isPrefixOf, _p0._0._1, _p0._1._1);
			}
		}
	});
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p1 = xs;
	if (_p1.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p4,
				_2: _p5
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p4, _1: _p3._0},
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p9, _1: _p10},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: {ctor: '::', _0: _p9, _1: _p8._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p12},
				_1: {ctor: '::', _0: _p12, _1: _p11._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infix, xs) {
		return A2(
			_elm_lang$core$List$any,
			_elm_community$list_extra$List_Extra$isPrefixOf(infix),
			_elm_community$list_extra$List_Extra$tails(xs));
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs_) {
		var _p13 = xs_;
		if (_p13.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p13._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p13._0,
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				};
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? {
						ctor: '::',
						_0: {ctor: '::', _0: _p15, _1: _p14._0},
						_1: _p14._1
					} : {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p15,
							_1: {ctor: '[]'}
						},
						_1: _p14
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p16 = m;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p16._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p16._0._0) ? _elm_lang$core$Maybe$Just(_p16._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p19},
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				},
				_p20));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p21 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p21.ctor === '_Tuple2') && (_p21._0.ctor === '::')) && (_p21._1.ctor === '::')) {
				var _p22 = A2(_elm_community$list_extra$List_Extra$splitAt, _p21._0._0, list);
				var head = _p22._0;
				var tail = _p22._1;
				var _v11 = _p21._0._1,
					_v12 = tail,
					_v13 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v11;
				list = _v12;
				accu = _v13;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p23 = f(seed);
		if (_p23.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p23._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p23._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p24 = xs_;
		if (_p24.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p24._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p24._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p25 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p24._1);
				if (_p25.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p24._0, _p25._0),
						_1: _p25
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p26 = xs_;
		if (_p26.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p27 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p26._1);
			if (_p27.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p26._0, _p27._0),
					_1: _p27
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p28 = xs_;
		if (_p28.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p28._0, _p28._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p29) {
				var _p30 = _p29;
				var _p31 = _p30._0;
				return {
					ctor: '_Tuple2',
					_0: _p31 - 1,
					_1: A3(func, _p31, x, _p30._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p32) {
				var _p33 = _p32;
				var _p34 = _p33._0;
				return {
					ctor: '_Tuple2',
					_0: _p34 + 1,
					_1: A3(func, _p34, x, _p33._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p35 = m;
						if (_p35.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p35._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p36 = m;
						if (_p36.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p36._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p37 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v24_1:
			do {
				if (_p37._0.ctor === '::') {
					if (_p37._1.ctor === '::') {
						var _v25 = _p37._0._1,
							_v26 = _p37._1._1,
							_v27 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							{
								ctor: '::',
								_0: _p37._0._0,
								_1: {
									ctor: '::',
									_0: _p37._1._0,
									_1: {ctor: '[]'}
								}
							});
						l1 = _v25;
						l2 = _v26;
						acc = _v27;
						continue interweaveHelp;
					} else {
						break _v24_1;
					}
				} else {
					if (_p37._1.ctor === '[]') {
						break _v24_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p38 = xs_;
	if (_p38.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p40._0),
				_elm_community$list_extra$List_Extra$permutations(_p40._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p38));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p41 = xs;
	if (_p41.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p42 = _p41._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p42, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p42,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p41._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
};
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, xs) {
		return A2(
			_elm_lang$core$List$member,
			subseq,
			_elm_community$list_extra$List_Extra$subsequences(xs));
	});
var _elm_community$list_extra$List_Extra$transpose = function (ll) {
	transpose:
	while (true) {
		var _p43 = ll;
		if (_p43.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p43._0.ctor === '[]') {
				var _v32 = _p43._1;
				ll = _v32;
				continue transpose;
			} else {
				var _p44 = _p43._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p44);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p44);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p43._0._0, _1: heads},
					_1: _elm_community$list_extra$List_Extra$transpose(
						{ctor: '::', _0: _p43._0._1, _1: tails})
				};
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p45) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p45));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p46) {
				return !pred(_p46);
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p47 = tail;
			if (_p47.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p47._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$singleton = function (x) {
	return {
		ctor: '::',
		_0: x,
		_1: {ctor: '[]'}
	};
};
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p49, _p48) {
				var _p50 = _p49;
				var _p51 = _p48;
				var result = A2(pred, _p50._0, _p51._0);
				var _p52 = result;
				if (_p52.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p50._1, _p51._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p53 = tail;
			if (_p53.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						{ctor: '::', _0: value, _1: _p53._0}));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p54 = xs;
		if (_p54.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p56 = _p54._1;
			var _p55 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(x, _p55) ? _p56 : {
				ctor: '::',
				_0: _p55,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p56)
			};
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, update, list) {
		return ((_elm_lang$core$Native_Utils.cmp(index, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(
			index,
			_elm_lang$core$List$length(list)) > -1)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(
				_elm_community$list_extra$List_Extra$updateIfIndex,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(index),
				update,
				list));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$findIndices = function (p) {
	return function (_p57) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$filter,
				function (_p58) {
					var _p59 = _p58;
					return p(_p59._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p57)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p60) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p60));
	};
};
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p61 = list;
			if (_p61.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p62 = _p61._0;
				if (predicate(_p62)) {
					return _elm_lang$core$Maybe$Just(_p62);
				} else {
					var _v41 = predicate,
						_v42 = _p61._1;
					predicate = _v41;
					list = _v42;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p63) {
		return !A2(_elm_lang$core$List$member, x, _p63);
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (l, fl) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F3(
	function (f, existing, remaining) {
		uniqueHelp:
		while (true) {
			var _p64 = remaining;
			if (_p64.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p66 = _p64._1;
				var _p65 = _p64._0;
				var computedFirst = f(_p65);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v44 = f,
						_v45 = existing,
						_v46 = _p66;
					f = _v44;
					existing = _v45;
					remaining = _v46;
					continue uniqueHelp;
				} else {
					return {
						ctor: '::',
						_0: _p65,
						_1: A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p66)
					};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return A2(_elm_community$list_extra$List_Extra$allDifferentBy, _elm_lang$core$Basics$identity, list);
};
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p67 = list;
			if (_p67.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p67._0)) {
					var _v48 = predicate,
						_v49 = _p67._1;
					predicate = _v48;
					list = _v49;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				var _p68 = list;
				if (_p68.ctor === '[]') {
					return _elm_lang$core$List$reverse(memo);
				} else {
					var _p69 = _p68._0;
					if (predicate(_p69)) {
						var _v51 = {ctor: '::', _0: _p69, _1: memo},
							_v52 = _p68._1;
						memo = _v51;
						list = _v52;
						continue takeWhileMemo;
					} else {
						return _elm_lang$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p70) {
			return !p(_p70);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p71 = xs_;
		if (_p71.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p73 = _p71._0;
			var _p72 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p73),
				_p71._1);
			var ys = _p72._0;
			var zs = _p72._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p73, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p74) {
				var _p75 = _p74;
				var _p76 = _p75._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p76) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p75._0, _1: _p76};
			});
		var _p77 = ls;
		if (_p77.ctor === '::') {
			if (_p77._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p77._0);
			} else {
				var _p78 = _p77._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p78,
								_1: f(_p78)
							},
							_p77._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p79) {
				var _p80 = _p79;
				var _p81 = _p80._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p81) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p80._0, _1: _p81};
			});
		var _p82 = ls;
		if (_p82.ctor === '::') {
			if (_p82._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p82._0);
			} else {
				var _p83 = _p82._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p83,
								_1: f(_p83)
							},
							_p82._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p84 = xs;
	if (_p84.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p84._0, _1: _p84._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2)) {
				return _elm_lang$core$Maybe$Just(l);
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v59 = index2,
						_v60 = index1,
						_v61 = l;
					index1 = _v59;
					index2 = _v60;
					l = _v61;
					continue swapAt;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p85 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
						var part1 = _p85._0;
						var tail1 = _p85._1;
						var _p86 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
						var head2 = _p86._0;
						var tail2 = _p86._1;
						return A3(
							_elm_lang$core$Maybe$map2,
							F2(
								function (_p88, _p87) {
									var _p89 = _p88;
									var _p90 = _p87;
									return _elm_lang$core$List$concat(
										{
											ctor: '::',
											_0: part1,
											_1: {
												ctor: '::',
												_0: {ctor: '::', _0: _p90._0, _1: _p89._1},
												_1: {
													ctor: '::',
													_0: {ctor: '::', _0: _p89._0, _1: _p90._1},
													_1: {ctor: '[]'}
												}
											}
										});
								}),
							_elm_community$list_extra$List_Extra$uncons(head2),
							_elm_community$list_extra$List_Extra$uncons(tail2));
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p91 = f(x);
		if (_p91.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p91._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function () {
	var maybe = F2(
		function (d, f) {
			return function (_p92) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p92));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (x) {
			return function (_p93) {
				return _elm_lang$core$Maybe$Just(
					A3(
						maybe,
						{ctor: '[]'},
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(x),
						_p93));
			};
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

var _rtfeldman$hex$Hex$toString = function (num) {
	return _elm_lang$core$String$fromList(
		(_elm_lang$core$Native_Utils.cmp(num, 0) < 0) ? {
			ctor: '::',
			_0: _elm_lang$core$Native_Utils.chr('-'),
			_1: A2(
				_rtfeldman$hex$Hex$unsafePositiveToDigits,
				{ctor: '[]'},
				_elm_lang$core$Basics$negate(num))
		} : A2(
			_rtfeldman$hex$Hex$unsafePositiveToDigits,
			{ctor: '[]'},
			num));
};
var _rtfeldman$hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(num, 16) < 0) {
				return {
					ctor: '::',
					_0: _rtfeldman$hex$Hex$unsafeToDigit(num),
					_1: digits
				};
			} else {
				var _v0 = {
					ctor: '::',
					_0: _rtfeldman$hex$Hex$unsafeToDigit(
						A2(_elm_lang$core$Basics_ops['%'], num, 16)),
					_1: digits
				},
					_v1 = (num / 16) | 0;
				digits = _v0;
				num = _v1;
				continue unsafePositiveToDigits;
			}
		}
	});
var _rtfeldman$hex$Hex$unsafeToDigit = function (num) {
	var _p0 = num;
	switch (_p0) {
		case 0:
			return _elm_lang$core$Native_Utils.chr('0');
		case 1:
			return _elm_lang$core$Native_Utils.chr('1');
		case 2:
			return _elm_lang$core$Native_Utils.chr('2');
		case 3:
			return _elm_lang$core$Native_Utils.chr('3');
		case 4:
			return _elm_lang$core$Native_Utils.chr('4');
		case 5:
			return _elm_lang$core$Native_Utils.chr('5');
		case 6:
			return _elm_lang$core$Native_Utils.chr('6');
		case 7:
			return _elm_lang$core$Native_Utils.chr('7');
		case 8:
			return _elm_lang$core$Native_Utils.chr('8');
		case 9:
			return _elm_lang$core$Native_Utils.chr('9');
		case 10:
			return _elm_lang$core$Native_Utils.chr('a');
		case 11:
			return _elm_lang$core$Native_Utils.chr('b');
		case 12:
			return _elm_lang$core$Native_Utils.chr('c');
		case 13:
			return _elm_lang$core$Native_Utils.chr('d');
		case 14:
			return _elm_lang$core$Native_Utils.chr('e');
		case 15:
			return _elm_lang$core$Native_Utils.chr('f');
		default:
			return _elm_lang$core$Native_Utils.crashCase(
				'Hex',
				{
					start: {line: 138, column: 5},
					end: {line: 188, column: 84}
				},
				_p0)(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Tried to convert ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_rtfeldman$hex$Hex$toString(num),
						' to hexadecimal.')));
	}
};
var _rtfeldman$hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		var _p2 = chars;
		if (_p2.ctor === '[]') {
			return _elm_lang$core$Result$Ok(accumulated);
		} else {
			var recurse = function (additional) {
				return A3(
					_rtfeldman$hex$Hex$fromStringHelp,
					position - 1,
					_p2._1,
					accumulated + (additional * Math.pow(16, position)));
			};
			var _p3 = _p2._0;
			switch (_p3.valueOf()) {
				case '0':
					return recurse(0);
				case '1':
					return recurse(1);
				case '2':
					return recurse(2);
				case '3':
					return recurse(3);
				case '4':
					return recurse(4);
				case '5':
					return recurse(5);
				case '6':
					return recurse(6);
				case '7':
					return recurse(7);
				case '8':
					return recurse(8);
				case '9':
					return recurse(9);
				case 'a':
					return recurse(10);
				case 'b':
					return recurse(11);
				case 'c':
					return recurse(12);
				case 'd':
					return recurse(13);
				case 'e':
					return recurse(14);
				case 'f':
					return recurse(15);
				default:
					return _elm_lang$core$Result$Err(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p3),
							' is not a valid hexadecimal character.'));
			}
		}
	});
var _rtfeldman$hex$Hex$fromString = function (str) {
	if (_elm_lang$core$String$isEmpty(str)) {
		return _elm_lang$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var formatError = function (err) {
			return A2(
				_elm_lang$core$String$join,
				' ',
				{
					ctor: '::',
					_0: _elm_lang$core$Basics$toString(str),
					_1: {
						ctor: '::',
						_0: 'is not a valid hexadecimal string because',
						_1: {
							ctor: '::',
							_0: err,
							_1: {ctor: '[]'}
						}
					}
				});
		};
		var result = function () {
			if (A2(_elm_lang$core$String$startsWith, '-', str)) {
				var list = A2(
					_elm_lang$core$Maybe$withDefault,
					{ctor: '[]'},
					_elm_lang$core$List$tail(
						_elm_lang$core$String$toList(str)));
				return A2(
					_elm_lang$core$Result$map,
					_elm_lang$core$Basics$negate,
					A3(
						_rtfeldman$hex$Hex$fromStringHelp,
						_elm_lang$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					_rtfeldman$hex$Hex$fromStringHelp,
					_elm_lang$core$String$length(str) - 1,
					_elm_lang$core$String$toList(str),
					0);
			}
		}();
		return A2(_elm_lang$core$Result$mapError, formatError, result);
	}
};

var _Bogdanp$elm_ast$Ast_Expression$op = F2(
	function (ops, n) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: _Bogdanp$elm_ast$Ast_BinOp$L, _1: 9},
			A2(_elm_lang$core$Dict$get, n, ops));
	});
var _Bogdanp$elm_ast$Ast_Expression$assoc = F2(
	function (ops, n) {
		return _elm_lang$core$Tuple$first(
			A2(_Bogdanp$elm_ast$Ast_Expression$op, ops, n));
	});
var _Bogdanp$elm_ast$Ast_Expression$level = F2(
	function (ops, n) {
		return _elm_lang$core$Tuple$second(
			A2(_Bogdanp$elm_ast$Ast_Expression$op, ops, n));
	});
var _Bogdanp$elm_ast$Ast_Expression$hasLevel = F3(
	function (ops, l, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Utils.eq(
			A2(_Bogdanp$elm_ast$Ast_Expression$level, ops, _p1._0),
			l);
	});
var _Bogdanp$elm_ast$Ast_Expression$findAssoc = F3(
	function (ops, l, eops) {
		var lops = A2(
			_elm_lang$core$List$filter,
			A2(_Bogdanp$elm_ast$Ast_Expression$hasLevel, ops, l),
			eops);
		var assocs = A2(
			_elm_lang$core$List$map,
			function (_p2) {
				return A2(
					_Bogdanp$elm_ast$Ast_Expression$assoc,
					ops,
					_elm_lang$core$Tuple$first(_p2));
			},
			lops);
		var error = function (issue) {
			var operators = A2(
				_elm_lang$core$String$join,
				' and ',
				A2(_elm_lang$core$List$map, _elm_lang$core$Tuple$first, lops));
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'conflicting ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					issue,
					A2(_elm_lang$core$Basics_ops['++'], ' for operators ', operators)));
		};
		if (A2(
			_elm_lang$core$List$all,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(_Bogdanp$elm_ast$Ast_BinOp$L),
			assocs)) {
			return _elm_community$parser_combinators$Combine$succeed(_Bogdanp$elm_ast$Ast_BinOp$L);
		} else {
			if (A2(
				_elm_lang$core$List$all,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(_Bogdanp$elm_ast$Ast_BinOp$R),
				assocs)) {
				return _elm_community$parser_combinators$Combine$succeed(_Bogdanp$elm_ast$Ast_BinOp$R);
			} else {
				if (A2(
					_elm_lang$core$List$all,
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						})(_Bogdanp$elm_ast$Ast_BinOp$N),
					assocs)) {
					var _p3 = assocs;
					if ((_p3.ctor === '::') && (_p3._1.ctor === '[]')) {
						return _elm_community$parser_combinators$Combine$succeed(_Bogdanp$elm_ast$Ast_BinOp$N);
					} else {
						return _elm_community$parser_combinators$Combine$fail(
							error('precedence'));
					}
				} else {
					return _elm_community$parser_combinators$Combine$fail(
						error('associativity'));
				}
			}
		}
	});
var _Bogdanp$elm_ast$Ast_Expression$Stop = function (a) {
	return {ctor: 'Stop', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$Cont = function (a) {
	return {ctor: 'Cont', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$BinOp = F3(
	function (a, b, c) {
		return {ctor: 'BinOp', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Expression$Application = F2(
	function (a, b) {
		return {ctor: 'Application', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Expression$Lambda = F2(
	function (a, b) {
		return {ctor: 'Lambda', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Expression$Case = F2(
	function (a, b) {
		return {ctor: 'Case', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Expression$Let = F2(
	function (a, b) {
		return {ctor: 'Let', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Expression$If = F3(
	function (a, b, c) {
		return {ctor: 'If', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Expression$RecordUpdate = F2(
	function (a, b) {
		return {ctor: 'RecordUpdate', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Expression$Record = function (a) {
	return {ctor: 'Record', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$AccessFunction = function (a) {
	return {ctor: 'AccessFunction', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$accessFunction = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Expression$AccessFunction,
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_elm_community$parser_combinators$Combine$string('.'),
		_Bogdanp$elm_ast$Ast_Helpers$loName));
var _Bogdanp$elm_ast$Ast_Expression$Access = F2(
	function (a, b) {
		return {ctor: 'Access', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Expression$Tuple = function (a) {
	return {ctor: 'Tuple', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$List = function (a) {
	return {ctor: 'List', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$Variable = function (a) {
	return {ctor: 'Variable', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$variable = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Expression$Variable,
	_elm_community$parser_combinators$Combine$choice(
		{
			ctor: '::',
			_0: A2(_elm_community$parser_combinators$Combine_ops['<$>'], _elm_community$list_extra$List_Extra$singleton, _Bogdanp$elm_ast$Ast_Helpers$emptyTuple),
			_1: {
				ctor: '::',
				_0: A2(_elm_community$parser_combinators$Combine_ops['<$>'], _elm_community$list_extra$List_Extra$singleton, _Bogdanp$elm_ast$Ast_Helpers$loName),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_community$parser_combinators$Combine$sepBy1,
						_elm_community$parser_combinators$Combine$string('.'),
						_Bogdanp$elm_ast$Ast_Helpers$upName),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_community$parser_combinators$Combine_ops['<$>'],
							_elm_community$list_extra$List_Extra$singleton,
							_elm_community$parser_combinators$Combine$parens(_Bogdanp$elm_ast$Ast_Helpers$operator)),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_community$parser_combinators$Combine_ops['<$>'],
								_elm_community$list_extra$List_Extra$singleton,
								_elm_community$parser_combinators$Combine$parens(
									_elm_community$parser_combinators$Combine$regex(',+'))),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}));
var _Bogdanp$elm_ast$Ast_Expression$access = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(_elm_community$parser_combinators$Combine_ops['<$>'], _Bogdanp$elm_ast$Ast_Expression$Access, _Bogdanp$elm_ast$Ast_Expression$variable),
	_elm_community$parser_combinators$Combine$many1(
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_elm_community$parser_combinators$Combine$string('.'),
			_Bogdanp$elm_ast$Ast_Helpers$loName)));
var _Bogdanp$elm_ast$Ast_Expression$simplifiedRecord = _elm_community$parser_combinators$Combine$lazy(
	function (_p4) {
		var _p5 = _p4;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_Bogdanp$elm_ast$Ast_Expression$Record,
			_elm_community$parser_combinators$Combine$braces(
				_Bogdanp$elm_ast$Ast_Helpers$commaSeparated(
					A2(
						_elm_community$parser_combinators$Combine_ops['<$>'],
						function (a) {
							return {
								ctor: '_Tuple2',
								_0: a,
								_1: _Bogdanp$elm_ast$Ast_Expression$Variable(
									{
										ctor: '::',
										_0: a,
										_1: {ctor: '[]'}
									})
							};
						},
						_Bogdanp$elm_ast$Ast_Helpers$loName))));
	});
var _Bogdanp$elm_ast$Ast_Expression$joinL = F2(
	function (es, ops) {
		joinL:
		while (true) {
			var _p6 = {ctor: '_Tuple2', _0: es, _1: ops};
			_v3_2:
			do {
				if ((_p6.ctor === '_Tuple2') && (_p6._0.ctor === '::')) {
					if (_p6._0._1.ctor === '[]') {
						if (_p6._1.ctor === '[]') {
							return _elm_community$parser_combinators$Combine$succeed(_p6._0._0);
						} else {
							break _v3_2;
						}
					} else {
						if (_p6._1.ctor === '::') {
							var _v4 = {
								ctor: '::',
								_0: A3(
									_Bogdanp$elm_ast$Ast_Expression$BinOp,
									_Bogdanp$elm_ast$Ast_Expression$Variable(
										{
											ctor: '::',
											_0: _p6._1._0,
											_1: {ctor: '[]'}
										}),
									_p6._0._0,
									_p6._0._1._0),
								_1: _p6._0._1._1
							},
								_v5 = _p6._1._1;
							es = _v4;
							ops = _v5;
							continue joinL;
						} else {
							break _v3_2;
						}
					}
				} else {
					break _v3_2;
				}
			} while(false);
			return _elm_community$parser_combinators$Combine$fail('');
		}
	});
var _Bogdanp$elm_ast$Ast_Expression$joinR = F2(
	function (es, ops) {
		var _p7 = {ctor: '_Tuple2', _0: es, _1: ops};
		_v6_2:
		do {
			if ((_p7.ctor === '_Tuple2') && (_p7._0.ctor === '::')) {
				if (_p7._0._1.ctor === '[]') {
					if (_p7._1.ctor === '[]') {
						return _elm_community$parser_combinators$Combine$succeed(_p7._0._0);
					} else {
						break _v6_2;
					}
				} else {
					if (_p7._1.ctor === '::') {
						return A2(
							_elm_community$parser_combinators$Combine$andThen,
							function (e) {
								return _elm_community$parser_combinators$Combine$succeed(
									A3(
										_Bogdanp$elm_ast$Ast_Expression$BinOp,
										_Bogdanp$elm_ast$Ast_Expression$Variable(
											{
												ctor: '::',
												_0: _p7._1._0,
												_1: {ctor: '[]'}
											}),
										_p7._0._0,
										e));
							},
							A2(
								_Bogdanp$elm_ast$Ast_Expression$joinR,
								{ctor: '::', _0: _p7._0._1._0, _1: _p7._0._1._1},
								_p7._1._1));
					} else {
						break _v6_2;
					}
				}
			} else {
				break _v6_2;
			}
		} while(false);
		return _elm_community$parser_combinators$Combine$fail('');
	});
var _Bogdanp$elm_ast$Ast_Expression$split = F4(
	function (ops, l, e, eops) {
		var _p8 = eops;
		if (_p8.ctor === '[]') {
			return _elm_community$parser_combinators$Combine$succeed(e);
		} else {
			return A2(
				_elm_community$parser_combinators$Combine$andThen,
				function (assoc) {
					return A2(
						_elm_community$parser_combinators$Combine$andThen,
						function (es) {
							var ops_ = A2(
								_elm_lang$core$List$filterMap,
								function (x) {
									return A3(_Bogdanp$elm_ast$Ast_Expression$hasLevel, ops, l, x) ? _elm_lang$core$Maybe$Just(
										_elm_lang$core$Tuple$first(x)) : _elm_lang$core$Maybe$Nothing;
								},
								eops);
							var _p9 = assoc;
							if (_p9.ctor === 'R') {
								return A2(_Bogdanp$elm_ast$Ast_Expression$joinR, es, ops_);
							} else {
								return A2(_Bogdanp$elm_ast$Ast_Expression$joinL, es, ops_);
							}
						},
						_elm_community$parser_combinators$Combine$sequence(
							A4(_Bogdanp$elm_ast$Ast_Expression$splitLevel, ops, l, e, eops)));
				},
				A3(_Bogdanp$elm_ast$Ast_Expression$findAssoc, ops, l, eops));
		}
	});
var _Bogdanp$elm_ast$Ast_Expression$splitLevel = F4(
	function (ops, l, e, eops) {
		var _p10 = A2(
			_elm_community$list_extra$List_Extra$break,
			A2(_Bogdanp$elm_ast$Ast_Expression$hasLevel, ops, l),
			eops);
		if (_p10._1.ctor === '::') {
			return {
				ctor: '::',
				_0: A4(_Bogdanp$elm_ast$Ast_Expression$split, ops, l + 1, e, _p10._0),
				_1: A4(_Bogdanp$elm_ast$Ast_Expression$splitLevel, ops, l, _p10._1._0._1, _p10._1._1)
			};
		} else {
			return {
				ctor: '::',
				_0: A4(_Bogdanp$elm_ast$Ast_Expression$split, ops, l + 1, e, _p10._0),
				_1: {ctor: '[]'}
			};
		}
	});
var _Bogdanp$elm_ast$Ast_Expression$Float = function (a) {
	return {ctor: 'Float', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$float = A2(_elm_community$parser_combinators$Combine_ops['<$>'], _Bogdanp$elm_ast$Ast_Expression$Float, _elm_community$parser_combinators$Combine_Num$float);
var _Bogdanp$elm_ast$Ast_Expression$Integer = function (a) {
	return {ctor: 'Integer', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$integer = A2(_elm_community$parser_combinators$Combine_ops['<$>'], _Bogdanp$elm_ast$Ast_Expression$Integer, _elm_community$parser_combinators$Combine_Num$int);
var _Bogdanp$elm_ast$Ast_Expression$String = function (a) {
	return {ctor: 'String', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$string = function () {
	var multiString = A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		function (_p11) {
			return _Bogdanp$elm_ast$Ast_Expression$String(
				_elm_lang$core$String$concat(_p11));
		},
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_elm_community$parser_combinators$Combine$string('\"\"\"'),
				_elm_community$parser_combinators$Combine$many(
					_elm_community$parser_combinators$Combine$regex('[^\"]*'))),
			_elm_community$parser_combinators$Combine$string('\"\"\"')));
	var singleString = A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Expression$String,
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_elm_community$parser_combinators$Combine$string('\"'),
				_elm_community$parser_combinators$Combine$regex('(\\\\\\\\|\\\\\"|[^\"\n])*')),
			_elm_community$parser_combinators$Combine$string('\"')));
	return A2(_elm_community$parser_combinators$Combine_ops['<|>'], multiString, singleString);
}();
var _Bogdanp$elm_ast$Ast_Expression$Character = function (a) {
	return {ctor: 'Character', _0: a};
};
var _Bogdanp$elm_ast$Ast_Expression$character = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Expression$Character,
	A2(
		_Bogdanp$elm_ast$Ast_Helpers$between_,
		_elm_community$parser_combinators$Combine$string('\''),
		A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['>>='],
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_elm_community$parser_combinators$Combine$string('\\'),
					_elm_community$parser_combinators$Combine$regex('(n|t|r|\\\\|x..)')),
				function (a) {
					var _p12 = _elm_lang$core$String$uncons(a);
					_v10_6:
					do {
						if (_p12.ctor === 'Just') {
							if (_p12._0.ctor === '_Tuple2') {
								switch (_p12._0._0.valueOf()) {
									case 'n':
										if (_p12._0._1 === '') {
											return _elm_community$parser_combinators$Combine$succeed(
												_elm_lang$core$Native_Utils.chr('\n'));
										} else {
											break _v10_6;
										}
									case 't':
										if (_p12._0._1 === '') {
											return _elm_community$parser_combinators$Combine$succeed(
												_elm_lang$core$Native_Utils.chr('\t'));
										} else {
											break _v10_6;
										}
									case 'r':
										if (_p12._0._1 === '') {
											return _elm_community$parser_combinators$Combine$succeed(
												_elm_lang$core$Native_Utils.chr('\r'));
										} else {
											break _v10_6;
										}
									case '\\':
										if (_p12._0._1 === '') {
											return _elm_community$parser_combinators$Combine$succeed(
												_elm_lang$core$Native_Utils.chr('\\'));
										} else {
											break _v10_6;
										}
									case '0':
										if (_p12._0._1 === '') {
											return _elm_community$parser_combinators$Combine$succeed(
												_elm_lang$core$Native_Utils.chr(' '));
										} else {
											break _v10_6;
										}
									case 'x':
										return A2(
											_elm_lang$core$Result$withDefault,
											_elm_community$parser_combinators$Combine$fail('Invalid charcode'),
											A2(
												_elm_lang$core$Result$map,
												_elm_community$parser_combinators$Combine$succeed,
												A2(
													_elm_lang$core$Result$map,
													_elm_lang$core$Char$fromCode,
													_rtfeldman$hex$Hex$fromString(
														_elm_lang$core$String$toLower(_p12._0._1)))));
									default:
										break _v10_6;
								}
							} else {
								break _v10_6;
							}
						} else {
							return _elm_community$parser_combinators$Combine$fail('No character');
						}
					} while(false);
					return _elm_community$parser_combinators$Combine$fail(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'No such character as \\',
							_elm_lang$core$Basics$toString(_p12._0)));
				}),
			_elm_community$parser_combinators$Combine_Char$anyChar)));
var _Bogdanp$elm_ast$Ast_Expression$term = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p13) {
			var _p14 = _p13;
			return _elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Expression$character,
					_1: {
						ctor: '::',
						_0: _Bogdanp$elm_ast$Ast_Expression$string,
						_1: {
							ctor: '::',
							_0: _Bogdanp$elm_ast$Ast_Expression$float,
							_1: {
								ctor: '::',
								_0: _Bogdanp$elm_ast$Ast_Expression$integer,
								_1: {
									ctor: '::',
									_0: _Bogdanp$elm_ast$Ast_Expression$access,
									_1: {
										ctor: '::',
										_0: _Bogdanp$elm_ast$Ast_Expression$accessFunction,
										_1: {
											ctor: '::',
											_0: _Bogdanp$elm_ast$Ast_Expression$variable,
											_1: {
												ctor: '::',
												_0: _Bogdanp$elm_ast$Ast_Expression$list(ops),
												_1: {
													ctor: '::',
													_0: _Bogdanp$elm_ast$Ast_Expression$tuple(ops),
													_1: {
														ctor: '::',
														_0: _Bogdanp$elm_ast$Ast_Expression$recordUpdate(ops),
														_1: {
															ctor: '::',
															_0: _Bogdanp$elm_ast$Ast_Expression$record(ops),
															_1: {
																ctor: '::',
																_0: _Bogdanp$elm_ast$Ast_Expression$simplifiedRecord,
																_1: {
																	ctor: '::',
																	_0: _elm_community$parser_combinators$Combine$parens(
																		A2(
																			_Bogdanp$elm_ast$Ast_Helpers$between_,
																			_elm_community$parser_combinators$Combine$whitespace,
																			_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				});
		});
};
var _Bogdanp$elm_ast$Ast_Expression$expression = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p15) {
			var _p16 = _p15;
			return _elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Expression$letExpression(ops),
					_1: {
						ctor: '::',
						_0: _Bogdanp$elm_ast$Ast_Expression$caseExpression(ops),
						_1: {
							ctor: '::',
							_0: _Bogdanp$elm_ast$Ast_Expression$ifExpression(ops),
							_1: {
								ctor: '::',
								_0: _Bogdanp$elm_ast$Ast_Expression$lambda(ops),
								_1: {
									ctor: '::',
									_0: _Bogdanp$elm_ast$Ast_Expression$binary(ops),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				});
		});
};
var _Bogdanp$elm_ast$Ast_Expression$binary = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p17) {
			var _p18 = _p17;
			var next = A2(
				_elm_community$parser_combinators$Combine$andThen,
				function (op) {
					return A2(
						_elm_community$parser_combinators$Combine$andThen,
						function (e) {
							var _p19 = e;
							if (_p19.ctor === 'Cont') {
								return A2(
									_elm_community$parser_combinators$Combine_ops['<$>'],
									F2(
										function (x, y) {
											return {ctor: '::', _0: x, _1: y};
										})(
										{ctor: '_Tuple2', _0: op, _1: _p19._0}),
									collect);
							} else {
								return _elm_community$parser_combinators$Combine$succeed(
									{
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: op, _1: _p19._0},
										_1: {ctor: '[]'}
									});
							}
						},
						_elm_community$parser_combinators$Combine$choice(
							{
								ctor: '::',
								_0: A2(
									_elm_community$parser_combinators$Combine_ops['<$>'],
									_Bogdanp$elm_ast$Ast_Expression$Cont,
									_Bogdanp$elm_ast$Ast_Expression$application(ops)),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_community$parser_combinators$Combine_ops['<$>'],
										_Bogdanp$elm_ast$Ast_Expression$Stop,
										_Bogdanp$elm_ast$Ast_Expression$expression(ops)),
									_1: {ctor: '[]'}
								}
							}));
				},
				A2(
					_Bogdanp$elm_ast$Ast_Helpers$between_,
					_elm_community$parser_combinators$Combine$whitespace,
					_elm_community$parser_combinators$Combine$choice(
						{
							ctor: '::',
							_0: _Bogdanp$elm_ast$Ast_Helpers$operator,
							_1: {
								ctor: '::',
								_0: _Bogdanp$elm_ast$Ast_Helpers$symbol_('as'),
								_1: {ctor: '[]'}
							}
						})));
			var collect = A2(
				_elm_community$parser_combinators$Combine_ops['<|>'],
				next,
				_elm_community$parser_combinators$Combine$succeed(
					{ctor: '[]'}));
			return A2(
				_elm_community$parser_combinators$Combine$andThen,
				function (e) {
					return A2(
						_elm_community$parser_combinators$Combine$andThen,
						function (eops) {
							return A4(_Bogdanp$elm_ast$Ast_Expression$split, ops, 0, e, eops);
						},
						collect);
				},
				_Bogdanp$elm_ast$Ast_Expression$application(ops));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$application = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p20) {
			var _p21 = _p20;
			return A2(
				_elm_community$parser_combinators$Combine$chainl,
				A2(
					_elm_community$parser_combinators$Combine_ops['<$'],
					_Bogdanp$elm_ast$Ast_Expression$Application,
					_Bogdanp$elm_ast$Ast_Expression$spacesOrIndentedNewline(ops)),
				_Bogdanp$elm_ast$Ast_Expression$term(ops));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$spacesOrIndentedNewline = function (ops) {
	var startsBinding = A2(
		_elm_community$parser_combinators$Combine$or,
		_Bogdanp$elm_ast$Ast_Expression$letBinding(ops),
		_Bogdanp$elm_ast$Ast_Expression$caseBinding(ops));
	var failAtBinding = A2(
		_elm_community$parser_combinators$Combine$andThen,
		function (x) {
			var _p22 = x;
			if (_p22.ctor === 'Just') {
				return _elm_community$parser_combinators$Combine$fail('next line starts a new case or let binding');
			} else {
				return _elm_community$parser_combinators$Combine$succeed('');
			}
		},
		_elm_community$parser_combinators$Combine$maybe(startsBinding));
	return A2(
		_elm_community$parser_combinators$Combine$or,
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				A2(_elm_community$parser_combinators$Combine_ops['*>'], _Bogdanp$elm_ast$Ast_Helpers$spaces, _elm_community$parser_combinators$Combine_Char$newline),
				_Bogdanp$elm_ast$Ast_Helpers$spaces_),
			_elm_community$parser_combinators$Combine$lookAhead(failAtBinding)),
		_Bogdanp$elm_ast$Ast_Helpers$spaces_);
};
var _Bogdanp$elm_ast$Ast_Expression$caseBinding = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p23) {
			var _p24 = _p23;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_elm_community$parser_combinators$Combine$whitespace,
						_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('->'),
					_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$letBinding = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p25) {
			var _p26 = _p25;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					A2(
						_Bogdanp$elm_ast$Ast_Helpers$between_,
						_elm_community$parser_combinators$Combine$whitespace,
						_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('='),
					_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$caseExpression = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p27) {
			var _p28 = _p27;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					_Bogdanp$elm_ast$Ast_Expression$Case,
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_Bogdanp$elm_ast$Ast_Helpers$symbol('case'),
						_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('of'),
					_elm_community$parser_combinators$Combine$many1(
						_Bogdanp$elm_ast$Ast_Expression$caseBinding(ops))));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$ifExpression = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p29) {
			var _p30 = _p29;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<*>'],
					A2(
						_elm_community$parser_combinators$Combine_ops['<$>'],
						_Bogdanp$elm_ast$Ast_Expression$If,
						A2(
							_elm_community$parser_combinators$Combine_ops['*>'],
							_Bogdanp$elm_ast$Ast_Helpers$symbol('if'),
							_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_Bogdanp$elm_ast$Ast_Helpers$symbol('then'),
						_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('else'),
					_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$lambda = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p31) {
			var _p32 = _p31;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					_Bogdanp$elm_ast$Ast_Expression$Lambda,
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_Bogdanp$elm_ast$Ast_Helpers$symbol('\\'),
						_elm_community$parser_combinators$Combine$many(
							A2(
								_Bogdanp$elm_ast$Ast_Helpers$between_,
								_Bogdanp$elm_ast$Ast_Helpers$spaces,
								_Bogdanp$elm_ast$Ast_Expression$term(ops))))),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('->'),
					_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$letExpression = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p33) {
			var _p34 = _p33;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					_Bogdanp$elm_ast$Ast_Expression$Let,
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_Bogdanp$elm_ast$Ast_Helpers$symbol_('let'),
						_elm_community$parser_combinators$Combine$many1(
							_Bogdanp$elm_ast$Ast_Expression$letBinding(ops)))),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('in'),
					_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$list = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p35) {
			var _p36 = _p35;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_Bogdanp$elm_ast$Ast_Expression$List,
				_elm_community$parser_combinators$Combine$brackets(
					_Bogdanp$elm_ast$Ast_Helpers$commaSeparated_(
						_Bogdanp$elm_ast$Ast_Expression$expression(ops))));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$record = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p37) {
			var _p38 = _p37;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_Bogdanp$elm_ast$Ast_Expression$Record,
				_elm_community$parser_combinators$Combine$braces(
					_Bogdanp$elm_ast$Ast_Helpers$commaSeparated(
						A2(
							_elm_community$parser_combinators$Combine_ops['<*>'],
							A2(
								_elm_community$parser_combinators$Combine_ops['<$>'],
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								_Bogdanp$elm_ast$Ast_Helpers$loName),
							A2(
								_elm_community$parser_combinators$Combine_ops['*>'],
								_Bogdanp$elm_ast$Ast_Helpers$symbol('='),
								_Bogdanp$elm_ast$Ast_Expression$expression(ops))))));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$recordUpdate = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					_Bogdanp$elm_ast$Ast_Expression$RecordUpdate,
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_Bogdanp$elm_ast$Ast_Helpers$symbol('{'),
						_Bogdanp$elm_ast$Ast_Helpers$loName)),
				A2(
					_elm_community$parser_combinators$Combine_ops['<*'],
					A2(
						_elm_community$parser_combinators$Combine_ops['*>'],
						_Bogdanp$elm_ast$Ast_Helpers$symbol('|'),
						_Bogdanp$elm_ast$Ast_Helpers$commaSeparated(
							A2(
								_elm_community$parser_combinators$Combine_ops['<*>'],
								A2(
									_elm_community$parser_combinators$Combine_ops['<$>'],
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_Bogdanp$elm_ast$Ast_Helpers$loName),
								A2(
									_elm_community$parser_combinators$Combine_ops['*>'],
									_Bogdanp$elm_ast$Ast_Helpers$symbol('='),
									_Bogdanp$elm_ast$Ast_Expression$expression(ops))))),
					_Bogdanp$elm_ast$Ast_Helpers$symbol('}')));
		});
};
var _Bogdanp$elm_ast$Ast_Expression$tuple = function (ops) {
	return _elm_community$parser_combinators$Combine$lazy(
		function (_p41) {
			var _p42 = _p41;
			return A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_Bogdanp$elm_ast$Ast_Expression$Tuple,
				A2(
					_elm_community$parser_combinators$Combine_ops['>>='],
					_elm_community$parser_combinators$Combine$parens(
						_Bogdanp$elm_ast$Ast_Helpers$commaSeparated_(
							_Bogdanp$elm_ast$Ast_Expression$expression(ops))),
					function (a) {
						var _p43 = a;
						if ((_p43.ctor === '::') && (_p43._1.ctor === '[]')) {
							return _elm_community$parser_combinators$Combine$fail('No single tuples');
						} else {
							return _elm_community$parser_combinators$Combine$succeed(_p43);
						}
					}));
		});
};

var _Bogdanp$elm_ast$Ast_Statement$TypeExport = F2(
	function (a, b) {
		return {ctor: 'TypeExport', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$FunctionExport = function (a) {
	return {ctor: 'FunctionExport', _0: a};
};
var _Bogdanp$elm_ast$Ast_Statement$functionExport = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Statement$FunctionExport,
	_elm_community$parser_combinators$Combine$choice(
		{
			ctor: '::',
			_0: _Bogdanp$elm_ast$Ast_Helpers$functionName,
			_1: {
				ctor: '::',
				_0: _elm_community$parser_combinators$Combine$parens(_Bogdanp$elm_ast$Ast_Helpers$operator),
				_1: {ctor: '[]'}
			}
		}));
var _Bogdanp$elm_ast$Ast_Statement$SubsetExport = function (a) {
	return {ctor: 'SubsetExport', _0: a};
};
var _Bogdanp$elm_ast$Ast_Statement$constructorSubsetExports = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Statement$SubsetExport,
	_Bogdanp$elm_ast$Ast_Helpers$commaSeparated(
		A2(_elm_community$parser_combinators$Combine_ops['<$>'], _Bogdanp$elm_ast$Ast_Statement$FunctionExport, _Bogdanp$elm_ast$Ast_Helpers$upName)));
var _Bogdanp$elm_ast$Ast_Statement$AllExport = {ctor: 'AllExport'};
var _Bogdanp$elm_ast$Ast_Statement$allExport = A2(
	_elm_community$parser_combinators$Combine_ops['<$'],
	_Bogdanp$elm_ast$Ast_Statement$AllExport,
	_Bogdanp$elm_ast$Ast_Helpers$symbol('..'));
var _Bogdanp$elm_ast$Ast_Statement$constructorExports = _elm_community$parser_combinators$Combine$maybe(
	_elm_community$parser_combinators$Combine$parens(
		_elm_community$parser_combinators$Combine$choice(
			{
				ctor: '::',
				_0: _Bogdanp$elm_ast$Ast_Statement$allExport,
				_1: {
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Statement$constructorSubsetExports,
					_1: {ctor: '[]'}
				}
			})));
var _Bogdanp$elm_ast$Ast_Statement$typeExport = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$TypeExport,
		A2(_elm_community$parser_combinators$Combine_ops['<*'], _Bogdanp$elm_ast$Ast_Helpers$upName, _Bogdanp$elm_ast$Ast_Helpers$spaces)),
	_Bogdanp$elm_ast$Ast_Statement$constructorExports);
var _Bogdanp$elm_ast$Ast_Statement$subsetExport = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Statement$SubsetExport,
	_Bogdanp$elm_ast$Ast_Helpers$commaSeparated(
		A2(_elm_community$parser_combinators$Combine$or, _Bogdanp$elm_ast$Ast_Statement$typeExport, _Bogdanp$elm_ast$Ast_Statement$functionExport)));
var _Bogdanp$elm_ast$Ast_Statement$exports = _elm_community$parser_combinators$Combine$parens(
	_elm_community$parser_combinators$Combine$choice(
		{
			ctor: '::',
			_0: _Bogdanp$elm_ast$Ast_Statement$allExport,
			_1: {
				ctor: '::',
				_0: _Bogdanp$elm_ast$Ast_Statement$subsetExport,
				_1: {ctor: '[]'}
			}
		}));
var _Bogdanp$elm_ast$Ast_Statement$TypeApplication = F2(
	function (a, b) {
		return {ctor: 'TypeApplication', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$typeApplication = A2(
	_elm_community$parser_combinators$Combine_ops['<$'],
	_Bogdanp$elm_ast$Ast_Statement$TypeApplication,
	_Bogdanp$elm_ast$Ast_Helpers$symbol('->'));
var _Bogdanp$elm_ast$Ast_Statement$TypeTuple = function (a) {
	return {ctor: 'TypeTuple', _0: a};
};
var _Bogdanp$elm_ast$Ast_Statement$TypeRecord = function (a) {
	return {ctor: 'TypeRecord', _0: a};
};
var _Bogdanp$elm_ast$Ast_Statement$TypeRecordConstructor = F2(
	function (a, b) {
		return {ctor: 'TypeRecordConstructor', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$TypeVariable = function (a) {
	return {ctor: 'TypeVariable', _0: a};
};
var _Bogdanp$elm_ast$Ast_Statement$typeVariable = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Statement$TypeVariable,
	_elm_community$parser_combinators$Combine$regex('[a-z]+(\\w|_)*'));
var _Bogdanp$elm_ast$Ast_Statement$TypeConstructor = F2(
	function (a, b) {
		return {ctor: 'TypeConstructor', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$typeConstant = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$TypeConstructor,
		A2(
			_elm_community$parser_combinators$Combine$sepBy1,
			_elm_community$parser_combinators$Combine$string('.'),
			_Bogdanp$elm_ast$Ast_Helpers$upName)),
	_elm_community$parser_combinators$Combine$succeed(
		{ctor: '[]'}));
var _Bogdanp$elm_ast$Ast_Statement$typeConstructor = _elm_community$parser_combinators$Combine$lazy(
	function (_p0) {
		var _p1 = _p0;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_Bogdanp$elm_ast$Ast_Statement$TypeConstructor,
				A2(
					_elm_community$parser_combinators$Combine$sepBy1,
					_elm_community$parser_combinators$Combine$string('.'),
					_Bogdanp$elm_ast$Ast_Helpers$upName)),
			_elm_community$parser_combinators$Combine$many(_Bogdanp$elm_ast$Ast_Statement$typeParameter));
	});
var _Bogdanp$elm_ast$Ast_Statement$typeParameter = _elm_community$parser_combinators$Combine$lazy(
	function (_p2) {
		var _p3 = _p2;
		return A2(
			_Bogdanp$elm_ast$Ast_Helpers$between_,
			A2(
				_elm_community$parser_combinators$Combine$or,
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					A2(_elm_community$parser_combinators$Combine_ops['*>'], _Bogdanp$elm_ast$Ast_Helpers$spaces, _elm_community$parser_combinators$Combine_Char$newline),
					_Bogdanp$elm_ast$Ast_Helpers$spaces_),
				_Bogdanp$elm_ast$Ast_Helpers$spaces),
			_elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Statement$typeVariable,
					_1: {
						ctor: '::',
						_0: _Bogdanp$elm_ast$Ast_Statement$typeConstant,
						_1: {
							ctor: '::',
							_0: _Bogdanp$elm_ast$Ast_Statement$typeRecordConstructor,
							_1: {
								ctor: '::',
								_0: _Bogdanp$elm_ast$Ast_Statement$typeRecord,
								_1: {
									ctor: '::',
									_0: _Bogdanp$elm_ast$Ast_Statement$typeTuple,
									_1: {
										ctor: '::',
										_0: _elm_community$parser_combinators$Combine$parens(_Bogdanp$elm_ast$Ast_Statement$typeAnnotation),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}));
	});
var _Bogdanp$elm_ast$Ast_Statement$typeAnnotation = _elm_community$parser_combinators$Combine$lazy(
	function (_p4) {
		var _p5 = _p4;
		return A2(_elm_community$parser_combinators$Combine$chainr, _Bogdanp$elm_ast$Ast_Statement$typeApplication, _Bogdanp$elm_ast$Ast_Statement$type_);
	});
var _Bogdanp$elm_ast$Ast_Statement$type_ = _elm_community$parser_combinators$Combine$lazy(
	function (_p6) {
		var _p7 = _p6;
		return A2(
			_Bogdanp$elm_ast$Ast_Helpers$between_,
			_Bogdanp$elm_ast$Ast_Helpers$spaces,
			_elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Statement$typeConstructor,
					_1: {
						ctor: '::',
						_0: _Bogdanp$elm_ast$Ast_Statement$typeVariable,
						_1: {
							ctor: '::',
							_0: _Bogdanp$elm_ast$Ast_Statement$typeRecordConstructor,
							_1: {
								ctor: '::',
								_0: _Bogdanp$elm_ast$Ast_Statement$typeRecord,
								_1: {
									ctor: '::',
									_0: _Bogdanp$elm_ast$Ast_Statement$typeTuple,
									_1: {
										ctor: '::',
										_0: _elm_community$parser_combinators$Combine$parens(_Bogdanp$elm_ast$Ast_Statement$typeAnnotation),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}));
	});
var _Bogdanp$elm_ast$Ast_Statement$typeRecord = _elm_community$parser_combinators$Combine$lazy(
	function (_p8) {
		var _p9 = _p8;
		return _elm_community$parser_combinators$Combine$braces(
			A2(_elm_community$parser_combinators$Combine_ops['<$>'], _Bogdanp$elm_ast$Ast_Statement$TypeRecord, _Bogdanp$elm_ast$Ast_Statement$typeRecordPairs));
	});
var _Bogdanp$elm_ast$Ast_Statement$typeRecordPairs = _elm_community$parser_combinators$Combine$lazy(
	function (_p10) {
		var _p11 = _p10;
		return _Bogdanp$elm_ast$Ast_Helpers$commaSeparated_(_Bogdanp$elm_ast$Ast_Statement$typeRecordPair);
	});
var _Bogdanp$elm_ast$Ast_Statement$typeRecordPair = _elm_community$parser_combinators$Combine$lazy(
	function (_p12) {
		var _p13 = _p12;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				A2(
					_elm_community$parser_combinators$Combine_ops['<*'],
					_Bogdanp$elm_ast$Ast_Helpers$loName,
					_Bogdanp$elm_ast$Ast_Helpers$symbol(':'))),
			_Bogdanp$elm_ast$Ast_Statement$typeAnnotation);
	});
var _Bogdanp$elm_ast$Ast_Statement$typeRecordConstructor = _elm_community$parser_combinators$Combine$lazy(
	function (_p14) {
		var _p15 = _p14;
		return _elm_community$parser_combinators$Combine$braces(
			A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					_Bogdanp$elm_ast$Ast_Statement$TypeRecordConstructor,
					A2(_Bogdanp$elm_ast$Ast_Helpers$between_, _Bogdanp$elm_ast$Ast_Helpers$spaces, _Bogdanp$elm_ast$Ast_Statement$typeVariable)),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$symbol('|'),
					_Bogdanp$elm_ast$Ast_Statement$typeRecordPairs)));
	});
var _Bogdanp$elm_ast$Ast_Statement$typeTuple = _elm_community$parser_combinators$Combine$lazy(
	function (_p16) {
		var _p17 = _p16;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_Bogdanp$elm_ast$Ast_Statement$TypeTuple,
			_elm_community$parser_combinators$Combine$parens(
				_Bogdanp$elm_ast$Ast_Helpers$commaSeparated_(_Bogdanp$elm_ast$Ast_Statement$type_)));
	});
var _Bogdanp$elm_ast$Ast_Statement$Comment = function (a) {
	return {ctor: 'Comment', _0: a};
};
var _Bogdanp$elm_ast$Ast_Statement$singleLineComment = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_Bogdanp$elm_ast$Ast_Statement$Comment,
	A2(
		_elm_community$parser_combinators$Combine_ops['<*'],
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_elm_community$parser_combinators$Combine$string('--'),
			_elm_community$parser_combinators$Combine$regex('.*')),
		_elm_community$parser_combinators$Combine$whitespace));
var _Bogdanp$elm_ast$Ast_Statement$multiLineComment = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	function (_p18) {
		return _Bogdanp$elm_ast$Ast_Statement$Comment(
			_elm_lang$core$String$fromList(_p18));
	},
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_elm_community$parser_combinators$Combine$string('{-'),
		A2(
			_elm_community$parser_combinators$Combine$manyTill,
			_elm_community$parser_combinators$Combine_Char$anyChar,
			_elm_community$parser_combinators$Combine$string('-}'))));
var _Bogdanp$elm_ast$Ast_Statement$comment = A2(_elm_community$parser_combinators$Combine_ops['<|>'], _Bogdanp$elm_ast$Ast_Statement$singleLineComment, _Bogdanp$elm_ast$Ast_Statement$multiLineComment);
var _Bogdanp$elm_ast$Ast_Statement$InfixDeclaration = F3(
	function (a, b, c) {
		return {ctor: 'InfixDeclaration', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Statement$infixDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_Bogdanp$elm_ast$Ast_Statement$InfixDeclaration,
			_elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: A2(
						_elm_community$parser_combinators$Combine_ops['<$'],
						_Bogdanp$elm_ast$Ast_BinOp$L,
						_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('infixl')),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_community$parser_combinators$Combine_ops['<$'],
							_Bogdanp$elm_ast$Ast_BinOp$R,
							_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('infixr')),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_community$parser_combinators$Combine_ops['<$'],
								_Bogdanp$elm_ast$Ast_BinOp$N,
								_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('infix')),
							_1: {ctor: '[]'}
						}
					}
				})),
		A2(_elm_community$parser_combinators$Combine_ops['*>'], _Bogdanp$elm_ast$Ast_Helpers$spaces, _elm_community$parser_combinators$Combine_Num$int)),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_Bogdanp$elm_ast$Ast_Helpers$spaces,
		A2(_elm_community$parser_combinators$Combine_ops['<|>'], _Bogdanp$elm_ast$Ast_Helpers$loName, _Bogdanp$elm_ast$Ast_Helpers$operator)));
var _Bogdanp$elm_ast$Ast_Statement$infixStatements = function () {
	var statements = A2(
		_elm_community$parser_combinators$Combine_ops['<*'],
		_elm_community$parser_combinators$Combine$many(
			A2(
				_elm_community$parser_combinators$Combine_ops['<*'],
				_elm_community$parser_combinators$Combine$choice(
					{
						ctor: '::',
						_0: A2(_elm_community$parser_combinators$Combine_ops['<$>'], _elm_lang$core$Maybe$Just, _Bogdanp$elm_ast$Ast_Statement$infixDeclaration),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_community$parser_combinators$Combine_ops['<$'],
								_elm_lang$core$Maybe$Nothing,
								_elm_community$parser_combinators$Combine$regex('.*')),
							_1: {ctor: '[]'}
						}
					}),
				_elm_community$parser_combinators$Combine$whitespace)),
		_elm_community$parser_combinators$Combine$end);
	return A2(
		_elm_community$parser_combinators$Combine$andThen,
		function (xs) {
			return _elm_community$parser_combinators$Combine$succeed(
				A2(_elm_lang$core$List$filterMap, _elm_lang$core$Basics$identity, xs));
		},
		statements);
}();
var _Bogdanp$elm_ast$Ast_Statement$opTable = function (ops) {
	var collect = F2(
		function (s, d) {
			var _p19 = s;
			if (_p19.ctor === 'InfixDeclaration') {
				return A3(
					_elm_lang$core$Dict$insert,
					_p19._2,
					{ctor: '_Tuple2', _0: _p19._0, _1: _p19._1},
					d);
			} else {
				return _elm_lang$core$Native_Utils.crashCase(
					'Ast.Statement',
					{
						start: {line: 414, column: 13},
						end: {line: 419, column: 45}
					},
					_p19)('impossible');
			}
		});
	return A2(
		_elm_community$parser_combinators$Combine$andThen,
		function (xs) {
			return _elm_community$parser_combinators$Combine$succeed(
				A3(_elm_lang$core$List$foldr, collect, ops, xs));
		},
		_Bogdanp$elm_ast$Ast_Statement$infixStatements);
};
var _Bogdanp$elm_ast$Ast_Statement$FunctionDeclaration = F3(
	function (a, b, c) {
		return {ctor: 'FunctionDeclaration', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Statement$functionDeclaration = function (ops) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_Bogdanp$elm_ast$Ast_Statement$FunctionDeclaration,
				_elm_community$parser_combinators$Combine$choice(
					{
						ctor: '::',
						_0: _Bogdanp$elm_ast$Ast_Helpers$loName,
						_1: {
							ctor: '::',
							_0: _elm_community$parser_combinators$Combine$parens(_Bogdanp$elm_ast$Ast_Helpers$operator),
							_1: {ctor: '[]'}
						}
					})),
			_elm_community$parser_combinators$Combine$many(
				A2(
					_Bogdanp$elm_ast$Ast_Helpers$between_,
					_elm_community$parser_combinators$Combine$whitespace,
					_Bogdanp$elm_ast$Ast_Expression$term(ops)))),
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_Bogdanp$elm_ast$Ast_Helpers$symbol('='),
				_elm_community$parser_combinators$Combine$whitespace),
			_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
};
var _Bogdanp$elm_ast$Ast_Statement$FunctionTypeDeclaration = F2(
	function (a, b) {
		return {ctor: 'FunctionTypeDeclaration', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$functionTypeDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$FunctionTypeDeclaration,
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			_elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Helpers$loName,
					_1: {
						ctor: '::',
						_0: _elm_community$parser_combinators$Combine$parens(_Bogdanp$elm_ast$Ast_Helpers$operator),
						_1: {ctor: '[]'}
					}
				}),
			_Bogdanp$elm_ast$Ast_Helpers$symbol(':'))),
	_Bogdanp$elm_ast$Ast_Statement$typeAnnotation);
var _Bogdanp$elm_ast$Ast_Statement$PortDeclaration = F3(
	function (a, b, c) {
		return {ctor: 'PortDeclaration', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Statement$portDeclaration = function (ops) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_Bogdanp$elm_ast$Ast_Statement$PortDeclaration,
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('port'),
					_Bogdanp$elm_ast$Ast_Helpers$loName)),
			_elm_community$parser_combinators$Combine$many(
				A2(_Bogdanp$elm_ast$Ast_Helpers$between_, _Bogdanp$elm_ast$Ast_Helpers$spaces, _Bogdanp$elm_ast$Ast_Helpers$loName))),
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_Bogdanp$elm_ast$Ast_Helpers$symbol('='),
			_Bogdanp$elm_ast$Ast_Expression$expression(ops)));
};
var _Bogdanp$elm_ast$Ast_Statement$PortTypeDeclaration = F2(
	function (a, b) {
		return {ctor: 'PortTypeDeclaration', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$portTypeDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$PortTypeDeclaration,
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('port'),
			_Bogdanp$elm_ast$Ast_Helpers$loName)),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_Bogdanp$elm_ast$Ast_Helpers$symbol(':'),
		_Bogdanp$elm_ast$Ast_Statement$typeAnnotation));
var _Bogdanp$elm_ast$Ast_Statement$TypeDeclaration = F2(
	function (a, b) {
		return {ctor: 'TypeDeclaration', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$typeDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$TypeDeclaration,
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('type'),
			_Bogdanp$elm_ast$Ast_Statement$type_)),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_elm_community$parser_combinators$Combine$whitespace,
			_Bogdanp$elm_ast$Ast_Helpers$symbol('=')),
		A2(
			_elm_community$parser_combinators$Combine$sepBy1,
			_Bogdanp$elm_ast$Ast_Helpers$symbol('|'),
			A2(_Bogdanp$elm_ast$Ast_Helpers$between_, _elm_community$parser_combinators$Combine$whitespace, _Bogdanp$elm_ast$Ast_Statement$typeConstructor))));
var _Bogdanp$elm_ast$Ast_Statement$TypeAliasDeclaration = F2(
	function (a, b) {
		return {ctor: 'TypeAliasDeclaration', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$typeAliasDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$TypeAliasDeclaration,
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('type'),
				_Bogdanp$elm_ast$Ast_Helpers$symbol('alias')),
			_Bogdanp$elm_ast$Ast_Statement$type_)),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_elm_community$parser_combinators$Combine$whitespace,
			_Bogdanp$elm_ast$Ast_Helpers$symbol('=')),
		_Bogdanp$elm_ast$Ast_Statement$typeAnnotation));
var _Bogdanp$elm_ast$Ast_Statement$ImportStatement = F3(
	function (a, b, c) {
		return {ctor: 'ImportStatement', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Statement$importStatement = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_Bogdanp$elm_ast$Ast_Statement$ImportStatement,
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('import'),
				_Bogdanp$elm_ast$Ast_Helpers$moduleName)),
		_elm_community$parser_combinators$Combine$maybe(
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_Bogdanp$elm_ast$Ast_Helpers$symbol('as'),
				_Bogdanp$elm_ast$Ast_Helpers$upName))),
	_elm_community$parser_combinators$Combine$maybe(
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_Bogdanp$elm_ast$Ast_Helpers$symbol('exposing'),
			_Bogdanp$elm_ast$Ast_Statement$exports)));
var _Bogdanp$elm_ast$Ast_Statement$EffectModuleDeclaration = F3(
	function (a, b, c) {
		return {ctor: 'EffectModuleDeclaration', _0: a, _1: b, _2: c};
	});
var _Bogdanp$elm_ast$Ast_Statement$effectModuleDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_Bogdanp$elm_ast$Ast_Statement$EffectModuleDeclaration,
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('effect'),
					_Bogdanp$elm_ast$Ast_Helpers$symbol('module')),
				_Bogdanp$elm_ast$Ast_Helpers$moduleName)),
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_Bogdanp$elm_ast$Ast_Helpers$symbol('where'),
			_elm_community$parser_combinators$Combine$braces(
				_Bogdanp$elm_ast$Ast_Helpers$commaSeparated(
					A2(
						_elm_community$parser_combinators$Combine_ops['<*>'],
						A2(
							_elm_community$parser_combinators$Combine_ops['<$>'],
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								}),
							_Bogdanp$elm_ast$Ast_Helpers$loName),
						A2(
							_elm_community$parser_combinators$Combine_ops['*>'],
							_Bogdanp$elm_ast$Ast_Helpers$symbol('='),
							_Bogdanp$elm_ast$Ast_Helpers$upName)))))),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_Bogdanp$elm_ast$Ast_Helpers$symbol('exposing'),
		_Bogdanp$elm_ast$Ast_Statement$exports));
var _Bogdanp$elm_ast$Ast_Statement$PortModuleDeclaration = F2(
	function (a, b) {
		return {ctor: 'PortModuleDeclaration', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$portModuleDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$PortModuleDeclaration,
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('port'),
				_Bogdanp$elm_ast$Ast_Helpers$symbol('module')),
			_Bogdanp$elm_ast$Ast_Helpers$moduleName)),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_Bogdanp$elm_ast$Ast_Helpers$symbol('exposing'),
		_Bogdanp$elm_ast$Ast_Statement$exports));
var _Bogdanp$elm_ast$Ast_Statement$ModuleDeclaration = F2(
	function (a, b) {
		return {ctor: 'ModuleDeclaration', _0: a, _1: b};
	});
var _Bogdanp$elm_ast$Ast_Statement$moduleDeclaration = A2(
	_elm_community$parser_combinators$Combine_ops['<*>'],
	A2(
		_elm_community$parser_combinators$Combine_ops['<$>'],
		_Bogdanp$elm_ast$Ast_Statement$ModuleDeclaration,
		A2(
			_elm_community$parser_combinators$Combine_ops['*>'],
			_Bogdanp$elm_ast$Ast_Helpers$initialSymbol('module'),
			_Bogdanp$elm_ast$Ast_Helpers$moduleName)),
	A2(
		_elm_community$parser_combinators$Combine_ops['*>'],
		_Bogdanp$elm_ast$Ast_Helpers$symbol('exposing'),
		_Bogdanp$elm_ast$Ast_Statement$exports));
var _Bogdanp$elm_ast$Ast_Statement$statement = function (ops) {
	return _elm_community$parser_combinators$Combine$choice(
		{
			ctor: '::',
			_0: _Bogdanp$elm_ast$Ast_Statement$portModuleDeclaration,
			_1: {
				ctor: '::',
				_0: _Bogdanp$elm_ast$Ast_Statement$effectModuleDeclaration,
				_1: {
					ctor: '::',
					_0: _Bogdanp$elm_ast$Ast_Statement$moduleDeclaration,
					_1: {
						ctor: '::',
						_0: _Bogdanp$elm_ast$Ast_Statement$importStatement,
						_1: {
							ctor: '::',
							_0: _Bogdanp$elm_ast$Ast_Statement$typeAliasDeclaration,
							_1: {
								ctor: '::',
								_0: _Bogdanp$elm_ast$Ast_Statement$typeDeclaration,
								_1: {
									ctor: '::',
									_0: _Bogdanp$elm_ast$Ast_Statement$portTypeDeclaration,
									_1: {
										ctor: '::',
										_0: _Bogdanp$elm_ast$Ast_Statement$portDeclaration(ops),
										_1: {
											ctor: '::',
											_0: _Bogdanp$elm_ast$Ast_Statement$functionTypeDeclaration,
											_1: {
												ctor: '::',
												_0: _Bogdanp$elm_ast$Ast_Statement$functionDeclaration(ops),
												_1: {
													ctor: '::',
													_0: _Bogdanp$elm_ast$Ast_Statement$infixDeclaration,
													_1: {
														ctor: '::',
														_0: _Bogdanp$elm_ast$Ast_Statement$comment,
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _Bogdanp$elm_ast$Ast_Statement$statements = function (ops) {
	return A2(
		_elm_community$parser_combinators$Combine$manyTill,
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_elm_community$parser_combinators$Combine$whitespace,
				_Bogdanp$elm_ast$Ast_Statement$statement(ops)),
			_elm_community$parser_combinators$Combine$whitespace),
		_elm_community$parser_combinators$Combine$end);
};

var _Bogdanp$elm_ast$Ast$parseModule = function (ops) {
	return _elm_community$parser_combinators$Combine$parse(
		_Bogdanp$elm_ast$Ast_Statement$statements(ops));
};
var _Bogdanp$elm_ast$Ast$parseOpTable = function (ops) {
	return _elm_community$parser_combinators$Combine$parse(
		_Bogdanp$elm_ast$Ast_Statement$opTable(ops));
};
var _Bogdanp$elm_ast$Ast$parse = function (input) {
	var _p0 = A2(_Bogdanp$elm_ast$Ast$parseOpTable, _Bogdanp$elm_ast$Ast_BinOp$operators, input);
	if (_p0.ctor === 'Ok') {
		return A2(_Bogdanp$elm_ast$Ast$parseModule, _p0._0._2, input);
	} else {
		return _elm_lang$core$Result$Err(_p0._0);
	}
};
var _Bogdanp$elm_ast$Ast$parseStatement = function (ops) {
	return _elm_community$parser_combinators$Combine$parse(
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			_Bogdanp$elm_ast$Ast_Statement$statement(ops),
			_elm_community$parser_combinators$Combine$end));
};
var _Bogdanp$elm_ast$Ast$parseExpression = function (ops) {
	return _elm_community$parser_combinators$Combine$parse(
		A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			_Bogdanp$elm_ast$Ast_Expression$expression(ops),
			_elm_community$parser_combinators$Combine$end));
};

//import Result //

var _elm_lang$core$Native_Date = function() {

function fromString(str)
{
	var date = new Date(str);
	return isNaN(date.getTime())
		? _elm_lang$core$Result$Err('Unable to parse \'' + str + '\' as a date. Dates must be in the ISO 8601 format.')
		: _elm_lang$core$Result$Ok(date);
}

var dayTable = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthTable =
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


return {
	fromString: fromString,
	year: function(d) { return d.getFullYear(); },
	month: function(d) { return { ctor: monthTable[d.getMonth()] }; },
	day: function(d) { return d.getDate(); },
	hour: function(d) { return d.getHours(); },
	minute: function(d) { return d.getMinutes(); },
	second: function(d) { return d.getSeconds(); },
	millisecond: function(d) { return d.getMilliseconds(); },
	toTime: function(d) { return d.getTime(); },
	fromTime: function(t) { return new Date(t); },
	dayOfWeek: function(d) { return { ctor: dayTable[d.getDay()] }; }
};

}();
var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Date$millisecond = _elm_lang$core$Native_Date.millisecond;
var _elm_lang$core$Date$second = _elm_lang$core$Native_Date.second;
var _elm_lang$core$Date$minute = _elm_lang$core$Native_Date.minute;
var _elm_lang$core$Date$hour = _elm_lang$core$Native_Date.hour;
var _elm_lang$core$Date$dayOfWeek = _elm_lang$core$Native_Date.dayOfWeek;
var _elm_lang$core$Date$day = _elm_lang$core$Native_Date.day;
var _elm_lang$core$Date$month = _elm_lang$core$Native_Date.month;
var _elm_lang$core$Date$year = _elm_lang$core$Native_Date.year;
var _elm_lang$core$Date$fromTime = _elm_lang$core$Native_Date.fromTime;
var _elm_lang$core$Date$toTime = _elm_lang$core$Native_Date.toTime;
var _elm_lang$core$Date$fromString = _elm_lang$core$Native_Date.fromString;
var _elm_lang$core$Date$now = A2(_elm_lang$core$Task$map, _elm_lang$core$Date$fromTime, _elm_lang$core$Time$now);
var _elm_lang$core$Date$Date = {ctor: 'Date'};
var _elm_lang$core$Date$Sun = {ctor: 'Sun'};
var _elm_lang$core$Date$Sat = {ctor: 'Sat'};
var _elm_lang$core$Date$Fri = {ctor: 'Fri'};
var _elm_lang$core$Date$Thu = {ctor: 'Thu'};
var _elm_lang$core$Date$Wed = {ctor: 'Wed'};
var _elm_lang$core$Date$Tue = {ctor: 'Tue'};
var _elm_lang$core$Date$Mon = {ctor: 'Mon'};
var _elm_lang$core$Date$Dec = {ctor: 'Dec'};
var _elm_lang$core$Date$Nov = {ctor: 'Nov'};
var _elm_lang$core$Date$Oct = {ctor: 'Oct'};
var _elm_lang$core$Date$Sep = {ctor: 'Sep'};
var _elm_lang$core$Date$Aug = {ctor: 'Aug'};
var _elm_lang$core$Date$Jul = {ctor: 'Jul'};
var _elm_lang$core$Date$Jun = {ctor: 'Jun'};
var _elm_lang$core$Date$May = {ctor: 'May'};
var _elm_lang$core$Date$Apr = {ctor: 'Apr'};
var _elm_lang$core$Date$Mar = {ctor: 'Mar'};
var _elm_lang$core$Date$Feb = {ctor: 'Feb'};
var _elm_lang$core$Date$Jan = {ctor: 'Jan'};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_community$json_extra$Json_Decode_Extra$combine = A2(
	_elm_lang$core$List$foldr,
	_elm_lang$core$Json_Decode$map2(
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})),
	_elm_lang$core$Json_Decode$succeed(
		{ctor: '[]'}));
var _elm_community$json_extra$Json_Decode_Extra$collection = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (length) {
			return _elm_community$json_extra$Json_Decode_Extra$combine(
				A2(
					_elm_lang$core$List$map,
					function (index) {
						return A2(
							_elm_lang$core$Json_Decode$field,
							_elm_lang$core$Basics$toString(index),
							decoder);
					},
					A2(_elm_lang$core$List$range, 0, length - 1)));
		},
		A2(_elm_lang$core$Json_Decode$field, 'length', _elm_lang$core$Json_Decode$int));
};
var _elm_community$json_extra$Json_Decode_Extra$fromResult = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Json_Decode$succeed(_p0._0);
	} else {
		return _elm_lang$core$Json_Decode$fail(_p0._0);
	}
};
var _elm_community$json_extra$Json_Decode_Extra$parseInt = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p1) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$String$toInt(_p1));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$parseFloat = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p2) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$String$toFloat(_p2));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$doubleEncoded = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (_p3) {
			return _elm_community$json_extra$Json_Decode_Extra$fromResult(
				A2(_elm_lang$core$Json_Decode$decodeString, decoder, _p3));
		},
		_elm_lang$core$Json_Decode$string);
};
var _elm_community$json_extra$Json_Decode_Extra$keys = A2(
	_elm_lang$core$Json_Decode$map,
	A2(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, acc) {
				var _p5 = _p4;
				return {ctor: '::', _0: _p5._0, _1: acc};
			}),
		{ctor: '[]'}),
	_elm_lang$core$Json_Decode$keyValuePairs(
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'})));
var _elm_community$json_extra$Json_Decode_Extra$sequenceHelp = F2(
	function (decoders, jsonValues) {
		return (!_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(jsonValues),
			_elm_lang$core$List$length(decoders))) ? _elm_lang$core$Json_Decode$fail('Number of decoders does not match number of values') : _elm_community$json_extra$Json_Decode_Extra$fromResult(
			A3(
				_elm_lang$core$List$foldr,
				_elm_lang$core$Result$map2(
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})),
				_elm_lang$core$Result$Ok(
					{ctor: '[]'}),
				A3(_elm_lang$core$List$map2, _elm_lang$core$Json_Decode$decodeValue, decoders, jsonValues)));
	});
var _elm_community$json_extra$Json_Decode_Extra$sequence = function (decoders) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		_elm_community$json_extra$Json_Decode_Extra$sequenceHelp(decoders),
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
};
var _elm_community$json_extra$Json_Decode_Extra$indexedList = function (indexedDecoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (values) {
			return _elm_community$json_extra$Json_Decode_Extra$sequence(
				A2(
					_elm_lang$core$List$map,
					indexedDecoder,
					A2(
						_elm_lang$core$List$range,
						0,
						_elm_lang$core$List$length(values) - 1)));
		},
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
};
var _elm_community$json_extra$Json_Decode_Extra$optionalField = F2(
	function (fieldName, decoder) {
		var finishDecoding = function (json) {
			var _p6 = A2(
				_elm_lang$core$Json_Decode$decodeValue,
				A2(_elm_lang$core$Json_Decode$field, fieldName, _elm_lang$core$Json_Decode$value),
				json);
			if (_p6.ctor === 'Ok') {
				return A2(
					_elm_lang$core$Json_Decode$map,
					_elm_lang$core$Maybe$Just,
					A2(_elm_lang$core$Json_Decode$field, fieldName, decoder));
			} else {
				return _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Maybe$Nothing);
			}
		};
		return A2(_elm_lang$core$Json_Decode$andThen, finishDecoding, _elm_lang$core$Json_Decode$value);
	});
var _elm_community$json_extra$Json_Decode_Extra$withDefault = F2(
	function (fallback, decoder) {
		return A2(
			_elm_lang$core$Json_Decode$map,
			_elm_lang$core$Maybe$withDefault(fallback),
			_elm_lang$core$Json_Decode$maybe(decoder));
	});
var _elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples = F2(
	function (keyDecoder, tuples) {
		var _p7 = tuples;
		if (_p7.ctor === '[]') {
			return _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Dict$empty);
		} else {
			var _p8 = A2(_elm_lang$core$Json_Decode$decodeString, keyDecoder, _p7._0._0);
			if (_p8.ctor === 'Ok') {
				return A2(
					_elm_lang$core$Json_Decode$andThen,
					function (_p9) {
						return _elm_lang$core$Json_Decode$succeed(
							A3(_elm_lang$core$Dict$insert, _p8._0, _p7._0._1, _p9));
					},
					A2(_elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples, keyDecoder, _p7._1));
			} else {
				return _elm_lang$core$Json_Decode$fail(_p8._0);
			}
		}
	});
var _elm_community$json_extra$Json_Decode_Extra$dict2 = F2(
	function (keyDecoder, valueDecoder) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples(keyDecoder),
			_elm_lang$core$Json_Decode$keyValuePairs(valueDecoder));
	});
var _elm_community$json_extra$Json_Decode_Extra$set = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Set$fromList,
		_elm_lang$core$Json_Decode$list(decoder));
};
var _elm_community$json_extra$Json_Decode_Extra$date = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p10) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$Date$fromString(_p10));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$andMap = _elm_lang$core$Json_Decode$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$json_extra$Json_Decode_Extra_ops = _elm_community$json_extra$Json_Decode_Extra_ops || {};
_elm_community$json_extra$Json_Decode_Extra_ops['|:'] = _elm_lang$core$Basics$flip(_elm_community$json_extra$Json_Decode_Extra$andMap);

var _elm_tools$parser_primitives$Native_ParserPrimitives = function() {


// STRINGS

function isSubString(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var bigLength = bigString.length - offset;

	if (bigLength < smallLength)
	{
		return tuple3(-1, row, col);
	}

	for (var i = 0; i < smallLength; i++)
	{
		var char = smallString[i];

		if (char !== bigString[offset + i])
		{
			return tuple3(-1, row, col);
		}

		// if it is a two word character
		if ((bigString.charCodeAt(offset) & 0xF800) === 0xD800)
		{
			i++
			if (smallString[i] !== bigString[offset + i])
			{
				return tuple3(-1, row, col);
			}
			col++;
			continue;
		}

		// if it is a newline
		if (char === '\n')
		{
			row++;
			col = 1;
			continue;
		}

		// if it is a one word character
		col++
	}

	return tuple3(offset + smallLength, row, col);
}

function tuple3(a, b, c)
{
	return { ctor: '_Tuple3', _0: a, _1: b, _2: c };
}


// CHARS

var mkChar = _elm_lang$core$Native_Utils.chr;

function isSubChar(predicate, offset, string)
{
	if (offset >= string.length)
	{
		return -1;
	}

	if ((string.charCodeAt(offset) & 0xF800) === 0xD800)
	{
		return predicate(mkChar(string.substr(offset, 2)))
			? offset + 2
			: -1;
	}

	var char = string[offset];

	return predicate(mkChar(char))
		? ((char === '\n') ? -2 : (offset + 1))
		: -1;
}


// FIND STRING

function findSubString(before, smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);

	if (newOffset === -1)
	{
		return tuple3(-1, row, col);
	}

	var scanTarget = before ? newOffset	: newOffset + smallString.length;

	while (offset < scanTarget)
	{
		var char = bigString[offset];

		if (char === '\n')
		{
			offset++;
			row++;
			col = 1;
			continue;
		}

		if ((bigString.charCodeAt(offset) & 0xF800) === 0xD800)
		{
			offset += 2;
			col++;
			continue;
		}

		offset++;
		col++;
	}

	return tuple3(offset, row, col);
}


return {
	isSubString: F5(isSubString),
	isSubChar: F3(isSubChar),
	findSubString: F6(findSubString)
};

}();

var _elm_tools$parser_primitives$ParserPrimitives$findSubString = _elm_tools$parser_primitives$Native_ParserPrimitives.findSubString;
var _elm_tools$parser_primitives$ParserPrimitives$isSubChar = _elm_tools$parser_primitives$Native_ParserPrimitives.isSubChar;
var _elm_tools$parser_primitives$ParserPrimitives$isSubString = _elm_tools$parser_primitives$Native_ParserPrimitives.isSubString;

var _elm_tools$parser$Parser_Internal$isPlusOrMinus = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('+')) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('-'));
};
var _elm_tools$parser$Parser_Internal$isZero = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('0'));
};
var _elm_tools$parser$Parser_Internal$isE = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('e')) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('E'));
};
var _elm_tools$parser$Parser_Internal$isDot = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('.'));
};
var _elm_tools$parser$Parser_Internal$isBadIntEnd = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (_elm_lang$core$Char$isUpper($char) || (_elm_lang$core$Char$isLower($char) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('.'))));
};
var _elm_tools$parser$Parser_Internal$chomp = F3(
	function (isGood, offset, source) {
		chomp:
		while (true) {
			var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, isGood, offset, source);
			if (_elm_lang$core$Native_Utils.cmp(newOffset, 0) < 0) {
				return offset;
			} else {
				var _v0 = isGood,
					_v1 = newOffset,
					_v2 = source;
				isGood = _v0;
				offset = _v1;
				source = _v2;
				continue chomp;
			}
		}
	});
var _elm_tools$parser$Parser_Internal$chompDigits = F3(
	function (isValidDigit, offset, source) {
		var newOffset = A3(_elm_tools$parser$Parser_Internal$chomp, isValidDigit, offset, source);
		return _elm_lang$core$Native_Utils.eq(newOffset, offset) ? _elm_lang$core$Result$Err(newOffset) : ((!_elm_lang$core$Native_Utils.eq(
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isBadIntEnd, newOffset, source),
			-1)) ? _elm_lang$core$Result$Err(newOffset) : _elm_lang$core$Result$Ok(newOffset));
	});
var _elm_tools$parser$Parser_Internal$chompExp = F2(
	function (offset, source) {
		var eOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isE, offset, source);
		if (_elm_lang$core$Native_Utils.eq(eOffset, -1)) {
			return _elm_lang$core$Result$Ok(offset);
		} else {
			var opOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isPlusOrMinus, eOffset, source);
			var expOffset = _elm_lang$core$Native_Utils.eq(opOffset, -1) ? eOffset : opOffset;
			return (!_elm_lang$core$Native_Utils.eq(
				A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isZero, expOffset, source),
				-1)) ? _elm_lang$core$Result$Err(expOffset) : (_elm_lang$core$Native_Utils.eq(
				A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_lang$core$Char$isDigit, expOffset, source),
				-1) ? _elm_lang$core$Result$Err(expOffset) : A3(_elm_tools$parser$Parser_Internal$chompDigits, _elm_lang$core$Char$isDigit, expOffset, source));
		}
	});
var _elm_tools$parser$Parser_Internal$chompDotAndExp = F2(
	function (offset, source) {
		var dotOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isDot, offset, source);
		return _elm_lang$core$Native_Utils.eq(dotOffset, -1) ? A2(_elm_tools$parser$Parser_Internal$chompExp, offset, source) : A2(
			_elm_tools$parser$Parser_Internal$chompExp,
			A3(_elm_tools$parser$Parser_Internal$chomp, _elm_lang$core$Char$isDigit, dotOffset, source),
			source);
	});
var _elm_tools$parser$Parser_Internal$State = F6(
	function (a, b, c, d, e, f) {
		return {source: a, offset: b, indent: c, context: d, row: e, col: f};
	});
var _elm_tools$parser$Parser_Internal$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _elm_tools$parser$Parser_Internal$Bad = F2(
	function (a, b) {
		return {ctor: 'Bad', _0: a, _1: b};
	});
var _elm_tools$parser$Parser_Internal$Good = F2(
	function (a, b) {
		return {ctor: 'Good', _0: a, _1: b};
	});

var _elm_tools$parser$Parser$changeContext = F2(
	function (newContext, _p0) {
		var _p1 = _p0;
		return {source: _p1.source, offset: _p1.offset, indent: _p1.indent, context: newContext, row: _p1.row, col: _p1.col};
	});
var _elm_tools$parser$Parser$sourceMap = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p4) {
				var _p5 = _p4;
				var _p6 = _p3._0(_p5);
				if (_p6.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p6._0, _p6._1);
				} else {
					var _p7 = _p6._1;
					var subString = A3(_elm_lang$core$String$slice, _p5.offset, _p7.offset, _p5.source);
					return A2(
						_elm_tools$parser$Parser_Internal$Good,
						A2(func, subString, _p6._0),
						_p7);
				}
			});
	});
var _elm_tools$parser$Parser$source = function (parser) {
	return A2(_elm_tools$parser$Parser$sourceMap, _elm_lang$core$Basics$always, parser);
};
var _elm_tools$parser$Parser$badFloatMsg = 'The `Parser.float` parser seems to have a bug.\nPlease report an SSCCE to <https://github.com/elm-tools/parser/issues>.';
var _elm_tools$parser$Parser$floatHelp = F3(
	function (offset, zeroOffset, source) {
		if (_elm_lang$core$Native_Utils.cmp(zeroOffset, 0) > -1) {
			return A2(_elm_tools$parser$Parser_Internal$chompDotAndExp, zeroOffset, source);
		} else {
			var dotOffset = A3(_elm_tools$parser$Parser_Internal$chomp, _elm_lang$core$Char$isDigit, offset, source);
			var result = A2(_elm_tools$parser$Parser_Internal$chompDotAndExp, dotOffset, source);
			var _p8 = result;
			if (_p8.ctor === 'Err') {
				return result;
			} else {
				var _p9 = _p8._0;
				return _elm_lang$core$Native_Utils.eq(_p9, offset) ? _elm_lang$core$Result$Err(_p9) : result;
			}
		}
	});
var _elm_tools$parser$Parser$badIntMsg = 'The `Parser.int` parser seems to have a bug.\nPlease report an SSCCE to <https://github.com/elm-tools/parser/issues>.';
var _elm_tools$parser$Parser$isX = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('x'));
};
var _elm_tools$parser$Parser$isO = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('o'));
};
var _elm_tools$parser$Parser$isZero = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('0'));
};
var _elm_tools$parser$Parser$intHelp = F3(
	function (offset, zeroOffset, source) {
		return _elm_lang$core$Native_Utils.eq(zeroOffset, -1) ? A3(_elm_tools$parser$Parser_Internal$chompDigits, _elm_lang$core$Char$isDigit, offset, source) : ((!_elm_lang$core$Native_Utils.eq(
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser$isX, zeroOffset, source),
			-1)) ? A3(_elm_tools$parser$Parser_Internal$chompDigits, _elm_lang$core$Char$isHexDigit, offset + 2, source) : (_elm_lang$core$Native_Utils.eq(
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isBadIntEnd, zeroOffset, source),
			-1) ? _elm_lang$core$Result$Ok(zeroOffset) : _elm_lang$core$Result$Err(zeroOffset)));
	});
var _elm_tools$parser$Parser$token = F2(
	function (makeProblem, str) {
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p10) {
				var _p11 = _p10;
				var _p13 = _p11.source;
				var _p12 = A5(_elm_tools$parser_primitives$ParserPrimitives$isSubString, str, _p11.offset, _p11.row, _p11.col, _p13);
				var newOffset = _p12._0;
				var newRow = _p12._1;
				var newCol = _p12._2;
				return _elm_lang$core$Native_Utils.eq(newOffset, -1) ? A2(
					_elm_tools$parser$Parser_Internal$Bad,
					makeProblem(str),
					_p11) : A2(
					_elm_tools$parser$Parser_Internal$Good,
					{ctor: '_Tuple0'},
					{source: _p13, offset: newOffset, indent: _p11.indent, context: _p11.context, row: newRow, col: newCol});
			});
	});
var _elm_tools$parser$Parser$delayedCommitMap = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p18 = _p16._0(state1);
				if (_p18.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p18._0, state1);
				} else {
					var _p22 = _p18._1;
					var _p19 = _p17._0(_p22);
					if (_p19.ctor === 'Good') {
						return A2(
							_elm_tools$parser$Parser_Internal$Good,
							A2(func, _p18._0, _p19._0),
							_p19._1);
					} else {
						var _p21 = _p19._0;
						var _p20 = _p19._1;
						return (_elm_lang$core$Native_Utils.eq(_p22.row, _p20.row) && _elm_lang$core$Native_Utils.eq(_p22.col, _p20.col)) ? A2(_elm_tools$parser$Parser_Internal$Bad, _p21, state1) : A2(_elm_tools$parser$Parser_Internal$Bad, _p21, _p20);
					}
				}
			});
	});
var _elm_tools$parser$Parser$delayedCommit = F2(
	function (filler, realStuff) {
		return A3(
			_elm_tools$parser$Parser$delayedCommitMap,
			F2(
				function (_p23, v) {
					return v;
				}),
			filler,
			realStuff);
	});
var _elm_tools$parser$Parser$lazy = function (thunk) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			var _p24 = thunk(
				{ctor: '_Tuple0'});
			var parse = _p24._0;
			return parse(state);
		});
};
var _elm_tools$parser$Parser$andThen = F2(
	function (callback, _p25) {
		var _p26 = _p25;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p27 = _p26._0(state1);
				if (_p27.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p27._0, _p27._1);
				} else {
					var _p28 = callback(_p27._0);
					var parseB = _p28._0;
					return parseB(_p27._1);
				}
			});
	});
var _elm_tools$parser$Parser$apply = F2(
	function (f, a) {
		return f(a);
	});
var _elm_tools$parser$Parser$map2 = F3(
	function (func, _p30, _p29) {
		var _p31 = _p30;
		var _p32 = _p29;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p33 = _p31._0(state1);
				if (_p33.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p33._0, _p33._1);
				} else {
					var _p34 = _p32._0(_p33._1);
					if (_p34.ctor === 'Bad') {
						return A2(_elm_tools$parser$Parser_Internal$Bad, _p34._0, _p34._1);
					} else {
						return A2(
							_elm_tools$parser$Parser_Internal$Good,
							A2(func, _p33._0, _p34._0),
							_p34._1);
					}
				}
			});
	});
var _elm_tools$parser$Parser_ops = _elm_tools$parser$Parser_ops || {};
_elm_tools$parser$Parser_ops['|='] = F2(
	function (parseFunc, parseArg) {
		return A3(_elm_tools$parser$Parser$map2, _elm_tools$parser$Parser$apply, parseFunc, parseArg);
	});
var _elm_tools$parser$Parser_ops = _elm_tools$parser$Parser_ops || {};
_elm_tools$parser$Parser_ops['|.'] = F2(
	function (keepParser, ignoreParser) {
		return A3(_elm_tools$parser$Parser$map2, _elm_lang$core$Basics$always, keepParser, ignoreParser);
	});
var _elm_tools$parser$Parser$map = F2(
	function (func, _p35) {
		var _p36 = _p35;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p37 = _p36._0(state1);
				if (_p37.ctor === 'Good') {
					return A2(
						_elm_tools$parser$Parser_Internal$Good,
						func(_p37._0),
						_p37._1);
				} else {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p37._0, _p37._1);
				}
			});
	});
var _elm_tools$parser$Parser$succeed = function (a) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			return A2(_elm_tools$parser$Parser_Internal$Good, a, state);
		});
};
var _elm_tools$parser$Parser$run = F2(
	function (_p38, source) {
		var _p39 = _p38;
		var initialState = {
			source: source,
			offset: 0,
			indent: 1,
			context: {ctor: '[]'},
			row: 1,
			col: 1
		};
		var _p40 = _p39._0(initialState);
		if (_p40.ctor === 'Good') {
			return _elm_lang$core$Result$Ok(_p40._0);
		} else {
			return _elm_lang$core$Result$Err(
				{row: _p40._1.row, col: _p40._1.col, source: source, problem: _p40._0, context: _p40._1.context});
		}
	});
var _elm_tools$parser$Parser$Error = F5(
	function (a, b, c, d, e) {
		return {row: a, col: b, source: c, problem: d, context: e};
	});
var _elm_tools$parser$Parser$Context = F3(
	function (a, b, c) {
		return {row: a, col: b, description: c};
	});
var _elm_tools$parser$Parser$inContext = F2(
	function (ctx, _p41) {
		var _p42 = _p41;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p43) {
				var _p44 = _p43;
				var _p46 = _p44.context;
				var state1 = A2(
					_elm_tools$parser$Parser$changeContext,
					{
						ctor: '::',
						_0: A3(_elm_tools$parser$Parser$Context, _p44.row, _p44.col, ctx),
						_1: _p46
					},
					_p44);
				var _p45 = _p42._0(state1);
				if (_p45.ctor === 'Good') {
					return A2(
						_elm_tools$parser$Parser_Internal$Good,
						_p45._0,
						A2(_elm_tools$parser$Parser$changeContext, _p46, _p45._1));
				} else {
					return _p45;
				}
			});
	});
var _elm_tools$parser$Parser$Fail = function (a) {
	return {ctor: 'Fail', _0: a};
};
var _elm_tools$parser$Parser$fail = function (message) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			return A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$Fail(message),
				state);
		});
};
var _elm_tools$parser$Parser$ExpectingClosing = function (a) {
	return {ctor: 'ExpectingClosing', _0: a};
};
var _elm_tools$parser$Parser$ignoreUntil = function (str) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (_p47) {
			var _p48 = _p47;
			var _p50 = _p48.source;
			var _p49 = A6(_elm_tools$parser_primitives$ParserPrimitives$findSubString, false, str, _p48.offset, _p48.row, _p48.col, _p50);
			var newOffset = _p49._0;
			var newRow = _p49._1;
			var newCol = _p49._2;
			return _elm_lang$core$Native_Utils.eq(newOffset, -1) ? A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$ExpectingClosing(str),
				_p48) : A2(
				_elm_tools$parser$Parser_Internal$Good,
				{ctor: '_Tuple0'},
				{source: _p50, offset: newOffset, indent: _p48.indent, context: _p48.context, row: newRow, col: newCol});
		});
};
var _elm_tools$parser$Parser$ExpectingVariable = {ctor: 'ExpectingVariable'};
var _elm_tools$parser$Parser$ExpectingKeyword = function (a) {
	return {ctor: 'ExpectingKeyword', _0: a};
};
var _elm_tools$parser$Parser$keyword = function (str) {
	return A2(_elm_tools$parser$Parser$token, _elm_tools$parser$Parser$ExpectingKeyword, str);
};
var _elm_tools$parser$Parser$ExpectingSymbol = function (a) {
	return {ctor: 'ExpectingSymbol', _0: a};
};
var _elm_tools$parser$Parser$symbol = function (str) {
	return A2(_elm_tools$parser$Parser$token, _elm_tools$parser$Parser$ExpectingSymbol, str);
};
var _elm_tools$parser$Parser$ExpectingEnd = {ctor: 'ExpectingEnd'};
var _elm_tools$parser$Parser$end = _elm_tools$parser$Parser_Internal$Parser(
	function (state) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(state.source),
			state.offset) ? A2(
			_elm_tools$parser$Parser_Internal$Good,
			{ctor: '_Tuple0'},
			state) : A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$ExpectingEnd, state);
	});
var _elm_tools$parser$Parser$BadRepeat = {ctor: 'BadRepeat'};
var _elm_tools$parser$Parser$repeatExactly = F4(
	function (n, parse, revList, state1) {
		repeatExactly:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					_elm_lang$core$List$reverse(revList),
					state1);
			} else {
				var _p51 = parse(state1);
				if (_p51.ctor === 'Good') {
					var _p52 = _p51._1;
					if (_elm_lang$core$Native_Utils.eq(state1.row, _p52.row) && _elm_lang$core$Native_Utils.eq(state1.col, _p52.col)) {
						return A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$BadRepeat, _p52);
					} else {
						var _v25 = n - 1,
							_v26 = parse,
							_v27 = {ctor: '::', _0: _p51._0, _1: revList},
							_v28 = _p52;
						n = _v25;
						parse = _v26;
						revList = _v27;
						state1 = _v28;
						continue repeatExactly;
					}
				} else {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p51._0, _p51._1);
				}
			}
		}
	});
var _elm_tools$parser$Parser$repeatAtLeast = F4(
	function (n, parse, revList, state1) {
		repeatAtLeast:
		while (true) {
			var _p53 = parse(state1);
			if (_p53.ctor === 'Good') {
				var _p54 = _p53._1;
				if (_elm_lang$core$Native_Utils.eq(state1.row, _p54.row) && _elm_lang$core$Native_Utils.eq(state1.col, _p54.col)) {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$BadRepeat, _p54);
				} else {
					var _v30 = n - 1,
						_v31 = parse,
						_v32 = {ctor: '::', _0: _p53._0, _1: revList},
						_v33 = _p54;
					n = _v30;
					parse = _v31;
					revList = _v32;
					state1 = _v33;
					continue repeatAtLeast;
				}
			} else {
				var _p55 = _p53._1;
				return (_elm_lang$core$Native_Utils.eq(state1.row, _p55.row) && (_elm_lang$core$Native_Utils.eq(state1.col, _p55.col) && (_elm_lang$core$Native_Utils.cmp(n, 0) < 1))) ? A2(
					_elm_tools$parser$Parser_Internal$Good,
					_elm_lang$core$List$reverse(revList),
					state1) : A2(_elm_tools$parser$Parser_Internal$Bad, _p53._0, _p55);
			}
		}
	});
var _elm_tools$parser$Parser$repeat = F2(
	function (count, _p56) {
		var _p57 = _p56;
		var _p59 = _p57._0;
		var _p58 = count;
		if (_p58.ctor === 'Exactly') {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (state) {
					return A4(
						_elm_tools$parser$Parser$repeatExactly,
						_p58._0,
						_p59,
						{ctor: '[]'},
						state);
				});
		} else {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (state) {
					return A4(
						_elm_tools$parser$Parser$repeatAtLeast,
						_p58._0,
						_p59,
						{ctor: '[]'},
						state);
				});
		}
	});
var _elm_tools$parser$Parser$ignoreExactly = F8(
	function (n, predicate, source, offset, indent, context, row, col) {
		ignoreExactly:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					{ctor: '_Tuple0'},
					{source: source, offset: offset, indent: indent, context: context, row: row, col: col});
			} else {
				var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, predicate, offset, source);
				if (_elm_lang$core$Native_Utils.eq(newOffset, -1)) {
					return A2(
						_elm_tools$parser$Parser_Internal$Bad,
						_elm_tools$parser$Parser$BadRepeat,
						{source: source, offset: offset, indent: indent, context: context, row: row, col: col});
				} else {
					if (_elm_lang$core$Native_Utils.eq(newOffset, -2)) {
						var _v36 = n - 1,
							_v37 = predicate,
							_v38 = source,
							_v39 = offset + 1,
							_v40 = indent,
							_v41 = context,
							_v42 = row + 1,
							_v43 = 1;
						n = _v36;
						predicate = _v37;
						source = _v38;
						offset = _v39;
						indent = _v40;
						context = _v41;
						row = _v42;
						col = _v43;
						continue ignoreExactly;
					} else {
						var _v44 = n - 1,
							_v45 = predicate,
							_v46 = source,
							_v47 = newOffset,
							_v48 = indent,
							_v49 = context,
							_v50 = row,
							_v51 = col + 1;
						n = _v44;
						predicate = _v45;
						source = _v46;
						offset = _v47;
						indent = _v48;
						context = _v49;
						row = _v50;
						col = _v51;
						continue ignoreExactly;
					}
				}
			}
		}
	});
var _elm_tools$parser$Parser$ignoreAtLeast = F8(
	function (n, predicate, source, offset, indent, context, row, col) {
		ignoreAtLeast:
		while (true) {
			var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, predicate, offset, source);
			if (_elm_lang$core$Native_Utils.eq(newOffset, -1)) {
				var state = {source: source, offset: offset, indent: indent, context: context, row: row, col: col};
				return (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) ? A2(
					_elm_tools$parser$Parser_Internal$Good,
					{ctor: '_Tuple0'},
					state) : A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$BadRepeat, state);
			} else {
				if (_elm_lang$core$Native_Utils.eq(newOffset, -2)) {
					var _v52 = n - 1,
						_v53 = predicate,
						_v54 = source,
						_v55 = offset + 1,
						_v56 = indent,
						_v57 = context,
						_v58 = row + 1,
						_v59 = 1;
					n = _v52;
					predicate = _v53;
					source = _v54;
					offset = _v55;
					indent = _v56;
					context = _v57;
					row = _v58;
					col = _v59;
					continue ignoreAtLeast;
				} else {
					var _v60 = n - 1,
						_v61 = predicate,
						_v62 = source,
						_v63 = newOffset,
						_v64 = indent,
						_v65 = context,
						_v66 = row,
						_v67 = col + 1;
					n = _v60;
					predicate = _v61;
					source = _v62;
					offset = _v63;
					indent = _v64;
					context = _v65;
					row = _v66;
					col = _v67;
					continue ignoreAtLeast;
				}
			}
		}
	});
var _elm_tools$parser$Parser$ignore = F2(
	function (count, predicate) {
		var _p60 = count;
		if (_p60.ctor === 'Exactly') {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (_p61) {
					var _p62 = _p61;
					return A8(_elm_tools$parser$Parser$ignoreExactly, _p60._0, predicate, _p62.source, _p62.offset, _p62.indent, _p62.context, _p62.row, _p62.col);
				});
		} else {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (_p63) {
					var _p64 = _p63;
					return A8(_elm_tools$parser$Parser$ignoreAtLeast, _p60._0, predicate, _p64.source, _p64.offset, _p64.indent, _p64.context, _p64.row, _p64.col);
				});
		}
	});
var _elm_tools$parser$Parser$keep = F2(
	function (count, predicate) {
		return _elm_tools$parser$Parser$source(
			A2(_elm_tools$parser$Parser$ignore, count, predicate));
	});
var _elm_tools$parser$Parser$BadFloat = {ctor: 'BadFloat'};
var _elm_tools$parser$Parser$float = _elm_tools$parser$Parser_Internal$Parser(
	function (_p65) {
		var _p66 = _p65;
		var _p77 = _p66.source;
		var _p76 = _p66.row;
		var _p75 = _p66.offset;
		var _p74 = _p66.indent;
		var _p73 = _p66.context;
		var _p72 = _p66.col;
		var _p67 = A3(
			_elm_tools$parser$Parser$floatHelp,
			_p75,
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser$isZero, _p75, _p77),
			_p77);
		if (_p67.ctor === 'Err') {
			var _p68 = _p67._0;
			return A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$BadFloat,
				{source: _p77, offset: _p68, indent: _p74, context: _p73, row: _p76, col: _p72 + (_p68 - _p75)});
		} else {
			var _p71 = _p67._0;
			var _p69 = _elm_lang$core$String$toFloat(
				A3(_elm_lang$core$String$slice, _p75, _p71, _p77));
			if (_p69.ctor === 'Err') {
				return _elm_lang$core$Native_Utils.crashCase(
					'Parser',
					{
						start: {line: 733, column: 9},
						end: {line: 745, column: 16}
					},
					_p69)(_elm_tools$parser$Parser$badFloatMsg);
			} else {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					_p69._0,
					{source: _p77, offset: _p71, indent: _p74, context: _p73, row: _p76, col: _p72 + (_p71 - _p75)});
			}
		}
	});
var _elm_tools$parser$Parser$BadInt = {ctor: 'BadInt'};
var _elm_tools$parser$Parser$int = _elm_tools$parser$Parser_Internal$Parser(
	function (_p78) {
		var _p79 = _p78;
		var _p90 = _p79.source;
		var _p89 = _p79.row;
		var _p88 = _p79.offset;
		var _p87 = _p79.indent;
		var _p86 = _p79.context;
		var _p85 = _p79.col;
		var _p80 = A3(
			_elm_tools$parser$Parser$intHelp,
			_p88,
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser$isZero, _p88, _p90),
			_p90);
		if (_p80.ctor === 'Err') {
			var _p81 = _p80._0;
			return A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$BadInt,
				{source: _p90, offset: _p81, indent: _p87, context: _p86, row: _p89, col: _p85 + (_p81 - _p88)});
		} else {
			var _p84 = _p80._0;
			var _p82 = _elm_lang$core$String$toInt(
				A3(_elm_lang$core$String$slice, _p88, _p84, _p90));
			if (_p82.ctor === 'Err') {
				return _elm_lang$core$Native_Utils.crashCase(
					'Parser',
					{
						start: {line: 638, column: 9},
						end: {line: 650, column: 16}
					},
					_p82)(_elm_tools$parser$Parser$badIntMsg);
			} else {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					_p82._0,
					{source: _p90, offset: _p84, indent: _p87, context: _p86, row: _p89, col: _p85 + (_p84 - _p88)});
			}
		}
	});
var _elm_tools$parser$Parser$BadOneOf = function (a) {
	return {ctor: 'BadOneOf', _0: a};
};
var _elm_tools$parser$Parser$oneOfHelp = F3(
	function (state, problems, parsers) {
		oneOfHelp:
		while (true) {
			var _p91 = parsers;
			if (_p91.ctor === '[]') {
				return A2(
					_elm_tools$parser$Parser_Internal$Bad,
					_elm_tools$parser$Parser$BadOneOf(
						_elm_lang$core$List$reverse(problems)),
					state);
			} else {
				var _p92 = _p91._0._0(state);
				if (_p92.ctor === 'Good') {
					return _p92;
				} else {
					if (_elm_lang$core$Native_Utils.eq(state.row, _p92._1.row) && _elm_lang$core$Native_Utils.eq(state.col, _p92._1.col)) {
						var _v79 = state,
							_v80 = {ctor: '::', _0: _p92._0, _1: problems},
							_v81 = _p91._1;
						state = _v79;
						problems = _v80;
						parsers = _v81;
						continue oneOfHelp;
					} else {
						return _p92;
					}
				}
			}
		}
	});
var _elm_tools$parser$Parser$oneOf = function (parsers) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			return A3(
				_elm_tools$parser$Parser$oneOfHelp,
				state,
				{ctor: '[]'},
				parsers);
		});
};
var _elm_tools$parser$Parser$Exactly = function (a) {
	return {ctor: 'Exactly', _0: a};
};
var _elm_tools$parser$Parser$AtLeast = function (a) {
	return {ctor: 'AtLeast', _0: a};
};
var _elm_tools$parser$Parser$zeroOrMore = _elm_tools$parser$Parser$AtLeast(0);
var _elm_tools$parser$Parser$oneOrMore = _elm_tools$parser$Parser$AtLeast(1);

var _elm_tools$parser$Parser_LanguageKit$isChar = function ($char) {
	return true;
};
var _elm_tools$parser$Parser_LanguageKit$isTab = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('\t'));
};
var _elm_tools$parser$Parser_LanguageKit$isSpace = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr(' ')) || (_elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('\n')) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('\r')));
};
var _elm_tools$parser$Parser_LanguageKit$chompSpaces = A2(_elm_tools$parser$Parser$ignore, _elm_tools$parser$Parser$zeroOrMore, _elm_tools$parser$Parser_LanguageKit$isSpace);
var _elm_tools$parser$Parser_LanguageKit$revAlways = F2(
	function (_p0, keep) {
		return keep;
	});
var _elm_tools$parser$Parser_LanguageKit$ignore = F2(
	function (ignoreParser, keepParser) {
		return A3(_elm_tools$parser$Parser$map2, _elm_tools$parser$Parser_LanguageKit$revAlways, ignoreParser, keepParser);
	});
var _elm_tools$parser$Parser_LanguageKit_ops = _elm_tools$parser$Parser_LanguageKit_ops || {};
_elm_tools$parser$Parser_LanguageKit_ops['|-'] = _elm_tools$parser$Parser_LanguageKit$ignore;
var _elm_tools$parser$Parser_LanguageKit$sequenceEndMandatory = F5(
	function (end, spaces, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				_elm_tools$parser$Parser_LanguageKit$sequenceEndMandatory,
				end,
				spaces,
				parseItem,
				sep,
				{ctor: '::', _0: item, _1: revItems});
		};
		return _elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser$andThen,
					chompRest,
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							A2(_elm_tools$parser$Parser_ops['|.'], parseItem, spaces),
							_elm_tools$parser$Parser$symbol(sep)),
						spaces)),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						_elm_tools$parser$Parser$symbol(end),
						_elm_tools$parser$Parser$succeed(
							_elm_lang$core$List$reverse(revItems))),
					_1: {ctor: '[]'}
				}
			});
	});
var _elm_tools$parser$Parser_LanguageKit$sequenceEndForbidden = F5(
	function (end, spaces, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				_elm_tools$parser$Parser_LanguageKit$sequenceEndForbidden,
				end,
				spaces,
				parseItem,
				sep,
				{ctor: '::', _0: item, _1: revItems});
		};
		return A2(
			_elm_tools$parser$Parser_LanguageKit$ignore,
			spaces,
			_elm_tools$parser$Parser$oneOf(
				{
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							_elm_tools$parser$Parser$symbol(sep),
							spaces),
						A2(_elm_tools$parser$Parser$andThen, chompRest, parseItem)),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							_elm_tools$parser$Parser$symbol(end),
							_elm_tools$parser$Parser$succeed(
								_elm_lang$core$List$reverse(revItems))),
						_1: {ctor: '[]'}
					}
				}));
	});
var _elm_tools$parser$Parser_LanguageKit$sequenceEndOptional = F5(
	function (end, spaces, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				_elm_tools$parser$Parser_LanguageKit$sequenceEndOptional,
				end,
				spaces,
				parseItem,
				sep,
				{ctor: '::', _0: item, _1: revItems});
		};
		var parseEnd = A2(
			_elm_tools$parser$Parser$andThen,
			function (_p1) {
				return _elm_tools$parser$Parser$succeed(
					_elm_lang$core$List$reverse(revItems));
			},
			_elm_tools$parser$Parser$symbol(end));
		return A2(
			_elm_tools$parser$Parser_LanguageKit$ignore,
			spaces,
			_elm_tools$parser$Parser$oneOf(
				{
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							_elm_tools$parser$Parser$symbol(sep),
							spaces),
						_elm_tools$parser$Parser$oneOf(
							{
								ctor: '::',
								_0: A2(_elm_tools$parser$Parser$andThen, chompRest, parseItem),
								_1: {
									ctor: '::',
									_0: parseEnd,
									_1: {ctor: '[]'}
								}
							})),
					_1: {
						ctor: '::',
						_0: parseEnd,
						_1: {ctor: '[]'}
					}
				}));
	});
var _elm_tools$parser$Parser_LanguageKit$sequenceEnd = F5(
	function (end, spaces, parseItem, sep, trailing) {
		var chompRest = function (item) {
			var _p2 = trailing;
			switch (_p2.ctor) {
				case 'Forbidden':
					return A5(
						_elm_tools$parser$Parser_LanguageKit$sequenceEndForbidden,
						end,
						spaces,
						parseItem,
						sep,
						{
							ctor: '::',
							_0: item,
							_1: {ctor: '[]'}
						});
				case 'Optional':
					return A5(
						_elm_tools$parser$Parser_LanguageKit$sequenceEndOptional,
						end,
						spaces,
						parseItem,
						sep,
						{
							ctor: '::',
							_0: item,
							_1: {ctor: '[]'}
						});
				default:
					return A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							A2(
								_elm_tools$parser$Parser_LanguageKit_ops['|-'],
								spaces,
								_elm_tools$parser$Parser$symbol(sep)),
							spaces),
						A5(
							_elm_tools$parser$Parser_LanguageKit$sequenceEndMandatory,
							end,
							spaces,
							parseItem,
							sep,
							{
								ctor: '::',
								_0: item,
								_1: {ctor: '[]'}
							}));
			}
		};
		return _elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(_elm_tools$parser$Parser$andThen, chompRest, parseItem),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						_elm_tools$parser$Parser$symbol(end),
						_elm_tools$parser$Parser$succeed(
							{ctor: '[]'})),
					_1: {ctor: '[]'}
				}
			});
	});
var _elm_tools$parser$Parser_LanguageKit$whitespaceHelp = function (parser) {
	return A2(
		_elm_tools$parser$Parser_LanguageKit$ignore,
		_elm_tools$parser$Parser_LanguageKit$chompSpaces,
		_elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser$andThen,
					function (_p3) {
						return _elm_tools$parser$Parser_LanguageKit$whitespaceHelp(parser);
					},
					parser),
				_1: {
					ctor: '::',
					_0: _elm_tools$parser$Parser$succeed(
						{ctor: '_Tuple0'}),
					_1: {ctor: '[]'}
				}
			}));
};
var _elm_tools$parser$Parser_LanguageKit$nestableCommentHelp = F4(
	function (isNotRelevant, start, end, nestLevel) {
		return _elm_tools$parser$Parser$lazy(
			function (_p4) {
				return A2(
					_elm_tools$parser$Parser_LanguageKit$ignore,
					A2(_elm_tools$parser$Parser$ignore, _elm_tools$parser$Parser$zeroOrMore, isNotRelevant),
					_elm_tools$parser$Parser$oneOf(
						{
							ctor: '::',
							_0: A2(
								_elm_tools$parser$Parser_LanguageKit$ignore,
								_elm_tools$parser$Parser$symbol(end),
								_elm_lang$core$Native_Utils.eq(nestLevel, 1) ? _elm_tools$parser$Parser$succeed(
									{ctor: '_Tuple0'}) : A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, nestLevel - 1)),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_tools$parser$Parser_LanguageKit$ignore,
									_elm_tools$parser$Parser$symbol(start),
									A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, nestLevel + 1)),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_tools$parser$Parser_LanguageKit$ignore,
										A2(
											_elm_tools$parser$Parser$ignore,
											_elm_tools$parser$Parser$Exactly(1),
											_elm_tools$parser$Parser_LanguageKit$isChar),
										A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, nestLevel)),
									_1: {ctor: '[]'}
								}
							}
						}));
			});
	});
var _elm_tools$parser$Parser_LanguageKit$nestableComment = F2(
	function (start, end) {
		var _p5 = {
			ctor: '_Tuple2',
			_0: _elm_lang$core$String$uncons(start),
			_1: _elm_lang$core$String$uncons(end)
		};
		if (_p5._0.ctor === 'Nothing') {
			return _elm_tools$parser$Parser$fail('Trying to parse a multi-line comment, but the start token cannot be the empty string!');
		} else {
			if (_p5._1.ctor === 'Nothing') {
				return _elm_tools$parser$Parser$fail('Trying to parse a multi-line comment, but the end token cannot be the empty string!');
			} else {
				var isNotRelevant = function ($char) {
					return (!_elm_lang$core$Native_Utils.eq($char, _p5._0._0._0)) && (!_elm_lang$core$Native_Utils.eq($char, _p5._1._0._0));
				};
				return A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$symbol(start),
					A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, 1));
			}
		}
	});
var _elm_tools$parser$Parser_LanguageKit$whitespace = function (_p6) {
	var _p7 = _p6;
	var multiParser = function () {
		var _p8 = _p7.multiComment;
		switch (_p8.ctor) {
			case 'NoMultiComment':
				return {ctor: '[]'};
			case 'UnnestableComment':
				return {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_ops['|.'],
						_elm_tools$parser$Parser$symbol(_p8._0),
						_elm_tools$parser$Parser$ignoreUntil(_p8._1)),
					_1: {ctor: '[]'}
				};
			default:
				return {
					ctor: '::',
					_0: A2(_elm_tools$parser$Parser_LanguageKit$nestableComment, _p8._0, _p8._1),
					_1: {ctor: '[]'}
				};
		}
	}();
	var lineParser = function () {
		var _p9 = _p7.lineComment;
		if (_p9.ctor === 'NoLineComment') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$symbol(_p9._0),
					_elm_tools$parser$Parser$ignoreUntil('\n')),
				_1: {ctor: '[]'}
			};
		}
	}();
	var tabParser = _p7.allowTabs ? {
		ctor: '::',
		_0: A2(_elm_tools$parser$Parser$ignore, _elm_tools$parser$Parser$zeroOrMore, _elm_tools$parser$Parser_LanguageKit$isTab),
		_1: {ctor: '[]'}
	} : {ctor: '[]'};
	return _elm_tools$parser$Parser_LanguageKit$whitespaceHelp(
		_elm_tools$parser$Parser$oneOf(
			A2(
				_elm_lang$core$Basics_ops['++'],
				tabParser,
				A2(_elm_lang$core$Basics_ops['++'], lineParser, multiParser))));
};
var _elm_tools$parser$Parser_LanguageKit$sequence = function (_p10) {
	var _p11 = _p10;
	var _p12 = _p11.spaces;
	return A2(
		_elm_tools$parser$Parser_LanguageKit_ops['|-'],
		A2(
			_elm_tools$parser$Parser_LanguageKit_ops['|-'],
			_elm_tools$parser$Parser$symbol(_p11.start),
			_p12),
		A5(_elm_tools$parser$Parser_LanguageKit$sequenceEnd, _p11.end, _p12, _p11.item, _p11.separator, _p11.trailing));
};
var _elm_tools$parser$Parser_LanguageKit$varHelp = F7(
	function (isGood, offset, row, col, source, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, isGood, offset, source);
			if (_elm_lang$core$Native_Utils.eq(newOffset, -1)) {
				return {source: source, offset: offset, indent: indent, context: context, row: row, col: col};
			} else {
				if (_elm_lang$core$Native_Utils.eq(newOffset, -2)) {
					var _v6 = isGood,
						_v7 = offset + 1,
						_v8 = row + 1,
						_v9 = 1,
						_v10 = source,
						_v11 = indent,
						_v12 = context;
					isGood = _v6;
					offset = _v7;
					row = _v8;
					col = _v9;
					source = _v10;
					indent = _v11;
					context = _v12;
					continue varHelp;
				} else {
					var _v13 = isGood,
						_v14 = newOffset,
						_v15 = row,
						_v16 = col + 1,
						_v17 = source,
						_v18 = indent,
						_v19 = context;
					isGood = _v13;
					offset = _v14;
					row = _v15;
					col = _v16;
					source = _v17;
					indent = _v18;
					context = _v19;
					continue varHelp;
				}
			}
		}
	});
var _elm_tools$parser$Parser_LanguageKit$variable = F3(
	function (isFirst, isOther, keywords) {
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p13) {
				var _p14 = _p13;
				var _p20 = _p14;
				var _p19 = _p14.source;
				var _p18 = _p14.row;
				var _p17 = _p14.offset;
				var _p16 = _p14.indent;
				var _p15 = _p14.context;
				var firstOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, isFirst, _p17, _p19);
				if (_elm_lang$core$Native_Utils.eq(firstOffset, -1)) {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$ExpectingVariable, _p20);
				} else {
					var state2 = _elm_lang$core$Native_Utils.eq(firstOffset, -2) ? A7(_elm_tools$parser$Parser_LanguageKit$varHelp, isOther, _p17 + 1, _p18 + 1, 1, _p19, _p16, _p15) : A7(_elm_tools$parser$Parser_LanguageKit$varHelp, isOther, firstOffset, _p18, _p14.col + 1, _p19, _p16, _p15);
					var name = A3(_elm_lang$core$String$slice, _p17, state2.offset, _p19);
					return A2(_elm_lang$core$Set$member, name, keywords) ? A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$ExpectingVariable, _p20) : A2(_elm_tools$parser$Parser_Internal$Good, name, state2);
				}
			});
	});
var _elm_tools$parser$Parser_LanguageKit$Mandatory = {ctor: 'Mandatory'};
var _elm_tools$parser$Parser_LanguageKit$Optional = {ctor: 'Optional'};
var _elm_tools$parser$Parser_LanguageKit$Forbidden = {ctor: 'Forbidden'};
var _elm_tools$parser$Parser_LanguageKit$list = F2(
	function (spaces, item) {
		return _elm_tools$parser$Parser_LanguageKit$sequence(
			{start: '[', separator: ',', end: ']', spaces: spaces, item: item, trailing: _elm_tools$parser$Parser_LanguageKit$Forbidden});
	});
var _elm_tools$parser$Parser_LanguageKit$record = F2(
	function (spaces, item) {
		return _elm_tools$parser$Parser_LanguageKit$sequence(
			{start: '{', separator: ',', end: '}', spaces: spaces, item: item, trailing: _elm_tools$parser$Parser_LanguageKit$Forbidden});
	});
var _elm_tools$parser$Parser_LanguageKit$tuple = F2(
	function (spaces, item) {
		return _elm_tools$parser$Parser_LanguageKit$sequence(
			{start: '(', separator: ',', end: ')', spaces: spaces, item: item, trailing: _elm_tools$parser$Parser_LanguageKit$Forbidden});
	});
var _elm_tools$parser$Parser_LanguageKit$LineComment = function (a) {
	return {ctor: 'LineComment', _0: a};
};
var _elm_tools$parser$Parser_LanguageKit$NoLineComment = {ctor: 'NoLineComment'};
var _elm_tools$parser$Parser_LanguageKit$UnnestableComment = F2(
	function (a, b) {
		return {ctor: 'UnnestableComment', _0: a, _1: b};
	});
var _elm_tools$parser$Parser_LanguageKit$NestableComment = F2(
	function (a, b) {
		return {ctor: 'NestableComment', _0: a, _1: b};
	});
var _elm_tools$parser$Parser_LanguageKit$NoMultiComment = {ctor: 'NoMultiComment'};

var _user$project$And$execute = F2(
	function (command, model) {
		return {ctor: '_Tuple2', _0: model, _1: command};
	});
var _user$project$And$noCommand = function (model) {
	return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
};

var _user$project$Types_Exposings$encoder = function (exposings) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'functions',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Json_Encode$string,
						_elm_lang$core$Set$toList(exposings.functions)))
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'types',
					_1: _elm_lang$core$Json_Encode$list(
						A2(
							_elm_lang$core$List$map,
							_elm_lang$core$Json_Encode$string,
							_elm_lang$core$Set$toList(exposings.types)))
				},
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Types_Exposings$default = {functions: _elm_lang$core$Set$empty, types: _elm_lang$core$Set$empty};
var _user$project$Types_Exposings$Exposings = F2(
	function (a, b) {
		return {functions: a, types: b};
	});
var _user$project$Types_Exposings$decoder = A3(
	_elm_lang$core$Json_Decode$map2,
	_user$project$Types_Exposings$Exposings,
	A2(
		_elm_lang$core$Json_Decode$field,
		'functions',
		_elm_community$json_extra$Json_Decode_Extra$set(_elm_lang$core$Json_Decode$string)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'types',
		_elm_community$json_extra$Json_Decode_Extra$set(_elm_lang$core$Json_Decode$string)));

var _user$project$Types_Reference$encoder = function (reference) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(reference.name)
			},
			_1: {ctor: '[]'}
		});
};
var _user$project$Types_Reference$default = {name: ''};
var _user$project$Types_Reference$Reference = function (a) {
	return {name: a};
};
var _user$project$Types_Reference$decoder = A2(
	_elm_lang$core$Json_Decode$map,
	_user$project$Types_Reference$Reference,
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string));
var _user$project$Types_Reference$listDecoder = _elm_lang$core$Json_Decode$list(_user$project$Types_Reference$decoder);

var _user$project$Types_Expression$updateLineNumber = F2(
	function (lineNumber, expression) {
		return _elm_lang$core$Native_Utils.update(
			expression,
			{lineNumber: lineNumber});
	});
var _user$project$Types_Expression$default = {lineNumber: 0};
var _user$project$Types_Expression$Expression = function (a) {
	return {lineNumber: a};
};

var _user$project$Types_TopLevelExpressions$expressionDecoder = A2(
	_elm_lang$core$Json_Decode$map,
	_user$project$Types_Expression$Expression,
	A2(_elm_lang$core$Json_Decode$field, 'lineNumber', _elm_lang$core$Json_Decode$int));
var _user$project$Types_TopLevelExpressions$expressionDictDecoder = _elm_lang$core$Json_Decode$dict(_user$project$Types_TopLevelExpressions$expressionDecoder);
var _user$project$Types_TopLevelExpressions$expressionValue = function (dict) {
	return _elm_lang$core$Json_Encode$object(
		A2(
			_elm_lang$core$List$map,
			function (_p0) {
				var _p1 = _p0;
				return {
					ctor: '_Tuple2',
					_0: _p1._0,
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'lineNumber',
								_1: _elm_lang$core$Json_Encode$int(_p1._1.lineNumber)
							},
							_1: {ctor: '[]'}
						})
				};
			},
			_elm_lang$core$Dict$toList(dict)));
};
var _user$project$Types_TopLevelExpressions$encoder = function (expressions) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'functions',
				_1: _user$project$Types_TopLevelExpressions$expressionValue(expressions.functions)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'types',
					_1: _user$project$Types_TopLevelExpressions$expressionValue(expressions.types)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'typeAliases',
						_1: _user$project$Types_TopLevelExpressions$expressionValue(expressions.typeAliases)
					},
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$Types_TopLevelExpressions$updateLineNumberFor = F3(
	function (functionName, lineNumber, expressionDict) {
		return A3(
			_elm_lang$core$Dict$update,
			functionName,
			_elm_lang$core$Maybe$map(
				_user$project$Types_Expression$updateLineNumber(lineNumber)),
			expressionDict);
	});
var _user$project$Types_TopLevelExpressions$updateTypeAliasLineNumber = F3(
	function (name, lineNumber, topLevelExpressions) {
		return _elm_lang$core$Native_Utils.update(
			topLevelExpressions,
			{
				typeAliases: A3(_user$project$Types_TopLevelExpressions$updateLineNumberFor, name, lineNumber, topLevelExpressions.typeAliases)
			});
	});
var _user$project$Types_TopLevelExpressions$updateTypeLineNumber = F3(
	function (name, lineNumber, topLevelExpressions) {
		return _elm_lang$core$Native_Utils.update(
			topLevelExpressions,
			{
				types: A3(_user$project$Types_TopLevelExpressions$updateLineNumberFor, name, lineNumber, topLevelExpressions.types)
			});
	});
var _user$project$Types_TopLevelExpressions$updateFunctionLineNumber = F3(
	function (name, lineNumber, topLevelExpressions) {
		return _elm_lang$core$Native_Utils.update(
			topLevelExpressions,
			{
				functions: A3(_user$project$Types_TopLevelExpressions$updateLineNumberFor, name, lineNumber, topLevelExpressions.functions)
			});
	});
var _user$project$Types_TopLevelExpressions$default = {functions: _elm_lang$core$Dict$empty, types: _elm_lang$core$Dict$empty, typeAliases: _elm_lang$core$Dict$empty};
var _user$project$Types_TopLevelExpressions$TopLevelExpressions = F3(
	function (a, b, c) {
		return {functions: a, types: b, typeAliases: c};
	});
var _user$project$Types_TopLevelExpressions$decoder = A4(
	_elm_lang$core$Json_Decode$map3,
	_user$project$Types_TopLevelExpressions$TopLevelExpressions,
	A2(_elm_lang$core$Json_Decode$field, 'functions', _user$project$Types_TopLevelExpressions$expressionDictDecoder),
	A2(_elm_lang$core$Json_Decode$field, 'types', _user$project$Types_TopLevelExpressions$expressionDictDecoder),
	A2(_elm_lang$core$Json_Decode$field, 'typeAliases', _user$project$Types_TopLevelExpressions$expressionDictDecoder));

var _user$project$Types_FileData$empty = {
	topLevelExpressions: {functions: _elm_lang$core$Dict$empty, types: _elm_lang$core$Dict$empty, typeAliases: _elm_lang$core$Dict$empty},
	exposings: {functions: _elm_lang$core$Set$empty, types: _elm_lang$core$Set$empty},
	references: {ctor: '[]'}
};
var _user$project$Types_FileData$FileData = F3(
	function (a, b, c) {
		return {topLevelExpressions: a, exposings: b, references: c};
	});

var _user$project$Types_FileMarkup$default = {
	fileName: '',
	expressions: {ctor: '[]'}
};
var _user$project$Types_FileMarkup$FileMarkup = F2(
	function (a, b) {
		return {fileName: a, expressions: b};
	});
var _user$project$Types_FileMarkup$ExpressionData = F4(
	function (a, b, c, d) {
		return {name: a, lineNumber: b, isExposed: c, numInternalRefs: d};
	});


var _user$project$Model_FileMarkup$numOccurencesInOwnReferences = F2(
	function (funcName, fileData) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (ref, count) {
					return _elm_lang$core$Native_Utils.eq(ref.name, funcName) ? (count + 1) : count;
				}),
			0,
			fileData.references);
	});
var _user$project$Model_FileMarkup$isExposed = F2(
	function (funcName, fileData) {
		return A2(_elm_lang$core$Set$member, funcName, fileData.exposings.functions);
	});
var _user$project$Model_FileMarkup$makeExpressions = function (fileData) {
	return A3(
		_elm_lang$core$Dict$foldl,
		F3(
			function (funcName, funcData, list) {
				return {
					ctor: '::',
					_0: A4(
						_user$project$Types_FileMarkup$ExpressionData,
						funcName,
						funcData.lineNumber,
						A2(_user$project$Model_FileMarkup$isExposed, funcName, fileData),
						A2(_user$project$Model_FileMarkup$numOccurencesInOwnReferences, funcName, fileData)),
					_1: list
				};
			}),
		{ctor: '[]'},
		fileData.topLevelExpressions.functions);
};
var _user$project$Model_FileMarkup$toFileMarkup = F2(
	function (fileName, fileData) {
		return A2(
			_user$project$Types_FileMarkup$FileMarkup,
			fileName,
			_user$project$Model_FileMarkup$makeExpressions(fileData));
	});
var _user$project$Model_FileMarkup$make = F2(
	function (fileName, projectFileData) {
		return A2(
			_user$project$Model_FileMarkup$toFileMarkup,
			fileName,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$Types_FileData$empty,
				A2(_elm_lang$core$Dict$get, fileName, projectFileData)));
	});

var _user$project$Model_ProjectFileData$decode = F4(
	function (value, fieldName, decoder, $default) {
		return A2(
			_elm_lang$core$Result$withDefault,
			$default,
			A2(
				_elm_lang$core$Json_Decode$decodeValue,
				A2(_elm_lang$core$Json_Decode$field, fieldName, decoder),
				value));
	});
var _user$project$Model_ProjectFileData$add = F2(
	function (value, model) {
		return A3(
			_elm_lang$core$Dict$insert,
			A4(_user$project$Model_ProjectFileData$decode, value, 'fileName', _elm_lang$core$Json_Decode$string, ''),
			{
				topLevelExpressions: A4(_user$project$Model_ProjectFileData$decode, value, 'topLevelExpressions', _user$project$Types_TopLevelExpressions$decoder, _user$project$Types_TopLevelExpressions$default),
				exposings: A4(_user$project$Model_ProjectFileData$decode, value, 'exposings', _user$project$Types_Exposings$decoder, _user$project$Types_Exposings$default),
				references: A4(
					_user$project$Model_ProjectFileData$decode,
					value,
					'references',
					_user$project$Types_Reference$listDecoder,
					{
						ctor: '::',
						_0: _user$project$Types_Reference$default,
						_1: {ctor: '[]'}
					})
			},
			model);
	});

var _user$project$Main$init = _user$project$And$noCommand(_elm_lang$core$Dict$empty);
var _user$project$Main$processReport = _elm_lang$core$Native_Platform.incomingPort('processReport', _elm_lang$core$Json_Decode$value);
var _user$project$Main$fileMarkupRequest = _elm_lang$core$Native_Platform.incomingPort('fileMarkupRequest', _elm_lang$core$Json_Decode$string);
var _user$project$Main$markupForFile = _elm_lang$core$Native_Platform.outgoingPort(
	'markupForFile',
	function (v) {
		return {
			fileName: v.fileName,
			expressions: _elm_lang$core$Native_List.toArray(v.expressions).map(
				function (v) {
					return {name: v.name, lineNumber: v.lineNumber, isExposed: v.isExposed, numInternalRefs: v.numInternalRefs};
				})
		};
	});
var _user$project$Main$andTransmitFileMarkup = F2(
	function (fileName, model) {
		return A2(
			_user$project$And$execute,
			_user$project$Main$markupForFile(
				A2(_user$project$Model_FileMarkup$make, fileName, model)),
			model);
	});
var _user$project$Main$update = F2(
	function (message, model) {
		var _p0 = message;
		if (_p0.ctor === 'AddFileData') {
			return _user$project$And$noCommand(
				A2(_user$project$Model_ProjectFileData$add, _p0._0, model));
		} else {
			return A2(_user$project$Main$andTransmitFileMarkup, _p0._0, model);
		}
	});
var _user$project$Main$FileMarkupRequest = function (a) {
	return {ctor: 'FileMarkupRequest', _0: a};
};
var _user$project$Main$AddFileData = function (a) {
	return {ctor: 'AddFileData', _0: a};
};
var _user$project$Main$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _user$project$Main$processReport(_user$project$Main$AddFileData),
			_1: {
				ctor: '::',
				_0: _user$project$Main$fileMarkupRequest(_user$project$Main$FileMarkupRequest),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Main$main = _elm_lang$core$Platform$program(
	{init: _user$project$Main$init, update: _user$project$Main$update, subscriptions: _user$project$Main$subscriptions})();

var _user$project$Model_AST$process = function (text) {
	var _p0 = _Bogdanp$elm_ast$Ast$parse(text);
	if (_p0.ctor === 'Ok') {
		return _p0._0._2;
	} else {
		return {ctor: '[]'};
	}
};
var _user$project$Model_AST$buildFrom = F2(
	function (fileText, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				fileAST: _user$project$Model_AST$process(fileText)
			});
	});

var _user$project$Model_Exposings$collectFromExports = F2(
	function ($export, exposings) {
		var _p0 = $export;
		switch (_p0.ctor) {
			case 'FunctionExport':
				return _elm_lang$core$Native_Utils.update(
					exposings,
					{
						functions: A2(_elm_lang$core$Set$insert, _p0._0, exposings.functions)
					});
			case 'TypeExport':
				return _elm_lang$core$Native_Utils.update(
					exposings,
					{
						types: A2(_elm_lang$core$Set$insert, _p0._0, exposings.types)
					});
			default:
				return exposings;
		}
	});
var _user$project$Model_Exposings$collectAll = F2(
	function (exports, exposings) {
		return A3(_elm_lang$core$List$foldl, _user$project$Model_Exposings$collectFromExports, exposings, exports);
	});
var _user$project$Model_Exposings$useAllTopLevelExpressions = function (model) {
	return {
		functions: _elm_lang$core$Set$fromList(
			_elm_lang$core$Dict$keys(model.topLevelExpressions.functions)),
		types: _elm_lang$core$Set$fromList(
			_elm_lang$core$Dict$keys(
				A2(_elm_lang$core$Dict$union, model.topLevelExpressions.types, model.topLevelExpressions.typeAliases)))
	};
};
var _user$project$Model_Exposings$collectExposings = F3(
	function (model, statement, exposings) {
		var _p1 = statement;
		_v1_4:
		do {
			switch (_p1.ctor) {
				case 'ModuleDeclaration':
					switch (_p1._1.ctor) {
						case 'AllExport':
							return _user$project$Model_Exposings$useAllTopLevelExpressions(model);
						case 'SubsetExport':
							return A2(_user$project$Model_Exposings$collectAll, _p1._1._0, exposings);
						default:
							break _v1_4;
					}
				case 'PortModuleDeclaration':
					switch (_p1._1.ctor) {
						case 'AllExport':
							return _user$project$Model_Exposings$useAllTopLevelExpressions(model);
						case 'SubsetExport':
							return A2(_user$project$Model_Exposings$collectAll, _p1._1._0, exposings);
						default:
							break _v1_4;
					}
				default:
					break _v1_4;
			}
		} while(false);
		return exposings;
	});
var _user$project$Model_Exposings$collect = function (model) {
	return _elm_lang$core$Native_Utils.update(
		model,
		{
			exposings: A3(
				_elm_lang$core$List$foldl,
				_user$project$Model_Exposings$collectExposings(model),
				model.exposings,
				model.fileAST)
		});
};

var _user$project$Model_References$flattenExpressionTuples = function (expressionTuples) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p0, list) {
				var _p1 = _p0;
				return {
					ctor: '::',
					_0: _p1._0,
					_1: {ctor: '::', _0: _p1._1, _1: list}
				};
			}),
		{ctor: '[]'},
		expressionTuples);
};
var _user$project$Model_References$findInExpression = F2(
	function (expression, references) {
		var _p2 = expression;
		switch (_p2.ctor) {
			case 'Variable':
				if (((_p2._0.ctor === '::') && (_p2._0._0 === '_')) && (_p2._0._1.ctor === '[]')) {
					return references;
				} else {
					return A2(_elm_lang$core$Basics_ops['++'], _p2._0, references);
				}
			case 'List':
				return A3(_elm_lang$core$List$foldl, _user$project$Model_References$findInExpression, references, _p2._0);
			case 'Tuple':
				return A3(_elm_lang$core$List$foldl, _user$project$Model_References$findInExpression, references, _p2._0);
			case 'Record':
				return A3(
					_elm_lang$core$List$foldl,
					F2(
						function (_p3, funcs) {
							var _p4 = _p3;
							return A2(_user$project$Model_References$findInExpression, _p4._1, funcs);
						}),
					references,
					_p2._0);
			case 'RecordUpdate':
				return A3(
					_elm_lang$core$List$foldl,
					F2(
						function (_p5, funcs) {
							var _p6 = _p5;
							return A2(_user$project$Model_References$findInExpression, _p6._1, funcs);
						}),
					references,
					_p2._1);
			case 'If':
				return A4(_user$project$Model_References$concatExpressions3, _p2._0, _p2._1, _p2._2, references);
			case 'Let':
				return A3(
					_elm_lang$core$List$foldl,
					_user$project$Model_References$findInExpression,
					references,
					{
						ctor: '::',
						_0: _p2._1,
						_1: _user$project$Model_References$flattenExpressionTuples(_p2._0)
					});
			case 'Case':
				return A3(
					_elm_lang$core$List$foldl,
					_user$project$Model_References$findInExpression,
					references,
					{
						ctor: '::',
						_0: _p2._0,
						_1: _user$project$Model_References$flattenExpressionTuples(_p2._1)
					});
			case 'Lambda':
				return A3(
					_elm_lang$core$List$foldl,
					_user$project$Model_References$findInExpression,
					references,
					{ctor: '::', _0: _p2._1, _1: _p2._0});
			case 'Application':
				return A3(_user$project$Model_References$concatExpressions2, _p2._0, _p2._1, references);
			case 'BinOp':
				return A4(_user$project$Model_References$concatExpressions3, _p2._0, _p2._1, _p2._2, references);
			default:
				return references;
		}
	});
var _user$project$Model_References$concatExpressions2 = F3(
	function (exp1, exp2, references) {
		return A3(
			_elm_lang$core$List$foldl,
			_user$project$Model_References$findInExpression,
			references,
			{
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Model_References$concatExpressions3 = F4(
	function (exp1, exp2, exp3, references) {
		return A3(
			_elm_lang$core$List$foldl,
			_user$project$Model_References$findInExpression,
			references,
			{
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {
						ctor: '::',
						_0: exp3,
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Model_References$collectReferences = F2(
	function (statement, references) {
		var _p7 = statement;
		if (_p7.ctor === 'FunctionDeclaration') {
			return A2(_user$project$Model_References$findInExpression, _p7._2, references);
		} else {
			return references;
		}
	});
var _user$project$Model_References$stringsToRefs = function (refStrings) {
	return A2(_elm_lang$core$List$map, _user$project$Types_Reference$Reference, refStrings);
};
var _user$project$Model_References$collect = function (model) {
	return _elm_lang$core$Native_Utils.update(
		model,
		{
			references: _user$project$Model_References$stringsToRefs(
				A3(
					_elm_lang$core$List$foldl,
					_user$project$Model_References$collectReferences,
					{ctor: '[]'},
					model.fileAST))
		});
};

var _user$project$Model_Report$make = F2(
	function (fileName, model) {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'fileName',
					_1: _elm_lang$core$Json_Encode$string(fileName)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'topLevelExpressions',
						_1: _user$project$Types_TopLevelExpressions$encoder(model.topLevelExpressions)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'exposings',
							_1: _user$project$Types_Exposings$encoder(model.exposings)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'references',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _user$project$Types_Reference$encoder, model.references))
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});

var _user$project$Model_TopLevelExpressions$keywords = _elm_lang$core$Set$fromList(
	{
		ctor: '::',
		_0: 'let',
		_1: {
			ctor: '::',
			_0: 'in',
			_1: {
				ctor: '::',
				_0: 'case',
				_1: {
					ctor: '::',
					_0: 'of',
					_1: {ctor: '[]'}
				}
			}
		}
	});
var _user$project$Model_TopLevelExpressions$isVarChar = function ($char) {
	return _elm_lang$core$Char$isLower($char) || (_elm_lang$core$Char$isUpper($char) || (_elm_lang$core$Char$isDigit($char) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('_'))));
};
var _user$project$Model_TopLevelExpressions$upperCaseVariable = A3(_elm_tools$parser$Parser_LanguageKit$variable, _elm_lang$core$Char$isUpper, _user$project$Model_TopLevelExpressions$isVarChar, _user$project$Model_TopLevelExpressions$keywords);
var _user$project$Model_TopLevelExpressions$lowerCaseVariable = A3(_elm_tools$parser$Parser_LanguageKit$variable, _elm_lang$core$Char$isLower, _user$project$Model_TopLevelExpressions$isVarChar, _user$project$Model_TopLevelExpressions$keywords);
var _user$project$Model_TopLevelExpressions$collectFor = F6(
	function (updater, name, lineNumber, lineNumberMod, topLevelExpressions, model) {
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					topLevelExpressions: A3(updater, name, lineNumber + lineNumberMod, topLevelExpressions)
				}),
			_1: lineNumber + 1
		};
	});
var _user$project$Model_TopLevelExpressions$asLines = function (text) {
	return A2(_elm_lang$core$String$split, '\n', text);
};
var _user$project$Model_TopLevelExpressions$firstElement = function (singleEntry) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(singleEntry));
};
var _user$project$Model_TopLevelExpressions$collectExpressions = F2(
	function (statement, expressions) {
		var _p0 = statement;
		_v0_3:
		do {
			switch (_p0.ctor) {
				case 'FunctionDeclaration':
					return _elm_lang$core$Native_Utils.update(
						expressions,
						{
							functions: A3(_elm_lang$core$Dict$insert, _p0._0, _user$project$Types_Expression$default, expressions.functions)
						});
				case 'TypeDeclaration':
					if (_p0._0.ctor === 'TypeConstructor') {
						return _elm_lang$core$Native_Utils.update(
							expressions,
							{
								types: A3(
									_elm_lang$core$Dict$insert,
									_user$project$Model_TopLevelExpressions$firstElement(_p0._0._0),
									_user$project$Types_Expression$default,
									expressions.types)
							});
					} else {
						break _v0_3;
					}
				case 'TypeAliasDeclaration':
					if (_p0._0.ctor === 'TypeConstructor') {
						return _elm_lang$core$Native_Utils.update(
							expressions,
							{
								typeAliases: A3(
									_elm_lang$core$Dict$insert,
									_user$project$Model_TopLevelExpressions$firstElement(_p0._0._0),
									_user$project$Types_Expression$default,
									expressions.typeAliases)
							});
					} else {
						break _v0_3;
					}
				default:
					break _v0_3;
			}
		} while(false);
		return expressions;
	});
var _user$project$Model_TopLevelExpressions$collect = function (model) {
	return _elm_lang$core$Native_Utils.update(
		model,
		{
			topLevelExpressions: A3(_elm_lang$core$List$foldl, _user$project$Model_TopLevelExpressions$collectExpressions, model.topLevelExpressions, model.fileAST)
		});
};
var _user$project$Model_TopLevelExpressions$Type = function (a) {
	return {ctor: 'Type', _0: a};
};
var _user$project$Model_TopLevelExpressions$TypeAlias = function (a) {
	return {ctor: 'TypeAlias', _0: a};
};
var _user$project$Model_TopLevelExpressions$Function = function (a) {
	return {ctor: 'Function', _0: a};
};
var _user$project$Model_TopLevelExpressions$NoMatch = {ctor: 'NoMatch'};
var _user$project$Model_TopLevelExpressions$topLevelExpression = _elm_tools$parser$Parser$oneOf(
	{
		ctor: '::',
		_0: A2(
			_elm_tools$parser$Parser_ops['|.'],
			_elm_tools$parser$Parser$succeed(_user$project$Model_TopLevelExpressions$NoMatch),
			_elm_tools$parser$Parser$keyword('port ')),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_tools$parser$Parser_ops['|.'],
				_elm_tools$parser$Parser$succeed(_user$project$Model_TopLevelExpressions$NoMatch),
				_elm_tools$parser$Parser$keyword('module ')),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$succeed(_user$project$Model_TopLevelExpressions$NoMatch),
					_elm_tools$parser$Parser$keyword('import ')),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_ops['|='],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							_elm_tools$parser$Parser$succeed(_user$project$Model_TopLevelExpressions$TypeAlias),
							_elm_tools$parser$Parser$keyword('type alias ')),
						_user$project$Model_TopLevelExpressions$upperCaseVariable),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_tools$parser$Parser_ops['|='],
							A2(
								_elm_tools$parser$Parser_ops['|.'],
								_elm_tools$parser$Parser$succeed(_user$project$Model_TopLevelExpressions$Type),
								_elm_tools$parser$Parser$keyword('type ')),
							_user$project$Model_TopLevelExpressions$upperCaseVariable),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_tools$parser$Parser_ops['|='],
								_elm_tools$parser$Parser$succeed(_user$project$Model_TopLevelExpressions$Function),
								_user$project$Model_TopLevelExpressions$lowerCaseVariable),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	});
var _user$project$Model_TopLevelExpressions$lineCollector = F2(
	function (line, _p1) {
		var _p2 = _p1;
		var _p5 = _p2._0;
		var _p4 = _p2._1;
		var _p3 = A2(_elm_tools$parser$Parser$run, _user$project$Model_TopLevelExpressions$topLevelExpression, line);
		_v2_3:
		do {
			if (_p3.ctor === 'Ok') {
				switch (_p3._0.ctor) {
					case 'Function':
						return A6(_user$project$Model_TopLevelExpressions$collectFor, _user$project$Types_TopLevelExpressions$updateFunctionLineNumber, _p3._0._0, _p4, 0, _p5.topLevelExpressions, _p5);
					case 'TypeAlias':
						return A6(_user$project$Model_TopLevelExpressions$collectFor, _user$project$Types_TopLevelExpressions$updateTypeAliasLineNumber, _p3._0._0, _p4, 1, _p5.topLevelExpressions, _p5);
					case 'Type':
						return A6(_user$project$Model_TopLevelExpressions$collectFor, _user$project$Types_TopLevelExpressions$updateTypeLineNumber, _p3._0._0, _p4, 1, _p5.topLevelExpressions, _p5);
					default:
						break _v2_3;
				}
			} else {
				break _v2_3;
			}
		} while(false);
		return {ctor: '_Tuple2', _0: _p5, _1: _p4 + 1};
	});
var _user$project$Model_TopLevelExpressions$addLineNumbers = F2(
	function (text, model) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldl,
				_user$project$Model_TopLevelExpressions$lineCollector,
				{ctor: '_Tuple2', _0: model, _1: -1},
				_user$project$Model_TopLevelExpressions$asLines(text)));
	});

var _user$project$Worker$init = _user$project$And$noCommand(
	{
		fileAST: {ctor: '[]'},
		topLevelExpressions: _user$project$Types_TopLevelExpressions$default,
		exposings: _user$project$Types_Exposings$default,
		references: {ctor: '[]'}
	});
var _user$project$Worker$report = _elm_lang$core$Native_Platform.outgoingPort(
	'report',
	function (v) {
		return v;
	});
var _user$project$Worker$andSendReport = F2(
	function (fileName, model) {
		return A2(
			_user$project$And$execute,
			_user$project$Worker$report(
				A2(_user$project$Model_Report$make, fileName, model)),
			model);
	});
var _user$project$Worker$update = F2(
	function (message, model) {
		var _p0 = message;
		var _p1 = _p0._0._1;
		return A2(
			_user$project$Worker$andSendReport,
			_p0._0._0,
			A2(
				_user$project$Model_TopLevelExpressions$addLineNumbers,
				_p1,
				_user$project$Model_References$collect(
					_user$project$Model_Exposings$collect(
						_user$project$Model_TopLevelExpressions$collect(
							A2(_user$project$Model_AST$buildFrom, _p1, model))))));
	});
var _user$project$Worker$process = _elm_lang$core$Native_Platform.incomingPort(
	'process',
	A2(
		_elm_lang$core$Json_Decode$andThen,
		function (x0) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (x1) {
					return _elm_lang$core$Json_Decode$succeed(
						{ctor: '_Tuple2', _0: x0, _1: x1});
				},
				A2(_elm_lang$core$Json_Decode$index, 1, _elm_lang$core$Json_Decode$string));
		},
		A2(_elm_lang$core$Json_Decode$index, 0, _elm_lang$core$Json_Decode$string)));
var _user$project$Worker$Model = F4(
	function (a, b, c, d) {
		return {fileAST: a, topLevelExpressions: b, exposings: c, references: d};
	});
var _user$project$Worker$ProcessFile = function (a) {
	return {ctor: 'ProcessFile', _0: a};
};
var _user$project$Worker$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _user$project$Worker$process(_user$project$Worker$ProcessFile),
			_1: {ctor: '[]'}
		});
};
var _user$project$Worker$main = _elm_lang$core$Platform$program(
	{init: _user$project$Worker$init, update: _user$project$Worker$update, subscriptions: _user$project$Worker$subscriptions})();

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _user$project$Main$main !== 'undefined') {
    _user$project$Main$main(Elm['Main'], 'Main', undefined);
}
Elm['Worker'] = Elm['Worker'] || {};
if (typeof _user$project$Worker$main !== 'undefined') {
    _user$project$Worker$main(Elm['Worker'], 'Worker', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

