import PostgreSQLConnectionAdapter from "../../../../src/infra/database/PostgreSQLConnectionAdapter";
import CouponRepositoryDatabase from "../../../../src/infra/repository/database/CouponRepositoryDatabase";

test("Should to test the coupon repository", async function () {
    const connection = new PostgreSQLConnectionAdapter();
    const repository = new CouponRepositoryDatabase(connection);
    const coupon = await repository.getByCode("VALE20");
    expect(coupon?.percentage).toBe(20);
    connection.close();
})