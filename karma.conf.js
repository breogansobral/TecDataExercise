module.exports = function(config) {
  // Uses an environment variable to determine whether to run in Docker
  const isDocker = process.env.DOCKER_ENV === '1';

  // Configure the browsers to use. Use ChromeHeadless on Docker, otherwise Chrome.
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
    // In Docker, run only once. Outside Docker, enable autoWatch.
    singleRun: isDocker,
    restartOnFileChange: true,
    browsers: browsers,
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        // Recommended flags are added for running in Docker containers and CI environments.
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          // '--remote-debugging-port=9222' is useful for debugging, but can be omitted in CI.
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      }
    }
  });
};
