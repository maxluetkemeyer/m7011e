import { describe, expect, test } from "@jest/globals";
// @ts-ignore
import { totp_to_url, generateTOTPSecret, validateToken } from "./totp";

describe("validateToken", () => {
	test("correct token", () => {
		// 30s = 30_000ms
		const secret = "BH457RTCZ6EQTWDS7JZDCMFZHZC4CC76";
		const token = "025261"; // timestamp: 100_000_000
		const account = "my_account";

		const validDirect = validateToken(token, secret, account, 100_000_000);
		const validShortAfter = validateToken(token, secret, account, 100_000_001);
		const validEndOfPeriod = validateToken(token, secret, account, 100_030_000);
		const validEndOfWindow = validateToken(token, secret, account, 100_049_999);
		const validEarliestPossible = validateToken(token, secret, account, 99_960_000);

		const invalidTooLate = validateToken(token, secret, account, 100_050_000);
		const invalidTooEarly = validateToken(token, secret, account, 99_959_999);

		expect(validDirect).toBeTruthy();
		expect(validShortAfter).toBeTruthy();
		expect(validEndOfPeriod).toBeTruthy();
		expect(validEndOfWindow).toBeTruthy();
		expect(validEarliestPossible).toBeTruthy();
		expect(invalidTooLate).toBeFalsy();
		expect(invalidTooEarly).toBeFalsy();
	});

	test("wrong token", () => {
		const secret = "BH457RTCZ6EQTWDS7JZDCMFZHZC4CC76";
		const token = "025262"; // correct would be 025261
		const account = "my_account";

		const invalidDirect = validateToken(token, secret, account, 100_000_000);

		expect(invalidDirect).toBeFalsy();
	});
});

describe("generateTOTPSecret", () => {
	test("should return a string", () => {
		const got = typeof generateTOTPSecret();
		const want = "string";

		expect(got).toBe(want);
	});

	test("two generated secrets should not be equal", () => {
		const first: string = generateTOTPSecret();
		const second: string = generateTOTPSecret();

		expect(first).not.toBe(second);
	});

	test("two generated secrets with different sizes should not be of equal length", () => {
		const first: string = generateTOTPSecret({ size: 10 });
		const second: string = generateTOTPSecret({ size: 20 });

		expect(first.length).not.toBe(second.length);
	});
});

describe("totp_to_url", () => {
	test("check params", () => {
		const secret: string = generateTOTPSecret();

		const got: string = totp_to_url(secret, "my_account");

		const parts = got.split("?");
		const paramString = parts[1];
		const paramList = paramString.split("&");
		const params: any = {};

		for (const param of paramList) {
			const parts = param.split("=");
			const key = parts[0];
			const value = parts[1];

			params[key] = value;
		}

		const checkIssuer = params.issuer === "Lulea%20Newspaper";
		const checkSecret = params.secret === secret.toString();
		const checkAlgorithm = params.algorithm === "SHA1";
		const checkDigits = params.digits === "6";
		const checkPeriod = params.period === "30";

		expect(checkIssuer).toBeTruthy();
		expect(checkSecret).toBeTruthy();
		expect(checkAlgorithm).toBeTruthy();
		expect(checkDigits).toBeTruthy();
		expect(checkPeriod).toBeTruthy();
	});

	test("check base", () => {
		const secret: string = generateTOTPSecret();

		const got: string = totp_to_url(secret, "my_account");

		const parts = got.split("?");
		const base = parts[0];

		const checkStart = base.startsWith("otpauth://totp/Lulea%20Newspaper:");
		const checkAccount = base.endsWith("my_account");

		expect(checkStart).toBeTruthy();
		expect(checkAccount).toBeTruthy();
	});
});
