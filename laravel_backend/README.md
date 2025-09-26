# 3D Lucky Draw Lottery API

A Laravel-based API for managing lottery ticket purchases and payments for the 3D Lucky Draw application.

## Features

- **Lottery Ticket Management**: Create, read, update, and delete lottery tickets
- **Payment Processing**: Track payment status (pending, completed, failed)
- **Player Management**: Handle player-specific ticket history
- **Statistics**: Get daily and date-range statistics
- **Myanmar Timezone Support**: All timestamps in Myanmar time (Asia/Yangon)
- **Currency Support**: Myanmar Kyat (ကျပ်) currency formatting

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel_backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp env_example.txt .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE lottery_3d;

   # Run migrations
   php artisan migrate
   ```

5. **Start the server**
   ```bash
   php artisan serve
   ```

## API Endpoints

### Public Endpoints

#### Store Lottery Tickets
```
POST /api/lottery/tickets
Content-Type: application/json

{
    "player_id": 7,
    "player_user_name": "PLAYER0102",
    "selected_digits": ["022", "024", "026", "037"],
    "amount_per_ticket": 1000,
    "selected_datetime": "2024-09-25T10:30:00"
}
```

#### Get Player Tickets
```
GET /api/lottery/tickets/player/{player_id}?date=2024-09-25&status=completed&limit=20&page=1
```

#### Update Payment Status
```
PATCH /api/lottery/tickets/payment-status
Content-Type: application/json

{
    "ticket_ids": [1, 2, 3, 4],
    "payment_status": "completed",
    "payment_method": "kpay",
    "payment_reference": "KPay_1735123456789"
}
```

#### Get Today's Statistics
```
GET /api/lottery/stats/today
```

#### Get Date Range Statistics
```
GET /api/lottery/stats/date-range?start_date=2024-09-01&end_date=2024-09-30
```

### Protected Endpoints (Authentication Required)

All public endpoints are also available with authentication:
- `POST /api/lottery/tickets/auth`
- `GET /api/lottery/tickets/my-tickets`
- `PATCH /api/lottery/tickets/payment-status/auth`

### Admin Endpoints

#### Delete Tickets
```
DELETE /api/lottery/tickets
Content-Type: application/json

{
    "ticket_ids": [1, 2, 3, 4]
}
```

## Database Schema

### lottery_tickets Table

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| player_id | bigint | Player identifier |
| player_user_name | varchar(100) | Player username |
| selected_digit | varchar(10) | Lottery number (e.g., "022") |
| amount | decimal(10,2) | Ticket amount |
| selected_datetime | timestamp | When ticket was selected |
| payment_status | varchar(20) | pending/completed/failed |
| payment_method | varchar(50) | Payment method (kpay, etc.) |
| payment_reference | text | Transaction reference |
| payment_completed_at | timestamp | When payment was completed |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

## Response Format

All API responses follow this format:

```json
{
    "status": "Request was successful.",
    "message": "Operation completed successfully.",
    "data": {
        // Response data here
    }
}
```

## Error Handling

Errors are returned with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Validation Rules

### Store Lottery Tickets
- `player_id`: Required, integer, minimum 1
- `player_user_name`: Required, string, maximum 100 characters
- `selected_digits`: Required array, 1-10 items, each must be 3 digits
- `amount_per_ticket`: Required, numeric, 100-10000
- `selected_datetime`: Required, date, cannot be in the past

### Update Payment Status
- `ticket_ids`: Required array, minimum 1 item, must exist
- `payment_status`: Required, must be pending/completed/failed
- `payment_method`: Optional, string, maximum 50 characters
- `payment_reference`: Optional, string, maximum 255 characters

## Configuration

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

## Testing

Run the test suite:

```bash
php artisan test
```

## Logging

All API operations are logged in Laravel's log files. Check `storage/logs/laravel.log` for detailed logs.

## Security

- Input validation on all endpoints
- SQL injection protection through Eloquent ORM
- CSRF protection for web routes
- Rate limiting (can be configured)
- Authentication support via Laravel Sanctum

## Support

For issues and questions, please contact the development team.

## License

This project is proprietary software. All rights reserved.
