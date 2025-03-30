import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function ClerkButton() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
