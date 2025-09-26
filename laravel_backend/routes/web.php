<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// API Documentation Route
Route::get('/api-docs', function () {
    return response()->json([
        'title' => '3D Lucky Draw Lottery API',
        'version' => '1.0.0',
        'description' => 'API documentation for 3D Lucky Draw lottery ticket management',
        'base_url' => url('/api'),
        'endpoints' => [
            'lottery' => [
                'POST /api/lottery/tickets' => 'Store lottery tickets',
                'GET /api/lottery/tickets/player/{id}' => 'Get player tickets',
                'PATCH /api/lottery/tickets/payment-status' => 'Update payment status',
                'GET /api/lottery/stats/today' => 'Get today\'s statistics',
                'GET /api/lottery/stats/date-range' => 'Get statistics for date range',
                'DELETE /api/lottery/tickets' => 'Delete tickets (admin only)'
            ]
        ],
        'authentication' => 'Bearer token (for protected routes)',
        'timezone' => 'Asia/Yangon (Myanmar)',
        'currency' => 'Myanmar Kyat (ကျပ်)',
        'contact' => 'Development Team'
    ]);
});
