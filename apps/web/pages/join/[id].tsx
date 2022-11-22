import { useRouter } from "next/router";

const Join = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};

export default Join;
