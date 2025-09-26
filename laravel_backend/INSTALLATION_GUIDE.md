# 3D Lucky Draw Laravel Backend - Installation Guide

## Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL 5.7 or higher
- Node.js (optional, for frontend assets)

## Step-by-Step Installation

### 1. Clone/Copy Files

Copy all the Laravel backend files to your server or local development environment.

### 2. Install Dependencies

```bash
cd laravel_backend
composer install
```

### 3. Environment Setup

```bash
# Copy environment file
cp env_example.txt .env

# Generate application key
php artisan key:generate
```

### 4. Database Configuration

Edit your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lottery_3d
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Create Database

```sql
CREATE DATABASE lottery_3d CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Run Migrations

```bash
php artisan migrate
```

### 7. Start the Server

```bash
# Development server
php artisan serve

# Production (with proper web server configuration)
# Configure Apache/Nginx to point to public/ directory
```

## API Testing

### Test API Health

```bash
curl http://localhost:8000/api/health
```

### Test Store Lottery Tickets

```bash
curl -X POST http://localhost:8000/api/lottery/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "player_id": 7,
    "player_user_name": "PLAYER0102",
    "selected_digits": ["022", "024", "026", "037"],
    "amount_per_ticket": 1000,
    "selected_datetime": "2024-09-25T10:30:00"
  }'
```

### Test Get Player Tickets

```bash
curl http://localhost:8000/api/lottery/tickets/player/7
```

### Test Update Payment Status

```bash
curl -X PATCH http://localhost:8000/api/lottery/tickets/payment-status \
  -H "Content-Type: application/json" \
  -d '{
    "ticket_ids": [1, 2, 3, 4],
    "payment_status": "completed",
    "payment_method": "kpay",
    "payment_reference": "KPay_1735123456789"
  }'
```

## File Structure

```
laravel_backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       └── LotteryTicketController.php
│   │   └── Requests/
│   │       ├── StoreLotteryTicketRequest.php
│   │       └── UpdateLotteryTicketRequest.php
│   └── Models/
│       └── LotteryTicket.php
├── bootstrap/
│   └── app.php
├── config/
│   └── database.php
├── database/
│   └── migrations/
│       └── 2024_09_25_000001_create_lottery_tickets_table.php
├── routes/
│   ├── api.php
│   ├── web.php
│   └── console.php
├── resources/
│   └── views/
│       └── welcome.blade.php
├── artisan
├── composer.json
├── env_example.txt
└── README.md
```

## Configuration Options

### Environment Variables

```env
# Lottery API Configuration
LOTTERY_API_VERSION=1.0
LOTTERY_DEFAULT_TIMEZONE=Asia/Yangon
LOTTERY_DEFAULT_CURRENCY=MMK
LOTTERY_MIN_TICKET_AMOUNT=100
LOTTERY_MAX_TICKET_AMOUNT=10000
LOTTERY_MAX_TICKETS_PER_REQUEST=10

# Payment Configuration
PAYMENT_DEFAULT_METHOD=kpay
PAYMENT_TIMEOUT_MINUTES=30
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database credentials in `.env`
   - Ensure MySQL is running
   - Verify database exists

2. **Migration Error**
   - Check database permissions
   - Ensure foreign key constraint is correct
   - Run `php artisan migrate:status` to check migration status

3. **Permission Issues**
   - Set proper file permissions: `chmod -R 755 storage bootstrap/cache`
   - Ensure web server has write access to storage and cache directories

### Debug Mode

For development, ensure `APP_DEBUG=true` in your `.env` file.

### Logs

Check `storage/logs/laravel.log` for detailed error logs.

## Security Considerations

1. **Production Environment**
   - Set `APP_DEBUG=false`
   - Use strong database passwords
   - Configure proper CORS settings
   - Enable HTTPS

2. **Authentication**
   - Implement Laravel Sanctum for API authentication
   - Use rate limiting for API endpoints
   - Validate all input data

## Support

If you encounter any issues during installation, please check:
1. Laravel documentation: https://laravel.com/docs
2. PHP version compatibility
3. Database configuration
4. File permissions

For additional support, contact the development team.
