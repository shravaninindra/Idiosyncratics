FROM python:3.6-slim
LABEL MAINTAINER="Vishal Prabhachandar <vipr9705@colorado.edu>"

RUN  pip3 install pika

WORKDIR /srv
COPY    logs.py /srv
CMD [ "python3", "logs.py"]
