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

  export interface Profile {
    fullName: string
    dateOfBirth?: string
    phoneNumber: string
    gender: string
  }

  export interface Token {
    access_token: string;
  }

  export interface Hospital {
    city: string;
    id: string;
    name: string;
  }

  export interface SingleHospital {
      
  }

  export interface Doctor {
    id: string;
    fullName: string;
    specialty: string;
  }

  export interface SingleDoctor extends Doctor {
    info: string,
    specialty: string,
    workingDays: [],
  }

  export interface BookingTimes {
    id: string,
    bookingTime: string
  }

  export interface Booking {
    address: string,
    bookingDay: string,
    bookingId: string,
    bookingTime: string,
    doctorId: string,
    doctorName: string,
    roomNumber: string,
    status: string,
    weekDay: string
  }

  export interface Spetialization {
    id: string,
    name: string,
    description: string,
    diseaseTreatment: string
  }
}

export namespace IContext {
  export interface AuthContextType {
    user: IEntity.User | null;
    login: (user: IEntity.User) => void;
    logout: () => void;
    userData: IEntity.User | null;
    setUserData: (userData: IEntity.User) => void;
  }
}