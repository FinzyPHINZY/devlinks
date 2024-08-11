import LoginWithGoogle from "../../../components/Buttons/LoginWithGoogle";

const LoginPage = () => {
  return (
    <div className="">
      <div className="p-4 max-w-xs mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Sign In</h1>
        <p className="text-center mb-6 text-gray-500">
          Sign in to your account
        </p>
        <LoginWithGoogle />
      </div>
    </div>
  );
};

export default LoginPage;
