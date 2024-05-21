import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import BookPage from "./BookPage";

const Page = ({ params }: { params: { volumeId: string } }) => {
  return <BookPage id={params.volumeId} />;
};
export default Page;
