pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        // var logo = document.createElement('img');
        // logo.src = 'https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png';
        // splash.appendChild(logo);
        // logo.onload = function () {
        //     splash.style.display = 'block';
        // };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
        
        var logo1 = document.createElement('img');
        logo1.src = "data:image/png;base64,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";//'https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png';//Loading txt image url
        splash.appendChild(logo1);
        logo1.onload = function () {
            splash.style.display = 'block';
        };

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #283538;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #E33939;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 28px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',
            '',
            '#application-splash img {',
            '    position: absolute;',
            '    margin: 20px auto 0 auto;',
            '    width: 50%;',
            '    left: 25%;',
            '}',
            '',
            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 20px;',
            '    width: 100%;',
            '    border: black;',
            '    border-color: white;',
            '    border-style: solid;',
           // '    border: 2px  solid;',
            '    border-width: 5px;',
            '    box-shadow: 5px 5px;',
            '    border-radius: 10px;',
            '    background-color: #F7B4B4;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #E33939;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});