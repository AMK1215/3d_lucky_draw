import CONFIG from './config.js';
import authService from './authService.js';

class ApiService {
    constructor() {
        this.API_BASE_URL = CONFIG.API_BASE_URL;
    }

    // Make authenticated API request
    async makeRequest(endpoint, options = {}) {
        const url = `${this.API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...authService.getAuthHeaders(),
            ...options.headers,
        };

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('API request error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get user data
    async getUserData() {
        console.log('Making request to:', CONFIG.ENDPOINTS.USER);
        const result = await this.makeRequest(CONFIG.ENDPOINTS.USER);
        console.log('getUserData result:', result);
        return result;
    }

    // Get banks
    async getBanks() {
        return await this.makeRequest(CONFIG.ENDPOINTS.BANKS);
    }

    // Get contact info
    async getContact() {
        return await this.makeRequest(CONFIG.ENDPOINTS.CONTACT);
    }

    // Get promotions
    async getPromotions() {
        return await this.makeRequest(CONFIG.ENDPOINTS.PROMOTIONS);
    }

    // Get banners (no auth required)
    async getBanners() {
        try {
            const url = `${this.API_BASE_URL}${CONFIG.ENDPOINTS.BANNERS}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };

            const response = await fetch(url, {
                method: 'GET',
                headers,
            });

            const data = await response.json();

            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('getBanners: API request error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get banner texts (no auth required)
    async getBannerTexts() {
        try {
            const url = `${this.API_BASE_URL}${CONFIG.ENDPOINTS.BANNER_TEXTS}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };

            const response = await fetch(url, {
                method: 'GET',
                headers,
            });

            const data = await response.json();

            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('getBannerTexts: API request error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Launch Shan game
    async launchShanGame(gameData) {
        return await this.makeRequest(CONFIG.ENDPOINTS.LAUNCH_GAME, {
            method: 'POST',
            body: JSON.stringify(gameData),
        });
    }

    // Get agent payment types
    async getAgentPaymentTypes() {
        return await this.makeRequest(CONFIG.ENDPOINTS.AGENT_PAYMENT_TYPES);
    }

    // Submit deposit
    async deposit(depositData) {
        const url = `${this.API_BASE_URL}${CONFIG.ENDPOINTS.DEPOSIT}`;
        const headers = {
            'Accept': 'application/json',
            ...authService.getAuthHeaders(),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: depositData, // FormData object
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('API request error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get deposit logs
    async getDepositLogs() {
        return await this.makeRequest(CONFIG.ENDPOINTS.DEPOSIT_LOGS);
    }

    // Get payment types
    async getPaymentTypes() {
        return await this.makeRequest(CONFIG.ENDPOINTS.PAYMENT_TYPES);
    }

    // Submit withdrawal
    async withdraw(withdrawData) {
        return await this.makeRequest(CONFIG.ENDPOINTS.WITHDRAW, {
            method: 'POST',
            body: JSON.stringify(withdrawData),
        });
    }

    // Get withdrawal logs
    async getWithdrawLogs() {
        return await this.makeRequest(CONFIG.ENDPOINTS.WITHDRAW_LOGS);
    }

    // Get Shan Game Log (Today's transactions)
    async getShanGameLog(userName) {
        try {
            const url = CONFIG.ENDPOINTS.SHAN_GAME_LOG;
            const requestData = {
                agent_code: "SCT931",
                member_account: userName
            };

            console.log('Making Shan Game Log request to:', url);
            console.log('Request data:', requestData);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();
            console.log('Shan Game Log response:', data);

            return { 
                success: response.ok, 
                data, 
                status: response.status 
            };
        } catch (error) {
            console.error('Shan Game Log API request error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Lottery Ticket Management
    // Create lottery tickets
    async createLotteryTickets(ticketData) {
        return await this.makeRequest('/lottery/tickets', {
            method: 'POST',
            body: JSON.stringify(ticketData),
        });
    }

    // Create lottery tickets with payment image
    async createLotteryTicketsWithImage(ticketData, imageFile) {
        try {
            const url = `${this.API_BASE_URL}/lottery/tickets`;
            const formData = new FormData();
            
            // Add ticket data
            formData.append('player_id', ticketData.player_id);
            formData.append('player_user_name', ticketData.player_user_name);
            formData.append('amount_per_ticket', ticketData.amount_per_ticket);
            formData.append('selected_datetime', ticketData.selected_datetime);
            formData.append('payment_method', ticketData.payment_method || 'kpay');
            formData.append('payment_reference', ticketData.payment_reference || `KPAY_${Date.now()}`);
            
            // Add selected_digits as individual array items
            ticketData.selected_digits.forEach((digit, index) => {
                formData.append(`selected_digits[${index}]`, digit);
            });
            
            // Add image file
            if (imageFile) {
                formData.append('payment_image', imageFile);
            }

            const headers = {
                'Accept': 'application/json',
                ...authService.getAuthHeaders(),
            };

            // Remove Content-Type header to let browser set it with boundary for FormData
            delete headers['Content-Type'];

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData,
            });

            const data = await response.json();
            
            if (!response.ok) {
                console.error('API Error Response:', data);
                return { 
                    success: false, 
                    data, 
                    status: response.status,
                    message: data.message || 'Request failed',
                    errors: data.errors || null
                };
            }
            
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('Create lottery tickets with image error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get player's lottery tickets (public route)
    async getPlayerTickets(playerId, filters = {}) {
        const queryParams = new URLSearchParams({
            player_id: playerId,
            ...filters
        });
        return await this.makeRequest(`/lottery/tickets/player/${playerId}?${queryParams}`);
    }

    // Get authenticated user's lottery tickets
    async getMyTickets(filters = {}) {
        const queryParams = new URLSearchParams(filters);
        const endpoint = queryParams.toString() 
            ? `/lottery/tickets/my-tickets?${queryParams}`
            : '/lottery/tickets/my-tickets';
        return await this.makeRequest(endpoint);
    }

    // Update payment status
    async updatePaymentStatus(paymentData) {
        return await this.makeRequest('/lottery/tickets/payment-status', {
            method: 'PATCH',
            body: JSON.stringify(paymentData),
        });
    }

    // Update payment status with image upload
    async updatePaymentStatusWithImage(paymentData, imageFile) {
        try {
            const url = `${this.API_BASE_URL}/lottery/tickets/payment-status`;
            const formData = new FormData();
            
            // Add payment data
            formData.append('ticket_ids', JSON.stringify(paymentData.ticket_ids));
            formData.append('payment_status', paymentData.payment_status);
            formData.append('payment_method', paymentData.payment_method);
            formData.append('payment_reference', paymentData.payment_reference);
            
            // Add image file if provided
            if (imageFile) {
                formData.append('payment_image', imageFile);
            }

            const headers = {
                'Accept': 'application/json',
                ...authService.getAuthHeaders(),
            };

            // Remove Content-Type header to let browser set it with boundary for FormData
            delete headers['Content-Type'];

            const response = await fetch(url, {
                method: 'PATCH',
                headers,
                body: formData,
            });

            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('Payment status update with image error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get today's lottery statistics
    async getTodayStats() {
        return await this.makeRequest('/lottery/stats/today');
    }

    // Get lottery statistics for date range
    async getStatsByDateRange(startDate, endDate) {
        const queryParams = new URLSearchParams({
            start_date: startDate,
            end_date: endDate
        });
        return await this.makeRequest(`/lottery/stats/date-range?${queryParams}`);
    }
}

export default new ApiService();
