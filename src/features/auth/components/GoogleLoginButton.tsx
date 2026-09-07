import { Button } from "../../../components/ui/Button/Button";

export default function GoogleLoginButton() {
  return (
    <a href={`${import.meta.env.VITE_BASE_URL}/api/auth/google`}>
      <Button variant="outline" className="mt-2" type="button">
        Continue with Google
      </Button>
    </a>
  );
}
