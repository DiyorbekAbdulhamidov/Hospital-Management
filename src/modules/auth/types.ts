import { STATUS } from "./constants";

export namespace IEntity {
  export interface User {
    id: number;
    image: string | null;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    subscription: boolean;
    status: STATUS;
    createdAt: string;
    isModerator: boolean;
    isStaff: boolean;
  }

  export interface Comment {
    id: number;
    movie: number;
    author: number;
    text: string;
    createdAt: string;
  }

  export interface Review extends Comment {
    rating: number;
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
