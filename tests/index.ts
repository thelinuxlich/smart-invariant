import assert from "../src/index";
import { expect, test, vi, assertType } from "vitest";
test("should include a provided message when an assert does throw", () => {
	try {
		assert(false, "my message");
	} catch (e) {
		expect(e).toBeInstanceOf(Error);
		expect(e.message).toEqual("my message");
	}
});

test("should not execute the optional function if the assert does not throw", () => {
	const optional_execution = vi.fn();
	assert(true, "won't throw", optional_execution);
	expect(optional_execution.mock.calls.length).toEqual(0);
});

test("should execute a message function if the assert does throw", () => {
	const message = vi.fn();
	try {
		assert(false, "will throw", message);
	} catch (e) {
		expect(e).toBeInstanceOf(Error);
		expect(message.mock.calls.length).toBeGreaterThan(0);
		expect(e.message).toEqual("will throw");
	}
});

test("should correctly narrow a type (boolean)", () => {
	try {
		const value: boolean = false;
		assert(value, "Value is false");
		assertType<never>(value);
	} catch {}
});

test("should correctly narrow a type (custom type)", () => {
	type Nullable<T> = T | null;
	type Person = { name: string };

	function tryGetPerson(name: string): Nullable<Person> {
		return { name };
	}

	const lula: Nullable<Person> = tryGetPerson("Lula");

	assert(lula, "Lula is not null");
	assertType<Person>(lula);
});
