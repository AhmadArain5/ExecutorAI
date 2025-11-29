Visit site at: http://35.206.78.42/landing
App Created using Next.js

## Features

- **Prompt-based code generation** using OpenRouter API
- **Monaco Editor** for code viewing and editing
- **Sandboxed code execution** with resource limits
- **Docker containerization** for reproducible environments

## How Code Execution Works

- Code is passed directly via **STDIN** to Docker containers (no temp files)
- Each code execution runs in an isolated container with:
  - CPU limit: 1 core
  - Memory limit: 256MB
  - Timeout: 30 seconds
  - Network isolation
- Supports: Python 3.11, JavaScript (Node 20), Bash (Alpine)
  - Code generation only for python, but support for other languages to be added in future updates.

## Note:

I am currently using the free tier of the OpenRouter API. This means that API calls are often rate limited and depend on OpenRouter traffic. Flease forgive this small oversight.

In the case that the API does not work, please continue by replacing the "/generate" in the URL with the following to skip the generate page and see the rest of the app. The following is an example of a previous working code generation:

/editor?code=%60%60%60python%0Aimport%20random%0A%0Aclass%20DiceRoll%3A%0A%20%20%20%20"""%0A%20%20%20%20A%20class%20to%20simulate%20rolling%20a%2020-sided%20die.%0A%20%20%20%20"""%0A%0A%20%20%20%20def%20__init__(self)%3A%0A%20%20%20%20%20%20%20%20"""%0A%20%20%20%20%20%20%20%20Initializes%20the%20DiceRoll%20object.%0A%20%20%20%20%20%20%20%20No%20initial%20state%20needed%20for%20a%20simple%20dice%20roll.%0A%20%20%20%20%20%20%20%20"""%0A%20%20%20%20%20%20%20%20pass%20%20%23%20No%20initialization%20needed%0A%0A%20%20%20%20def%20roll(self)%3A%0A%20%20%20%20%20%20%20%20"""%0A%20%20%20%20%20%20%20%20Simulates%20rolling%20a%2020-sided%20die.%0A%0A%20%20%20%20%20%20%20%20Returns%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20int%3A%20A%20random%20integer%20between%201%20and%2020%20(inclusive).%0A%20%20%20%20%20%20%20%20"""%0A%20%20%20%20%20%20%20%20return%20random.randint(1%2C%2020)%0A%0Aif%20__name__%20%3D%3D%20%27__main__%27%3A%0A%20%20%20%20%23%20Example%20usage%3A%0A%20%20%20%20dice%20%3D%20DiceRoll()%20%20%23%20Create%20a%20DiceRoll%20object%0A%20%20%20%20result%20%3D%20dice.roll()%20%20%23%20Roll%20the%20dice%0A%20%20%20%20print(f"You%20rolled%20a%3A%20%7Bresult%7D")%20%20%23%20Print%20the%20result%0A%60%60%60
