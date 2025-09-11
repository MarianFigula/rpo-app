FROM php:8.0-apache

RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql zip gd mbstring

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html/

COPY . /var/www/html/

RUN mkdir -p /var/www/html/public/logos && \
    chmod -R 777 /var/www/html/public/logos && \
    chown -R www-data:www-data /var/www/html/public/logos

RUN composer install

EXPOSE 80