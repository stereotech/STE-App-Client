var replace = require('replace'),
    path = require("path");

function getText(file) {
    var content = fs.readFileSync(file, "utf-8");
    return content;
}

function join(file) {
    return path.join(__dirname, file);
}

replace({
    regex: '/nuxtfiles/',
    replacement: 'nuxtfiles/',
    paths: [join('dist')],
    recursive: true
});

replace({
    regex: '/assets/',
    replacement: 'assets/',
    paths: [join('dist')],
    recursive: true
});

replace({
    regex: '(href|src|\"href\"|\"src\")=\"/',
    replacement: '$1=\"',
    paths: [join('dist')],
    recursive: true
});

replace({
    regex: '(href|src|\"href\"|\"src\"):\"/',
    replacement: '$1:\"',
    paths: [join('dist')],
    recursive: true
});
