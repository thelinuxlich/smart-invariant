// assert conveys a better message than invariant, and it's shorter to type.
export default function assert(condition: any, message: string, optional_execution?: () => void): asserts condition {
	if (condition) {
		return;
	}
	if (typeof optional_execution === "function") {
		optional_execution();
	}
	throw new Error(message);
}
