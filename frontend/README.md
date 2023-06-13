Настройка Prettier:

1. Vscode -> Extensions
2. Установите пакет Prettier - Code formatter (может потребоваться перезагрузка редактора после установки)
3. Для автоматического форматирования:

- зайти в настройки (Ctrl/Cmd +Shift + P)
- в строку поиска вписать — settings
- выбрать — "Preferences: Open Settings (JSON)" \*
- В обьект с настройками в файле settings.json добавляем:

  "editor.defaultFormatter": "esbenp.prettier-vscode"
  "editor.formatOnSave": true

\* У меня "Preferences: Open User Settings (JSON)" - для всех проектов в ide, ЛИБО "Preferences: Open Workspace Settings (JSON)" - для текущего проекта, создаст папку .vscode в корне и файл settings.json. Папку нужно будет добавить в gitignore.
