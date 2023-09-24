export namespace IEntity {
  export interface User {
    id: string;
    fullName: string;
    email: string;
    userState: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    permissions: string[];
    roles: string[];
  }

  export interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }

  export interface Tokens {
    access: string;
    refresh: string;
  }

  export interface Hospital {
    city: string;
    id: string;
    name: string;
  }
}

export namespace IForm {
  export interface Login {
    username: string;
    password: string;
  }

  export interface Register {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    subscription?: boolean;
    status?: string;
  }
}

export namespace IApi {
  export namespace Login {
    export interface Request extends IForm.Login {}
    export interface Response extends IEntity.Tokens {}
  }

}

export namespace IContext {
  export interface Auth {
    isAuthenticated: boolean;
    user: IEntity.User | null;
    methods: {
      login: (user: IEntity.User) => void;
      logout: () => void;
    };
  }
}