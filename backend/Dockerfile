FROM php:8.0-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    libzip-dev

RUN docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html/

COPY . /var/www/html/

RUN mkdir -p /var/www/html/public/arts && \
    chmod -R 777 /var/www/html/public/arts && \
    chown -R www-data:www-data /var/www/html/public/arts

RUN composer install

EXPOSE 80