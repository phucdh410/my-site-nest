export class LoginRequestDto {
  username: string;
  password: string;
}

export class LoginResponseDto {
  access_token: string;
}

export class ProfileDto {
  id: number;
  username: string;
  address: string;
  phone_number: string;
}
