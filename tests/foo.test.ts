import { Cl } from "@stacks/transactions";
import { describe, expect, it, assert } from "vitest";

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

  it("works with meta-foo and bar-2", () => {
    const result = simnet.callPublicFn(
      "foo",
      "meta-foo",
      [
        Cl.contractPrincipal(deployer, "bar-2"),
        Cl.contractPrincipal(deployer, "impl"),
      ],
      address1
    );
    expect(result.result).toBeOk(Cl.uint(2));
  });
});

describe("identical traits are NOT compatible when used as parameters", () => {
  it("works not work with meta-foo and bar", () => {
    try {
      simnet.callPublicFn(
        "foo",
        "meta-foo",
        [
          Cl.contractPrincipal(deployer, "bar"),
          Cl.contractPrincipal(deployer, "impl"),
        ],
        address1
      );
      assert.fail(".bar should not be compatible trait used in meta-foo");
    } catch (e) {
      expect(e).toBe(
        `Call contract function error: foo::meta-foo('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bar, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.impl) -> Error calling contract function: Runtime error while interpreting ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.foo: Unchecked(BadTraitImplementation("bar-trait", "foo"))`
      );
    }
  });
});
