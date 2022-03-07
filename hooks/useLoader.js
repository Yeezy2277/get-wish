import React from 'react'

function useLoader(loadingDefault = true, errorDefault = false) {
    const [loading, _setLoading] = React.useState(loadingDefault);
    const [error, _setError] = React.useState(errorDefault);

    const setError = React.useCallback((message) => {
        _setLoading(false);
        _setError(message);
    }, []);

    const setLoading = React.useCallback((state) => {
        _setLoading(state);
        _setError(false);
    }, []);

    const start = React.useCallback(() => setLoading(true), [setLoading]);
    const stop = React.useCallback(() => setLoading(false), [setLoading]);

    return React.useMemo(() => ({
            loading,
            error,
            setLoading,
            setError,
            start,
            stop,
        }
    ), [
        loading,
        error,
        setLoading,
        setError,
        start,
        stop,
    ]);
}

export default useLoader;
