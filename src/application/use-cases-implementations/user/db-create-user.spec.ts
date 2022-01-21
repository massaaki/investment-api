import { IHasher } from "@/application/protocols/criptography/hasher";
import { ICreateUserRepository } from "@/application/protocols/db/create-user-repository";
import { IUser } from "@/domain/entities/user";
import { CreateUserProps } from "@/domain/use-cases-protocols/user/create-user";

import { DbCreateUser } from "./db-create-user";

const makeFakeUser = (): IUser => ({
  id: "any_id",
  name: "any_name",
  email: "any_email@email.com",
  password: "hashed_value",
});

const makeFakeUserProps = (): CreateUserProps => ({
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

const makeCreateUserRepository = () => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create(): Promise<IUser> {
      return new Promise((resolve) => resolve(makeFakeUser()));
    }
  }

  return new CreateUserRepositoryStub();
};

type makeSutType = {
  sut: DbCreateUser;
  hasherStub: IHasher;
  createUserRepositoryStub: ICreateUserRepository;
};

const makeSut = (): makeSutType => {
  const hasherStub = makeHasher();
  const createUserRepositoryStub = makeCreateUserRepository();
  const sut = new DbCreateUser(hasherStub, createUserRepositoryStub);

  return {
    sut,
    hasherStub,
    createUserRepositoryStub,
  };
};

describe("DbCreateUser UseCase", () => {
  it("should calls Encrypter.hash with correct values", async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, "hash");

    const fakeUser = makeFakeUserProps();

    await sut.create(fakeUser);

    expect(hasherSpy).toHaveBeenCalledWith(fakeUser.password);
  });

  it("should throw id Encrypter.hash throws", async () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, "hash").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.create(makeFakeUserProps());

    expect(promise).rejects.toThrow();
  });

  it("should calls CreateUserRepository with correct values", async () => {
    const { sut, createUserRepositoryStub } = makeSut();

    const createUserRepositorySpy = jest.spyOn(
      createUserRepositoryStub,
      "create"
    );

    await sut.create(makeFakeUserProps());

    expect(createUserRepositorySpy).toHaveBeenCalledWith(makeFakeUserProps());
  });
});
