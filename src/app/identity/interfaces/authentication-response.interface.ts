export interface AuthenticationResponse {
  id: string
  userName: string
  email: string
  roles: string[]
  isVerified: boolean;
  jwToken: string
}

export interface ResponseService<T> {
  object: T;
  error: string;
  status: number;
  exito: boolean;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}
