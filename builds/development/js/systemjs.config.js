/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'js/lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'js/app',

            // angular bundles
            '@angular/animations': 'npm:@angular/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations-browser.umd.js',
            '@angular/core': 'npm:@angular/core.umd.js',
            '@angular/common': 'npm:@angular/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http.umd.js',
            '@angular/router': 'npm:@angular/router.umd.js',
            '@angular/router/upgrade': 'npm:@angular/router-upgrade.umd.js',
            '@angular/forms': 'npm:@angular/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade.umd.js',
            '@angular/upgrade/static': 'npm:@angular/upgrade-static.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js',
                meta: {
                    './app/*.js': {
                        loader: './js/systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);