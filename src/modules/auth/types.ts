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

  export namespace Register {
    export interface Request extends IForm.Register {}
    export type Response = IEntity.User;
  }

  export namespace Profile {
    export interface Request {}
    export interface Response extends IEntity.User {}
  }

  export namespace Verification {}

  export namespace SendResetPasswordCode {}

  export namespace ConfirmResetPassword {}
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
