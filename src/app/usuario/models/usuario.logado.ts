import { UsuarioClaim } from './usuario.claim';

export class UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  accessToken: string;
  expiresIn: string;
  claims: UsuarioClaim[];
}
