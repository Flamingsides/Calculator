# A Simple Calculator App

## About
A simple calcualtor app which allows basic operations as well as supports constants. The design was kept minimal and modern and currently supports Dark Mode.
![Image of Calculator GUI](https://github.com/Flamingsides/calculator/assets/84507406/5a124881-714e-477d-b3b9-175a9e44b5d8)


## Inspiration
This project was initially a simple assignment which required a simple UI that would allow simple calculations such as addition, subtraction, multiplication, and division.
The project then expanded when I took it upon myself to add more features and experiment further with string parsing strategies.

## Features
- Compute basic calculations such as addition, subtraction, multiplication, and division.
- Supports use of constants such as π, e, τ and ϕ.
- Supports keyboard input as well as onscreen numpad.
- Automatically replaces letters such as "pi", or "tau" with relevant unicode character for the constant.
- Allows use of coefficient notation for multiplication such as 2ϕ which means 2*ϕ.
- Understands coefficient notation as one entity; 3÷2π equals to 3/(2\*π), not 3/2\*3
- Allows calculation exponents using ^ operator.
- Allows use of brackets.
- Implements Responsive Web Design (RWD) via Media Queries.

## TODO Bugs/Features
- "Switch Mode" button currently does nothing. It was originally meant to expand the keyboard to mimic a scientific calculator. It might be replaced with a "Switch Theme" button to allow switching from dark mode to light mode.
- Fix text in the input field from expending beyond the borders of the input box.
