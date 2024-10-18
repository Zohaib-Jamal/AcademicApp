const validateSignUp = (email: string, password: string, username: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password || !username) {
    return "All Fields are required!";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  if (password.length < 8) {
    return "Password should be at least 8 characters long!";
  }
  if (username.length < 3  && username[0] === " ") {
    return "Write a proper username!";
  }

  return null;
};

const validateSignIn = (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return "All Fields are required!";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  if (password.length === 0 ) {
    return "Enter a vaild password!";
  }

  return null;
};

export { validateSignUp, validateSignIn };
