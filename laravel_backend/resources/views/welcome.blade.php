<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Lucky Draw Lottery API</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 90%;
            text-align: center;
        }
        .logo {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5rem;
        }
        .subtitle {
            color: #666;
            font-size: 1.2rem;
            margin-bottom: 30px;
        }
        .api-info {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }
        .api-info h3 {
            color: #495057;
            margin-bottom: 15px;
        }
        .endpoint {
            background: #e9ecef;
            padding: 8px 12px;
            border-radius: 5px;
            margin: 5px 0;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }
        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 25px;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
            font-weight: bold;
            transition: transform 0.3s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .footer {
            margin-top: 30px;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🎰</div>
        <h1>3D Lucky Draw</h1>
        <p class="subtitle">Lottery API Backend</p>
        
        <div class="api-info">
            <h3>🚀 API Endpoints</h3>
            <div class="endpoint">POST /api/lottery/tickets</div>
            <div class="endpoint">GET /api/lottery/tickets/player/{id}</div>
            <div class="endpoint">PATCH /api/lottery/tickets/payment-status</div>
            <div class="endpoint">GET /api/lottery/stats/today</div>
            <div class="endpoint">GET /api/lottery/stats/date-range</div>
        </div>

        <div class="api-info">
            <h3>📋 Quick Info</h3>
            <p><strong>Timezone:</strong> Asia/Yangon (Myanmar)</p>
            <p><strong>Currency:</strong> Myanmar Kyat (ကျပ်)</p>
            <p><strong>Authentication:</strong> Bearer Token</p>
            <p><strong>Version:</strong> 1.0.0</p>
        </div>

        <a href="/api-docs" class="btn">📖 API Documentation</a>
        <a href="/api/health" class="btn">❤️ Health Check</a>

        <div class="footer">
            <p>Built with Laravel 10 | 3D Lucky Draw Lottery System</p>
        </div>
    </div>
</body>
</html>
