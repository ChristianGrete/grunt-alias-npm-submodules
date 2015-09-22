const
  _URL__GRUNT_CONFIG_FILE = './config/grunt.json',
  _URL__NPM_MANIFEST_FILE = './package.json';

var
  gruntRegisterTasks = require('grunt-register-tasks'),
  loadGruntTasks = require('load-grunt-tasks'),
  timeGrunt = require('time-grunt');

module.exports = function ( $grunt ) {

    var

      _$grunt__file = $grunt.file,
      _$grunt__file__readJSON = _$grunt__file.readJSON,

      _plugins = [
          'grunt-bump',
          'grunt-contrib-*',
          'grunt-jsonlint',
          'grunt-modify-json'
        ],

      _config = {
          'bump': {
              'options': {
                  'commit': true,
                  'commitFiles': [
                      _URL__NPM_MANIFEST_FILE
                    ],
                  'commitMessage': 'bump(version): %VERSION%',
                  'createTag': false,
                  'files': _URL__NPM_MANIFEST_FILE,
                  'push': true,
                  'pushTo': 'origin',
                  'updateConfigs': [
                      null,
                      'pkg'
                    ]
                }
            },
          'cfg': _$grunt__file__readJSON( _URL__GRUNT_CONFIG_FILE ),
          'jshint': {
              'options': {
                  'jshintrc': true
                },
              'src': '<%= cfg.PATH__SRC %>/<%= cfg.GLOB__JS__RECURSIVE %>'
            },
          'jsonlint': {
              'config': [
                  '<%= cfg.PATH__CONFIG %>/<%= cfg.GLOB__JSON__RECURSIVE %>'/* ,
                  '<%= cfg.PATH__ROOT %>/<%= cfg.GLOB__JSHINTRC %>' */
                ],
              'manifest': _URL__NPM_MANIFEST_FILE
            },
          'modify_json': {
              'manifest': {
                  'files': {
                      '<%= cfg.PATH__ROOT %>': _URL__NPM_MANIFEST_FILE
                    },
                  'options': {
                      'add': true,
                      'fields': {
                          'private': false
                        }
                    }
                }
            },
          'pkg': _$grunt__file__readJSON( _URL__NPM_MANIFEST_FILE )
        },

      _tasks = {
          'build': [],
          'default': [
              'jsonlint',
              'jshint'
            ]
        };

    timeGrunt( $grunt ),

    $grunt.initConfig( _config ),

    loadGruntTasks(
      $grunt,
      {
        pattern: _plugins,
        scope: 'devDependencies'
      }
    ),

    gruntRegisterTasks(
      $grunt,
      _tasks
    );

  };