
export default function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="ErrorCard" role="alert">
            <h4>Something went wrong</h4>
            <p>{error.message}</p>
            <button className="btn btn-primary" onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}