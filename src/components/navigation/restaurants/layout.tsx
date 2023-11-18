import Footer from "../footer";
import Navbar from "./navbar";

interface LayoutProps {
  // Define the types of props you expect here
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="bg-custom-bg">
      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <main className="flex-grow lg:max-w-screen-lg md:max-w-screen-md max-w-screen-sm container mx-auto">
          <div className="h-full overflow-y-auto">{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
