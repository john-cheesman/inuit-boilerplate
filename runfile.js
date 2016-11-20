import { run, generate } from 'runjs';
import watch from 'watch';

const task = {
    'build:styles': () => {
        run(`rimraf web/css && mkdirp web/css`);

        if (process.env.NODE_ENV === `production`) {
            run(`node-sass src/sass/main.scss | postcss -u autoprefixer > web/css/style.css`);
        }
        else {
            run(`node-sass src/sass/main.scss | postcss -u autoprefixer | cleancss > web/css/style.css`);
        }
    },
    'build': () => {
        task[`build:styles`]();
    },
    'serve': () => {
        run(`http-server web -o -p ${process.env.PORT || 8080}`, { async: true });
    },
    'watch:styles': () => {
        watch.watchTree(`src/sass`, () => {
            task[`build:styles`]();
        });
    },
    'watch': () => {
        task[`watch:styles`]();
    },
    'generate:component': (name) => {
        generate(`component.tmp.js`, `src/sass/components/_components.${name}.scss`, { name: name, nameUpper: name.toUpperCase() });
    },
    'start': () => {
        task[`build`]();
        task[`watch`]();
        task[`serve`]();
    }
};

export default task
