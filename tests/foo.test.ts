import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const address1 = accounts.get("wallet_1")!;

describe("identical traits are compatible", () => {
  it("works", () => {
    const result = simnet.callPublicFn(
      "foo",
      "foo",
      [Cl.contractPrincipal(deployer, "impl")],
      address1
    );
    expect(result.result).toBeOk(Cl.uint(2));
  });
});
