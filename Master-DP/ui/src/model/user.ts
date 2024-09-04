export class User {
  id: number;
  firstName: string;
  lastName: string;
  sessionToken: string;
  email: string;
  password: string;
  isAdmin: boolean;

    constructor(id:number, firstName: string, lastName: string, sessionToken: string, email: string, password: string, isAdmin: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sessionToken = sessionToken;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}


