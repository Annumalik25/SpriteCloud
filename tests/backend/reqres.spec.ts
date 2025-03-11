import { test, expect } from "@playwright/test";
import { API_Helper } from "../../helpers/API_Helper";
import userData from "../../testdata/beTestData.json";

test.describe("User API Tests", () => {
  test("Get All Users", async ({ request }) => {
    const users = await API_Helper.getUsers(request, userData.users.validPage);
    expect(users.status()).toBe(200);
    const responseBody = await users.json();
    expect(responseBody.page).toBe(userData.users.validPage);
  });

  test("Perform a successful login", async ({ request }) => {
    const loginUserResponse = await API_Helper.loginUser(request, userData.validUser);
    expect(loginUserResponse.status()).toBe(200);
    const responseBody = await loginUserResponse.json();
    expect(responseBody).toHaveProperty("token");
    expect(typeof responseBody.token).toBe("string");
  });

  test("Create User and then Delete User", async ({ request }) => {
    const createUserResponse = await API_Helper.createUser(request, userData.validUser);
    expect(createUserResponse.status()).toBe(201);

    const userId = (await createUserResponse.json()).id;

    const deleteUserResponse = await API_Helper.deleteUser(request, userId);
    expect(deleteUserResponse.status()).toBe(204);

    const response = await API_Helper.getUser(request, userId);
    expect(response.status()).toBe(404); //Get deleted user should return 404
  });
  test("Update user details successfully", async ({ request }) => {
    const response = await API_Helper.updateUser(request, userData.updateUser.userId, userData.updateUser.name, userData.updateUser.job);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.name).toBe(userData.updateUser.name);
    expect(responseBody.job).toBe(userData.updateUser.job);
  });
  test("Get Users with delay and measure response time", async ({ request }) => {
    const startTime = Date.now(); // Capture start time
    const users = await API_Helper.getUsersWithDelay(request, 3);

    const endTime = Date.now(); // Capture end time
    const responseTime = endTime - startTime; // Calculate duration

    expect(users.status()).toBe(200);
    expect(responseTime).toBeGreaterThanOrEqual(userData.delay.maxDelay);
  });

  // Negative Tests

  test("Login with incorrect email/password", async ({ request }) => {
    const loginUserResponse = await API_Helper.loginUser(request, userData.invalidUser);
    expect(loginUserResponse.status()).toBe(400);

    const responseBody = await loginUserResponse.json();
    expect(responseBody).toHaveProperty("error");
    expect(responseBody.error).toBe("user not found");
  });

  test("Getting invalid user with id should return 404", async ({ request }) => {
    const users = await API_Helper.getUser(request, 50);
    expect(users.status()).toBe(404);
  });
  test("Login with missing password", async ({ request }) => {
    const response = await API_Helper.loginUser(request, userData.missingPwdUser);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Missing password");
  });
});
