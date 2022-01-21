import { IHasher } from "@/application/protocols/criptography/hasher";
import { CreateUserProps } from "@/domain/use-cases-protocols/user/create-user";

import { DbCreateAccount } from "./db-create-user";

const makeFakeUser = (): CreateUserProps => ({
  name: "any_name",
  email: "any_email@email.com",
  password: "any_password",
});

const makeHasher = () => {
  class HasherStub implements IHasher {
    async hash(): Promise<string> {
      return new Promise((resolve) => resolve("hashed_value"));
    }
  }

  return new HasherStub();
};

type makeSutType = {
  sut: DbCreateAccount;
  hasherStub: IHasher;
};

const makeSut = (): makeSutType => {
  const hasherStub = makeHasher();
  const sut = new DbCreateAccount(hasherStub);

  return {
    sut,
    hasherStub,
  };
};

describe("DbCreateUser UseCase", () => {
  it("should calls Encrypter.hash with correct values", async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, "hash");

    const fakeUser = makeFakeUser();

    await sut.create(fakeUser);

    expect(hasherSpy).toHaveBeenCalledWith(fakeUser.password);
  });

  it("should throw id Encrypter.hash throws", async () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, "hash").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.create(makeFakeUser());

    expect(promise).rejects.toThrow();
  });
});
