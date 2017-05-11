# ejs-compile

Pre-compile [ejs](https://github.com/visionmedia/ejs) templates.

## Installation

```bash
$ npm install ejs-compile
```

## Usage

```
Usage: ejs-compile [file|dir] [options]

Options:

  -h, --help       output usage information
  -V, --version    output the version number
  -w, --watch      Watch file(s) for changes and re-compile
  -o, --out [dir]  Output to [dir] when passing files.
  --strict         When set, generated function is in strict mode
  --cache          Compiled functions are cached
  --usewith        Whether or not to use with() {} constructs. If false then the locals will be stored in the locals object. Set to false in strict mode. Default false.
  --rmWhitespace   Remove all safe-to-remove whitespace, including leading and trailing whitespace. It also enables a safer version of -%> line slurping for all scriptlet tags (it does not strip new lines of tags in the middle of a line)
  --min            Do some (unsafe) pre minification that minifiers usually can't do.
  --debug
```

## License

(The MIT License)

Copyright (c) 2009-2010 Jonnathan Soares &lt;jonnsl@hotmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
