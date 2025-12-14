import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

function useAsyncValidation({value, validateFn, errorMessage, options = {}}) {
    const { delay = 500, formatValidator = null } =  options;
    const [error, setError] = useState('');

    const debouncedValue = useDebounce(value, delay);

    useEffect(() => {
        setError('');
    }, [value]);

    useEffect(() => {
        if(!debouncedValue) return;

        let isCurrent = true;

        if(formatValidator) {
            const isValidFormat = formatValidator(debouncedValue);
            if (!isValidFormat) return;
        }

        const result = async () => {
            try {
                const response = await validateFn(debouncedValue);
                const { available } = response.data;

                if (isCurrent) {
                    if (available) {
                        setError('');  
                    } else {
                        setError(errorMessage);  
                    }
                }
            } catch (error) {
                console.error('Validation error:', error);
            }
        }

        result();

        return () => {
            isCurrent = false;
        }

    }, [debouncedValue, validateFn, errorMessage, formatValidator]);
    
    return error;
}

export default useAsyncValidation;