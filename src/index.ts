export class AssertError extends Error {}

// assert conveys a better message than invariant, and it's shorter to type.
export default function assert(
	condition: any,
	message = "Assertion failed",
	optional_execution?: (message?: string) => void,
): asserts condition {
	if (condition) {
		return;
	}
	if (typeof optional_execution === "function") {
		optional_execution(message);
	}
	throw new AssertError(message);
}
