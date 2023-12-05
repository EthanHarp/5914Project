FROM python:3.11
#ENV PYTHONUNBUFFERED 1
WORKDIR /app

RUN pip install django djangorestframework django-cors-headers elasticsearch transformers bs4 
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
COPY . /app
#COPY ./data /app/data

EXPOSE 8000
#ENTRYPOINT ["python3"] 
#CMD ["manage.py", "runserver", "0.0.0.0:8000"]
#THISTCMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#CMD ["elasticsearch_loader", "--index", "incidents", "--type", "incident", "json", "*.json"]
