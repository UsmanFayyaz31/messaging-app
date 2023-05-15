import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  // const location = useLocation();
  // const [header, setHeader] = useState(false);
  // const [footer, setFooter] = useState(true);

  // useEffect(() => {
  //   setHeader(true);
  //   if (location.pathname === SIGN_IN) setFooter(false);
  // }, [location.pathname]);

  // useEffect(() => {
  //   setHeader(true);
  // }, []);

  return (
    <div id="layout-wrapper">
      {/* {header && <Header />} */}
      <div className="body-content">{children}</div>
      {/* {footer && <Footer />} */}
    </div>
  );
};

export default Layout;
