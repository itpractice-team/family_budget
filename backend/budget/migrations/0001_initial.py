# Generated by Django 4.1.3 on 2023-06-11 19:17

import budget.models
import colorfield.fields
import core.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.functions.text
import django.utils.timezone
import re


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Budget",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        default="budget",
                        help_text="Required. Enter name budget, please.",
                        max_length=200,
                        verbose_name="name",
                    ),
                ),
                (
                    "pub_date",
                    models.DateTimeField(
                        db_index=True,
                        default=django.utils.timezone.now,
                        verbose_name="public date",
                    ),
                ),
                (
                    "description",
                    models.TextField(blank=True, verbose_name="description"),
                ),
            ],
            options={
                "verbose_name": "Budget",
                "verbose_name_plural": "Budgets",
            },
        ),
        migrations.CreateModel(
            name="BudgetCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=25,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^([^\\W\\d]| )+$"),
                                "Enter a valid string value consisting of only letters or blank space.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="name",
                    ),
                ),
                (
                    "priority",
                    models.IntegerField(default=1000, verbose_name="priority"),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, max_length=100, verbose_name="description"
                    ),
                ),
                (
                    "category_type",
                    models.IntegerField(
                        choices=[(0, "Income"), (1, "Expenses")],
                        verbose_name="type",
                    ),
                ),
                (
                    "color",
                    colorfield.fields.ColorField(
                        blank=True,
                        default="",
                        help_text="Not required. Enter HEX-code color, please.",
                        image_field=None,
                        max_length=7,
                        samples=None,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile(
                                    "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                                ),
                                "The valid hexadecimal color code must satisfy the following conditions:1. It should start from ‘#’ symbol.2. It should be followed by the letters from a-f, A-F and/or digits from 0-9.3. The length of the hexadecimal color code should be either 6 or 3, excluding ‘#’ symbol.",
                                "invalid",
                            )
                        ],
                        verbose_name="color HEX-code",
                    ),
                ),
            ],
            options={
                "verbose_name": "Budget category",
                "verbose_name_plural": "Budget categories",
                "ordering": ["priority", "name"],
                "abstract": False,
                "default_related_name": "%(app_label)s_%(class)s",
            },
        ),
        migrations.CreateModel(
            name="BudgetFinance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "balance",
                    models.DecimalField(
                        decimal_places=0,
                        default=0,
                        max_digits=15,
                        validators=[
                            django.core.validators.MinValueValidator(
                                0, message="Minimum value for balance is 0"
                            )
                        ],
                        verbose_name="balance",
                    ),
                ),
            ],
            options={
                "verbose_name": "Budget finance",
                "verbose_name_plural": "Budget finances",
            },
        ),
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=25,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^([^\\W\\d]| )+$"),
                                "Enter a valid string value consisting of only letters or blank space.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="name",
                    ),
                ),
                (
                    "priority",
                    models.IntegerField(default=1000, verbose_name="priority"),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, max_length=100, verbose_name="description"
                    ),
                ),
            ],
            options={
                "verbose_name": "Category",
                "verbose_name_plural": "Categories",
                "ordering": ["priority", "name"],
                "abstract": False,
                "default_related_name": "%(app_label)s_%(class)s",
            },
        ),
        migrations.CreateModel(
            name="Finance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=25,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^([^\\W\\d]| )+$"),
                                "Enter a valid string value consisting of only letters or blank space.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="name",
                    ),
                ),
                (
                    "priority",
                    models.IntegerField(default=1000, verbose_name="priority"),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, max_length=100, verbose_name="description"
                    ),
                ),
                (
                    "slug",
                    models.SlugField(
                        error_messages={
                            "unique": "A with that slug already exists."
                        },
                        help_text="Required. Enter slug, please.",
                        unique=True,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^[-a-zA-Z0-9_]+\\Z"),
                                "Enter a valid “slug” consisting of letters, numbers, underscores or hyphens.",
                                "invalid",
                            )
                        ],
                        verbose_name="slug",
                    ),
                ),
                (
                    "image",
                    core.fields.ImageAndSvgField(
                        upload_to=budget.models.image_directory_path,
                        verbose_name="image",
                    ),
                ),
            ],
            options={
                "verbose_name": "Finance",
                "verbose_name_plural": "Finances",
                "ordering": ["priority", "name"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Icon",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    core.fields.ImageAndSvgField(
                        upload_to=budget.models.image_directory_path,
                        verbose_name="image",
                    ),
                ),
                (
                    "tag",
                    models.CharField(
                        max_length=25,
                        unique=True,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^([^\\W\\d]| )+$"),
                                "Enter a valid string value consisting of only letters or blank space.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="tag",
                    ),
                ),
            ],
            options={
                "verbose_name": "Icon",
                "verbose_name_plural": "Icons",
            },
        ),
        migrations.CreateModel(
            name="ReapeatSpend",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    models.DateTimeField(
                        db_index=True,
                        default=django.utils.timezone.now,
                        verbose_name="created",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, max_length=100, verbose_name="description"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=50,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^([^\\W\\d]| )+$"),
                                "Enter a valid string value consisting of only letters or blank space.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="name",
                    ),
                ),
                (
                    "repeat_type",
                    models.IntegerField(
                        choices=[
                            (0, "Day"),
                            (1, "Week"),
                            (2, "Month"),
                            (3, "Year"),
                        ],
                        verbose_name="type",
                    ),
                ),
                (
                    "repeat_count",
                    models.PositiveIntegerField(
                        default=1,
                        validators=[
                            django.core.validators.MinValueValidator(
                                1, message="Minimum value repeat count is 1"
                            )
                        ],
                        verbose_name="count",
                    ),
                ),
                (
                    "repeat_period",
                    models.IntegerField(
                        choices=[(0, "Endlessly"), (1, "Count"), (2, "Date")],
                        verbose_name="period",
                    ),
                ),
                (
                    "to_date",
                    models.DateTimeField(null=True, verbose_name="to_date"),
                ),
                (
                    "amount",
                    models.DecimalField(
                        decimal_places=0,
                        default=0,
                        max_digits=15,
                        validators=[
                            django.core.validators.MinValueValidator(
                                0, message="Minimum value for amount is 0"
                            )
                        ],
                        verbose_name="amount",
                    ),
                ),
                (
                    "budget",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="budget.budget",
                        verbose_name="budget",
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="budget.budgetcategory",
                        verbose_name="category",
                    ),
                ),
            ],
            options={
                "verbose_name": "Reapeat spend",
                "verbose_name_plural": "Reapeat spends",
                "ordering": ["-created"],
                "abstract": False,
                "default_related_name": "%(app_label)s_%(class)s",
            },
        ),
        migrations.CreateModel(
            name="MoneyBox",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    models.DateTimeField(
                        db_index=True,
                        default=django.utils.timezone.now,
                        verbose_name="created",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, max_length=100, verbose_name="description"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=50,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^([^\\W\\d]| )+$"),
                                "Enter a valid string value consisting of only letters or blank space.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="name",
                    ),
                ),
                (
                    "amount",
                    models.DecimalField(
                        decimal_places=0,
                        default=0,
                        max_digits=15,
                        validators=[
                            django.core.validators.MinValueValidator(
                                0, message="Minimum value for amount is 0"
                            )
                        ],
                        verbose_name="amount",
                    ),
                ),
                (
                    "accumulated",
                    models.DecimalField(
                        decimal_places=0,
                        default=0,
                        max_digits=15,
                        validators=[
                            django.core.validators.MinValueValidator(
                                0, message="Minimum value for accumulated is 0"
                            )
                        ],
                        verbose_name="accumulated",
                    ),
                ),
                (
                    "budget",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="budget.budget",
                        verbose_name="budget",
                    ),
                ),
            ],
            options={
                "verbose_name": "Moneybox",
                "verbose_name_plural": "Moneyboxes",
                "ordering": ["-created"],
                "abstract": False,
                "default_related_name": "%(app_label)s_%(class)s",
            },
        ),
        migrations.CreateModel(
            name="FinanceTransaction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=15,
                        validators=[
                            django.core.validators.RegexValidator(
                                re.compile("^[^\\W\\d_]+$"),
                                "Enter a valid string value consisting of only letters.",
                                "invalid",
                            ),
                            django.core.validators.MinLengthValidator(2),
                        ],
                        verbose_name="name",
                    ),
                ),
                (
                    "created",
                    models.DateTimeField(
                        db_index=True,
                        default=django.utils.timezone.now,
                        verbose_name="created",
                    ),
                ),
                (
                    "amount",
                    models.DecimalField(
                        decimal_places=0,
                        default=0,
                        max_digits=15,
                        verbose_name="amount",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, max_length=100, verbose_name="description"
                    ),
                ),
                (
                    "budget",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="budget.budget",
                        verbose_name="budget",
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="budget.budgetcategory",
                        verbose_name="category",
                    ),
                ),
                (
                    "finance",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="budget.budgetfinance",
                        verbose_name="finance",
                    ),
                ),
            ],
            options={
                "verbose_name": "Transaction",
                "verbose_name_plural": "Transactions",
                "ordering": ["-created"],
                "abstract": False,
                "default_related_name": "%(app_label)s_%(class)s",
            },
        ),
        migrations.AddConstraint(
            model_name="finance",
            constraint=models.UniqueConstraint(
                django.db.models.functions.text.Lower("name"),
                name="budget_finance_name_unique",
                violation_error_message="Name must be unique!",
            ),
        ),
        migrations.AddField(
            model_name="category",
            name="image",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="budget.icon",
                verbose_name="icon",
            ),
        ),
        migrations.AddField(
            model_name="budgetfinance",
            name="budget",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="finances",
                to="budget.budget",
                verbose_name="budget",
            ),
        ),
        migrations.AddField(
            model_name="budgetfinance",
            name="finance",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="finances",
                to="budget.finance",
                verbose_name="finance",
            ),
        ),
        migrations.AddField(
            model_name="budgetcategory",
            name="budget",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="categories",
                to="budget.budget",
                verbose_name="budget",
            ),
        ),
        migrations.AddField(
            model_name="budgetcategory",
            name="image",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="budget.icon",
                verbose_name="icon",
            ),
        ),
    ]