import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    

    render() {
      if (this.state.errorInfo) {
        // Error path

        const style = {
            height: "100vh", 
            backgroundColor: "rgb(131,58,180)",
            background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
            width: "20rem",
            height: "6rem",
            border: "1rem",
            borderRadius: "20px",
            fontSize: "2rem",
            padding: "15px",
        }
    
        const text = {
            textDecoration: "none",
            color: "white"
        }

        const style2 = {
            height: "100vh", 
        }
    
        return (
          <div style={style2} className='container justify-content-center align-items-center'>
            <h2>Něco se pokazilo.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
            <div style={style} className='text-center'>
                <Link style={text} to="/login">
                    Vrátit se k přihlášení
                </Link>
            </div>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }
  
export default ErrorBoundary;
  