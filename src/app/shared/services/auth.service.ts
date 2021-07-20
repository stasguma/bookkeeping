export class AuthService {

    private isAuthenticated = !!window.localStorage.getItem('user');

    login() {
        this.isAuthenticated =  true;
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }
}
