import { Link } from 'react-router-dom';

function Layout(props: any) {
  const { children } = props;
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

export default Layout;
