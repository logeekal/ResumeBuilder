FROM mongo

RUN echo "I am runing" && \
    mkdir ./root

COPY ./mongoEntry.js ./root/

WORKDIR ./root

RUN ./root