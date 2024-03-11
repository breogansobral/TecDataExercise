module.exports = function(config) {
  // Utiliza una variable de entorno para determinar si se ejecuta en Docker
  const isDocker = process.env.DOCKER_ENV === '1';

  // Configura los navegadores a utilizar. Utiliza ChromeHeadless en Docker; de lo contrario, Chrome.
  const browsers = isDocker ? ['ChromeCustom'] : ['Chrome'];

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/your-project-name'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: !isDocker,
    // En Docker, ejecutar una sola vez. Fuera de Docker, habilita autoWatch.
    singleRun: isDocker,
    restartOnFileChange: true,
    browsers: browsers,
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        // Se agregan flags recomendados para la ejecución en contenedores Docker y entornos CI.
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          // '--remote-debugging-port=9222' es útil para depuración, pero se puede omitir en CI.
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      }
    }
  });
};
