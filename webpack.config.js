const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Добавляем плагин

module.exports = {
    mode: 'development', // Устанавливаем режим разработки
    entry: './src/scripts/main.js', // Точка входа вашего приложения
    output: {
        filename: 'bundle.js', // Имя выходного файла
        path: path.resolve(__dirname, '.'), // Используем корневую директорию
        clean: true, // Очищает выходную папку перед каждой сборкой
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html', // Путь к вашему шаблону
            filename: 'index.html', // Имя выходного файла
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // Обрабатываем файлы .js
                exclude: /node_modules/, // Исключаем папку node_modules
                use: {
                    loader: 'babel-loader', // Используем Babel для транспиляции
                    options: {
                        presets: ['@babel/preset-env'], // Пресет для ES6+
                    },
                },
            },
            {
                test: /\.css$/, // Обрабатываем файлы .css
                use: ['style-loader', 'css-loader'], // Используем loaders для CSS
            },
            {
                test: /\.vue$/, // Обрабатываем файлы .vue
                loader: 'vue-loader', // Используем Vue loader
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'], // Разрешенные расширения
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '.'), // Используем корневую директорию
        },
        compress: true, // Включаем сжатие
        port: 8080, // Порт для сервера разработки
        hot: true, // Включаем горячую перезагрузку
        open: true, // Открывает браузер автоматически
        historyApiFallback: true, // Возвращает к index.html при запросе на корень
    },
    devtool: 'inline-source-map', // Включаем карты источников для удобства отладки
};
