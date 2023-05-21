const authController = require("../../src/auth/authController");
const AppError = require("../../src/misc/AppError");
const buildResponse = require("../../src/util/response/buildResponse");

jest.mock("../../src/util/response/buildResponse.js");
jest.mock("../../src/misc/AppError.js"); 

const mockRes = {
  setHeader: jest.fn(),
  cookie: jest.fn(),
  status: jest.fn(),
  json: jest.fn(() => Promise.resolve()), 
};

describe("postLogin", () => {
  beforeEach(() => {
    mockRes.setHeader.mockClear();
    mockRes.cookie.mockClear();
    mockRes.status.mockClear();
    mockRes.json.mockClear();
  });

  it("CASE 1, should set authorization header, set cookie, and return 200 response", async () => {
    const mockReq = {
      authInfo: {
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken",
      },
    };

    buildResponse.mockResolvedValue({ data: null, error: null });

    const mockNext = jest.fn();

    await authController.postLogin(mockReq, mockRes, mockNext);

    expect(mockRes.setHeader).toHaveBeenCalledWith(
      "Authorization",
      "Bearer mockAccessToken"
    );
    expect(mockRes.cookie).toHaveBeenCalledWith(
      "refreshToken",
      "mockRefreshToken",
      { httpOnly: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    // expect(mockRes.json).toHaveBeenCalled();

    // const jsonCalls = mockRes.json.mock.calls;
    // const [jsonArgs] = jsonCalls[jsonCalls.length - 1];
    // expect(jsonArgs).toEqual({ data: null, error: null });
  });

  it('CASE 2, should handle errors and call the next middleware', async () => {
    const req = {}; // Create a mock request object with the necessary properties
    const res = {
      setHeader: jest.fn(),
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }; // Create a mock response object with the necessary methods

    const error = new Error('Test error');
    const next = jest.fn();

    // Mock the behavior of req.authInfo to throw an error
    Object.defineProperty(req, 'authInfo', {
      get: jest.fn(() => {
        throw error;
      }),
      configurable: true
    });

    await authController.postLogin(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

});
