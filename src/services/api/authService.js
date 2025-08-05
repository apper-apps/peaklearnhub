import users from "@/services/mockData/users.json";

class AuthService {
  constructor() {
    this.users = [...users];
    this.currentUser = null;
  }

  async login(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          this.currentUser = userWithoutPassword;
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
        }
      }, 300);
    });
  }

  async signup(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = this.users.find(u => u.email === userData.email);
        
        if (existingUser) {
          reject(new Error("이미 등록된 이메일입니다."));
          return;
        }

        const newUser = {
          Id: Math.max(...this.users.map(u => u.Id)) + 1,
          email: userData.email,
          password: userData.password,
          name: userData.name || "새 사용자",
          role: "free",
          is_admin: false,
          darkMode: false,
          avatar: "/api/placeholder/100/100",
          joinDate: new Date().toISOString().split('T')[0],
          lastLogin: new Date().toISOString(),
          bio: "",
          phone: "",
          preferences: {
            notifications: true,
            newsletter: false,
            darkMode: false
          }
        };

        this.users.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        this.currentUser = userWithoutPassword;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      }, 400);
    });
  }

  getCurrentUser() {
    if (this.currentUser) return this.currentUser;
    
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      return this.currentUser;
    }
    
    return null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  async updateProfile(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.currentUser) {
          reject(new Error("로그인이 필요합니다."));
          return;
        }

        const userIndex = this.users.findIndex(u => u.Id === this.currentUser.Id);
        if (userIndex === -1) {
          reject(new Error("사용자를 찾을 수 없습니다."));
          return;
        }

        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        const { password, ...updatedUser } = this.users[userIndex];
        this.currentUser = updatedUser;
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 300);
    });
  }
}

export const authService = new AuthService();