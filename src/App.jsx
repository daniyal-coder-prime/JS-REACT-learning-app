import { useState, useEffect, useCallback, useMemo } from "react";

const TOPICS = [
  // ─── JAVASCRIPT SECTION ───
  {
    section: "JavaScript Fundamentals",
    title: "let, var, const",
    emoji: "📦",
    content: `In JavaScript, we have 3 ways to create variables:

**var** — The OLD way (avoid it!)
• Can be re-declared and updated
• Has "function scope" (not block scope)
• Gets "hoisted" to the top (we'll learn this later)

**let** — The MODERN way for changing values
• Can be updated but NOT re-declared in the same scope
• Has "block scope" (only exists inside { })
• Not hoisted the same way as var

**const** — For values that NEVER change
• Cannot be updated or re-declared
• Must be assigned a value when created
• Also has block scope

Think of it like this:
• var = a whiteboard anyone can erase and rewrite (messy!)
• let = a notebook page you can erase and rewrite (organized)
• const = a stone carving — permanent!`,
    code: `// var — old, avoid it
var name = "Ali";
var name = "Sara"; // No error! Confusing!

// let — modern, use for changing values
let age = 25;
age = 26; // OK!
// let age = 30; // ERROR! Can't re-declare

// const — use for permanent values
const PI = 3.14159;
// PI = 3; // ERROR! Can't change

// Block scope difference:
if (true) {
  var x = 10;   // Leaks outside!
  let y = 20;   // Stays inside
  const z = 30; // Stays inside
}
console.log(x); // 10 (var leaked!)
// console.log(y); // ERROR!
// console.log(z); // ERROR!`,
    quizzes: [
      { q: "Which keyword should you use for a value that never changes?", options: ["var", "let", "const", "all of them"], answer: 2 },
      { q: "Which keyword has function scope instead of block scope?", options: ["let", "const", "var", "none"], answer: 2 },
      { q: "Can you re-declare a variable with 'let' in the same scope?", options: ["Yes", "No", "Only in functions", "Only with numbers"], answer: 1 },
      { q: "What happens if you try to change a const variable?", options: ["It changes silently", "It gives an error", "It creates a new variable", "Nothing happens"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "Primitive vs Non-Primitive Data Types",
    emoji: "🧱",
    content: `JavaScript has two categories of data:

**Primitive Types** (Simple, stored directly in memory)
• String — text: "hello"
• Number — numbers: 42, 3.14
• Boolean — true/false
• undefined — variable declared but no value
• null — intentionally empty
• BigInt — very large numbers
• Symbol — unique identifier

Key rule: Primitives are COPIED when assigned to another variable.

**Non-Primitive Types** (Complex, stored as references)
• Object — { name: "Ali", age: 25 }
• Array — [1, 2, 3]
• Function — function() { }

Key rule: Non-primitives store a REFERENCE (address). Two variables can point to the SAME object!

Think of it like:
• Primitive = a photocopy (each copy is independent)
• Non-primitive = a shared Google Doc link (everyone sees same doc)`,
    code: `// PRIMITIVE — copies are independent
let a = 10;
let b = a;    // b gets a COPY
b = 20;
console.log(a); // 10 (unchanged!)
console.log(b); // 20

// NON-PRIMITIVE — references share data
let obj1 = { name: "Ali" };
let obj2 = obj1; // obj2 points to SAME object
obj2.name = "Sara";
console.log(obj1.name); // "Sara" (changed!)

// Checking types
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (a famous JS bug!)
typeof {}          // "object"
typeof []          // "object" (arrays are objects!)`,
    quizzes: [
      { q: "Which of these is a primitive type?", options: ["Array", "Object", "String", "Function"], answer: 2 },
      { q: "When you copy a primitive to another variable, what happens?", options: ["They share the same value", "An independent copy is made", "An error occurs", "The original is deleted"], answer: 1 },
      { q: "What does typeof null return?", options: ['"null"', '"undefined"', '"object"', '"boolean"'], answer: 2 },
      { q: "Arrays in JavaScript are technically what type?", options: ["Array type", "List type", "Object type", "Primitive type"], answer: 2 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "== vs ===",
    emoji: "⚖️",
    content: `JavaScript has two ways to compare values:

**== (Loose Equality)**
• Compares values AFTER converting types
• "5" == 5 is TRUE (converts string to number)
• This is often confusing and causes bugs!

**=== (Strict Equality)**
• Compares BOTH value AND type
• "5" === 5 is FALSE (different types)
• Always prefer this one!

Simple rule: ALWAYS use === unless you have a specific reason not to.

Think of it like:
• == asks: "Do these LOOK the same?" (5 and "5" look same)
• === asks: "Are these EXACTLY the same?" (number 5 ≠ string "5")`,
    code: `// Loose equality (==) — converts types
console.log(5 == "5");     // true (string → number)
console.log(0 == false);   // true (false → 0)
console.log("" == false);  // true (both become 0)
console.log(null == undefined); // true

// Strict equality (===) — no conversion
console.log(5 === "5");    // false
console.log(0 === false);  // false
console.log("" === false); // false
console.log(null === undefined); // false

// Always use ===
let userInput = "5";
if (userInput === 5) {
  // This won't run (correct!)
}
if (userInput == 5) {
  // This WILL run (dangerous!)
}`,
    quizzes: [
      { q: 'What does 5 == "5" return?', options: ["true", "false", "error", "undefined"], answer: 0 },
      { q: 'What does 5 === "5" return?', options: ["true", "false", "error", "undefined"], answer: 1 },
      { q: "Which equality operator should you prefer?", options: ["==", "===", "Both are equal", "Neither"], answer: 1 },
      { q: "What does 0 == false return?", options: ["true", "false", "error", "null"], answer: 0 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "null vs undefined",
    emoji: "🕳️",
    content: `Both represent "nothing" but in different ways:

**undefined** — "I don't know yet"
• Variable declared but never assigned a value
• JavaScript sets this automatically
• Function returns undefined if no return statement
• Missing function parameter is undefined

**null** — "I intentionally set this to nothing"
• YOU set it deliberately
• Means "empty on purpose"
• Used to clear a variable

Think of it like:
• undefined = an empty shipping box (you haven't put anything in yet)
• null = a gift box with a note saying "this is intentionally empty"`,
    code: `// undefined — JS sets automatically
let name;
console.log(name); // undefined

function greet() {
  // no return statement
}
console.log(greet()); // undefined

// null — YOU set intentionally
let user = { name: "Ali" };
user = null; // intentionally cleared

// Comparing them
console.log(null == undefined);  // true (loose)
console.log(null === undefined); // false (strict)

// typeof
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (JS bug!)`,
    quizzes: [
      { q: "What is the value of a variable that is declared but not assigned?", options: ["null", "0", "undefined", '""'], answer: 2 },
      { q: "Who sets null — you or JavaScript?", options: ["JavaScript automatically", "The developer intentionally", "The browser", "The server"], answer: 1 },
      { q: "What does null == undefined return?", options: ["true", "false", "error", "null"], answer: 0 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "Hoisting",
    emoji: "🏗️",
    content: `Hoisting is JavaScript's behavior of moving declarations to the TOP of their scope before running the code.

**var hoisting:**
• Declaration moves to top, but NOT the value
• You can use it before declaring — it's just undefined

**let/const hoisting:**
• They ARE hoisted, but in a "Temporal Dead Zone"
• You CANNOT use them before the declaration line
• You get a ReferenceError

**Function hoisting:**
• Function declarations are FULLY hoisted (name + body)
• Function expressions are NOT fully hoisted

Think of it like: Before JS runs your code, it reads through everything and says "OK, I see these variables and functions exist" — but only var and function declarations get early access.`,
    code: `// var hoisting — declaration moves up
console.log(x); // undefined (not error!)
var x = 5;
// JS sees it as:
// var x;          ← declaration hoisted
// console.log(x); ← undefined
// x = 5;          ← assignment stays

// let/const — Temporal Dead Zone
// console.log(y); // ReferenceError!
let y = 10;

// Function declaration — fully hoisted
sayHello(); // Works!
function sayHello() {
  console.log("Hello!");
}

// Function expression — NOT fully hoisted
// greet(); // TypeError!
const greet = function() {
  console.log("Hi!");
};`,
    quizzes: [
      { q: "What happens when you access a var variable before its declaration?", options: ["Error", "undefined", "null", "0"], answer: 1 },
      { q: "Can you use a let variable before its declaration?", options: ["Yes, it's undefined", "No, you get ReferenceError", "Yes, it's null", "It depends"], answer: 1 },
      { q: "Are function declarations fully hoisted?", options: ["Yes", "No", "Only the name", "Only inside blocks"], answer: 0 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "Temporal Dead Zone",
    emoji: "⏳",
    content: `The Temporal Dead Zone (TDZ) is the period between entering a scope and the point where a let/const variable is declared.

During the TDZ:
• The variable EXISTS (it's hoisted)
• But you CANNOT ACCESS it
• Trying gives ReferenceError

Why does TDZ exist?
• To catch bugs! Using a variable before declaring it is usually a mistake
• var allows this (gives undefined), which hides bugs
• let/const + TDZ forces you to declare first, use later

Think of it like: The variable is "in quarantine" until its declaration line. It exists, but you can't touch it yet.`,
    code: `// TDZ in action
{
  // TDZ starts for 'name' here
  // console.log(name); // ReferenceError!
  // Still in TDZ...
  let name = "Ali"; // TDZ ends here
  console.log(name); // "Ali" — now it works!
}

// TDZ with const — same behavior
{
  // console.log(PI); // ReferenceError!
  const PI = 3.14;
  console.log(PI); // 3.14
}

// var has NO TDZ — that's the problem
{
  console.log(age); // undefined (no error, bug hidden!)
  var age = 25;
}`,
    quizzes: [
      { q: "What is the Temporal Dead Zone?", options: ["A place where variables are deleted", "The time between scope entry and variable declaration", "A JavaScript error type", "A memory leak"], answer: 1 },
      { q: "Which keywords have a Temporal Dead Zone?", options: ["Only var", "let and const", "All three", "None"], answer: 1 },
      { q: "What error do you get when accessing a variable in its TDZ?", options: ["TypeError", "SyntaxError", "ReferenceError", "undefined"], answer: 2 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "Arrow Function vs Traditional Function",
    emoji: "🏹",
    content: `JavaScript has two ways to write functions:

**Traditional Function:**
• Has its OWN 'this' keyword
• Can be used as a constructor (with new)
• Has 'arguments' object
• Gets hoisted if it's a declaration

**Arrow Function (=>):**
• Does NOT have its own 'this' (inherits from parent)
• Cannot be used as constructor
• No 'arguments' object
• Shorter syntax
• Never hoisted

When to use which?
• Use arrow functions for most things (shorter, cleaner)
• Use traditional functions when you need your own 'this' (like in object methods)`,
    code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function — same thing, shorter
const addArrow = (a, b) => a + b;

// Arrow with one parameter (no parentheses needed)
const double = x => x * 2;

// Arrow with multiple lines
const greet = (name) => {
  const message = "Hello, " + name;
  return message;
};

// 'this' difference — CRITICAL!
const person = {
  name: "Ali",
  // Traditional — 'this' is the person object
  sayHi: function() {
    console.log("Hi, I'm " + this.name); // "Ali"
  },
  // Arrow — 'this' is inherited (NOT the object!)
  sayBye: () => {
    console.log("Bye from " + this.name); // undefined!
  }
};`,
    quizzes: [
      { q: "Does an arrow function have its own 'this'?", options: ["Yes", "No, it inherits from parent", "Sometimes", "Only in strict mode"], answer: 1 },
      { q: "Which syntax is correct for an arrow function?", options: ["function => ()", "(a, b) => a + b", "=> function()", "arrow(a, b)"], answer: 1 },
      { q: "Can arrow functions be used as constructors with 'new'?", options: ["Yes", "No", "Only with classes", "Only in modules"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "Closures",
    emoji: "🔒",
    content: `A closure is when a function "remembers" the variables from its parent scope even AFTER the parent function has finished running.

This is one of the most important concepts in JavaScript!

How it works:
1. You have an outer function with a variable
2. Inside it, you have an inner function that uses that variable
3. The outer function returns the inner function
4. Even after the outer function is done, the inner function still has access!

Think of it like: A backpack. When you leave school (outer function ends), you still carry your backpack (closure) with your books (variables) from school.`,
    code: `// Simple closure
function createCounter() {
  let count = 0; // This variable is "enclosed"
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// 'count' is private! Can't access from outside

// Practical example: greeting factory
function makeGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

const sayHello = makeGreeter("Hello");
const saySalam = makeGreeter("Assalam-o-Alaikum");

console.log(sayHello("Ali"));  // "Hello, Ali!"
console.log(saySalam("Sara")); // "Assalam-o-Alaikum, Sara!"`,
    quizzes: [
      { q: "What is a closure?", options: ["A way to close a program", "A function that remembers its parent's variables", "A type of loop", "A way to delete variables"], answer: 1 },
      { q: "Can the enclosed variable be accessed directly from outside?", options: ["Yes", "No, it's private", "Only with var", "Only in strict mode"], answer: 1 },
      { q: "When does a closure form?", options: ["When a function returns a function that uses parent variables", "When you use var", "When you write a loop", "When you import a module"], answer: 0 },
    ],
  },
  {
    section: "JavaScript Fundamentals",
    title: "Recursion",
    emoji: "🪞",
    content: `Recursion is when a function calls ITSELF to solve a problem.

Every recursive function needs:
1. **Base case** — when to STOP (very important!)
2. **Recursive case** — the function calling itself with a smaller problem

Without a base case, you get infinite recursion (like an infinite loop) and your program crashes!

Think of it like: Russian nesting dolls. You open one, find a smaller one inside, open that one, find an even smaller one... until you reach the tiniest doll (base case).`,
    code: `// Counting down
function countdown(n) {
  if (n <= 0) {       // Base case — STOP!
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);   // Recursive call
}
countdown(3); // 3, 2, 1, "Done!"

// Factorial: 5! = 5 × 4 × 3 × 2 × 1 = 120
function factorial(n) {
  if (n <= 1) return 1;     // Base case
  return n * factorial(n - 1); // Recursive case
}
console.log(factorial(5)); // 120

// How it works step by step:
// factorial(5) = 5 * factorial(4)
// factorial(4) = 4 * factorial(3)
// factorial(3) = 3 * factorial(2)
// factorial(2) = 2 * factorial(1)
// factorial(1) = 1  ← base case!
// Then it "unwinds": 2*1=2, 3*2=6, 4*6=24, 5*24=120`,
    quizzes: [
      { q: "What is a base case in recursion?", options: ["The first function call", "The condition that stops recursion", "The largest input", "The return value"], answer: 1 },
      { q: "What happens without a base case?", options: ["Nothing", "Infinite recursion / stack overflow", "The function returns 0", "It runs once"], answer: 1 },
      { q: "What does factorial(3) return?", options: ["3", "6", "9", "27"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Arrays & Objects",
    title: "forEach vs map",
    emoji: "🔄",
    content: `Both loop through arrays, but they're different:

**forEach** — Just DOES something with each item
• Does NOT return a new array
• Returns undefined
• Use it for: logging, saving to database, side effects

**map** — TRANSFORMS each item into something new
• Returns a NEW array with transformed items
• Original array stays unchanged
• Use it for: creating new arrays from existing ones

Simple rule:
• Need a new array? → map
• Just doing something? → forEach`,
    code: `const numbers = [1, 2, 3, 4, 5];

// forEach — just does something (no new array)
numbers.forEach(num => {
  console.log(num * 2); // Prints: 2, 4, 6, 8, 10
});
// Returns: undefined

// map — creates a NEW array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] (unchanged!)

// Real-world example
const users = [
  { name: "Ali", age: 25 },
  { name: "Sara", age: 30 }
];

// forEach: just print names
users.forEach(u => console.log(u.name));

// map: get array of names
const names = users.map(u => u.name);
// ["Ali", "Sara"]`,
    quizzes: [
      { q: "Does forEach return a new array?", options: ["Yes", "No, it returns undefined", "It returns the same array", "It returns a boolean"], answer: 1 },
      { q: "Which method should you use to transform an array into a new one?", options: ["forEach", "map", "Both work the same", "Neither"], answer: 1 },
      { q: "Does map modify the original array?", options: ["Yes", "No, it creates a new one", "Sometimes", "Only with objects"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Arrays & Objects",
    title: "map vs filter",
    emoji: "🔍",
    content: `Both return new arrays, but do different things:

**map** — TRANSFORMS every item
• Takes each item and changes it
• New array has SAME number of items
• "Transform all items"

**filter** — SELECTS some items
• Tests each item against a condition
• New array has FEWER or EQUAL items
• "Keep only items that pass the test"

Think of it like:
• map = a machine that changes the shape of every cookie
• filter = a person picking out only the chocolate cookies`,
    code: `const numbers = [1, 2, 3, 4, 5, 6];

// map — transform ALL items
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12] — 6 items in, 6 items out

// filter — keep items that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6] — 6 items in, 3 items out

// Chaining them together!
const doubledEvens = numbers
  .filter(n => n % 2 === 0)  // [2, 4, 6]
  .map(n => n * 2);          // [4, 8, 12]

// Real world
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Mouse", price: 25 }
];

const cheapNames = products
  .filter(p => p.price < 600)   // Keep cheap ones
  .map(p => p.name);            // Get just names
// ["Phone", "Mouse"]`,
    quizzes: [
      { q: "What does filter return?", options: ["A transformed array", "A new array with items that pass the test", "A single value", "A boolean"], answer: 1 },
      { q: "If you map an array of 5 items, how many items will the result have?", options: ["5", "Less than 5", "More than 5", "It depends"], answer: 0 },
      { q: "Can you chain map and filter together?", options: ["Yes", "No", "Only with reduce", "Only in React"], answer: 0 },
    ],
  },
  {
    section: "JavaScript Arrays & Objects",
    title: "filter vs find",
    emoji: "🎯",
    content: `Both search arrays, but return different things:

**filter** — Returns ALL matching items as an array
• Always returns an array (even if empty)
• Checks every item

**find** — Returns the FIRST matching item
• Returns a single item (or undefined if not found)
• Stops as soon as it finds one match (faster!)

Think of it like:
• filter = "Give me ALL the red balls" → [ball, ball, ball]
• find = "Give me the FIRST red ball" → ball`,
    code: `const users = [
  { name: "Ali", age: 25 },
  { name: "Sara", age: 30 },
  { name: "Hassan", age: 25 },
];

// filter — returns ALL matches as array
const age25 = users.filter(u => u.age === 25);
// [{ name: "Ali", age: 25 }, { name: "Hassan", age: 25 }]

// find — returns FIRST match (single object)
const firstAge25 = users.find(u => u.age === 25);
// { name: "Ali", age: 25 }

// When nothing matches:
const age99 = users.filter(u => u.age === 99);
// [] (empty array)

const noOne = users.find(u => u.age === 99);
// undefined`,
    quizzes: [
      { q: "What does find return when no match is found?", options: ["Empty array", "null", "undefined", "false"], answer: 2 },
      { q: "What does filter return when no match is found?", options: ["undefined", "null", "An empty array", "false"], answer: 2 },
      { q: "Does find check every item in the array?", options: ["Yes, always", "No, it stops at the first match", "Only with objects", "Only with numbers"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Arrays & Objects",
    title: "find vs findIndex",
    emoji: "📍",
    content: `Both find the first match, but return different things:

**find** — Returns the matching ITEM itself
• Gives you the actual value/object
• Returns undefined if not found

**findIndex** — Returns the INDEX (position) of the match
• Gives you the position number (0, 1, 2, ...)
• Returns -1 if not found

Use findIndex when you need to know WHERE something is, not WHAT it is.`,
    code: `const fruits = ["apple", "banana", "cherry"];

// find — returns the item
const result = fruits.find(f => f === "banana");
// "banana"

// findIndex — returns the position
const index = fruits.findIndex(f => f === "banana");
// 1

// Not found:
fruits.find(f => f === "grape");      // undefined
fruits.findIndex(f => f === "grape"); // -1

// Useful for updating arrays
const todos = [
  { id: 1, text: "Study", done: false },
  { id: 2, text: "Exercise", done: false },
];

const idx = todos.findIndex(t => t.id === 2);
// idx = 1
todos[idx].done = true; // Mark as done!`,
    quizzes: [
      { q: "What does findIndex return when no match is found?", options: ["undefined", "null", "-1", "0"], answer: 2 },
      { q: "What does find return?", options: ["The index position", "The actual item", "A boolean", "The array length"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Sync vs Async",
    emoji: "⏰",
    content: `**Synchronous (Sync):**
• Code runs line by line, in order
• Each line WAITS for the previous to finish
• Blocks everything else while running
• Like a single-lane road — one car at a time

**Asynchronous (Async):**
• Code can start a task and move on WITHOUT waiting
• When the task finishes, it comes back to handle the result
• Doesn't block other code
• Like ordering food — you place your order and sit down (don't stand at counter waiting)

Why async? Some things take time:
• Fetching data from a server
• Reading files
• Timers (setTimeout)
If these were sync, your whole page would freeze!`,
    code: `// SYNCHRONOUS — blocks and waits
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");
// Output: 1, 2, 3 (in order)

// ASYNCHRONOUS — doesn't block
console.log("1 - Start");
setTimeout(() => {
  console.log("2 - This runs later");
}, 1000); // Wait 1 second
console.log("3 - This runs immediately");
// Output: "1", "3", "2" (2 comes last!)

// Real-world async: fetching data
async function getUser() {
  console.log("Fetching...");
  const response = await fetch("/api/user");
  const user = await response.json();
  console.log("Got user:", user);
}`,
    quizzes: [
      { q: "In synchronous code, does each line wait for the previous one?", options: ["Yes", "No", "Only in loops", "Only with functions"], answer: 0 },
      { q: "What is the main benefit of asynchronous code?", options: ["It runs faster", "It doesn't block other code", "It uses less memory", "It's easier to write"], answer: 1 },
      { q: "setTimeout is an example of what type of code?", options: ["Synchronous", "Asynchronous", "Neither", "Both"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Callbacks vs Promises",
    emoji: "📞",
    content: `Both handle async operations, but differently:

**Callbacks** — The OLD way
• A function you pass to another function
• "Call me back when you're done"
• Problem: "Callback Hell" — nested callbacks become unreadable!

**Promises** — The MODERN way
• An object representing a future value
• Has 3 states: Pending → Fulfilled or Rejected
• Can be chained with .then() — much cleaner!
• Can use async/await for even cleaner code

Think of it like:
• Callback = giving someone your phone number: "call me back"
• Promise = getting a ticket with a number: "we'll call your number"`,
    code: `// CALLBACK STYLE — messy when nested
function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: "Ali" });
  }, 1000);
}

getUser(1, function(user) {
  console.log(user.name);
  // Callback hell begins if you need more...
});

// PROMISE STYLE — much cleaner!
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, name: "Ali" });
    }, 1000);
  });
}

getUserPromise(1)
  .then(user => console.log(user.name))
  .catch(err => console.error(err));

// ASYNC/AWAIT — cleanest!
async function loadUser() {
  try {
    const user = await getUserPromise(1);
    console.log(user.name);
  } catch (err) {
    console.error(err);
  }
}`,
    quizzes: [
      { q: "What is 'Callback Hell'?", options: ["A JavaScript error", "Deeply nested callbacks that are hard to read", "A type of memory leak", "A browser bug"], answer: 1 },
      { q: "What are the 3 states of a Promise?", options: ["Start, Middle, End", "Pending, Fulfilled, Rejected", "Open, Closed, Error", "Ready, Running, Done"], answer: 1 },
      { q: "Which keyword makes a function return a Promise automatically?", options: ["promise", "await", "async", "then"], answer: 2 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Promises (Promise.all, Promise.any, etc.)",
    emoji: "🤝",
    content: `When you have MULTIPLE promises running at once:

**Promise.all([p1, p2, p3])**
• Waits for ALL promises to finish
• If ANY fails, the whole thing fails
• Use when you need ALL results

**Promise.allSettled([p1, p2, p3])**
• Waits for ALL to finish (success OR failure)
• Never "fails" — gives you status of each
• Use when you want results regardless of failures

**Promise.race([p1, p2, p3])**
• Returns whichever finishes FIRST (success or failure)
• Like a race — first to finish line wins
• Use for timeouts

**Promise.any([p1, p2, p3])**
• Returns the first SUCCESSFUL one
• Only fails if ALL fail
• Use when you just need one success`,
    code: `const p1 = fetch("/api/users");
const p2 = fetch("/api/posts");
const p3 = fetch("/api/comments");

// Promise.all — all must succeed
const [users, posts, comments] = await Promise.all([p1, p2, p3]);

// Promise.allSettled — get all results
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === "fulfilled") console.log(r.value);
  if (r.status === "rejected") console.log(r.reason);
});

// Promise.race — first to finish
const fastest = await Promise.race([
  fetch("/api/server1"),
  fetch("/api/server2"),
]);

// Promise.any — first SUCCESS
const firstSuccess = await Promise.any([
  fetch("/api/backup1"),
  fetch("/api/backup2"),
]);`,
    quizzes: [
      { q: "What happens if one promise fails in Promise.all?", options: ["Others continue", "The whole thing fails", "It's ignored", "It retries"], answer: 1 },
      { q: "Which method returns the first promise to finish, whether success or failure?", options: ["Promise.all", "Promise.any", "Promise.race", "Promise.allSettled"], answer: 2 },
      { q: "Which method never fails and shows status of each promise?", options: ["Promise.all", "Promise.allSettled", "Promise.any", "Promise.race"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Event Loop",
    emoji: "🔁",
    content: `The Event Loop is HOW JavaScript handles async code despite being single-threaded (one thing at a time).

**How it works:**
1. **Call Stack** — Where your code runs (one function at a time)
2. **Web APIs** — Where async tasks wait (setTimeout, fetch, etc.)
3. **Callback Queue** — Where finished async callbacks wait in line
4. **Event Loop** — Checks: "Is the call stack empty? If yes, move next callback from queue to stack"

Simple flow:
1. sync code runs on call stack
2. async tasks go to Web APIs
3. When done, callbacks go to queue
4. Event loop moves them to call stack when it's empty

This is WHY setTimeout with 0ms still runs AFTER sync code!`,
    code: `console.log("1"); // Goes to call stack, runs immediately

setTimeout(() => {
  console.log("2"); // Goes to Web API → Queue → Stack
}, 0); // Even with 0ms delay!

console.log("3"); // Goes to call stack, runs immediately

// Output: "1", "3", "2"
// WHY? Event loop waits for call stack to be empty
// before moving "2" from the queue!

// Visualize the process:
// Step 1: Call Stack runs console.log("1") → prints "1"
// Step 2: setTimeout callback goes to Web API
// Step 3: Call Stack runs console.log("3") → prints "3"
// Step 4: Call Stack is empty!
// Step 5: Event Loop moves callback to Call Stack
// Step 6: console.log("2") → prints "2"`,
    quizzes: [
      { q: "Is JavaScript single-threaded or multi-threaded?", options: ["Multi-threaded", "Single-threaded", "Both", "Neither"], answer: 1 },
      { q: "What does the Event Loop check?", options: ["If the queue is empty", "If the call stack is empty", "If there are errors", "If the browser is open"], answer: 1 },
      { q: 'What is the output of: console.log("A"); setTimeout(()=>console.log("B"), 0); console.log("C");', options: ["A, B, C", "A, C, B", "B, A, C", "C, A, B"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Micro vs Macro Tasks",
    emoji: "⚙️",
    content: `The event loop has TWO queues with different priorities:

**Microtasks** (HIGH priority — run first!)
• Promise callbacks (.then, .catch, .finally)
• async/await continuations
• queueMicrotask()

**Macrotasks** (LOWER priority — run after ALL microtasks)
• setTimeout / setInterval
• DOM events (click, scroll)
• I/O operations

**Order of execution:**
1. Run all synchronous code
2. Run ALL microtasks (empty the microtask queue)
3. Run ONE macrotask
4. Run ALL microtasks again
5. Repeat 3-4

This is why Promises resolve BEFORE setTimeout callbacks!`,
    code: `console.log("1 - Sync");

setTimeout(() => {
  console.log("2 - Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Microtask (Promise)");
});

console.log("4 - Sync");

// Output:
// "1 - Sync"
// "4 - Sync"
// "3 - Microtask (Promise)"  ← Before setTimeout!
// "2 - Macrotask (setTimeout)"

// Even with 0ms delay, Promise runs first
// because microtasks have higher priority!`,
    quizzes: [
      { q: "Which has higher priority — microtasks or macrotasks?", options: ["Macrotasks", "Microtasks", "They're equal", "It depends"], answer: 1 },
      { q: "Promise.then() callbacks are which type of task?", options: ["Macrotask", "Microtask", "Sync task", "Neither"], answer: 1 },
      { q: "setTimeout callbacks are which type of task?", options: ["Microtask", "Macrotask", "Sync task", "Neither"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Execution Context",
    emoji: "📋",
    content: `An Execution Context is the environment where JavaScript code runs. Think of it as a "workspace" for your code.

**There are 3 types:**
1. **Global Execution Context** — created when your code first starts
   • Creates the global object (window in browsers)
   • Sets up 'this' to point to global object

2. **Function Execution Context** — created each time a function is called
   • Each function gets its own workspace
   • Has its own variables and 'this'

3. **Eval Execution Context** — (rare, don't worry about it)

**Each context has 2 phases:**
1. **Creation Phase** — sets up variables (hoisting happens here!)
2. **Execution Phase** — runs code line by line`,
    code: `// Global Execution Context is created first
var globalVar = "I'm global";

function outer() {
  // New Function Execution Context created
  var outerVar = "I'm in outer";
  
  function inner() {
    // Another Function Execution Context
    var innerVar = "I'm in inner";
    console.log(globalVar); // Can access global
    console.log(outerVar);  // Can access outer
    console.log(innerVar);  // Can access own
  }
  
  inner(); // Creates inner's context
}

outer(); // Creates outer's context

// Call Stack visualization:
// [inner] ← top (runs first, removed first)
// [outer]
// [global] ← bottom (always there)`,
    quizzes: [
      { q: "When is the Global Execution Context created?", options: ["When you call a function", "When the code first starts running", "When you import a module", "When you open the browser"], answer: 1 },
      { q: "What happens during the Creation Phase?", options: ["Code runs line by line", "Variables are set up (hoisting)", "Functions are deleted", "Errors are thrown"], answer: 1 },
      { q: "Each function call creates a new what?", options: ["Global context", "Function Execution Context", "Browser window", "Variable scope"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Event Bubbling & Propagation",
    emoji: "🫧",
    content: `When you click an element, the event doesn't just fire on THAT element — it travels!

**Event Propagation has 3 phases:**

1. **Capturing Phase** (top → down)
   • Event travels from window DOWN to the target
   • Rarely used, but you can listen here

2. **Target Phase**
   • Event reaches the element you clicked

3. **Bubbling Phase** (bottom → up) — DEFAULT!
   • Event "bubbles" UP from the target to the window
   • This is what normally happens
   • Parent elements can catch events from children

**event.stopPropagation()** — Stops the event from traveling further!

Think of it like: You drop a stone in water. The ripples spread outward (bubbling). Capturing is the reverse — like the water flowing toward where the stone will land.`,
    code: `// HTML: <div id="parent"><button id="child">Click</button></div>

// BUBBLING (default): child fires first, then parent
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked!"); // Fires second
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked!"); // Fires first
});
// Click button: "Child clicked!" then "Parent clicked!"

// CAPTURING: add 'true' as third argument
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent (capture)"); // Fires FIRST now!
}, true); // ← true = capturing phase

// STOP PROPAGATION
document.getElementById("child").addEventListener("click", (e) => {
  e.stopPropagation(); // Parent won't hear about this!
  console.log("Only child fires");
});`,
    quizzes: [
      { q: "In which direction does event bubbling go?", options: ["Top to bottom", "Bottom to top (child to parent)", "Left to right", "Random"], answer: 1 },
      { q: "What method stops an event from propagating further?", options: ["event.stop()", "event.preventDefault()", "event.stopPropagation()", "event.cancel()"], answer: 2 },
      { q: "Which phase is the default behavior?", options: ["Capturing", "Bubbling", "Both equally", "Neither"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Event Delegation",
    emoji: "🎪",
    content: `Event Delegation uses bubbling to handle events efficiently.

Instead of adding an event listener to EVERY child element, you add ONE listener to the parent!

**Why use it?**
• Much better performance (1 listener vs 100)
• Works for dynamically added elements
• Less code to manage

**How it works:**
1. Attach ONE event listener to a parent element
2. When a child is clicked, the event bubbles up to the parent
3. Check event.target to see which child was clicked

Think of it like: Instead of giving every student a walkie-talkie (individual listeners), give the teacher one walkie-talkie (parent listener) and students just raise their hands (bubble up).`,
    code: `// BAD: Adding listener to every button
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", handleClick);
});
// What about new buttons added later? They won't work!

// GOOD: Event Delegation — one listener on parent
document.getElementById("button-container")
  .addEventListener("click", (e) => {
    // Check what was actually clicked
    if (e.target.tagName === "BUTTON") {
      console.log("Button clicked:", e.target.textContent);
    }
  });
// Works for ALL buttons, even ones added later!

// React example (delegation is built-in!)
function TodoList({ todos }) {
  const handleClick = (e) => {
    const todoId = e.target.dataset.id;
    console.log("Clicked todo:", todoId);
  };
  
  return (
    <ul onClick={handleClick}>
      {todos.map(todo => (
        <li key={todo.id} data-id={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    quizzes: [
      { q: "What is event delegation?", options: ["Adding listeners to every element", "Adding one listener to a parent to handle child events", "Removing all event listeners", "Delegating events to the server"], answer: 1 },
      { q: "What property tells you which element was actually clicked?", options: ["event.currentTarget", "event.target", "event.parent", "event.source"], answer: 1 },
      { q: "Does event delegation work for dynamically added elements?", options: ["No", "Yes", "Only with React", "Only with jQuery"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "this Keyword",
    emoji: "👆",
    content: `'this' refers to the object that is currently executing the code. Its value depends on HOW the function is called.

**Rules (in order of priority):**
1. **new** — this = the new object being created
2. **call/apply/bind** — this = whatever you specify
3. **Object method** — this = the object before the dot
4. **Regular function** — this = window (or undefined in strict mode)
5. **Arrow function** — this = inherited from parent scope (NEVER its own!)

Think of it like: "this" is the answer to "WHO is running this code right now?"`,
    code: `// In an object method — this = the object
const person = {
  name: "Ali",
  greet() {
    console.log("Hi, I'm " + this.name); // "Ali"
  }
};
person.greet(); // this = person

// Regular function — this = window/undefined
function showThis() {
  console.log(this); // window (non-strict)
}

// Arrow function — this = parent's this
const obj = {
  name: "Sara",
  greet: () => {
    console.log(this.name); // undefined! (arrow has no own this)
  },
  greetCorrect() {
    const inner = () => {
      console.log(this.name); // "Sara" (inherits from greetCorrect)
    };
    inner();
  }
};

// With 'new' keyword
function User(name) {
  this.name = name; // this = the new object
}
const user = new User("Hassan"); // { name: "Hassan" }`,
    quizzes: [
      { q: "In an object method, what does 'this' refer to?", options: ["The window", "The function itself", "The object before the dot", "undefined"], answer: 2 },
      { q: "Does an arrow function have its own 'this'?", options: ["Yes", "No, it inherits from parent", "Only in React", "Only in strict mode"], answer: 1 },
      { q: "What does 'this' refer to when using 'new' keyword?", options: ["The window", "The function", "The new object being created", "null"], answer: 2 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "call, apply, bind",
    emoji: "📱",
    content: `These methods let you manually SET what 'this' refers to.

**call(thisArg, arg1, arg2)** — Calls the function immediately with specified 'this' and arguments ONE BY ONE.

**apply(thisArg, [args])** — Same as call, but arguments as an ARRAY.

**bind(thisArg, arg1, arg2)** — Does NOT call immediately! Returns a NEW function with 'this' permanently set.

Memory trick:
• call = "Call me now, arguments in a Comma-separated list"
• apply = "Apply me now, arguments in an Array"
• bind = "Bind me for later use"`,
    code: `function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Ali" };

// call — immediate, args one by one
greet.call(person, "Hello", "!"); // "Hello, Ali!"

// apply — immediate, args as array
greet.apply(person, ["Hi", "?"]); // "Hi, Ali?"

// bind — returns new function for later
const greetAli = greet.bind(person, "Hey");
greetAli("!!");  // "Hey, Ali!!"
greetAli("...");  // "Hey, Ali..."

// Real-world: borrowing methods
const calculator = {
  value: 0,
  add(n) { this.value += n; return this; }
};

const myObj = { value: 10 };
calculator.add.call(myObj, 5);
console.log(myObj.value); // 15`,
    quizzes: [
      { q: "Which method calls the function immediately with arguments as an array?", options: ["call", "apply", "bind", "invoke"], answer: 1 },
      { q: "Which method returns a new function instead of calling immediately?", options: ["call", "apply", "bind", "execute"], answer: 2 },
      { q: "What's the difference between call and apply?", options: ["call is faster", "apply uses an array for arguments", "call returns a new function", "No difference"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Prototype & Inheritance",
    emoji: "🧬",
    content: `Every JavaScript object has a hidden link to another object called its **prototype**. This is how JavaScript does inheritance!

**Prototype Chain:**
• When you access a property, JS first checks the object itself
• If not found, it checks the object's prototype
• If still not found, checks prototype's prototype
• Goes up the chain until null (end of chain)

**How objects inherit:**
• Objects inherit methods and properties from their prototype
• Array inherits from Array.prototype → Object.prototype → null
• This is why arrays have methods like .push(), .map(), etc.

Think of it like: A family tree. If you don't know something, ask your parent. If they don't know, they ask THEIR parent.`,
    code: `// Every object has a prototype
const person = {
  greet() { return "Hello!"; }
};

const ali = Object.create(person);
console.log(ali.greet()); // "Hello!" — found via prototype!

// Class syntax (modern way to use prototypes)
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  bark() {
    return this.name + " barks!";
  }
}

const dog = new Dog("Rex");
dog.bark();   // "Rex barks!" — own method
dog.speak();  // "Rex makes a sound" — inherited!

// Prototype chain:
// dog → Dog.prototype → Animal.prototype → Object.prototype → null`,
    quizzes: [
      { q: "What happens when JS can't find a property on an object?", options: ["It throws an error", "It returns null", "It looks up the prototype chain", "It creates the property"], answer: 2 },
      { q: "What is at the end of every prototype chain?", options: ["Object", "undefined", "null", "window"], answer: 2 },
      { q: "Which keyword is used for class inheritance?", options: ["inherits", "proto", "extends", "super"], answer: 2 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Shallow vs Deep Copy",
    emoji: "📋",
    content: `When copying objects, there are two levels:

**Shallow Copy:**
• Copies only the FIRST level
• Nested objects/arrays still SHARE references
• Methods: spread operator {...obj}, Object.assign()

**Deep Copy:**
• Copies EVERYTHING, including nested objects
• Completely independent — no shared references
• Methods: structuredClone(), JSON.parse(JSON.stringify())

Think of it like:
• Shallow copy = photocopying a folder's cover (but the papers inside are shared)
• Deep copy = photocopying the folder AND every paper inside`,
    code: `// SHALLOW COPY — nested objects still connected!
const original = {
  name: "Ali",
  address: { city: "Karachi" }
};

const shallow = { ...original };
shallow.name = "Sara";          // Independent!
shallow.address.city = "Lahore"; // Changes original too!

console.log(original.name);         // "Ali" (safe)
console.log(original.address.city); // "Lahore" (changed!)

// DEEP COPY — everything is independent
const deep = structuredClone(original);
deep.address.city = "Islamabad";
console.log(original.address.city); // "Lahore" (safe!)

// Old way (has limitations with functions/dates):
const deep2 = JSON.parse(JSON.stringify(original));`,
    quizzes: [
      { q: "What does a shallow copy copy?", options: ["Everything deeply", "Only the first level", "Nothing", "Only functions"], answer: 1 },
      { q: "Which method creates a deep copy in modern JS?", options: ["Object.assign()", "spread operator", "structuredClone()", "Array.from()"], answer: 2 },
      { q: "In a shallow copy, are nested objects independent?", options: ["Yes", "No, they share references", "Only arrays", "Only strings"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Debounce",
    emoji: "⏱️",
    content: `Debounce delays a function call until the user STOPS doing something for a specified time.

**Why use it?**
Without debounce, a search input fires a request on EVERY keystroke:
• "H" → request
• "He" → request
• "Hel" → request
• "Hell" → request
• "Hello" → request
That's 5 requests! Wasteful!

With debounce (300ms):
• User types "Hello" quickly
• Only ONE request fires, 300ms after they stop typing

Common uses:
• Search input (wait for user to stop typing)
• Window resize handler
• Scroll event handler
• Save draft functionality`,
    code: `// Simple debounce function
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer); // Cancel previous timer
    timer = setTimeout(() => {
      func.apply(this, args); // Call after delay
    }, delay);
  };
}

// Usage: search input
const searchAPI = (query) => {
  console.log("Searching for:", query);
  // fetch(\`/api/search?q=\${query}\`)
};

const debouncedSearch = debounce(searchAPI, 300);

// In an input handler:
// <input onChange={(e) => debouncedSearch(e.target.value)} />

// User types "Hello" quickly:
// Only calls searchAPI("Hello") once,
// 300ms after they stop typing!`,
    quizzes: [
      { q: "What does debounce do?", options: ["Makes functions run faster", "Delays execution until user stops an activity", "Cancels all function calls", "Runs functions twice"], answer: 1 },
      { q: "What is a common use case for debounce?", options: ["Button click handler", "Page load", "Search input", "CSS animations"], answer: 2 },
      { q: "In debounce, what happens when the user triggers the event again before the delay ends?", options: ["Both callbacks run", "The timer resets", "An error occurs", "Nothing"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Memoization",
    emoji: "🧠",
    content: `Memoization is caching the result of a function so you don't have to calculate it again.

If you call a function with the same inputs, instead of recalculating, it returns the cached result instantly!

**How it works:**
1. First call with arguments (2, 3) → Calculate → Store result in cache
2. Second call with (2, 3) → Found in cache! → Return immediately
3. Call with (4, 5) → Not in cache → Calculate → Store → Return

**When to use:**
• Expensive calculations that repeat
• Pure functions (same input → same output)
• Recursive functions like Fibonacci`,
    code: `// Simple memoize function
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("From cache!");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Example: expensive calculation
const slowSquare = (n) => {
  // Imagine this takes 3 seconds
  console.log("Calculating...");
  return n * n;
};

const fastSquare = memoize(slowSquare);
fastSquare(5); // "Calculating..." → 25
fastSquare(5); // "From cache!" → 25 (instant!)
fastSquare(10); // "Calculating..." → 100

// Fibonacci with memoization
const fib = memoize((n) => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});`,
    quizzes: [
      { q: "What does memoization cache?", options: ["The function code", "The function's results for given inputs", "The variable names", "The DOM elements"], answer: 1 },
      { q: "When is memoization most useful?", options: ["Simple addition", "Functions with expensive repeated calculations", "console.log statements", "CSS styling"], answer: 1 },
      { q: "Should memoization be used with functions that have side effects?", options: ["Yes, always", "No, only pure functions", "Only in React", "Only with arrays"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Core Concepts",
    title: "Object.freeze",
    emoji: "🧊",
    content: `Object.freeze() makes an object COMPLETELY immutable (can't change it).

**What freeze does:**
• Cannot add new properties
• Cannot delete existing properties
• Cannot change existing values
• Cannot change the prototype

**Important:** It's SHALLOW! Nested objects can still be changed.

**Similar methods:**
• Object.freeze() — can't change anything
• Object.seal() — can change values, but can't add/delete properties
• Object.preventExtensions() — can't add, but can change/delete`,
    code: `const config = {
  apiUrl: "https://api.example.com",
  maxRetries: 3,
  settings: { debug: false }
};

Object.freeze(config);

config.apiUrl = "https://evil.com";  // Silently fails!
config.newProp = "test";              // Silently fails!
delete config.maxRetries;             // Silently fails!

console.log(config.apiUrl); // Still "https://api.example.com"

// BUT — freeze is SHALLOW!
config.settings.debug = true; // This WORKS! (nested object)

// To deep freeze:
function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") deepFreeze(obj[key]);
  });
  return Object.freeze(obj);
}`,
    quizzes: [
      { q: "Can you modify properties of a frozen object?", options: ["Yes", "No", "Only add new ones", "Only delete"], answer: 1 },
      { q: "Is Object.freeze deep or shallow?", options: ["Deep (freezes everything)", "Shallow (only first level)", "It depends", "Neither"], answer: 1 },
      { q: "What does Object.seal allow that freeze doesn't?", options: ["Adding new properties", "Changing existing values", "Deleting properties", "Nothing extra"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Data Structures",
    title: "Maps vs Sets",
    emoji: "🗺️",
    content: `**Map** — A collection of key-value pairs
• Like an object, but keys can be ANY type (objects, numbers, etc.)
• Maintains insertion order
• Has .size property
• Better performance for frequent additions/removals

**Set** — A collection of UNIQUE values
• No duplicates allowed!
• Automatically removes duplicates
• Great for: removing duplicates from arrays, tracking unique items

Think of it like:
• Map = a dictionary (word → definition, key → value)
• Set = a bag of unique marbles (no two same marbles)`,
    code: `// MAP — key-value pairs with any key type
const userRoles = new Map();
userRoles.set("Ali", "admin");
userRoles.set("Sara", "editor");

console.log(userRoles.get("Ali")); // "admin"
console.log(userRoles.size);       // 2
console.log(userRoles.has("Ali")); // true

// Object as key (impossible with regular objects!)
const objKey = { id: 1 };
userRoles.set(objKey, "special");

// SET — unique values only
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 3]);
console.log(uniqueNumbers); // Set {1, 2, 3}

// Remove duplicates from array!
const arr = [1, 1, 2, 2, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

const tags = new Set();
tags.add("javascript");
tags.add("react");
tags.add("javascript"); // Ignored! Already exists
console.log(tags.size);  // 2`,
    quizzes: [
      { q: "Can Map keys be objects?", options: ["Yes", "No", "Only strings", "Only numbers"], answer: 0 },
      { q: "What happens when you add a duplicate value to a Set?", options: ["Error", "It's added twice", "It's ignored", "It replaces the old one"], answer: 2 },
      { q: "How do you remove duplicates from an array using a Set?", options: ["array.unique()", "[...new Set(array)]", "Set.from(array)", "array.filter()"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Data Structures",
    title: "Sets vs Arrays",
    emoji: "📊",
    content: `**Array** — Ordered list of items (can have duplicates)
• Access by index: arr[0]
• Can have duplicate values
• Many methods: map, filter, reduce, etc.
• Better for ordered data you need to transform

**Set** — Unordered collection of UNIQUE items
• No index access
• Automatically unique
• Faster lookups (.has() vs .includes())
• Better for checking membership and uniqueness`,
    code: `// Array — duplicates allowed, indexed
const arr = [1, 2, 2, 3, 3];
console.log(arr[0]);          // 1
console.log(arr.includes(2)); // true (slow for large arrays)
console.log(arr.length);      // 5

// Set — unique only, no index
const set = new Set([1, 2, 2, 3, 3]);
console.log(set.has(2));  // true (FAST!)
console.log(set.size);    // 3 (duplicates removed)

// When to use which?
// Need order + duplicates + transform? → Array
const scores = [95, 87, 95, 92]; // Duplicates OK

// Need uniqueness + fast lookup? → Set
const visitedPages = new Set();
visitedPages.add("/home");
visitedPages.add("/about");
visitedPages.has("/home"); // true (O(1) fast!)`,
    quizzes: [
      { q: "Which is faster for checking if a value exists?", options: ["Array.includes()", "Set.has()", "They're the same", "Neither"], answer: 1 },
      { q: "Can you access Set items by index?", options: ["Yes", "No", "Only the first item", "Only with get()"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Data Structures",
    title: "Maps vs Objects",
    emoji: "🆚",
    content: `Both store key-value pairs, but Maps are more powerful:

**Object:**
• Keys must be strings or symbols
• No .size property (need Object.keys().length)
• Has prototype (might have unwanted inherited keys)
• Good for simple, static data

**Map:**
• Keys can be ANY type (objects, functions, numbers)
• Has .size property
• No prototype issues
• Better performance for frequent additions/deletions
• Maintains insertion order reliably

Rule of thumb:
• Simple config/data with string keys → Object
• Dynamic key-value store → Map`,
    code: `// Object — keys are always strings
const obj = {};
obj[1] = "one";
obj["1"] = "also one";
console.log(Object.keys(obj)); // ["1"] — number became string!

// Map — keys keep their type
const map = new Map();
map.set(1, "number one");
map.set("1", "string one");
console.log(map.get(1));   // "number one"
console.log(map.get("1")); // "string one" — different!

// Map with object keys
const user = { name: "Ali" };
const permissions = new Map();
permissions.set(user, ["read", "write"]);
console.log(permissions.get(user)); // ["read", "write"]

// Size comparison
console.log(map.size);                    // 2 (easy!)
console.log(Object.keys(obj).length);     // 1 (verbose)`,
    quizzes: [
      { q: "Can Object keys be numbers?", options: ["Yes, they stay as numbers", "No, they're converted to strings", "Only in strict mode", "Only with symbols"], answer: 1 },
      { q: "Which has a built-in .size property?", options: ["Object", "Map", "Both", "Neither"], answer: 1 },
      { q: "For a cache with frequent additions and deletions, which is better?", options: ["Object", "Map", "Array", "Set"], answer: 1 },
    ],
  },
  {
    section: "JavaScript Data Structures",
    title: "typeof Array",
    emoji: "❓",
    content: `A common JavaScript gotcha:

typeof [] returns "object", NOT "array"!

This is because arrays ARE objects in JavaScript — they're a special kind of object with numeric keys and extra methods.

**How to properly check if something is an array:**
• Array.isArray(value) — the BEST way
• value instanceof Array — also works
• typeof value — does NOT work (returns "object")`,
    code: `console.log(typeof []);          // "object" (not helpful!)
console.log(typeof {});          // "object"
console.log(typeof null);        // "object" (JS bug!)

// The RIGHT way to check
console.log(Array.isArray([]));        // true
console.log(Array.isArray({}));        // false
console.log(Array.isArray("hello"));   // false

// instanceof also works
console.log([] instanceof Array);      // true

// Why does this matter? Type checking!
function process(input) {
  if (Array.isArray(input)) {
    return input.map(x => x * 2);
  }
  return input * 2;
}`,
    quizzes: [
      { q: "What does typeof [] return?", options: ['"array"', '"object"', '"list"', '"Array"'], answer: 1 },
      { q: "What is the correct way to check if something is an array?", options: ["typeof x === 'array'", "x.isArray()", "Array.isArray(x)", "x.type === 'array'"], answer: 2 },
    ],
  },
  // ─── REACT SECTION ───
  {
    section: "React Fundamentals",
    title: "React and its Use Case",
    emoji: "⚛️",
    content: `**React** is a JavaScript library for building user interfaces.

**Why React?**
• Build complex UIs from small, reusable pieces (components)
• When data changes, React automatically updates the screen
• Huge ecosystem and community
• Used by Facebook, Instagram, Netflix, Airbnb, etc.

**Key ideas:**
• **Components** — Reusable building blocks (like LEGO pieces)
• **Declarative** — You describe WHAT you want, React figures out HOW
• **Virtual DOM** — React's smart way to update the screen efficiently
• **One-way data flow** — Data flows from parent to child (predictable)

**When to use React?**
• Single Page Applications (SPAs)
• Complex, interactive UIs
• Apps with lots of changing data
• When you want reusable components`,
    code: `// A simple React component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Components can receive data via "props"
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Components can have their own state
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add
      </button>
    </div>
  );
}

// Compose components together like LEGO
function App() {
  return (
    <div>
      <Greeting name="Ali" />
      <Counter />
    </div>
  );
}`,
    quizzes: [
      { q: "What is React?", options: ["A programming language", "A JavaScript library for building UIs", "A database", "A CSS framework"], answer: 1 },
      { q: "What are React components?", options: ["CSS styles", "Database tables", "Reusable UI building blocks", "Server routes"], answer: 2 },
      { q: "How does data flow in React?", options: ["Two-way (parent ↔ child)", "One-way (parent → child)", "Random", "Bottom to top only"], answer: 1 },
    ],
  },
  {
    section: "React Fundamentals",
    title: "React vs Next.js",
    emoji: "🔄",
    content: `**React** — A UI library (just the view layer)
• Client-side rendering by default
• YOU set up routing, SSR, etc.
• More flexible, more setup work

**Next.js** — A FRAMEWORK built ON TOP of React
• Adds server-side rendering (SSR)
• Built-in file-based routing
• API routes (backend in same project)
• Image optimization, fonts, etc.
• App Router with Server Components

Think of it like:
• React = engine of a car (powerful but needs a car around it)
• Next.js = the complete car (engine + body + wheels + everything)

Use React alone for: simple SPAs, learning React
Use Next.js for: production apps, SEO, full-stack apps`,
    code: `// REACT — you set up everything manually
// Need to install react-router for pages

function App() {
  return (
    // BrowserRouter wraps your routes
    // <Route path="/" element={<Home />} />
    // <Route path="/about" element={<About />} />
    <div>Routes go here</div>
  );
}

// NEXT.JS — file = route (automatic!)
// app/page.js → "/"
// app/about/page.js → "/about"

// Next.js Server Component (runs on server!)
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  const posts = await data.json();
  return <PostList posts={posts} />;
}`,
    quizzes: [
      { q: "Next.js is built on top of which library?", options: ["Vue", "Angular", "React", "Svelte"], answer: 2 },
      { q: "What does Next.js provide that React doesn't by default?", options: ["Components", "JSX", "Server-side rendering & routing", "State management"], answer: 2 },
      { q: "In Next.js, how are routes created?", options: ["With a router config file", "By the file/folder structure", "With React Router", "Manually in index.js"], answer: 1 },
    ],
  },
  {
    section: "React Fundamentals",
    title: "Class vs Functional Components",
    emoji: "🏛️",
    content: `**Class Components** (the OLD way):
• Use ES6 classes
• Have lifecycle methods (componentDidMount, etc.)
• Use 'this.state' and 'this.setState'
• More verbose (more code)
• Still work, but rarely used for new code

**Functional Components** (the MODERN way):
• Just plain functions
• Use Hooks (useState, useEffect, etc.)
• Simpler, shorter, easier to understand
• Better performance
• This is what you should use TODAY

Rule: Always use functional components with Hooks unless working on old code.`,
    code: `// CLASS COMPONENT (old way)
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    console.log("Component mounted!");
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Add
        </button>
      </div>
    );
  }
}

// FUNCTIONAL COMPONENT (modern way) — same thing!
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Component mounted!");
  }, []);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add
      </button>
    </div>
  );
}`,
    quizzes: [
      { q: "Which type of component should you use in modern React?", options: ["Class components", "Functional components", "Both equally", "Neither"], answer: 1 },
      { q: "What do functional components use instead of lifecycle methods?", options: ["this.state", "Hooks (useEffect, useState)", "componentDidMount", "jQuery"], answer: 1 },
      { q: "Do class components still work in React?", options: ["Yes, but they're not recommended for new code", "No, they were removed", "Only in React 16", "Only with TypeScript"], answer: 0 },
    ],
  },
  {
    section: "React Fundamentals",
    title: "Props",
    emoji: "📨",
    content: `**Props (Properties)** = Data passed from parent to child component.

Key rules:
• Props are READ-ONLY (child cannot modify them!)
• Flow ONE WAY: parent → child
• Can be any data type: strings, numbers, objects, functions
• Think of them as function arguments

Think of it like: Props are like a letter you receive. You can READ it, but you can't change what's written on it. If you want to send something back, you call a function (callback) that the parent gave you.`,
    code: `// Parent passes props to child
function App() {
  return (
    <UserCard 
      name="Ali" 
      age={25} 
      isAdmin={true}
      hobbies={["coding", "reading"]}
      onSayHi={() => alert("Hi from Ali!")}
    />
  );
}

// Child receives and uses props
function UserCard({ name, age, isAdmin, hobbies, onSayHi }) {
  return (
    <div>
      <h2>{name}, {age}</h2>
      {isAdmin && <span>⭐ Admin</span>}
      <ul>
        {hobbies.map(h => <li key={h}>{h}</li>)}
      </ul>
      <button onClick={onSayHi}>Say Hi</button>
    </div>
  );
}

// Default props
function Button({ text = "Click me", color = "blue" }) {
  return <button style={{ background: color }}>{text}</button>;
}`,
    quizzes: [
      { q: "Can a child component modify its props?", options: ["Yes", "No, props are read-only", "Only with setState", "Only in class components"], answer: 1 },
      { q: "In which direction do props flow?", options: ["Child to parent", "Parent to child", "Both ways", "Sideways between siblings"], answer: 1 },
      { q: "Can you pass functions as props?", options: ["No", "Yes", "Only in class components", "Only with useCallback"], answer: 1 },
    ],
  },
  {
    section: "React Fundamentals",
    title: "State vs Props",
    emoji: "🔀",
    content: `**Props** — Data from PARENT (external, read-only)
• Received from parent component
• Child CANNOT change them
• Like function parameters

**State** — Data managed INSIDE the component (internal, changeable)
• Created and managed by the component itself
• CAN be changed using setState / useState
• When state changes, component RE-RENDERS
• Like local variables that trigger UI updates

When to use which:
• Need data from parent? → Props
• Need data that changes within the component? → State
• Often: parent's STATE becomes child's PROPS`,
    code: `// Parent has STATE, passes it as PROPS to child
function Parent() {
  const [username, setUsername] = useState("Ali");
  
  return (
    <div>
      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Parent's STATE becomes child's PROP */}
      <ChildDisplay name={username} />
    </div>
  );
}

// Child receives PROPS (read-only!)
function ChildDisplay({ name }) {
  // name is a PROP — can't change it!
  // ❌ name = "Sara"; // This would be wrong!
  return <p>Hello, {name}!</p>;
}

// State vs Props summary:
// STATE:  const [count, setCount] = useState(0); ← owned by this component
// PROPS:  function Card({ title }) ← given by parent`,
    quizzes: [
      { q: "Which one can a component modify — state or props?", options: ["Props", "State", "Both", "Neither"], answer: 1 },
      { q: "What happens when state changes?", options: ["Nothing", "The component re-renders", "The app crashes", "Props update"], answer: 1 },
      { q: "A parent's state often becomes a child's what?", options: ["State", "Props", "Ref", "Context"], answer: 1 },
    ],
  },
  {
    section: "React Fundamentals",
    title: "Constructor in Class Components",
    emoji: "🏗️",
    content: `The constructor is a special method in class components that runs FIRST when the component is created.

**What it does:**
• Initializes state (this.state = { ... })
• Binds methods to 'this'
• Receives props via super(props)

**Important rules:**
• Must call super(props) FIRST
• Only place where you assign this.state directly
• Don't call setState in constructor
• Functional components don't need constructors (use useState instead)

Note: You'll rarely write constructors today since functional components are preferred.`,
    code: `// Class component with constructor
class UserProfile extends React.Component {
  constructor(props) {
    super(props); // MUST call this first!
    
    // Initialize state
    this.state = {
      isEditing: false,
      bio: props.initialBio || ""
    };
    
    // Bind methods (needed for 'this' to work)
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  handleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <button onClick={this.handleEdit}>Edit</button>
      </div>
    );
  }
}

// MODERN equivalent — no constructor needed!
function UserProfile({ name, initialBio = "" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio);
  
  return (
    <div>
      <h2>{name}</h2>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </div>
  );
}`,
    quizzes: [
      { q: "What must you call first in a class constructor?", options: ["this.state", "this.render()", "super(props)", "setState()"], answer: 2 },
      { q: "What's the modern replacement for constructors?", options: ["useRef", "useState hook", "componentDidMount", "useConstructor"], answer: 1 },
    ],
  },
  {
    section: "React Component Types",
    title: "Controlled vs Uncontrolled Components",
    emoji: "🎮",
    content: `**Controlled Components:**
• React state controls the form input value
• Every change goes through setState
• You have FULL control over the data
• Recommended approach!

**Uncontrolled Components:**
• The DOM itself manages the input value
• You read values using refs
• Less React-y, but simpler for basic forms
• Like traditional HTML forms

Think of it like:
• Controlled = YOU drive the car (React manages everything)
• Uncontrolled = self-driving mode (DOM handles it, you just read the result)`,
    code: `// CONTROLLED — React manages the value
function ControlledForm() {
  const [name, setName] = useState("");
  
  return (
    <input 
      value={name}                    // React controls value
      onChange={(e) => setName(e.target.value)} // Every keystroke updates state
    />
  );
  // You always know the current value: name
}

// UNCONTROLLED — DOM manages the value
function UncontrolledForm() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    // Read value only when needed
    console.log(inputRef.current.value);
  };
  
  return (
    <>
      <input ref={inputRef} defaultValue="Hello" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}`,
    quizzes: [
      { q: "In a controlled component, what manages the input value?", options: ["The DOM", "React state", "The browser", "localStorage"], answer: 1 },
      { q: "Which approach is generally recommended in React?", options: ["Uncontrolled", "Controlled", "Both equally", "Neither"], answer: 1 },
      { q: "Uncontrolled components use what to read values?", options: ["useState", "props", "refs", "context"], answer: 2 },
    ],
  },
  {
    section: "React Component Types",
    title: "Pure vs Impure Components",
    emoji: "✨",
    content: `**Pure Component:**
• Given the same props → always renders the same output
• No side effects (doesn't modify external variables, no API calls in render)
• Predictable and easy to test
• React can optimize re-renders

**Impure Component:**
• Output may differ even with same props
• Has side effects (API calls, random values, DOM manipulation)
• Harder to predict and test

In React, your render/return should be PURE. Side effects go in useEffect!`,
    code: `// PURE — same input, same output, always
function PureGreeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
// PureGreeting({ name: "Ali" }) ALWAYS returns "Hello, Ali!"

// IMPURE — output depends on external things
let callCount = 0;
function ImpureGreeting({ name }) {
  callCount++; // Side effect! Modifying external variable
  return <h1>Hello, {name}! (call #{callCount})</h1>;
}
// Same props, different output each time!

// CORRECT way — side effects in useEffect
function ProperComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  // Side effects go HERE, not in render
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Render is pure — same state = same output
  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}`,
    quizzes: [
      { q: "What makes a component 'pure'?", options: ["It uses useEffect", "Same input always gives same output with no side effects", "It doesn't use state", "It's a class component"], answer: 1 },
      { q: "Where should side effects go in a functional component?", options: ["In the return statement", "In useEffect", "In props", "In the component name"], answer: 1 },
    ],
  },
  {
    section: "React Hooks",
    title: "React.memo vs useMemo",
    emoji: "💾",
    content: `Both are for performance optimization, but different things:

**React.memo** — Memoizes a COMPONENT
• Wraps a component
• Prevents re-render if props haven't changed
• Compares previous props vs new props

**useMemo** — Memoizes a VALUE (calculation result)
• Used inside a component
• Caches the result of an expensive calculation
• Recalculates only when dependencies change

Think of it like:
• React.memo = "Don't repaint this room if nothing changed"
• useMemo = "Don't recalculate this recipe if ingredients are the same"`,
    code: `// React.memo — prevent component re-render
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  console.log("Rendering list..."); // Only if items change!
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
});

// useMemo — cache expensive calculation
function Dashboard({ orders }) {
  // Only recalculates when 'orders' changes
  const totalRevenue = useMemo(() => {
    console.log("Calculating total...");
    return orders.reduce((sum, order) => sum + order.amount, 0);
  }, [orders]); // ← dependency array
  
  return <h2>Revenue: \${totalRevenue}</h2>;
}

// Using both together
function App() {
  const [count, setCount] = useState(0);
  const items = useMemo(() => getItems(), []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ExpensiveList items={items} />
    </div>
  );
}`,
    quizzes: [
      { q: "What does React.memo memoize?", options: ["A value", "A component", "A hook", "An event"], answer: 1 },
      { q: "What does useMemo memoize?", options: ["A component", "A function definition", "A calculated value", "An event handler"], answer: 2 },
      { q: "When does useMemo recalculate?", options: ["Every render", "Never", "When dependencies change", "When clicked"], answer: 2 },
    ],
  },
  {
    section: "React Hooks",
    title: "useMemo vs useCallback",
    emoji: "🔧",
    content: `Both cache things to prevent unnecessary recalculations:

**useMemo** — Caches a VALUE
• Returns the cached result of a calculation
• Recalculates when dependencies change
• Use for: expensive calculations

**useCallback** — Caches a FUNCTION
• Returns the cached function itself
• Creates a new function only when dependencies change
• Use for: functions passed as props to child components

Think of it like:
• useMemo = remembering the ANSWER to a math problem
• useCallback = remembering the RECIPE (function) itself`,
    code: `function Parent({ items }) {
  // useMemo — caches the RESULT (a number)
  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price, 0);
  }, [items]);

  // useCallback — caches the FUNCTION itself
  const handleClick = useCallback((id) => {
    console.log("Clicked:", id);
  }, []); // Empty = function never changes

  return (
    <div>
      <p>Total: {total}</p>
      {/* Without useCallback, a NEW function is created 
          every render, causing ItemList to re-render too */}
      <ItemList items={items} onClick={handleClick} />
    </div>
  );
}

// Child wrapped in React.memo
const ItemList = React.memo(({ items, onClick }) => {
  console.log("ItemList rendered");
  return items.map(i => (
    <button key={i.id} onClick={() => onClick(i.id)}>
      {i.name}
    </button>
  ));
});`,
    quizzes: [
      { q: "useMemo caches a ___, while useCallback caches a ___.", options: ["function, value", "value, function", "component, hook", "state, prop"], answer: 1 },
      { q: "When is useCallback most useful?", options: ["For expensive calculations", "When passing functions as props to memoized children", "For styling", "For routing"], answer: 1 },
    ],
  },
  {
    section: "React Hooks",
    title: "useReducer",
    emoji: "🎛️",
    content: `useReducer is an alternative to useState for COMPLEX state logic.

**When to use useReducer:**
• State has multiple related values
• Next state depends on previous state
• Complex update logic (multiple action types)
• When useState becomes messy

**How it works:**
1. Define a reducer function: (state, action) → newState
2. Call useReducer(reducer, initialState)
3. Dispatch actions to trigger state changes

Think of it like: A restaurant order system.
• State = the current order
• Action = "add item", "remove item", "clear order"
• Reducer = the kitchen that processes each action and returns the updated order`,
    code: `// The reducer function — handles all state updates
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "DELETE":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={() => {
        dispatch({ type: "ADD", text: input });
        setInput("");
      }}>Add</button>
      
      {todos.map(todo => (
        <div key={todo.id}>
          <span 
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
            onClick={() => dispatch({ type: "TOGGLE", id: todo.id })}
          >{todo.text}</span>
          <button onClick={() => dispatch({ type: "DELETE", id: todo.id })}>×</button>
        </div>
      ))}
    </div>
  );
}`,
    quizzes: [
      { q: "useReducer is an alternative to which hook?", options: ["useEffect", "useRef", "useState", "useContext"], answer: 2 },
      { q: "What does the dispatch function do?", options: ["Deletes state", "Sends an action to the reducer", "Renders the component", "Fetches data"], answer: 1 },
      { q: "A reducer function takes which two arguments?", options: ["props and state", "state and action", "event and handler", "key and value"], answer: 1 },
    ],
  },
  {
    section: "React Hooks",
    title: "useEffect vs useLayoutEffect",
    emoji: "⏳",
    content: `Both run side effects, but at different times:

**useEffect** — Runs AFTER the browser paints
• Non-blocking (doesn't slow down the visual update)
• User sees the initial render first
• Use for: API calls, subscriptions, logging
• This is what you use 99% of the time

**useLayoutEffect** — Runs BEFORE the browser paints
• Blocking (delays the visual update)
• User sees the effect applied on first paint
• Use for: measuring DOM elements, preventing visual flicker
• Only use when you NEED to measure/modify DOM before user sees it

Think of it like:
• useEffect = Clean the room AFTER the guests arrive (they see the mess briefly)
• useLayoutEffect = Clean the room BEFORE the guests arrive (they never see the mess)`,
    code: `// useEffect — runs AFTER paint (most common)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Runs after component is visible on screen
    fetch("/api/user/" + userId)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// useLayoutEffect — runs BEFORE paint (rare)
function Tooltip({ targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useLayoutEffect(() => {
    // Measure DOM BEFORE browser paints
    // Prevents tooltip from "jumping"
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left });
  }, [targetRef]);
  
  return (
    <div style={{ position: "absolute", ...position }}>
      Tooltip content
    </div>
  );
}`,
    quizzes: [
      { q: "When does useEffect run?", options: ["Before rendering", "After the browser paints", "During rendering", "Before mounting"], answer: 1 },
      { q: "When should you use useLayoutEffect?", options: ["For API calls", "For event listeners", "When you need to measure/modify DOM before paint", "Always"], answer: 2 },
      { q: "Which hook should you use 99% of the time?", options: ["useLayoutEffect", "useEffect", "Both equally", "Neither"], answer: 1 },
    ],
  },
  {
    section: "React Hooks",
    title: "Custom Hooks",
    emoji: "🪝",
    content: `Custom Hooks let you extract reusable logic from components.

**Rules:**
• Name must start with "use" (useCounter, useFetch, etc.)
• Can use other hooks inside
• Share LOGIC, not state (each component using the hook gets its own state)
• Makes code cleaner and DRY (Don't Repeat Yourself)

**When to create a custom hook:**
• Same logic used in multiple components
• Component is getting too complex
• You want to separate concerns`,
    code: `// Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Use it in ANY component!
function UserList() {
  const { data: users, loading, error } = useFetch("/api/users");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return users.map(u => <p key={u.id}>{u.name}</p>);
}

function PostList() {
  const { data: posts, loading } = useFetch("/api/posts");
  if (loading) return <p>Loading...</p>;
  return posts.map(p => <p key={p.id}>{p.title}</p>);
}

// Custom Hook: useLocalStorage
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}`,
    quizzes: [
      { q: "What must custom hook names start with?", options: ['"hook"', '"custom"', '"use"', '"my"'], answer: 2 },
      { q: "Do two components using the same custom hook share state?", options: ["Yes, they share", "No, each gets its own state", "Only with context", "Only with useRef"], answer: 1 },
      { q: "What is the main benefit of custom hooks?", options: ["Faster performance", "Reusable logic across components", "Better styling", "Smaller bundle size"], answer: 1 },
    ],
  },
  {
    section: "React Hooks",
    title: "useImperativeHandle",
    emoji: "🎛️",
    content: `useImperativeHandle customizes what value is exposed to parent components when using ref.

Normally, refs give access to the DOM element. useImperativeHandle lets you expose CUSTOM methods instead.

**Used with forwardRef:**
1. Parent creates a ref
2. Child component uses forwardRef to receive it
3. useImperativeHandle defines what methods the parent can call

**When to use:**
• When a parent needs to trigger specific child actions
• Focus, scroll, reset, play/pause
• Building reusable component libraries`,
    code: `// useImperativeHandle + forwardRef
// (forwardRef and useImperativeHandle from "react")

// Child component with custom exposed methods
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  
  // Customize what parent can access via ref
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    reset: () => {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    // Parent can ONLY call play, pause, reset
    // NOT access the full video DOM element!
  }));
  
  return <video ref={videoRef} src={props.src} />;
});

// Parent component
function App() {
  const playerRef = useRef(null);
  
  return (
    <div>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
      <button onClick={() => playerRef.current.reset()}>Reset</button>
    </div>
  );
}`,
    quizzes: [
      { q: "What does useImperativeHandle customize?", options: ["The component's props", "What ref exposes to the parent", "The component's state", "The render output"], answer: 1 },
      { q: "useImperativeHandle is used together with which API?", options: ["useState", "useEffect", "forwardRef", "useContext"], answer: 2 },
    ],
  },
  {
    section: "React Concepts",
    title: "Fragments",
    emoji: "🧩",
    content: `Fragments let you group multiple elements WITHOUT adding extra DOM nodes.

**The problem:** React components must return a SINGLE element. So you often wrap things in a <div>, but that adds unnecessary DOM nodes.

**The solution:** Use <Fragment> or the short syntax <> ... </>

**Benefits:**
• No extra divs in the DOM
• Cleaner HTML structure
• Better for CSS (no unexpected parent divs)
• The short syntax <></> is super convenient`,
    code: `// PROBLEM: Extra unnecessary div
function UserInfo() {
  return (
    <div> {/* This div is just for React, not needed! */}
      <h1>Ali</h1>
      <p>Age: 25</p>
    </div>
  );
}

// SOLUTION: Fragment — no extra div!
function UserInfo() {
  return (
    <>
      <h1>Ali</h1>
      <p>Age: 25</p>
    </>
  );
}
// Rendered HTML: <h1>Ali</h1><p>Age: 25</p>
// No wrapping div!

// Full syntax (needed when you need a key)
function ItemList({ items }) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.definition}</dd>
    </React.Fragment>
  ));
}`,
    quizzes: [
      { q: "What do Fragments solve?", options: ["Slow rendering", "Extra unnecessary DOM nodes", "Memory leaks", "CSS issues"], answer: 1 },
      { q: "What is the short syntax for Fragment?", options: ["<Fragment>", "<div>", "<></>", "<fr>"], answer: 2 },
      { q: "When do you need the full <React.Fragment> syntax?", options: ["Always", "When you need to pass a key prop", "Never", "For styling"], answer: 1 },
    ],
  },
  {
    section: "React Concepts",
    title: "Keys in React Lists",
    emoji: "🔑",
    content: `Keys help React identify which items in a list have changed, been added, or removed.

**Rules:**
• Every item in a list MUST have a unique key
• Keys should be STABLE (don't change between renders)
• Use item IDs, NOT array indexes (indexes cause bugs!)
• Keys are used internally by React, not passed to the component

**Why are keys important?**
Without keys, React re-renders the ENTIRE list when one item changes. With keys, React only updates the items that actually changed — much faster!

Think of it like: Student roll numbers. The teacher uses roll numbers to track who's present, who's new, who left — without checking every student individually.`,
    code: `// GOOD — using unique IDs as keys
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// BAD — using array index as key
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
        // If items are reordered, React gets confused!
      ))}
    </ul>
  );
}

// WHY index is bad:
// Before: [A(key=0), B(key=1), C(key=2)]
// After removing A: [B(key=0), C(key=1)]
// React thinks B changed to B, C changed to C... WRONG!
// It should know A was removed!`,
    quizzes: [
      { q: "Why should you avoid using array indexes as keys?", options: ["They're too slow", "They cause bugs when items are reordered", "They're not numbers", "React doesn't accept them"], answer: 1 },
      { q: "What should keys be?", options: ["Random each render", "Unique and stable", "Always 0", "The item's value"], answer: 1 },
      { q: "Are keys passed as props to the child component?", options: ["Yes", "No, they're used internally by React", "Only in class components", "Only with Fragments"], answer: 1 },
    ],
  },
  {
    section: "React Concepts",
    title: "Context API",
    emoji: "🌐",
    content: `Context provides a way to pass data through the component tree WITHOUT passing props manually at every level.

**The problem: "Prop Drilling"**
App → Layout → Sidebar → Menu → MenuItem → needs theme
You have to pass "theme" through 5 levels even if middle components don't need it!

**The solution: Context**
1. Create a Context (the container)
2. Wrap parent with Provider (the broadcaster)
3. Any child can consume it with useContext (the receiver)

Think of it like: Radio broadcasting. Instead of passing a message person to person (prop drilling), you broadcast it on a radio frequency (context) and anyone with a radio (useContext) can hear it.`,
    code: `// Context API
// createContext, useContext, useState come from "react"

// 1. Create the Context
const ThemeContext = createContext("light");

// 2. Provider — wraps the app
function App() {
  const [theme, setTheme] = useState("light");
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// 3. Consumer — any child can use it!
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </header>
  );
}

// Even deeply nested components can access it!
function DeepChild() {
  const { theme } = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}`,
    quizzes: [
      { q: "What problem does Context API solve?", options: ["Slow rendering", "Prop drilling", "Memory leaks", "CSS styling"], answer: 1 },
      { q: "Which hook is used to consume context?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: 2 },
      { q: "What wraps the components that need access to context?", options: ["Consumer", "Provider", "Fragment", "Wrapper"], answer: 1 },
    ],
  },
  {
    section: "React Concepts",
    title: "DOM vs Virtual DOM",
    emoji: "🌳",
    content: `**Real DOM (Document Object Model):**
• The actual HTML structure in the browser
• Updating it is SLOW (browser has to repaint, reflow)
• Every small change triggers a full re-render of affected areas

**Virtual DOM:**
• A lightweight JavaScript COPY of the Real DOM
• Lives in memory (fast!)
• React's secret weapon for performance

**How Virtual DOM works:**
1. State changes → React creates a NEW Virtual DOM
2. React COMPARES new Virtual DOM with the old one (called "diffing")
3. React finds the MINIMAL changes needed
4. React applies ONLY those changes to the Real DOM (called "reconciliation")

Think of it like: Instead of rebuilding an entire house when you want to change a window (Real DOM), you look at the blueprint (Virtual DOM), mark just the window that changed, and only replace that window.`,
    code: `// When state changes:
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Counter App</h1>
      <p>{count}</p>  {/* Only THIS changes */}
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}

// What React does internally:
// 1. Old Virtual DOM:  <p>0</p>
// 2. New Virtual DOM:  <p>1</p>
// 3. Diff: "Only the text in <p> changed!"
// 4. Update Real DOM: Change JUST that <p> text
// 
// WITHOUT Virtual DOM: entire <div> with all children
// would need to be re-rendered in the browser.
// WITH Virtual DOM: only the <p> text is updated.`,
    quizzes: [
      { q: "Why is updating the Real DOM slow?", options: ["It's written in Java", "Browser has to repaint and reflow", "It uses more memory", "It needs internet"], answer: 1 },
      { q: "What is the Virtual DOM?", options: ["A special browser", "A lightweight JS copy of the Real DOM", "A CSS framework", "A database"], answer: 1 },
      { q: "What is 'diffing' in React?", options: ["Deleting the DOM", "Comparing old and new Virtual DOM", "Creating new components", "Fetching data"], answer: 1 },
    ],
  },
  {
    section: "React Concepts",
    title: "Reconciliation",
    emoji: "🔄",
    content: `Reconciliation is React's process of updating the DOM efficiently.

**How React decides what to update:**

1. **Different element types** → Tear down old tree, build new one
   • <div> changing to <span> → rebuild everything inside

2. **Same element type** → Keep the node, update only changed attributes
   • <div className="old"> → <div className="new"> → just update class

3. **Lists with keys** → Match items by key to minimize changes
   • This is WHY keys are so important!

**The diffing algorithm:**
• React compares trees level by level (not deep comparison)
• This makes it O(n) instead of O(n³) — much faster!
• Two assumptions make this possible:
  - Different types = different trees
  - Keys identify stable items in lists`,
    code: `// SAME type — React updates attributes only
// Before:
<div className="before" title="stuff" />
// After:
<div className="after" title="stuff" />
// React: "Same <div>, just update className"

// DIFFERENT type — React rebuilds entirely
// Before:
<div><Counter /></div>
// After:
<span><Counter /></span>
// React: "Different types! Destroy <div> and Counter,
//         build new <span> and new Counter from scratch"

// Lists WITHOUT keys — inefficient
// Before: [A, B, C]
// After:  [X, A, B, C]
// React compares by position: A→X, B→A, C→B, ?→C
// Updates everything! Bad!

// Lists WITH keys — efficient  
// Before: [A(id:1), B(id:2), C(id:3)]
// After:  [X(id:4), A(id:1), B(id:2), C(id:3)]
// React: "Just insert X at the beginning, keep A,B,C"`,
    quizzes: [
      { q: "What happens when an element changes type (div → span)?", options: ["React updates attributes", "React rebuilds the entire subtree", "Nothing happens", "React ignores it"], answer: 1 },
      { q: "What makes React's diffing algorithm fast?", options: ["It compares every node deeply", "It compares level by level", "It skips nodes", "It uses machine learning"], answer: 1 },
    ],
  },
  {
    section: "React Concepts",
    title: "Error Boundaries",
    emoji: "🛡️",
    content: `Error Boundaries catch JavaScript errors in child components and display a fallback UI instead of crashing the whole app.

**Key facts:**
• Only works with CLASS components (no hooks equivalent yet)
• Catches errors in: rendering, lifecycle methods, constructors
• Does NOT catch: event handlers, async code, server-side rendering

**How to use:**
1. Create a class component with componentDidCatch or getDerivedStateFromError
2. Wrap components that might error
3. Show a fallback UI when error occurs

Think of it like: A safety net under a trapeze artist. If they fall (error), the net catches them (fallback UI) instead of them hitting the ground (app crash).`,
    code: `// Error Boundary (must be a class component)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }; // Show fallback UI
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. 😅</h2>;
    }
    return this.props.children;
  }
}

// Usage — wrap components that might error
function App() {
  return (
    <div>
      <h1>My App</h1>
      <ErrorBoundary>
        <RiskyComponent />
      </ErrorBoundary>
      <SafeComponent /> {/* This still works even if Risky crashes */}
    </div>
  );
}`,
    quizzes: [
      { q: "Can Error Boundaries be functional components?", options: ["Yes", "No, they must be class components", "Only with hooks", "Only in Next.js"], answer: 1 },
      { q: "Do Error Boundaries catch errors in event handlers?", options: ["Yes", "No", "Only onClick", "Only with try-catch"], answer: 1 },
      { q: "What does an Error Boundary show when it catches an error?", options: ["Nothing", "The error message", "A fallback UI", "The browser default error"], answer: 2 },
    ],
  },
  {
    section: "React Advanced",
    title: "CSR vs SSR",
    emoji: "🖥️",
    content: `**CSR (Client-Side Rendering):**
• Browser downloads empty HTML + JavaScript
• JavaScript builds the page IN the browser
• User sees blank page until JS loads
• React's default behavior
• Good for: dashboards, internal tools

**SSR (Server-Side Rendering):**
• Server builds the full HTML and sends it to browser
• User sees content immediately (even before JS loads)
• Better for SEO (search engines see the content)
• Next.js uses this by default
• Good for: blogs, e-commerce, marketing pages

Think of it like:
• CSR = IKEA furniture (you get parts, assemble yourself)
• SSR = pre-assembled furniture delivered (ready to use immediately)`,
    code: `// CSR — React default (client builds the page)
// index.html is mostly empty:
// <div id="root"></div>
// <script src="bundle.js"></script>

// Browser: 
// 1. Download empty HTML → blank page
// 2. Download JavaScript → still loading...
// 3. JS runs, builds DOM → page appears!

// SSR — Next.js (server builds the page)
// Server sends FULL HTML:
// <html>
//   <body>
//     <h1>Welcome Ali!</h1>
//     <div>Products: Laptop, Phone...</div>
//   </body>
// </html>

// Next.js SSR example
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();
  
  return { props: { products } }; // Passed to page component
}

export default function ProductPage({ products }) {
  return products.map(p => <div key={p.id}>{p.name}</div>);
}`,
    quizzes: [
      { q: "In CSR, who builds the page?", options: ["The server", "The browser/client", "The CDN", "The database"], answer: 1 },
      { q: "Which is better for SEO?", options: ["CSR", "SSR", "Both are equal", "Neither"], answer: 1 },
      { q: "What does the user see initially with CSR?", options: ["Full content", "A blank/loading page", "An error", "The server"], answer: 1 },
    ],
  },
  {
    section: "React Advanced",
    title: "React.lazy & React.Suspense",
    emoji: "💤",
    content: `**React.lazy** — Load components ONLY when needed (code splitting)
• Instead of loading everything upfront, load on demand
• Reduces initial bundle size = faster page load
• The lazy component is loaded when it's first rendered

**React.Suspense** — Show a fallback while lazy component loads
• Wraps lazy components
• Displays a loading indicator while the component is being fetched

Together, they enable "lazy loading" — loading code on demand instead of all at once.

Think of it like: Instead of loading every page of a book at once, you load only the page you're reading. When you flip to a new page, you see "Loading..." briefly, then the page appears.`,
    code: `// React.lazy and Suspense
// lazy and Suspense come from "react"

// Instead of importing HeavyChart directly at the top,
// use lazy loading:
// const HeavyChart = lazy(() => import("./HeavyChart"))
// const AdminPanel = lazy(() => import("./AdminPanel"))
// These load the components ON DEMAND, not upfront!

function App() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {/* Suspense shows fallback while loading */}
      <Suspense fallback={<p>Loading chart...</p>}>
        {showChart && <HeavyChart />}
      </Suspense>
      
      {/* Route-level lazy loading */}
      <Suspense fallback={<p>Loading admin...</p>}>
        <AdminPanel />
      </Suspense>
    </div>
  );
}
// HeavyChart JS is only downloaded when button is clicked!`,
    quizzes: [
      { q: "What does React.lazy do?", options: ["Makes components faster", "Loads components only when needed", "Deletes unused components", "Caches components"], answer: 1 },
      { q: "What does Suspense display while a lazy component loads?", options: ["Nothing", "An error", "A fallback UI", "The previous component"], answer: 2 },
      { q: "What is the main benefit of code splitting with lazy?", options: ["More features", "Smaller initial bundle size", "Better styling", "More components"], answer: 1 },
    ],
  },
  {
    section: "React Advanced",
    title: "React Batching",
    emoji: "📦",
    content: `Batching is when React groups multiple state updates into ONE re-render for performance.

**Before React 18:** Only batched inside React event handlers
**React 18+:** Batches EVERYWHERE (promises, timeouts, native events)

**Why batching matters:**
Without batching, 3 state updates = 3 re-renders (slow!)
With batching, 3 state updates = 1 re-render (fast!)

If you NEED to force immediate render, use flushSync (rare).`,
    code: `function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState("Ali");

  // React 18: ALL of these are batched = ONE re-render!
  const handleClick = () => {
    setCount(c => c + 1);  // Doesn't re-render yet
    setFlag(f => !f);       // Doesn't re-render yet
    setName("Sara");        // Doesn't re-render yet
    // React re-renders ONCE here with all 3 changes!
  };

  // Even in async code! (new in React 18)
  const fetchData = async () => {
    const data = await fetch("/api/data");
    setCount(data.count);    // Batched!
    setFlag(true);           // Batched!
    // One re-render for both!
  };

  // To force immediate render (rare!):
  // flushSync(() => setCount(1)); // Renders immediately
  // flushSync(() => setFlag(true)); // Renders again
}`,
    quizzes: [
      { q: "What is React batching?", options: ["Combining multiple renders into one", "Grouping state updates into one re-render", "Deleting old state", "Caching props"], answer: 1 },
      { q: "In React 18, are state updates in promises batched?", options: ["No", "Yes", "Only with useEffect", "Only in event handlers"], answer: 1 },
    ],
  },
  {
    section: "React Advanced",
    title: "Hydration vs Normal Rendering",
    emoji: "💧",
    content: `**Normal Rendering (CSR):**
• React builds the DOM from scratch in the browser
• Empty HTML → JavaScript → Full page
• Like building a house from foundation

**Hydration:**
• Server sends pre-built HTML (SSR)
• React "hydrates" it — attaches event listeners and interactivity to existing HTML
• The HTML is already visible; React just makes it interactive
• Like moving into a pre-built house and adding electricity

**Why hydration?**
• User sees content instantly (server-rendered HTML)
• Then React makes it interactive (hydration)
• Best of both worlds: fast initial load + full interactivity`,
    code: `// SERVER renders this HTML and sends to browser:
// <button>Clicked 0 times</button>

// NORMAL RENDERING (CSR):
// React creates the button from scratch
const root = ReactDOM.createRoot(container);
root.render(<App />); // Builds DOM from nothing

// HYDRATION (SSR):
// React attaches to EXISTING server-rendered HTML
const root = ReactDOM.hydrateRoot(container, <App />);
// React says: "I see a button already exists in the HTML.
// Let me attach the onClick handler to it!"

// In Next.js, hydration happens automatically!
// You just write your component:
export default function Counter() {
  const [count, setCount] = useState(0);
  // Server renders the HTML
  // Client hydrates it (adds onClick)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
    quizzes: [
      { q: "What is hydration?", options: ["Building DOM from scratch", "Attaching interactivity to server-rendered HTML", "Fetching data", "Caching components"], answer: 1 },
      { q: "During hydration, does React rebuild the HTML?", options: ["Yes, from scratch", "No, it reuses existing HTML and adds event handlers", "It depends", "Only in development"], answer: 1 },
    ],
  },
  {
    section: "React Advanced",
    title: "Portals in React",
    emoji: "🚪",
    content: `Portals let you render a component's children into a DIFFERENT DOM node, outside of the parent component's DOM hierarchy.

**Why portals?**
• Modals, tooltips, popovers need to appear ABOVE everything
• CSS overflow:hidden or z-index issues in parent can clip your modal
• Portals render outside the parent DOM but still act as React children (events bubble normally!)

**Common use cases:**
• Modal dialogs
• Tooltips
• Dropdown menus
• Toast notifications

Think of it like: A portal in a game — you step through a door in one room and appear in a completely different room, but you still "belong" to the original room.`,
    code: `// React Portals
// createPortal comes from "react-dom"

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  // Renders into document.body, NOT inside parent!
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body  // ← Renders HERE, not in parent
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div style={{ overflow: "hidden" }}>
      {/* Even though parent has overflow:hidden,
          the modal won't be clipped because it renders
          in document.body via portal! */}
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Hello from Portal!</h2>
      </Modal>
    </div>
  );
}`,
    quizzes: [
      { q: "Where do portals render children?", options: ["Inside the parent component", "Outside the parent DOM hierarchy", "In a web worker", "In an iframe"], answer: 1 },
      { q: "Do events still bubble normally with portals?", options: ["No", "Yes, through the React tree", "Only click events", "Only in production"], answer: 1 },
      { q: "What is a common use case for portals?", options: ["API calls", "State management", "Modal dialogs", "Routing"], answer: 2 },
    ],
  },
  {
    section: "React Advanced",
    title: "Server Components vs Client Components",
    emoji: "🌐",
    content: `In Next.js App Router (React 18+):

**Server Components (default):**
• Run on the SERVER only
• Can directly access databases, file systems
• Zero JavaScript sent to the browser for these
• Cannot use hooks, event handlers, or browser APIs
• Better performance, smaller bundles

**Client Components ("use client"):**
• Run in the BROWSER
• Can use hooks (useState, useEffect)
• Can handle events (onClick, onChange)
• Can access browser APIs (window, localStorage)
• Needed for interactivity

Rule of thumb:
• Keep components as Server Components by default
• Add "use client" ONLY when you need interactivity`,
    code: `// SERVER COMPONENT (default in Next.js App Router)
// No "use client" directive = server component
async function ProductList() {
  // Can directly query database!
  const products = await db.query("SELECT * FROM products");
  
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          {p.name} - Rs.{p.price}
          <AddToCartButton productId={p.id} />
        </li>
      ))}
    </ul>
  );
}

// CLIENT COMPONENT — needs interactivity
"use client"; // This directive makes it a client component

// useState comes from "react"

function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);
  
  return (
    <button onClick={() => setAdded(true)}>
      {added ? "Added! ✓" : "Add to Cart"}
    </button>
  );
}`,
    quizzes: [
      { q: 'What directive marks a component as a Client Component?', options: ['"use server"', '"use client"', '"use browser"', '"use hooks"'], answer: 1 },
      { q: "Can Server Components use useState?", options: ["Yes", "No", "Only useEffect", "Only useRef"], answer: 1 },
      { q: "Which type sends zero JavaScript to the browser?", options: ["Client Components", "Server Components", "Both", "Neither"], answer: 1 },
    ],
  },
  {
    section: "React Advanced",
    title: "Higher-Order Components (HOCs)",
    emoji: "🎁",
    content: `A Higher-Order Component (HOC) is a function that takes a component and returns a NEW enhanced component.

**Pattern:** const EnhancedComponent = hoc(WrappedComponent)

**Use cases:**
• Add authentication checking
• Add loading states
• Add logging/analytics
• Share common behavior across components

**Note:** Hooks have replaced many HOC use cases, but HOCs are still used in some libraries and patterns.

Think of it like: A gift wrapper. You give it a plain gift (component), and it wraps it with fancy paper (extra functionality). The gift inside is the same, but now it has something extra.`,
    code: `// HOC that adds authentication checking
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    if (!isLoggedIn) {
      return <p>Please log in to view this page.</p>;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
function Dashboard({ user }) {
  return <h1>Welcome to Dashboard, {user.name}!</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);
// <ProtectedDashboard user={user} />

// HOC that adds loading state
function withLoading(WrappedComponent) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
// <UserListWithLoading isLoading={true} users={users} />`,
    quizzes: [
      { q: "What does a HOC take as input?", options: ["Props", "State", "A component", "A string"], answer: 2 },
      { q: "What does a HOC return?", options: ["Props", "A new enhanced component", "State", "JSX"], answer: 1 },
      { q: "What modern React feature has replaced many HOC use cases?", options: ["Classes", "Hooks", "Redux", "Context"], answer: 1 },
    ],
  },
  {
    section: "React Advanced",
    title: "Virtualized Lists",
    emoji: "📜",
    content: `Virtualized lists (also called "windowing") render ONLY the items visible on screen, not the entire list.

**The problem:**
A list of 10,000 items = 10,000 DOM nodes = SLOW!
Browser has to manage all of them, even the ones you can't see.

**The solution: Virtualization**
Only render ~20 items visible in the viewport. As user scrolls, old items are removed and new ones are added.

**Benefits:**
• Renders only visible items (~20 instead of 10,000)
• Constant memory usage regardless of list size
• Smooth scrolling even with huge datasets

**Libraries:** react-window, react-virtualized, TanStack Virtual`,
    code: `// WITHOUT virtualization — renders ALL 10,000 items!
function SlowList({ items }) {
  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      {items.map(item => ( // ALL 10,000 rendered 😱
        <div key={item.id} style={{ height: 50 }}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// WITH virtualization — renders only ~10 visible items!
// Using react-window library: FixedSizeList

function FastList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}      // Viewport height
      itemCount={items.length} // Total items (10,000)
      itemSize={50}      // Each item height
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
  // Only ~8-10 items rendered at any time!
}`,
    quizzes: [
      { q: "What does list virtualization do?", options: ["Renders all items faster", "Only renders items visible on screen", "Sorts the list", "Filters duplicates"], answer: 1 },
      { q: "Why is rendering 10,000 DOM nodes problematic?", options: ["It's not a problem", "It slows down the browser significantly", "It causes errors", "It's ugly"], answer: 1 },
      { q: "Which library is commonly used for virtualized lists in React?", options: ["react-router", "react-window", "react-query", "react-redux"], answer: 1 },
    ],
  },
];

const SECTIONS = [...new Set(TOPICS.map(t => t.section))];

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%", background: "var(--track)", borderRadius: 12, height: 10, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", borderRadius: 12, transition: "width 0.5s ease" }} />
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <pre style={{
      background: "#1a1b26",
      color: "#c0caf5",
      padding: "16px 20px",
      borderRadius: 12,
      fontSize: 13,
      lineHeight: 1.7,
      overflowX: "auto",
      border: "1px solid #292e42",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
      whiteSpace: "pre",
      margin: "12px 0",
    }}>
      {code}
    </pre>
  );
}

function QuizCard({ quiz, index, answered, selectedOption, onSelect }) {
  const isCorrect = selectedOption === quiz.answer;
  return (
    <div style={{
      background: answered ? (isCorrect ? "var(--success-bg)" : "var(--error-bg)") : "var(--card)",
      border: `1.5px solid ${answered ? (isCorrect ? "var(--success)" : "var(--error)") : "var(--border)"}`,
      borderRadius: 14,
      padding: "18px 20px",
      marginBottom: 12,
      transition: "all 0.3s ease",
    }}>
      <p style={{ fontWeight: 600, marginBottom: 12, color: "var(--text)", fontSize: 14, lineHeight: 1.5 }}>
        Q{index + 1}: {quiz.q}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {quiz.options.map((opt, i) => {
          const isThis = selectedOption === i;
          const isAnswer = quiz.answer === i;
          let bg = "var(--option-bg)";
          let border = "var(--option-border)";
          let color = "var(--text)";
          if (answered) {
            if (isAnswer) { bg = "var(--success-bg)"; border = "var(--success)"; color = "var(--success)"; }
            else if (isThis && !isCorrect) { bg = "var(--error-bg)"; border = "var(--error)"; color = "var(--error)"; }
          } else if (isThis) {
            bg = "var(--accent-bg)"; border = "var(--accent)";
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => onSelect(i)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 10,
                padding: "10px 14px",
                textAlign: "left",
                cursor: answered ? "default" : "pointer",
                color,
                fontWeight: (answered && isAnswer) ? 700 : 500,
                fontSize: 13,
                transition: "all 0.2s",
                fontFamily: "inherit",
                lineHeight: 1.4,
              }}
            >
              <span style={{ fontWeight: 700, marginRight: 8, opacity: 0.6 }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {answered && isAnswer && " ✓"}
              {answered && isThis && !isCorrect && " ✗"}
            </button>
          );
        })}
      </div>
      {answered && !isCorrect && (
        <p style={{ marginTop: 10, fontSize: 13, color: "var(--error)", fontWeight: 500 }}>
          ✗ Wrong! The correct answer is: <strong>{quiz.options[quiz.answer]}</strong>
        </p>
      )}
      {answered && isCorrect && (
        <p style={{ marginTop: 10, fontSize: 13, color: "var(--success)", fontWeight: 600 }}>✓ Correct!</p>
      )}
    </div>
  );
}

export default function App() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [phase, setPhase] = useState("learn"); // learn | quiz | result
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [retryRound, setRetryRound] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topic = TOPICS[topicIdx];
  const quizzes = topic.quizzes;

  const allAnswered = quizzes.every((_, i) => answers[i] !== undefined);
  const allCorrect = quizzes.every((q, i) => answers[i] === q.answer);
  const wrongOnes = quizzes.map((q, i) => answers[i] !== undefined && answers[i] !== q.answer ? i : null).filter(i => i !== null);

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (allCorrect) {
      setCompletedTopics(prev => new Set([...prev, topicIdx]));
    }
  };

  const handleRetry = () => {
    const newAnswers = {};
    quizzes.forEach((q, i) => {
      if (answers[i] === q.answer) newAnswers[i] = answers[i];
    });
    setAnswers(newAnswers);
    setSubmitted(false);
    setRetryRound(r => r + 1);
  };

  const handleNext = () => {
    if (topicIdx < TOPICS.length - 1) {
      setTopicIdx(topicIdx + 1);
      setPhase("learn");
      setAnswers({});
      setSubmitted(false);
      setRetryRound(0);
    }
  };

  const handlePrev = () => {
    if (topicIdx > 0) {
      setTopicIdx(topicIdx - 1);
      setPhase("learn");
      setAnswers({});
      setSubmitted(false);
      setRetryRound(0);
    }
  };

  const jumpTo = (idx) => {
    setTopicIdx(idx);
    setPhase("learn");
    setAnswers({});
    setSubmitted(false);
    setRetryRound(0);
    setSidebarOpen(false);
  };

  const contentLines = topic.content.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "§BOLD§$1§/BOLD§");
    const parts = bold.split(/§\/?BOLD§/).map((part, j) => {
      if (j % 2 === 1) return <strong key={j}>{part}</strong>;
      return part;
    });
    if (line.startsWith("•")) return <div key={i} style={{ paddingLeft: 16, lineHeight: 1.7 }}>• {parts.slice(0).map((p,j)=>j===0?String(p).replace(/^• /,""):p)}</div>;
    if (line.trim() === "") return <div key={i} style={{ height: 10 }} />;
    return <div key={i} style={{ lineHeight: 1.7 }}>{parts}</div>;
  });

  return (
    <div style={{
      "--bg": "#0f0f14", "--card": "#16161e", "--card-raised": "#1c1c28", "--border": "#2a2a3a",
      "--text": "#e0e0ef", "--text-dim": "#8888a8", "--accent": "#7c6cf0", "--accent-bg": "rgba(124,108,240,0.12)",
      "--success": "#34d399", "--success-bg": "rgba(52,211,153,0.1)", "--error": "#f87171", "--error-bg": "rgba(248,113,113,0.1)",
      "--option-bg": "#1a1a2a", "--option-border": "#2a2a3a", "--track": "#1e1e2e",
      fontFamily: "'DM Sans', 'Nunito', system-ui, -apple-system, sans-serif",
      background: "var(--bg)", color: "var(--text)", minHeight: "100vh",
      display: "flex", flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease; }
        button:hover:not(:disabled) { filter: brightness(1.1); }
        .sidebar-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:90; }
      `}</style>

      {/* Header */}
      <header style={{
        padding: "14px 20px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "var(--card)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", fontSize: 22, padding: 4 }}>☰</button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>⚡ JS & React Mastery</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-dim)" }}>
          {completedTopics.size}/{TOPICS.length} completed
        </span>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div style={{
        position: "fixed", top: 0, left: sidebarOpen ? 0 : -320, width: 310, height: "100vh",
        background: "var(--card)", borderRight: "1px solid var(--border)", zIndex: 100,
        overflowY: "auto", transition: "left 0.3s ease", padding: "16px 0",
      }}>
        <div style={{ padding: "0 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>📚 Topics</span>
          <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        {SECTIONS.map(sec => (
          <div key={sec}>
            <div style={{ padding: "10px 16px 6px", fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1 }}>{sec}</div>
            {TOPICS.map((t, i) => t.section === sec && (
              <button key={i} onClick={() => jumpTo(i)} style={{
                display: "flex", alignItems: "center", gap: 8, width: "100%",
                padding: "9px 16px", background: i === topicIdx ? "var(--accent-bg)" : "transparent",
                border: "none", color: i === topicIdx ? "var(--accent)" : "var(--text)", cursor: "pointer",
                textAlign: "left", fontSize: 13, fontWeight: i === topicIdx ? 600 : 400, fontFamily: "inherit",
                borderLeft: i === topicIdx ? "3px solid var(--accent)" : "3px solid transparent",
              }}>
                <span>{t.emoji}</span>
                <span style={{ flex: 1 }}>{t.title}</span>
                {completedTopics.has(i) && <span style={{ color: "var(--success)", fontSize: 14 }}>✓</span>}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, maxWidth: 700, width: "100%", margin: "0 auto", padding: "20px 16px 40px" }}>
        {/* Topic header */}
        <div className="fade-up" key={topicIdx + "-" + phase + "-" + retryRound}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{topic.section}</span>
            <span style={{ color: "var(--text-dim)" }}>·</span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{topicIdx + 1} of {TOPICS.length}</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{topic.emoji} {topic.title}</h1>
          <ProgressBar current={topicIdx + (phase === "quiz" && submitted && allCorrect ? 1 : 0)} total={TOPICS.length} />

          {/* Phase tabs */}
          <div style={{ display: "flex", gap: 4, marginTop: 16, marginBottom: 20, background: "var(--card)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" }}>
            <button onClick={() => setPhase("learn")} style={{
              flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer",
              background: phase === "learn" ? "var(--accent)" : "transparent",
              color: phase === "learn" ? "#fff" : "var(--text-dim)",
              fontWeight: 600, fontSize: 13, fontFamily: "inherit",
            }}>📖 Learn</button>
            <button onClick={() => setPhase("quiz")} style={{
              flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer",
              background: phase === "quiz" ? "var(--accent)" : "transparent",
              color: phase === "quiz" ? "#fff" : "var(--text-dim)",
              fontWeight: 600, fontSize: 13, fontFamily: "inherit",
            }}>🧪 Quiz</button>
          </div>

          {/* LEARN PHASE */}
          {phase === "learn" && (
            <div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 16, fontSize: 14 }}>
                {contentLines}
              </div>
              {topic.code && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-dim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>💻 Code Example</div>
                  <CodeBlock code={topic.code} />
                </div>
              )}
              <button onClick={() => setPhase("quiz")} style={{
                width: "100%", padding: "14px", borderRadius: 12, border: "none",
                background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Take the Quiz →
              </button>
            </div>
          )}

          {/* QUIZ PHASE */}
          {phase === "quiz" && (
            <div>
              {retryRound > 0 && (
                <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "var(--accent)" }}>
                  🔄 Retry round {retryRound} — answer the questions you got wrong.
                </div>
              )}
              {quizzes.map((q, i) => {
                if (retryRound > 0 && answers[i] === q.answer) return null;
                return (
                  <QuizCard
                    key={i}
                    quiz={q}
                    index={i}
                    answered={submitted}
                    selectedOption={answers[i]}
                    onSelect={(optIdx) => handleSelect(i, optIdx)}
                  />
                );
              })}

              {!submitted && (
                <button
                  disabled={!allAnswered}
                  onClick={handleSubmit}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 12, border: "none",
                    background: allAnswered ? "var(--accent)" : "var(--track)",
                    color: allAnswered ? "#fff" : "var(--text-dim)",
                    fontWeight: 700, fontSize: 15, cursor: allAnswered ? "pointer" : "not-allowed",
                    fontFamily: "inherit", marginTop: 8,
                  }}
                >
                  Submit Answers
                </button>
              )}

              {submitted && allCorrect && (
                <div style={{
                  background: "var(--success-bg)", border: "1.5px solid var(--success)",
                  borderRadius: 14, padding: 20, textAlign: "center", marginTop: 16,
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                  <p style={{ fontWeight: 700, fontSize: 18, color: "var(--success)" }}>All Correct!</p>
                  <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4 }}>You've mastered "{topic.title}"</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    {topicIdx > 0 && (
                      <button onClick={handlePrev} style={{
                        flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--border)",
                        background: "var(--card)", color: "var(--text)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 14,
                      }}>← Previous</button>
                    )}
                    {topicIdx < TOPICS.length - 1 ? (
                      <button onClick={handleNext} style={{
                        flex: 1, padding: 12, borderRadius: 10, border: "none",
                        background: "var(--accent)", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14,
                      }}>Next Topic →</button>
                    ) : (
                      <div style={{ flex: 1, padding: 12, textAlign: "center", color: "var(--success)", fontWeight: 700 }}>
                        🏆 You completed ALL topics!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {submitted && !allCorrect && (
                <div style={{
                  background: "var(--error-bg)", border: "1.5px solid var(--error)",
                  borderRadius: 14, padding: 20, textAlign: "center", marginTop: 16,
                }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: "var(--error)" }}>
                    {wrongOnes.length} question{wrongOnes.length > 1 ? "s" : ""} wrong
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4 }}>
                    Review the correct answers above, then try again!
                  </p>
                  <button onClick={handleRetry} style={{
                    marginTop: 14, padding: "12px 28px", borderRadius: 10, border: "none",
                    background: "var(--accent)", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14,
                  }}>
                    🔄 Retry Wrong Questions
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "sticky", bottom: 0, background: "var(--card)", borderTop: "1px solid var(--border)",
        padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button disabled={topicIdx === 0} onClick={handlePrev} style={{
          padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
          background: "var(--card)", color: topicIdx === 0 ? "var(--text-dim)" : "var(--text)",
          cursor: topicIdx === 0 ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 500, fontSize: 13,
        }}>← Prev</button>
        <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{topicIdx + 1} / {TOPICS.length}</span>
        <button disabled={topicIdx === TOPICS.length - 1} onClick={handleNext} style={{
          padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
          background: "var(--card)", color: topicIdx === TOPICS.length - 1 ? "var(--text-dim)" : "var(--text)",
          cursor: topicIdx === TOPICS.length - 1 ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 500, fontSize: 13,
        }}>Next →</button>
      </div>
    </div>
  );
}
