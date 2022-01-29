import bcrypt from "bcrypt";

import { HashAdapter } from "./hash-adapter";

const makeSut = () => {
  const sut = new HashAdapter();
  return { sut };
};

describe("## Bcrypt adapter", () => {
  describe("Hash", () => {
    it("should call Bcrypt.hash with correct values", () => {
      const { sut } = makeSut();
      const hashSpy = jest.spyOn(bcrypt, "hash");

      sut.hash("any_value");

      expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
    });

    it("should returns hashed value if Bcrypt.hash succeeds", async () => {
      const { sut } = makeSut();
      jest
        .spyOn(bcrypt, "hash")
        .mockReturnValueOnce(
          new Promise((resolve) => resolve("hashed_value")) as any
        );

      const response = await sut.hash("any_value");

      expect(response).toBe("hashed_value");
    });
  });

  describe("Throws", () => {
    it("should returns hashed value if Bcrypt.hash succeeds", async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, "hash").mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.hash("any_value");

      await expect(promise).rejects.toThrow();
    });
  });
});
