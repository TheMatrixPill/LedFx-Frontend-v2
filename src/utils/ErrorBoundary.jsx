import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div style={{
                maxWidth: 360, width: '100%', display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '0 auto',
                paddingTop: '3rem'
            }}>
                <h1>Something went wrong</h1>
                <p>
                    Deleting the browser's frontend-data might help,<br />
                    if there is old config data left.
                </p>
                <button style={{ height: 40, borderRadius: 10, border: '1px solid #999', color: '#fff', backgroundColor: '#600000', cursor: 'pointer'}} onClick={() => {
                    window.localStorage.removeItem('undefined')
                    window.localStorage.removeItem('ledfx-host')
                    window.localStorage.removeItem('ledfx-hosts')
                    window.localStorage.removeItem('ledfx-ws')
                    window.location.reload()
                }}>Refresh Page</button><br />
                <button style={{ height: 40, borderRadius: 10, border: '1px solid #999', color: '#fff', backgroundColor: '#600000', cursor: 'pointer'}}  onClick={() => {
                    window.location.reload()
                }}>Clear Browser-Data</button><br />
                {/* <button onClick={() => {
                    if (window.confirm("Are you sure to delete your ledfx-config?")) {
                        alert('NICE')
                    }

                }}>Clear LedFx-Config</button> */}
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary