export class User {
    constructor(public name: string) {}
}

class UserService {
    user: User = new User(
        localStorage.getItem('user') || "user"
    );
    set(user: User) {
        this.user = user;
        localStorage.setItem('user', user.name)
    }
    get() { return this.user }
}

let userDb: UserService = new UserService();
export default userDb;