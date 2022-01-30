import jwt from 'jsonwebtoken';
import { TokenDecrypterAdapter } from "./token-decrypter-adapter";


jest.mock('jsonwebtoken', () => ({
  verify: async (): Promise<any> => {
    return new Promise(resolve => resolve({ expiresAt: new Date(), id: 'any_id' }))
  }
}))


const makeSut = () => {
  const sut = new TokenDecrypterAdapter('any-secret');
  return { sut };
};


describe("## JWT Adapter", () => {
  describe("Token", () => {
    it("should call JWT.verify with correct values", () => {
      const { sut } = makeSut();
      const verifySpy = jest.spyOn(jwt, "verify");

      sut.decrypt('any-token');

      expect(verifySpy).toHaveBeenCalledWith('any-token', 'any-secret');
    });

    it("should returns a value value if JWT.verify succeeds", async () => {
      const { sut } = makeSut();

      const response = await sut.decrypt("any-token");

      expect(response.id).toBe("any_id");
    });
  });

  describe("Throws", () => {
    it("should throw JWT.verify throws", async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.decrypt('any-token');

      await expect(promise).rejects.toThrow();
    });

  });
})