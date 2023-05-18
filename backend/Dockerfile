FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN sed -i'.bak' 's/$/ contrib/' /etc/apt/sources.list && \
    apt-get update && \
    pip3 install -r requirements.txt --no-cache-dir && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

CMD ["gunicorn", "family_budget.wsgi:application", "--bind", "0:8000" ]
