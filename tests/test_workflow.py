import os
import re

from .conftest import root_dir


class TestWorkflow:

    def test_workflow(self):
        family_budget_workflow_basename = 'main'
        workflow_dir = os.path.join(
            root_dir, os.path.join('.github', 'workflows')
        )
        yaml = f'{family_budget_workflow_basename}.yaml'
        is_yaml = yaml in os.listdir(workflow_dir)

        yml = f'{family_budget_workflow_basename}.yml'
        is_yml = yml in os.listdir(workflow_dir)

        if not is_yaml and not is_yml:
            assert False, (
                f'В каталоге {workflow_dir} не найден файл '
                f'с описанием workflow {yaml} или {yml}.'
            )

        filename = yaml if is_yaml else yml

        try:
            with open(f'{os.path.join(workflow_dir, filename)}', 'r') as f:
                family_budget = f.read()
        except FileNotFoundError:
            assert False, (
                f'Проверьте, что добавили файл {filename} '
                f'в каталог {workflow_dir} для проверки'
            )

        assert (
            re.search(
                r'on:\s*pull_request:\s*branches:\s*-\smain', family_budget
            )
        ), f'Проверьте, что добавили действие при пуше в файл {filename}'
        assert 'pytest' in family_budget, (
            f'Проверьте, что добавили pytest в файл {filename}'
        )
        assert 'appleboy/ssh-action' in family_budget, (
            f'Проверьте, что добавили деплой в файл {filename}'
        )
        assert 'appleboy/telegram-action' in family_budget, (
            'Проверьте, что настроили отправку telegram сообщения '
            f'в файл {filename}'
        )
