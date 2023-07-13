import django_filters


class TransactionDateFromToRangeFilter(django_filters.FilterSet):
    created = django_filters.DateFromToRangeFilter()
