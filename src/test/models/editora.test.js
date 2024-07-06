import { describe, expect, jest } from "@jest/globals";
import Editora from "../../models/editora";

describe("Test model Editora", () => {
  const objEditora = {
    nome: "Tasmania",
    cidade: "João Pessoa",
    email: "Tasmania@mail.com",
  };

  it("should be create new instance from Editora class", () => {
    const editora = new Editora(objEditora);

    expect(editora).toEqual(expect.objectContaining(objEditora));
  });

  it.skip("should be save new instance from Editora in the database", () => {
    const editora = new Editora(objEditora);

    editora.salvar().then((response) => {
      expect(response.nome).toBe("Tasmania");
    });
  });

  it.skip("should be save new instance from Editora in the database using aync method", async () => {
    const editora = new Editora(objEditora);

    const data = await editora.salvar();

    const result = await Editora.pegarPeloId(data.id);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });

  it("should be make call in the database simulated", async () => {
    const editora = new Editora(objEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 1,
      nome: "Tasmania",
      cidade: "João Pessoa",
      email: "Tasmania@mail.com",
      created_at: new Date().toLocaleDateString("pt"),
      updated_at: new Date().toLocaleDateString("pt"),
    });

    const result = editora.salvar();

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });
});
