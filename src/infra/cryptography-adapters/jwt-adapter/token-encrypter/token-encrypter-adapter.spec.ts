import jwt from 'jsonwebtoken';
import { TokenEncrypterAdapter } from "./token-encrypter-adapter";


jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return new Promise(resolve => resolve('any_token'))
  }
}))


const makeSut = () => {
  const sut = new TokenEncrypterAdapter('any-secret');
  return { sut };
};


describe("## JWT Adapter", () => {
  describe("Token", () => {
    it("should call JWT.sign with correct values", () => {
      const { sut } = makeSut();
      const signSpy = jest.spyOn(jwt, "sign");

      sut.generate('any-user-id', 10);

      expect(signSpy).toHaveBeenCalledWith({ id: 'any-user-id' }, 'any-secret', { expiresIn: 10 * 60 });
    });

    it("should returns a token value if JWT.sign succeeds", async () => {
      const { sut } = makeSut();

      const response = await sut.generate("any-user-id", 10);

      expect(response).toBe("any_token");
    });
  });

  describe("Throws", () => {
    it("should throw JWT.sign throws", async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, "sign").mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.generate('any-user-id', 10);

      await expect(promise).rejects.toThrow();
    });

  });
})