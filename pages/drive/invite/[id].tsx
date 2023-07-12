import { useFetcher } from "@/utils/fetcher";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    },
  };
};

export default function Invite({ id }: { id: string }) {
  const invite = useFetcher("/api/drive/invite/" + id);
  const router = useRouter();

  if (invite.isLoading) {
    return (
      <div className="text-center font-extrabold text-4xl">Loading...</div>
    );
  }

  if (invite.data.error) {
    return (
      <div className="text-center font-extrabold text-4xl">
        {invite.data.error}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <p className="text-center font-extrabold text-4xl">
        You have been invited to join {invite.data.name}
      </p>
      <p className="text-center text-2xl">
        Click the button below to accept it
      </p>

      <div className="w-52 flex justify-center text-center flex-col p-4 bg-[#232323] rounded-2xl">
        <FontAwesomeIcon icon={faFile} className="text-6xl" />
        <p className="text-xl mt-2">{invite.data.name}</p>
        <p className="text-[#505050]">{invite.data.description}</p>
      </div>

      <button
        className="bg-primary text-white rounded-xl p-2"
        onClick={() => {
          fetch("/api/drive/invite/accept", {
            method: "POST",
            body: JSON.stringify({
              id: id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(() => {
            router.push("/drive");
          });
        }}
      >
        Accept
      </button>
    </div>
  );
}
