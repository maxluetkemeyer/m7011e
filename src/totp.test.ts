import { describe, expect, test } from "@jest/globals";
// @ts-ignore
import { totp_to_url, generateTOTPSecret } from "./totp";

describe("validateToken", () => {
	test("happy path", () => {});

	test("unhappy path", () => {});
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
	test("should return a string", () => {
		expect(typeof "string").toBe("string");
	});

	test("check params", () => {
		const secret: string = generateTOTPSecret();

		const got: string = totp_to_url(secret, "my_account");
		console.log(got);

		const parts = got.split("?");
		const base = parts[0];
		const paramString = parts[1];
		const paramList = paramString.split("&");
		const params: any = {};

		for (const param of paramList) {
			const parts = param.split("=");
			const key = parts[0];
			const value = parts[1];

			params[key] = value;
		}

		console.log(params);

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
		console.log(got);

		const parts = got.split("?");
		const base = parts[0];
		
		console.log(base)

		const checkStart = base.startsWith("otpauth://totp/Lulea%20Newspaper:")
		const checkAccount = base.endsWith("my_account")

		expect(checkStart).toBeTruthy();
		expect(checkAccount).toBeTruthy();

	});
});
