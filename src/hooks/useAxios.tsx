import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react'

type ApiFunction = () => Promise<any>;

const useAxios = () => {

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(async (apiFunction: ApiFunction) => {
        try {
            setError(null);
            setLoading(true);

            const response = await apiFunction();

            setData(response.data);
            return response;
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
            setError('Ocorreu um erro');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        data,
        loading,
        error,
        request
    }
}

export default useAxios