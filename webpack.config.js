{
    "mode": "development",
    "entry": "src/main.js",
    "output": {
        "path": __dirname+'/public',
        "filename": "[name].[chunkhash:8].js"
    },
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": "eslint-loader"
            },
            {
                "test": /\.vue$/,
                "exclude": /node_modules/,
                "use": "vue-loader"
            },
            {
                "test": /\.scss$/,
                "use": [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}