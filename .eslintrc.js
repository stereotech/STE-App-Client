module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        '@nuxtjs/eslint-config-typescript'
    ],
    plugins: [
        'vuetify'
    ],
    rules: {
        'vuetify/no-deprecated-classes': 'error',
        'vuetify/grid-unknown-attributes': 'error',
        'vuetify/no-legacy-grid': 'error',
    }
}