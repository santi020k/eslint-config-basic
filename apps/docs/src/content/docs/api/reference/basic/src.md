---
title: "basic/src"
description: "@santi020k/eslint-config-basic"
---

## Interfaces

### EslintConfigArray

Defined in: [packages/basic/src/index.ts:685](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/index.ts#L685)

Portable public result type returned by the Basic config composer.

Keeping this as a package-owned interface prevents TypeScript declaration
inference from exposing pnpm-internal `typescript-eslint` paths in consumer
`eslint.config.js` files.

#### Extends

- [`FlatConfigArray`](../core/src.md#flatconfigarray)

#### Indexable

> \[`n`: `number`\]: `Config`

#### Properties

##### \[unscopables\]

> `readonly` **\[unscopables\]**: `object`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:95

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

###### Index Signature

\[`key`: `number`\]: `boolean` \| `undefined`

###### \[iterator\]?

> `optional` **\[iterator\]?**: `boolean`

###### \[unscopables\]?

> `readonly` `optional` **\[unscopables\]?**: `boolean`

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

###### at?

> `optional` **at?**: `boolean`

###### concat?

> `optional` **concat?**: `boolean`

###### copyWithin?

> `optional` **copyWithin?**: `boolean`

###### entries?

> `optional` **entries?**: `boolean`

###### every?

> `optional` **every?**: `boolean`

###### fill?

> `optional` **fill?**: `boolean`

###### filter?

> `optional` **filter?**: `boolean`

###### find?

> `optional` **find?**: `boolean`

###### findIndex?

> `optional` **findIndex?**: `boolean`

###### findLast?

> `optional` **findLast?**: `boolean`

###### findLastIndex?

> `optional` **findLastIndex?**: `boolean`

###### flat?

> `optional` **flat?**: `boolean`

###### flatMap?

> `optional` **flatMap?**: `boolean`

###### forEach?

> `optional` **forEach?**: `boolean`

###### includes?

> `optional` **includes?**: `boolean`

###### indexOf?

> `optional` **indexOf?**: `boolean`

###### join?

> `optional` **join?**: `boolean`

###### keys?

> `optional` **keys?**: `boolean`

###### lastIndexOf?

> `optional` **lastIndexOf?**: `boolean`

###### length?

> `optional` **length?**: `boolean`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

###### map?

> `optional` **map?**: `boolean`

###### pop?

> `optional` **pop?**: `boolean`

###### push?

> `optional` **push?**: `boolean`

###### reduce?

> `optional` **reduce?**: `boolean`

###### reduceRight?

> `optional` **reduceRight?**: `boolean`

###### reverse?

> `optional` **reverse?**: `boolean`

###### shift?

> `optional` **shift?**: `boolean`

###### slice?

> `optional` **slice?**: `boolean`

###### some?

> `optional` **some?**: `boolean`

###### sort?

> `optional` **sort?**: `boolean`

###### splice?

> `optional` **splice?**: `boolean`

###### toLocaleString?

> `optional` **toLocaleString?**: `boolean`

###### toReversed?

> `optional` **toReversed?**: `boolean`

###### toSorted?

> `optional` **toSorted?**: `boolean`

###### toSpliced?

> `optional` **toSpliced?**: `boolean`

###### toString?

> `optional` **toString?**: `boolean`

###### unshift?

> `optional` **unshift?**: `boolean`

###### values?

> `optional` **values?**: `boolean`

###### with?

> `optional` **with?**: `boolean`

###### Inherited from

`FlatConfigArray.[unscopables]`

##### length

> **length**: `number`

Defined in: [packages/basic/src/index.ts:686](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/index.ts#L686)

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

###### Overrides

`FlatConfigArray.length`

#### Methods

##### \[iterator\]()

> **\[iterator\]**(): `ArrayIterator`\<`Config`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:76

Iterator

###### Returns

`ArrayIterator`\<`Config`\>

###### Inherited from

`FlatConfigArray.[iterator]`

##### at()

> **at**(`index`): `Config` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2022.array.d.ts:22

Returns the item located at the specified index.

###### Parameters

###### index

`number`

The zero-based index of the desired code unit. A negative index will count back from the last item.

###### Returns

`Config` \| `undefined`

###### Inherited from

`FlatConfigArray.at`

##### concat()

###### Call Signature

> **concat**(...`items`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1351

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

###### Parameters

###### items

...`ConcatArray`\<`Config`\>[]

Additional arrays and/or items to add to the end of the array.

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.concat`

###### Call Signature

> **concat**(...`items`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1357

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

###### Parameters

###### items

...(`Config` \| `ConcatArray`\<`Config`\>)\[\]

Additional arrays and/or items to add to the end of the array.

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.concat`

##### copyWithin()

> **copyWithin**(`target`, `start`, `end?`): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:60

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

###### Parameters

###### target

`number`

If target is negative, it is treated as length+target where length is the
length of the array.

###### start

`number`

If start is negative, it is treated as length+start. If end is negative, it
is treated as length+end.

###### end?

`number`

If not specified, length of the this object is used as its default value.

###### Returns

`this`

###### Inherited from

`FlatConfigArray.copyWithin`

##### entries()

> **entries**(): `ArrayIterator`\<\[`number`, `Config`\]\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:81

Returns an iterable of key, value pairs for every entry in the array

###### Returns

`ArrayIterator`\<\[`number`, `Config`\]\>

###### Inherited from

`FlatConfigArray.entries`

##### every()

###### Call Signature

> **every**\<`S`\>(`predicate`, `thisArg?`): `this is S[]`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1438

Determines whether all the members of an array satisfy the specified test.

###### Type Parameters

###### S

`S` *extends* `Config`

###### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

`this is S[]`

###### Inherited from

`FlatConfigArray.every`

###### Call Signature

> **every**(`predicate`, `thisArg?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1447

Determines whether all the members of an array satisfy the specified test.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

`boolean`

###### Inherited from

`FlatConfigArray.every`

##### fill()

> **fill**(`value`, `start?`, `end?`): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:49

Changes all array elements from `start` to `end` index to a static `value` and returns the modified array

###### Parameters

###### value

`Config`

value to fill array section with

###### start?

`number`

index to start filling the array at. If start is negative, it is treated as
length+start where length is the length of the array.

###### end?

`number`

index to stop filling the array at. If end is negative, it is treated as
length+end.

###### Returns

`this`

###### Inherited from

`FlatConfigArray.fill`

##### filter()

###### Call Signature

> **filter**\<`S`\>(`predicate`, `thisArg?`): `S`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1474

Returns the elements of an array that meet the condition specified in a callback function.

###### Type Parameters

###### S

`S` *extends* `Config`

###### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

###### Returns

`S`\[\]

###### Inherited from

`FlatConfigArray.filter`

###### Call Signature

> **filter**(`predicate`, `thisArg?`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1480

Returns the elements of an array that meet the condition specified in a callback function.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.filter`

##### find()

###### Call Signature

> **find**\<`S`\>(`predicate`, `thisArg?`): `S` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:27

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

###### Type Parameters

###### S

`S` *extends* `Config`

###### Parameters

###### predicate

(`value`, `index`, `obj`) => `value is S`

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`S` \| `undefined`

###### Inherited from

`FlatConfigArray.find`

###### Call Signature

> **find**(`predicate`, `thisArg?`): `Config` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:28

###### Parameters

###### predicate

(`value`, `index`, `obj`) => `unknown`

###### thisArg?

`any`

###### Returns

`Config` \| `undefined`

###### Inherited from

`FlatConfigArray.find`

##### findIndex()

> **findIndex**(`predicate`, `thisArg?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:39

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

###### Parameters

###### predicate

(`value`, `index`, `obj`) => `unknown`

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`number`

###### Inherited from

`FlatConfigArray.findIndex`

##### findLast()

###### Call Signature

> **findLast**\<`S`\>(`predicate`, `thisArg?`): `S` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:27

Returns the value of the last element in the array where predicate is true, and undefined
otherwise.

###### Type Parameters

###### S

`S` *extends* `Config`

###### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

findLast calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found, findLast
immediately returns that element value. Otherwise, findLast returns undefined.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`S` \| `undefined`

###### Inherited from

`FlatConfigArray.findLast`

###### Call Signature

> **findLast**(`predicate`, `thisArg?`): `Config` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:28

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

###### thisArg?

`any`

###### Returns

`Config` \| `undefined`

###### Inherited from

`FlatConfigArray.findLast`

##### findLastIndex()

> **findLastIndex**(`predicate`, `thisArg?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:39

Returns the index of the last element in the array where predicate is true, and -1
otherwise.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

findLastIndex calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found,
findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`number`

###### Inherited from

`FlatConfigArray.findLastIndex`

##### flat()

> **flat**\<`A`, `D`\>(`this`, `depth?`): `FlatArray`\<`A`, `D`\>[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2019.array.d.ts:73

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

###### Type Parameters

###### A

`A`

###### D

`D` *extends* `number` = `1`

###### Parameters

###### this

`A`

###### depth?

`D`

The maximum recursion depth

###### Returns

`FlatArray`\<`A`, `D`\>[]

###### Inherited from

`FlatConfigArray.flat`

##### flatMap()

> **flatMap**\<`U`, `This`\>(`callback`, `thisArg?`): `U`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2019.array.d.ts:62

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

###### Type Parameters

###### U

`U`

###### This

`This` = `undefined`

###### Parameters

###### callback

(`this`, `value`, `index`, `array`) => `U` \| readonly `U`\[\]

A function that accepts up to three arguments. The flatMap method calls the
callback function one time for each element in the array.

###### thisArg?

`This`

An object to which the this keyword can refer in the callback function. If
thisArg is omitted, undefined is used as the this value.

###### Returns

`U`\[\]

###### Inherited from

`FlatConfigArray.flatMap`

##### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1462

Performs the specified action for each element in an array.

###### Parameters

###### callbackfn

(`value`, `index`, `array`) => `void`

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

###### Returns

`void`

###### Inherited from

`FlatConfigArray.forEach`

##### includes()

> **includes**(`searchElement`, `fromIndex?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2016.array.include.d.ts:23

Determines whether an array includes a certain element, returning true or false as appropriate.

###### Parameters

###### searchElement

`Config`

The element to search for.

###### fromIndex?

`number`

The position in this array at which to begin searching for searchElement.

###### Returns

`boolean`

###### Inherited from

`FlatConfigArray.includes`

##### indexOf()

> **indexOf**(`searchElement`, `fromIndex?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1423

Returns the index of the first occurrence of a value in an array, or -1 if it is not present.

###### Parameters

###### searchElement

`Config`

The value to locate in the array.

###### fromIndex?

`number`

The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.

###### Returns

`number`

###### Inherited from

`FlatConfigArray.indexOf`

##### join()

> **join**(`separator?`): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1362

Adds all the elements of an array into a string, separated by the specified separator string.

###### Parameters

###### separator?

`string`

A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.

###### Returns

`string`

###### Inherited from

`FlatConfigArray.join`

##### keys()

> **keys**(): `ArrayIterator`\<`number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:86

Returns an iterable of keys in the array

###### Returns

`ArrayIterator`\<`number`\>

###### Inherited from

`FlatConfigArray.keys`

##### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1429

Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.

###### Parameters

###### searchElement

`Config`

The value to locate in the array.

###### fromIndex?

`number`

The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.

###### Returns

`number`

###### Inherited from

`FlatConfigArray.lastIndexOf`

##### map()

> **map**\<`U`\>(`callbackfn`, `thisArg?`): `U`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1468

Calls a defined callback function on each element of an array, and returns an array that contains the results.

###### Type Parameters

###### U

`U`

###### Parameters

###### callbackfn

(`value`, `index`, `array`) => `U`

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

###### Returns

`U`\[\]

###### Inherited from

`FlatConfigArray.map`

##### pop()

> **pop**(): `Config` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1340

Removes the last element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

###### Returns

`Config` \| `undefined`

###### Inherited from

`FlatConfigArray.pop`

##### push()

> **push**(...`items`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1345

Appends new elements to the end of an array, and returns the new length of the array.

###### Parameters

###### items

...`Config`\[\]

New elements to add to the array.

###### Returns

`number`

###### Inherited from

`FlatConfigArray.push`

##### reduce()

###### Call Signature

> **reduce**(`callbackfn`): `Config`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1486

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `Config`

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

###### Returns

`Config`

###### Inherited from

`FlatConfigArray.reduce`

###### Call Signature

> **reduce**(`callbackfn`, `initialValue`): `Config`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1487

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `Config`

###### initialValue

`Config`

###### Returns

`Config`

###### Inherited from

`FlatConfigArray.reduce`

###### Call Signature

> **reduce**\<`U`\>(`callbackfn`, `initialValue`): `U`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1493

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

###### Type Parameters

###### U

`U`

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `U`

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

###### Returns

`U`

###### Inherited from

`FlatConfigArray.reduce`

##### reduceRight()

###### Call Signature

> **reduceRight**(`callbackfn`): `Config`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1499

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `Config`

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

###### Returns

`Config`

###### Inherited from

`FlatConfigArray.reduceRight`

###### Call Signature

> **reduceRight**(`callbackfn`, `initialValue`): `Config`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1500

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `Config`

###### initialValue

`Config`

###### Returns

`Config`

###### Inherited from

`FlatConfigArray.reduceRight`

###### Call Signature

> **reduceRight**\<`U`\>(`callbackfn`, `initialValue`): `U`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1506

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

###### Type Parameters

###### U

`U`

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `U`

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

###### Returns

`U`

###### Inherited from

`FlatConfigArray.reduceRight`

##### reverse()

> **reverse**(): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1367

Reverses the elements in an array in place.
This method mutates the array and returns a reference to the same array.

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.reverse`

##### shift()

> **shift**(): `Config` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1372

Removes the first element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

###### Returns

`Config` \| `undefined`

###### Inherited from

`FlatConfigArray.shift`

##### slice()

> **slice**(`start?`, `end?`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1382

Returns a copy of a section of an array.
For both start and end, a negative index can be used to indicate an offset from the end of the array.
For example, -2 refers to the second to last element of the array.

###### Parameters

###### start?

`number`

The beginning index of the specified portion of the array.
If start is undefined, then the slice begins at index 0.

###### end?

`number`

The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
If end is undefined, then the slice extends to the end of the array.

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.slice`

##### some()

> **some**(`predicate`, `thisArg?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1456

Determines whether the specified callback function returns true for any element of an array.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The some method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value true, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

`boolean`

###### Inherited from

`FlatConfigArray.some`

##### sort()

> **sort**(`compareFn?`): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1393

Sorts an array in place.
This method mutates the array and returns a reference to the same array.

###### Parameters

###### compareFn?

(`a`, `b`) => `number`

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
```ts
[11,2,22,1].sort((a, b) => a - b)
```

###### Returns

`this`

###### Inherited from

`FlatConfigArray.sort`

##### splice()

###### Call Signature

> **splice**(`start`, `deleteCount?`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1402

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

###### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount?

`number`

The number of elements to remove. Omitting this argument will remove all elements from the start
paramater location to end of the array. If value of this argument is either a negative number, zero, undefined, or a type
that cannot be converted to an integer, the function will evaluate the argument as zero and not remove any elements.

###### Returns

`Config`\[\]

An array containing the elements that were deleted.

###### Inherited from

`FlatConfigArray.splice`

###### Call Signature

> **splice**(`start`, `deleteCount`, ...`items`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1412

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

###### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount

`number`

The number of elements to remove. If value of this argument is either a negative number, zero,
undefined, or a type that cannot be converted to an integer, the function will evaluate the argument as zero and
not remove any elements.

###### items

...`Config`\[\]

Elements to insert into the array in place of the deleted elements.

###### Returns

`Config`\[\]

An array containing the elements that were deleted.

###### Inherited from

`FlatConfigArray.splice`

##### toLocaleString()

###### Call Signature

> **toLocaleString**(): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1335

Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.

###### Returns

`string`

###### Inherited from

`FlatConfigArray.toLocaleString`

###### Call Signature

> **toLocaleString**(`locales`, `options?`): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:62

###### Parameters

###### locales

`string` \| `string`\[\]

###### options?

`NumberFormatOptions` & `DateTimeFormatOptions`

###### Returns

`string`

###### Inherited from

`FlatConfigArray.toLocaleString`

##### toReversed()

> **toReversed**(): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:44

Returns a copy of an array with its elements reversed.

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.toReversed`

##### toSorted()

> **toSorted**(`compareFn?`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:55

Returns a copy of an array with its elements sorted.

###### Parameters

###### compareFn?

(`a`, `b`) => `number`

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
```ts
[11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
```

###### Returns

`Config`\[\]

###### Inherited from

`FlatConfigArray.toSorted`

##### toSpliced()

###### Call Signature

> **toSpliced**(`start`, `deleteCount`, ...`items`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:64

Copies an array and removes elements and, if necessary, inserts new elements in their place. Returns the copied array.

###### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount

`number`

The number of elements to remove.

###### items

...`Config`\[\]

Elements to insert into the copied array in place of the deleted elements.

###### Returns

`Config`\[\]

The copied array.

###### Inherited from

`FlatConfigArray.toSpliced`

###### Call Signature

> **toSpliced**(`start`, `deleteCount?`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:72

Copies an array and removes elements while returning the remaining elements.

###### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount?

`number`

The number of elements to remove.

###### Returns

`Config`\[\]

A copy of the original array with the remaining elements.

###### Inherited from

`FlatConfigArray.toSpliced`

##### toString()

> **toString**(): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1331

Returns a string representation of an array.

###### Returns

`string`

###### Inherited from

`FlatConfigArray.toString`

##### unshift()

> **unshift**(...`items`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1417

Inserts new elements at the start of an array, and returns the new length of the array.

###### Parameters

###### items

...`Config`\[\]

Elements to insert at the start of the array.

###### Returns

`number`

###### Inherited from

`FlatConfigArray.unshift`

##### values()

> **values**(): `ArrayIterator`\<`Config`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:91

Returns an iterable of values in the array

###### Returns

`ArrayIterator`\<`Config`\>

###### Inherited from

`FlatConfigArray.values`

##### with()

> **with**(`index`, `value`): `Config`\[\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2023.array.d.ts:83

Copies an array, then overwrites the value at the provided index with the
given value. If the index is negative, then it replaces from the end
of the array.

###### Parameters

###### index

`number`

The index of the value to overwrite. If the index is
negative, then it replaces from the end of the array.

###### value

`Config`

The value to write into the copied array.

###### Returns

`Config`\[\]

The copied array with the updated value.

###### Inherited from

`FlatConfigArray.with`

## Variables

### angular

> `const` **angular**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:120](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L120)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### astro

> `const` **astro**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:121](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L121)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### defineConfig

> `const` **defineConfig**: `ConfigComposer`

Defined in: [packages/basic/src/index.ts:843](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/index.ts#L843)

Generates the ESLint configuration array, applying configurations
and integration settings based on the input configuration.

#### Param

**options**

Configuration and integration settings

#### Param

**extraConfigs**

Local flat-config overrides appended after generated config

#### Returns

The final ESLint configuration array

***

### expo

> `const` **expo**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:122](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L122)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### hono

> `const` **hono**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:123](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L123)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### lit

> `const` **lit**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:124](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L124)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### nest

> `const` **nest**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:125](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L125)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### next

> `const` **next**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:126](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L126)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### nuxt

> `const` **nuxt**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:127](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L127)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### preact

> `const` **preact**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:128](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L128)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### qwik

> `const` **qwik**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:129](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L129)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### react

> `const` **react**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:130](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L130)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### reactRouter

> `const` **reactRouter**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:131](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L131)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### slidev

> `const` **slidev**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:132](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L132)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### solid

> `const` **solid**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:133](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L133)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### svelte

> `const` **svelte**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:134](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L134)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### tanstackStart

> `const` **tanstackStart**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:135](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L135)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### vite

> `const` **vite**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:136](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L136)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### vue

> `const` **vue**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [packages/basic/src/frameworks.ts:137](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/frameworks.ts#L137)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

## Functions

### attachReferencedPlugins()

> **attachReferencedPlugins**(`configs`): `ConfigArray`

Defined in: [packages/basic/src/index.ts:754](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/index.ts#L754)

Copies already-loaded plugin objects onto rule blocks that reference them.
ESLint 10 validates plugin availability per effective config object, while
feature packs often keep plugin setup and consumer overrides separate.

#### Parameters

##### configs

`ConfigArray`

#### Returns

`ConfigArray`

## References

### coreConfig

Re-exports [coreConfig](../core/src.md#coreconfig)

***

### createCoreConfig

Re-exports [createCoreConfig](../core/src.md#createcoreconfig)

***

### createGitignoreConfig

Re-exports [createGitignoreConfig](../core/src.md#creategitignoreconfig)

***

### createImportGroups

Re-exports [createImportGroups](../core/src.md#createimportgroups)

***

### DetectedFrameworkName

Re-exports [DetectedFrameworkName](../core/src.md#detectedframeworkname)

***

### DetectionOptions

Re-exports [DetectionOptions](../core/src.md#detectionoptions)

***

### detectProjectOptions

Re-exports [detectProjectOptions](../core/src.md#detectprojectoptions)

***

### EslintConfigOptions

Re-exports [EslintConfigOptions](../core/src.md#eslintconfigoptions)

***

### Extension

Re-exports [Extension](../core/src.md#extension)

***

### ExtensionName

Re-exports [ExtensionName](../core/src.md#extensionname)

***

### ExtensionOption

Re-exports [ExtensionOption](../core/src.md#extensionoption)

***

### FlatConfigArray

Re-exports [FlatConfigArray](../core/src.md#flatconfigarray)

***

### Format

Re-exports [Format](../core/src.md#format)

***

### FormatName

Re-exports [FormatName](../core/src.md#formatname)

***

### FormatOption

Re-exports [FormatOption](../core/src.md#formatoption)

***

### getGlobalsForRuntime

Re-exports [getGlobalsForRuntime](../core/src.md#getglobalsforruntime)

***

### groups

Re-exports [groups](../core/src.md#groups)

***

### hasReactConfig

Re-exports [hasReactConfig](../core/src.md#hasreactconfig)

***

### ImportedFramework

Re-exports [ImportedFramework](../core/src.md#importedframework)

***

### ImportGroupOptions

Re-exports [ImportGroupOptions](../core/src.md#importgroupoptions)

***

### Library

Re-exports [Library](../core/src.md#library)

***

### LibraryName

Re-exports [LibraryName](../core/src.md#libraryname)

***

### LibraryOption

Re-exports [LibraryOption](../core/src.md#libraryoption)

***

### NextMode

Re-exports [NextMode](../core/src.md#nextmode)

***

### NextModeName

Re-exports [NextModeName](../core/src.md#nextmodename)

***

### NextModeOption

Re-exports [NextModeOption](../core/src.md#nextmodeoption)

***

### OptionalConfigMap

Re-exports [OptionalConfigMap](../core/src.md#optionalconfigmap)

***

### OptionalConfigName

Re-exports [OptionalConfigName](../core/src.md#optionalconfigname)

***

### Preset

Re-exports [Preset](../core/src.md#preset)

***

### PresetName

Re-exports [PresetName](../core/src.md#presetname)

***

### PresetOption

Re-exports [PresetOption](../core/src.md#presetoption)

***

### ProjectConfigOptions

Re-exports [ProjectConfigOptions](../core/src.md#projectconfigoptions)

***

### ReactConfigKeys

Re-exports [ReactConfigKeys](../core/src.md#reactconfigkeys)

***

### Runtime

Re-exports [Runtime](../core/src.md#runtime)

***

### RuntimeName

Re-exports [RuntimeName](../core/src.md#runtimename)

***

### RuntimeOption

Re-exports [RuntimeOption](../core/src.md#runtimeoption)

***

### Setting

Re-exports [Setting](../core/src.md#setting)

***

### SettingName

Re-exports [SettingName](../core/src.md#settingname)

***

### SettingOption

Re-exports [SettingOption](../core/src.md#settingoption)

***

### StrictMode

Re-exports [StrictMode](../core/src.md#strictmode)

***

### Testing

Re-exports [Testing](../core/src.md#testing)

***

### TestingName

Re-exports [TestingName](../core/src.md#testingname)

***

### TestingOption

Re-exports [TestingOption](../core/src.md#testingoption)

***

### Tool

Re-exports [Tool](../core/src.md#tool)

***

### ToolName

Re-exports [ToolName](../core/src.md#toolname)

***

### ToolOption

Re-exports [ToolOption](../core/src.md#tooloption)

***

### typescriptConfig

Re-exports [typescriptConfig](../typescript/src.md#typescriptconfig)

***

### TypeScriptMode

Re-exports [TypeScriptMode](../core/src.md#typescriptmode)

***

### TypeScriptOptions

Re-exports [TypeScriptOptions](../core/src.md#typescriptoptions)
