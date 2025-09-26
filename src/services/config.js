const CONFIG = {
    API_BASE_URL: 'https://gamestar77.online/api',
    AUTH: {
        TOKEN_KEY: 'auth_token',
        USER_DATA_KEY: 'user_data',
        SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    },
    ENDPOINTS: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        USER: '/user',
        CHANGE_PASSWORD: '/change-password',
        PROFILE: '/profile',
        BANKS: '/banks',
        CONTACT: '/contact',
        PROMOTIONS: '/promotion',
        LAUNCH_GAME: '/shankomee/launch-game',
        AGENT_PAYMENT_TYPES: '/agentfinicialPaymentType',
        DEPOSIT: '/depositfinicial',
        DEPOSIT_LOGS: '/depositlogfinicial',
        PAYMENT_TYPES: '/paymentTypefinicial',
        WITHDRAW: '/withdrawfinicial',
        WITHDRAW_LOGS: '/withdrawlogfinicial',
        BANNERS: '/banner',
        BANNER_TEXTS: '/banner_Text',
        
        
        
    }
};

export default CONFIG;
