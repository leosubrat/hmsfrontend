import { environment } from "../../../env/environment";

export const API_ENDPOINTS={
  REGISTER: `${environment.apiBaseUrl}/user/signup`,
  LOGIN:`${environment.apiBaseUrl}/user/signin`
};