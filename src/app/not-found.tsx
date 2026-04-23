import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-8xl font-bold tracking-tight text-foreground/10">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-foreground/50">This page doesn&apos;t exist or was moved.</p>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
