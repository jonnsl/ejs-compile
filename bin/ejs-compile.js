#!/usr/bin/env node

/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , program = require('commander')
  , ejs = require('ejs')
  , pkg = require('../package.json')
  , readDirFiles = require('read-dir-files')
  , utils = require('ejs/lib/utils.js')
  , isWindows = process.platform === 'win32';

// CLI
program
  .version(pkg.version)
  .option('-w, --watch', 'Watch file(s) for changes and re-compile')
  .option('-o, --out [dir]', 'Output to [dir] when passing files')
  .option('--min', 'Do some (unsafe) pre minification that minifiers usually can\'t do.')
  .option('--debug', '')
  .parse(process.argv);

var run = program.watch ? watch : compile;

// Path
var _path = program.args.shift() || '.';

fs.stat(_path, function(err, stat){
	if (err) return abort(err);

	if (stat.isFile()) {
		run(_path);
	} else if (stat.isDirectory()) {
		if (!program.out) return abort(new Error('You need to specify an output if you want to compile a directory.'))
		var walker = readDirFiles.list(_path);
		walker.on('file', run);
	}
});

// Monkey patch ejs for some aditional minifications
if (program.min) {
	var _old_parse = ejs.parse;
	ejs.parse = function(str, options) {
		return _old_parse(str
			.split('\n')
			.map(function(line) {
				return line.trim();
			})
			.join(''), options);
	}
}

utils.escape = {
	toString: function(){
		return 'require(\'./utils.js\').escape';
	}
}

function watch(file) {
	console.log('  \033[90mwatching\033[0m %s', file);
	// if is windows use fs.watch api instead
	// TODO: remove watchFile when fs.watch() works on osx etc
	if (isWindows) {
		fs.watch(file, function(event) {
			if (event === 'change') compile(file);
		});
	} else {
		fs.watchFile(file, { interval: 300 }, function(curr, prev) {
			if (curr.mtime > prev.mtime) compile(file);
		});
	}
	compile(file);
}

function compile(file) {
	var basename = path.basename(file, '.ejs');

	fs.readFile(file, function(err, buf){
		if (err) return abort(err);

		var contents = buf.toString('utf8');
		var fn = ejs.compile(contents, {
			//resolveInclude: false,
			client: true,
			compileDebug: program.debug === true,
			filename: path.join(process.cwd(), file)
		});

		var data = fn.toString().split('\n');
		data.splice(0, 1, data[0].replace(/^function anonymous/, 'module.exports = function '+ escape(basename)));
		data.splice(2, 0, 'filters = filters || require(\'./filters.js\');');

		if (program.out) {
			fs.writeFile(
				path.join(program.out, basename + '.js'),
				data.join(program.min ? '': '\n'), function(){
					console.log('  \033[90mcompiled\033[0m %s', file);
				});
		} else {
			console.log(data.join('\n'));
		}
	});
}

function escape(identifier) {
	if (!identifier[0].match(/[a-z$_]/i)) {
		identifier = '_' + identifier;
	}
	return identifier.replace(/[^a-z$_0-9]/gi, '_');
}

function abort(err) {
	console.error(err);
	process.exit(1);
}
