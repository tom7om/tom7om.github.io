/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        options: {
          preserveComments: false
        },
        files: {
          "js/site.min.js": ["js/site.js"]
        }
      }
    },

    sass: {
      global: {
        options: {
          style: "compressed",
          compass: true,
          require: ["susy"]
        },
        files: {
          "css/style-unprefixed.css": "_sass/style.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "css/style-unprefixed.css",
        dest: "css/style.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl="
      },
      jekyllBuild: {
        command: "jekyll build --config _config.yml"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["index.html", "about.html", "_layouts/*.html", "_posts/*.md", "_work/*.md", "_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["_sass/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "icon-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch"]);

};