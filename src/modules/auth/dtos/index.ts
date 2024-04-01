export class LoginRequestDto {
  username: string;
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  refresh_token: string;
}

export class GeneratePayloadDto {
  username: string;
  sub: number;
}

export class GeneratedTokenDto {
  access_token: string;
  refresh_token: string;
}

export class ProfileDto {
  id: number;
  username: string;
  address: string;
  phone_number: string;
}
