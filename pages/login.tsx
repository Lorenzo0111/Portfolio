import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <main>
        <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
          <h1 className="from-[#f1a900] to-[#fdeb77] text-transparent bg-clip-text bg-gradient-to-r font-extrabold text-4xl mb-4">
            Already logged in
          </h1>
          <p>You are already logged in</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
        <h1 className="from-[#f1a900] to-[#fdeb77] text-transparent bg-clip-text bg-gradient-to-r font-extrabold text-4xl mb-4">
          Login
        </h1>
        <p>
          Click{" "}
          <button
            className="text-primary hover:underline"
            onClick={() => signIn("discord")}
          >
            here
          </button>{" "}
          to login and access the admin dashboard.
        </p>
      </div>
    </main>
  );
}
