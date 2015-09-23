'use strict';

var
  cwd = process.cwd(),
  path = require('path'),
  DIRECTORY_SEPARATOR = path.sep;

module.exports = function ( $grunt ) {

    function _writeAliasFile ( $data ) {
      var
        _fileDest = $data.dir,
        _fileSrc = $data.full,
        _index,
        _nesting = _fileDest.length,
        _prefix = '.'
          + DIRECTORY_SEPARATOR;

      _fileDest.push( $data.base ),

      _fileDest = _prefix
        + _fileDest.join( DIRECTORY_SEPARATOR );

      if( _nesting > 0 ) {
        _prefix = '.'
          + _prefix;

        for( _index = 1; _index < _nesting; _index ++ ) {
          _prefix += _prefix;
        }
      }

      $grunt.log.writeln(
        'Create forwarding ...\r\n\n* From: '
          + _fileDest.cyan
          + '\r\n* To:   '
          + (
              './'
                + _fileSrc
            ).cyan
      ),

      $grunt.file.write(
        _fileDest,
        "module.exports = require('"
          + _prefix
          + _fileSrc.replace(
              $data.ext,
              ''
            )
          + "');"
      );
    }

    return $grunt.registerMultiTask(
        'alias',
        'Create forwardings to submodules that are not located in the topmost directory',
        function aliasNpmSubmodules () {
          var
            _count = 0,
            _filesSrc = this.filesSrc,
            _options = this.options(
                {
                  'levels': 1
                }
              ),
            _levels = Number( _options.levels );

          if(
            isNaN( _levels )
              || _levels < 1
          ) {
            _levels = 1;
          }

          if( Array.isArray(_filesSrc) && _filesSrc.length > 0 ) {
            _filesSrc.forEach(
              function ( $file, $index, $files ) {
                var
                  _dir,
                  _parsedPath;

                $file = path.normalize( $file );

                if( path.isAbsolute($file) ) {
                  $file = path.relative(
                      cwd,
                      $file
                    );
                }

                _parsedPath = path.parse( $file );

                if(
                  typeof _parsedPath !== 'object'
                    || _parsedPath === null

                  ||

                  typeof _parsedPath.dir !== 'string'
                ) {
                  return;
                }

                _parsedPath.dir = _parsedPath.dir.split( DIRECTORY_SEPARATOR );

                if(
                  !Array.isArray( _dir = _parsedPath.dir )
                    || _dir.length < 1
                ) {
                  return;
                }

                _parsedPath.dir = _dir.slice(
                    _levels > _dir.length ?
                      _dir.length : _levels
                  ),

                _parsedPath.full = $file,

                _writeAliasFile( _parsedPath ),

                _count ++;
              }
            ),

            $grunt.log.writeln(),

            $grunt.log.ok(
              'Successfully aliased '
                + String( _count ).green
                + ' npm module'
                + (
                    _count === 1 ?
                      '' : 's'
                  )
                + '.'
            );
          } else {
            $grunt.log.error('No files were aliased');
          }
        }
      );

  };