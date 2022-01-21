import { IHasher } from "@/application/infra-protocols/criptography/hasher";
import { ICreateUserRepository } from "@/application/infra-protocols/db/create-user-repository";
import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
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

const makeLoadUserByEmailRepository = () => {
  class LoadByUserByEmailRepositoryStub implements ILoadUserByEmailRepository {
    async loadByEmail(): Promise<IUser> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new LoadByUserByEmailRepositoryStub();
};

type makeSutType = {
  sut: DbCreateUser;
  hasherStub: IHasher;
  createUserRepositoryStub: ICreateUserRepository;
  loadByUserByEmailRepositoryStub: ILoadUserByEmailRepository;
};

const makeSut = (): makeSutType => {
  const hasherStub = makeHasher();
  const createUserRepositoryStub = makeCreateUserRepository();
  const loadByUserByEmailRepositoryStub = makeLoadUserByEmailRepository();
  const sut = new DbCreateUser(
    hasherStub,
    createUserRepositoryStub,
    loadByUserByEmailRepositoryStub
  );

  return {
    sut,
    hasherStub,
    createUserRepositoryStub,
    loadByUserByEmailRepositoryStub,
  };
};

describe("## DbCreateUser UseCase", () => {
  describe("Verify", () => {
    it("should return null if user already exists", async () => {
      const { sut, loadByUserByEmailRepositoryStub } = makeSut();

      jest
        .spyOn(loadByUserByEmailRepositoryStub, "loadByEmail")
        .mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeUser())));

      const response = await sut.create(makeFakeUserProps());
      expect(response).toBeNull();
    });
  });

  describe("Create user", () => {
    it("should calls Encrypter.hash with correct values", async () => {
      const { sut, hasherStub } = makeSut();
      const hasherSpy = jest.spyOn(hasherStub, "hash");

      const fakeUser = makeFakeUserProps();

      await sut.create(fakeUser);

      expect(hasherSpy).toHaveBeenCalledWith(fakeUser.password);
    });

    it("should calls CreateUserRepository with correct values", async () => {
      const { sut, createUserRepositoryStub } = makeSut();

      const createUserRepositorySpy = jest.spyOn(
        createUserRepositoryStub,
        "create"
      );

      const fakeUserProps = makeFakeUserProps();
      await sut.create(fakeUserProps);

      const createdUser = { ...fakeUserProps, password: "hashed_value" };

      expect(createUserRepositorySpy).toHaveBeenCalledWith(createdUser);
    });

    it("should return an IUser on CreateUser succeeds", async () => {
      const { sut } = makeSut();

      const user = await sut.create(makeFakeUserProps());
      expect(user).toEqual(makeFakeUser());
    });
  });

  describe("Throws", () => {
    it("should throw if Encrypter.hash throws", async () => {
      const { sut, hasherStub } = makeSut();

      jest.spyOn(hasherStub, "hash").mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.create(makeFakeUserProps());

      await expect(promise).rejects.toThrow();
    });

    it("should throw if CreateUserRepository throws", async () => {
      const { sut, createUserRepositoryStub } = makeSut();

      jest
        .spyOn(createUserRepositoryStub, "create")
        .mockImplementationOnce(() => {
          throw new Error();
        });

      const promise = sut.create(makeFakeUserProps());

      await expect(promise).rejects.toThrow();
    });

    it("should throw if LoadUserByEmailRepository.loadByEmail throws", async () => {
      const { sut, loadByUserByEmailRepositoryStub } = makeSut();

      jest
        .spyOn(loadByUserByEmailRepositoryStub, "loadByEmail")
        .mockImplementation(() => {
          throw new Error();
        });

      const promise = sut.create(makeFakeUserProps());

      await expect(promise).rejects.toThrow();
    });
  });
});
