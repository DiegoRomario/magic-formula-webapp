import { UsuarioClaim } from './usuario.claim';

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  accessToken: string;
  expiresIn: string;
  claims: UsuarioClaim[];
}
