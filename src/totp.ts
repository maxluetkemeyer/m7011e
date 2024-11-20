import * as OTPAuth from "otpauth";

export function validateToken(token: string, secret: string, account: string) {
	const totp = new OTPAuth.TOTP({
		// Provider or service the account is associated with.
		issuer: "Lulea Newspaper",
		// Account identifier.
		label: account,
		// Algorithm used for the HMAC function, possible values are:
		//   "SHA1", "SHA224", "SHA256", "SHA384", "SHA512",
		//   "SHA3-224", "SHA3-256", "SHA3-384" and "SHA3-512".
		algorithm: "SHA1",
		// Length of the generated tokens.
		digits: 6,
		// Interval of time for which a token is valid, in seconds.
		period: 30,
		// Arbitrary key encoded in base32 or `OTPAuth.Secret` instance
		// (if omitted, a cryptographically secure random secret is generated).
		secret: secret,
		//   or: `OTPAuth.Secret.fromBase32("US3WHSG7X5KAPV27VANWKQHF3SH3HULL")`
		//   or: `new OTPAuth.Secret()`
	});

	const delta = totp.validate({ token: token, window: 1 });

	if (delta === null) {
		return false;
	}

	return true;
}

export function generateTOTPSecret() {
	const secret = new OTPAuth.Secret({ size: 20 });

	return secret.base32;
}

export function totp_to_url(secret: string, account: string): string {
	const totp = new OTPAuth.TOTP({
		// Provider or service the account is associated with.
		issuer: "Lulea Newspaper",
		// Account identifier.
		label: account,
		issuerInLabel: true,
		// Algorithm used for the HMAC function, possible values are:
		//   "SHA1", "SHA224", "SHA256", "SHA384", "SHA512",
		//   "SHA3-224", "SHA3-256", "SHA3-384" and "SHA3-512".
		algorithm: "SHA1",
		// Length of the generated tokens.
		digits: 6,
		// Interval of time for which a token is valid, in seconds.
		period: 30,
		// Arbitrary key encoded in base32 or `OTPAuth.Secret` instance
		// (if omitted, a cryptographically secure random secret is generated).
		secret: secret,
		//   or: `OTPAuth.Secret.fromBase32("US3WHSG7X5KAPV27VANWKQHF3SH3HULL")`
		//   or: `new OTPAuth.Secret()`
	});

	const uri = totp.toString();
	return uri;
}