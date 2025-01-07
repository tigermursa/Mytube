import AuthForm from "@/components/Auth/AuthForm";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm type="sign-in" />
    </div>
  );
}
