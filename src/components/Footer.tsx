import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t border-zinc-300">
      <MaxWidthWrapper>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 py-8">
          <div>
            <p className="text-zinc-500 text-sm tracking-wide">
              &copy; 2024. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-x-6">
            <p className="text-zinc-500 text-sm tracking-wide">Terms</p>
            <p className="text-zinc-500 text-sm tracking-wide">
              Privacy Policy
            </p>
            <p className="text-zinc-500 text-sm tracking-wide">Cookie Policy</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
export default Footer;
