https://ulbitv.ru/pl/teach/control/lesson/view?id=261028488

Ази • Чт 08 Дек 16:48
У кого упали тесты после добавления alias, то нужно в jest.config.ts добавить расшифровку для таких алиасов, написал вручную, но если кто-то нашел вариант лаконичнее, то поделитесь!

moduleNameMapper: {
...

// Поддержка Aliases
'^@/shared(.*)$': '<rootDir>/src/shared$1',
'^@/entities(.*)$': '<rootDir>/src/entities$1',
'^@/features(.*)$': '<rootDir>/src/features$1',
'^@/widgets(.*)$': '<rootDir>/src/widgets$1',
'^@/pages(.*)$': '<rootDir>/src/pages$1',
'^@/app(.*)$': '<rootDir>/src/app$1',


Андрей Чипизубов
В storybook тоже проблемы, решаются добавление в webpack.config.ts:
config!.resolve!.alias = {
...config!.resolve!.alias,
'@/shared': path.resolve(__dirname, '..', '..', 'src', 'shared'),
'@/entities': path.resolve(__dirname, '..', '..', 'src', 'entities'),
'@/features': path.resolve(__dirname, '..', '..', 'src', 'features'),
'@/widgets': path.resolve(__dirname, '..', '..', 'src', 'widgets'),
'@/pages': path.resolve(__dirname, '..', '..', 'src', 'pages'),
'@/app': path.resolve(__dirname, '..', '..', 'src', 'app'),
};


Андрей
Для решения ошибки резолвинга путей для storybook, добавляем в webpack.config.ts следующее:
config!.resolve!.alias = { '@': path.resolve(__dirname, '..', '..', 'src') };



Андрей
Добавляем настройки в jest.config.ts

moduleNameMapper: {
.......
'^@/(.*)$': '<rootDir>/src/$1',
},
