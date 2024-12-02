// https://refactoring.guru/design-patterns/singleton/typescript/example

/**
 * The Singleton class defines an `instance` getter, that lets clients access
 * the unique singleton instance.
 */
export class StorageSingleton {
	static private_instance: StorageSingleton;

	private jWT_SECRET: string = "";

	/**
	 * The Singleton's constructor should always be private to prevent direct
	 * construction calls with the `new` operator.
	 */
	private constructor() {}

	/**
	 * The static getter that controls access to the singleton instance.
	 *
	 * This implementation allows you to extend the Singleton class while
	 * keeping just one instance of each subclass around.
	 */
	public static get instance(): StorageSingleton {
		if (!StorageSingleton.private_instance) {
			StorageSingleton.private_instance = new StorageSingleton();
		}

		return StorageSingleton.private_instance;
	}

	public get JWT_SECRET(): string {
		return this.jWT_SECRET;
	}

	public set JWT_SECRET(secret: string) {
		this.jWT_SECRET = secret;
	}
}

// /**
//  * The client code.
//  */
// function clientCode() {
// 	const s1 = StorageSingleton.instance;
// 	const s2 = StorageSingleton.instance;

// 	s1.JWT_SECRET = "my new secret";

// 	if (s1 === s2) {
// 		console.log("Singleton works, both variables contain the same instance.");
// 		console.log(s2.JWT_SECRET);
// 	} else {
// 		console.log("Singleton failed, variables contain different instances.");
// 	}
// }

// clientCode();
