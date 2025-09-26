<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LotteryTicketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::prefix('lottery')->group(function () {
    // Store lottery tickets
    Route::post('/tickets', [LotteryTicketController::class, 'store']);
    
    // Get player's tickets
    Route::get('/tickets/player/{player_id}', [LotteryTicketController::class, 'getPlayerTickets']);
    
    // Update payment status
    Route::patch('/tickets/payment-status', [LotteryTicketController::class, 'updatePaymentStatus']);
    
    // Get today's statistics
    Route::get('/stats/today', [LotteryTicketController::class, 'getTodayStats']);
    
    // Get statistics for date range
    Route::get('/stats/date-range', [LotteryTicketController::class, 'getStatsByDateRange']);
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('lottery')->group(function () {
        // Store lottery tickets (authenticated)
        Route::post('/tickets/auth', [LotteryTicketController::class, 'store']);
        
        // Get my tickets (authenticated)
        Route::get('/tickets/my-tickets', [LotteryTicketController::class, 'getPlayerTickets']);
        
        // Update payment status (authenticated)
        Route::patch('/tickets/payment-status/auth', [LotteryTicketController::class, 'updatePaymentStatus']);
        
        // Delete tickets (admin only)
        Route::delete('/tickets', [LotteryTicketController::class, 'destroy']);
    });
});

// Example routes for other endpoints (you can add more as needed)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'API is running',
        'timestamp' => now()->toISOString()
    ]);
});

// API documentation endpoint
Route::get('/docs', function () {
    return response()->json([
        'api_name' => '3D Lucky Draw Lottery API',
        'version' => '1.0.0',
        'endpoints' => [
            'POST /api/lottery/tickets' => 'Store lottery tickets',
            'GET /api/lottery/tickets/player/{id}' => 'Get player tickets',
            'PATCH /api/lottery/tickets/payment-status' => 'Update payment status',
            'GET /api/lottery/stats/today' => 'Get today\'s statistics',
            'GET /api/lottery/stats/date-range' => 'Get statistics for date range',
            'DELETE /api/lottery/tickets' => 'Delete tickets (admin only)'
        ],
        'authentication' => 'Bearer token (for protected routes)',
        'timezone' => 'Asia/Yangon (Myanmar)',
        'currency' => 'Myanmar Kyat (ကျပ်)'
    ]);
});
