import PostgreSQLConnectionAdapter from "../../../../src/infra/database/PostgreSQLConnectionAdapter";

test("Should to test the connection with the databese",async function () {
    const connection = new PostgreSQLConnectionAdapter();
    const items = await connection.query("SELECT * FROM ccca.item", []);
    await connection.close();
    expect(items).toHaveLength(3);
})