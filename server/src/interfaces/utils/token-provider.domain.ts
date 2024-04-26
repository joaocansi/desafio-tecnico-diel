export default interface ITokenProvider {
  generateToken(id: string): string;
  verifyToken(token: string): string | null;
}
