# smart-invariant

## What is this?

Like `invariant` and `tiny-invariant`, but smarter.

Differences from both

- No prefix
- No dependency on `process.env.NODE_ENV`, the message will be sent whether NODE_ENV is production or not
- No bundling shenanigans (removing the asserts in production, quite the contrary, we WANT to assert!)
- Accepts a optional third argument, which is a function that will be called if the assert fails, receiving the error message as the first argument (be aware that this function won't be try-catched inside smart-invariant, you'd do it yourself in the function body). Example: console.log or log to Sentry
- Narrows the type of the assertion target, as you expect.
- Throws a custom AssertError so you can treat it differently if needed

## Installation

```sh
npm install smart-invariant
```

## Usage

```ts
import { assert, AssertError } from 'smart-invariant';

assert(1 === 1, '1 is not equal to 1'); // No error
assert(1 === 2); // AssertError: Assertion failed
assert(1 === 2, '1 is not equal to 2', Sentry.captureMessage); // AssertError: 1 is not equal to 2 and Sentry will be notified
const msg: string | undefined = "I'm a string";
assert(msg, 'msg is undefined'); // No error and msg gets narrowed to string
```
