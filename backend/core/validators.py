from django.core.validators import RegexValidator, _lazy_re_compile
from django.utils.translation import gettext_lazy as _

letter_only_re = _lazy_re_compile(r"^[^\W\d_]+$")
validate_only_letters = RegexValidator(
    letter_only_re,
    _("Enter a valid string value consisting of only letters."),
    "invalid",
)

letter_or_blank_space_re = _lazy_re_compile(r"^([^\W\d]| )+$")
validate_letter_or_blank_space = RegexValidator(
    letter_or_blank_space_re,
    _("Enter a valid string value consisting of only letters or blank space."),
    "invalid",
)

color_hex_code_re = _lazy_re_compile(r"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
validate_color_hex_code = RegexValidator(
    color_hex_code_re,
    _(
        "The valid hexadecimal color code "
        "must satisfy the following conditions:"
        "1. It should start from ‘#’ symbol."
        "2. It should be followed by the letters from a-f, A-F "
        "and/or digits from 0-9."
        "3. The length of the hexadecimal color code should be either 6 or 3, "
        "excluding ‘#’ symbol."
    ),
    "invalid",
)

tag_re = _lazy_re_compile(r"^#?[\w]+$")
validate_tag = RegexValidator(
    tag_re,
    _(
        "Enter a valid `tag` value consisting of only letters, digit. "
        "The first symbol can be `#`."
    ),
    "invalid",
)

simple_name_re = _lazy_re_compile(r"^[^\W\d_][\w \-()]+$")
validate_simple_name = RegexValidator(
    simple_name_re,
    _(
        "Enter a valid `name` value consisting of only letters, digit. "
        "and symbols _ ( )"
        "The first symbol only letter."
    ),
    "invalid",
)
