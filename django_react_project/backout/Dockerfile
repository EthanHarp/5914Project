FROM python:3.11
#ENV PYTHONUNBUFFERED 1
WORKDIR /app
RUN pip install django djangorestframework django-cors-headers requests
COPY . /app
#COPY ./manage.py ./

EXPOSE 8000
#ENTRYPOINT ["python3"] 
#CMD ["manage.py", "runserver", "0.0.0.0:8000"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]