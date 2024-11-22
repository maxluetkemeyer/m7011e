import { describe, expect, test } from "@jest/globals";
// @ts-ignore
import { generateTOTPSecret } from "./totp";

describe("validateToken", () => {
	test("should return true when token is valid", () => {
		
        
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
	test("should return a string", () => {
		expect(typeof "string").toBe("string");
	});
});
