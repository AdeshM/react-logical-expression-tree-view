export default {
    name: 'react-treebeard',
    id: 1,
    toggled: true,
    children: [
        {
            name: 'example 2',
            toggled: true,
            children: [
                { name: 'app.js' },
                { name: 'data.js' },
                { name: 'index.html' },
                { name: 'styles.js' },
                { name: 'webpack.config.js' }
            ],
            operator: 'OR',
        },
        /* {
            name: 'node_modules',
            loading: true,
            children: [],
            toggled: true,
            operator: 'OR',
        }, */
        {
            name: 'src',
            toggled: true,
            children: [
                {
                    name: 'components',
                    toggled: true,
                    children: [
                        { name: 'decorators.js' },
                        { name: 'treebeard.js' }
                    ],
                    operator: 'OR',
                },
                { name: 'index.js' }
            ],
            operator: 'AND',
        },
        {
            name: 'themes',
            toggled: true,
            children: [
                { name: 'animations.js' },
                { name: 'default.js' }
            ],
            operator: 'AND',
        },
        { name: 'gulpfile.js' },
        { name: 'index.js' },
        { name: 'package.json' }
    ],
    operator: 'OR',
};
