export interface JwtPayload {
  name: string;
  username: string;
  email: string;
  phoneNumber: Number;
  password: string;
  isAdmin: Boolean;
}
