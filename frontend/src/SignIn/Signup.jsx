import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    userType: "family",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- PASSWORD STRENGTH ---------------- */
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return { score, label: levels[score - 1] || "Very Weak" };
  };

  const passwordStrength = getPasswordStrength(form.password);

  /* ---------------- FIELD VALIDATION ---------------- */
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (value.trim().length < 2)
          error = "Full name must be at least 2 characters";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Please enter a valid email address";
        break;

      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value))
          error =
            "Password must be 8+ chars with uppercase, lowercase, and number";
        break;

      case "confirmPassword":
        if (value && value !== form.password)
          error = "Passwords do not match";
        break;

      case "agreeTerms":
        if (!value) error = "You must agree to the terms";
        break;

      default:
        break;
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);

    try {
      //Replace with real API call
      await new Promise((res) => setTimeout(res, 1000));

      alert("Registration successful!");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };*/

  return (
    <div className="bg-white  text-[#0d141b]  min-h-screen flex overflow-x-hidden">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage:
              'url("../assets/AAU.webp")',
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h1 className="text-4xl font-black mb-4">Join Our Care Community</h1>
          <p className="text-lg max-w-md opacity-90">
            HomeCare connects families and caregivers to provide compassionate
            support.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
        <div className="px-8  flex items-center justify-between">
          <span className="font-bold text-xl text-black">
            <img src="/tg_image_3199460643.jpeg" alt="Logo" className="w-1/2 h-1/2" />
          </span>
          <Link to="/" className="text-black text-md font-semibold w-full">
            Home
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center justify-center px-8 "
        >
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-black text-center">Create Your Account</h2>

            {/* INPUTS */}
            {[
              ["fullName", "Full Name", "text", "name"],
              ["phone", "Phone Number", "tel", "tel"],
              ["email", "Email Address", "email", "email"],
              ["password", "Password", "password", "new-password"],
              [
                "confirmPassword",
                "Confirm Password",
                "password",
                "new-password",
              ],

            ].map(([name, label, type, auto]) => (
              <div key={name}>
                <label className="font-bold text-sm">{label}</label>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete={auto}
                  placeholder={label}
                  required
                  className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50  mt-1"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name]}</p>
                )}

                {/* PASSWORD STRENGTH */}
                {name === "password" && form.password && (
                  <div className="mt-2">
                    <div className="h-2 w-full bg-slate-200 rounded">
                      <div
                        className="h-2 rounded bg-primary transition-all"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1">
                      Strength: {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* TERMS */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-black font-bold">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-black font-bold">
                  Privacy Policy
                </Link>
              </span>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
            )}

            {/* SUBMIT */}
            <button
              disabled={isSubmitting}
              className="w-full h-14 bg-black text-white rounded-xl font-bold disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/Signin" className="text-black font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </form>

        <div className="p-6 text-xs text-center ">
          © 2024 LifeLine Addis HomeCare Services Inc.
        </div>
      </div>
    </div>
  );
}

export default Signup;
