import bcrypt from "bcrypt";

import { HashComparer } from "./hash-comparer";


const makeSut = () => {
  const sut = new HashComparer();
  return { sut };
};

describe("## Bcrypt adapter", () => {
  describe("HashComparer", () => {
    it("should call Bcrypt.compare with correct values", () => {
      const { sut } = makeSut();
      const compareSpy = jest.spyOn(bcrypt, "compare");

      sut.compare('any_value', 'any_hash');

      expect(compareSpy).toHaveBeenCalledWith("any_value", 'any_hash');
    });

    it("should returns true value if Bcrypt.hash succeeds", async () => {
      const { sut } = makeSut();
      jest
        .spyOn(bcrypt, "compare")
        .mockReturnValueOnce(
          new Promise((resolve) => resolve(true)) as any
        );

      const response = await sut.compare("any_value", "any_hash");

      expect(response).toBeTruthy();
    });
  });

  describe("Throws", () => {
    it("should returns hashed value if Bcrypt.hash succeeds", async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, "compare").mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.compare("any_value", "any_hash");

      await expect(promise).rejects.toThrow();
    });
  });
});
