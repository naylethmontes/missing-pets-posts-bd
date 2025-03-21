import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
  /**
   *
   * @param payload es cualquier data que quiera encriptar
   * @param duration por defecto durara 3 horas
   * @returns y retornara una promesa, si hay un error se resolvera con un nulo. Si no hay error sesuelvo con el token
   */
  static async generateToken(payload: any, duration: string = '3h') {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_KEY, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }
  // esto corresponde a la verificacion de correos electronicos
  static async validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_KEY, (err: any, decoded: any) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  }
}
