export class User {
  name: string;
  email: string;
  rules: string;
  password: string;

  constructor(User?: Partial<User>) {
    this.name = User?.name;
    this.email = User?.email;
    this.rules = User?.rules;
    this.password = User?.password;
  }
}
