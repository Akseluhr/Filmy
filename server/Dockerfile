FROM python:3.10.4

COPY ./* ./app/

WORKDIR /app/

RUN pip3 install -r requirements.txt

EXPOSE 8085

CMD ["python", "kNN_model.py"]